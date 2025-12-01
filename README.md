👕 Clothing E-commerce Project

A complete full-stack Clothing E-Commerce Web Application, built using React (Vite) on the frontend and Node.js + Express on the backend.
This project provides a smooth shopping experience with authentication, product browsing, filtering, cart management, and order handling.

✨ Features
🛍️ Product & Catalog

Browse all products with images, sizes, pricing

Filter by category, size, and price range

Search products easily

View detailed product information

🛒 Cart Management

Add items with selected size

Update quantity or remove items

Cart persists even after page reload

Cart stored in localStorage for guests and database for logged-in users

🔐 User Authentication

Register, Login, Logout

JWT-based authentication with cookies

Protected routes (cart, orders)

🧾 Orders

Place an order from cart

Order saved in database

View past order history

📱 Fully Responsive UI

Clean modern layout using Tailwind CSS

Mobile-friendly shopping experience

🧰 Tech Stack
Frontend

React + Vite

Tailwind CSS

react-router-dom

axios

react-hot-toast

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT + Cookies

Bcrypt for password hashing

CORS enabled

dotenv for env configuration

📂 Project Structure
clothing-ecommerce-project/
│
├── frontend/       # React + Vite frontend
└── backend/        # Node.js + Express backend
└── README.md

🔧 Prerequisites

Make sure these are installed:

Node.js (v18 or above)

npm or yarn

MongoDB (Local or cloud MongoDB Atlas)

🚀 Setup Instructions
1️⃣ Backend Setup
cd backend
npm install
npm run dev     // or nodemon server.js


Your backend will run on:

http://localhost:5000

2️⃣ Frontend Setup
cd frontend
npm install
npm run dev

http://localhost:5173
