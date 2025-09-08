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

// CRITICAL FIX 1: Add trust proxy setting for AWS Elastic Beanstalk
app.set('trust proxy', 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CRITICAL FIX 2: Environment-based configuration
const isProduction = process.env.NODE_ENV === 'production';

// Updated CORS configuration
app.use(
  cors({
    origin: isProduction 
      ? [
          "https://main.dphxll3jwggtr.amplifyapp.com",
          "https://main.d26ai6ejcpwzbx.amplifyapp.com",
        ]
      : ["http://localhost:3000"], // For local development
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

app.use("/api", apiRoutes);

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// CRITICAL FIX 3: Updated cookie configuration function
const getCookieOptions = () => ({
  httpOnly: true,
  sameSite: isProduction ? "none" : "lax",  // Critical fix for cross-domain
  secure: isProduction,                     // Required for sameSite: "none"
  maxAge: 24 * 60 * 60 * 1000,
});

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
    
    // FIXED: Use updated cookie options
    res.cookie("token", token, getCookieOptions());

    return res.redirect("https://main.d26ai6ejcpwzbx.amplifyapp.com/summary");
  } catch (err) {
    console.error("Server error during signup:", err);
    res.status(500).send("Server error during signup.");
  }
});

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
    
    // FIXED: Use updated cookie options
    res.cookie("token", token, getCookieOptions());

    return res.redirect("https://main.d26ai6ejcpwzbx.amplifyapp.com/summary");
  } catch (err) {
    console.error("Server error during login:", err);
    res.status(500).send("Server error during login.");
  }
});

app.get("/me", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));