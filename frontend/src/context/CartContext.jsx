import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import api from "../services/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState([]);

    // Load cart from backend
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const { data } = await api.get("/api/cart");
                if (data.cart?.items) setItems(data.cart.items);
            } catch (error) {
                console.log(error.response?.data?.message || "Failed to load cart");
            }
        };
        fetchCart();
    }, []);

    const addToCart = async (product, size, quantity = 1) => {
        try {
            const { data } = await api.post("/api/cart/add", {
                productId: product._id,
                size,
                qty: quantity,
            });

            setItems(data.cart.items);
            toast.success(`${product.name} added to cart`);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add to cart");
        }
    };

    const updateQuantity = async (itemId, quantity) => {
        try {
            const { data } = await api.put("/api/cart/update", {
                itemId,
                qty: quantity,
            });

            setItems(data.cart.items);
            toast.success("Quantity updated");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update quantity");
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            const { data } = await api.delete(`/api/cart/remove/${itemId}`);

            setItems(data.cart.items);
            toast.success("Item removed");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to remove item");
        }
    };

    const clearCart = () => {
        setItems([]);
        toast.success("Cart cleared");
    };


    const cartTotal = items.reduce(
        (total, item) => total + (item?.product?.price || 0) * (item?.quantity || 0),
        0
    );


    const cartCount = items.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
