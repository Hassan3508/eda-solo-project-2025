import axios from 'axios';

const createBookingSlice=(set, get) => ({
  bookings: [],  // For the admin: stores all bookings
  customerBookings: [], //For the customer: stores only the customer's bookings
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
      await axios.post('/api/bookings', bookingDetails);
      
    } catch (error) {
      console.error('Error creating booking:', error);
      
    }
  },

// function to delete booking for admin
deleteBooking: async (id) => {
  try {
    await axios.delete(`/api/bookings/admin/${id}`);
    // After deletion, fetch bookings again to update the list
    await get().fetchBookings();
  } catch (error) {
    console.error('Error deleting booking:', error);
  }
},

// Function to delete a customer's booking
deleteCustomerBooking: async (id) => {
  try {
    await axios.delete(`/api/bookings/${id}`); 
    const { customerBookings } = get();
    set({ customerBookings: customerBookings.filter((booking) => booking.id !== id) });
  } catch (error) {
    console.error('Error deleting booking:', error);
  }
},

// Function to confirm a booking (Admin Only)
confirmBooking: async (bookingId) => {
  try {
    const response = await axios.put(`/api/bookings/confirm/${bookingId}`);
    console.log('Booking confirmed:', response.data);

    // Refetch the bookings to ensure the data is up to date
    await get().fetchBookings(); 

  } catch (error) {
    console.error('Error confirming booking:', error);
  }
},
 // Function to toggle booking confirmation status
 toggleBookingConfirmation: (id) => {
  set((state) => {
    const updatedBookings = state.bookings.map((booking) =>
      booking.id === id ? { ...booking, isConfirmed: !booking.isConfirmed } : booking
    );
    return { bookings: updatedBookings };
  });
}
});

export default createBookingSlice;
