import React, { useEffect } from 'react';  
import useStore from '../zustand/store';

const CustomerPage = () => {
  const bookingDetails = useStore((state) => state.bookingDetails); 
  const officeHours = useStore((state) => state.officeHours); 
  const fetchCustomerBookings = useStore((state) => state.fetchCustomerBookings);

  console.log("BookingDetails: ", bookingDetails); 
  console.log('office hours: ', officeHours);

  const findOfficeHourById = (availableId) => {
    console.log('find this availableId in the office hours', availableId);
    //return an object {start: '', end:''};
    const myFoundOfficeHour = officeHours.find((a) => Number(a.id) === Number(availableId));
    return `${myFoundOfficeHour.start_time} - ${myFoundOfficeHour.end_time}`;
  }
  
  useEffect(() => {
    fetchCustomerBookings();
  }, []);  
  return (
    <div>
      <h1>Booking Details</h1>
      {bookingDetails ? (
        <div>
          <h2>{bookingDetails.design_id}</h2>
          <p>Appointment Date: {bookingDetails.appointment_date}</p>
          <p>Time Slot: {findOfficeHourById(bookingDetails.available_id)}</p>
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
