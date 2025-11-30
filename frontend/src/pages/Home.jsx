import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { ProductCard } from "../components/ProductCard";
import { ArrowRight } from "lucide-react";

// const dummyProducts = [
//     { id: "1", name: "Classic Shirt", price: 49, image: "https://picsum.photos/seed/p12/400/400" },
//     { id: "2", name: "Denim Jeans", price: 79, image: "https://picsum.photos/seed/p13/400/400" },
//     { id: "3", name: "Leather Jacket", price: 199, image: "https://picsum.photos/seed/p14/400/400" },
//     { id: "4", name: "Sneakers", price: 89, image: "https://picsum.photos/seed/p14/400/400" },
//     { id: "5", name: "Hoodie", price: 69, image: "https://picsum.photos/seed/p14/400/400" },
//     { id: "6", name: "Summer Dress", price: 129, image: "https://picsum.photos/seed/p14/400/400" },
//     { id: "7", name: "Casual Pants", price: 59, image: "https://picsum.photos/seed/p14/400/400" },
//     { id: "8", name: "Blazer", price: 149, image: "https://picsum.photos/seed/p14/400/400" },
// ];

export default function Home() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get("/api/products");
                setProducts(data.products);
            } catch (error) {
                console.error("Failed to load products:", error);
            }
        };

        fetchProducts();
    }, []);

    const categories = {
        "T-Shirts": "Men",
        "Jeans": "Men",
        "Dresses": "Women",
        "Jackets": "Unisex"
    };


    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <section className="py-20 md:py-32 text-center bg-white text-accent-foreground">
                <h1 className="text-4xl md:text-6xl text-black font-bold mb-4">Elevate Your Style <br /> with Timeless Fashion</h1>
                <p className="text-sm md:text-xl mb-6 text-gray-500">
                    Discover curated collections that blend sophistication with comfort
                </p>

                <div className="mt-6 flex justify-center gap-4">
                    <Link to="/products">
                        <button
                            className="inline-flex items-center px-6 py-3 bg-black text-white rounded-md font-medium hover:bg-black/80 transition"
                        >
                            Shop Collection
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </button>
                    </Link>

                    <Link to="/products?category=Jackets">
                        <button className="px-6 py-3 border border-gray-200 bg-white text-black rounded-md font-medium hover:bg-accent hover:text-white duration-300 transition">
                            New Arrivals
                        </button>
                    </Link>
                </div>



            </section>

            {/* Featured Categories */}
            <section className="py-16 container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center">Featured Categories</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
                    {Object.keys(categories).map((category) => (
                        <Link
                            key={category}
                            to={`/products?category=${category}`}
                            className="relative aspect-square rounded-lg overflow-hidden group"
                        >
                            <img
                                src={`https://picsum.photos/seed/${category}/400/400`}
                                alt={category}
                                className="w-full h-full object-cover bg-black/20 group-hover:scale-110 duration-500 transition-transform"
                            />
                            <div className="absolute bottom-2 left-2 text-white font-semibold">{category}</div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16 container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold">Featured Products</h2>
                    <Link to="/products" className="text-accent font-medium hover:underline">
                        View All
                    </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                    {products.slice(0, 8).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-muted text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Fashion Community</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Sign up for exclusive access to new collections, special offers, and style inspiration
                </p>

                <button
                    className="inline-flex items-center px-6 py-3 bg-black text-white rounded-md font-medium hover:bg-black/80 transition"
                >
                    Sign Up
                    <ArrowRight className="ml-2 h-4 w-4" />
                </button>

            </section>
        </div>
    );
}
