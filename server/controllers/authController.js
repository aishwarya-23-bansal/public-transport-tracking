const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ===============================
// REGISTER COMMUTER
// ===============================

const registerUser = async (req, res) => {
    try {

        const {
            name,
            email,
            password,
            phone
        } = req.body;


        // Check required fields
        if (!name || !email || !password || !phone) {
            return res.status(400).json({
                message: "Please provide all required fields"
            });
        }


        // Check if user already exists
        const existingUser = await User.findOne({
            email
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }


        // Hash password
        const hashedPassword = await bcrypt.hash(
            password,
            10
        );


        // IMPORTANT:
        // Public registration ALWAYS creates
        // a commuter account.
        //
        // We deliberately do NOT take role
        // from req.body.

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role: "commuter"
        });


        res.status(201).json({

            message: "User registered successfully",

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }

        });

    } catch (error) {

        console.error("Register error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};



// ===============================
// LOGIN
// ===============================

const loginUser = async (req, res) => {
    try {

        const {
            email,
            password
        } = req.body;


        // Check required fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password"
            });
        }


        // Find user
        const user = await User.findOne({
            email
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }


        // Compare password
        const isPasswordCorrect =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }


        // Create JWT
        const token = jwt.sign(

            {
                id: user._id,
                role: user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            }

        );


        res.status(200).json({

            message: "Login successful",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }

        });

    } catch (error) {

        console.error("Login error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};



// ===============================
// GET PROFILE
// ===============================

const getProfile = async (req, res) => {
    try {

        res.status(200).json({
            user: req.user
        });

    } catch (error) {

        console.error("Get profile error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};



module.exports = {
    registerUser,
    loginUser,
    getProfile
};