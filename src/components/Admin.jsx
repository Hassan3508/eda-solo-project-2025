import React, { useEffect } from "react";
import useStore from '../zustand/store';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import moment from "moment";

const Admin = () => {
  const bookings = useStore((state) => state.bookings);
  const officeHours = useStore((state) => state.officeHours);
  const fetchOfficeHours = useStore((state) => state.fetchOfficeHours);
  const designs = useStore((state) => state.designs);
  const fetchDesigns = useStore((store) => store.fetchDesigns);
  const fetchBookings = useStore((state) => state.fetchBookings);
  const deleteBooking = useStore((state) => state.deleteBooking); 
  const confirmBooking = useStore((state) => state.confirmBooking);
 

  

 const findOfficeHourById = (availableId) => {
    const myFoundOfficeHour = officeHours.find((a) => Number(a.id) === Number(availableId));
    return `${myFoundOfficeHour.start_time} - ${myFoundOfficeHour.end_time}`;
  };

  const findDesignById = (designId) => {
    const myDesign = designs.find((d) => Number(d.id) === Number(designId));
    return myDesign ? myDesign.title : 'Unknown Design';
  };

  useEffect(() => {
    fetchBookings();  
    fetchDesigns();  
    fetchOfficeHours(); 
  }, []);

  const handleDeleteBooking = (id) => {
    deleteBooking(id);
  };

  const handleToggleBookingConfirmation = (id) => {
    confirmBooking(id); 
  };

  console.log('bookings on ADMIN PAGe', bookings);
  return (
    <Container className="my-4">
      <h1>All Booking Details</h1>
      {bookings.length > 0 ? (
        <Row>
          {bookings.map((booking, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Text>
                    <strong>Design:</strong> {findDesignById(booking.design_id)}
                  </Card.Text>
                  <Card.Text>
                    <strong>Appointment Date:</strong> {moment(booking.appointment_date).format('MMMM Do YYYY')}
                  </Card.Text>
                  <Card.Text>
                    <strong>Time Slot:</strong> {findOfficeHourById(booking.available_id)}
                  </Card.Text>
                  <Card.Text>
                    <strong>Payment Method:</strong> {booking.payment_method}
                  </Card.Text>
                  <Card.Text>
                    <strong>Payment Date:</strong>  {moment(booking.payment_date).format('MMMM Do YYYY')}
                  </Card.Text>
                  {booking.booking_cancel && <Card.Text>
                    <strong>Cancel:</strong> {booking.booking_cancel ? 'Yes' : 'No'}
                  </Card.Text>}
                  <div className="d-flex flex-column flex-sm-row justify-content-between">
                    <Button
                      variant={booking.confirm ? 'danger' : 'success'}
                      onClick={() => handleToggleBookingConfirmation(booking.id)}
                      className="mb-2 mb-sm-0 mr-sm-2 w-100 w-sm-auto"
                    >
                      {booking.confirm ? 'Unconfirm' : 'Confirm'}
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => handleDeleteBooking(booking.id)}  
                      className="w-100 w-sm-auto"
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p>No bookings available.</p>
      )}
    </Container>
  );
};

export default Admin;
