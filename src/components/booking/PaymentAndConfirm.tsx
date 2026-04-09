import PaymentForm from "./PaymentForm";

import type { Trainer } from "@/types/trainer";

import type { UiPackage } from "@/types/package";



const PaymentAndConfirm = ({

  setBookingConfirmed,

  trainer,

  packageData,

  scheduledBooking,

}: {

  setBookingConfirmed: (data: any) => void;

  trainer?: Trainer;

  packageData?: UiPackage;

  scheduledBooking?: any;

}) => {

  const isTrainerBooking = !!trainer;

  const isPackageBooking = !!packageData;



  return (

    <>

      <h1 className="font-bold text-3xl text-center mb-8">Payment & Confirm</h1>



      {/* Trainer Information - only show for trainer bookings */}

      {isTrainerBooking && (

        <div className="bg-[#2D2D2D] rounded-md border border-gray-500 p-6 mb-6">

          <div className="flex items-center gap-4">

            <img

              src={trainer.profile_image || "/trainer.png"}

              alt={trainer.name}

              className="w-16 h-16 rounded-full object-cover"

              onError={(e) => {

                (e.target as HTMLImageElement).src = "/trainer.png";

              }}

            />

            <div>

              <h3 className="text-xl font-bold text-white">{trainer.name}</h3>

              <p className="text-gray-400">Personal Trainer</p>

              <p className="text-orange font-semibold">EGP {trainer.price_per_session} / session</p>

            </div>

          </div>

        </div>

      )}



      {/* Scheduled Session Information */}

      {isTrainerBooking && scheduledBooking?.date && scheduledBooking?.time && scheduledBooking.date !== 'undefined' && scheduledBooking.time !== 'undefined' && (

        <div className="bg-[#2D2D2D] rounded-md border border-gray-500 p-4 mb-6">

          <h3 className="text-lg font-semibold text-white mb-2">Scheduled Session</h3>

          <div className="text-white font-medium">

            {(() => {
              // Parse the date as local date and display in user's timezone
              const [year, month, day] = scheduledBooking.date.split('-').map(Number);
              const date = new Date(year, month - 1, day); // month is 0-indexed
              return date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric'
              });
            })()} at {scheduledBooking.time}

          </div>

        </div>

      )}



      {/* Package Information - only show for package bookings */}

      {isPackageBooking && (

        <div className="bg-[#2D2D2D] rounded-md border border-gray-500 p-6 mb-6">

          <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-full bg-orange/20 flex items-center justify-center">

              <span className="text-orange font-bold text-xl">PKG</span>

            </div>

            <div>

              <h3 className="text-xl font-bold text-white">{packageData.title}</h3>

              <p className="text-gray-400">Training Package</p>

              <p className="text-orange font-semibold">EGP {packageData.price} / package</p>

            </div>

          </div>

        </div>

      )}



      <div className="bg-[#2D2D2D] rounded-md border border-gray-500 py-6 px-4 sm:py-8 sm:px-8 md:px-12 lg:px-24">

        <div className="max-w-3xl mx-auto border rounded border-gray-500 px-4 py-8 bg-gray-950">

          <div className="flex flex-col items-center gap-4 justify-center px-4 md:px-24">

            <h2 className="text-2xl font-bold mb-4">Payment Method</h2>

            <div className="w-full">

              <PaymentForm 

                setBookingConfirmed={setBookingConfirmed} 

                trainer={trainer}

                packageData={packageData}

              />

            </div>

          </div>

        </div>

      </div>

    </>

  );

};



export default PaymentAndConfirm;

