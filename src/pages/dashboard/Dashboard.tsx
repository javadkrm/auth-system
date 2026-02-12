import React from 'react'
import './Dashboard.css'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/index'
import { Cart } from '../../types/cart'
import { logout } from '../../store/slices/authSlice'
import { removeFromCart } from '../../store/slices/cartSlice'

function Dashboard() {

  const user = useSelector((state: RootState) => state.auth.currentUser)
  const carts = useSelector((state: RootState) => state.cart.items)

  const dispatch = useDispatch<AppDispatch>()


  const totalPrice = carts.reduce((total, item) => {
    return total + item.price * item.count
  }, 0)


  return (


    <div className="dashboard container mt-5">
      <div className="dashboardHeader d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <h3>Welcome, <span>{user?.name}</span></h3>
        <button className="btn btn-outline-danger mt-2 mt-md-0" onClick={() => {dispatch(logout())}}>
          Logout
        </button>
      </div>
      <div className="cartSection">
        <h5 className="mb-3">Your Cart</h5>

        {carts.length === 0 ? (
          <p className="text-muted">Your cart is empty</p>
        ) : (
          <div className="row">
            {carts.map((item: Cart) => (
              <div key={item.id} className="col-xl-4 col-lg-6 col-md-12 mb-4">
                <div className="cartCard">
                  <img src={item.img} alt={item.title} />
                  <div className="cartInfo">
                    <h6>{item.title}</h6>
                    <span className="price">${item.price} × {item.count}</span>
                  </div>
                  <button className="removeBtn" onClick={() => {dispatch(removeFromCart(item.id))}}>✕</button>
                </div>
              </div>
            ))}
            <div className='totalPrice fw-bold'>Total Price:$ {totalPrice}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
