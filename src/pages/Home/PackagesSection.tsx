import PackageCard from "@/components/common/PackageCard";
import { Link } from "react-router-dom";
import usePackages from "@/hooks/usePackages";

function PackagesSection() {
  const { packages, loading } = usePackages();

  return (
    <div className="bg-dark-gradient">
      <section className="pt-10 pb-8 w-[95%] md:w-[85%] mx-auto px-5">
        <div className="text-center mb-6 md:mb-10 px-4">
          <p className="px-3 py-1 mb-3 mx-auto rounded-xl text-orange border-orange border w-fit font-bold bg-orange-800/25">
            Packages
          </p>
          <h2 className="text-white text-3xl md:text-5xl font-extrabold">
            Simple,{" "}
            <span className="text-orange mt-2">Transparent Pricing</span>
          </h2>
          <p className="mt-2 text-text-secondary text-[16px] sm:text-[18px] md:text-[22px] max-w-2xl mx-auto">
            Choose the plan that fits your goals. No hidden fees, no contracts.
            Cancel anytime.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mx-auto items-stretch">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl bg-[#2C2C2E] animate-pulse p-6 space-y-4"
              >
                <div className="h-6 bg-[#3A3A3C] rounded w-1/2 mx-auto" />
                <div className="h-10 bg-[#3A3A3C] rounded w-3/4 mx-auto" />
                <div className="h-4 bg-[#3A3A3C] rounded w-full" />
                <div className="h-4 bg-[#3A3A3C] rounded w-5/6" />
                <div className="h-4 bg-[#3A3A3C] rounded w-4/6" />
                <div className="h-12 bg-[#3A3A3C] rounded mt-6" />
              </div>
            ))}
          </div>
        )}

        {/* Packages Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mx-auto items-stretch">
            {packages.map((pkg, index) => (
              <PackageCard key={index} {...pkg} />
            ))}
          </div>
        )}

        <div className="text-center mt-5">
          <Link className="text-orange font-medium" to={"/packages"}>
            Compare all package features{" "}
          </Link>
        </div>
      </section>
    </div>
  );
}

export default PackagesSection;
