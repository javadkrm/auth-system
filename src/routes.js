import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Dashboard from './pages/dashboard/Dashboard'
import PrivateRoute from './routes/PrivateRoute'


let routes = [
    {path: '/', element: <Home/>},
    {path: '/login', element: <Login/>},
    {path: '/register', element: <Register/>},
    {path:'/dashboard', element: <PrivateRoute><Dashboard/></PrivateRoute>}
]

export default routes