import {
  FileText,
  Pin,
  Archive,
  Trash2,
  Plus,
  Tag,
  X,
} from "lucide-react";

const menuItems = [
  { id: "notes", label: "Notes", icon: FileText },
  { id: "pinned", label: "Pinned", icon: Pin },
  { id: "archive", label: "Archive", icon: Archive },
  { id: "trash", label: "Trash", icon: Trash2 },
];

function Sidebar({
  activeView,
  onViewChange,
  labels,
  activeLabelId,
  onLabelSelect,
  onCreateLabel,
  mobileOpen,
  onClose,
}) {
  return (
    <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
      <div className="sidebar-header">
        <div className="brand">
          <div className="brand-icon">K</div>
          <h2>KeepNotes</h2>
        </div>

        <button className="icon-button mobile-close" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`nav-item ${
              activeView === id && !activeLabelId ? "active" : ""
            }`}
            onClick={() => onViewChange(id)}
          >
            <Icon size={21} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-labels">
        <div className="labels-heading">
          <h3>Labels</h3>
          <button
            className="icon-button"
            onClick={onCreateLabel}
            title="Create label"
          >
            <Plus size={20} />
          </button>
        </div>

        {labels.map((label) => (
          <button
            key={label.id}
            className={`label-item ${
              activeLabelId === label.id ? "active" : ""
            }`}
            onClick={() => onLabelSelect(label.id)}
          >
            <Tag size={19} style={{ color: label.color }} />
            <span>{label.name}</span>
          </button>
        ))}

        {labels.length === 0 && (
          <p className="empty-labels">No labels created</p>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;