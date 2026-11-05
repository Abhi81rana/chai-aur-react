
import {
  Megaphone,
  Search,
  Palette,
  Code,
  BarChart,
  Video,
  ArrowUpRight
} from "lucide-react";

const services = [
  {
    id: 1,
    icon: Megaphone,
    title: "Social Media Marketing",
    description: "Grow your audience and build a strong social media presence."
  },
  {
    id: 2,
    icon: Search,
    title: "SEO Optimization",
    description: "Improve search rankings and attract more organic visitors."
  },
  {
    id: 3,
    icon: Palette,
    title: "Brand Identity",
    description: "Create a unique identity that makes your brand memorable."
  },
  {
    id: 4,
    icon: Code,
    title: "Web Development",
    description: "Build modern, responsive and high-performance websites."
  },
  {
    id: 5,
    icon: BarChart,
    title: "Digital Advertising",
    description: "Reach the right audience through effective ad campaigns."
  },
  {
    id: 6,
    icon: Video,
    title: "Creative Content",
    description: "Create engaging visuals and content for your audience."
  }
];

function Services() {
  return (
    <section id="services" className="section-pad bg-[#151d16]">

      <div className="container-shell">

        {/* Section Heading */}
        <div className="mb-14 max-w-2xl">

          <p className="mb-4 text-sm font-bold uppercase tracking-[3px] text-lime">
            WHAT WE DO
          </p>

          <h2 className="text-4xl font-bold leading-tight text-white md:text-5xl">
            Services That Help
            <span className="text-lime"> Your Business Grow.</span>
          </h2>

          <p className="mt-5 leading-7 text-white/50">
            We provide creative digital solutions to help
            businesses build their online presence and grow faster.
          </p>

        </div>

        {/* Services Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {services.map((service) => {

            const Icon = service.icon;

            return (
              <div
                key={service.id}
                className="group rounded-2xl border border-white/10 bg-[#182019] p-8 transition duration-300 hover:-translate-y-2 hover:border-lime/50"
              >

                <div className="flex items-center justify-between">

                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-lime/10 text-lime">
                    <Icon size={27} />
                  </div>

                  <span className="text-sm text-white/30">
                    0{service.id}
                  </span>

                </div>

                <h3 className="mt-8 text-xl font-bold text-white">
                  {service.title}
                </h3>

                <p className="mt-4 min-h-14 text-sm leading-6 text-white/50">
                  {service.description}
                </p>

                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-lime"
                >
                  Learn More
                  <ArrowUpRight size={17} />
                </a>

              </div>
            );

          })}

        </div>

      </div>

    </section>
  );
}

export default Services;
