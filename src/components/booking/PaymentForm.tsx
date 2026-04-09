import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { MdSdCard } from "react-icons/md";
import { FaPaypal } from "react-icons/fa";
import PaymentButton from "./PaymentButton";
import AddCardDialog from "./AddCardDialog";
import type { CardData } from "@/hooks/usePaymentCards";
import type { Trainer } from "@/types/trainer";
import type { UiPackage } from "@/types/package";
import toast from "react-hot-toast";
import { payBooking, confirmBooking, confirmPayment } from "@/lib/Api/payments.api";

const PaymentForm = ({
  setBookingConfirmed,
  trainer,
  packageData,
}: {
  setBookingConfirmed: (data: any) => void;
  trainer?: Trainer;
  packageData?: UiPackage;
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [savedCard, setSavedCard] = useState<CardData | null>(null);
  const queryClient = useQueryClient();

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

    if (!bookingId) {
      toast.error("Booking session not found. Please go back and schedule again.");
      return;
    }

    setIsProcessing(true);
    try {
      const response = await payBooking(bookingId, {
        payment_method: "card",
      });

      if (response.status) {
        // Call the confirmation endpoint after successful payment
        try {
          console.log("Pay Booking Success:", response);
          
          // Call booking confirmation
          await confirmBooking(bookingId);
          console.log("Booking confirmed successfully");

          // If there's a payment intent or transaction ID, we might need to confirm it specifically
          if (response.data?.payment_intent_id) {
            await confirmPayment(response.data.payment_intent_id);
            console.log("Payment intent confirmed successfully");
          }
        } catch (confirmErr) {
          console.error("Confirmation step failed:", confirmErr);
        }

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
          };
        } else {
          bookingData = {
            packageTitle: "Training Package",
            date: now.toLocaleDateString(),
            time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            booking_id: bookingId,
            price: 0,
          };
        }

        // Clean up sessionStorage after successful payment
        sessionStorage.removeItem("scheduledBooking");
        // Invalidate payment history query to ensure the new payment shows up in the profile
        queryClient.invalidateQueries({ queryKey: ["paymentHistory"] });
        
        toast.success(response.message || "Payment successful!");
        setBookingConfirmed(bookingData);
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
          icon={<MdSdCard className="text-gray-400" size={18} />}
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
