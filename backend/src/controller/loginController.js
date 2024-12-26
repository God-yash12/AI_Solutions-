const adminModel = require("../model/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");

const adminLoginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find admin by email
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res
        .status(401)
        .json({ error: "Admin not found. Please sign up first." });
    }

    // Validate password
    const isCorrectPassword = await bcrypt.compare(password, admin.password);
    if (!isCorrectPassword) {
      return res
        .status(401)
        .json({ error: "Invalid email or password. Please try again." });
    }

    // Generate token
    const token = generateToken({ id: admin._id, email: admin.email });

    // Set token as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: +process.env.JWT_EXPIRATION * 1000,
    });

    // Respond with success
    res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error. Please try again later." });
  }

};

 //  logout  admin
 const logoutController = (req, res) => {
  try {
    res.clearCookie("token",{
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      message: "logout successful",
    });

  } catch (error) {
    console.log(error.message, "failed to logout");
    res.status(500).json({
      error: "Failed to Logout Admin",
    });
  }
};

module.exports = {
  adminLoginController,
  logoutController,
};
