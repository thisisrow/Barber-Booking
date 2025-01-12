const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Secret key for JWT
const JWT_SECRET = "your_secret_key"; // Replace with a secure, environment-protected key

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const { name, phone, service, bookingDate } = req.body;
    if (!name ||!phone ||!service ||!bookingDate) {
      return res.status(400).json({
        error: "Name, phone number, service, and booking date are required",
      });
    }
    if (!phone || !/^[0-9]{10}$/.test(phone)) {
        return res.status(400).json({ error: "Valid phone number is required" });
      }
      
    // Create a booking object with defaults if fields are missing
    const booking = new User({
      name: name || "Anonymous", // Default to "Anonymous" if name not provided
      phone,
      service: service || "Hair", // Default service to "Hair"
      bookingDate :bookingDate || Date.now(),
    });

    const savedBooking = await booking.save();

    // Generate a JWT token with the booking ID
    const token = jwt.sign({ id: savedBooking._id }, JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({
      message: "Booking created successfully",
      token, // Send the token to store on the user's device
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while creating the booking" });
  }
};

// Delete a booking using JWT token
const deleteBooking = async (req, res) => {
  try {
    const { token } = req.body; // JWT token passed in the request body

    // Verify the JWT token
    if (!token) {
      return res.status(401).json({ error: "Token is required for deletion" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }

    const bookingId = decoded.id;

    // Find and delete the booking
    const deletedBooking = await User.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while deleting the booking" });
  }
};

// Get all bookings

const getAllBookings = async (req, res) => {
  try {
    const bookings = await User.find({});

    res.status(200).json({ bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while retrieving bookings" });
  }
};

// Delete a booking using the bookingId
const deleteAdminBooking = async (req, res) => {
  try {
    const { bookingId } = req.body; // bookingId is passed in the request body

    // Check if bookingId is provided
    if (!bookingId) {
      return res.status(400).json({ error: "Booking ID is required" });
    }

    // Find and delete the booking by bookingId
    const deletedBooking = await User.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while deleting the booking" });
  }
};

module.exports = {
  createBooking,
  deleteBooking,
  getAllBookings,
  deleteAdminBooking,
};
