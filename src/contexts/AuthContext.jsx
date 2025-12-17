import { createContext, useEffect, useState } from "react";

const AuthContext = createContext(null)

export function AuthProvider ({children}) {

    const [user, setUser] = useState('')

    useEffect(() => {
        const savedUser = localStorage.getItem('user')

        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
    }, [])

    return(
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext