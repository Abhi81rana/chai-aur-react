
import {
  BriefcaseBusiness,
  Trash2,
  MapPin
} from "lucide-react";

function ExperienceList({ experiences, onDelete }) {

  return (
    <section className="bg-white rounded-xl shadow-sm p-5 sm:p-7 mt-6">

      <div className="flex items-center gap-3 mb-6">
        <BriefcaseBusiness size={25} />

        <h2 className="text-2xl font-bold">
          Experience
        </h2>
      </div>

      {experiences.length === 0 ? (

        <p className="text-gray-500">
          No experience added yet.
        </p>

      ) : (

        experiences.map((item) => (

          <div
            key={item.id}
            className="flex gap-4 py-5 border-b last:border-0"
          >

            <div className="w-14 h-14 shrink-0 bg-blue-100 rounded-lg flex items-center justify-center">
              <BriefcaseBusiness
                className="text-blue-600"
                size={28}
              />
            </div>

            <div className="flex-1 min-w-0">

              <h3 className="font-bold text-lg">
                {item.title}
              </h3>

              <p className="text-gray-700">
                {item.company} · {item.employmentType}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {item.startDate} – {
                  item.currentlyWorking
                    ? "Present"
                    : item.endDate || "Not specified"
                }
              </p>

              <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                <MapPin size={14} />
                {item.location}
              </p>

              <p className="text-gray-700 mt-3 break-words">
                {item.description}
              </p>

            </div>

            <button
              onClick={() => onDelete(item.id)}
              className="self-start p-2 text-gray-500 hover:text-red-600"
            >
              <Trash2 size={19} />
            </button>

          </div>

        ))

      )}

    </section>
  );
}

export default ExperienceList;
