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

        // Destructuring method
        const newDesign = {
            title,
            imageUrl,
            price,
            description,
        };

        addDesign(newDesign);

        // Clear form for admin
        setTitle('');
        setImageUrl('');
        setPrice('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="imageUrl">Image URL:</label>
                <input
                    type="text"
                    id="imageUrl"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>

            <button type="submit">
                Add Design
            </button>
        </form>
    );
};

export default DesignForm;
