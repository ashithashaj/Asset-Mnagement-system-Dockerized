import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import assetsReducer from "../features/assetsSlice";

import ticketsReducer from "../features/ticketsSlice";
import inventoryReducer from "../features/inventorySlice";

// store.js
const store = configureStore({
  reducer: {
    auth: authReducer,
    assets: assetsReducer,
    
    tickets: ticketsReducer,
    inventory: inventoryReducer,
  },
});

export default store; // ✅ default export
