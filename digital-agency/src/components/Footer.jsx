
import { ArrowUpRight, ArrowUp } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0c110d]">
      <div className="container-shell py-16">

        <div className="grid gap-12 md:grid-cols-4">

          {/* Logo */}
          <div>
            <a href="#home" className="text-3xl font-bold text-white">
              orbit<span className="text-lime">.</span>
            </a>

            <p className="mt-5 text-sm leading-7 text-white/50">
              We help brands grow with creative ideas,
              modern technology and powerful digital strategies.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              {["Instagram", "Facebook", "LinkedIn"].map((social) => (
                <a
                  key={social}
                  href="#contact"
                  aria-label={social}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-xs font-bold text-white transition hover:border-lime hover:bg-lime hover:text-ink"
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 font-bold text-white">Quick Links</h3>

            <div className="flex flex-col gap-4 text-sm text-white/50">
              <a href="#home" className="hover:text-lime">Home</a>
              <a href="#about" className="hover:text-lime">About Us</a>
              <a href="#services" className="hover:text-lime">Services</a>
              <a href="#work" className="hover:text-lime">Our Work</a>
              <a href="#contact" className="hover:text-lime">Contact</a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-6 font-bold text-white">Our Services</h3>

            <div className="flex flex-col gap-4 text-sm text-white/50">
              <span>Web Development</span>
              <span>Digital Marketing</span>
              <span>SEO Optimization</span>
              <span>Brand Identity</span>
              <span>Social Media</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 font-bold text-white">Let's Connect</h3>

            <p className="text-sm leading-7 text-white/50">
              Have a project in mind? Let's work together
              and create something amazing.
            </p>

            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 font-semibold text-lime hover:text-white"
            >
              Get In Touch
              <ArrowUpRight size={17} />
            </a>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="mt-16 flex flex-col justify-between gap-5 border-t border-white/10 pt-7 sm:flex-row sm:items-center">

          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Orbit Agency. All rights reserved.
          </p>

          <a
            href="#home"
            className="flex items-center gap-2 text-sm text-white/50 hover:text-lime"
          >
            Back to Top
            <ArrowUp size={16} />
          </a>

        </div>

      </div>
    </footer>
  );
}

export default Footer;
