"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import ProductFilter from "../components/ProductFilter"
import Loader from "../components/Loader"
import "../styles/Products.css"

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("")
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })
  const [sortOption, setSortOption] = useState("default")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Get filter values from URL params
    const categoryParam = searchParams.get("category") || ""
    const searchParam = searchParams.get("search") || ""

    setSelectedCategory(categoryParam)
    setSearchQuery(searchParam)

    const fetchData = async () => {
      try {
        // Fetch all products
        const productsResponse = await fetch("https://fakestoreapi.com/products")
        if (!productsResponse.ok) {
          throw new Error("Failed to fetch products")
        }
        const productsData = await productsResponse.json()
        setProducts(productsData)

        // Determine price range
        if (productsData.length > 0) {
          const prices = productsData.map((p) => p.price)
          const minPrice = Math.floor(Math.min(...prices))
          const maxPrice = Math.ceil(Math.max(...prices))
          setPriceRange({ min: minPrice, max: maxPrice })
        }

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
  }, [searchParams])

  // Apply filters whenever filter states change
  useEffect(() => {
    if (products.length === 0) return

    let result = [...products]

    // Apply category filter
    if (selectedCategory) {
      result = result.filter((product) => product.category === selectedCategory)
    }

    // Apply price filter
    result = result.filter((product) => product.price >= priceRange.min && product.price <= priceRange.max)

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query),
      )
    }

    // Apply sorting
    switch (sortOption) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating.rate - a.rating.rate)
        break
      default:
        // Default sorting (by id)
        result.sort((a, b) => a.id - b.id)
    }

    setFilteredProducts(result)
  }, [products, selectedCategory, priceRange, sortOption, searchQuery])

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)

    // Update URL params
    if (category) {
      searchParams.set("category", category)
    } else {
      searchParams.delete("category")
    }
    setSearchParams(searchParams)
  }

  const handlePriceRangeChange = (newRange) => {
    setPriceRange(newRange)
  }

  const handleSortChange = (option) => {
    setSortOption(option)
  }

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>
  }

  return (
    <div className="products-page">
      <h1 className="products-title">
        {selectedCategory ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}` : "All Products"}
        {searchQuery && ` - Search: "${searchQuery}"`}
      </h1>

      <div className="products-container">
        <aside className="filter-sidebar">
          <ProductFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            priceRange={priceRange}
            onPriceRangeChange={handlePriceRangeChange}
            sortOption={sortOption}
            onSortChange={handleSortChange}
          />
        </aside>

        <div className="products-grid-container">
          {filteredProducts.length === 0 ? (
            <div className="no-products-message">
              <p>No products found matching your criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory("")
                  setPriceRange({ min: 0, max: 1000 })
                  setSortOption("default")
                  setSearchParams({})
                }}
                className="reset-filters-button"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <p className="products-count">{filteredProducts.length} products found</p>
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Products
