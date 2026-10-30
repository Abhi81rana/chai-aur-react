
import { useEffect, useState } from "react";
import initialProducts from "./products";
import ProductCard from "./ProductCard";
import AddProduct from "./AddProduct";
import "./App.css";

function App() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [showAddProduct, setShowAddProduct] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);

  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Save products in Local Storage
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // Add or Update Product
  function handleSaveProduct(product) {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((item) =>
          item.id === editingProduct.id ? product : item
        )
      );
    } else {
      setProducts((prev) => [...prev, product]);
    }

    setEditingProduct(null);
    setShowAddProduct(false);
  }

  // Delete Product
  function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      setProducts((prev) =>
        prev.filter((product) => product.id !== id)
      );
    }
  }

  // Edit Product
  function handleEdit(product) {
    setEditingProduct(product);
    setShowAddProduct(true);
  }

  // Search Product
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`container ${darkMode ? "dark-mode" : ""}`}>

      <nav className="header">
        <h1>E-commerce Lite</h1>

        <button onClick={() => {
          setShowAddProduct(false);
          setEditingProduct(null);
        }}>
          Products
        </button>

        <button onClick={() => {
          setEditingProduct(null);
          setShowAddProduct(true);
        }}>
          + Add Product
        </button>

        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </nav>

      {showAddProduct ? (
        <div>
          <button onClick={() => {
            setShowAddProduct(false);
            setEditingProduct(null);
          }}>
            ❌ Close
          </button>

          <AddProduct
            key={editingProduct?.id ?? "new"}
            initialProduct={editingProduct}
            onSave={handleSaveProduct}
          />
        </div>
      ) : (
        <section className="products-section">

          <h2>Our Products ({filteredProducts.length})</h2>

          <input
            type="text"
            className="search-bar"
            placeholder="Search products by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="product-list">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <p>No products found!</p>
            )}
          </div>

        </section>
      )}

    </div>
  );
}

export default App;
