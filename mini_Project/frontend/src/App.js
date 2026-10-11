import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const [name, setName] = useState("");
  const [room, setRoom] = useState("Room 1");
  const [seat, setSeat] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("09:00");
  const [bookings, setBookings] = useState([]);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  const url = "http://localhost:5001/bookings";

  const login = (e) => {
    e.preventDefault();

    if (username.trim() !== "" && password !== "") {
      setLoggedIn(true);
    }
  };

  const getBookings = async () => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Cannot load bookings");
      }
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      setMessage("Cannot connect to backend. Start the server first.");
    }
  };

  useEffect(() => {
    if (loggedIn) {
      getBookings();
    }
  }, [loggedIn]);

  const saveBooking = async (e) => {
    e.preventDefault();

    const booking = {
      name: name,
      room: room,
      seat: Number(seat),
      date: date,
      time: time
    };

    try {
      let response;

      if (editId) {
        response = await fetch(url + "/" + editId, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(booking)
        });
      } else {
        response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(booking)
        });
      }

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message || "Something went wrong.");
        return;
      }

      setMessage(editId ? "Booking updated!" : "Booking added!");
      clearForm();
      getBookings();
    } catch (error) {
      setMessage("Backend is not responding. Check server.js.");
    }
  };

  const editBooking = (booking) => {
    setName(booking.name);
    setRoom(booking.room);
    setSeat(booking.seat);
    setDate(booking.date);
    setTime(booking.time);
    setEditId(booking._id);
    setMessage("");
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) {
      return;
    }

    try {
      const response = await fetch(url + "/" + id, {
        method: "DELETE"
      });

      if (!response.ok) {
        setMessage("Could not delete booking.");
        return;
      }

      setMessage("Booking deleted!");
      getBookings();
    } catch (error) {
      setMessage("Backend is not responding.");
    }
  };

  const clearForm = () => {
    setName("");
    setRoom("Room 1");
    setSeat("");
    setDate("");
    setTime("09:00");
    setEditId(null);
  };

  if (!loggedIn) {
    return (
      <div className="login-page">
        <div className="login-card">
          <h1>StudySpace</h1>
          <p>Study Room Seat Booking System</p>

          <form onSubmit={login}>
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Login</button>
          </form>

        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1>StudySpace</h1>
        <p>Book your perfect study seat</p>

        <button
          onClick={() => {
            setLoggedIn(false);
            setUsername("");
            setPassword("");
            setMessage("");
            clearForm();
          }}
        >
          Logout
        </button>
      </header>

      <main className="container">
        <section className="form-card">
          <h2>{editId ? "Update Booking" : "Book a Seat"}</h2>

          <form onSubmit={saveBooking}>
            <label>Student Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>Study Room</label>
            <select
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            >
              <option>Room 1</option>
              <option>Room 2</option>
              <option>Room 3</option>
            </select>

            <label>Seat Number</label>
            <input
              type="number"
              min="1"
              placeholder="Enter seat number"
              value={seat}
              onChange={(e) => setSeat(e.target.value)}
              required
            />

            <label>Booking Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />

            <label>Booking Time</label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
            >
              <option value="09:00">9:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="12:00">12:00 PM</option>
              <option value="14:00">2:00 PM</option>
              <option value="15:00">3:00 PM</option>
              <option value="16:00">4:00 PM</option>
            </select>

            <button type="submit">
              {editId ? "Update Booking" : "Book Seat"}
            </button>

            {editId && (
              <button type="button" className="cancel-btn" onClick={clearForm}>Cancel Edit</button>
            )}
          </form>

          {message && <p className="message">{message}</p>}
        </section>

        <section className="booking-card">
          <h2>All Bookings</h2>
          <p className="booking-count">
            Total bookings: {bookings.length}
          </p>

          {bookings.length === 0 ? (
            <p>No bookings yet. Book your first seat!</p>
          ) : (
            <div className="booking-list">
              {bookings.map((booking) => (
                <div className="booking-item" key={booking._id}>
                  <h3>{booking.name}</h3>
                  <p>Room: {booking.room}</p>
                  <p>Seat: {booking.seat}</p>
                  <p>Date: {booking.date}</p>
                  <p>Time: {booking.time}</p>

                  <div className="actions">
                    <button onClick={() => editBooking(booking)}>
                      Edit
                    </button>

                    <button className="delete-btn" onClick={() => deleteBooking(booking._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
export default App;