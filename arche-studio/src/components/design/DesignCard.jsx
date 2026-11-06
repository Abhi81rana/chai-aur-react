
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

function DesignCard({ design }) {
  return (
    <article className="group">

      <Link to={`/designs/${design.id}`}>
        <div className="relative h-[280px] overflow-hidden rounded-sm">

          <img
            src={design.image}
            alt={design.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <span className="absolute top-4 left-4 bg-[#f5f3ee] px-4 py-2 text-xs">
            {design.category}
          </span>

          <span className="absolute bottom-4 right-4 bg-white p-3 rounded-full">
            <ArrowUpRight size={20} />
          </span>

        </div>

        <div className="flex justify-between items-start mt-4 gap-3">

          <div>
            <h3 className="text-xl font-serif font-semibold group-hover:text-[#a68a64] transition">
              {design.title}
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              {design.style}
            </p>
          </div>

          <p className="text-sm font-medium whitespace-nowrap">
            {design.price}
          </p>

        </div>
      </Link>

    </article>
  );
}

export default DesignCard;
