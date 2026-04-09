import BookingConfirmed from "@/components/booking/BookingConfirmed";

import PaymentAndConfirm from "@/components/booking/PaymentAndConfirm";

import { useState } from "react";

import { useParams } from "react-router-dom";

import useTrainer from "@/hooks/useTrainer";



const Booking = () => {

  const { packageId: trainerId } = useParams();

  const { trainer, loading, error } = useTrainer(trainerId);

  const [bookingConfirmed, setBookingConfirmed] = useState<any>(null);

  

  // Get scheduled booking data from sessionStorage

  const scheduledBooking = JSON.parse(sessionStorage.getItem('scheduledBooking') || '{}');



  if (loading) {

    return (

      <section className="bg-gray-950 mt-12">

        <div className="py-24 px-4 sm:px-8 md:px-16 max-w-5xl mx-auto">

          <div className="text-center text-white">Loading trainer information...</div>

        </div>

      </section>

    );

  }



  if (error || !trainer) {

    return (

      <section className="bg-gray-950 mt-12">

        <div className="py-24 px-4 sm:px-8 md:px-16 max-w-5xl mx-auto">

          <div className="text-center text-red-500">

            {error || "Trainer not found"}

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

            trainer={trainer}

            scheduledBooking={scheduledBooking}

          />

        )}

      </div>

    </section>

  );

};



export default Booking;

