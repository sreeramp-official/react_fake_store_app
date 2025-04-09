import { Link } from "react-router-dom"
import "../styles/Footer.css"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>ShopReact</h3>
          <p>Your one-stop shop for all your needs.</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Categories</h3>
          <ul>
            <li>
              <Link to="/products?category=electronics">Electronics</Link>
            </li>
            <li>
              <Link to="/products?category=jewelery">Jewelry</Link>
            </li>
            <li>
              <Link to="/products?category=men's clothing">Men's Clothing</Link>
            </li>
            <li>
              <Link to="/products?category=women's clothing">Women's Clothing</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@shopreact.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} ShopReact. All rights reserved.</p>
        <p>
          <Link to="/privacy">Privacy Policy</Link> |<Link to="/terms"> Terms of Service</Link>
        </p>
      </div>
    </footer>
  )
}

export default Footer
