"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useCart } from "../contexts/CartContext"
import Loader from "../components/Loader"
import "../styles/ProductDetail.css"

const ProductDetail = () => {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)

        // Fetch product details
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch product")
        }
        const data = await response.json()
        setProduct(data)

        // Fetch related products (same category)
        const relatedResponse = await fetch(
          `https://fakestoreapi.com/products/category/${encodeURIComponent(data.category)}`,
        )
        if (!relatedResponse.ok) {
          throw new Error("Failed to fetch related products")
        }
        const relatedData = await relatedResponse.json()

        // Filter out the current product and limit to 4 items
        const filtered = relatedData.filter((item) => item.id !== Number.parseInt(id)).slice(0, 4)

        setRelatedProducts(filtered)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleQuantityChange = (e) => {
    const value = Number.parseInt(e.target.value)
    if (value >= 1) {
      setQuantity(value)
    }
  }

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1)
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
    }
  }

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>
  }

  if (!product) {
    return <div className="error-message">Product not found</div>
  }

  return (
    <div className="product-detail-page">
      <div className="breadcrumb">
        <Link to="/">Home</Link> /<Link to="/products">Products</Link> /
        <Link to={`/products?category=${encodeURIComponent(product.category)}`}>
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </Link>{" "}
        /<span>{product.title}</span>
      </div>

      <div className="product-detail-container">
        <div className="product-image-section">
          <img src={product.image || "/placeholder.svg"} alt={product.title} className="product-detail-image" />
        </div>

        <div className="product-info-section">
          <h1 className="product-detail-title">{product.title}</h1>

          <div className="product-meta">
            <div className="product-rating">
              <span className="rating-stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`star ${i < Math.round(product.rating.rate) ? "filled" : ""}`}>
                    ★
                  </span>
                ))}
              </span>
              <span className="rating-count">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>

            <p className="product-category">
              Category: <span>{product.category}</span>
            </p>
          </div>

          <p className="product-price">${product.price.toFixed(2)}</p>

          <div className="product-description">
            <h2>Description</h2>
            <p>{product.description}</p>
          </div>

          <div className="product-actions">
            <div className="quantity-selector">
              <button className="quantity-button" onClick={handleDecrement} aria-label="Decrease quantity">
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="quantity-input"
                aria-label="Product quantity"
              />
              <button className="quantity-button" onClick={handleIncrement} aria-label="Increase quantity">
                +
              </button>
            </div>

            <button
              className="add-to-cart-button"
              onClick={handleAddToCart}
              aria-label={`Add ${product.title} to cart`}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="related-products-section">
          <h2>Related Products</h2>
          <div className="related-products-grid">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct.id} to={`/products/${relatedProduct.id}`} className="related-product-card">
                <img
                  src={relatedProduct.image || "/placeholder.svg"}
                  alt={relatedProduct.title}
                  className="related-product-image"
                />
                <div className="related-product-info">
                  <h3 className="related-product-title">{relatedProduct.title}</h3>
                  <p className="related-product-price">${relatedProduct.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail
