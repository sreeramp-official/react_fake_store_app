"use client"

import { useCart } from "../contexts/CartContext"
import "../styles/CartItem.css"

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart()

  const handleQuantityChange = (e) => {
    const newQuantity = Number.parseInt(e.target.value)
    if (newQuantity >= 1) {
      updateQuantity(item.id, newQuantity)
    }
  }

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1)
  }

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1)
    } else {
      removeFromCart(item.id)
    }
  }

  const handleRemove = () => {
    removeFromCart(item.id)
  }

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image || "/placeholder.svg"} alt={item.title} />
      </div>

      <div className="cart-item-details">
        <h3 className="cart-item-title">{item.title}</h3>
        <p className="cart-item-price">${item.price.toFixed(2)}</p>
      </div>

      <div className="cart-item-quantity">
        <button className="quantity-button" onClick={handleDecrement} aria-label="Decrease quantity">
          -
        </button>
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={handleQuantityChange}
          className="quantity-input"
          aria-label="Item quantity"
        />
        <button className="quantity-button" onClick={handleIncrement} aria-label="Increase quantity">
          +
        </button>
      </div>

      <div className="cart-item-subtotal">
        <p>${(item.price * item.quantity).toFixed(2)}</p>
      </div>

      <button className="remove-button" onClick={handleRemove} aria-label={`Remove ${item.title} from cart`}>
        ✕
      </button>
    </div>
  )
}

export default CartItem
