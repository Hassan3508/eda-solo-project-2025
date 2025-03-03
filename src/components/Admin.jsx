import React from "react";
import { useEffect } from "react";
import useStore from '../zustand/store'

const Admin = () => {
    const bookings = useStore((state) => state.bookings);
    const officeHours = useStore((state) => state.officeHours)
    const designs = useStore((state) => state.designs)
    const fetchDesigns = useStore((store) => store.fetchDesigns);
    const fetchBookings = useStore((state) => state.fetchBookings);

    console.log('all the bookings', bookings);
    console.log('all the designs', designs);

    const findOfficeHourById = (availableId) => {
      console.log('find this availableId in the office hours', availableId);
      //return an object {start: '', end:''};
      const myFoundOfficeHour = officeHours.find((a) => Number(a.id) === Number(availableId));
      return `${myFoundOfficeHour.start_time} - ${myFoundOfficeHour.end_time}`;
    }

    const findDesignById = (designId) => {
      console.log('find design by id', designId);
      //return an object {start: '', end:''};
      const myDesign = designs.find((d) => Number(d.id) === Number(designId));
      console.log('my Design', myDesign);
      return myDesign.title;
    }
  

    useEffect(() => {
        fetchBookings();
        fetchDesigns();
    }, [])

    return (
        <div>
          <h1>All Booking Details</h1>
          {bookings.length > 0 ? (
            <div>
              {bookings.map((booking, index) => (
                <div key={index}>
                  <h2>bookingDetails ID: {booking.id}</h2>
                  <p>Design: {findDesignById(booking.design_id)}</p>
                  <p>Appointment Date: {booking.appointment_date}</p>
                  <p>Time Slot: {findOfficeHourById(booking.available_id)}</p>
                  <p>Payment Method: {booking.payment_method}</p>
                  <p>Payment Date: {booking.payment_date}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No bookings available.</p>
          )}
        </div>
      );
    };
    
    export default Admin;