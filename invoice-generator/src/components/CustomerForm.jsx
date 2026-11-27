
import { User } from "lucide-react";

function CustomerForm({ customer, setCustomer }) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="panel">
      <h2 className="section-title">
        <User size={23} />
        Customer Details
      </h2>

      <div className="form-grid">
        <div className="field">
          <label>Customer Name *</label>
          <input
            name="name"
            value={customer.name}
            onChange={handleChange}
            placeholder="Enter customer name"
          />
        </div>

        <div className="field">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
            placeholder="example@gmail.com"
          />
        </div>

        <div className="field">
          <label>Phone *</label>
          <input
            type="tel"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
          />
        </div>

        <div className="field">
          <label>Address</label>
          <textarea
            name="address"
            value={customer.address}
            onChange={handleChange}
            placeholder="Enter customer address"
            rows={2}
          />
        </div>
      </div>
    </section>
  );
}

export default CustomerForm;
