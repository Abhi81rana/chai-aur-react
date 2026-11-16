import {
  Pin,
  Archive,
  Trash2,
  Bell,
  MoreVertical,
  RotateCcw,
} from "lucide-react";

import { NOTE_COLORS } from "../../constants/app.js";

function NoteCard({
  note,
  labels,
  onEdit,
  onPin,
  onArchive,
  onTrash,
  onRestore,
  onDelete,
  onToggleItem,
}) {
  const noteColor =
    NOTE_COLORS.find((color) => color.id === note.color)?.value ||
    "#ffffff";

  const label = labels.find((item) => item.id === note.labelId);

  return (
    <article
      className="note-card"
      style={{ backgroundColor: noteColor }}
      onClick={() => onEdit(note)}
    >
      <button
        className={`pin-button ${note.pinned ? "is-pinned" : ""}`}
        onClick={(event) => {
          event.stopPropagation();
          onPin(note);
        }}
        title={note.pinned ? "Unpin note" : "Pin note"}
      >
        <Pin size={19} />
      </button>

      {note.title && <h3>{note.title}</h3>}

      {note.checklist ? (
        <div className="note-checklist">
          {(note.items || []).map((item) => (
            <label
              key={item.id}
              className="checklist-row"
              onClick={(event) => event.stopPropagation()}
            >
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => onToggleItem(note.id, item.id)}
              />
              <span className={item.done ? "completed" : ""}>
                {item.text}
              </span>
            </label>
          ))}
        </div>
      ) : (
        <p className="note-content">{note.content}</p>
      )}

      <div className="note-footer">
        {label && (
          <span
            className="note-label"
            style={{ color: label.color }}
          >
            {label.name}
          </span>
        )}

        <div className="note-actions">
          {note.trashed ? (
            <>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  onRestore(note.id);
                }}
                title="Restore"
              >
                <RotateCcw size={17} />
              </button>

              <button
                onClick={(event) => {
                  event.stopPropagation();
                  onDelete(note.id);
                }}
                title="Delete forever"
              >
                <Trash2 size={17} />
              </button>
            </>
          ) : (
            <>
              {!note.archived && (
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    onArchive(note);
                  }}
                  title="Archive"
                >
                  <Archive size={17} />
                </button>
              )}

              {note.archived && (
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    onArchive(note);
                  }}
                  title="Unarchive"
                >
                  <RotateCcw size={17} />
                </button>
              )}

              <button
                onClick={(event) => {
                  event.stopPropagation();
                  onTrash(note.id);
                }}
                title="Move to trash"
              >
                <Trash2 size={17} />
              </button>
            </>
          )}

          <button
            onClick={(event) => {
              event.stopPropagation();
              onEdit(note);
            }}
            title="Edit note"
          >
            <MoreVertical size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default NoteCard;