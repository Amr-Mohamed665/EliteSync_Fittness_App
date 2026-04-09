import { useState } from "react";
import { Plus } from "lucide-react";
import PayCard from "@/assets/Container.png";
import { useQuery } from "@tanstack/react-query";
import { getBillingPage } from "@/lib/Api/Authentication/profile";
type Invoice = {
  id: string;
  date: string;
  desc: string;
  amount: string;
  status: string;
};

export default function BillingPage() {
  const [invoices] = useState<Invoice[]>([
    {
      id: "INV-2024-010",
      date: "Oct 01, 2024",
      desc: "Single Pack",
      amount: "150 EGY",
      status: "Paid",
    },
  ]);
  const { data } = useQuery({
    queryKey: ["profile-billing-page"],
    queryFn: getBillingPage,
  });
  const cards = data?.payment_methods;
  return (
    <div className="px-4 md:px-8 mt-6 md:mt-10 ">
      <h2 className="text-3xl font-semibold mb-6">Payment Methods</h2>
      <div className="border border-[#A7A7A7] rounded-xl p-8 mb-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <img src={PayCard} alt="Payment Card" className="w-full h-full object-cover rounded-xl" />
        <div className="w-full h-full rounded-xl bg-[#2D2D2D] flex flex-col items-center justify-center gap-2 p-6">
          <Plus className="mb-4 rounded-full bg-[#3D3D3D]" />
          <>
            <p className="text-2xl mb-3">Add New Card</p>
            {cards?.map((card: any) => (
              <p key={card.id}>
                {card.card_type} **** {card.last4}
              </p>

            ))}
          </>
          <p className="text-xs text-[#A7A7A7] mt-2">
            Supports Visa, Mastercard, AMEX
          </p>
        </div>
      </div>
      <h2 className="text-2xl bg-[#FF4D4D26] px-4 py-2 rounded-t-lg">
        Billing History
      </h2>
      <div className="border-b border-[#A7A7A7] rounded-xl">
        <div className="overflow-x-auto">
          <div className="min-w-[480px] px-4">
            <div className="font-semibold text-lg grid grid-cols-5 m-3 text-center">
              <p>Invoice</p>
              <p>Date</p>
              <p>Description</p>
              <p>Amount</p>
              <p>Status</p>
            </div>
            {invoices.map((inv, i) => (
              <div
                key={i}
                className="grid grid-cols-5 py-3 text-[#A7A7A7] text-xs text-center items-center">
                <p>{inv.id}</p>
                <p>{inv.date}</p>
                <p>{inv.desc}</p>
                <p>{inv.amount}</p>
                <span className="bg-[#22C55E1A] text-[#22C55E] text-xs rounded-lg py-1 px-2 mx-auto">
                  {inv.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}