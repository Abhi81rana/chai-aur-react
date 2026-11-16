
import { useEffect, useState } from "react";
import { X, Plus, ListChecks } from "lucide-react";

import { NOTE_COLORS } from "../../constants/app.js";
import { createId } from "../../utils/id.js";

const createEmptyDraft = (checklist = false) => ({
  title: "",
  content: "",
  checklist,
  items: [],
  color: "default",
  labelId: "",
  pinned: false,
  archived: false,
  trashed: false,
});

function NoteEditor({
  open,
  note,
  labels,
  onSave,
  onClose,
}) {
  const [draft, setDraft] = useState(createEmptyDraft());
  const [newItem, setNewItem] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;

    setDraft(
      note
        ? {
            ...createEmptyDraft(),
            ...note,
            items: note.items || [],
          }
        : createEmptyDraft()
    );

    setNewItem("");
    setError("");
  }, [open, note]);

  if (!open) return null;

  const updateField = (field, value) => {
    setDraft((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const addChecklistItem = () => {
    if (!newItem.trim()) return;

    setDraft((current) => ({
      ...current,
      items: [
        ...current.items,
        {
          id: createId(),
          text: newItem.trim(),
          done: false,
        },
      ],
    }));

    setNewItem("");
  };

  const updateChecklistItem = (id, changes) => {
    setDraft((current) => ({
      ...current,
      items: current.items.map((item) =>
        item.id === id ? { ...item, ...changes } : item
      ),
    }));
  };

  const removeChecklistItem = (id) => {
    setDraft((current) => ({
      ...current,
      items: current.items.filter((item) => item.id !== id),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (
      !draft.title.trim() &&
      !draft.content.trim() &&
      !draft.items.some((item) => item.text.trim())
    ) {
      setError("Please enter a title or some note content.");
      return;
    }

    try {
      onSave(draft);
      onClose();
    } catch (err) {
      setError(err.message || "Unable to save note.");
    }
  };

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <form
        className="note-editor-modal"
        style={{
          backgroundColor:
            NOTE_COLORS.find((color) => color.id === draft.color)?.value ||
            "#ffffff",
        }}
        onSubmit={handleSubmit}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="editor-top">
          <input
            type="text"
            placeholder="Title"
            value={draft.title}
            onChange={(event) =>
              updateField("title", event.target.value)
            }
          />

          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Close editor"
          >
            <X size={21} />
          </button>
        </div>

        {!draft.checklist ? (
          <textarea
            placeholder="Take a note..."
            value={draft.content}
            onChange={(event) =>
              updateField("content", event.target.value)
            }
            rows={6}
          />
        ) : (
          <div className="editor-checklist">
            {draft.items.map((item) => (
              <div className="editor-checklist-item" key={item.id}>
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() =>
                    updateChecklistItem(item.id, {
                      done: !item.done,
                    })
                  }
                />

                <input
                  type="text"
                  value={item.text}
                  placeholder="Checklist item"
                  onChange={(event) =>
                    updateChecklistItem(item.id, {
                      text: event.target.value,
                    })
                  }
                />

                <button
                  type="button"
                  className="icon-button"
                  onClick={() => removeChecklistItem(item.id)}
                  aria-label="Remove item"
                >
                  <X size={17} />
                </button>
              </div>
            ))}

            <div className="add-checklist-item">
              <Plus size={17} />

              <input
                value={newItem}
                placeholder="Add an item"
                onChange={(event) => setNewItem(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addChecklistItem();
                  }
                }}
              />

              <button
                type="button"
                onClick={addChecklistItem}
              >
                Add
              </button>
            </div>
          </div>
        )}

        <div className="editor-options">
          <div className="color-options">
            {NOTE_COLORS.map((color) => (
              <button
                key={color.id}
                type="button"
                className={`color-swatch ${
                  draft.color === color.id ? "selected" : ""
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
                onClick={() => updateField("color", color.id)}
              />
            ))}
          </div>

          <select
            value={draft.labelId}
            onChange={(event) =>
              updateField("labelId", event.target.value)
            }
          >
            <option value="">No label</option>

            {labels.map((label) => (
              <option key={label.id} value={label.id}>
                {label.name}
              </option>
            ))}
          </select>

          <button
            type="button"
            className={`checklist-switch ${
              draft.checklist ? "selected" : ""
            }`}
            title="Toggle checklist"
            onClick={() =>
              updateField("checklist", !draft.checklist)
            }
          >
            <ListChecks size={19} />
          </button>
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="editor-footer">
          <span>{note ? "Edit note" : "New note"}</span>

          <button type="submit" className="save-button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoteEditor;
