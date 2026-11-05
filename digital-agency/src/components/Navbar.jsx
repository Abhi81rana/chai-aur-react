
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", link: "#home" },
    { name: "Services", link: "#services" },
    { name: "About", link: "#about" },
    { name: "Our Work", link: "#work" },
    { name: "Contact", link: "#contact" },
  ];

  return (
    <nav className="bg-ink border-b border-white/10">
      <div className="container-shell flex h-20 items-center justify-between">

        {/* Logo */}
        <a href="#home" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lime text-xl font-bold text-ink">
            R
          </span>

          <span className="text-2xl font-bold text-white">
            rana<span className="text-lime">.</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.link}
              className="text-sm text-white/70 transition hover:text-lime"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Contact Button */}
        <a
          href="#contact"
          className="hidden items-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-bold text-ink transition hover:bg-white md:flex"
        >
          Let's Talk
          <ArrowUpRight size={17} />
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white md:hidden"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={27} /> : <Menu size={27} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-white/10 bg-ink px-6 py-5 md:hidden">
          <div className="flex flex-col gap-5">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.link}
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-lime"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
