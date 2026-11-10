
import { useEffect, useState } from "react";

import ProfileHeader from "./components/ProfileHeader";
import ExperienceForm from "./components/ExperienceForm";
import ExperienceList from "./components/ExperienceList";
function App() {
  const [showForm, setShowForm] = useState(true);
  const [experiences, setExperiences] = useState(() => {
    try {
      const savedData = localStorage.getItem("experiences");
      return savedData ? JSON.parse(savedData) : [];
    } catch {
      return [];
    }
  });

  const [editingExperience, setEditingExperience] = useState(null);

  // Save data in localStorage
  useEffect(() => {
    localStorage.setItem(
      "experiences",
      JSON.stringify(experiences)
    );
  }, [experiences]);

  // Add or update experience
  const saveExperience = (newExperience) => {
    if (editingExperience) {
      setExperiences((prev) =>
        prev.map((item) =>
          item.id === editingExperience.id
            ? newExperience
            : item
        )
      );
    } else {
      setExperiences((prev) => [
        ...prev,
        newExperience,
      ]);
    }

    setShowForm(false);
    setEditingExperience(null);
  };

  // Delete experience
  const deleteExperience = (id) => {
    setExperiences((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // Edit experience
  const editExperience = (item) => {
    setEditingExperience(item);
    setShowForm(true);
  };

  // Open empty form
  const openAddForm = () => {
    setEditingExperience(null);
    setShowForm(true);
  };

  // Close form
  const closeForm = () => {
    setShowForm(false);
    setEditingExperience(null);
  };

  return (
    <div className="min-h-screen bg-[#f3f6fc] px-3 py-4 sm:px-5 sm:py-6">

      <main className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">

        {/* Task Header */}
        <header className="bg-gradient-to-r from-[#0755a4] to-[#1264ad] text-white px-4 py-4 sm:px-7 sm:py-5 flex items-center gap-4">

          <div className="bg-[#0a80dc] rounded-xl px-3 py-2 text-3xl font-bold">
            in
          </div>

          <div>
            <h1 className="text-lg sm:text-2xl font-bold">
              Task 1: LinkedIn – Add Experience Form
            </h1>

            <p className="text-blue-100 text-xs sm:text-base mt-1">
              Add your professional experience and see it in your profile.
            </p>
          </div>

        </header>

        {/* Profile */}
        <ProfileHeader onAddExperience={openAddForm} />

        {/* Inline Experience Form */}
        {showForm && (
          <ExperienceForm
            key={editingExperience?.id || "new"}
            initialData={editingExperience}
            onSave={saveExperience}
            onClose={closeForm}
          />
        )}

        {/* Experience List */}
        <ExperienceList
          experiences={experiences}
          onEdit={editExperience}
          onDelete={deleteExperience}
        />

      </main>

      <footer className="text-center text-gray-400 text-xs py-5">
        LinkedIn Experience Form · Built with React & Tailwind CSS
      </footer>

    </div>
  );
}

export default App;
