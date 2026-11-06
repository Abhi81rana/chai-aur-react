
import { Link } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";

import { useApp } from "../context/AppContext";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useApp();

  return (
    <main className="min-h-screen px-6 md:px-12 py-20 max-w-[1440px] mx-auto">

      <p className="text-[#a68a64] tracking-[4px] text-xs mb-5">
        YOUR PERSONAL COLLECTION
      </p>

      <h1 className="text-5xl md:text-7xl font-serif">
        My <span className="italic">Wishlist.</span>
      </h1>

      <p className="text-gray-500 mt-5 mb-12">
        Your favourite architectural designs, all in one place.
      </p>

      {wishlist.length === 0 ? (
        <div className="bg-white text-center py-20 px-6">
          <Heart size={40} className="mx-auto text-[#a68a64] mb-5" />

          <h2 className="text-3xl font-serif">
            Your wishlist is empty
          </h2>

          <p className="text-gray-500 mt-3 mb-7">
            Explore our collection and save your favourite designs.
          </p>

          <Link
            to="/designs"
            className="bg-[#24231f] text-white px-7 py-4 inline-block"
          >
            Explore Designs
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {wishlist.map((design) => (
            <article key={design.id} className="bg-white p-4">

              <Link to={`/designs/${design.id}`}>
                <img
                  src={design.image}
                  alt={design.title}
                  className="w-full h-[260px] object-cover"
                />

                <h2 className="text-2xl font-serif mt-5">
                  {design.title}
                </h2>
              </Link>

              <p className="text-gray-500 text-sm mt-2">
                {design.category} · {design.style}
              </p>

              <div className="flex justify-between items-center mt-5">

                <span className="text-sm font-medium">
                  {design.price}
                </span>

                <button
                  onClick={() => removeFromWishlist(design.id)}
                  className="text-red-500 flex items-center gap-2 text-sm"
                >
                  <Trash2 size={17} />
                  Remove
                </button>

              </div>

            </article>
          ))}

        </div>
      )}

    </main>
  );
}

export default Wishlist;
