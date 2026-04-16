const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

/* ---------------- Middleware ---------------- */

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  // add frontend deployed URL here later
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------------- Routes ---------------- */

app.use("/api/auth", require("./routes/auth"));
app.use("/api/members", require("./routes/members"));
app.use("/api/trainers", require("./routes/trainers"));
app.use("/api/memberships", require("./routes/memberships"));
app.use("/api/services", require("./routes/services"));
app.use("/api/admin", require("./routes/admin"));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    message: "Master Gym API is running",
  });
});

/* ---------------- 404 Handler ---------------- */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* ---------------- Error Handler ---------------- */

app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);

  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

/* ---------------- Start Server ---------------- */

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI missing in .env");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("❌ Startup Error:", error.message);
    process.exit(1);
  }
};

startServer();
