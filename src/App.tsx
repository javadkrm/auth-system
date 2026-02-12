import React from 'react'
import './App.css'
import routes from './routes'
import { useRoutes } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'

function App() {

    let router = useRoutes(routes)
    return (
        <div className='app'>
            <Navbar />
            <div className='main container'>
                {router}
            </div>
        </div>
    )
}

export default App