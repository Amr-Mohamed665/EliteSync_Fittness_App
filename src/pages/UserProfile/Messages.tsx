import { useLocation, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/Axios/axiosInstance";
import { getProfile } from "@/lib/Api/Authentication/profile";

type RawMessage = {
  id?: number;
  body?: string;
  message?: string;
  content?: string;
  text?: string;
  sender_id?: number | string;
  user_id?: number | string;
  created_at?: string;
  [key: string]: any;
};

type DisplayMessage = {
  text: string;
  isMe: boolean;
  time?: string;
};

function extractText(msg: any): string {
  if (typeof msg === "string") return msg;
  return (
    msg?.body ??
    msg?.message ??
    msg?.content ??
    msg?.text ??
    JSON.stringify(msg)
  );
}

function toDisplayMessages(rawArray: RawMessage[], userId: number | null): DisplayMessage[] {
  return rawArray.map((msg) => {
    const senderId = msg?.sender_id ?? msg?.user_id;
    const isMe =
      userId !== null && senderId !== undefined
        ? Number(senderId) === Number(userId)
        : false;
    return {
      text: extractText(msg),
      isMe,
      time: msg.created_at
        ? new Date(msg.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : undefined,
    };
  });
}

function extractConversationId(data: any): string | null {
  if (!data) return null;

  // Single object with id
  if (data?.id) return String(data.id);

  // Nested conversation object
  if (data?.conversation?.id) return String(data.conversation.id);
  if (data?.conversation_id) return String(data.conversation_id);

  // Wrapped in data key (Laravel pagination / resource)
  if (data?.data?.id) return String(data.data.id);
  if (data?.data?.conversation_id) return String(data.data.conversation_id);

  // Array (collection) at top level
  if (Array.isArray(data) && data.length > 0 && data[0]?.id) {
    return String(data[0].id);
  }

  // Array wrapped in data key
  if (
    Array.isArray(data?.data) &&
    data.data.length > 0 &&
    data.data[0]?.id
  ) {
    return String(data.data[0].id);
  }

  return null;
}

function extractTrainerName(data: any): string | null {
  const conv =
    data?.id
      ? data
      : data?.conversation ?? data?.data ?? (Array.isArray(data) ? data[0] : null) ??
        (Array.isArray(data?.data) ? data.data[0] : null);
  return conv?.trainer?.name ?? null;
}

export default function Messages() {
  const { conversationId } = useParams<{ conversationId?: string }>();
  const location = useLocation();
  const trainerIdFromUrl = new URLSearchParams(location.search).get("trainer");

  // Reuse the cached profile query (Sidebar already calls this — no extra network request)
  const { data: profileData } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  const currentUserId: number | null = profileData?.id ?? null;

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [activeConversationId, setActiveConversationId] = useState<string | null>(
    conversationId ?? null
  );
  const [trainerName, setTrainerName] = useState<string | null>(null);

  // Keep raw API messages to re-map isMe once the profile (user ID) loads
  const rawMessagesRef = useRef<RawMessage[]>([]);
  // Ref on the scrollable chat body — scroll it directly so the page doesn't jump
  const chatBodyRef = useRef<HTMLDivElement>(null);

  // Scroll only the chat container (not the page) when messages update
  useEffect(() => {
    const el = chatBodyRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  // ── Re-map isMe correctly once the profile/userId becomes available ──
  useEffect(() => {
    if (currentUserId === null || rawMessagesRef.current.length === 0) return;
    setMessages(toDisplayMessages(rawMessagesRef.current, currentUserId));
  }, [currentUserId]);

  // ── Fetch conversation + messages ──
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        let resolvedConversationId = conversationId ?? null;

        // Step 1 — GET existing conversation by trainer_id (read-only, no side effects)
        if (!resolvedConversationId && trainerIdFromUrl) {
          const { data } = await axiosInstance.get(
            `/api/conversations?trainer_id=${trainerIdFromUrl}`
          );

          resolvedConversationId = extractConversationId(data);

          if (resolvedConversationId) {
            setActiveConversationId(resolvedConversationId);
            setTrainerName(extractTrainerName(data));
          } else {
            // No existing conversation — show empty chat, user can send first message
            rawMessagesRef.current = [];
            setMessages([]);
            setLoading(false);
            return;
          }
        } else if (resolvedConversationId) {
          setActiveConversationId(resolvedConversationId);
        }

        // Step 2 — Fetch messages for the resolved conversation
        if (resolvedConversationId) {
          // Mark conversation as read (fire-and-forget — don't let this block the UI)
          axiosInstance
            .patch(`/api/conversations/${resolvedConversationId}/read`)
            .catch((err) => console.warn("[Messages] mark-read failed:", err));

          const { data } = await axiosInstance.get(
            `/api/conversations/${resolvedConversationId}/messages`
          );

          const rawArray: RawMessage[] = Array.isArray(data)
            ? data
            : Array.isArray(data?.messages)
            ? data.messages
            : Array.isArray(data?.data)
            ? data.data
            : Array.isArray(data?.data?.messages)
            ? data.data.messages
            : [];

          // Store raw messages so we can re-map isMe when profile loads
          rawMessagesRef.current = rawArray;

          // Map with currentUserId (may be null if profile hasn't loaded yet)
          setMessages(toDisplayMessages(rawArray, currentUserId));
        }
      } catch (err: any) {
        console.error("[Messages] fetch error:", err);
        setError(
          err?.response?.data?.message ??
            err?.response?.data?.error ??
            "Failed to load conversation. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Only re-run when the URL identifiers change, NOT on userId changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId, trainerIdFromUrl]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newMessage.trim();
    if (!trimmed || sending) return;

    setSending(true);
    try {
      if (activeConversationId) {
        // Body sent as query param: POST /conversations/{id}/messages?body=...
        await axiosInstance.post(
          `/api/conversations/${activeConversationId}/messages?body=${encodeURIComponent(trimmed)}`
        );
      } else if (trainerIdFromUrl) {
        // No existing conversation — POST to create it first, then send message
        const { data: convData } = await axiosInstance.post(
          `/api/conversations?trainer_id=${trainerIdFromUrl}`
        );
        const newId = extractConversationId(convData);
        if (newId) {
          setActiveConversationId(newId);
          await axiosInstance.post(
            `/api/conversations/${newId}/messages?body=${encodeURIComponent(trimmed)}`
          );
        }
      } else {
        return;
      }

      const optimistic: DisplayMessage = {
        text: trimmed,
        isMe: true,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, optimistic]);
      setNewMessage("");
    } catch (err: any) {
      console.error("[Messages] send error:", err);
      alert(err?.response?.data?.message ?? "Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const headerLabel =
    trainerName ??
    (activeConversationId
      ? `Conversation #${activeConversationId}`
      : trainerIdFromUrl
      ? "Trainer Chat"
      : "Messages");

  return (
    <div className="flex flex-col gap-6 px-4 sm:px-10 h-[80vh] min-h-[600px] mb-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-4xl font-bold text-white">Messages</h2>
      </div>

      <div className="flex-1 bg-black border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl">

        {/* Header */}
        <div className="h-16 border-b border-white/10 bg-[#121212] flex items-center px-6 shrink-0">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">{headerLabel}</h3>
            <p className="text-green-500 text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 block" /> Active
            </p>
          </div>
        </div>

        {/* Body — ref here so we scroll only this container, not the whole page */}
        <div ref={chatBodyRef} className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 bg-[linear-gradient(to_bottom,rgba(54,54,54,0.3),rgba(18,18,18,0.8))]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-muted-foreground animate-pulse text-sm">Loading messages...</p>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full text-red-500 font-bold bg-red-500/10 rounded-lg mx-8 p-4 border border-red-500/20">
              {error}
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full flex-col text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/20">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h4 className="text-white font-bold">No Messages Yet</h4>
              <p className="text-muted-foreground text-sm max-w-xs mt-2">
                Send your first message to start the conversation!
              </p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.isMe ? "justify-end" : "justify-start"} w-full`}>
                <div className="flex flex-col gap-1 max-w-[75%]">
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm ${
                      msg.isMe
                        ? "bg-primary text-primary-foreground rounded-br-sm shadow-md"
                        : "bg-[#363636] text-white rounded-bl-sm border border-white/5 shadow-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.time && (
                    <span className={`text-[10px] text-white/30 ${msg.isMe ? "text-right" : "text-left"}`}>
                      {msg.time}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}

        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10 bg-[#121212] shrink-0">
          <form className="relative flex items-center w-full" onSubmit={handleSend}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={sending}
              className="w-full bg-[#363636] text-white outline-none rounded-full pl-6 pr-14 py-3.5 text-sm ring-1 ring-white/10 focus:ring-primary focus:bg-black transition-all disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!newMessage.trim() || sending}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              {sending ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="translate-x-px translate-y-px">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
