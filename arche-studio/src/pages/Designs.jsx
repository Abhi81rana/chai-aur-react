
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import designData from "../data/designData";
import DesignCard from "../components/design/DesignCard";

const categories = [
  "All",
  "Architecture",
  "Living Room",
  "Kitchen",
  "Bedroom",
  "Office",
  "Exterior",
];

function Designs() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredDesigns = useMemo(() => {
    return designData.filter((design) => {
      const matchesCategory =
        activeCategory === "All" ||
        design.category === activeCategory;

      const matchesSearch =
        design.title.toLowerCase().includes(search.toLowerCase()) ||
        design.category.toLowerCase().includes(search.toLowerCase()) ||
        design.style.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <main className="min-h-screen">

      {/* PAGE HEADER */}

      <section className="bg-[#24231f] text-white px-6 md:px-12 py-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
          <p className="text-[#d1b38b] tracking-[4px] text-xs mb-6">
            EXPLORE OUR COLLECTION
          </p>

          <h1 className="text-5xl md:text-8xl font-serif leading-tight">
            Spaces That
            <br />
            <span className="italic text-[#d1b38b]">
              Inspire.
            </span>
          </h1>

          <p className="text-gray-400 mt-7 max-w-lg leading-7">
            Discover thoughtfully designed spaces created to
            bring beauty, comfort and functionality together.
          </p>
        </div>
      </section>

      {/* DESIGN COLLECTION */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-20">

        {/* SEARCH */}
        <div className="relative w-full md:w-[380px]">

          <div>
            <p className="text-xs tracking-[3px] text-[#a68a64] mb-2">
              OUR COLLECTION
            </p>

            <h2 className="text-3xl md:text-4xl font-serif">
              Explore Designs
            </h2>
          </div>

          <div className="relative w-full md:w-[350px] h-fit">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search designs, styles..."
              className="w-full bg-white border border-black/10 pl-12 pr-4 py-4 outline-none focus:border-[#a68a64] transition"
            />
          </div>

        </div>

        {/* CATEGORY FILTER */}
        <div className="flex items-center gap-3 overflow-x-auto pb-5 mb-10">

          <SlidersHorizontal
            size={19}
            className="shrink-0 text-[#a68a64]"
          />

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 px-5 py-3 text-sm transition ${
                activeCategory === category
                  ? "bg-[#24231f] text-white"
                  : "bg-white text-[#24231f] border border-black/10 hover:border-[#a68a64]"
              }`}
            >
              {category}
            </button>
          ))}

        </div>

        {/* RESULTS */}
        <div className="flex justify-between items-center mb-8">
          <p className="text-gray-500 text-sm">
            Showing{" "}
            <span className="font-semibold text-[#24231f]">
              {filteredDesigns.length}
            </span>{" "}
            designs
          </p>

          <p className="text-xs text-gray-400 hidden sm:block">
            CURATED BY ARCHÉ STUDIO
          </p>
        </div>

        {/* DESIGN GRID */}
        {filteredDesigns.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-12">
            {filteredDesigns.map((design) => (
              <DesignCard
                key={design.id}
                design={design}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <h3 className="text-2xl font-serif mb-3">
              No designs found
            </h3>

            <p className="text-gray-500 mb-6">
              Try another search or category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="bg-[#24231f] text-white px-6 py-3"
            >
              Clear Filters
            </button>
          </div>
        )}

      </section>
    </main>
  );
}

export default Designs;
