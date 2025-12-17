import React, { useContext } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import AuthContext from '../../contexts/AuthContext'

function Navbar() {
    const {user} = useContext(AuthContext)
    return (
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container">
                    <Link class="navbar-brand" to="/">Navbar</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link class="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/dashboard">Dashboard</Link>
                            </li>
                        </ul>
                        <div class="d-flex">
                            {user ? <div className='userName'>{user.name}</div> : (
                                <div className='d-flex'><Link className='text-decoration-none me-1' to={'/login'}>Login</Link>/<Link className='text-decoration-none ms-1' to={'/register'}>Register</Link></div>
                                )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar