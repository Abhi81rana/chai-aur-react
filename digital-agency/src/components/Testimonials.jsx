
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Business Owner",
    review:
      "Amazing experience! Their team helped us improve our online presence and grow our business.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Verma",
    role: "Marketing Manager",
    review:
      "Very creative and professional team. The website design and marketing strategy were excellent.",
    rating: 5,
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Startup Founder",
    review:
      "Great communication, creative ideas and quality work. Highly recommended for digital growth.",
    rating: 5,
  },
];

function Testimonials() {
  return (
    <section
      id="reviews"
      className="section-pad bg-ink"
    >
      <div className="container-shell">

        {/* Heading */}
        <div className="mb-14 text-center">

          <p className="mb-4 text-sm font-bold tracking-[3px] text-lime">
            CLIENT TESTIMONIALS
          </p>

          <h2 className="text-4xl font-bold text-white md:text-5xl">
            What Our Clients
            <span className="text-lime"> Say.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-white/50">
            We believe great relationships create great results.
            Here's what our clients think about working with us.
          </p>

        </div>

        {/* Review Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {testimonials.map((item) => (

            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-[#182019] p-7 transition duration-300 hover:-translate-y-2 hover:border-lime/40"
            >

              <div className="flex items-center justify-between">

                <Quote
                  size={32}
                  className="text-lime"
                />

                <div className="flex gap-1 text-lime">

                  {Array.from(
                    { length: item.rating },
                    (_, index) => (
                      <Star
                        key={index}
                        size={16}
                        fill="currentColor"
                      />
                    )
                  )}

                </div>

              </div>

              <p className="mt-8 min-h-28 leading-7 text-white/65">
                "{item.review}"
              </p>

              <div className="mt-7 border-t border-white/10 pt-5">

                <h3 className="font-bold text-white">
                  {item.name}
                </h3>

                <p className="mt-1 text-sm text-lime">
                  {item.role}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;
