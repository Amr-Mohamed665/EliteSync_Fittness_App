import { useQuery } from "@tanstack/react-query";
import { getPaymentHistory, type Payment } from "@/lib/Api/payments.api";
import { Download, Loader2, CreditCard } from "lucide-react";

interface Invoice {
  id: string;
  date: string;
  description: string;
  amount: string;
  status: "Paid" | "Pending" | "Failed";
}

const getStatusStyle = (status: string) => {
  const styles = {
    Paid: "bg-green-500/15 text-green-400",
    Pending: "bg-yellow-500/15 text-yellow-400",
    Failed: "bg-red-500/15 text-red-400",
  };
  return styles[status as keyof typeof styles] || "bg-blue-500/15 text-blue-400";
};

export default function BillingHistory() {
  const { data: paymentData, isLoading, error } = useQuery({
    queryKey: ["paymentHistory"],
    queryFn: async () => {
      const result = await getPaymentHistory();
      return result;
    },
  });

  const formatPaymentToInvoice = (payment: Payment): Invoice => {
    // Backend might return 'status' or 'payment_status'
    const rawStatus = (payment.status || payment.payment_status || '').toString().toLowerCase();
    
    const paidStatuses = ['completed', 'paid', 'confirmed', 'succeeded', 'success', 'confirmed', 'processed'];
    const pendingStatuses = ['pending', 'processing', 'awaiting_payment', 'awaiting_confirmation'];
    const failedStatuses = ['failed', 'declined', 'cancelled', 'canceled'];

    let mappedStatus: "Paid" | "Pending" | "Failed" = "Pending";
    
    if (paidStatuses.includes(rawStatus)) {
      mappedStatus = "Paid";
    } else if (failedStatuses.includes(rawStatus)) {
      mappedStatus = "Failed";
    } else if (pendingStatuses.includes(rawStatus)) {
      mappedStatus = "Pending";
    } else if (rawStatus) {
      // If we have an unknown status string, capitalize it and hope it makes sense
      mappedStatus = (rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1)) as any;
    }

    return {
      id: `INV-${payment.id}`,
      date: new Date(payment.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      description: payment.description || "Training Session",
      amount: `${payment.currency || 'EGP'} ${Number(payment.amount || 0).toFixed(2)}`,
      status: mappedStatus,
    };
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 px-4 sm:px-10">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Billing History
          </h2>
          <p className="text-sm text-[#a1a1a1] mt-1 p-1">
            View and download your past invoices
          </p>
        </div>
        <div className="border border-[#a1a1a1] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-white/50" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-6 px-4 sm:px-10">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Billing History
          </h2>
          <p className="text-sm text-[#a1a1a1] mt-1 p-1">
            View and download your past invoices
          </p>
        </div>
        <div className="border border-[#a1a1a1] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-center py-12">
            <p className="text-white/50">Failed to load billing history</p>
          </div>
        </div>
      </div>
    );
  }

  const payments = paymentData?.payments?.data || [];
  const invoices = payments.map(formatPaymentToInvoice);

  return (
    <div className="flex flex-col gap-6 px-4 sm:px-10">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Billing History
        </h2>
        <p className="text-sm text-[#a1a1a1] mt-1 p-1">
          View and download your past invoices
        </p>
      </div>

      <div className="border border-[#a1a1a1] rounded-2xl overflow-hidden">
        {invoices.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <CreditCard className="w-12 h-12 mx-auto mb-4 text-white/20" />
              <p className="text-white/50">No billing history yet</p>
              <p className="text-white/30 text-sm mt-1">Your payments will appear here</p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 sm:grid-cols-5 px-3 sm:px-6 py-4 border-b border-[#a1a1a1] bg-[#1a1a1a]/40">
              <span className="text-xs font-bold uppercase tracking-widest text-[#a1a1a1]">Invoice</span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#a1a1a1] hidden sm:block">Date</span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#a1a1a1]">Description</span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#a1a1a1] hidden sm:block">Amount</span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#a1a1a1]">Status</span>
            </div>

            <div className="divide-y divide-[#a1a1a1]">
              {invoices.map((inv: Invoice) => (
                <div
                  key={inv.id}
                  className="grid grid-cols-3 sm:grid-cols-5 items-center px-3 sm:px-6 py-5 hover:bg-primary/5 transition-colors duration-200 group">
                  <span className="text-sm text-white/70 group-hover:text-white transition-colors duration-200 truncate pr-2">
                    {inv.id}
                  </span>
                  <span className="text-sm text-[#a1a1a1] hidden sm:block">{inv.date}</span>
                  <span className="text-sm text-white font-medium truncate pr-2">
                    {inv.description}
                  </span>
                  <span className="text-sm font-bold text-white hidden sm:block">{inv.amount}</span>
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(inv.status)}`}>
                      {inv.status}
                    </span>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-8 h-8 rounded-lg bg-primary/10 hover:bg-primary/20 items-center justify-center cursor-pointer hidden sm:flex">
                      <Download size={14} className="text-primary" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
