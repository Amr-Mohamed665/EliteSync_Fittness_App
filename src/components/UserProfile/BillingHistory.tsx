import { useQuery } from "@tanstack/react-query";
import { getPaymentHistory, type Payment } from "@/lib/Api/payments.api";
import { Loader2, CreditCard, Calendar, CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";

export default function BillingHistory() {
  const { data: paymentData, isLoading, error } = useQuery({
    queryKey: ["paymentHistory"],
    queryFn: () => getPaymentHistory(),
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'refunded':
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50 dark:bg-green-950/20';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950/20';
      case 'failed':
        return 'text-red-600 bg-red-50 dark:bg-red-950/20';
      case 'refunded':
        return 'text-blue-600 bg-blue-50 dark:bg-blue-950/20';
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-950/20';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">Failed to load billing history</p>
        </div>
      </div>
    );
  }

  const payments = paymentData?.payments?.data || [];

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <CreditCard className="w-5 h-5 text-foreground" />
        <h3 className="text-base font-semibold text-foreground">Billing History</h3>
      </div>

      {payments.length === 0 ? (
        <div className="text-center py-8">
          <CreditCard className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">No payment history yet</p>
          <p className="text-xs text-muted-foreground mt-1">Your payments will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {payments.map((payment: Payment) => (
            <div
              key={payment.id}
              className="flex items-center justify-between p-4 rounded-lg border border-border bg-background hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                  <CreditCard className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{payment.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-3 h-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">{formatDate(payment.created_at)}</p>
                    <span className="text-muted-foreground">•</span>
                    <p className="text-xs text-muted-foreground">{payment.payment_method}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">
                    {payment.currency || ''} {Number(payment.amount || 0).toFixed(2)}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {getStatusIcon(payment.status || 'pending')}
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(payment.status || 'pending')}`}>
                      {payment.status && typeof payment.status === 'string'
                        ? (payment.status.charAt(0).toUpperCase() + payment.status.slice(1)) 
                        : 'Unknown'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
