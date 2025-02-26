/* /* eslint-disable no-undef */
/* import { configureStore } from '@reduxjs/toolkit';
import {thunkMiddleware} from 'redux-thunk'; // Correct import
import doctorReducer from './reducers/doctorReducer';
import appointmentReducer from './reducers/appointmentReducer';

const store = configureStore({
    reducer: {
        doctors: doctorReducer,
        appointments: appointmentReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(thunkMiddleware), // Ensure thunk is included
});

export default store; */
// Compare this snippet from baby-steps-frontend/baby-steps-ui/src/redux/actions/types.js: */