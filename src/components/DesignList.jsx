import React, { useEffect } from 'react';
// import useDesignStore from './store';
import useStore from '../zustand/store';

const DesignList = () => {
//   const { designs, fetchDesigns } = useDesignStore();
const designs = useStore((store) => store.designs);
const fetchDesigns = useStore((store) => store.fetchDesigns);
  
  useEffect(() => {
    fetchDesigns();
  }, [fetchDesigns]);

  return (
    <div>
      <h1>Designs</h1>
      {designs?.length > 0 ? (
        designs?.map((design) => (
          <div key={design.id}>
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
