require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Product = require("./models/Product");



const products = [
    // T-Shirts (Men)
    { name: "Classic White Tee", description: "Cotton T-shirt", price: 150, images: ["https://picsum.photos/seed/p1/400", "https://picsum.photos/seed/p1a/400", "https://picsum.photos/seed/p1b/400"], category: "T-Shirts", sizes: ["S", "M", "L", "XL"], stock: 50 },
    { name: "Graphic Tee", description: "Printed T-shirt", price: 180, images: ["https://picsum.photos/seed/p2/400", "https://picsum.photos/seed/p2a/400", "https://picsum.photos/seed/p2b/400"], category: "T-Shirts", sizes: ["S", "M", "L"], stock: 40 },
    { name: "V-Neck Tee", description: "Soft cotton V-neck", price: 165, images: ["https://picsum.photos/seed/p3/400", "https://picsum.photos/seed/p3a/400", "https://picsum.photos/seed/p3b/400"], category: "T-Shirts", sizes: ["M", "L", "XL"], stock: 35 },
    { name: "Striped Tee", description: "Striped casual T-shirt", price: 150, images: ["https://picsum.photos/seed/p4/400", "https://picsum.photos/seed/p4a/400", "https://picsum.photos/seed/p4b/400"], category: "T-Shirts", sizes: ["S", "M", "L", "XL"], stock: 45 },
    { name: "Pocket Tee", description: "T-shirt with pocket", price: 180, images: ["https://picsum.photos/seed/p5/400", "https://picsum.photos/seed/p5a/400", "https://picsum.photos/seed/p5b/400"], category: "T-Shirts", sizes: ["S", "M", "L"], stock: 38 },
    { name: "Long Sleeve Tee", description: "Comfortable long sleeve", price: 210, images: ["https://picsum.photos/seed/p6/400", "https://picsum.photos/seed/p6a/400", "https://picsum.photos/seed/p6b/400"], category: "T-Shirts", sizes: ["M", "L", "XL"], stock: 42 },
    { name: "Henley Tee", description: "Buttoned Henley shirt", price: 195, images: ["https://picsum.photos/seed/p7/400", "https://picsum.photos/seed/p7a/400", "https://picsum.photos/seed/p7b/400"], category: "T-Shirts", sizes: ["S", "M", "L"], stock: 37 },

    // Jeans (Men)
    { name: "Blue Denim Jeans", description: "Slim fit jeans", price: 250, images: ["https://picsum.photos/seed/p8/400", "https://picsum.photos/seed/p8a/400", "https://picsum.photos/seed/p8b/400"], category: "Jeans", sizes: ["S", "M", "L", "XL"], stock: 40 },
    { name: "Black Denim", description: "Classic black jeans", price: 270, images: ["https://picsum.photos/seed/p9/400", "https://picsum.photos/seed/p9a/400", "https://picsum.photos/seed/p9b/400"], category: "Jeans", sizes: ["M", "L", "XL"], stock: 30 },
    { name: "Ripped Jeans", description: "Trendy ripped jeans", price: 285, images: ["https://picsum.photos/seed/p10/400", "https://picsum.photos/seed/p10a/400", "https://picsum.photos/seed/p10b/400"], category: "Jeans", sizes: ["S", "M", "L"], stock: 25 },
    { name: "Denim Shorts", description: "Summer denim shorts", price: 160, images: ["https://picsum.photos/seed/p11/400", "https://picsum.photos/seed/p11a/400", "https://picsum.photos/seed/p11b/400"], category: "Jeans", sizes: ["S", "M", "L"], stock: 50 },
    { name: "Relaxed Fit Jeans", description: "Comfortable fit jeans", price: 250, images: ["https://picsum.photos/seed/p12/400", "https://picsum.photos/seed/p12a/400", "https://picsum.photos/seed/p12b/400"], category: "Jeans", sizes: ["S", "M", "L", "XL"], stock: 45 },

    // Dresses (Women)
    { name: "Red Summer Dress", description: "Lightweight dress", price: 180, images: ["https://picsum.photos/seed/p13/400", "https://picsum.photos/seed/p13a/400", "https://picsum.photos/seed/p13b/400"], category: "Dresses", sizes: ["S", "M", "L"], stock: 20 },
    { name: "Floral Dress", description: "Printed floral dress", price: 190, images: ["https://picsum.photos/seed/p14/400", "https://picsum.photos/seed/p14a/400", "https://picsum.photos/seed/p14b/400"], category: "Dresses", sizes: ["S", "M", "L"], stock: 25 },
    { name: "Evening Gown", description: "Elegant gown", price: 300, images: ["https://picsum.photos/seed/p15/400", "https://picsum.photos/seed/p15a/400", "https://picsum.photos/seed/p15b/400"], category: "Dresses", sizes: ["M", "L"], stock: 15 },
    { name: "Casual Summer Dress", description: "Comfortable casual dress", price: 170, images: ["https://picsum.photos/seed/p16/400", "https://picsum.photos/seed/p16a/400", "https://picsum.photos/seed/p16b/400"], category: "Dresses", sizes: ["S", "M", "L"], stock: 30 },
    { name: "Maxi Dress", description: "Long flowing dress", price: 200, images: ["https://picsum.photos/seed/p17/400", "https://picsum.photos/seed/p17a/400", "https://picsum.photos/seed/p17b/400"], category: "Dresses", sizes: ["S", "M", "L"], stock: 22 },

    // Jackets (Unisex)
    { name: "Black Leather Jacket", description: "Faux leather jacket", price: 300, images: ["https://picsum.photos/seed/p18/400", "https://picsum.photos/seed/p18a/400", "https://picsum.photos/seed/p18b/400"], category: "Jackets", sizes: ["M", "L", "XL"], stock: 10 },
    { name: "Denim Jacket", description: "Classic denim jacket", price: 200, images: ["https://picsum.photos/seed/p19/400", "https://picsum.photos/seed/p19a/400", "https://picsum.photos/seed/p19b/400"], category: "Jackets", sizes: ["S", "M", "L", "XL"], stock: 18 },
    { name: "Bomber Jacket", description: "Trendy bomber jacket", price: 220, images: ["https://picsum.photos/seed/p20/400", "https://picsum.photos/seed/p20a/400", "https://picsum.photos/seed/p20b/400"], category: "Jackets", sizes: ["M", "L", "XL"], stock: 12 },
    { name: "Windbreaker", description: "Lightweight windbreaker", price: 150, images: ["https://picsum.photos/seed/p21/400", "https://picsum.photos/seed/p21a/400", "https://picsum.photos/seed/p21b/400"], category: "Jackets", sizes: ["S", "M", "L"], stock: 20 },
    { name: "Hooded Jacket", description: "Warm hooded jacket", price: 180, images: ["https://picsum.photos/seed/p22/400", "https://picsum.photos/seed/p22a/400", "https://picsum.photos/seed/p22b/400"], category: "Jackets", sizes: ["M", "L", "XL"], stock: 15 },
    { name: "Trench Coat", description: "Water-resistant coat", price: 250, images: ["https://picsum.photos/seed/p23/400", "https://picsum.photos/seed/p23a/400", "https://picsum.photos/seed/p23b/400"], category: "Jackets", sizes: ["M", "L"], stock: 12 }
];


const seeder = async () => {
    try {
        await connectDB();
        await Product.deleteMany({});
        await Product.insertMany(products);
        console.log("Products seeded");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

seeder();