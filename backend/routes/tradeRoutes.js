const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const router = express.Router();

const { HoldingsModel } = require("../model/HoldingsModel");
const { OrdersModel } = require("../model/OrdersModel");
const { PositionsModel } = require("../model/PositionsModel");

const JWT_SECRET = process.env.JWT_SECRET;

// Environment-based configuration
const isProduction = process.env.NODE_ENV === "production";

// FIXED: Updated cookie configuration function (same as main server)
const getCookieOptions = () => ({
  httpOnly: true,
  sameSite: isProduction ? "none" : "lax",
  secure: isProduction,
  maxAge: 24 * 60 * 60 * 1000,
});

// Enhanced Authentication Middleware
const auth = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      console.error("Authentication failed: No token provided");
      return res.status(401).json({ error: "Not authenticated" });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error("Authentication error:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

// POST /api/newOrder
router.post("/newOrder", auth, async (req, res) => {
  try {
    const name = req.body.name;
    const qty = Number(req.body.qty);
    const price = Number(req.body.price);
    const mode = req.body.mode;
    const userId = req.userId;

    if (!name || !qty || !price || !mode) {
      return res
        .status(400)
        .json({ error: "name, qty, price, mode are required" });
    }

    await OrdersModel.create({ userId, name, qty, price, avg: price, mode });

    let position = await PositionsModel.findOne({ userId, name });

    if (mode === "BUY") {
      if (position) {
        const newQty = position.qty + qty;
        position.avg = (position.avg * position.qty + price * qty) / newQty;
        position.qty = newQty;
        await position.save();
      } else {
        await PositionsModel.create({
          userId,
          product: "CNC",
          name,
          qty,
          avg: price,
          price,
        });
      }
    } else if (mode === "SELL") {
      if (position) {
        const newQty = position.qty - qty;
        position.avg =
          newQty !== 0
            ? (position.avg * position.qty - price * qty) / newQty
            : 0;
        position.qty = newQty;
        await position.save();
      } else {
        await PositionsModel.create({
          userId,
          product: "CNC",
          name,
          qty: -qty,
          avg: price,
          price,
        });
      }
    }

    return res
      .status(200)
      .json({ success: true, message: `${mode} executed successfully` });
  } catch (error) {
    console.error("Trade error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An error occurred during the trade." });
  }
});

// GET /api/orders
router.get("/orders", auth, async (req, res) => {
  try {
    const orders = await OrdersModel.find({ userId: req.userId }).sort({
      _id: -1,
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Server error fetching orders" });
  }
});

// GET /api/allHoldings
router.get("/allHoldings", auth, async (req, res) => {
  try {
    const holdings = await HoldingsModel.find({ userId: req.userId }).sort({
      _id: -1,
    });
    res.status(200).json(holdings);
  } catch (error) {
    res.status(500).json({ error: "Server error fetching holdings" });
  }
});

// GET /api/allPositions
router.get("/allPositions", auth, async (req, res) => {
  try {
    const positions = await PositionsModel.find({ userId: req.userId }).sort({
      _id: -1,
    });
    res.status(200).json(positions);
  } catch (error) {
    res.status(500).json({ error: "Server error fetching positions" });
  }
});

// FIXED: LOGOUT ROUTE - Updated with proper cookie clearing
router.post("/logout", (req, res) => {
  // Clear the cookie with the same options used to set it
  res.cookie("token", "", {
    httpOnly: true,
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
    expires: new Date(0),
  });
  return res
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
});

// SETTLEMENT ROUTE
router.post("/settle", auth, async (req, res) => {
  try {
    const userId = req.userId;
    const currentPositions = await PositionsModel.find({ userId });

    for (const position of currentPositions) {
      let holding = await HoldingsModel.findOne({
        userId,
        name: position.name,
      });

      if (holding) {
        // If holding exists, update it with the position's quantity and avg price
        const totalQty = holding.qty + position.qty;
        if (totalQty !== 0) {
          holding.avg =
            (holding.avg * holding.qty + position.avg * position.qty) /
            totalQty;
        } else {
          holding.avg = 0; // Reset average if position is squared off
        }
        holding.qty = totalQty;
        // If the total quantity is zero after settlement, remove the holding
        if (holding.qty === 0) {
          await HoldingsModel.deleteOne({ _id: holding._id });
        } else {
          await holding.save();
        }
      } else {
        // If no holding exists, create a new one from the position data
        await HoldingsModel.create({
          userId: userId,
          name: position.name,
          qty: position.qty,
          avg: position.avg,
          price: position.price,
        });
      }
    }

    // After processing, delete all of the day's positions
    await PositionsModel.deleteMany({ userId });

    res
      .status(200)
      .json({
        success: true,
        message: "Positions for the day have been settled to holdings.",
      });
  } catch (error) {
    console.error("Settlement error:", error);
    res
      .status(500)
      .json({ success: false, error: "An error occurred during settlement." });
  }
});

// DELETE HOLDING ROUTE
router.delete("/holdings/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const holdingToDelete = await HoldingsModel.findOneAndDelete({
      _id: id,
      userId: userId,
    });

    if (!holdingToDelete) {
      return res
        .status(404)
        .json({
          error:
            "Holding not found or you do not have permission to remove it.",
        });
    }

    res
      .status(200)
      .json({ success: true, message: "Holding removed successfully." });
  } catch (error) {
    console.error("Error removing holding:", error);
    res
      .status(500)
      .json({
        success: false,
        error: "An error occurred while removing the holding.",
      });
  }
});

module.exports = router;
