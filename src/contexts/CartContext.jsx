import { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const CartContext = createContext()

export function CartProvider({ children }) {

    const { user } = useContext(AuthContext)
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        if (!user) {
            setCartItems([])
            return
        }

        try {
            const savedCarts = localStorage.getItem(`cart_${user.id}`)
            const parsed = savedCarts ? JSON.parse(savedCarts) : []
            setCartItems(Array.isArray(parsed) ? parsed : [])
        } catch (err) {
            console.error('Invalid cart data in localStorage', err)
            setCartItems([])
            localStorage.removeItem(`cart_${user.id}`)
        }
    }, [user])


    useEffect(() => {
        if (user) {
            localStorage.setItem(`cart_${user.id}`, JSON.stringify(cartItems));
        }
    }, [cartItems, user]);

    const addToCart = (product) => {
        if (!user) {
            alert('ابتدا وارد حساب کاربری خود شوید')
            return false
        }

        const isExist = cartItems.find(item => item.id === product.id)

        if (isExist) {
            setCartItems(prev =>
                prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            )
        } else {
            setCartItems(prev => [...prev, { ...product, quantity: 1 }])
        }

        return true
    }

    const removeItem = (productId) => {
        setCartItems((prev) => prev.filter((item) => item.id !== productId));

    }


    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeItem }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext