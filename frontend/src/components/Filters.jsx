import { useState, useEffect } from "react";
import { Search } from "lucide-react";

export const Filters = ({ categories = ["All"], onFilterChange, min = 150, max = 300 }) => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [price, setPrice] = useState(max);

    // Update parent whenever a filter changes
    useEffect(() => {
        onFilterChange({
            search,
            category,
            minPrice: min,
            maxPrice: price,
        });
    }, [search, category, price]);

    return (
        <div className="space-y-4">
            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2 pl-10"
                />
            </div>

            {/* Category */}
            <div>
                <label className="block mb-1 font-medium">Category</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2"
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            {/* Price */}
            <div>
                <label className="block mb-1 font-medium">
                    Price: ${min} - ${price}
                </label>
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full accent-black"
                />
            </div>
        </div>
    );
};
