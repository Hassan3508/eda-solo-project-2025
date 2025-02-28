import React, { useState, useEffect } from 'react';
import useStore from '../zustand/store'; 
import { useParams } from 'react-router-dom';
 
const BookingForm = () => {
  const setBookingDetails = useStore(state => state.setBookingDetails);
  const bookingDetails = useStore((state) => state.bookingDetails);
  const createBooking = useStore(state => state.createBooking);
  const officeHours = useStore(state => state.officeHours);
  const designs = useStore((store) => store.designs);

  const {id} = useParams();
  console.log('DESIGN ID', id);


  const [appointmentDate, setAppointmentDate] = useState('');
  const [availableId, setAvailableId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDate, setPaymentDate] = useState('');


const findDesignById = (id) => {
  // console.log('find the image for this id', id);
  return designs.find((design) => Number(design.id) === Number(id)) ;
}
  //  console.log('available slots to choose', officeHours);

  const handleSubmit = (e) => {
    e.preventDefault();
console.log('available Id', availableId);
console.log('appointmentDate', appointmentDate);
console.log('payment_method', paymentMethod);
console.log('payment date', paymentDate);
    // setBookingDetails({
    //   design_id: id, //will eventually use the 'id' from params
    //   appointment_date: appointmentDate,
    //   available_id: Number(availableId),
    //   payment_method: paymentMethod,
    //   payment_date: paymentDate,
    // });

    // console.log('booking Details', bookingDetails);

    // createBooking();
  };

  useEffect(() => {

  }, [])
  

  return (
    <div>
      <h2>Create Booking - {findDesignById(id)?.title}</h2>
      <h3>Create Booking - ${findDesignById(id)?.price}</h3>
      <img src={findDesignById(id)?.image_url} alt="design-name"/>
      <form onSubmit={handleSubmit}>
        {/* <div>
          <div>Design ID:</div>
          <input
            type="text"
            id="designId"
            value={id}
            // onChange={(e) => setDesignId(e.target.value)}
            required
          />
        </div> */}

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
          <div>Requested Time:</div>
        
            <select id='select'>
          {officeHours?.map((s) => <option onChange={() => setAvailableId(s.id)} value={s?.id}>Start: {s?.start_time} End: {s?.end_time}</option>)}
        </select>
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
