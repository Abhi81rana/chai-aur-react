
import React, { useState } from "react";
import {
  MapPin,
  ChevronDown,
  BriefcaseBusiness,
  Search,
  Percent,
  CircleHelp,
  User,
  ShoppingCart,
} from "lucide-react";

function Navbar() {
  const [location, setLocation] = useState("Bhopal, Madhya Pradesh");

  return (
    <header className="navbar">
      <div className="nav-container">

        <a href="/" className="logo">
          <span className="logo-icon">S</span>
          <span>Swiggy</span>
        </a>

        <div className="location">
          <MapPin size={19} />
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <ChevronDown size={17} />
        </div>

        <nav className="nav-links">

          <a href="#restaurants">
            <BriefcaseBusiness />
            <span>Swiggy Corporate</span>
          </a>

          <a href="#restaurants">
            <Search />
            <span>Search</span>
          </a>

          <a href="#offers">
            <Percent />
            <span>Offers</span>
          </a>

          <a href="#footer">
            <CircleHelp />
            <span>Help</span>
          </a>

          <a href="#footer">
            <User />
            <span>Sign In</span>
          </a>

          <a href="#restaurants">
            <ShoppingCart />
            <span>Cart</span>
          </a>

        </nav>

      </div>
    </header>
  );
}

export default Navbar;
