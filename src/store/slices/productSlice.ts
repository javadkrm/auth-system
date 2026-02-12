import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/product";
import { Cart } from "../../types/cart";

interface ProductState {
    products: Product[]
    error: string
    loading: boolean
}

const PUBLIC = process.env.PUBLIC_URL || '';


const initialState: ProductState = {
    products: [
        { id: 1, title: "HP Zbook G6", price: 100, img: `${PUBLIC}/images/products/laptop.jpg`, count: 1 },
        { id: 2, title: "iPhone 17 pro", price: 200, img: `${PUBLIC}/images/products/iphones.jpg`, count: 1 },
        { id: 3, title: "Airpod max ", price: 300, img: `${PUBLIC}/images/products/airpods.jpg`, count: 1 },
        { id: 4, title: "latop Mac", price: 300, img: `${PUBLIC}/images/products/laptop.jpg`, count: 1 },
        { id: 5, title: "iPhone 16", price: 300, img: `${PUBLIC}/images/products/iphones.jpg`, count: 1 },
        { id: 6, title: "Airpods mini", price: 300, img: `${PUBLIC}/images/products/airpods.jpg`, count: 1 },
        { id: 7, title: "laptop Lenovo", price: 300, img: `${PUBLIC}/images/products/laptop.jpg`, count: 1 },
        { id: 8, title: "iPhone 14", price: 120, img: `${PUBLIC}/images/products/iphones.jpg`, count: 1 },
        { id: 9, title: "airpod alpha", price: 300, img: `${PUBLIC}/images/products/airpods.jpg`, count: 1 },
        { id: 10, title: "laptop mini", price: 300, img: `${PUBLIC}/images/products/laptop.jpg`, count: 1 },
        { id: 11, title: "iPhone 13", price: 300, img: `${PUBLIC}/images/products/iphones.jpg`, count: 1 },
        { id: 12, title: "airpod apple", price: 300, img: `${PUBLIC}/images/products/airpods.jpg`, count: 1 },
    ],
    error: '',
    loading: false
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        
    }
})

export default productSlice.reducer