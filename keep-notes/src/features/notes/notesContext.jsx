
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

import { notesRepository } from "../../services/repositories/notesRepository";
import { DEFAULT_LABELS } from "../../constants/app";
import { createId } from "../../utils/id";
import { getErrorMessage } from "../../utils/appError";

import {
  initialNotesState,
  notesReducer,
} from "./noteReducer.js";

const NotesContext = createContext(null);

export function NotesProvider({ children }) {
  const [state, dispatch] = useReducer(
    notesReducer,
    initialNotesState
  );

  useEffect(() => {
    let active = true;

    async function initialize() {
      try {
        const data = await notesRepository.load();

        if (active) {
          dispatch({
            type: "HYDRATE",
            payload: data,
          });
        }
      } catch (error) {
        if (active) {
          dispatch({
            type: "HYDRATE",
            payload: {
              notes: [],
              labels: DEFAULT_LABELS,
              theme: "light",
              error: getErrorMessage(error),
            },
          });
        }
      }
    }

    initialize();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!state.initialized) return;

    notesRepository.saveSnapshot(state).catch((error) => {
      dispatch({
        type: "SET_ERROR",
        payload: getErrorMessage(error),
      });
    });
  }, [
    state.notes,
    state.labels,
    state.theme,
    state.initialized,
  ]);

  const saveNote = useCallback((draft) => {
    const timestamp = Date.now();

    const existing = state.notes.find(
      (note) => note.id === draft.id
    );

    const note = {
      ...draft,
      id: existing?.id || createId(),
      title: draft.title?.trim() || "",
      content: draft.content?.trim() || "",
      items: draft.items || [],
      checklist: Boolean(draft.checklist),
      color: draft.color || "default",
      labelId: draft.labelId || "",
      pinned: Boolean(draft.pinned),
      archived: Boolean(draft.archived),
      trashed: Boolean(draft.trashed),
      createdAt: existing?.createdAt || timestamp,
      updatedAt: timestamp,
    };

    if (
      !note.title &&
      !note.content &&
      !note.items.some((item) => item.text?.trim())
    ) {
      throw new Error("Please enter note content.");
    }

    dispatch({
      type: "UPSERT_NOTE",
      payload: note,
    });

    return note;
  }, [state.notes]);

  const patchNote = useCallback((id, changes) => {
    dispatch({
      type: "PATCH_NOTE",
      payload: { id, changes },
    });
  }, []);

  const moveToTrash = useCallback((id) => {
    patchNote(id, {
      trashed: true,
      archived: false,
      pinned: false,
    });
  }, [patchNote]);

  const togglePin = useCallback((note) => {
    patchNote(note.id, {
      pinned: !note.pinned,
      archived: false,
    });
  }, [patchNote]);

  const toggleArchive = useCallback((note) => {
    patchNote(note.id, {
      archived: !note.archived,
      pinned: false,
    });
  }, [patchNote]);

  const restoreNote = useCallback((id) => {
    patchNote(id, {
      trashed: false,
      archived: false,
      pinned: false,
    });
  }, [patchNote]);

  const permanentlyDeleteNote = useCallback((id) => {
    dispatch({
      type: "DELETE_NOTE_PERMANENTLY",
      payload: id,
    });
  }, []);

  const toggleChecklistItem = useCallback((noteId, itemId) => {
    dispatch({
      type: "TOGGLE_CHECKLIST_ITEM",
      payload: { noteId, itemId },
    });
  }, []);

  const createLabel = useCallback((name) => {
    const cleanName = name.trim();

    if (!cleanName) {
      throw new Error("Label name is required.");
    }

    if (
      state.labels.some(
        (label) =>
          label.name.toLowerCase() === cleanName.toLowerCase()
      )
    ) {
      throw new Error("Label already exists.");
    }

    const label = {
      id: createId(),
      name: cleanName,
      color: "#9254de",
    };

    dispatch({
      type: "ADD_LABEL",
      payload: label,
    });

    return label;
  }, [state.labels]);

  const deleteLabel = useCallback((id) => {
    dispatch({ type: "DELETE_LABEL", payload: id });
  }, []);

  const setTheme = useCallback((theme) => {
    if (theme === "light" || theme === "dark") {
      dispatch({ type: "SET_THEME", payload: theme });
    }
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: "CLEAR_ERROR" });
  }, []);

  const value = useMemo(() => ({
    ...state,
    saveNote,
    patchNote,
    moveToTrash,
    togglePin,
    toggleArchive,
    restoreNote,
    permanentlyDeleteNote,
    toggleChecklistItem,
    createLabel,
    deleteLabel,
    setTheme,
    clearError,
  }), [
    state,
    saveNote,
    patchNote,
    moveToTrash,
    togglePin,
    toggleArchive,
    restoreNote,
    permanentlyDeleteNote,
    toggleChecklistItem,
    createLabel,
    deleteLabel,
    setTheme,
    clearError,
  ]);

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);

  if (!context) {
    throw new Error("useNotes must be used inside NotesProvider");
  }

  return context;
}
