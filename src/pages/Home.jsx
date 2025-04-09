"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import Loader from "../components/Loader"
import "../styles/Home.css"

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch featured products (top rated)
        const productsResponse = await fetch("https://fakestoreapi.com/products")
        if (!productsResponse.ok) {
          throw new Error("Failed to fetch products")
        }
        const productsData = await productsResponse.json()

        // Sort by rating and take top 4
        const topRated = [...productsData].sort((a, b) => b.rating.rate - a.rating.rate).slice(0, 4)

        setFeaturedProducts(topRated)

        // Fetch categories
        const categoriesResponse = await fetch("https://fakestoreapi.com/products/categories")
        if (!categoriesResponse.ok) {
          throw new Error("Failed to fetch categories")
        }
        const categoriesData = await categoriesResponse.json()
        setCategories(categoriesData)

        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>
  }

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to ShopReact</h1>
          <p>Discover amazing products at unbeatable prices</p>
          <Link to="/products" className="shop-now-button">
            Shop Now
          </Link>
        </div>
      </section>

      <section className="featured-section">
        <h2>Featured Products</h2>
        <div className="featured-products">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="categories-section">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          {categories.map((category) => (
            <Link key={category} to={`/products?category=${encodeURIComponent(category)}`} className="category-card">
              <div className="category-content">
                <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                <span className="category-link">Browse Products →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="promo-section">
        <div className="promo-content">
          <h2>Special Offer</h2>
          <p>Get 20% off on your first purchase!</p>
          <p>
            Use code: <strong>FIRST20</strong>
          </p>
          <Link to="/products" className="promo-button">
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
