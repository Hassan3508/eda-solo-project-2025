import { create } from "zustand";
import userSlice from './slices/user.slice.js';
import designSlice from './slices/design.slice.js'


// Combine all slices in the store:
const useStore = create((...args) => ({
  ...userSlice(...args),
  ...designSlice(...args),
}))



export default useStore;
