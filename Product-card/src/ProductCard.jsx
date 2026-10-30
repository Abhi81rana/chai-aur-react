
import "./ProductCard.css";

function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="product-card">

      <img
        src={product.image || product.link}
        alt={product.name}
        className="product-image"
      />

      <div className="product-info">

        <h3>{product.name}</h3>

        <p>{product.description}</p>

        <h2>₹{product.price}</h2>

        <button className="cart-btn">
          Add to Cart
        </button>

        <div className="card-actions">
          <button
            className="edit-btn"
            onClick={() => onEdit(product)}
          >
            ✏️ Edit
          </button>

          <button
            className="delete-btn"
            onClick={() => onDelete(product.id)}
          >
            🗑 Delete
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductCard;
