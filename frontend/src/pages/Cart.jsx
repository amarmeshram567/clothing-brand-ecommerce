import { Link } from "react-router-dom";
import { ShoppingBag, Trash2 } from "lucide-react";
import { CartItem } from "../components/CartItem";
import { useCart } from "../context/CartContext";

const Cart = () => {
    const { items, updateQuantity, removeFromCart, cartTotal } = useCart();
    console.log(items)

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center py-20">
                <div className="text-center space-y-4">
                    <ShoppingBag className="h-16 w-16 mx-auto text-gray-400" />
                    <h2 className="text-2xl font-bold">Your cart is empty</h2>
                    <p className="text-gray-500">Add some items to your cart to get started</p>
                    <Link to="/products">
                        <button className="mt-4 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800">
                            Shop Now
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8">
            <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
                {/* Cart Items */}
                <div className="flex-2 lg:flex-[2]">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-bold">Shopping Cart</h1>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4 space-y-4">
                        {items.map((item) => (
                            <CartItem
                                key={item._id}
                                item={item}
                                onUpdateQuantity={(quantity) => updateQuantity(item._id, quantity)}
                                onRemove={() => removeFromCart(item._id)}
                            />
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="flex-1 lg:flex-[1] border border-gray-200 rounded-lg p-6 sticky top-24 h-fit">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                    <div className="space-y-3 mb-4 text-sm">
                        <div className="flex justify-between text-gray-500">
                            <span>Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-500">
                            <span>Shipping</span>
                            <span className="text-green-600 font-medium">Free</span>
                        </div>
                        <div className="flex justify-between text-gray-500">
                            <span>Tax</span>
                            <span>${(cartTotal * 0.1).toFixed(2)}</span>
                        </div>
                    </div>

                    <hr className="border-gray-200 my-4" />

                    <div className="flex justify-between mb-6 font-bold text-lg">
                        <span>Total</span>
                        <span>${(cartTotal + cartTotal * 0.1).toFixed(2)}</span>
                    </div>

                    <Link to="/checkout">
                        <button className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 mb-2">
                            Proceed to Checkout
                        </button>
                    </Link>

                    <Link to="/products">
                        <button className="w-full py-2 border border-black rounded-md hover:bg-gray-100">
                            Continue Shopping
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Cart