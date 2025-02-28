import React, { useEffect } from 'react';  
import useStore from '../zustand/store';

const CustomerPage = () => {
  const bookingDetails = useStore((state) => state.bookingDetails);  // Corrected name
  const fetchBookings = useStore((state) => state.fetchBookings);
  const bookings = useStore((state) => state.bookings);

  console.log("BookingDetails: ", bookingDetails); 
  
  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);  
  return (
    <div>
      <h1>Booking Details</h1>
      {bookingDetails ? (
        <div>
          <h2>{bookingDetails.design_id}</h2>
          <p>Appointment Date: {bookingDetails.appointment_date}</p>
          <p>Time Slot: {bookingDetails.available_id}</p>
          <p>Payment Method: {bookingDetails.payment_method}</p>
          <p>Payment Date: {bookingDetails.payment_date}</p>
        </div>
      ) : (
        <p>No booking details found.</p>
      )}
    </div>
  );
};

export default CustomerPage;
