import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import useStore from '../zustand/store';

const BookingForm = () => {
  const setBookingDetails = useStore(state => state.setBookingDetails);
  const createBooking = useStore(state => state.createBooking);
  const officeHours = useStore(state => state.officeHours);
  const designs = useStore(store => store.designs);

  const navigate = useNavigate();
  const { id } = useParams();

  const [appointmentDate, setAppointmentDate] = useState('');
  const [availableId, setAvailableId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [requestedTime, setRequestedTime] = useState('');

  const findDesignById = (id) => {
    return designs.find((design) => Number(design.id) === Number(id));
  };

  const handleTimeChange = (e) => {
    setAvailableId(e.target.value);
    const selected = officeHours.find(s => String(s.id) === e.target.value);
    setRequestedTime(selected ? `${selected.start_time} - ${selected.end_time}` : '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setBookingDetails({
      design_id: id,
      appointment_date: appointmentDate,
      available_id: Number(availableId),
      payment_method: paymentMethod,
      payment_date: paymentDate,
      requested_time: requestedTime,
    });

    createBooking();
    navigate(`/customer`);
  };

  return (
    <Container className="d-flex justify-content-center py-4">
      <Row className="w-100">
        <Col xs={12} sm={12} md={8} lg={6} className="mx-auto">
          <div className="p-3" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <h4 className='text-center mb-4 black-text'>Create Booking</h4>
            <div className="text-center mb-3 black-text">
              <h5>{findDesignById(id)?.title}</h5>
              <p>Price: ${findDesignById(id)?.price}</p>
              <div style={{ maxWidth: '250px', margin: '0 auto' }}>
                <img
                  src={findDesignById(id)?.image_url}
                  alt={findDesignById(id)?.title}
                  style={{
                    maxWidth: '100%', 
                    height: 'auto',
                    objectFit: 'contain',
                    borderRadius: '8px',
                  }}
                />
              </div>
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="appointmentDate" className="mb-3">
                <Form.Label style={{color: 'black'}}>Appointment Date</Form.Label>
                <Form.Control
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="availableId" className="mb-3">
                <Form.Label style={{color: 'black'}}>Requested Time</Form.Label>
                <Form.Select
                  value={availableId}
                  onChange={handleTimeChange}
                  required
                >
                  <option value="">Select a time slot</option>
                  {officeHours?.map((s) => (
                    <option key={s.id} value={s.id}>
                      Start: {s.start_time} End: {s.end_time}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="paymentMethod" className="mb-3">
                <Form.Label style={{color: 'black'}}>Payment Method</Form.Label>
                <Form.Select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required
                >
                  <option value="">Select a payment method</option>
                  <option value="credit card">Credit Card</option>
                  <option value="debit">Debit</option>
                  <option value="cash">Cash</option>
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="paymentDate" className="mb-3">
                <Form.Label style={{color: 'black'}}>Payment Date</Form.Label>
                <Form.Control
                  type="date"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Submit Booking
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BookingForm;