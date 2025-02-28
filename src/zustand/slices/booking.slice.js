import axios from 'axios';

const createBookingSlice=(set, get) => ({
  bookings: [],
  officeHours: [],
  bookingDetails: {
    design_id: '',
    appointment_date: '',
    available_id: '',
    payment_method: '',
    payment_date: ''
  },
  // Function to update booking details
  setBookingDetails: (newDetails) => set((state) => ({
    bookingDetails: {...state.bookingDetails, ...newDetails}
})),
  // Fetch Office Hours
fetchOfficeHours: async () => {
  try {
    const response = await axios.get('/api/office-hours');
    set({ officeHours: response.data });
  } catch (error) {
    console.log('Error:', error); 
  }
},


  // Function to create a booking
  createBooking: async () => {
    const { bookingDetails } = get();

    try {
      await axios.post('/api/bookings', bookingDetails);
      
    } catch (error) {
      console.error('Error creating booking:', error);
      
    }
  }
})

export default createBookingSlice;
