const removeFile = require("../middleware/removeImage");
const ReviewModel = require("../model/reviewModel");
const getImageUrl = require("../utils/getImageUrl");





const createReview = async (req, res) => {
  try {
    const { name, description, company, position, ratings } = req.body;

    // Ensure a file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Validate file type (Optional)
    const validMimeTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validMimeTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        message: "Invalid file type. Only JPEG, PNG, and GIF are allowed.",
      });
    }

    // Get the image URL
    const imagePath = getImageUrl(req.file.filename);

    // Create the review instance
    const review = new ReviewModel({
      name,
      description,
      company,
      position,
      ratings,
      image: imagePath,
    });

    // Save the review to the database
    await review.save();

    res.status(201).json({ message: "Review posted successfully", review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to post the review", error: error.message });
  }
};



const getAllReviews = async (req, res) => {
  try {
    const reviews = await ReviewModel.find();

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: "No Reviews Found" });
    }

    res
      .status(200)
      .json({ message: "All Reviews retrieved successfully", data: reviews });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to fetch Reviews", details: error.message });
  }
};



const deleteReview = async (req, res) => {
  try {
    const id = req.params.id;

    const review = await ReviewModel.findById(id);
    if (!review) {
      res.status(404).json({ message: "Review does not Found" });
    }

    if (review.image) {
      removeFile(review.image);  
    }

    await ReviewModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Review Deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete Review", error: error.message });
  }
};


const approveReview = async (req, res) => {
  try {
    const id = req.params.id;

    // Find the review by its ID
    const review = await ReviewModel.findById(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Update the review's approval status
    review.approved = true;

    // Save the updated review
    await review.save();

    res.status(200).json({
      message: "Review approved successfully",
      review: review.toObject(),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to approve review",
      error: error.message,
    });
  }
};

const getTotalReviews = async (req, res) => {
  try {
    const totalReviews = await ReviewModel.countDocuments();
    res.status(200).json({message: "Total review has been retrieved", data: totalReviews})
  } catch (error) {
    console.log("Failed to retrieve total events")
    res.status(500).json({message: "Failed to retrieve reviews count"})
  }
};



const getApprovedReviews = async (req, res) => {
  try {
    const reviews = await ReviewModel.find({ approved: true }); 
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: "No approved reviews found" });
    }


    res.status(200).json({ message: "Approved reviews retrieved successfully", data: reviews });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch approved reviews", details: error.message });
  }
};





module.exports = {
  createReview,
  getAllReviews,
  deleteReview,
  approveReview,
  getApprovedReviews,
  getTotalReviews
};
