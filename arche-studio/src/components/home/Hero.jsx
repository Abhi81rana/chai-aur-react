
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] overflow-hidden bg-[#24231f]">

      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2000"
        alt="Luxury modern architectural villa"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto min-h-[85vh] md:min-h-[90vh] px-6 md:px-12 flex flex-col justify-center text-white">

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xs md:text-sm tracking-[5px] text-[#d1b38b] mb-8"
        >
          ARCHITECTURE · INTERIORS · LIFESTYLE
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-[105px] leading-[0.95] tracking-tight max-w-5xl"
        >
          DESIGNING
          <br />
          SPACES.
          <br />
          <span className="italic text-[#d1b38b]">
            DEFINING LIVES.
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row sm:items-center gap-8"
        >
          <p className="max-w-md text-gray-200 leading-7 text-sm md:text-base">
            We create timeless architectural spaces that bring
            together creativity, functionality and extraordinary design.
          </p>

          <Link
            to="/designs"
            className="group inline-flex items-center gap-4 bg-[#d1b38b] text-[#24231f] px-7 py-4 w-fit hover:bg-white transition"
          >
            Explore Designs
            <ArrowUpRight
              size={18}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition"
            />
          </Link>
        </motion.div>

        {/* Bottom Info */}
        <div className="absolute bottom-8 left-6 right-6 md:left-12 md:right-12 flex justify-between items-center border-t border-white/30 pt-5">

          <p className="text-[10px] tracking-[3px] text-gray-300">
            CREATING TIMELESS SPACES
          </p>

          <div className="flex items-center gap-3 text-xs tracking-widest">
            SCROLL TO EXPLORE
            <ArrowDown size={16} />
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
