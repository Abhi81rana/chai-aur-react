import { Link, NavLink } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Our Designs", path: "/designs" },
  { name: "Wishlist", path: "/wishlist" },
  { name: "Compare", path: "/compare" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="relative z-50 bg-[#f5f3ee]">
      <nav className="max-w-[1440px] mx-auto px-6 md:px-12 h-24 flex items-center justify-between border-b border-black/10">

        <Link to="/" onClick={closeMenu}>
          <h1 className="text-3xl font-serif tracking-widest font-bold">
            ARCHÉ<span className="text-[#a68a64]">.</span>
          </h1>
          <p className="text-[9px] tracking-[3px] mt-1 text-gray-500">
            SPACES THAT INSPIRE
          </p>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm transition ${
                  isActive
                    ? "text-[#a68a64]"
                    : "text-[#24231f] hover:text-[#a68a64]"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <Link
          to="/custom-enquiry"
          className="hidden md:flex items-center gap-2 bg-[#24231f] text-white px-6 py-4 text-sm hover:bg-[#a68a64] transition"
        >
          Start a Project <ArrowUpRight size={16} />
        </Link>

        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#f5f3ee] p-6 shadow-lg md:hidden flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={closeMenu}
              className="text-lg"
            >
              {link.name}
            </Link>
          ))}

          <Link
            to="/custom-enquiry"
            onClick={closeMenu}
            className="bg-[#24231f] text-white p-4 text-center"
          >
            Start a Project ↗
          </Link>
        </div>
      )}
    </header>
  );
}

export default Navbar;