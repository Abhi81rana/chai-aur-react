
function Summary({ subtotal, tax, grandTotal, gst, setGst }) {
  const formatMoney = (amount) =>
    amount.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="summary">
      <div className="gst-control">
        <label>GST / Tax (%)</label>

        <select
          value={gst}
          onChange={(e) => setGst(Number(e.target.value))}
        >
          {[0, 5, 12, 18, 28].map((rate) => (
            <option key={rate} value={rate}>
              {rate}%
            </option>
          ))}
        </select>
      </div>

      <div className="summary-details">
        <p>
          <span>Subtotal</span>
          <strong>₹{formatMoney(subtotal)}</strong>
        </p>

        <p>
          <span>GST ({gst}%)</span>
          <strong>₹{formatMoney(tax)}</strong>
        </p>

        <div className="grand-total">
          <span>Grand Total</span>
          <strong>₹{formatMoney(grandTotal)}</strong>
        </div>
      </div>
    </div>
  );
}

export default Summary;
