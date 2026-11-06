import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-[#24231f] text-white px-6 md:px-12 pt-16 pb-8">

      <div className="max-w-[1440px] mx-auto">

        <div className="grid md:grid-cols-2 gap-10 pb-16">

          <div>
            <h2 className="text-5xl font-serif tracking-widest">
              ARCHÉ<span className="text-[#a68a64]">.</span>
            </h2>

            <p className="text-gray-400 mt-5 max-w-sm leading-7">
              Creating timeless architecture and meaningful spaces
              through thoughtful design and craftsmanship.
            </p>
          </div>

          <div className="flex flex-wrap gap-12 md:justify-end">

            <div className="flex flex-col gap-4">
              <h3 className="text-[#a68a64] text-sm">EXPLORE</h3>
              <Link to="/">Home</Link>
              <Link to="/designs">Our Designs</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-[#a68a64] text-sm">CONNECT</h3>
              <a href="mailto:hello@arche.com">
                Email <ArrowUpRight size={14} className="inline" />
              </a>
              <a href="#instagram">Instagram</a>
            </div>

          </div>
        </div>

        <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between gap-4 text-xs text-gray-400">
          <p>© 2026 ARCHÉ Studio. All rights reserved.</p>
          <p>DESIGNED WITH PURPOSE.</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;