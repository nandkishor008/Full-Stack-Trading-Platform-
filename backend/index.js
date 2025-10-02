const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // Updated from bcryptjs
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const { UserModel } = require("./model/UserModel");
const apiRoutes = require("./routes/tradeRoutes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Enhanced CORS Configuration
app.use(
  cors({
    origin: [
      "https://main.dphxll3jwggtr.amplifyapp.com",
      "https://main.d26ai6ejcpwzbx.amplifyapp.com",
    ],
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

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

app.use("/api", apiRoutes);

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send("All fields are required.");
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email is already registered.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = createToken(newUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // ✅ FIX: Redirect to the correct page on your live dashboard
    return res.redirect("https://main.d26ai6ejcpwzbx.amplifyapp.com/summary");
  } catch (err) {
    console.error("Server error during signup:", err);
    res.status(500).send("Server error during signup.");
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid credentials.");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).send("Invalid credentials.");
    }
    const token = createToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // ✅ FIX: Redirect to the correct page on your live dashboard
    return res.redirect("https://main.d26ai6ejcpwzbx.amplifyapp.com/summary");
  } catch (err) {
    console.error("Server error during login:", err);
    res.status(500).send("Server error during login.");
  }
});

// Debugging logs for /me endpoint
app.get("/me", (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      console.error("/me endpoint: No token provided");
      return res.status(401).json({ error: "Not authenticated" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("/me endpoint: Token decoded successfully", decoded);
    res.json({ userId: decoded.id });
  } catch (err) {
    console.error("/me endpoint error:", err.message);
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
