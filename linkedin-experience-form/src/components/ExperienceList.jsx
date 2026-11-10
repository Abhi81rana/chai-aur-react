
import {
  BriefcaseBusiness,
  Pencil,
  Trash2,
  MapPin,
} from "lucide-react";

function formatDate(date) {
  if (!date) return "";

  const [year, month] = date.split("-");

  const months = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"
  ];

  return `${months[Number(month) - 1]} ${year}`;
}

function ExperienceList({ experiences, onEdit, onDelete }) {

  return (
    <section className="mx-3 sm:mx-4 mb-5 bg-white border border-gray-200 rounded-2xl shadow-sm p-5 sm:p-6">

      {/* Section Heading */}
      <div className="flex items-center gap-3 border-b pb-4 mb-2">

        <BriefcaseBusiness size={25} />

        <h2 className="text-xl sm:text-2xl font-bold">
          Experience
        </h2>

      </div>

      {/* Empty State */}
      {experiences.length === 0 ? (

        <div className="text-center py-10">

          <BriefcaseBusiness
            size={38}
            className="mx-auto text-gray-300 mb-3"
          />

          <p className="font-semibold text-gray-700">
            No experience added yet
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Add your professional experience to your profile.
          </p>

        </div>

      ) : (

        experiences.map((item) => (

          <div
            key={item.id}
            className="flex gap-3 sm:gap-4 py-5 border-b last:border-0"
          >

            {/* Company Logo */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 bg-blue-50 rounded-lg flex items-center justify-center">

              <BriefcaseBusiness
                size={30}
                className="text-blue-600"
              />

            </div>

            {/* Experience Details */}
            <div className="flex-1 min-w-0">

              <h3 className="font-bold text-base sm:text-lg text-gray-900 break-words">
                {item.title}
              </h3>

              <p className="text-sm sm:text-base text-gray-800 mt-0.5">
                {item.company} · {item.employmentType}
              </p>

              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                {formatDate(item.startDate)} – {
                  item.currentlyWorking
                    ? "Present"
                    : formatDate(item.endDate) || "Not specified"
                }
              </p>

              {item.location && (
                <p className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 mt-1">
                  <MapPin size={14} />
                  {item.location}
                </p>
              )}

              {item.description && (
                <p className="text-sm text-gray-700 mt-3 whitespace-pre-wrap break-words">
                  {item.description}
                </p>
              )}

            </div>

            {/* Edit / Delete */}
            <div className="flex items-start gap-1 shrink-0">

              <button
                type="button"
                onClick={() => onEdit(item)}
                title="Edit Experience"
                className="p-2 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition"
              >
                <Pencil size={19} />
              </button>

              <button
                type="button"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this experience?"
                    )
                  ) {
                    onDelete(item.id);
                  }
                }}
                title="Delete Experience"
                className="p-2 rounded-full text-gray-500 hover:text-red-600 hover:bg-red-50 transition"
              >
                <Trash2 size={19} />
              </button>

            </div>

          </div>

        ))

      )}

    </section>
  );
}

export default ExperienceList;
