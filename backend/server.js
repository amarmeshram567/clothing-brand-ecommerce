require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const connectDB = require("./config/db");
const productRouter = require("./routes/productRoutes");
const cartRouter = require("./routes/cartRoutes");
const orderRouter = require("./routes/orderRoutes");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cookieParser());


app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://clothing-brand-ecommerce-uip1.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.options("*", cors());


connectDB();

app.get("/", (req, res) => {
    res.send("API is running...");
});

// routes
app.use("/api/auth", authRouter)
app.use("/api/products", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/orders", orderRouter)


app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} on port http://localhost:${PORT}`);
});


