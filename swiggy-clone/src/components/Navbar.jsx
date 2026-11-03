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
  Menu,
  X
} from "lucide-react";

function Navbar() {
	const [location, setLocation] = useState("Bhopal,Madhya Pradesh");
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<header className="navbar">
			<div classname="nav-container">
				<a href="#" className="logo">
					<span className="logo-icon">
						S
					</span>
					Swiggy
				</a>


				<div className="location">
					<MapPin size={19} />
					<input 
					  value={location}
						onChange={(e) => setLocation(e.target.value)}
						/>
					<ChevronDown size={17} />
				</div>


				<button
					className="menu-toggle"
					obnClick={() => setMenuOpen(!menuOpen)}
				>
					{menuOpen ? <X /> : <Menu />}
				</button>


				<nav className={menuOpen ? "nav-links-show" : "nav-links"}>
					<a href= "#restaurants">
						<BriefcaseBusiness  /> <span>Swiggy Corporate</span>
					</a>

					<a href= "#restaurants">
						<Search /> <span>Search</span>
					</a>

					<a href= "#offers">
						<Percent /> <span>Offers</span>
					</a>

					<a href= "footer">
						<CircleHelp /> <span>Help</span>
					</a>

					<a href= "#footer">
						<user /> <span>Sign In</span>
					</a>

					<a href= "#restaurants">
						<ShoppingCart /> <span>Cart</span>
					</a>

				</nav>
			</div>
		</header>
	);
}


export default Navbar;