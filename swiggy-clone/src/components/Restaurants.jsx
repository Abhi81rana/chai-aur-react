
import React from "react";
import { Search, Star, ArrowRight } from "lucide-react";
import { restaurants } from "../data/products";

function Restaurants({ search, setSearch, selectedCategory }) {

  const filteredRestaurants = restaurants.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="section restaurant-section" id="restaurants">

      <div className="section-heading">
        <h2>Top restaurant chains</h2>
        <span className="restaurant-count">
          {filteredRestaurants.length} Restaurants
        </span>
      </div>

      <div className="restaurant-search">
        <Search size={20} />

        <input
          type="text"
          placeholder="Search restaurants or food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && (
          <button onClick={() => setSearch("")}>
            Clear
          </button>
        )}
      </div>

      <div className="restaurant-grid">

        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((item) => (

            <div className="restaurant-card" key={item.id}>

              <div className="restaurant-image">
                <img src={item.image} alt={item.name} />

                <span className="discount">
                  {item.offer}
                </span>
              </div>

              <div className="restaurant-info">

                <h3>{item.name}</h3>

                <div className="rating-row">
                  <span className="rating">
                    <Star size={14} fill="white" />
                    {item.rating}
                  </span>

                  <span>{item.time}</span>
                </div>

                <p>{item.category}</p>
                <p>{item.price}</p>

                <button className="order-button">
                  Explore Restaurant
                  <ArrowRight size={16} />
                </button>

              </div>
            </div>

          ))
        ) : (
          <div className="no-results">
            <h3>No restaurants found!</h3>
            <p>Try another search or category.</p>
          </div>
        )}

      </div>
    </section>
  );
}

export default Restaurants;
