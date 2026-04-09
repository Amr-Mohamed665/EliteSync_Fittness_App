import FitnessSlider from "./Slider";

function TopTrainers() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-2 overflow-hidden">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Our <span className="text-orange">Top 5</span> Trainers
          </h2>
        </div>
      </div>
      <FitnessSlider />
    </div>
  );
}

export default TopTrainers;
