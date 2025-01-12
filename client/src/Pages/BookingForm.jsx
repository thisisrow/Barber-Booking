import React, { useState } from "react";
import axios from "axios";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "Hair",
    bookingDate: "",
  });
  const [notify, setNotify] = useState(false);
  const [notifyError, setNotifyError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://barber-booking-xfdz.onrender.com/api/users/booking",
        formData
      );
      const { token } = response.data;

      localStorage.setItem("bookingToken", token);

      setFormData({ name: "", phone: "", service: "Hair", bookingDate: "" });
      setNotify(true);
    } catch (error) {
      setNotifyError(true);
    }
  };

  return (
    <form className="container my-3" onSubmit={handleSubmit}>
      <h2>Create a Booking</h2>
      {notify && (
          <div class="alert alert-primary alert-dismissible fade show" role="alert">
          <strong>"Message sent successfully!"</strong> You will receive Call on your Number in short time
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        )}
        {notifyError && (
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>"Message not sent!"</strong> 
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        )}
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">
          Phone
        </label>
        <input
          type="text"
          className="form-control"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="service" className="form-label">
          Service
        </label>
        <select
          className="form-select"
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
        >
          <option value="Hair">Hair</option>
          <option value="Beard">Beard</option>
          <option value="Both">Both</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="bookingDate" className="form-label">
          Date
        </label>
        <input
          type="date"
          className="form-control"
          id="bookingDate"
          name="bookingDate"
          value={formData.bookingDate}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default BookingForm;
