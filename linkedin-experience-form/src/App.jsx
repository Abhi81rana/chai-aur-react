
import { useState } from "react";
import Navbar from "./components/Navbar";
import ProfileHeader from "./components/ProfileHeader";
import ExperienceForm from "./components/ExperienceForm";
import ExperienceList from "./components/ExperienceList";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [experiences, setExperiences] = useState([]);

  const deleteExperience = (id) => {
  setExperiences((prev) =>
    prev.filter((item) => item.id !== id)
  );
};

  const addExperience = (newExperience) => {
    setExperiences((prev) => [...prev, newExperience]);

    // Close form after saving
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <ProfileHeader
          onAddExperience={() => setShowForm(true)}
        />

        <ExperienceList
          experiences={experiences}
          onDelete={deleteExperience}
        />

        {showForm && (
          <ExperienceForm
            onClose={() => setShowForm(false)}
            onSave={addExperience}
          />
        )}

        
      </main>
    </div>
  );
}

export default App;
