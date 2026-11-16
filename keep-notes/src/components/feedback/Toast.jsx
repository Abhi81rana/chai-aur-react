import { AlertCircle, CheckCircle, X } from "lucide-react";

function Toast({ message, type = "error", onClose }) {
  if (!message) return null;

  const Icon = type === "success" ? CheckCircle : AlertCircle;

  return (
    <div className={`toast toast-${type}`} role="alert">
      <Icon size={20} />

      <span>{message}</span>

      <button
        className="icon-button"
        onClick={onClose}
        aria-label="Dismiss notification"
      >
        <X size={18} />
      </button>
    </div>
  );
}

export default Toast;