import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import patentReducer from "./slices/patentSlice";
import uiReducer from "./slices/uiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,       // → state.auth
    patents: patentReducer,  // → state.patents
    ui: uiReducer,           // → state.ui
  },
});

export default store;