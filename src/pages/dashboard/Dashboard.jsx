import React, { useContext } from 'react'
import './Dashboard.css'
import AuthContext from '../../contexts/AuthContext'

function Dashboard() {
  const {user, logout} = useContext(AuthContext)
  return (
    <div className='dashboard mt-5'>
      <p>Welcome {user.name}</p>
      <button className='btn btn-danger' onClick={logout}>Logout</button>
    </div>
  )
}

export default Dashboard