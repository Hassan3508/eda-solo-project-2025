import React, { useEffect } from 'react';  
import useStore from '../zustand/store';
import { useNavigate} from 'react-router-dom';
import { Button, Card, Row, Col, Container } from 'react-bootstrap';

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
      <Container>
        <h1 className="my-4">Booking Details</h1>
        {customerBookings?.filter((b) => !b.booking_cancel).length > 0 ? (
          <Row>
            {customerBookings?.filter((b) => !b.booking_cancel).map((book) => (
              <Col key={book.id} sm={12} md={6} lg={4} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>Booking ID: {book.id}</Card.Title>
                    <Card.Text>
                      <strong>Design:</strong> {findDesignById(book.design_id)?.title}
                    </Card.Text>
                    <Card.Text>
                      <strong>Appointment Date:</strong> {book.appointment_date}
                    </Card.Text>
                    <Card.Text>
                      <strong>Time Slot:</strong> {findOfficeHourById(book.available_id)}
                    </Card.Text>
                    <Card.Text>
                      <strong>Payment Method:</strong> {book.payment_method}
                    </Card.Text>
                    <Card.Text>
                      <strong>Payment Date:</strong> {book.payment_date}
                    </Card.Text>
                    <Button variant="danger" onClick={() => handleDeleteBooking(book.id)}>
                      Cancel Booking
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <p>No booking details found.</p>
        )}
      </Container>
    );
  };
  
  export default CustomerPage;