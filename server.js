const path = require("path");
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to Database
connectDB();

// Serve Static Files
app.use(express.static(path.join(__dirname, "public")));
app.use("/view", express.static(path.join(__dirname, "view")));
 

// Authentication Routes
app.use("/api/auth", authRoutes);

// Serve `login.html` for `/`
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

// ✅ Serve Dashboard Route
app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});
app.get("/view/index", (req, res) => {
    res.sendFile(path.join(__dirname, "view", "index.html")); // Ensure this path is correct
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
