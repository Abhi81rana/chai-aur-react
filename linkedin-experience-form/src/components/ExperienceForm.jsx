
import { useState } from "react";
import { X } from "lucide-react";

function ExperienceForm({ onClose, onSave, initialData }) {

  const [currentlyWorking, setCurrentlyWorking] = useState(
    initialData?.currentlyWorking || false
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const experience = {
      id: initialData?.id || Date.now(),

      title: formData.get("title"),
      company: formData.get("company"),
      employmentType: formData.get("employmentType"),
      location: formData.get("location"),
      startDate: formData.get("startDate"),
      endDate: currentlyWorking
        ? ""
        : formData.get("endDate"),

      currentlyWorking,

      description: formData.get("description"),
    };

    onSave(experience);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-3 sm:p-5">

      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">

        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b">

          <h2 className="text-xl font-bold text-gray-900">
            {initialData ? "Edit Experience" : "Add Experience"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X size={22} />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="p-5 sm:p-7 space-y-5"
        >

          <p className="text-sm text-gray-500">
            * Indicates required
          </p>

          {/* Job Title */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Job Title *
            </label>

            <input
              name="title"
              defaultValue={initialData?.title || ""}
              required
              placeholder="Ex: Frontend Developer"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Company Name *
            </label>

            <input
              name="company"
              defaultValue={initialData?.company || ""}
              required
              placeholder="Ex: Google"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Employment Type */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Employment Type
            </label>

            <select
              name="employmentType"
              defaultValue={
                initialData?.employmentType || "Full-time"
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
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

            <input
              name="location"
              defaultValue={initialData?.location || ""}
              placeholder="Ex: Indore, Madhya Pradesh"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* Start Date */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Start Date *
              </label>

              <input
                type="date"
                name="startDate"
                defaultValue={initialData?.startDate || ""}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                End Date
              </label>

              <input
                type="date"
                name="endDate"
                defaultValue={initialData?.endDate || ""}
                disabled={currentlyWorking}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

          </div>

          {/* Currently Working */}
          <label className="flex items-center gap-3 cursor-pointer">

            <input
              type="checkbox"
              name="currentlyWorking"
              checked={currentlyWorking}
              onChange={(e) =>
                setCurrentlyWorking(e.target.checked)
              }
              className="w-4 h-4 accent-blue-600"
            />

            <span className="text-sm text-gray-700">
              I am currently working in this role
            </span>

          </label>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Description
            </label>

            <textarea
              name="description"
              defaultValue={initialData?.description || ""}
              rows="4"
              maxLength="2000"
              placeholder="Describe your responsibilities and achievements..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t pt-5">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-gray-300 font-semibold hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              {initialData ? "Update Experience" : "Save Experience"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default ExperienceForm;
