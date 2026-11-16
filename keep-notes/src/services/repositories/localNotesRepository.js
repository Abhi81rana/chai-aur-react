
import {
  STORAGE_KEYS,
  DEFAULT_LABELS,
  DEFAULT_THEME,
} from "../../constants/app.js";

import {
  readJson,
  writeJson,
} from "../storage/localStorage.js";

export const localNotesRepository = {
  async load() {
    const notes = readJson(STORAGE_KEYS.notes, []);
    const labels = readJson(STORAGE_KEYS.labels, DEFAULT_LABELS);
    const theme = readJson(STORAGE_KEYS.theme, DEFAULT_THEME);

    return {
      notes: Array.isArray(notes) ? notes : [],
      labels: Array.isArray(labels) ? labels : DEFAULT_LABELS,
      theme: theme === "dark" ? "dark" : "light",
    };
  },

  async saveSnapshot({ notes, labels, theme }) {
    writeJson(STORAGE_KEYS.notes, notes);
    writeJson(STORAGE_KEYS.labels, labels);
    writeJson(STORAGE_KEYS.theme, theme);
  },
};
