import { publish } from "gh-pages";
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
                    { id: 1, title: "LapTop", price: 100, img: `${PUBLIC}/images/products/laptop.jpg` },
                    { id: 2, title: "iPhones", price: 200, img: `${PUBLIC}/images/products/iphones.jpg` },
                    { id: 3, title: "Airpods", price: 300, img: `${PUBLIC}/images/products/airpods.jpg` },
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