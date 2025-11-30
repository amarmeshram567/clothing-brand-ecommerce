import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import api from "../services/api";
import { toast } from "react-hot-toast"

const Checkout = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { items, cartTotal, clearCart } = useCart();
    const [loading, setLoading] = useState(false);

    // Modal state
    const [showModal, setShowModal] = useState(false);

    // Address form state
    const [address, setAddress] = useState({
        full_name: "",
        street: "",
        city: "",
        state: "",
        zip_code: "",
        phone: "",
    });

    // Temp modal state (form inputs inside modal before save)
    const [tempAddress, setTempAddress] = useState({ ...address });

    useEffect(() => {
        if (!isAuthenticated) {
            toast.error("Please login to continue with checkout");
            navigate("/login");
        }

        if (items.length === 0) {
            navigate("/cart");
        }
    }, [isAuthenticated, items, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTempAddress({ ...tempAddress, [name]: value });
    };

    const handleSaveAddress = () => {
        // Validation
        for (let key in tempAddress) {
            if (!tempAddress[key]) {
                toast.error(`Please enter ${key}`);
                return;
            }
        }
        setAddress({ ...tempAddress });
        setShowModal(false);
        toast.success("Address saved successfully!");
    };

    const handlePlaceOrder = async () => {
        // Ensure address is saved
        for (let key in address) {
            if (!address[key]) {
                toast.error("Please enter shipping address");
                setShowModal(true);
                return;
            }
        }

        setLoading(true);

        try {
            const orderItems = items.map((item) => ({
                product: item.product.id,
                name: item.product.name,
                size: item.size,
                qty: item.quantity,
                price: item.product.price,
                image: item.product.images[0] || null,
            }));

            const totalPrice = items.reduce(
                (total, item) => total + item.product.price * item.quantity,
                0
            );

            const { data: order } = await api.post("/api/orders", {
                items: orderItems,
                shippingAddress: address,
                totalPrice,
                status: "confirmed",
            });

            console.log("Payload", {
                items: orderItems,
                shippingAddress: address,
                totalPrice
            });


            clearCart();
            toast.success(`Order placed successfully! Your order #${order._id} has been confirmed`);

            setTimeout(() => {
                navigate(`/order/${order._id}`);
            }, 1000)

        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to place order");
        } finally {
            setLoading(false);
        }
    };




    const tax = cartTotal * 0.1;
    const total = cartTotal + tax;

    return (
        <div className="min-h-screen py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Order Items */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h2 className="text-xl font-semibold mb-4">Order Items</h2>
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div
                                        key={`${item.product.id}-${item.size}`}
                                        className="flex gap-4 pb-4 border-b border-gray-200 last:border-0"
                                    >
                                        <div className="w-20 h-24 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                                            <img
                                                src={item.product.images[0]}
                                                alt={item.product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-sm mb-1">{item.product.name}</h3>
                                            <p className="text-xs text-gray-500 mb-2">
                                                Size: {item.size} | Qty: {item.quantity}
                                            </p>
                                            <p className="font-semibold">
                                                ${(item.product.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-muted p-4 rounded-md">
                            {address.full_name ? (
                                <div>
                                    <p>{address.full_name}</p>
                                    <p>{address.street}, {address.city}, {address.state} - {address.zip_code}</p>
                                    <p>Phone: {address.phone}</p>
                                </div>
                            ) : (
                                <p>Enter your address for details</p>
                            )}
                            <button
                                onClick={() => setShowModal(true)}
                                className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-black/80"
                            >
                                {address.full_name ? "Edit Address" : "Add Address"}
                            </button>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
                                <h2 className="text-xl font-bold">Order Summary</h2>
                                <div className="space-y-2 text-sm text-gray-500">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>${cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span className="text-green-600 font-medium">Free</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Tax</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                </div>

                                <hr className="border-gray-200 my-4" />

                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>

                                <button
                                    onClick={handlePlaceOrder}
                                    disabled={loading}
                                    className={`w-full py-3 rounded-md text-white ${loading ? "bg-gray-400" : "bg-black hover:bg-gray-800"
                                        }`}
                                >
                                    {loading ? "Placing Order..." : "Place Order"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-lg">
                        <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <input
                                type="text"
                                name="full_name"
                                placeholder="Full Name"
                                value={tempAddress.full_name}
                                onChange={handleInputChange}
                                className="border p-2 rounded w-full"
                            />
                            <input
                                type="text"
                                name="street"
                                placeholder="Street Address"
                                value={tempAddress.street}
                                onChange={handleInputChange}
                                className="border p-2 rounded w-full"
                            />
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={tempAddress.city}
                                onChange={handleInputChange}
                                className="border p-2 rounded w-full"
                            />
                            <input
                                type="text"
                                name="state"
                                placeholder="State"
                                value={tempAddress.state}
                                onChange={handleInputChange}
                                className="border p-2 rounded w-full"
                            />
                            <input
                                type="text"
                                name="zip_code"
                                placeholder="ZIP / Postal Code"
                                value={tempAddress.zip_code}
                                onChange={handleInputChange}
                                className="border p-2 rounded w-full"
                            />
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                value={tempAddress.phone}
                                onChange={handleInputChange}
                                className="border p-2 rounded w-full"
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-white border border-gray-200 rounded hover:bg-black/20 hover:text-black duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveAddress}
                                className="px-4 py-2 bg-black/80 text-white rounded hover:bg-accent duration-300"
                            >
                                Save Address
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checkout;

