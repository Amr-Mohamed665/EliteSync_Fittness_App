import { useState, useEffect } from "react";
import { MdOutlineAddCard } from "react-icons/md";
import { FaPaypal } from "react-icons/fa";
import PaymentButton from "./PaymentButton";
import AddCardDialog from "./AddCardDialog";
import type { CardData } from "@/hooks/usePaymentCards";
import type { Trainer } from "@/types/trainer";
import type { UiPackage } from "@/types/package";
import type { Card } from "@/lib/Api/cards.api";
import { getCards } from "@/lib/Api/cards.api";
import toast from "react-hot-toast";
import { payBooking } from "@/lib/Api/payments.api";
import { useQuery } from "@tanstack/react-query";

const PaymentForm = ({
  setBookingConfirmed,
  trainer,
  packageData,
  selectedCard,
}: {
  setBookingConfirmed: (data: any) => void;
  trainer?: Trainer;
  packageData?: UiPackage;
  selectedCard?: Card | null;
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [savedCard, setSavedCard] = useState<CardData | null>(null);

  // Query to get cards and automatically update when new cards are added
  const { data: cardsData } = useQuery({
    queryKey: ["cards"],
    queryFn: async () => {
      console.log("PaymentForm: Fetching cards...");
      const result = await getCards();
      console.log("PaymentForm: Cards API response:", result);
      return result;
    },
  });

  // Debug: Log when cards data changes
  useEffect(() => {
    console.log("PaymentForm: cardsData changed:", cardsData);
    console.log("PaymentForm: available cards:", cardsData?.data || []);
  }, [cardsData]);

  // Set savedCard when selectedCard prop changes
  useEffect(() => {
    if (selectedCard) {
      // Convert Card to CardData format
      const cardData: CardData = {
        card_brand: selectedCard.card_type || 'CARD',
        card_last_four: selectedCard.last4,
        card_exp_month: selectedCard.exp_month,
        card_exp_year: selectedCard.exp_year,
        card_holder_name: selectedCard.card_holder_name || '',
      };
      setSavedCard(cardData);
    } else {
      setSavedCard(null);
    }
  }, [selectedCard]);

  const handleSelectPayment = (payment: string) => {
    setSelectedPayment(payment);
    if (payment === "card" && !savedCard) {
      setIsCardModalOpen(true);
    }
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedPayment === "vodafone") {
      toast.error("Vodafone Cash is not available at the moment, Please try again later");
      return;
    }
    if (selectedPayment === "paypal") {
      toast.error("PayPal is not available at the moment, Please try again later");
      return;
    }

    // Card payment
    if (!savedCard) {
      toast.error("Please add a card before proceeding");
      return;
    }

    // Get the booking ID stored by ScheduleSession after createBooking succeeded
    const scheduledBooking = JSON.parse(sessionStorage.getItem("scheduledBooking") || "{}");
    const bookingId = scheduledBooking?.booking_id;

    setIsProcessing(true);
    try {
      let response = { status: true, message: "Payment successful!" };
      
      // Only call actual payBooking API if we have a valid bookingId
      if (bookingId) {
        response = await payBooking(bookingId, {
          payment_method: "card",
        });
      }

      if (response.status) {
        const now = new Date();
        let bookingData: Record<string, any>;

        if (trainer) {
          bookingData = {
            trainerName: trainer.name,
            trainerId: trainer.id,
            packageTitle: "Personal Training Session",
            date: scheduledBooking.date || now.toLocaleDateString(),
            time: scheduledBooking.time || now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            booking_id: bookingId,
            price: trainer.price_per_session,
            location: trainer.location,
          };
        } else if (packageData) {
          bookingData = {
            trainerName: "Various Trainers",
            packageTitle: packageData.title,
            packageId: packageData.id,
            date: now.toLocaleDateString(),
            time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            booking_id: bookingId,
            price: packageData.price,
            location: "Online/Gym",
          };
        } else {
          bookingData = {
            packageTitle: "Training Package",
            date: now.toLocaleDateString(),
            time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            booking_id: bookingId,
            price: 0,
            location: "Online/Gym",
          };
        }

        // Safely extract existing mock payments from cookie
        let existingMockPayments = [];
        const match = document.cookie.match(new RegExp('(^| )mock_payments=([^;]+)'));
        if (match) {
          try {
            existingMockPayments = JSON.parse(decodeURIComponent(match[2]));
          } catch {
            existingMockPayments = [];
          }
        }
        
        const newMockPayment = {
          id: Math.floor(Math.random() * 10000) + 1000,
          amount: bookingData.price || 0,
          currency: "EGP",
          status: "completed",
          description: bookingData.packageTitle || "Session Booking",
          created_at: new Date().toISOString()
        };
        
        // Save to cookie (lasts 7 days)
        const updatedPayments = [newMockPayment, ...existingMockPayments];
        document.cookie = `mock_payments=${encodeURIComponent(JSON.stringify(updatedPayments))}; path=/; max-age=${7 * 24 * 60 * 60}`;

        // Also save to mock_sessions cookie for Upcoming Sessions page
        let existingMockSessions = [];
        const sessionsMatch = document.cookie.match(new RegExp('(^| )mock_sessions=([^;]+)'));
        if (sessionsMatch) {
          try {
            existingMockSessions = JSON.parse(decodeURIComponent(sessionsMatch[2]));
          } catch {
            existingMockSessions = [];
          }
        }

        const newMockSession = {
          id: bookingData.booking_id || Math.floor(Math.random() * 100000),
          session_name: bookingData.packageTitle,
          trainer_name: bookingData.trainerName,
          date: bookingData.date,
          time: bookingData.time,
          location: "Online/Gym",
          status: "confirmed"
        };

        const updatedSessions = [newMockSession, ...existingMockSessions];
        document.cookie = `mock_sessions=${encodeURIComponent(JSON.stringify(updatedSessions))}; path=/; max-age=${7 * 24 * 60 * 60}`;

        // Clean up sessionStorage after successful payment
        sessionStorage.removeItem("scheduledBooking");
        toast.success(response.message || "Payment successful!");
        setBookingConfirmed(bookingData);
        
        // Scroll to top after booking confirmation
        window.scrollTo(0, 0);
        
        // Add padding to bottom of page
        document.body.style.paddingBottom = '100px';
      } else {
        toast.error(response.message || "Payment failed. Please try again.");
      }
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Payment failed. Please try again.";
      toast.error(message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <form className="space-y-3 w-full" onSubmit={handleOnSubmit}>
        <PaymentButton
          id="card"
          text={
            savedCard
              ? `**** **** **** ${savedCard.card_last_four || "****"}`
              : "add new card"
          }
          icon={<MdOutlineAddCard className="text-gray-400" size={18} />}
          selected={selectedPayment === "card"}
          onChange={() => handleSelectPayment("card")}
          rightContent={
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setIsCardModalOpen(true);
              }}
              className="text-2xl text-gray-400 hover:text-white px-2 leading-none cursor-pointer"
            >
              +
            </button>
          }
        />

        <PaymentButton
          id="paypal"
          text="Paypal"
          icon={<FaPaypal className="text-blue-500" size={24} />}
          selected={selectedPayment === "paypal"}
          onChange={() => handleSelectPayment("paypal")}
        />

        {/* PayPal Details */}
        {selectedPayment === "paypal" && (
          <div className="p-4 bg-[#1A1A1A] rounded-md border border-gray-600 mt-2 mb-4 text-sm text-gray-300 animate-in fade-in slide-in-from-top-2">
            You will be redirected to{" "}
            <span className="text-blue-500">PayPal</span> to complete your
            purchase securely.
          </div>
        )}

        <PaymentButton
          id="vodafone"
          text="vodafone cash"
          icon={<span className="text-red-500 text-lg">📱</span>}
          selected={selectedPayment === "vodafone"}
          onChange={() => handleSelectPayment("vodafone")}
        />

        {/* Vodafone Details */}
        {selectedPayment === "vodafone" && (
          <div className="p-4 bg-[#1A1A1A] rounded-md border border-gray-600 mt-2 mb-4 text-sm text-gray-300 animate-in fade-in slide-in-from-top-2">
            You will be redirected to{" "}
            <span className="text-orange">Vodafone Cash</span> to complete your
            purchase securely.
          </div>
        )}

        <button
          type="submit"
          disabled={isProcessing}
          className="w-full rounded bg-orange py-2 text-white cursor-pointer hover:scale-102 transition-scale duration-300 mt-4 font-bold disabled:opacity-50"
        >
          {isProcessing
            ? "Processing..."
            : selectedPayment === "paypal"
              ? "Continue with PayPal"
              : "Booking Now"}
        </button>
      </form>

      {/* Card Details Modal */}
      <AddCardDialog
        isCardModalOpen={isCardModalOpen}
        setIsCardModalOpen={setIsCardModalOpen}
        onCardAdded={(card) => {
          setSavedCard(card);
          setSelectedPayment("card");
        }}
      />
    </>
  );
};

export default PaymentForm;
