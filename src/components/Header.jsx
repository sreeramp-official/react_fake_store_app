import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useCart } from "../contexts/CartContext"
import { useTheme } from "../contexts/ThemeContext"
import { FaSun, FaMoon, FaShoppingCart, FaBars } from "react-icons/fa"
import { FiLogOut } from "react-icons/fi"
import "../styles/Header.css"

const Header = () => {
  const { currentUser, logout } = useAuth()
  const { getTotalItems } = useCart()
  const { darkMode, toggleTheme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      setMobileMenuOpen(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate("/")
    setMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <Link to="/" className="logo" onClick={() => setMobileMenuOpen(false)}>
            ShopReact
          </Link>
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
            <FaBars className={`hamburger-icon ${mobileMenuOpen ? "open" : ""}`} />
          </button>
        </div>

        <nav className={`nav-menu ${mobileMenuOpen ? "open" : ""}`}>
          <ul className="nav-links">
            <li>
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            </li>
            <li>
              <Link to="/products" onClick={() => setMobileMenuOpen(false)}>Products</Link>
            </li>
          </ul>

          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
          </form>

          <div className="header-actions">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            <Link to="/cart" className="cart-icon" onClick={() => setMobileMenuOpen(false)}>
              <FaShoppingCart />
              <span className="cart-count">{getTotalItems()}</span>
            </Link>

            {currentUser ? (
              <div className="user-menu">
                <span className="user-name">Hi, {currentUser.name}</span>
                <button onClick={handleLogout} className="logout-button" title="Logout">
                  <FiLogOut />
                </button>
              </div>
            ) : (
              <div className="auth-links">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>Register</Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
