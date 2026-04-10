import PaymentForm from "./PaymentForm";

import type { Trainer } from "@/types/trainer";

import type { UiPackage } from "@/types/package";

import { useState } from "react";

import { CreditCard } from "lucide-react";

import { type Card } from "@/lib/Api/cards.api";



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

  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  // Get mock cards from cookie (same as PaymentMethods page)
  const localMockCards = (() => {
    const match = document.cookie.match(new RegExp('(^| )mock_cards=([^;]+)'));
    if (match) {
      try {
        return JSON.parse(decodeURIComponent(match[2]));
      } catch { return []; }
    }
    return [];
  })();

  // Force API cards to empty to prevent backend mock collisions (same as PaymentMethods page)
  const rawApiCards: Card[] = [];
  const allCards = [...localMockCards, ...rawApiCards];



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

            <h2 className="text-2xl font-bold mb-4">
              {selectedCard ? 'Confirm Payment' : 'Payment Method'}
            </h2>

            {/* Saved Cards inside Confirm Payment */}
            {allCards.length > 0 && !selectedCard && (
              <div className="w-full mb-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <CreditCard size={20} />
                  Saved Cards
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {allCards.map((card: Card) => (
                    <div
                      key={card.id}
                      onClick={() => setSelectedCard(card.id)}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedCard === card.id
                          ? 'border-orange bg-orange/10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center">
                            <CreditCard size={16} className="text-gray-400" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-white font-medium">
                                {card.card_type?.toUpperCase() || 'CARD'}
                              </p>
                              {card.is_default && (
                                <span className="text-xs text-orange bg-orange/20 px-2 py-1 rounded">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-gray-400 text-sm">
                              •••• •••• •••• {card.last4}
                            </p>
                            {card.card_holder_name && (
                              <p className="text-gray-400 text-sm">
                                {card.card_holder_name}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 text-gray-400 text-sm">
                        Expires {card.exp_month && card.exp_year 
                          ? `${String(card.exp_month).padStart(2, "0")}/${String(card.exp_year).slice(-2)}`
                          : '12/28'
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Card Display */}
            {selectedCard && (
              <div className="w-full mb-6">
                <div className="border border-orange rounded-lg p-4 bg-orange/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center">
                        <CreditCard size={16} className="text-orange" />
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {allCards.find(card => card.id === selectedCard)?.card_type?.toUpperCase() || 'CARD'}
                        </p>
                        <p className="text-gray-400 text-sm">
                          •••• •••• •••• {allCards.find(card => card.id === selectedCard)?.last4}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedCard(null)}
                      className="text-orange hover:text-orange/80 transition-colors text-sm"
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="w-full">

              <PaymentForm 

                setBookingConfirmed={setBookingConfirmed} 

                trainer={trainer}

                packageData={packageData}

                selectedCard={selectedCard ? allCards.find(card => card.id === selectedCard) : null}

              />

            </div>

          </div>

        </div>

      </div>

    </>

  );

};



export default PaymentAndConfirm;

