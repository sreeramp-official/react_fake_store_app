"use client"

import { Link } from "react-router-dom"
import { useCart } from "../contexts/CartContext"
import CartItem from "../components/CartItem"
import "../styles/Cart.css"

const Cart = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart()

  return (
    <div className="cart-page">
      <h1>Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/products" className="continue-shopping-button">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-header">
            <span className="header-product">Product</span>
            <span className="header-price">Price</span>
            <span className="header-quantity">Quantity</span>
            <span className="header-subtotal">Subtotal</span>
            <span className="header-remove"></span>
          </div>

          <div className="cart-items">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="cart-actions">
            <button className="clear-cart-button" onClick={clearCart} aria-label="Clear cart">
              Clear Cart
            </button>
            <Link to="/products" className="continue-shopping-button">
              Continue Shopping
            </Link>
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>

            <Link to="/checkout" className="checkout-button">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
