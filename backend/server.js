const path = require("path");

require("dotenv").config({
    path: path.resolve(__dirname, "../.env")
});

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const noticeRoutes = require("./routes/noticeRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use(
    "/uploads",
    express.static(path.join(__dirname, "../uploads"))
);

// Serve frontend files
const frontendPath = path.join(__dirname, "../frontend");

app.use("/frontend", express.static(frontendPath));
app.use(express.static(frontendPath));

const PORT = process.env.PORT || 3000;

connectDB();

// API routes
app.use("/api/notices", noticeRoutes);
app.use("/api/admin", adminRoutes);

// Open website from root
app.get("/", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

// About route
app.get("/about", (req, res) => {
    res.send("Welcome to College Info Hub");
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});