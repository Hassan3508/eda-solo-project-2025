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

  const findDesignById = (id) => {
    return designs.find((design) => Number(design.id) === Number(id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setBookingDetails({
      design_id: id,
      appointment_date: appointmentDate,
      available_id: Number(availableId),
      payment_method: paymentMethod,
      payment_date: paymentDate,
    });

    createBooking();
    navigate(`/customer`);
  };

  return (
    <Container className="d-flex justify-content-center py-4">
      <Row className="w-100">
        <Col xs={12} sm={12} md={8} lg={6} className="mx-auto">
          <div className="p-3" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <h4 className="text-center mb-4">Create Booking</h4>
            <div className="text-center mb-3">
              <h5>{findDesignById(id)?.title}</h5>
              <p>Price: ${findDesignById(id)?.price}</p>

              {/* Image Wrapper - Make the card smaller */}
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
              {/* Appointment Date */}
              <Form.Group controlId="appointmentDate" className="mb-3">
                <Form.Label>Appointment Date</Form.Label>
                <Form.Control
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  required
                />
              </Form.Group>

              {/* Requested Time */}
              <Form.Group controlId="availableId" className="mb-3">
                <Form.Label>Requested Time</Form.Label>
                <Form.Control
                  as="select"
                  value={availableId}
                  onChange={(e) => setAvailableId(e.target.value)}
                  required
                >
                  {officeHours?.map((s) => (
                    <option key={s.id} value={s.id}>
                      Start: {s.start_time} End: {s.end_time}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              {/* Payment Method */}
              <Form.Group controlId="paymentMethod" className="mb-3">
                <Form.Label>Payment Method</Form.Label>
                <Form.Control
                  as="select"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required
                >
                  <option value="">Select a payment method</option>
                  <option value="credit card">Credit Card</option>
                  <option value="debit">Debit</option>
                  <option value="cash">Cash</option>
                </Form.Control>
              </Form.Group>

              {/* Payment Date */}
              <Form.Group controlId="paymentDate" className="mb-3">
                <Form.Label>Payment Date</Form.Label>
                <Form.Control
                  type="date"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  required
                />
              </Form.Group>

              {/* Submit Button */}
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
