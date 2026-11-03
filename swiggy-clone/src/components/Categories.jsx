
import React from "react";
import { ArrowRight } from "lucide-react";
import { categories } from "../data/products";

function Categories({ onSelectCategory, selectedCategory }) {
  return (
    <section className="section" id="categories">

      <div className="section-heading">
        <h2>What's on your mind?</h2>

        <button
          className="view-all"
          onClick={() => onSelectCategory("All")}
        >
          View All <ArrowRight size={17} />
        </button>
      </div>

      <div className="category-grid">
        {categories.map((item) => (
          <button
            className={`category-card ${
              selectedCategory === item.name ? "selected" : ""
            }`}
            key={item.name}
            onClick={() => onSelectCategory(item.name)}
          >
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
          </button>
        ))}
      </div>

    </section>
  );
}

export default Categories;
