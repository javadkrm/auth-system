
import { createContext, useState, useEffect } from "react";

const ProuductsContext = createContext(null)

const PUBLIC = process.env.PUBLIC_URL || '';

console.log(PUBLIC);


export function ProductsProvider({ children }) {

    const [products, setProducts] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);

                // fake data
                const fakeProducts = [
                    { id: 1, title: "HP Zbook G6", price: 100, img: `${PUBLIC}/images/products/laptop.jpg` },
                    { id: 2, title: "iPhone 17 pro", price: 200, img: `${PUBLIC}/images/products/iphones.jpg` },
                    { id: 3, title: "Airpod max ", price: 300, img: `${PUBLIC}/images/products/airpods.jpg` },
                    { id: 4, title: "latop Mac", price: 300, img: `${PUBLIC}/images/products/laptop.jpg` },
                    { id: 5, title: "iPhone 16", price: 300, img: `${PUBLIC}/images/products/iphones.jpg` },
                    { id: 6, title: "Airpods mini", price: 300, img: `${PUBLIC}/images/products/airpods.jpg` },
                    { id: 7, title: "laptop Lenovo", price: 300, img: `${PUBLIC}/images/products/laptop.jpg` },
                    { id: 8, title: "iPhone 14", price: 120, img: `${PUBLIC}/images/products/iphones.jpg` },
                    { id: 9, title: "airpod alpha", price: 300, img: `${PUBLIC}/images/products/airpods.jpg` },
                    { id: 10, title: "laptop mini", price: 300, img: `${PUBLIC}/images/products/laptop.jpg` },
                    { id: 11, title: "iPhone 13", price: 300, img: `${PUBLIC}/images/products/iphones.jpg` },
                    { id: 12, title: "airpod apple", price: 300, img: `${PUBLIC}/images/products/airpods.jpg` },
                ];

                // API
                await new Promise((res) => setTimeout(res, 500));

                setProducts(fakeProducts);
                setError(null);
            } catch (err) {
                setError("مشکل در بارگذاری محصولات");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);
    return (
        <ProuductsContext.Provider value={{ products, error, loading }}>
            {children}
        </ProuductsContext.Provider>
    )
}

export default ProuductsContext