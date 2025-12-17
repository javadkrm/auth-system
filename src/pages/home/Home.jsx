import React, { useContext } from 'react'
import './Home.css'
import CartContext from '../../contexts/CartContext'
import ProductsContext from '../../contexts/ProductsContext'

function Home() {
  const { products } = useContext(ProductsContext)
  const { addToCart } = useContext(CartContext)

  return (
    <div className="home container my-5">

      {/* Page Title */}
      <div className="homeHeader text-center mb-5">
        <h2>Our Products</h2>
        <p>Choose your favorite product and add it to cart</p>
      </div>

      {/* Products */}
      <div className="row d-flex justify-content-evenly">
        {products.map(product => (
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
                  onClick={() => addToCart(product)}
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
