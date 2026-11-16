
import { Plus, ListChecks } from "lucide-react";

function NoteComposer({ onCreateNote }) {
  return (
    <div className="note-composer">
      <button
        type="button"
        className="composer-text"
        onClick={() => onCreateNote(false)}
      >
        Take a note...
      </button>

      <div className="composer-actions">
        <button
          type="button"
          className="icon-button"
          title="Create checklist"
          onClick={() => onCreateNote(true)}
        >
          <ListChecks size={23} />
        </button>

        <button
          type="button"
          className="icon-button"
          title="Create note"
          onClick={() => onCreateNote(false)}
        >
          <Plus size={23} />
        </button>
      </div>
    </div>
  );
}

export default NoteComposer;
