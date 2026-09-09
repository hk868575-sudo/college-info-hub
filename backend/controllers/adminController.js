const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");


// Admin login
const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password are required"
            });
        }

        // Find admin by username
        const admin = await Admin.findOne({
            username: username
        });

        if (!admin) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        // Compare entered password with hashed password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            admin.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        // Create JWT token
        const token = jwt.sign(
            {
                id: admin._id,
                username: admin.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        // Login successful
        res.status(200).json({
            message: "Login successful",
            token: token,
            admin: {
                id: admin._id,
                username: admin.username
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            error: error.message
        });
    }
};


module.exports = {
    loginAdmin
};