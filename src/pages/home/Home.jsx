import React, { useContext } from 'react'
import './Home.css'
import ProuductsContext from '../../contexts/ProductsContext'

function Home() {

  const { products, error, loading } = useContext(ProuductsContext)

  if (loading) return <p>درحال بارگذاری محصولات</p>
  if (error) return <p>خطا در بارگذاری محصولات</p>
  return (
    <div className='app my-5'>
      <div className='row'>
        {products.map(product => (
          <div className="card col-xl-4 col-md-2 col-lg-12">
            <img src={product.img} className="card-img-top w-100 object-fit-contain h-100" alt="..." />
            <div className="card-body text-center">
              <h5 className="card-title">{product.title}</h5>
              <button className="btn btn-primary">Add To Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home