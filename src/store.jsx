import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./services/apiSlice";
import authReducer from "./services/authtoken"; // Import auth slice


const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // ✅ Include API slice reducer
    auth: authReducer, // ✅ Ensure auth reducer is added
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;