const contactModel = require('../model/contactModel');

const contactController = async (req, res) => {
  const { name, email, phone, company, country, jobTitle, jobDetails } = req.body;

  try {
    // Validate required fields
    if (!name || !email || !phone || !company || !country || !jobDetails) {
      return res.status(400).json({ error: 'All required fields must be filled.' });
    }

    // Create a new contact entry
    const newContact = await contactModel.create({
      name,
      email,
      phone,
      company,
      country,
      jobTitle,
      jobDetails,
    });

    res.status(201).json({ message: 'Inquiry submitted successfully', data: newContact });
  } catch (error) {
    console.error("Error submitting inquiry:", error.message);
    res.status(500).json({ error: 'Failed to submit inquiry', details: error.message });
  }

};


// retrieve all contact 
const getContacts = async (req, res) => {
  try {
    // Fetch all contact entries from the database
    const contacts = await contactModel.find(); 
    
    // Check if there are no contacts found
    if (contacts.length === 0) {
      return res.status(404).json({ message: 'No contacts found' });
    }

    // Send the contacts back to the frontend
    res.status(200).json({ message: 'Contacts fetched successfully', data: contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error.message);
    res.status(500).json({ error: 'Failed to fetch contacts', details: error.message });
  }
};

module.exports = {
  contactController,
  getContacts,
}