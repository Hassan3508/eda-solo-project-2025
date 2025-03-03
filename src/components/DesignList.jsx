import React, { useEffect } from 'react';
import useStore from '../zustand/store';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';
import './DesignList.css';

const DesignList = () => {
  const designs = useStore((store) => store.designs);
  const fetchDesigns = useStore((store) => store.fetchDesigns);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDesigns();
  }, [fetchDesigns]);

  const handleDesign = (id) => {
    navigate(`/bookingForm/${id}`);
  };

  return (
    <div>
      <h1>Designs</h1>
      {designs?.length > 0 ? (
        <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
          {designs.map((design) => (
            <Col key={design.id}>
              <Card onClick={() => handleDesign(design.id)} style={{ cursor: 'pointer' }}>
                <Card.Img variant="top" src={design.image_url} alt={design.title} />
                <Card.Body>
                  <Card.Title>{design.title}</Card.Title>
                  <Card.Text>{design.description}</Card.Text>
                  <Card.Text><strong>Price: </strong>{design.price}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p>No designs available</p>
      )}
    </div>
  );
};

export default DesignList;
