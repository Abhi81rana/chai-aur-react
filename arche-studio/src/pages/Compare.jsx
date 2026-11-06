
import { Link } from "react-router-dom";
import { Trash2, GitCompareArrows } from "lucide-react";

import { useApp } from "../context/AppContext";

function Compare() {
  const { compareList, removeFromCompare } = useApp();

  const rows = [
    { label: "Category", key: "category" },
    { label: "Design Style", key: "style" },
    { label: "Estimated Budget", key: "price" },
    { label: "Description", key: "description" },
  ];

  return (
    <main className="min-h-screen max-w-[1440px] mx-auto px-6 md:px-12 py-20">

      <p className="text-[#a68a64] tracking-[4px] text-xs mb-5">
        MAKE THE RIGHT CHOICE
      </p>

      <h1 className="text-5xl md:text-7xl font-serif">
        Compare <span className="italic">Designs.</span>
      </h1>

      <p className="text-gray-500 mt-5 mb-12">
        Compare up to three designs side by side.
      </p>

      {compareList.length === 0 ? (
        <div className="bg-white py-20 px-6 text-center">

          <GitCompareArrows
            size={40}
            className="mx-auto text-[#a68a64] mb-5"
          />

          <h2 className="text-3xl font-serif">
            Nothing to compare yet
          </h2>

          <p className="text-gray-500 mt-3 mb-7">
            Select designs from our collection to compare them.
          </p>

          <Link
            to="/designs"
            className="bg-[#24231f] text-white px-7 py-4 inline-block"
          >
            Browse Designs
          </Link>

        </div>
      ) : (

        <div className="overflow-x-auto bg-white">

          <table className="w-full min-w-[650px] border-collapse text-left">

            <thead>
              <tr>
                <th className="p-5 border-b w-44">
                  Features
                </th>

                {compareList.map((design) => (
                  <th key={design.id} className="p-5 border-b">
                    <img
                      src={design.image}
                      alt={design.title}
                      className="w-full h-40 object-cover mb-4"
                    />

                    <h3 className="font-serif text-xl">
                      {design.title}
                    </h3>

                    <button
                      onClick={() => removeFromCompare(design.id)}
                      className="mt-3 text-red-500 flex items-center gap-2 text-sm font-normal"
                    >
                      <Trash2 size={15} />
                      Remove
                    </button>
                  </th>
                ))}

              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr key={row.key}>
                  <th className="p-5 border-b text-sm font-medium text-gray-500">
                    {row.label}
                  </th>

                  {compareList.map((design) => (
                    <td
                      key={design.id}
                      className="p-5 border-b text-sm leading-7 align-top"
                    >
                      {design[row.key]}
                    </td>
                  ))}
                </tr>
              ))}

              <tr>
                <th className="p-5">Action</th>

                {compareList.map((design) => (
                  <td key={design.id} className="p-5">
                    <Link
                      to={`/designs/${design.id}`}
                      className="text-[#a68a64] underline text-sm"
                    >
                      View Details
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>

          </table>

        </div>
      )}

    </main>
  );
}

export default Compare;
