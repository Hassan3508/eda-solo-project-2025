import React, { useEffect } from 'react';  
import useStore from '../zustand/store';
import { useNavigate} from 'react-router-dom';

const CustomerPage = () => {
  const navigate = useNavigate();
  const bookingDetails = useStore((state) => state.bookingDetails); 
  const officeHours = useStore((state) => state.officeHours); 
  const fetchCustomerBookings = useStore((state) => state.fetchCustomerBookings);
  const customerBookings = useStore((state) => state.customerBookings);
  const designs = useStore((state) => state.designs);
  const cancelBooking = useStore((state) => state.cancelBooking);

  console.log("BookingDetails: ", bookingDetails); 
  console.log('office hours: ', officeHours);
  console.log('customer bookings', customerBookings);

  const findOfficeHourById = (availableId) => {
    console.log('find this availableId in the office hours', availableId);
    //return an object {start: '', end:''};
    const myFoundOfficeHour = officeHours.find((a) => Number(a.id) === Number(availableId));
    return `${myFoundOfficeHour.start_time} - ${myFoundOfficeHour.end_time}`;
  }
  
  useEffect(() => {
    fetchCustomerBookings();
  }, []); 
  

  const handleDeleteBooking = (bookingId) => {
    alert("This booking will be cancel!");
    cancelBooking(bookingId);
    navigate('/designlist');
  };

  const findDesignById = (id) => {
    // console.log('find the image for this id', id);
    return designs.find((design) => Number(design.id) === Number(id)) ;
  }
  
  
  return (
    // <div>
    //   <h1>Booking Details</h1>
    //   {bookingDetails?.design_id ? (
    //     <div>
    //       <h2>BookingId: {findBookingById(bookingDetails?.bookingId)}</h2>
    //       <h3>DesignId: {bookingDetails?.design_id}</h3>
    //       <p>Appointment Date: {bookingDetails?.appointment_date}</p>
    //       <p>Time Slot: {findOfficeHourById(bookingDetails?.available_id)}</p>
    //       <p>Payment Method: {bookingDetails?.payment_method}</p>
    //       <p>Payment Date: {bookingDetails?.payment_date}</p>
    //       <button onClick={() => handleDeleteBooking(bookingDetails?.bookingId)}>Cancel Booking</button>
    //     </div>
    //   ) : (
    //     <p>No booking details found.</p>
    //   )}
    // </div>
    <div>
      <h1>Booking Details</h1>
      {customerBookings?.filter((b) => !b.booking_cancel).map((book) => (
        <div key={book.id}>
          <p>BookingId: {book.id}</p>
          <p>Design: {findDesignById(book.design_id)?.title}</p>
          <p>appointment: {book.appointment_date}</p>
          <p>Time Slot: {findOfficeHourById(book.available_id)}</p>
          <p>Payment Method: {(book.payment_method)}</p>
          <p>payment Date: {(book.payment_date)}</p>

          

          

          <button onClick={() => handleDeleteBooking(book.id)}>Cancel Booking</button>
      </div>))}
      <p>No booking details found.</p>
    </div>
  );
};

export default CustomerPage;
