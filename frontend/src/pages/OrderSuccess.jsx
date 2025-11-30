import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import api from "../services/api";

const OrderSuccess = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadOrder = async () => {
            if (!id) return;

            try {
                const { data } = await api.get(`/api/orders/${id}`);
                setOrder(data);
            } catch (error) {
                console.error("Failed to load order:", error);
            } finally {
                setLoading(false);
            }
        };

        loadOrder();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen py-12">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="text-center space-y-4 mb-8">
                        <div className="h-16 w-16 rounded-full mx-auto bg-gray-200 animate-pulse"></div>
                        <div className="h-8 w-64 mx-auto bg-gray-200 animate-pulse"></div>
                        <div className="h-4 w-96 mx-auto bg-gray-200 animate-pulse"></div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                        <div className="h-6 w-32 bg-gray-200 animate-pulse mb-4"></div>
                        <div className="space-y-4">
                            <div className="h-24 w-full bg-gray-200 animate-pulse"></div>
                            <div className="h-24 w-full bg-gray-200 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen flex items-center justify-center py-20">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold">Order not found</h2>
                    <p className="text-gray-500">
                        We couldn't find the order you're looking for
                    </p>
                    <Link to="/products">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                            Continue Shopping
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    console.log("order items", order.items)

    return (
        <div className="min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-3xl">
                {/* Success Message */}
                <div className="text-center mb-8 space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mx-auto">
                        <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
                        <p className="text-gray-500">
                            Thank you for your purchase. Your order has been successfully placed.
                        </p>
                    </div>
                </div>

                {/* Order Details */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-xl font-semibold mb-1">Order Details</h2>
                            <p className="text-sm text-gray-500">Order #{order._id}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500 mb-1">Order Date</p>
                            <p className="font-medium">
                                {new Date(order.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>
                        </div>
                    </div>

                    <hr className="my-6" />

                    {/* Order Items */}
                    <div className="space-y-4 mb-6">
                        <h3 className="font-semibold">Orders Items</h3>
                        {order.items.map((item) => (
                            <div key={item._id} className="flex gap-4">
                                <div className="flex-1">
                                    <h4 className="font-medium text-sm mb-1">{item.name}</h4>
                                    <p className="text-xs text-gray-500 mb-2">
                                        Size: {item.size} | Qty: {item.qty}
                                    </p>
                                    <p className="font-semibold">
                                        ${(item.price * item.qty).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <hr className="my-6" />

                    {/* Order Summary */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Subtotal</span>
                            <span className="font-medium">${order.totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Shipping</span>
                            <span className="font-medium text-green-600">Free</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Tax</span>
                            <span className="font-medium">${(order.totalPrice * 0.1).toFixed(2)}</span>
                        </div>
                        <hr className="my-3" />
                        <div className="flex justify-between">
                            <span className="font-semibold">Total</span>
                            <span className="font-bold text-xl">
                                ${(order.totalPrice + order.totalPrice * 0.1).toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/products">
                        <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-black/80 w-full sm:w-auto">
                            Continue Shopping
                        </button>
                    </Link>
                    <Link to="/">
                        <button className="px-4 py-2 border border-black text-black rounded-md hover:bg-black/10 w-full sm:w-auto">
                            Back to Home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}


export default OrderSuccess;