import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const { data } = await api.get("/api/orders/my-orders");
                setOrders(data);

                console.log(data)
            } catch (err) {
                console.error("Failed to fetch orders", err);
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg">Loading your orders...</p>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
                <h2 className="text-2xl font-semibold mb-2">No Orders Found</h2>
                <p className="text-gray-500 mb-6">
                    You haven't placed any orders yet.
                </p>
                <Link to="/products">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Shop Now
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-10 bg-gray-50">
            <div className="container mx-auto px-4 max-w-5xl">
                <h1 className="text-3xl font-bold mb-6">My Orders</h1>

                <div className="space-y-6">
                    {orders.map(order => (
                        <div
                            key={order._id}
                            className="bg-white shadow-md rounded-lg p-4 sm:p-6 border border-gray-200"
                        >
                            {/* Header */}
                            <div className="flex flex-col sm:flex-row justify-between mb-4 gap-2 sm:gap-0">
                                <div>
                                    <p className="font-semibold text-sm sm:text-base">Order #{order._id}</p>
                                    <p className="text-gray-500 text-xs sm:text-sm">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>

                                <span className="px-3 py-1 rounded-full text-xs sm:text-sm font-semibold text-center capitalize bg-blue-100 text-blue-700 self-start sm:self-center">
                                    {order.status}
                                </span>
                            </div>

                            {/* Items preview */}
                            <div className="space-y-4">
                                {order.items.slice(0, 2).map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start"
                                    >
                                        <div className="flex-1">
                                            <h3 className="font-medium text-sm sm:text-base">{item?.name}</h3>
                                            <p className="text-xs sm:text-sm text-gray-500">
                                                Qty: {item.qty} | Size: {item.size}
                                            </p>
                                            <p className="font-semibold text-sm sm:text-base">
                                                ${(item.price * item.qty).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                                {/* If more than 2 items */}
                                {order.items.length > 2 && (
                                    <p className="text-xs sm:text-sm text-gray-500">
                                        + {order.items.length - 2} more items
                                    </p>
                                )}
                            </div>

                            <hr className="my-4" />

                            {/* Footer */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                                <p className="font-bold text-base sm:text-lg">
                                    Total: ${order.totalPrice.toFixed(2)}
                                </p>

                                <Link to={`/order/${order._id}`}>
                                    <button className="px-4 py-2 w-full sm:w-auto text-white bg-black rounded hover:bg-gray-800">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

};

export default MyOrders;
