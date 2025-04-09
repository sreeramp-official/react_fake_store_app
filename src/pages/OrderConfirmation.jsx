"use client"

import { useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import "../styles/OrderConfirmation.css"

const OrderConfirmation = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const orderDetails = location.state

  useEffect(() => {
    // Redirect to home if no order details are available
    if (!orderDetails) {
      navigate("/")
    }
  }, [orderDetails, navigate])

  if (!orderDetails) {
    return null
  }

  return (
    <div className="order-confirmation-page">
      <div className="confirmation-container">
        <div className="confirmation-header">
          <div className="success-icon">✓</div>
          <h1>Order Confirmed!</h1>
          <p>Thank you for your purchase</p>
        </div>

        <div className="order-details">
          <h2>Order Details</h2>

          <div className="detail-row">
            <span className="detail-label">Order Number:</span>
            <span className="detail-value">{orderDetails.orderId}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Order Date:</span>
            <span className="detail-value">
              {new Date(orderDetails.orderDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Shipping Address:</span>
            <span className="detail-value">{orderDetails.shippingAddress}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Payment Method:</span>
            <span className="detail-value">{orderDetails.paymentMethod}</span>
          </div>
        </div>

        <div className="shipping-info">
          <h2>Shipping Information</h2>
          <p>Your order will be processed within 1-2 business days.</p>
          <p>Estimated delivery: 3-5 business days after processing.</p>
          <p>You will receive a shipping confirmation email with tracking information once your order ships.</p>
        </div>

        <div className="confirmation-actions">
          <Link to="/" className="home-button">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation
