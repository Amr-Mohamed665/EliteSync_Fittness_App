import trainerBackground from "../../../../public/TrainersBackground.gif";

function TrainersHero() {
  return (
    <>
      {/* bg trainers  */}
      <div>
        <img 
          src={trainerBackground} 
          alt="Trainers Background" 
          className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[589px] object-cover" 
        />
      </div>
    </>
  );
}

export default TrainersHero;
