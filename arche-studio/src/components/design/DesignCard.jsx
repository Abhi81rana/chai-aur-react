
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Heart,
  GitCompareArrows,
} from "lucide-react";

import { useApp } from "../../context/AppContext";

function DesignCard({ design }) {
  const {
    wishlist,
    toggleWishlist,
    addToCompare,
  } = useApp();

  const isWishlisted = wishlist.some(
    (item) => item.id === design.id
  );

  const handleCompare = () => {
    const result = addToCompare(design);
    window.alert(result.message);
  };

  return (
    <article className="group">

      <div className="relative h-[280px] overflow-hidden rounded-sm">

        <Link to={`/designs/${design.id}`}>
          <img
            src={design.image}
            alt={design.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>

        <span className="absolute top-4 left-4 bg-[#f5f3ee] px-4 py-2 text-xs">
          {design.category}
        </span>

        <div className="absolute top-4 right-4 flex gap-2">

          <button
            onClick={() => toggleWishlist(design)}
            aria-label="Toggle wishlist"
            className="bg-white p-3 rounded-full shadow hover:scale-110 transition"
          >
            <Heart
              size={18}
              fill={isWishlisted ? "#a68a64" : "none"}
              color={isWishlisted ? "#a68a64" : "#24231f"}
            />
          </button>

          <button
            onClick={handleCompare}
            aria-label="Add to compare"
            className="bg-white p-3 rounded-full shadow hover:scale-110 transition"
          >
            <GitCompareArrows size={18} />
          </button>

        </div>

        <Link
          to={`/designs/${design.id}`}
          aria-label={`View ${design.title}`}
          className="absolute bottom-4 right-4 bg-white p-3 rounded-full"
        >
          <ArrowUpRight size={20} />
        </Link>

      </div>

      <Link to={`/designs/${design.id}`}>
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
