import { createContext, useEffect, useState } from "react";

const AuthContext = createContext(null)

export function AuthProvider({ children }) {

    const [user, setUser] = useState('')

    useEffect(() => {
        const savedUser = localStorage.getItem('user')

        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
    }, [])

    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem('users')) || []

        const foundUser = users.find(user => user.email === email)

        if (foundUser) {
            setUser(foundUser)
            localStorage.setItem('user', JSON.stringify(foundUser))
            return true
        }

        return false

    }

    const register = ({ name, email, password }) => {
        const users = JSON.parse(localStorage.getItem('users')) || []

        const isExist = users.some(user => user.email === email)

        if (isExist) {
            return { success: false, message: 'این ایمیل قبلا ثبت شده است' }
        }

        const newUser = {
            name,
            email,
            password,
            role: 'user'
        }

        users.push(newUser)
        setUser(newUser)
        localStorage.setItem('user', JSON.stringify(newUser))
        localStorage.setItem('users', JSON.stringify(users))

        return {success: true}
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext