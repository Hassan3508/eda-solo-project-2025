import { create } from "zustand";
import { devtools } from "zustand/middleware";
import userSlice from './slices/user.slice.js';
import designSlice from './slices/design.slice.js'
import bookingSlice from './slices/booking.slice.js'


// Combine all slices in the store:
const useStore = create(devtools((...args) => ({
  ...userSlice(...args),
  ...designSlice(...args),
  ...bookingSlice(...args),
})))



export default useStore;
