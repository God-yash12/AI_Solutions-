const jwt = require("jsonwebtoken");

const generateToken = (id, email) => {
  try {
    // Use the JWT expiration from environment variables for better flexibility
    const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
      expiresIn: +process.env.JWT_EXPIRATION  // Default to 1 hour if not set
    });
    return token;
  } catch (error) {
    console.error("Error generating the token", error);
    throw new Error("Token generation failed");
  }
};

module.exports = generateToken;
