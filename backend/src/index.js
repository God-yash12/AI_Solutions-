
const express = require('express');
const cors = require('cors'); 
const path = require('path');
const bodyParser = require('body-parser');
const DBConnection = require('./config/db_config');
const cookieParser = require('cookie-parser');
const { configDotenv } = require('dotenv');
require('dotenv').config();
const adminRoutes = require ("./routes/adminRoutes")
const contactRoute = require("./routes/contactRoutes")
const reviewRoute = require("./routes/reviewRoute");
const blogRoute = require ("./routes/blogRoutes")
const InquiryRoute = require("./routes/inquiryRoute")

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, '..', 'public')));
app.use(cookieParser());

// Enable CORS
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));



// Database connection 
DBConnection();


// Routing
app.use("/api/admin", adminRoutes)
app.use("/api/inquiry", contactRoute)
app.use("/api/review", reviewRoute)
app.use("/api/blog", blogRoute)
app.use("/api/inquiry", InquiryRoute )



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Please use a different port.`);
  } else {
      console.error("Error starting server:", err);
  }
});

