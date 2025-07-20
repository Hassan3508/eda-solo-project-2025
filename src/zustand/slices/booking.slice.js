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
    payment_date: '',
    bookingId: null  // 🟨 Added to track the ID after creation
  },
  error: null,

  setBookingDetails: (newDetails) =>
    set((state) => ({
      bookingDetails: { ...state.bookingDetails, ...newDetails }
    })),

  fetchOfficeHours: async () => {
    try {
      const response = await axios.get('/api/office-hours');
      set({ officeHours: response.data });
    } catch (error) {
      console.error('Error fetching office hours:', error);
    }
  },

  fetchCustomerBookings: async () => {
    try {
      const response = await axios.get('/api/bookings', {
        withCredentials: true
      });
      set({ customerBookings: response.data });
    } catch (error) {
      console.error('Error fetching customer bookings:', error);
    }
  },

  fetchBookings: async () => {
    try {
      const response = await axios.get('/api/bookings/admin', {
        withCredentials: true
      });
      set({ bookings: response.data });
    } catch (error) {
      console.error('Error fetching bookings:', error);
      set({ error: 'Failed to fetch bookings. Please try again later.' });
    }
  },

  createBooking: async () => {
    const { bookingDetails } = get();
    console.log('bookingdetails', bookingDetails);

    try {
      const response = await axios.post('/api/bookings', bookingDetails, {
        withCredentials: true
      });

      set((state) => ({
        bookingDetails: {
          ...state.bookingDetails,
          bookingId: response.data.booking?.id || null
        },
        error: null
      }));

      await get().fetchCustomerBookings();
    } catch (error) {
      if (error.response?.status === 409) {
        alert(error.response.data.message); // Handle slot conflict
      } else {
        console.error('Error creating booking:', error);
        set({ error: 'Failed to create booking. Please try again later.' });
      }
    }
  },

  deleteBooking: async (id) => {
    try {
      await axios.delete(`/api/bookings/admin/${id}`, {
        withCredentials: true
      });
      await get().fetchBookings();
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  },

  confirmBooking: async (bookingId) => {
    try {
      await axios.put(`/api/bookings/confirm/${bookingId}`, {}, {
        withCredentials: true
      });
      console.log('Booking confirmed');
      await get().fetchBookings();
    } catch (error) {
      console.error('Error confirming booking:', error);
    }
  },

  cancelBooking: async (bookingId) => {
    try {
      const response = await axios.put(`/api/bookings/cancel/${bookingId}`, {}, {
        withCredentials: true
      });
      console.log('Booking cancel:', response.data);
      await get().fetchCustomerBookings();
    } catch (error) {
      console.error('Error cancel booking:', error);
    }
  }
});

export default createBookingSlice;
