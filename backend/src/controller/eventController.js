const Events = require("../model/eventModel");
const path = require("path");
const removeFile = require("../middleware/removeImage");
const { constrainedMemory } = require("process");
const mongoose = require("mongoose");
const getImageUrl = require("../utils/getImageUrl");

const createEvent = async (req, res) => {
  try {
    // Extract event details from the request body
    const { title, date, location, eventDetails } = req.body;

    // Validate input data
    if (!title || !date || !location || !eventDetails) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Ensure that files are uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Validate file types (Optional)
    const validMimeTypes = ["image/jpeg", "image/png", "image/gif"];
    const invalidFiles = req.files.filter(
      (file) => !validMimeTypes.includes(file.mimetype)
    );
    if (invalidFiles.length > 0) {
      return res.status(400).json({
        message: "Invalid file type. Only JPEG, PNG, and GIF are allowed.",
      });
    }

    // Get the paths of the uploaded images
    const imagePath = req.files.map((file) => getImageUrl(file.filename));

    // Create a new event in the database
    const newEvent = new Events({
      title,
      date,
      location,
      eventDetails,
      images: imagePath,
    });
    await newEvent.save();

    // Send a success response
    res
      .status(201)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    console.error("Error creating event:", error.message);
    res
      .status(500)
      .json({ message: "Failed to create event", error: error.message });
  }
};

const getEventByCategory = async (req, res) => {
  try {
    // Get the current local time
    const currentTimeLocal = new Date();

    // Fetch previous events (events that have already occurred)
    const previousEvent = await Events.find({
      date: { $lt: currentTimeLocal },
    });

    // Fetch upcoming events (events that are scheduled to occur in the future)
    const upcomingEvent = await Events.find({
      date: { $gte: currentTimeLocal },
    });

    // Check if no events were found in both categories
    if (previousEvent.length === 0 && upcomingEvent.length === 0) {
      return res.status(404).json({
        message: "No events found",
      });
    }

    // Send the response with events categorized
    res.status(200).json({
      message: "Events retrieved successfully",
      previousEvent: previousEvent.length > 0 ? previousEvent : [],
      upcomingEvent: upcomingEvent.length > 0 ? upcomingEvent : [],
    });
  } catch (error) {
    // Send an error response if something goes wrong
    res.status(500).json({
      message: "Error while retrieving events",
      error: error.message,
    });
  }
};

// Get Single Event by ID
const getEventById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Event ID is missing" });
  }

  try {
    const event = await Events.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event retrieved successfully", event });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching event", error: error.message });
  }
};

const deleteEventById = async (req, res) => {
  try {
    const id = req.params.id;

    // Check if the ID is provided and is a valid ObjectId
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid or missing event ID" });
    }

    // Attempt to find and delete the event
    const event = await Events.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Remove images if they exist
    if (event.images && Array.isArray(event.images)) {
      event.images.forEach((image) => {
        removeFile(image);
      });
    }

    // Delete event
    await Events.findByIdAndDelete(id);

    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to delete event", error: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, date, eventDetails, images } = req.body;

    // Find the existing event by ID
    const existEvent = await Events.findById(id);

    if (!existEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Handle image updates
    if (images && Array.isArray(images)) {
      // Remove old images if new ones are provided
      if (existEvent.images && existEvent.images.length > 0) {
        existEvent.images.forEach((oldImage) => {
          removeFile(oldImage);
        });
      }

      // Update the images array with the new set
      existEvent.images = images;
    }

    // Update other fields if provided
    existEvent.title = title !== undefined ? title : existEvent.title;
    existEvent.time = time !== undefined ? time : existEvent.time;
    existEvent.eventDetails =
      eventDetails !== undefined ? eventDetails : existEvent.eventDetails;

    // Save the updated event
    const updatedEvent = await existEvent.save();

    res
      .status(200)
      .json({ message: "Event updated successfully", event: updatedEvent });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update event", error: error.message });
  }
};

const totalEvents = async (req, res) => {
  try {
    const totalEvents = await Events.countDocuments();
    res.status(200).json({message: "Total event has been retrieved", data: totalEvents})
  } catch (error) {
    console.log("Failed to retrieve total events")
    res.status(500).json({message: "Failed to retrieve event count"})
  }
};

module.exports = {
  createEvent,
  getEventByCategory,
  deleteEventById,
  updateEvent,
  getEventById,
  totalEvents,
};
