import React, { useContext, useEffect } from 'react'
import './Dashboard.css'
import AuthContext from '../../contexts/AuthContext'
import CartContext from '../../contexts/CartContext'

function Dashboard() {
  const { user, logout } = useContext(AuthContext)
  const { cartItems, removeItem } = useContext(CartContext)

  const totalPrice = cartItems.reduce((total, item) => {
  return total + item.price * item.quantity
}, 0)


  return (
    <div className="dashboard container mt-5">

      {/* Header */}
      <div className="dashboardHeader d-flex justify-content-between align-items-center mb-4">
        <h3>Welcome, <span>{user.name}</span> 👋</h3>
        <button className="btn btn-outline-danger" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Cart Section */}
      <div className="cartSection">
        <h5 className="mb-3">Your Cart</h5>
        {cartItems.length === 0 ? (
          <p className="text-muted">Your cart is empty</p>
        ) : (
          <div className="row">
            {cartItems.map(item => (
              <div key={item.id} className="col-lg-4 col-md-6 mb-4">
                <div className="cartCard">
                  <img src={item.img} alt={item.title} />
                  <div className="cartInfo">
                    <h6>{item.title}</h6>
                    <span className="price">${item.price}</span>
                    <span className='count'>count: {item.quantity}</span>
                  </div>
                  <button className='btn btn-danger' onClick={() => {removeItem(item.id)}}>Reomve</button>
                </div>
              </div>
            ))}
          </div>
  
        )}
        <span className='totalPrice fw-bold'>Total Price: {totalPrice}$</span>
      </div>

    </div>
  )
}

export default Dashboard
