
export const initialNotesState = {
  notes: [],
  labels: [],
  theme: "light",
  initialized: false,
  error: null,
};

export function notesReducer(state, action) {
  switch (action.type) {
    case "HYDRATE":
      return {
        ...state,
        ...action.payload,
        initialized: true,
        error: action.payload.error || null,
      };

    case "UPSERT_NOTE": {
      const exists = state.notes.some(
        (note) => note.id === action.payload.id
      );

      return {
        ...state,
        notes: exists
          ? state.notes.map((note) =>
              note.id === action.payload.id
                ? action.payload
                : note
            )
          : [action.payload, ...state.notes],
      };
    }

    case "PATCH_NOTE":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id
            ? {
                ...note,
                ...action.payload.changes,
                updatedAt: Date.now(),
              }
            : note
        ),
      };

    case "TOGGLE_CHECKLIST_ITEM":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.noteId
            ? {
                ...note,
                items: note.items.map((item) =>
                  item.id === action.payload.itemId
                    ? { ...item, done: !item.done }
                    : item
                ),
              }
            : note
        ),
      };

    case "DELETE_NOTE_PERMANENTLY":
      return {
        ...state,
        notes: state.notes.filter(
          (note) => note.id !== action.payload
        ),
      };

    case "ADD_LABEL":
      return {
        ...state,
        labels: [...state.labels, action.payload],
      };

    case "DELETE_LABEL":
      return {
        ...state,
        labels: state.labels.filter(
          (label) => label.id !== action.payload
        ),
        notes: state.notes.map((note) =>
          note.labelId === action.payload
            ? { ...note, labelId: "" }
            : note
        ),
      };

    case "SET_THEME":
      return {
        ...state,
        theme: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}
