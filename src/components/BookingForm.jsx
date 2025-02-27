import React, { useState } from 'react';
import useStore from '../zustand/store'; 

const BookingForm = () => {
  const [designId, setDesignId] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [availableId, setAvailableId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDate, setPaymentDate] = useState('');

   const setBookingDetails = useStore(state => state.setBookingDetails);
   const createBooking = useStore(state => state.createBooking);

  const handleSubmit = (e) => {
    e.preventDefault();

    setBookingDetails({
      design_id: designId,
      appointment_date: appointmentDate,
      available_id: availableId,
      payment_method: paymentMethod,
      payment_date: paymentDate,
    });

    // Call the createBooking function
    createBooking();
  };

  return (
    <div>
      <h2>Create Booking</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <div>Design ID:</div>
          <input
            type="text"
            id="designId"
            value={designId}
            onChange={(e) => setDesignId(e.target.value)}
            required
          />
        </div>

        <div>
          <div>Appointment Date:</div>
          <input
            type="date"
            id="appointmentDate"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
        </div>

        <div>
          <div>Available ID:</div>
          <input
            type="text"
            id="availableId"
            value={availableId}
            onChange={(e) => setAvailableId(e.target.value)}
            required
          />
        </div>

        <div>
          <div>Payment Method:</div>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="">Select a payment method</option>
            <option value="credit card">Credit Card</option>
            <option value="debit">debit</option>
            <option value="cash">Cash</option>
          </select>
        </div>

        <div>
          <div>Payment Date:</div>
          <input
            type="date"
            id="paymentDate"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            required
          />
        </div>

        <button type="submit">Submit Booking</button>
      </form>
    </div>
  );
};

export default BookingForm;
