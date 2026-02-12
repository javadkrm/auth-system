import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Cart } from "../../types/cart"
import { loginUser, logout } from "./authSlice"
import { productsData } from "../../data/product"
import { Product } from "../../types/product"

interface CartState {
  items: Cart[]
  products: Product[]
}

const loadInitialCart = () => {
  const user = localStorage.getItem("currentUser");

  if (!user) return [];

  const parsedUser = JSON.parse(user);
  const savedCart = localStorage.getItem(`cart_${parsedUser.id}`);

  return savedCart ? JSON.parse(savedCart) : [];
};

const initialState: CartState = {
  items: loadInitialCart(),
  products: productsData
}

const getCurrentUser = () => {
  const user = localStorage.getItem("currentUser")
  return user ? JSON.parse(user) : null
}

const saveCart = (userId: number, items: Cart[]) => {
  localStorage.setItem(`cart_${userId}`, JSON.stringify(items))
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Cart>) => {
      const user = getCurrentUser()

      if (!user) {
        alert("Please login first")
        return
      }

      const existingItem = state.items.find(
        item => item.id === action.payload.id
      )

      if (existingItem) {
        existingItem.count += 1
      } else {
        state.items.push({ ...action.payload, count: 1 })
      }

      saveCart(user.id, state.items)
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const user = getCurrentUser()
      if (!user) return

      state.items = state.items.filter(
        item => item.id !== action.payload
      )

      saveCart(user.id, state.items)
    },

    increaseQty: (state, action: PayloadAction<number>) => {
      const user = getCurrentUser()
      if (!user) return

      const item = state.items.find(i => i.id === action.payload)
      if (item) item.count++

      saveCart(user.id, state.items)
    },

    decreaseQty: (state, action: PayloadAction<number>) => {
      const user = getCurrentUser()
      if (!user) return

      const item = state.items.find(i => i.id === action.payload)

      if (item) {
        if (item.count > 1) {
          item.count--
        } else {
          state.items = state.items.filter(i => i.id !== item.id)
        }
      }

      saveCart(user.id, state.items)
    },

    clearCart: (state) => {
      const user = getCurrentUser()
      if (!user) return

      state.items = []
      saveCart(user.id, [])
    }
  },

  extraReducers: builder => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const userId = action.payload.id

      const savedCart = localStorage.getItem(`cart_${userId}`)

      state.items = savedCart ? JSON.parse(savedCart) : []
    })
  }
})

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart
} = cartSlice.actions

export default cartSlice.reducer








// یسوال
// توی نسخه context  همین پروژه که توی همین چت باهم طراحی کردیم
// اگه روی دکمه add to cart میزدیم اول چک میکرد ببینه لاگینیم یا نه
// اگه لاگین نبودیم آلرت میداد
// همچنین سبد خرید یا همان Carts هر کاربر یونیک در localStorage ذخیره میشد 