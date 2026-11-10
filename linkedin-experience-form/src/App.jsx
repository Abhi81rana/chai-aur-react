
import { MapPin, Plus, Pencil } from "lucide-react";

function ProfileHeader({ onAddExperience }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">

      {/* Cover Image */}
      <div className="h-40 sm:h-52 bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400 relative">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,white,transparent_50%)]" />
      </div>

      {/* Profile Details */}
      <div className="px-5 sm:px-8 pb-6">

        <div className="flex justify-between items-end">

          <div className="-mt-16 relative">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="Profile"
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white object-cover"
            />
          </div>

          <button className="text-gray-500 hover:text-blue-600 p-2">
            <Pencil size={20} />
          </button>

        </div>

        <div className="mt-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Abhishek Kumar Rana
          </h1>

          <p className="text-gray-600 mt-2">
            Frontend Developer | React.js Developer
          </p>

          <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
            <MapPin size={16} />
            Indore, Madhya Pradesh, India
          </div>

          <div className="flex flex-wrap gap-3 mt-5">
            <button
              onClick={onAddExperience}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition"
            >
              <Plus size={18} />
              Add Experience
            </button>

            <button className="border border-blue-600 text-blue-600 px-5 py-2.5 rounded-full hover:bg-blue-50 transition">
              More
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProfileHeader;
