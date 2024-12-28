const { response } = require("express");
const InquiryModel = require("../model/inquiryModel");
const sendResponse = require("../utils/sendMail");

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

module.exports = {
  createInquiry,
  getInquires,
  respondInquiry,
};
