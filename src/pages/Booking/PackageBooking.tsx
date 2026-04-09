import BookingConfirmed from "@/components/booking/BookingConfirmed";
import PaymentAndConfirm from "@/components/booking/PaymentAndConfirm";
import { useState } from "react";
import { useParams } from "react-router-dom";
import usePackages from "@/hooks/usePackages";

const PackageBooking = () => {
  const { packageId } = useParams();
  const [bookingConfirmed, setBookingConfirmed] = useState<any>(null);

  const { packages, loading, error } = usePackages();
  
  const packageData = packages?.find(pkg => pkg.id.toString() === packageId?.toString());

  if (loading) {
    return (
      <section className="bg-gray-950 mt-12">
        <div className="py-24 px-4 sm:px-8 md:px-16 max-w-5xl mx-auto">
          <div className="text-center text-white">Loading package information...</div>
        </div>
      </section>
    );
  }

  if (error || !packageData) {
    return (
      <section className="bg-gray-950 mt-12">
        <div className="py-24 px-4 sm:px-8 md:px-16 max-w-5xl mx-auto">
          <div className="text-center text-red-500">
            {error || "Package not found"}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-950 mt-12">
      <div className="py-24 px-4 sm:px-8 md:px-16 max-w-5xl mx-auto">
        {bookingConfirmed ? (
          <BookingConfirmed details={{ ...bookingConfirmed }} />
        ) : (
          <PaymentAndConfirm 
            setBookingConfirmed={setBookingConfirmed} 
            packageData={packageData}
          />
        )}
      </div>
    </section>
  );
};

export default PackageBooking;
