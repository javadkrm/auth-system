import React from 'react'
import './Home.css'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { Product } from '../../types/product'
import { addToCart } from '../../store/slices/cartSlice'

const Home: React.FC = () => {

  const currentUser = useSelector((s: RootState) => s.auth.currentUser)

  const products = useSelector((state: RootState) => state.cart.products)

  const dispatch = useDispatch<AppDispatch>()

  const addHandler = (product: Product) => {
    if (!currentUser) {
      alert("Please login first")
      return
    }

    dispatch(addToCart(product))
  }

  return (
    <div className="home container my-5">

      <div className="homeHeader text-center mb-5">
        <h2>Our Products</h2>
        <p>Choose your favorite product and add it to cart</p>
      </div>
      <div className="row d-flex justify-content-evenly">
        {products.map((product: Product) => (
          <div
            key={product.id}
            className="col-xl-3 col-lg-4 col-md-6 mb-4"
          >
            <div className="productCard">

              <div className="productImage">
                <img src={product.img} alt={product.title} />
              </div>

              <div className="productBody">
                <h5>{product.title}</h5>
                <span className="price">${product.price}</span>

                <button
                  className="btn btn-primary w-100 mt-3"
                  onClick={() => addHandler(product)}
                >
                  Add To Cart
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Home
