"use client"

import { Link } from "react-router-dom"
import { useCart } from "../contexts/CartContext"
import "../styles/ProductCard.css"

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, 1)
  }

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-link">
        <div className="product-image-container">
          <img src={product.image || "/placeholder.svg"} alt={product.title} className="product-image" loading="lazy" />
        </div>
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          <p className="product-category">{product.category}</p>
          <div className="product-price-rating">
            <span className="product-price">${product.price.toFixed(2)}</span>
            <div className="product-rating">
              <span className="rating-star">★</span>
              <span>
                {product.rating.rate} ({product.rating.count})
              </span>
            </div>
          </div>
        </div>
      </Link>
      <button className="add-to-cart-button" onClick={handleAddToCart} aria-label={`Add ${product.title} to cart`}>
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard
