import axios from "axios"; 

const createDesignSlice = (set, get) => ({
    designs: [],

    // fetch designs from the server
    fetchDesigns: async () => {
        try {
            const response = await axios.get('api/designs');
            set({ designs: response.data });
        } catch (error) {
            console.log('Error fetching designs:', error); 
        }
    },
    addDesign: async (newDesign) => {
        try {
            await axios.post('/api/designs', newDesign);
            // Refresh data
            get().fetchDesigns();
        } catch (error) {
            console.error('Error adding designs:', error);
        }
    }
    
});

export default createDesignSlice;