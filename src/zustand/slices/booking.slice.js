import axios from 'axios';

const createBookingSlice=(set, get) => ({
  bookings: [],
  bookingDetails: {
    design_id: '',
    appointment_date: '',
    available_id: '',
    payment_method: '',
    payment_date: ''
  },
  // Function to update booking details
  setBookingDetails: (newDetails) => set({
    bookingDetails: { ...newDetails }
  }),

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
