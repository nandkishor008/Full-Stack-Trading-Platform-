const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const { UserModel } = require("./model/UserModel");
const apiRoutes = require("./routes/tradeRoutes");

const app = express();

// Trust proxy for AWS EB
app.set("trust proxy", 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Environment flag
const isProduction = process.env.NODE_ENV === "production";

// CORS (allows HTTP for demo)
app.use(
  cors({
    origin: ["http://localhost:3000"], // Local dev OR Amplify HTTP later
    credentials: true,
  })
);

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Zerodha Clone Backend API is running! 🚀",
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    endpoints: {
      login: "/login",
      signup: "/signup",
      me: "/me",
      api: "/api/*",
    },
  });
});

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// API routes
app.use("/api", apiRoutes);

const createToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });

// Temporary HTTP-only cookie settings
const getCookieOptions = () => ({
  httpOnly: true,
  sameSite: "lax", // HTTP-compatible
  secure: false, // HTTP-compatible
  maxAge: 24 * 60 * 60 * 1000,
});

// Signup
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).send("All fields are required.");
    if (await UserModel.findOne({ email }))
      return res.status(400).send("Email is already registered.");

    const user = await UserModel.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });
    const token = createToken(user._id);
    res.cookie("token", token, getCookieOptions());
    return res.redirect("http://main.d26ai6ejcpwzbx.amplifyapp.com/summary");
  } catch {
    return res.status(500).send("Server error during signup.");
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).send("Invalid credentials.");
    const token = createToken(user._id);
    res.cookie("token", token, getCookieOptions());
    return res.redirect("http://main.d26ai6ejcpwzbx.amplifyapp.com/summary");
  } catch {
    return res.status(500).send("Server error during login.");
  }
});

// Get current user
app.get("/me", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
});

// Start server on port 8080 for EB
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
