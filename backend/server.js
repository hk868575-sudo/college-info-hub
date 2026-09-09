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

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = 3000;

connectDB();

app.use("/api/notices", noticeRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
    res.send("College Info Hub Backend is Running!");
});

app.get("/about", (req, res) => {
    res.send("Welcome to College Info Hub");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});