
import {
  ArrowUpRight,
  MoveUpRight,
  Sparkles
} from "lucide-react";

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[700px] overflow-hidden bg-[#050b07] text-white"
    >

      {/* Background Glow */}
      <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-emerald-500/10 blur-[150px]" />

      <div className="container-shell relative z-10 grid min-h-[700px] items-center gap-12 py-20 lg:grid-cols-2">

        {/* LEFT CONTENT */}
        <div className="relative z-10">

          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/5 px-4 py-2 text-sm text-emerald-300">
            <Sparkles size={16} />
            Rana Creativity Agency
          </div>

          <h1 className="text-5xl font-semibold leading-[1.12] tracking-tight sm:text-6xl lg:text-[72px]">

            We Make Your

            <span className="block text-emerald-400">
              Brand Stand
            </span>

            <span className="block">
              Out Online.
            </span>

          </h1>

          <p className="mt-7 max-w-lg text-base leading-8 text-gray-400 md:text-lg">
            We combine creative thinking, smart technology
            and digital strategies to transform your ideas
            into extraordinary brand experiences.
          </p>

          {/* CTA BUTTONS */}
          <div className="mt-10 flex flex-wrap gap-4">

            <a
              href="#contact"
              className="group flex items-center gap-3 rounded-full bg-emerald-400 px-7 py-4 font-semibold text-black transition duration-300 hover:bg-white"
            >
              Start Your Project

              <ArrowUpRight
                size={19}
                className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>

            <a
              href="#work"
              className="flex items-center gap-3 rounded-full border border-white/20 px-7 py-4 font-semibold text-white transition hover:border-emerald-400 hover:text-emerald-400"
            >
              Explore Our Work

              <MoveUpRight size={18} />
            </a>

          </div>

          {/* STATS */}
          <div className="mt-16 grid max-w-lg grid-cols-3 border-t border-white/10 pt-8">

            <div>
              <h3 className="text-3xl font-bold text-emerald-400">
                50+
              </h3>
              <p className="mt-2 text-xs text-gray-500 sm:text-sm">
                Projects
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-emerald-400">
                30+
              </h3>
              <p className="mt-2 text-xs text-gray-500 sm:text-sm">
                Clients
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-emerald-400">
                5+
              </h3>
              <p className="mt-2 text-xs text-gray-500 sm:text-sm">
                Experience
              </p>
            </div>

          </div>

        </div>

        {/* RIGHT VISUAL */}
        <div className="relative mx-auto flex h-[450px] w-full max-w-[500px] items-center justify-center">

          {/* Outer Glow */}
          <div className="absolute h-80 w-80 rounded-full bg-emerald-500/20 blur-[100px]" />

          {/* Main Orb */}
          <div className="hero-orb relative flex h-[300px] w-[300px] items-center justify-center rounded-full border border-emerald-400/30 sm:h-[380px] sm:w-[380px]">

            <div className="absolute inset-5 rounded-full border border-emerald-400/20" />

            <div className="absolute inset-12 rounded-full border border-emerald-400/10" />

            <div className="relative flex h-44 w-44 rotate-[-12deg] items-center justify-center rounded-[45px] bg-gradient-to-br from-emerald-300 via-emerald-500 to-green-900 shadow-[0_0_100px_rgba(16,185,129,0.35)] sm:h-52 sm:w-52">

              <span className="text-9xl font-black text-[#06150b]">
                R
              </span>

            </div>

          </div>

          {/* Floating Card 1 */}
          <div className="absolute right-0 top-12 rounded-2xl border border-white/10 bg-[#101c14]/90 p-4 shadow-2xl backdrop-blur-xl">

            <div className="flex items-center gap-3">

              <div className="h-3 w-3 rounded-full bg-emerald-400" />

              <div>
                <p className="text-xs text-gray-400">
                  Creative Ideas
                </p>

                <p className="text-sm font-semibold text-white">
                  Think Beyond
                </p>
              </div>

            </div>

          </div>

          {/* Floating Card 2 */}
          <div className="absolute bottom-12 left-0 rounded-2xl border border-white/10 bg-[#101c14]/90 p-5 shadow-2xl backdrop-blur-xl">

            <p className="text-xs text-gray-400">
              Our Philosophy
            </p>

            <p className="mt-1 font-bold text-emerald-400">
              Create. Innovate. Grow.
            </p>

          </div>

          {/* Decorative Circle */}
          <div className="absolute right-12 bottom-5 h-5 w-5 rounded-full bg-emerald-400 shadow-[0_0_30px_#34d399]" />

        </div>

      </div>

    </section>
  );
}

export default Hero;
