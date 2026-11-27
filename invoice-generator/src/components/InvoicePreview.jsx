
import { Mail, Phone, MapPin } from "lucide-react";

function InvoicePreview({
  customer,
  items,
  subtotal,
  tax,
  grandTotal,
  gst,
  invoiceNumber,
  invoiceDate,
  dueDate,
  company,
}) {
  const money = (amount) =>
    amount.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const dateFormat = (date) =>
    new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="invoice" id="invoice-preview">
      <div className="invoice-top">
        <div className="company">
          <div className="company-logo">N</div>

          <div>
            <h2>{company.name}</h2>
            <p>{company.tagline}</p>
          </div>
        </div>

        <div className="invoice-heading">
          <h1>INVOICE</h1>
          <strong>#{invoiceNumber}</strong>
        </div>
      </div>

      <div className="invoice-line"></div>

      <div className="invoice-info">
        <div className="bill-to">
          <h3>Bill To:</h3>
          <h3>{customer.name || "Customer Name"}</h3>

          <p>
            <Mail size={16} />
            {customer.email || "Email address"}
          </p>

          <p>
            <Phone size={16} />
            {customer.phone || "Phone number"}
          </p>

          <p>
            <MapPin size={16} />
            {customer.address || "Customer address"}
          </p>
        </div>

        <div className="date-info">
          <p>
            Invoice Date:
            <strong>{dateFormat(invoiceDate)}</strong>
          </p>

          <p>
            Due Date:
            <strong>{dateFormat(dueDate)}</strong>
          </p>

          <p>
            Status:
            <span className="pending">Pending</span>
          </p>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="preview-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Product / Service</th>
              <th>Quantity</th>
              <th>Price (₹)</th>
              <th>Total (₹)</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => {
              const quantity = Number(item.quantity) || 0;
              const price = Number(item.price) || 0;

              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name || "New Item"}</td>
                  <td>{quantity}</td>
                  <td>₹{money(price)}</td>
                  <td>₹{money(quantity * price)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="preview-totals">
        <p>
          <span>Subtotal</span>
          <strong>₹{money(subtotal)}</strong>
        </p>

        <p>
          <span>GST ({gst}%)</span>
          <strong>₹{money(tax)}</strong>
        </p>

        <div className="preview-grand">
          <span>Grand Total</span>
          <strong>₹{money(grandTotal)}</strong>
        </div>
      </div>

      <div className="invoice-footer">
        <div>
          <p><i>Thank you for your business!</i></p>
          <p><i>For {company.name}</i></p>
        </div>

        <div className="signature">
          Authorized Signature
        </div>
      </div>

      <div className="invoice-bottom"></div>
    </div>
  );
}

export default InvoicePreview;
