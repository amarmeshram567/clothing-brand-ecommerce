import { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

export const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
    const [quantity, setQuantity] = useState(item.quantity);

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1 && newQuantity <= 99) {
            setQuantity(newQuantity);
            onUpdateQuantity(newQuantity); // backend call
        }
    };

    console.log(onRemove);

    return (
        <div className="flex gap-4 py-4 border-b border-gray-300">
            <div className="w-24 h-32 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                <img
                    src={item?.product?.images[0] || "https://via.placeholder.com/150"}
                    alt={item?.product?.name}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="font-medium text-sm mb-1">{item?.product?.name}</h3>
                    <p className="text-xs text-gray-500 mb-2">Size: {item?.size}</p>
                    <p className="font-semibold">${item?.product?.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                        <button
                            className="h-8 w-8 border rounded flex items-center justify-center"
                            onClick={() => handleQuantityChange(quantity - 1)}
                        >
                            <Minus className="h-3 w-3" />
                        </button>
                        <input
                            type="number"
                            min="1"
                            max="99"
                            value={quantity}
                            onChange={(e) =>
                                handleQuantityChange(parseInt(e.target.value) || 1)
                            }
                            className="w-16 h-8 text-center border rounded"
                        />
                        <button
                            className="h-8 w-8 border rounded flex items-center justify-center"
                            onClick={() => handleQuantityChange(quantity + 1)}
                        >
                            <Plus className="h-3 w-3" />
                        </button>
                    </div>

                    <button
                        className="h-8 w-8 text-red-600 hover:text-red-800 flex items-center justify-center"
                        onClick={onRemove} // backend call via parent
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};
