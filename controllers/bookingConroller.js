const { Bookings } = require("../db/models");

// List bookings
exports.bookingList = async (req, res) => {
  try {
    const bookings = await Field.findAll({});
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add booking

exports.bookingCreate = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newBooking = await Booking.create(req.body);
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update booking

exports.bookingUpdate = async (req, res) => {
  const { bookingId } = req.params;
  try {
    const foundBooking = await Booking.findByPk(bookingId);
    if (foundBooking) {
      await foundBooking.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Booking not Found " });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete booking

exports.bookingDelete = async (req, res) => {
  const { bookingId } = req.params;
  try {
    const foundBooking = await booking.findByPk(bookingId);
    if (foundBooking) {
      await foundBooking.destroy(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Bookingnot Found " });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//
