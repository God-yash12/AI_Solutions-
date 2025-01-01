const { response } = require("express");
const InquiryModel = require("../model/inquiryModel");
const sendResponse = require("../utils/sendMail");
const inquiryModel = require("../model/inquiryModel");

const createInquiry = async (req, res) => {
  const { title, email, description } = req.body;
  try {
    if (!title || !email || !description) {
      return res.status(500).json({ message: "Please provide all the fields" });
    }

    const newInquiry = await InquiryModel.create({
      title,
      email,
      description,
    });

    res.status(200).json({
      message:
        "Thank you for you inquiry, you will get reply soon on provided email",
      data: newInquiry,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to create Inquiry", error: error.message });
  }
};

const getInquires = async (req, res) => {
  try {
    const inquiries = await InquiryModel.find();
    if (inquiries.length === 0) {
      return res.status(404).json({ message: "No Inquiries Found" });
    }

    res
      .status(200)
      .json({ message: "Inquiries retrieve successfully", data: inquiries });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to fecth inquires", error: error.message });
  }
};

// responding to the inquuiry
const respondInquiry = async (req, res) => {
  const { id } = req.params;
  const { responseMessage } = req.body;

  try {
    const inquiry = await InquiryModel.findById(id);
    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry doesnot found" });
    }

    const subject = `Reponse to your Inquiry: ${inquiry.title}`;
    await sendResponse(inquiry.email, subject, responseMessage);

    res.status(200).json({ message: "Response sent successfully" });
  } catch (error) {
    console.log(error);
    l;
    res
      .status(500)
      .json({ message: "Failed to respond the inquiry", error: error.message });
  }
};


const getTotalInquiry = async (req, res) => {
  try {
     const totalInquiry = await InquiryModel.countDocuments();
     res.status(200).json({message: `total inquiries are ${totalInquiry}`, data: totalInquiry})
    
   } catch (error) {
    console.log(error, "inquiry count error")
    res.status(500).json({message: "Failed to count the Inquiries", error: error.message})
   }
}

// delete inquiry 

const deleteInquiry = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ error: "Inquiry ID is required." });
    }

    const result = await InquiryModel.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ error: "Inquiry not found." });
    }

    return res.status(200).json({ message: "Inquiry deleted successfully." });
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return res.status(500).json({ error: "An error occurred while deleting the inquiry." });
  }
};

module.exports = {
  createInquiry,
  getInquires,
  respondInquiry,
  getTotalInquiry,
  deleteInquiry,
};
