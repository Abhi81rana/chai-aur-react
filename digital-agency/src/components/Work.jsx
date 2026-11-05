
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    name: "Creative Branding",
    category: "Brand Identity",
    image: "photo-1558655146-9f40138edfeb",
  },
  {
    id: 2,
    name: "Modern Website",
    category: "Web Development",
    image: "photo-1460925895917-afdab827c52f",
  },
  {
    id: 3,
    name: "Digital Campaign",
    category: "Digital Marketing",
    image: "photo-1552664730-d307ca884978",
  },
];

function Work() {
  return (
    <section
      id="work"
      className="section-pad bg-[#151d16]"
    >
      <div className="container-shell">

        {/* Heading */}
        <div className="mb-14">

          <p className="mb-4 text-sm font-bold tracking-[3px] text-lime">
            OUR PORTFOLIO
          </p>

          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Our Latest
            <span className="text-lime"> Projects.</span>
          </h2>

          <p className="mt-5 max-w-xl leading-7 text-white/50">
            Explore some of our creative projects and
            digital experiences built for ambitious brands.
          </p>

        </div>

        {/* Project Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {projects.map((project) => (

            <div
              key={project.id}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#182019] transition duration-300 hover:-translate-y-2 hover:border-lime/40"
            >

              {/* Image */}
              <div className="overflow-hidden">

                <img
                  src={`https://images.unsplash.com/${project.image}?auto=format&fit=crop&w=800&q=85`}
                  alt={project.name}
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
                />

              </div>

              {/* Content */}
              <div className="flex items-center justify-between p-6">

                <div>
                  <p className="text-sm text-lime">
                    {project.category}
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-white">
                    {project.name}
                  </h3>
                </div>

                <a
                  href="#contact"
                  aria-label={`Enquire about ${project.name}`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-lime hover:text-ink"
                >
                  <ArrowUpRight size={20} />
                </a>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Work;
