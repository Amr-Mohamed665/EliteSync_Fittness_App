import { Link } from "react-router-dom";
function FooterSection() {
  return (
    <div className=" my-5 w-[95%] md:w-[85%] mx-auto flex flex-col items-center gap-2 ">
      <p className=" px-3 py-1  rounded-xl text-orange border-orange border w-fit font-bold bg-orange-800/25  mb-2">
        Limited spots available this week
      </p>
      <h2 className=" text-white text-3xl md:text-5xl font-extrabold max-w-xl text-center leading-normal ">
        Your Transformation Starts
        <span className=" text-orange mt-2"> Today</span>
      </h2>
      <p className=" text-text-secondary text-center text-[16px] sm:text-[18px] ">
        Join 2,400+ clients who've already transformed their fitness with
        Elitesync's elite trainers.
      </p>
      <div className=" flex flex-col sm:flex-row gap-3 sm:gap-5 mt-3">
        <Link
          className=" px-3 flex items-center justify-center rounded-md bg-orange h-10 "
          to={"/package-booking/1"}
        >
          Book Your First Session
        </Link>
        <Link
          className=" px-3 flex items-center justify-center rounded-md border-[1px] border-gray-200 h-10 "
          to={"/packages"}
        >
          View Packages
        </Link>
      </div>
      <p className=" text-text-secondary text-[12px] sm:text-[15px] mt-4 ">
        ✓ No commitment ✓ Cancel anytime ✓ Money-back guarantee
      </p>
    </div>
  );
}

export default FooterSection;
