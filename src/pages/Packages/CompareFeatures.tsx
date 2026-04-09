import { Check, ShieldCheck, BadgeCheck } from "lucide-react";
import usePackages from "@/hooks/usePackages";
import type { UiPackage } from "@/types/package";

function CompareFeatures() {
  const { packages: apiPackages } = usePackages();
  
  // Use API packages only as requested
  const packages = apiPackages || [];

  const getPackage = (type: string) => 
    packages.find(pkg => pkg.title.toLowerCase().includes(type.toLowerCase()));

  const singlePkg = getPackage("single");
  const monthlyPkg = getPackage("monthly");
  const premiumPkg = getPackage("premium");

  // Define the features we want to compare based on the API data/structure
  const featureDefinitions = [
    { label: "SESSIONS", key: "sessions" as const },
    { label: "TRAINER", key: "trainer" as const },
    { label: "DURATION", key: "duration" as const },
    { label: "NUTRITION PLAN", key: "Nutrition Plan Included" as const },
    { label: "PROGRESS TRACKING", key: "Progress Tracking" as const },
    { label: "PRIORITY BOOKING", key: "Priority Scheduling" as const },
    { label: "FULL ACCESS", key: "Full Session Access" as const },
  ];

  const getFeatureValue = (pkg: UiPackage | undefined, featureKey: string) => {
    if (!pkg) return null;
    
    if (featureKey === "price") return pkg.price;
    if (featureKey === "sessions") return pkg.sessions.split(' ')[0];
    if (featureKey === "duration") return pkg.duration;
    if (featureKey === "trainer") return pkg.title.toLowerCase().includes("single") ? "Any" : "Dedicated";
    
    // Check if it's a boolean feature in the string array
    return pkg.features.some((f: string) => f.includes(featureKey)) ? true : null;
  };

  return (
    <section className="pt-6 pb-12 sm:pt-8 sm:pb-16 md:pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div
          className="w-full border border-white rounded-sm px-4 sm:px-8 md:px-12 py-6 sm:py-8 md:py-9"
          style={{ background: "linear-gradient(180deg, #1C0606 0%, #110505 40%, #080808 100%)" }}
        >
          <h2 className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-bold text-center mb-8 sm:mb-12 md:mb-16 tracking-widest">Compare Features</h2>
          
          {/* Mobile View - Separate Cards for Each Package */}
          <div className="block sm:hidden">
            {[
              { name: 'SINGLE', pkg: singlePkg },
              { name: 'MONTHLY', pkg: monthlyPkg },
              { name: 'Premium', pkg: premiumPkg }
            ].map((plan, idx) => (
              <div key={idx} className="mb-8 last:mb-0">
                <div className="text-center mb-5">
                  <h3 className="text-xl font-bold text-white mb-1 uppercase tracking-wider">{plan.name}</h3>
                </div>
                <div className="border border-white/20 rounded-lg p-4 bg-white/5">
                  {featureDefinitions.map((feat, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-white/10 last:border-0 text-sm">
                      <span className="text-gray-300 font-semibold capitalize tracking-wider">{feat.label}</span>
                      <span className="font-bold text-white">
                        {getFeatureValue(plan.pkg, feat.key) === true 
                          ? <Check size={16} className="text-orange" /> 
                          : (getFeatureValue(plan.pkg, feat.key) ?? "")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View - Original Table */}
          <div className="hidden sm:block">
            <div className="overflow-x-auto">
              <table className="w-full text-left table-fixed border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-sm md:text-lg lg:text-xl font-black text-text-secondary capitalize tracking-widest">
                    <th className="pb-10 text-white text-lg md:text-3xl w-1/4">Feature</th>
                    <th className="pb-10 text-center w-1/4 align-top">
                      <div className="text-white text-base md:text-2xl mb-1 uppercase">SINGLE</div>
                    </th>
                    <th className="pb-10 text-center w-1/4 align-top">
                      <div className="text-white text-base md:text-2xl mb-1 uppercase">MONTHLY</div>
                    </th>
                    <th className="pb-10 text-center w-1/4 align-top">
                      <div className="text-white text-base md:text-2xl mb-1 uppercase">Premium</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {featureDefinitions.map((feat, index) => (
                    <tr key={index} className="border-b border-white/10 group hover:bg-white/5 transition-colors">
                      <td className="py-6 text-gray-300 font-semibold capitalize tracking-wider text-base md:text-lg">{feat.label}</td>
                      <td className="py-6 text-center font-bold text-white text-base md:text-lg">
                        {getFeatureValue(singlePkg, feat.key) === true 
                          ? <Check size={20} className="mx-auto text-orange" /> 
                          : (getFeatureValue(singlePkg, feat.key) ?? "")}
                      </td>
                      <td className="py-6 text-center font-bold text-white text-base md:text-lg">
                        {getFeatureValue(monthlyPkg, feat.key) === true 
                          ? <Check size={20} className="mx-auto text-orange" /> 
                          : (getFeatureValue(monthlyPkg, feat.key) ?? "")}
                      </td>
                      <td className="py-6 text-center font-bold text-white text-base md:text-lg">
                        {getFeatureValue(premiumPkg, feat.key) === true 
                          ? <Check size={20} className="mx-auto text-orange" /> 
                          : (getFeatureValue(premiumPkg, feat.key) ?? "")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8 md:mt-12 w-full">
          <div className="bg-card-standard border border-card-border px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 lg:py-6 rounded-lg shadow-lg flex items-center space-x-2 sm:space-x-2.5">
            <div className="relative flex items-center justify-center shrink-0 w-5.5 h-5.5 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-11 lg:h-11">
              <ShieldCheck size={22} className="text-[#22c55e] w-full h-full" fill="#22c55e" />
              <Check size={15} className="absolute text-black stroke-4 w-1/2 h-1/2" />
            </div>
            <div className="text-left">
              <h4 className="font-normal text-base sm:text-lg md:text-xl lg:text-2xl tracking-tight mb-1 sm:mb-2 uppercase">30-Day Money-Back Guarantee</h4>
              <p className="text-text-secondary text-[10.5px] sm:text-[12px] md:text-sm lg:text-base mt-1 leading-tight uppercase">
                Not satisfied with your first month? Get a full refund, no questions asked.
              </p>
            </div>
          </div>
          <div className="bg-card-standard border border-card-border px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 lg:py-6 rounded-lg shadow-lg flex items-center space-x-2 sm:space-x-2.5">
            <div className="relative flex items-center justify-center shrink-0 w-5.5 h-5.5 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-11 lg:h-11">
              <BadgeCheck size={22} className="text-[#22c55e] w-full h-full" fill="#22c55e" />
              <Check size={15} className="absolute text-black stroke-4 w-1/2 h-1/2" />
            </div>
            <div className="text-left">
              <h4 className="font-normal text-base sm:text-lg md:text-xl lg:text-2xl tracking-tight mb-1 sm:mb-2 uppercase">All Trainers Certified</h4>
              <p className="text-text-secondary text-[10.5px] sm:text-[12px] md:text-sm lg:text-base mt-1 leading-tight uppercase">
                Every coach holds elite certifications and has proven experience in transforming lives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CompareFeatures;
