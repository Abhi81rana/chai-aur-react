
import { FileText, Download } from "lucide-react";

function Header({ onDownload }) {
  return (
    <header className="header">
      <div className="brand">
        <FileText size={46} />

        <div>
          <h1>Invoice Generator</h1>
          <p>Create professional invoices in seconds</p>
        </div>
      </div>

      <button className="download-btn" onClick={onDownload}>
        <Download size={19} />
        Download PDF
      </button>
    </header>
  );
}

export default Header;
