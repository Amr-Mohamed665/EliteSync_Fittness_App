import photo from "./aseta/HomeTriningPhoto.png";
import EasyBooking from "./aseta/EasyBooking.png";
import ExpertTrainers from "./aseta/ExpertTrainers.png";
import RealProgress from "./aseta/RealProgress.png";
import RefundGuarantee from "./aseta/RefundGuarantee.png";

function WhyEliteSyncSection() {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-5 gap-7 my-24   w-[95%] md:w-[85%] mx-auto px-5 ">
      <div className="  col-span-1 md:col-span-3 flex gap-6 flex-col justify-between">
        <p className=" p-1 rounded-xl text-orange border-orange border w-fit font-bold bg-orange-800/25  mb-2">
          Why EliteSync
        </p>
        <h2 className=" text-white text-4xl md:text-5xl font-extrabold ">
          The Platform Built for{" "}
          <span className=" text-orange mt-2">Serious Results</span>
        </h2>
        <p className=" text-text-secondary text-[16px] sm:text-[18px] ">
          We've engineered every detail of EliteSync to remove friction from
          your fitness journey — from finding the right trainer to tracking your
          progress over time.
        </p>
        <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className=" flex flex-col sm:flex-row items-center gap-2">
            <div className=" w-full sm:w-44 h-20 flex items-center justify-center rounded-md bg-orange-800/25">
              <img src={ExpertTrainers} alt="" />
            </div>
            <div>
              <p>Expert Trainers</p>
              <p className=" text-text-secondary text-sm font-light">
                Our trainers are experts who pass strict tests to give you the
                best fitness experience.
              </p>
            </div>
          </div>
          <div className=" flex flex-col sm:flex-row items-center gap-2">
            <div className=" w-full sm:w-44 h-20 flex items-center justify-center rounded-md bg-orange-800/25">
              <img src={RealProgress} alt="" />
            </div>
            <div>
              <p>Real Progress</p>
              <p className=" text-text-secondary text-sm font-light">
                Follow your workout journey with easy charts and data on your
                personal page.
              </p>
            </div>
          </div>
          <div className=" flex flex-col sm:flex-row items-center gap-2">
            <div className=" w-full sm:w-44 h-20 flex items-center justify-center rounded-md bg-orange-800/25">
              <img src={EasyBooking} alt="" />
            </div>
            <div>
              <p>Easy Booking</p>
              <p className=" text-text-secondary text-sm font-light">
                Book sessions at any hour day or night—we fit your busy daily
                life perfectly.
              </p>
            </div>
          </div>
          <div className=" flex flex-col sm:flex-row items-center gap-2">
            <div className=" w-full sm:w-44 h-20 flex items-center justify-center rounded-md bg-orange-800/25">
              <img src={RefundGuarantee} alt="" />
            </div>
            <div>
              <p>Refund Guarantee</p>
              <p className=" text-text-secondary text-sm font-light">
                Not happy with your first class? We will give you your full
                money back, no stress.
              </p>
            </div>
          </div>
        </div>
      </div>
      <img src={photo} className=" rounded-xl col-span-1 md:col-span-2" />
    </div>
  );
}

export default WhyEliteSyncSection;
