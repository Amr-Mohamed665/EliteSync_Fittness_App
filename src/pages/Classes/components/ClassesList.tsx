function ClassesList() {
  const classes = [
    { id: 1, name: "Yoga", description: "Improve flexibility and find inner peace", duration: "60 min", level: "All Levels" },
    { id: 2, name: "HIIT", description: "High intensity interval training for maximum results", duration: "45 min", level: "Intermediate" },
    { id: 3, name: "Strength Training", description: "Build muscle and increase strength", duration: "60 min", level: "All Levels" },
    { id: 4, name: "Cardio Kickboxing", description: "Burn calories with dynamic martial arts moves", duration: "45 min", level: "Beginner" },
    { id: 5, name: "Pilates", description: "Core strength and body conditioning", duration: "50 min", level: "All Levels" },
    { id: 6, name: "Spin Class", description: "High energy indoor cycling workout", duration: "45 min", level: "Intermediate" },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-white py-6 text-center md:text-left">
        Available <span className="text-orange">Classes</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <div
            key={classItem.id}
            className="rounded-2xl overflow-hidden bg-[#2C2C2E] text-white shadow-lg p-6 hover:bg-[#3A3A3C] transition-colors"
          >
            <h3 className="font-bold text-xl mb-2">{classItem.name}</h3>
            <p className="text-gray-400 text-sm mb-4">{classItem.description}</p>
            <div className="flex justify-between items-center text-sm">
              <span className="text-orange">{classItem.duration}</span>
              <span className="text-gray-400">{classItem.level}</span>
            </div>
            <button className="w-full mt-4 bg-orange hover:bg-[#e04345] transition-colors text-white font-bold py-3 rounded-xl">
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClassesList;
