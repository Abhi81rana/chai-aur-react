
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import ProfileHeader from "./components/ProfileHeader";
import ExperienceForm from "./components/ExperienceForm";
import ExperienceList from "./components/ExperienceList";

function App() {
  const [showForm, setShowForm] = useState(false);

  const [experiences, setExperiences] = useState(() => {
  const savedData = localStorage.getItem("experiences");

    return savedData ? JSON.parse(savedData) : [];
  });

  const [editingExperience, setEditingExperience] = useState(null);


  useEffect(() => {
    localStorage.setItem(
      "experiences",
      JSON.stringify(experiences)
    );
  }, [experiences]);

  // Add or Update Experience
  const addExperience = (newExperience) => {

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
        newExperience
      ]);

    }

    setShowForm(false);
    setEditingExperience(null);
  };

  // Delete Experience
  const deleteExperience = (id) => {
    setExperiences((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // Open Edit Form
  const editExperience = (item) => {
    setEditingExperience(item);
    setShowForm(true);
  };

  // Close Form
  const closeForm = () => {
    setShowForm(false);
    setEditingExperience(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-8">

        <ProfileHeader
          onAddExperience={() => {
            setEditingExperience(null);
            setShowForm(true);
          }}
        />

        {/* Add / Edit Form */}
        {showForm && (
          <ExperienceForm
            key={editingExperience?.id || "new"}
            onClose={closeForm}
            onSave={addExperience}
            initialData={editingExperience}
          />
        )}

        {/* Experience List */}
        <ExperienceList
          experiences={experiences}
          onDelete={deleteExperience}
          onEdit={editExperience}
        />

      </main>

    </div>
  );
}

export default App;
