
import { useState } from "react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log("Form Data:", formData);

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      service: "",
      message: "",
    });
  }

  return (
    <section
      id="contact"
      className="section-pad bg-[#151d16]"
    >
      <div className="container-shell grid gap-14 md:grid-cols-2">

        {/* Left Content */}
        <div>

          <p className="mb-4 text-sm font-bold tracking-[3px] text-lime">
            CONTACT US
          </p>

          <h2 className="text-4xl font-bold leading-tight text-white md:text-5xl">
            Let's Build Something
            <span className="text-lime"> Great Together.</span>
          </h2>

          <p className="mt-6 leading-8 text-white/50">
            Have a project in mind? Tell us about your
            business and let's discuss how we can help.
          </p>

          <div className="mt-10 space-y-7">

            <div className="flex items-center gap-4">
              <Mail className="text-lime" size={24} />
              <div>
                <p className="text-sm text-white/40">Email</p>
                <p className="text-white">amit@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="text-lime" size={24} />
              <div>
                <p className="text-sm text-white/40">Phone</p>
                <p className="text-white">+91 8102004398</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <MapPin className="text-lime" size={24} />
              <div>
                <p className="text-sm text-white/40">Location</p>
                <p className="text-white">India</p>
              </div>
            </div>

          </div>

        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-[#182019] p-7 md:p-9"
        >

          <h3 className="mb-7 text-2xl font-bold text-white">
            Send Us a Message
          </h3>

          <div className="space-y-5">

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full rounded-xl border border-white/10 bg-ink px-5 py-4 text-white outline-none focus:border-lime"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full rounded-xl border border-white/10 bg-ink px-5 py-4 text-white outline-none focus:border-lime"
            />

            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/10 bg-ink px-5 py-4 text-white outline-none focus:border-lime"
            >
              <option value="">Select Service</option>
              <option value="Web Development">Web Development</option>
              <option value="SEO">SEO</option>
              <option value="Branding">Branding</option>
              <option value="Digital Marketing">Digital Marketing</option>
            </select>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your project..."
              rows="5"
              required
              className="w-full resize-none rounded-xl border border-white/10 bg-ink px-5 py-4 text-white outline-none focus:border-lime"
            />

          </div>

          <button
            type="submit"
            className="mt-7 flex items-center gap-3 rounded-full bg-lime px-7 py-4 font-bold text-ink transition hover:bg-white"
          >
            Send Message
            <ArrowUpRight size={18} />
          </button>

          {submitted && (
            <p className="mt-5 text-sm text-lime">
              Message submitted successfully! (Demo only)
            </p>
          )}

        </form>

      </div>
    </section>
  );
}

export default Contact;
