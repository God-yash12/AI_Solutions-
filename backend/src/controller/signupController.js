const adminModel = require("../model/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.signupController = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the admin with the same email already exists
    const existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(403).json({ error: "Email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the admin in the database
    const admin = await adminModel.create({
      email: email,
      password: hashedPassword,
    });

    // Generate a token for the admin
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } 
    );

    // Set the token as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000, // 1 hour in milliseconds
    });

    // Respond with a success message and the token
    res.status(201).json({
      message: "Admin registered successfully",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.error(error.message);
  }
};
