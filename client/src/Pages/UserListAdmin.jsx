import React, { useEffect, useState } from "react";
import axios from "axios";

const UserListAdmin = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users/alluser");
      const filteredBookings = response.data.bookings.filter((booking) => {
        // Format bookingDate to "YYYY-MM-DD"
        const bookingDate = new Date(booking.bookingDate).toISOString().slice(0, 10);
        return bookingDate === selectedDate;
      });
      setBookings(filteredBookings);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (bookingId) => {
    try {
      // Make the DELETE request to the backend
      const response = await axios.delete("http://localhost:5000/api/users/admin", {
        data: { bookingId } // Pass the bookingId in the request body
      });
  
      // Check if the response contains a success message
      if (response.status === 200 && response.data.message === "Booking deleted successfully") {
        alert("Booking deleted!");
        fetchBookings(); // Refresh the bookings list after deletion
      } else {
        alert("Failed to delete booking.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete booking.");
    }
  };
  

  useEffect(() => {
    fetchBookings();
  }, [selectedDate]);

  return (
    <div className="container my-3">
      <h2>Bookings</h2>
      <div className="mb-3">
        <label htmlFor="selectedDate" className="form-label">
          Select Date
        </label>
        <input
          type="date"
          className="form-control"
          id="selectedDate"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Service</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td>{booking.name}</td>
                <td>{booking.phone}</td>
                <td>{booking.service}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(booking._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No bookings found for this date.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserListAdmin;
