import axios from 'axios';

const createBookingSlice = (set, get) => ({
  bookings: [],  // For the admin: stores all bookings
  customerBookings: [], // For the customer: stores only the customer's bookings
  officeHours: [],
  bookingDetails: {
    design_id: '',
    appointment_date: '',
    requested_time: '', 
    available_id: '',
    payment_method: '',
    payment_date: ''
  },
  error: null,

  // Function to update booking details
  setBookingDetails: (newDetails) => set((state) => ({
    bookingDetails: { ...state.bookingDetails, ...newDetails }
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

  // Fetch bookings for customers
  fetchCustomerBookings: async () => {
    try {
      const response = await axios.get('/api/bookings');
      set({ customerBookings: response.data });
    } catch (error) {
      console.log('Error:', error); 
    }
  },

  // Fetch bookings for admin
  fetchBookings: async () => {
    try {
      const response = await axios.get('/api/bookings/admin');
      set({ bookings: response.data });
    } catch (error) {
      console.log('Error:', error);
      set({ error: 'Failed to fetch bookings. Please try again later.' });
    }
  },

  // Function to create a booking
  createBooking: async () => {
    const { bookingDetails } = get();
    console.log('bookingdetails', bookingDetails);

    try {
      const response = await axios.post('/api/bookings', bookingDetails);
      set((state) => ({
        bookingDetails: { ...state.bookingDetails, bookingId: response.data.id }
      }));
      await get().fetchCustomerBookings();
    } catch (error) {
      console.error('Error creating booking:', error);
      set({ error: 'Failed to create booking. Please try again later.' });
    }
  },

  // Function to delete booking for admin
  deleteBooking: async (id) => {
    try {
      await axios.delete(`/api/bookings/admin/${id}`);
      await get().fetchBookings();
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  },

  // Function to confirm a booking (Admin Only)
  confirmBooking: async (bookingId) => {
    try {
      await axios.put(`/api/bookings/confirm/${bookingId}`);
      console.log('Booking confirmed:');
      await get().fetchBookings(); 
    } catch (error) {
      console.error('Error confirming booking:', error);
    }
  },

  // Function to cancel a booking
  cancelBooking: async (bookingId) => {
    try {
      const response = await axios.put(`/api/bookings/cancel/${bookingId}`);
      console.log('Booking cancel:', response.data);
      await get().fetchCustomerBookings(); 
    } catch (error) {
      console.error('Error cancel booking:', error);
    }
  }
});

export default createBookingSlice;