import designs from "../../data/designData.js";
import DesignCard from "../design/DesignCard";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import designData from "../../data/designData";

function FeaturedDesigns() {
  return (
    <section className="px-6 md:px-12 py-24 max-w-[1440px] mx-auto">

      <div className="flex flex-col md:flex-row justify-between gap-6 mb-12">

        <div>
          <p className="text-[#a68a64] tracking-[4px] text-xs mb-5">
            OUR SELECTED WORK
          </p>

          <h2 className="text-5xl md:text-6xl font-serif">
            Designed to <span className="italic">Inspire.</span>
          </h2>
        </div>

        <Link
          to="/designs"
          className="flex items-center gap-3 border-b border-black pb-2 w-fit h-fit"
        >
          Explore All Designs <ArrowUpRight size={18} />
        </Link>

      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-12">

        {designData.slice(0, 24).map((design) => (
          <DesignCard key={design.id} design={design} />
        ))}
      </div>

    </section>
  );
}

export default FeaturedDesigns;