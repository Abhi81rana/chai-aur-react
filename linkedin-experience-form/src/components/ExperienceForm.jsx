
import { useState } from "react";
import { BriefcaseBusiness, X, MapPin, CalendarDays } from "lucide-react";

function ExperienceForm({ onClose, onSave, initialData }) {

  const [description, setDescription] = useState(
    initialData?.description || ""
  );

  const [currentlyWorking, setCurrentlyWorking] = useState(
    initialData?.currentlyWorking || false
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const experience = {
      id: initialData?.id || Date.now(),
      title: formData.get("title").trim(),
      company: formData.get("company").trim(),
      employmentType: formData.get("employmentType"),
      location: formData.get("location").trim(),
      startDate: formData.get("startDate"),
      endDate: currentlyWorking
        ? ""
        : formData.get("endDate"),
      currentlyWorking,
      description: description.trim(),
    };

    onSave(experience);
  };

  return (
    <section className="mx-3 sm:mx-4 my-4 sm:my-5 bg-white border border-gray-200 rounded-2xl shadow-sm">

      {/* Form Header */}
      <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b">

        <div className="flex items-center gap-3">
          <BriefcaseBusiness size={25} className="text-gray-900" />

          <h2 className="text-xl font-bold text-gray-900">
            {initialData ? "Edit Experience" : "Add Experience"}
          </h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <X size={22} />
        </button>

      </div>

      <form onSubmit={handleSubmit} className="p-5 sm:p-6">

        <p className="text-xs text-gray-500 mb-4">
          * Indicates required
        </p>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">

          {/* Job Title */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Job Title <span className="text-red-500">*</span>
            </label>

            <input
              name="title"
              defaultValue={initialData?.title || ""}
              required
              placeholder="Ex: Frontend Developer"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Company Name <span className="text-red-500">*</span>
            </label>

            <input
              name="company"
              defaultValue={initialData?.company || ""}
              required
              placeholder="Ex: Google"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Employment Type */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Employment Type
            </label>

            <select
              name="employmentType"
              defaultValue={initialData?.employmentType || "Full-time"}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Self-employed</option>
              <option>Freelance</option>
              <option>Internship</option>
              <option>Contract</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Location
            </label>

            <div className="relative">
              <MapPin size={17} className="absolute left-3 top-3 text-gray-500" />

              <input
                name="location"
                defaultValue={initialData?.location || ""}
                placeholder="Ex: Gurugram, India"
                className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Start Date <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <CalendarDays size={17} className="absolute left-3 top-3 text-gray-500" />

              <input
                type="date"
                name="startDate"
                defaultValue={initialData?.startDate || ""}
                required
                className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              End Date
            </label>

            <div className="relative">
              <CalendarDays size={17} className="absolute left-3 top-3 text-gray-500" />

              <input
                type="date"
                name="endDate"
                defaultValue={initialData?.endDate || ""}
                disabled={currentlyWorking}
                min={initialData?.startDate || undefined}
                className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100 disabled:text-gray-400"
              />
            </div>
          </div>

        </div>

        {/* Currently Working */}
        <label className="flex items-center gap-2 mt-5 cursor-pointer w-fit">

          <input
            type="checkbox"
            name="currentlyWorking"
            checked={currentlyWorking}
            onChange={(e) => setCurrentlyWorking(e.target.checked)}
            className="w-4 h-4 accent-blue-600"
          />

          <span className="text-sm text-gray-700">
            I am currently working in this role
          </span>

        </label>

        {/* Description */}
        <div className="mt-5">

          <label className="block text-sm font-semibold mb-2">
            Description
          </label>

          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            maxLength="500"
            placeholder="Describe your responsibilities and achievements..."
            className="w-full border border-gray-300 rounded-lg px-3 py-3 outline-none resize-y focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <p className="text-right text-xs text-gray-500 mt-1">
            {description.length}/500
          </p>

        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-end gap-3 border-t mt-5 pt-5">

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-sm"
          >
            {initialData ? "Update Experience" : "Save Experience"}
          </button>

        </div>

      </form>

    </section>
  );
}

export default ExperienceForm;
