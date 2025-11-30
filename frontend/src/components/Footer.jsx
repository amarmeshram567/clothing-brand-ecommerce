import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-muted mt-20">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">LUXE</h3>
                        <p className="text-sm text-muted-foreground">
                            Premium fashion for the modern wardrobe. Quality meets style.
                        </p>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="font-semibold mb-4">Shop</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link to="/products" className="hover:text-accent transition-colors">
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/products?category=T-Shirts" className="hover:text-accent transition-colors">
                                    T-Shirts
                                </Link>
                            </li>
                            <li>
                                <Link to="/products?category=Jeans" className="hover:text-accent transition-colors">
                                    Jeans
                                </Link>
                            </li>
                            <li>
                                <Link to="/products?category=Dresses" className="hover:text-accent transition-colors">
                                    Dresses
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="font-semibold mb-4">Customer Service</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <a href="#" className="hover:text-accent transition-colors">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-accent transition-colors">
                                    Shipping Info
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-accent transition-colors">
                                    Returns
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-accent transition-colors">
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className="font-semibold mb-4">Connect</h4>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="h-10 w-10 rounded-full bg-background flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                            >
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="h-10 w-10 rounded-full bg-background flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                            >
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="h-10 w-10 rounded-full bg-background flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} LUXE. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
