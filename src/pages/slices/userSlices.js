import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
  };

  const userSlice=createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
          state.loading = true;
          state.error = null;
        },
        signInSuccess: (state, action) => {
          state.currentUser = action.payload;
          state.loading = false;
          state.error = null;
        },
        signInFailure: (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
        deleteUserSuccess: (state,action) => {
          state.data = state.data.filter(user => user._id !== action.payload);

  // Update loading and error states
  state.loading = false;
  state.error = null;
    },
  }
  })

  export const {
    signInStart,
    signInSuccess,
    signInFailure,
    deleteUserSuccess
  }=userSlice.actions

  export default userSlice.reducer;