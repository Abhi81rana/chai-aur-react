
import { useEffect, useMemo, useState } from "react";

import { useNotes } from "./features/notes/notesContext";
import {
  selectVisibleNotes,
  splitPinnedNotes,
} from "./features/notes/noteSelectors.js";

import Sidebar from "./components/layout/Sidebar";
import AppHeader from "./components/layout/AppHeader";
import NoteComposer from "./components/notes/NoteComposer";
import NoteEditor from "./components/notes/NoteEditor";
import NoteCard from "./components/notes/NoteCard";
import LabelDialog from "./components/labels/LabelDialog";
import Toast from "./components/feedback/Toast";

import "./App.css";

function App() {
  const {
    notes,
    labels,
    theme,
    initialized,
    error,
    saveNote,
    togglePin,
    toggleArchive,
    moveToTrash,
    restoreNote,
    permanentlyDeleteNote,
    toggleChecklistItem,
    createLabel,
    setTheme,
    clearError,
  } = useNotes();

  const [activeView, setActiveView] = useState("notes");
  const [activeLabelId, setActiveLabelId] = useState(null);
  const [search, setSearch] = useState("");
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [labelDialogOpen, setLabelDialogOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [localMessage, setLocalMessage] = useState("");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const visibleNotes = useMemo(
    () =>
      selectVisibleNotes(notes, {
        view: activeView,
        labelId: activeLabelId,
        search,
      }),
    [notes, activeView, activeLabelId, search]
  );

  const { pinnedNotes, otherNotes } = useMemo(
    () =>
      splitPinnedNotes(
        visibleNotes,
        activeView === "notes"
      ),
    [visibleNotes, activeView]
  );

  const selectedLabel = labels.find(
    (label) => label.id === activeLabelId
  );

  const pageTitle = selectedLabel?.name ||
    ({
      notes: "Notes",
      pinned: "Pinned",
      archive: "Archive",
      trash: "Trash",
    }[activeView] || "Notes");

  const openNewNote = (checklist = false) => {
    setEditingNote(checklist ? { checklist: true, items: [] } : null);
    setEditorOpen(true);
  };

  const openEditNote = (note) => {
    setEditingNote(note);
    setEditorOpen(true);
  };

  const closeEditor = () => {
    setEditorOpen(false);
    setEditingNote(null);
  };

  const handleSaveNote = (draft) => {
    saveNote(draft);
    closeEditor();
    setLocalMessage("Note saved successfully.");
  };

  const handleLabelSelect = (id) => {
    setActiveView("notes");
    setActiveLabelId(id);
    setMobileOpen(false);
  };

  const handleViewChange = (view) => {
    setActiveView(view);
    setActiveLabelId(null);
    setSearch("");
    setMobileOpen(false);
  };

  const handleCreateLabel = (name) => {
    const label = createLabel(name);
    setActiveView("notes");
    setActiveLabelId(label.id);
  };

  const handleDeleteNote = (id) => {
    const confirmed = window.confirm(
      "Permanently delete this note?"
    );

    if (confirmed) {
      permanentlyDeleteNote(id);
      setLocalMessage("Note permanently deleted.");
    }
  };

  const handleToggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!initialized) {
    return (
      <div className="loading-screen">
        <div className="loader" />
        <p>Loading your notes...</p>
      </div>
    );
  }

  return (
    <div className="app-shell">
      {mobileOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <Sidebar
        activeView={activeView}
        onViewChange={handleViewChange}
        labels={labels}
        activeLabelId={activeLabelId}
        onLabelSelect={handleLabelSelect}
        onCreateLabel={() => setLabelDialogOpen(true)}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <main className="main-content">
        <AppHeader
          search={search}
          onSearchChange={setSearch}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onMenuClick={() => setMobileOpen(true)}
        />

        <div className="page-content">
          {activeView === "notes" && (
            <NoteComposer onCreateNote={openNewNote} />
          )}

          <div className="section-heading">
            <h2>{pageTitle}</h2>
            <span>{visibleNotes.length} notes</span>
          </div>

          {pinnedNotes.length > 0 && (
            <section className="notes-section">
              {activeView === "notes" && <h3>📌 Pinned</h3>}

              <div className="notes-grid">
                {pinnedNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    labels={labels}
                    onEdit={openEditNote}
                    onPin={togglePin}
                    onArchive={toggleArchive}
                    onTrash={moveToTrash}
                    onRestore={restoreNote}
                    onDelete={handleDeleteNote}
                    onToggleItem={toggleChecklistItem}
                  />
                ))}
              </div>
            </section>
          )}

          {otherNotes.length > 0 && (
            <section className="notes-section">
              {activeView === "notes" && pinnedNotes.length > 0 && (
                <h3>Others</h3>
              )}

              <div className="notes-grid">
                {otherNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    labels={labels}
                    onEdit={openEditNote}
                    onPin={togglePin}
                    onArchive={toggleArchive}
                    onTrash={moveToTrash}
                    onRestore={restoreNote}
                    onDelete={handleDeleteNote}
                    onToggleItem={toggleChecklistItem}
                  />
                ))}
              </div>
            </section>
          )}

          {visibleNotes.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>
                {search
                  ? "No matching notes"
                  : activeView === "trash"
                    ? "Trash is empty"
                    : activeView === "archive"
                      ? "No archived notes"
                      : "No notes here yet"}
              </h3>
              <p>
                {search
                  ? "Try another search term."
                  : "Your notes will appear here."}
              </p>
            </div>
          )}
        </div>
      </main>

      <NoteEditor
        open={editorOpen}
        note={editingNote}
        labels={labels}
        onSave={handleSaveNote}
        onClose={closeEditor}
      />

      <LabelDialog
        open={labelDialogOpen}
        onClose={() => setLabelDialogOpen(false)}
        onCreate={handleCreateLabel}
      />

      <Toast
        message={error || localMessage}
        onClose={() => {
          clearError();
          setLocalMessage("");
        }}
        type={error ? "error" : "success"}
      />
    </div>
  );
}

export default App;
