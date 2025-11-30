import { Link } from "react-router-dom";
import { Star } from "lucide-react";

export const ProductCard = ({ product }) => {
    console.log(product);
    return (
        <Link to={`/product/${product._id}`}>
            <div className="group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 mb-3">
                    <img
                        src={product.images?.[0] || "https://via.placeholder.com/150"}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                    />

                    {!product.stock && (
                        <span className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2 py-1 rounded">
                            Out of Stock
                        </span>
                    )}
                </div>

                <div className="space-y-1">
                    <h3 className="font-medium text-sm line-clamp-1 group-hover:text-green-500 transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-xs text-gray-500">{product.category}</p>
                    <div className="flex items-center justify-between">
                        <p className="font-semibold text-base">${product.price.toFixed(2)}</p>
                        <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 fill-green-500 text-green-500" />
                            <Star className="h-3 w-3 fill-green-500 text-green-500" />
                            <Star className="h-3 w-3 fill-green-500 text-green-500" />
                            <Star className="h-3 w-3 fill-green-500 text-green-500" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};
