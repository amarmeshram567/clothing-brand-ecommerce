import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
    const { isAuthenticated, user, logout: authLogout } = useAuth();
    const { cartCount } = useCart();
    const location = useLocation();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const dropdownRef = useRef(null);

    const logout = () => {
        authLogout();
        toast.success("Logged out successfully!");
        setDropdownOpen(false);
    };

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { path: "/", label: "Home" },
        { path: "/products", label: "Products" },
    ];

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
            <div className="container mx-auto px-4 flex items-center justify-between h-16">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-primary">
                    LUXE
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`text-sm font-medium transition-colors ${isActive(link.path) ? "text-accent" : "text-muted-foreground"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Right Section */}
                <div className="flex items-center space-x-4">
                    {/* Cart */}
                    <Link to="/cart" className="relative">
                        <ShoppingCart className="h-5 w-5" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-semibold">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* User Dropdown */}
                    {isAuthenticated ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center space-x-1 p-2 rounded hover:bg-muted-foreground/10"
                            >
                                <User className="h-5 w-5" />
                                <span className="hidden text-sm md:inline">{user.name}</span>
                                <ChevronDown className="h-4 w-4" />
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-2 z-50">
                                    <div className="px-4 py-2 text-sm text-gray-600 border-b">
                                        <p className="font-medium">{user.name}</p>
                                        <p className="truncate text-xs">{user.email}</p>
                                    </div>
                                    <Link to="/my-orders">
                                        <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                                            My Orders
                                        </button>
                                    </Link>
                                    <button
                                        onClick={logout}
                                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="hidden md:flex items-center space-x-2">
                            <Link to="/login" className="text-sm font-medium hover:text-accent">
                                Sign In
                            </Link>
                            {/* <Link
                                to="/register"
                                className="text-sm font-medium text-primary hover:text-accent"
                            >
                                Sign Up
                            </Link> */}
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-1 rounded hover:bg-muted-foreground/10"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden py-4 border-t border-border">
                    <div className="flex flex-col space-y-4 px-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`text-sm font-medium ${isActive(link.path) ? "text-accent" : "text-muted-foreground"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {isAuthenticated ? (
                            <div className="flex flex-col space-y-2">
                                <div className="px-2 py-1 border-b">
                                    <p className="font-medium">{user.name}</p>
                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                </div>
                                <button
                                    onClick={() => {
                                        logout();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="px-2 py-1 text-left text-sm hover:bg-gray-100 rounded"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-sm font-medium hover:text-accent"
                                >
                                    Sign In
                                </Link>
                                {/* <Link
                                    to="/register"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-sm font-medium text-primary hover:text-accent"
                                >
                                    Sign Up
                                </Link> */}
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
