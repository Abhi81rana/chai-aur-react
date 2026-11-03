import React, { useState } from "react";
import { MapPin, Search  } from "lucide-react";

function Hero() {
  const [location, setLocation] = useState("");

  const handleSearch = () => {

    // Implement search functionality here
    document.getElementById("restaurants")?.scrollIntoView({ behavior: "smooth" });
};

return (
  <section className="hero">
    <div className="hero-content">
      <h1>Discover Delicious Food Near You
      <br />
      on Swiggy
      </h1>

      <p>
        Get food delivery , groceries, and more from your favorite restaurants and stores. Order now and enjoy a seamless experience with Swiggy.

      </p>

      <div className="hero-search">
        <MapPin color="#ff6f61" />
        <input
          type="text"
          placeholder="Enter your location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />


        <button onClick={handleSearch}>
          <Search size={19} />
          Find Food
        </button>
      </div>
    </div>

    <div className="hero-image">
      <img
        src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800"
        alt="Delicious food"
      />
    </div>
  </section>
);
}

export default Hero;