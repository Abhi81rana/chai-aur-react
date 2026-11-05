
import { ArrowUpRight, CheckCircle } from "lucide-react";

function About() {
  const features = [
    "Creative and innovative ideas",
    "Experienced digital team",
    "Result-oriented strategies",
    "100% client satisfaction",
  ];

  return (
    <section
      id="about"
      className="section-pad bg-ink"
    >
      <div className="container-shell grid items-center gap-14 md:grid-cols-2">

        {/* Left Image */}
        <div className="relative">

          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900"
            alt="Digital agency team working together"
            className="h-[420px] w-full rounded-3xl object-cover"
          />

          <div className="absolute -bottom-6 -right-4 rounded-2xl bg-lime p-6 text-ink shadow-xl">
            <h3 className="text-4xl font-bold">5+</h3>
            <p className="mt-1 text-sm font-semibold">
              Years Experience
            </p>
          </div>

        </div>

        {/* Right Content */}
        <div>

          <p className="mb-4 text-sm font-bold tracking-[3px] text-lime">
            ABOUT OUR AGENCY
          </p>

          <h2 className="text-4xl font-bold leading-tight text-white md:text-5xl">
            We Turn Ideas Into
            <span className="text-lime"> Digital Success.</span>
          </h2>

          <p className="mt-6 leading-8 text-white/55">
            We are a creative digital agency helping
            businesses grow with modern technology,
            creative designs and powerful marketing
            strategies.
          </p>

          {/* Features */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">

            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-sm text-white/80"
              >
                <CheckCircle
                  size={19}
                  className="shrink-0 text-lime"
                />

                {feature}
              </div>
            ))}

          </div>

          <a
            href="#contact"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-lime px-7 py-4 font-semibold text-ink transition hover:bg-white"
          >
            Discover More
            <ArrowUpRight size={18} />
          </a>

        </div>

      </div>
    </section>
  );
}

export default About;
