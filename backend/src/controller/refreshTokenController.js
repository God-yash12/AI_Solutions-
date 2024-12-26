const jwt = require("jsonwebtoken");

module.exports.validateTokenController = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized. Token not found.",
    });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);

    // Respond with success
    res.status(200).json({
      message: "Verified",
    });
  } catch (error) {
    console.error("Token validation error:", error.message);

    res.status(401).json({
      success: false,
      error: "Unauthorized. Invalid or expired token.",
    });
  }
};
