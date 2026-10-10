const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/studyroom")
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log("MongoDB Error:", error));

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  room: { type: String, required: true },
  seat: { type: Number, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true }
});

const Booking = mongoose.model("Booking", bookingSchema);


app.get("/", (req, res) => {
  res.send("Study Room Booking API is working!");
});
app.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Cannot get bookings" });
  }
});

app.post("/bookings", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: "Cannot add booking", error: error.message });
  }
});

app.put("/bookings/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: "Cannot update booking" });
  }
});

app.delete("/bookings/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Cannot delete booking" });
  }
});

app.listen(5001, () => {
  console.log("Server running on port 5001");
});