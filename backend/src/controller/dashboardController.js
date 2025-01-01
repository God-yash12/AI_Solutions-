const ReviewModel = require("../model/reviewModel");
const InquiryModel = require('../model/inquiryModel');
const BlogModel = require('../model/blogModel');
const EventModel = require("../model/eventModel");

exports.getDashboardCounts = async (req, res) => {
  try {
    const totalReviews = await ReviewModel.countDocuments();
    const totalInquiries = await InquiryModel.countDocuments();
    const totalBlog = await BlogModel.countDocuments();
    const totalEvent = await EventModel.countDocuments();

    res.status(200).json({
      success: true,
      data: { totalReviews, totalInquiries, totalBlog, totalEvent },
    });
    
  } catch (error) {
    console.error("Error fetching dashboard counts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard counts",
    });
  }
};
