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

  // deleteBooking: async (id) => {
  //   try {
  //     await axios.delete(`/api/bookings/${id}`);
  //     // After deletion, fetch bookings again to update the list
  //     await get().fetchBookings();
  //   } catch (error) {
  //     console.error('Error deleting booking:', error);
  //   }
  // },
  
    // deleteCustomerBooking: async (id) => {
    //   try {
    //     await axios.delete(`/api/bookings/${id}`);
    //     await get().fetchCustomerBookings();
    //   } catch (error) {
    //     console.error('Error deleting booking:', error);
    //   }
    // }
})


  



export default createBookingSlice;
