// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   token: localStorage.getItem("allopstoken") || null, // Retrieve token from localStorage
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setToken: (state, action) => {
//       console.log("Payload:", action?.payload);
//       state.token = action?.payload;
//       localStorage.setItem("allopstoken", action?.payload); // Persist token in localStorage
//       console.log("Updated Token:", state.token);
//     },
//     clearToken: (state) => {
//       state.token = null;
//       localStorage.removeItem("allopstoken"); // Remove token from localStorage
//     },
//   },
// });


// export const { setToken, clearToken } = authSlice.actions;
// export default authSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";

const isBrowser = typeof window !== "undefined";


const initialState = {
  token: isBrowser ? localStorage.getItem("allopstoken") : null,
};



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      const token = action?.payload;
      state.token = token;

      if (isBrowser && token) {
        localStorage.setItem("allopstoken", token);
        console.log("✅ Token stored in localStorage:", token);
      }
    },
    clearToken: (state) => {
      state.token = null;

      if (isBrowser) {
        localStorage.removeItem("allopstoken");
        console.log("🚫 Token removed from localStorage");
      }
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
