import { configureStore } from "@reduxjs/toolkit";
import patientsReducer from "./slices/PatientsSlice";
import doctorsReducer  from "./slices/DoctorosSliceAdmin";
import patientsAdminReducre from './slices/PatientsAdminSlice'
import transactionsReducer from './slices/FinincialSlice'

export const store = configureStore({
  reducer: {
    patients: patientsReducer,
    doctors:doctorsReducer,
    adminPatients : patientsAdminReducre,
    transations : transactionsReducer,
  },
});

// types for useSelector & useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
