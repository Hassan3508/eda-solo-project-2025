import React, { useState } from "react";
import useStore from '../zustand/store';  

const DesignForm = () => {
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const addDesign = useStore((state) => state.addDesign);  
    const handleSubmit = (e) => {
        e.preventDefault();

        // destructing method
        const newDesign = {
            title,
            imageUrl,
            price,
            description,
        };

        addDesign(newDesign);
        // clear form for admin
        setTitle('');
        setImageUrl('');
        setPrice('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Image URL:</label>
                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Price:</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Design</button>
        </form>
    );
};

export default DesignForm;
