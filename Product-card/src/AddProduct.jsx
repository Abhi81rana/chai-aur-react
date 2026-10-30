
import { useState } from "react";

function AddProduct({ onSave, initialProduct }) {

  const [form, setForm] = useState({
    name: initialProduct?.name || "",
    link: initialProduct?.link || "",
    description: initialProduct?.description || "",
    price: initialProduct?.price || ""
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSave({
      id: initialProduct?.id || Date.now(),
      name: form.name,
      link: form.link,
      image: initialProduct?.image || form.link,
      description: form.description,
      price: Number(form.price)
    });
  }

  return (
    <div className="add-product-form">

      <h2>
        {initialProduct ? "Edit Product" : "Add New Product"}
      </h2>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="link"
          type="url"
          placeholder="Product Link"
          value={form.link}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Product Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Product Price"
          min="0.01"
          value={form.price}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {initialProduct ? "Update Product" : "Submit Product"}
        </button>

      </form>
    </div>
  );
}

export default AddProduct;
