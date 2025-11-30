import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import { Filters } from "../components/Filters";
import { ProductCard } from "../components/ProductCard";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) pages.push(1, 2, 3, 4, "...", totalPages);
            else if (currentPage >= totalPages - 2)
                pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            else pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
        }

        return pages;
    };

    return (
        <div className="flex justify-center space-x-2 mt-8">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                &lt;
            </button>

            {getPageNumbers().map((page, index) =>
                page === "..." ? (
                    <span key={`ellipsis-${index}`} className="px-2 text-gray-400">...</span>
                ) : (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-3 py-1 border rounded ${currentPage === page ? "bg-gray-800 text-white" : ""}`}
                    >
                        {page}
                    </button>
                )
            )}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                &gt;
            </button>
        </div>
    );
};

const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [categories] = useState(["All", "T-Shirts", "Jeans", "Dresses", "Jackets"]); // example categories

    const [filters, setFilters] = useState({
        category: searchParams.get("category") || "All",
        size: searchParams.get("size") || "",
        minPrice: searchParams.get("minPrice") || "",
        maxPrice: searchParams.get("maxPrice") || "",
        search: searchParams.get("search") || "",
        limit: 50,
    });

    const loadProducts = async () => {
        setLoading(true);
        try {
            const params = {
                page: currentPage,
                limit: filters.limit,
                ...(filters.category && filters.category !== "All" && { category: filters.category }),
                ...(filters.size && { size: filters.size }),
                ...(filters.minPrice && { minPrice: Number(filters.minPrice) }),
                ...(filters.maxPrice && { maxPrice: Number(filters.maxPrice) }),
                ...(filters.search && { search: filters.search }),
            };

            const { data } = await api.get("/api/products", { params });
            console.log(data.products);
            setProducts(data.products);
            setTotalPages(data.totalPages || 1);
        } catch (error) {
            console.error("Failed to load products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, [filters, currentPage]);

    const handleFilterChange = (newFilters) => {
        const updateFilters = { ...filters, ...newFilters };
        setFilters(updateFilters);
        setCurrentPage(1);

        const params = new URLSearchParams();
        Object.entries(updateFilters).forEach(([key, value]) => {
            if (value && value !== "All") params.set(key, value);
        });
        setSearchParams(params);
    };

    return (
        <div className="min-h-screen py-8">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">All Products</h1>
                    <p className="text-gray-500">Explore our complete collection of premium fashion</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <aside className="lg:col-span-1">
                        <Filters categories={categories} filters={filters} onFilterChange={handleFilterChange} />
                    </aside>

                    <div className="lg:col-span-3">
                        {loading ? (
                            <p>Loading products...</p>
                        ) : products.length === 0 ? (
                            <div className="text-center py-20">
                                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                                <p className="text-gray-500">Try adjusting your filters or search terms</p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {products.map((product) => (
                                        <ProductCard key={product._id} product={product} />
                                    ))}
                                </div>

                                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
