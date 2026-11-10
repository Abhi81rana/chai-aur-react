
import { useState } from "react";
import { MapPin, Pencil, Plus } from "lucide-react";

function ProfileHeader({ onAddExperience }) {
  const [activeTab, setActiveTab] = useState("Experience");

  const tabs = [
    "About",
    "Experience",
    "Skills",
    "Education",
    "Activity",
  ];

  return (
    <section className="bg-white border-b border-gray-200">

      {/* Profile Details */}
      <div className="px-5 sm:px-8 pt-6 pb-5">

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">

          <div className="flex items-center gap-4">

            <div className="relative shrink-0">
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="Profile"
                className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border-4 border-white object-cover shadow-sm"
              />

              <span className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full" />
            </div>

            <div className="min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                IT Ash
              </h2>

              <p className="text-sm sm:text-base font-medium text-gray-800 mt-1">
                Full Stack Developer
              </p>

              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Building AI-Powered Solutions
              </p>

            </div>

          </div>

          <button
            onClick={onAddExperience}
            className="flex items-center justify-center gap-2 border border-blue-600 text-blue-600 rounded-full px-5 py-2.5 font-semibold hover:bg-blue-50 transition w-full sm:w-auto"
          >
            <Pencil size={17} />
            Add experience
          </button>

        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mt-4">
          <MapPin size={15} />
          Gurugram, India
        </div>

      </div>

      {/* Profile Tabs */}
      <div className="flex overflow-x-auto border-t border-gray-100 px-3 sm:px-5">

        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`shrink-0 px-4 sm:px-5 py-4 text-sm font-semibold border-b-2 transition ${
              activeTab === tab
                ? "text-blue-700 border-blue-600"
                : "text-gray-600 border-transparent hover:text-blue-600"
            }`}
          >
            {tab}
          </button>
        ))}

      </div>

    </section>
  );
}

export default ProfileHeader;
