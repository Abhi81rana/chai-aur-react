
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";

import designData from "../data/designData";

function DesignDetails() {
  const { id } = useParams();

  const design = designData.find(
    (item) => item.id === Number(id)
  );

  if (!design) {
    return (
      <section className="min-h-[60vh] flex flex-col items-center justify-center px-6">
        <h1 className="text-4xl font-serif mb-4">
          Design Not Found
        </h1>

        <Link
          to="/designs"
          className="bg-[#24231f] text-white px-6 py-3"
        >
          Back to Designs
        </Link>
      </section>
    );
  }

  return (
    <main className="bg-[#f5f3ee]">

      {/* HEADER */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-10">

        <Link
          to="/designs"
          className="inline-flex items-center gap-3 text-sm text-gray-500 hover:text-[#a68a64]"
        >
          <ArrowLeft size={18} />
          Back to Collection
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 mt-12 items-center">

          {/* IMAGE */}
          <div className="h-[350px] md:h-[550px] overflow-hidden">
            <img
              src={design.image}
              alt={design.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* DETAILS */}
          <div>

            <p className="text-[#a68a64] tracking-[4px] text-xs mb-6">
              ARCHÉ SELECTED COLLECTION
            </p>

            <h1 className="text-5xl md:text-7xl font-serif leading-tight">
              {design.title}
            </h1>

            <p className="text-gray-500 mt-5 leading-8">
              {design.description}
            </p>

            <div className="border-y border-black/10 my-10 py-7 grid grid-cols-2 gap-7">

              <div>
                <p className="text-xs tracking-widest text-gray-400 mb-3">
                  CATEGORY
                </p>
                <p className="font-semibold">{design.category}</p>
              </div>

              <div>
                <p className="text-xs tracking-widest text-gray-400 mb-3">
                  DESIGN STYLE
                </p>
                <p className="font-semibold">{design.style}</p>
              </div>

              <div className="col-span-2">
                <p className="text-xs tracking-widest text-gray-400 mb-3">
                  ESTIMATED BUDGET
                </p>
                <p className="text-2xl font-serif">{design.price}</p>
              </div>

            </div>

            <div className="flex items-start gap-3 mb-8 text-sm text-gray-500">
              <Check size={18} className="text-[#a68a64] shrink-0" />
              <p>
                Final pricing depends on dimensions, materials,
                location and project requirements.
              </p>
            </div>

            <Link
              to={`/contact?design=${design.id}`}
              className="inline-flex items-center gap-5 bg-[#24231f] text-white px-8 py-5 hover:bg-[#a68a64] transition"
            >
              Request a Quote
              <ArrowUpRight size={20} />
            </Link>

          </div>
        </div>
      </section>

    </main>
  );
}

export default DesignDetails;
