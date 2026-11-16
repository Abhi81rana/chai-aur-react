import { useState } from "react";
import { X, Tag } from "lucide-react";

function LabelDialog({ open, onClose, onCreate }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      onCreate(name);
      setName("");
      setError("");
      onClose();
    } catch (err) {
      setError(err.message || "Unable to create label.");
    }
  };

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <form
        className="label-dialog"
        onSubmit={handleSubmit}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="dialog-header">
          <h3>Create new label</h3>

          <button
            type="button"
            className="icon-button"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <div className="label-input-wrapper">
          <Tag size={19} />

          <input
            autoFocus
            value={name}
            placeholder="Enter label name"
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="dialog-actions">
          <button type="button" onClick={onClose}>
            Cancel
          </button>

          <button type="submit" className="save-button">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default LabelDialog;