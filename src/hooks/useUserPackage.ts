import { useQuery } from "@tanstack/react-query";
import { getUserPackages } from "@/lib/Api/packages.api";
import { getPaymentHistory } from "@/lib/Api/payments.api";
import type { Package } from "@/types/package";
import type { Payment } from "@/lib/Api/payments.api";

interface UserPackageInfo {
  packageName: string;
  packagePrice: string;
  purchaseDate: string;
}

const useUserPackage = () => {
  const { data: packagesData, isLoading: packagesLoading } = useQuery({
    queryKey: ["userPackages"],
    queryFn: getUserPackages,
  });

  const { data: paymentData, isLoading: paymentsLoading } = useQuery({
    queryKey: ["paymentHistory"],
    queryFn: () => getPaymentHistory(),
  });

  const isLoading = packagesLoading || paymentsLoading;

  // Debug logs
  console.log("useUserPackage - paymentData:", paymentData);
  console.log("useUserPackage - packagesData:", packagesData);
  console.log("useUserPackage - paymentsLoading:", paymentsLoading);
  console.log("useUserPackage - packagesLoading:", packagesLoading);

  const lastSuccessfulPackage: UserPackageInfo | null = (() => {
    console.log("Processing payment data for last successful package...");
    
    // Handle mock data from cookies (same logic as billing history)
    const rawApiData = paymentData?.payments?.data || [];
    const localMockData = (() => {
      const match = document.cookie.match(new RegExp('(^| )mock_payments=([^;]+)'));
      if (match) {
        try {
          return JSON.parse(decodeURIComponent(match[2]));
        } catch {
          return [];
        }
      }
      return [];
    })();
    const allPayments = [...localMockData, ...rawApiData];
    
    console.log("All payments (including mock):", allPayments);

    if (allPayments.length === 0) {
      console.log("No payment data found");
      return null;
    }

    // Get successful payments (completed or pending, matching billing history logic)
    const completedPayments = allPayments.filter(
      (payment: Payment) => payment.status === 'completed' || payment.status === 'pending'
    );

    console.log("Completed payments:", completedPayments);

    if (completedPayments.length === 0) {
      console.log("No completed payments found");
      return null;
    }

    // Sort by created_at date to get the most recent
    const mostRecentPayment = completedPayments.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )[0];

    console.log("Most recent payment:", mostRecentPayment);

    // Try to find matching package from user packages
    let packageName = mostRecentPayment.description;
    console.log("Initial package name from payment description:", packageName);

    if (packagesData?.data) {
      console.log("Available user packages:", packagesData.data);
      const userPackage = packagesData.data.find((pkg: Package) => 
        mostRecentPayment.description.toLowerCase().includes(pkg.title.toLowerCase()) ||
        pkg.title.toLowerCase().includes(mostRecentPayment.description.toLowerCase())
      );
      if (userPackage) {
        packageName = userPackage.title;
        console.log("Found matching user package:", userPackage);
      }
    }

    // Fallback if no package name found
    if (!packageName || packageName.trim() === '') {
      console.log("Package name is empty, using fallback");
      packageName = 'Premium';
    }

    // Special handling for different package types
    let finalPackageName: string;
    const lowerPackageName = packageName.toLowerCase();
    
    if (lowerPackageName.includes('personal training') || lowerPackageName.includes('training session')) {
      finalPackageName = 'Personal Training Client';
    } else if (lowerPackageName.includes('single')) {
      finalPackageName = 'Single Session Member';
    } else {
      finalPackageName = `${packageName} Member`;
    }
    
    console.log("Final package name:", finalPackageName);

    return {
      packageName: finalPackageName,
      packagePrice: `${mostRecentPayment.currency || 'EGP'} ${mostRecentPayment.amount}`,
      purchaseDate: new Date(mostRecentPayment.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };
  })();

  // Create a separate function for profile overview display
  const getProfileOverviewPackageName = (): string | null => {
    if (!lastSuccessfulPackage) return null;
    
    const lowerPackageName = lastSuccessfulPackage.packageName.toLowerCase();
    
    // Map to specific package names for profile overview
    if (lowerPackageName.includes('single')) {
      return 'Single Session Package';
    }
    
    if (lowerPackageName.includes('monthly')) {
      return 'Monthly Package';
    }
    
    if (lowerPackageName.includes('premium')) {
      return 'Premium Package';
    }
    
    // Fallback for other packages - try to categorize
    if (lowerPackageName.includes('personal training') || lowerPackageName.includes('training session')) {
      return 'Premium Package';
    }
    
    if (lowerPackageName.includes('basic')) {
      return 'Basic Package';
    }
    
    if (lowerPackageName.includes('standard')) {
      return 'Standard Package';
    }
    
    // Default fallback
    return 'Premium Package';
  };

  return {
    lastSuccessfulPackage,
    profileOverviewPackageName: getProfileOverviewPackageName(),
    isLoading,
  };
};

export default useUserPackage;
