import React, { useEffect } from 'react';
import useStore from '../zustand/store';
import { useNavigate } from 'react-router-dom';


const DesignList = () => {
//   const { designs, fetchDesigns } = useDesignStore();
const designs = useStore((store) => store.designs);
console.log('designs', designs);
const fetchDesigns = useStore((store) => store.fetchDesigns);
//need to navigate to the bookingForm component with the design id
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
        designs?.map((design) => (
          <div key={design.id} onClick={() => {
            handleDesign(design.id)
          }}>
            <h2>{design.title}</h2>
            <img src={design.image_url} alt={design.title} />
            <p>{design.description}</p>
            <p>{design.price}</p>
          </div>
        ))
      ) : (
        <p>No designs available</p>
      )}
    </div>
  );
};

export default DesignList;
