import {configureStore} from "@reduxjs/toolkit";
import recordsReducer from "./reducer";

export const store = configureStore({
  reducer: recordsReducer
});