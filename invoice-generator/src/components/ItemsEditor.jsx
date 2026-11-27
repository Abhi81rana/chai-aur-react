
import { Package, Plus, Trash2 } from "lucide-react";

function ItemsEditor({ items, setItems }) {
  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: "",
        quantity: "1",
        price: "0",
      },
    ]);
  };

  const updateItem = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, [field]: value }
          : item
      )
    );
  };

  const removeItem = (id) => {
    if (items.length === 1) {
      alert("At least one item is required.");
      return;
    }

    setItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const formatMoney = (amount) =>
    amount.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    });

  return (
    <section className="panel">
      <h2 className="section-title">
        <Package size={23} />
        Invoice Items
      </h2>

      <div className="table-wrapper">
        <table className="editor-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Product / Service</th>
              <th>Quantity</th>
              <th>Price (₹)</th>
              <th>Total (₹)</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => {
              const quantity = Number(item.quantity) || 0;
              const price = Number(item.price) || 0;

              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>

                  <td>
                    <input
                      type="text"
                      value={item.name}
                      placeholder="Product name"
                      onChange={(e) =>
                        updateItem(item.id, "name", e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(item.id, "quantity", e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.price}
                      onChange={(e) =>
                        updateItem(item.id, "price", e.target.value)
                      }
                    />
                  </td>

                  <td className="item-total">
                    ₹{formatMoney(quantity * price)}
                  </td>

                  <td>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => removeItem(item.id)}
                      title="Delete item"
                    >
                      <Trash2 size={17} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <button type="button" className="add-btn" onClick={addItem}>
        <Plus size={19} />
        Add Item
      </button>
    </section>
  );
}

export default ItemsEditor;
