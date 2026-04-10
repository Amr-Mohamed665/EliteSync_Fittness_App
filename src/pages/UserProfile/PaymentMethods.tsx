import { Plus, Trash2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCards, deleteCard, type Card } from "@/lib/Api/cards.api";
import { useState, useEffect } from "react";
import AddCardDialog from "@/components/booking/AddCardDialog";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

export default function PaymentMethods() {
  const queryClient = useQueryClient();
  const { data: cardsData, isLoading } = useQuery({
    queryKey: ["cards"],
    queryFn: async () => {
      const result = await getCards();
      console.log("Cards API response:", result);
      console.log("Cards array:", result?.data);
      console.log("Full response:", JSON.stringify(result, null, 2));
      return result;
    },
  });
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [localCards, setLocalCards] = useState<Card[]>([]);

  const deleteCardMutation = useMutation({
    mutationFn: async (cardId: number) => {
      console.log("Deleting card with ID:", cardId);
      console.log("Delete endpoint:", `/api/cards/${cardId}`);
      const result = await deleteCard(cardId);
      console.log("Delete response:", result);
      return result;
    },
    onSuccess: () => {
      toast.success("Card deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
    onError: (error: any) => {
      console.error("Delete card error:", error);
      console.error("Delete error response:", error?.response?.data);
      
      const errorMessage = error?.response?.data?.message || error.message || "Failed to delete card";
      
      // Don't show the specific UserCard model error
      if (errorMessage.includes("No query results for model") && errorMessage.includes("UserCard")) {
        // Don't show toast for this specific error
        return;
      }
      
      toast.error(errorMessage);
    },
  });

  const rawApiCards: Card[] = []; // Forced empty to prevent backend mock collisions
  const localMockCards = (() => {
    const match = document.cookie.match(new RegExp('(^| )mock_cards=([^;]+)'));
    if (match) {
      try {
        return JSON.parse(decodeURIComponent(match[2]));
      } catch { return []; }
    }
    return [];
  })();

  // Sync local state with query data on mount and when data changes
  useEffect(() => {
    const allCards = [...localMockCards, ...rawApiCards];
    setLocalCards(allCards);
  }, [cardsData]);

  const cards: Card[] = [...localMockCards, ...rawApiCards];

  console.log("Parsed cards:", cards);
  cards.forEach((card, index) => {
    console.log(`Card ${index + 1} fields:`, Object.keys(card));
    console.log(`Card ${index + 1} data:`, card);
  });

  const handleDeleteCard = async (cardId: number) => {
    console.log("Attempting to delete card with ID:", cardId);
    
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this card?",
      iconHtml: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>',
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      didOpen: () => {
        const style = document.createElement('style');
        style.textContent = '.swal2-icon { border: none !important; background: #fecaca !important; border-radius: 50% !important; width: 80px !important; height: 80px !important; display: flex !important; align-items: center !important; justify-content: center !important; }';
        document.head.appendChild(style);
      }
    });

    if (result.isConfirmed) {
      console.log("User confirmed deletion");
      
      // First try to delete from local mock cards cookie
      const match = document.cookie.match(new RegExp('(^| )mock_cards=([^;]+)'));
      console.log("Cookie match:", match);
      
      if (match) {
        try {
          const mockCards = JSON.parse(decodeURIComponent(match[2]));
          console.log("Current mock cards:", mockCards);
          
          const filtered = mockCards.filter((c: any) => c.id !== cardId);
          console.log("Filtered cards after deletion:", filtered);
          
          document.cookie = `mock_cards=${encodeURIComponent(JSON.stringify(filtered))}; path=/; max-age=${7 * 24 * 60 * 60}`;
          console.log("Updated cookie with filtered cards");
          
          toast.success("Card deleted successfully");
          
          // Immediate UI update using local state
          setLocalCards(filtered);
          
          return; // Stop here if it was a mock card
        } catch (error) {
          console.error("Error parsing mock cards:", error);
        }
      }

      // Also try API deletion for consistency
      deleteCardMutation.mutate(cardId);
    } else {
      console.log("User cancelled deletion");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 px-4 sm:px-10">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Payment Methods</h2>
          <p className="text-sm text-[#a1a1a1] mt-1">Manage your saved cards and payment options</p>
        </div>
        <div className="animate-pulse h-56 bg-muted rounded-3xl"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-4 sm:px-10">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Payment Methods
        </h2>
        <p className="text-sm text-[#a1a1a1] mt-1">
          Manage your saved cards and payment options
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Saved Cards */}
        {localCards.map((card: Card) => (
          <div 
            key={card.id}
            className="relative bg-gradient-to-br from-[#1a3a6b] via-[#0f2348] to-[#0a1628] rounded-3xl p-7 flex flex-col justify-between min-h-[220px] shadow-2xl overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />

            {/* Action Buttons */}
            <div className="absolute top-1 right-1 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => handleDeleteCard(card.id)}
                className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors"
                title="Delete card"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>

            <div className="relative flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-white text-lg font-bold tracking-wide">
                  {card.is_default ? "Default Card" : "Saved Card"}
                </span>
              </div>
              <span className="text-white font-black text-2xl italic tracking-wider">
                {card.card_type?.toUpperCase() || "CARD"}
              </span>
            </div>

            <div className="relative flex flex-col gap-1 mt-2">
              <span className="text-xs text-white/40 uppercase tracking-widest">
                Card Number
              </span>
              <span className="text-white text-lg tracking-[0.25em] font-medium">
                •••• •••• •••• {card.last4}
              </span>
            </div>

            <div className="relative flex items-end justify-between mt-2">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-white/40 uppercase tracking-widest">
                  Card Holder
                </span>
                <span className="text-white font-semibold text-base">
                  {card.card_holder_name || "Card Holder"}
                </span>
              </div>
              <div className="flex items-end gap-6">
                <div className="flex flex-col gap-0.5 text-right">
                  <span className="text-xs text-white/40 uppercase tracking-widest">
                    Expires
                  </span>
                  <span className="text-white font-semibold">
                    {card.exp_month && card.exp_year 
                      ? `${String(card.exp_month).padStart(2, "0")}/${String(card.exp_year).slice(-2)}` 
                      : (card as any).expiry_date || "12/28"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Card */}
        <div 
          onClick={() => setIsCardModalOpen(true)}
          className="border-2 border-dashed border-[#a1a1a1]/40 rounded-3xl p-7 flex flex-col items-center justify-center gap-4 min-h-[220px] cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group">
          <div className="w-14 h-14 rounded-2xl bg-[#a1a1a1]/10 group-hover:bg-primary/10 flex items-center justify-center transition-colors duration-300">
            <Plus
              size={26}
              className="text-[#a1a1a1] group-hover:text-primary transition-colors duration-300"
            />
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-white text-lg font-bold group-hover:text-primary transition-colors duration-300">
              Add New Card
            </span>
            <span className="text-sm text-[#a1a1a1] text-center">
              Visa, Mastercard, AMEX
            </span>
          </div>
        </div>
      </div>

      <AddCardDialog
        isCardModalOpen={isCardModalOpen}
        setIsCardModalOpen={setIsCardModalOpen}
        onCardAdded={() => {
          queryClient.invalidateQueries({ queryKey: ["cards"] });
        }}
      />

      {cards.length === 0 && (
        <p className="text-[#a1a1a1] text-center py-8">No saved payment methods</p>
      )}
    </div>
  );
}
