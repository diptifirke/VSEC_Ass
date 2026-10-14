import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState(1);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [name, setName] = useState("");
  const [room, setRoom] = useState("Room 1");
  const [seat, setSeat] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("09:00");

  const [bookings, setBookings] = useState([]);
  const [editId, setEditId] = useState("");
  const [message, setMessage] = useState("");

  const url = "http://localhost:5001/bookings";

  // Login
  function login(e) {
    e.preventDefault();
    setPage(2);
  }

  // Get all bookings
  async function getBookings() {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setBookings(data);
    } catch {
      setMessage("Cannot connect to backend.");
    }
  }

  useEffect(() => {
    if (page === 3) {
      getBookings();
    }
  }, [page]);

  // Clear form
  function clearForm() {
    setName("");
    setRoom("Room 1");
    setSeat("");
    setDate("");
    setTime("09:00");
    setEditId("");
    setMessage("");
  }

  // Add or update booking
  async function saveStudent(e) {
    e.preventDefault();

    const student = {
      name,
      room,
      seat: Number(seat),
      date,
      time
    };

    const method = editId ? "PUT" : "POST";
    const apiUrl = editId ? url + "/" + editId : url;

    try {
      const response = await fetch(apiUrl, {
        method: method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
      });

      if (response.ok) {
        clearForm();
        setPage(3);
      } else {
        setMessage("Could not save details.");
      }
    } catch {
      setMessage("Cannot connect to backend.");
    }
  }

  // Edit booking
  function editStudent(student) {
    setName(student.name);
    setRoom(student.room);
    setSeat(student.seat);
    setDate(student.date);
    setTime(student.time);
    setEditId(student._id);
    setPage(2);
  }

  // Delete booking without confirmation
  async function deleteStudent(id) {
    try {
      const response = await fetch(url + "/" + id, {
        method: "DELETE"
      });

      if (response.ok) {
        getBookings();
        setMessage("Booking deleted successfully.");
      } else {
        setMessage("Could not delete booking.");
      }
    } catch {
      setMessage("Cannot connect to backend.");
    }
  }

  // Logout
  function logout() {
    clearForm();
    setUsername("");
    setPassword("");
    setPage(1);
  }

  return (
    <div className="app">
      <header className="header">
        <h1>StudySpace</h1>
        <p>Study Room Seat Booking System</p>
      </header>

      <main className="container">

        {/* Page 1: Login */}
        {page === 1 && (
          <section className="form-card">
            <h2>Login</h2>

            <form onSubmit={login}>
              <label>Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />

              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />

              <button type="submit">Login</button>
            </form>
          </section>
        )}

        {/* Page 2: Add or edit form */}
        {page === 2 && (
          <section className="form-card">
            <h2>{editId ? "Edit Student Details" : "Student Details Form"}</h2>

            <form onSubmit={saveStudent}>
              <label>Student Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter student name"
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
                value={seat}
                onChange={(e) => setSeat(e.target.value)}
                placeholder="Enter seat number"
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
                {editId ? "Update Details" : "Add Details"}
              </button>
            </form>

            {message && <p className="message">{message}</p>}
          </section>
        )}

        {/* Page 3: View, edit and delete */}
        {page === 3 && (
          <section className="booking-card">
            <h2>All Student Details</h2>

            <button
              onClick={() => {
                clearForm();
                setPage(2);
              }}
            >
              Add Student
            </button>

            <button className="secondary-btn" onClick={logout}>
              Logout
            </button>

            {message && <p className="message">{message}</p>}

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Student Name</th>
                    <th>Room</th>
                    <th>Seat No.</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.map((student, index) => (
                    <tr key={student._id}>
                      <td>{index + 1}</td>
                      <td>{student.name}</td>
                      <td>{student.room}</td>
                      <td>{student.seat}</td>
                      <td>{student.date}</td>
                      <td>{student.time}</td>
                      <td>
                        <button onClick={() => editStudent(student)}>
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => deleteStudent(student._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {bookings.length === 0 && (
              <p>No student records available.</p>
            )}
          </section>
        )}

      </main>
    </div>
  );
}

export default App;