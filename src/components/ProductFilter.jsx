"use client"

import { useState, useEffect } from "react"
import "../styles/ProductFilter.css"

const ProductFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  sortOption,
  onSortChange,
}) => {
  const [localPriceRange, setLocalPriceRange] = useState(priceRange)

  useEffect(() => {
    setLocalPriceRange(priceRange)
  }, [priceRange])

  const handlePriceChange = (e, type) => {
    const value = Number.parseFloat(e.target.value)
    setLocalPriceRange((prev) => ({
      ...prev,
      [type]: value,
    }))
  }

  const applyPriceFilter = () => {
    onPriceRangeChange(localPriceRange)
  }

  return (
    <div className="product-filter">

      <div className="filter-container">
        <div className="filter-section">
          <ul className="category-list">
            <li>
              <button className={selectedCategory === "" ? "active" : ""} onClick={() => onCategoryChange("")}>
                All Categories
              </button>
            </li>
            {categories.map((category) => (
              <li key={category}>
                <button
                  className={selectedCategory === category ? "active" : ""}
                  onClick={() => onCategoryChange(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="filter-section">
          <h3>Price Range</h3>
          <div className="price-inputs">
            <div className="price-input-group">
              <label htmlFor="min-price">Min:</label>
              <input
                type="number"
                id="min-price"
                min="0"
                value={localPriceRange.min}
                onChange={(e) => handlePriceChange(e, "min")}
              />
            </div>
            <div className="price-input-group">
              <label htmlFor="max-price">Max:</label>
              <input
                type="number"
                id="max-price"
                min="0"
                value={localPriceRange.max}
                onChange={(e) => handlePriceChange(e, "max")}
              />
            </div>
          </div>
          <button className="apply-price-button" onClick={applyPriceFilter}>
            Apply
          </button>
        </div>

        <div className="filter-section">
          <h3>Sort By</h3>
          <select value={sortOption} onChange={(e) => onSortChange(e.target.value)} className="sort-select">
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default ProductFilter
