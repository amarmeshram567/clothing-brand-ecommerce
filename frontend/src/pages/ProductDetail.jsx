import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast"


const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedImage, setSelectedImage] = useState(0);
    // const token = localStorage.getItem("token");
    // console.log(token)

    useEffect(() => {
        const loadProduct = async () => {
            if (!id) return;

            setLoading(true);
            try {
                const { data } = await api.get(`/api/products/${id}`);
                console.log(data)
                setProduct(data);

                if (data?.sizes?.length) {
                    setSelectedSize(data.sizes[0]);
                }
            } catch (err) {
                console.error("Error loading product", err);
                toast.error("Failed to load product");
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [id]);

    const handleAddToCart = () => {
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Please login to add to cart");
            navigate("/login");
            return;
        }

        if (!selectedSize) {
            toast.error("Please select a size");
            return;
        }

        addToCart(product, selectedSize, 1);
    };

    if (loading) {
        return <div className="p-10 text-center text-xl">Loading…</div>;
    }

    if (!product) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">Product not found</h2>
                <button
                    onClick={() => navigate("/products")}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md"
                >
                    Browse Products
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-6xl mx-auto px-4">

                {/* BACK BUTTON */}
                <button
                    className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                    {/* Left side: Thumbnails + Main Image */}
                    <div className="flex gap-4">
                        {/* Thumbnails Column */}
                        <div className="flex flex-col gap-2">
                            {product.images?.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`w-16 h-16 rounded-md overflow-hidden border-2 ${selectedImage === index
                                        ? "border-blue-600"
                                        : "border-transparent hover:border-gray-400"
                                        }`}
                                >
                                    <img
                                        src={image}
                                        alt={`${product.name}-${index}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Main Image */}
                        <div className="flex-1 aspect-square rounded-lg overflow-hidden bg-gray-100">
                            <img
                                src={product.images?.[selectedImage] || "https://via.placeholder.com/150"}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Right side: Product Info */}
                    <div className="space-y-6">
                        <div>
                            <span className="px-3 py-1 bg-gray-200 text-sm rounded">{product.category}</span>
                            <h1 className="text-3xl font-bold mt-2">{product.name}</h1>
                            <p className="text-xl font-semibold mt-2">${product.price}</p>
                        </div>

                        <p className="text-gray-600">{product.description}</p>

                        {/* SIZE SELECTOR */}
                        {product.sizes?.length > 0 && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Select Size</label>
                                <div className="flex flex-wrap gap-2">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-4 py-2 rounded-md border transition-colors ${selectedSize === size
                                                ? "border-gray-100 bg-black text-white"
                                                : "border-gray-300 hover:border-black"
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ADD TO CART */}
                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-black text-white py-3 rounded-lg hover:bg-black/80"
                        >
                            Add to Cart
                        </button>

                        {/* Additional Info */}
                        <div className="pt-6 border-t border-gray-300 space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Category</span>
                                <span>{product.category}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Availability</span>
                                <span>{product.stock ? "In Stock" : "Out of Stock"}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
}


export default ProductDetail