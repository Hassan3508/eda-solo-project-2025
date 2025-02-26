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
    }
});

export default createDesignSlice;
