
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowUpRight, CheckCircle, LoaderCircle } from "lucide-react";

import designData from "../data/designData";
import { validateEnquiry } from "../utils/validators";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  budget: "",
  location: "",
  message: "",
};

function Contact() {
  const [searchParams] = useSearchParams();

  const selectedDesignId = Number(searchParams.get("design"));

  const selectedDesign = designData.find(
    (design) => design.id === selectedDesignId
  );

  const [formData, setFormData] = useState({
    ...initialForm,
    projectType: selectedDesign?.category || "",
    message: selectedDesign
      ? `I am interested in ${selectedDesign.title}.`
      : "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateEnquiry(formData);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      // Demo submission only.
      // Backend API will be connected in a later step.
      console.log("Enquiry Details:", {
        ...formData,
        selectedDesign: selectedDesign?.title || null,
      });

      setSuccess(true);
      setFormData(initialForm);
    } catch (error) {
      setErrors({
        form: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-transparent border-b border-black/20 py-4 outline-none focus:border-[#a68a64] transition";

  return (
    <main className="bg-[#f5f3ee] min-h-screen">

      {/* HEADER */}
      <section className="bg-[#24231f] text-white px-6 md:px-12 py-20">
        <div className="max-w-[1440px] mx-auto">

          <p className="text-[#d1b38b] text-xs tracking-[4px] mb-6">
            LET'S CREATE SOMETHING BEAUTIFUL
          </p>

          <h1 className="text-5xl md:text-8xl font-serif">
            Start Your
            <br />
            <span className="italic text-[#d1b38b]">
              Project.
            </span>
          </h1>

          <p className="text-gray-400 mt-7 max-w-lg leading-7">
            Tell us about your dream space. Our team will
            help turn your vision into reality.
          </p>

        </div>
      </section>

      {/* FORM */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">

        <div className="grid lg:grid-cols-2 gap-16">

          <div>
            <p className="text-[#a68a64] tracking-[3px] text-xs mb-5">
              / PROJECT ENQUIRY
            </p>

            <h2 className="text-4xl md:text-5xl font-serif leading-tight">
              Let's discuss your
              <span className="italic"> vision.</span>
            </h2>

            <p className="text-gray-500 leading-8 mt-7">
              Share your project details and requirements.
              We will use this information to understand
              your expectations and prepare for a consultation.
            </p>

            {selectedDesign && (
              <div className="mt-10 p-5 bg-[#eae5dc] border-l-2 border-[#a68a64]">
                <p className="text-xs tracking-widest text-gray-500">
                  SELECTED DESIGN
                </p>

                <h3 className="font-serif text-2xl mt-2">
                  {selectedDesign.title}
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  {selectedDesign.category} · {selectedDesign.style}
                </p>
              </div>
            )}
          </div>

          <div>

            {success ? (
              <div className="bg-white p-8 md:p-12 text-center">
                <CheckCircle
                  size={50}
                  className="mx-auto text-[#a68a64] mb-5"
                />

                <h3 className="text-3xl font-serif">
                  Thank You!
                </h3>

                <p className="text-gray-500 mt-4 leading-7">
                  Your demo enquiry has been validated successfully.
                  Backend submission is not connected yet.
                </p>

                <button
                  onClick={() => setSuccess(false)}
                  className="mt-8 bg-[#24231f] text-white px-7 py-4"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (

              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-white p-6 md:p-10 space-y-7"
              >

                <h3 className="text-2xl font-serif mb-5">
                  Project Information
                </h3>

                {errors.form && (
                  <p className="text-red-600 text-sm">
                    {errors.form}
                  </p>
                )}

                {/* NAME */}
                <div>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name *"
                    className={inputClass}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* EMAIL */}
                <div>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address *"
                    className={inputClass}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* PHONE */}
                <div>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit Phone Number *"
                    className={inputClass}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* PROJECT TYPE */}
                <div>
                  <label className="text-xs text-gray-500">
                    PROJECT TYPE *
                  </label>

                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">Select project type</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Living Room">Living Room</option>
                    <option value="Kitchen">Kitchen</option>
                    <option value="Bedroom">Bedroom</option>
                    <option value="Office">Office</option>
                    <option value="Exterior">Exterior</option>
                    <option value="Complete Interior">Complete Interior</option>
                    <option value="Custom Design">Custom Design</option>
                  </select>

                  {errors.projectType && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.projectType}
                    </p>
                  )}
                </div>

                {/* BUDGET */}
                <div>
                  <label className="text-xs text-gray-500">
                    ESTIMATED BUDGET *
                  </label>

                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">Select your budget</option>
                    <option value="Below ₹5 Lakh">Below ₹5 Lakh</option>
                    <option value="₹5 - ₹10 Lakh">₹5 - ₹10 Lakh</option>
                    <option value="₹10 - ₹25 Lakh">₹10 - ₹25 Lakh</option>
                    <option value="₹25 - ₹50 Lakh">₹25 - ₹50 Lakh</option>
                    <option value="Above ₹50 Lakh">Above ₹50 Lakh</option>
                  </select>

                  {errors.budget && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.budget}
                    </p>
                  )}
                </div>

                {/* LOCATION */}
                <div>
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Project Location *"
                    className={inputClass}
                  />

                  {errors.location && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.location}
                    </p>
                  )}
                </div>

                {/* MESSAGE */}
                <div>
                  <label className="text-xs text-gray-500">
                    TELL US ABOUT YOUR PROJECT *
                  </label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe your dream space..."
                    className={`${inputClass} resize-none`}
                  />

                  {errors.message && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#24231f] text-white py-5 flex items-center justify-center gap-4 hover:bg-[#a68a64] transition disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <LoaderCircle className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit Enquiry
                      <ArrowUpRight size={20} />
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  * Required fields
                </p>

              </form>
            )}

          </div>

        </div>
      </section>

    </main>
  );
}

export default Contact;
