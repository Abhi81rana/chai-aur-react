
export function selectVisibleNotes(
  notes,
  { view = "notes", labelId = null, search = "" } = {}
) {
  const query = search.trim().toLowerCase();

  return notes
    .filter((note) => {
      if (view === "trash") return note.trashed;

      if (note.trashed) return false;

      if (view === "archive") return note.archived;

      if (note.archived) return false;

      if (view === "pinned" && !note.pinned) return false;

      if (labelId && note.labelId !== labelId) return false;

      if (!query) return true;

      const checklistText = (note.items || [])
        .map((item) => item.text)
        .join(" ");

      const searchableText = [
        note.title,
        note.content,
        checklistText,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    })
    .sort(
      (a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)
    );
}

export function splitPinnedNotes(notes, separatePinned) {
  if (!separatePinned) {
    return {
      pinnedNotes: [],
      otherNotes: notes,
    };
  }

  return {
    pinnedNotes: notes.filter((note) => note.pinned),
    otherNotes: notes.filter((note) => !note.pinned),
  };
}
