import { FETCH_APPOINTMENTS_FAILURE, FETCH_APPOINTMENTS_SUCCESS, FETCH_APPOINTMENTS_REQUEST,
        CREATE_APPOINTMENT_FAILURE, CREATE_APPOINTMENT_SUCCESS, CREATE_APPOINTMENT_REQUEST,
        UPDATE_APPOINTMENT_FAILURE, UPDATE_APPOINTMENT_SUCCESS, UPDATE_APPOINTMENT_REQUEST,
        DELETE_APPOINTMENT_FAILURE, DELETE_APPOINTMENT_SUCCESS, DELETE_APPOINTMENT_REQUEST

 } from "../actions/types";

 const initialState = {
    appointments : [],
    loading: false,
    error: null
 }

 const appointmentReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_APPOINTMENTS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_APPOINTMENTS_SUCCESS:
        return {
          ...state,
          loading: false,
          appointments: action.payload,
        };
      case FETCH_APPOINTMENTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case CREATE_APPOINTMENT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case CREATE_APPOINTMENT_SUCCESS:
        return {
          ...state,
          loading: false,
          appointments: [...state.appointments, action.payload],
        };
      case CREATE_APPOINTMENT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case UPDATE_APPOINTMENT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case UPDATE_APPOINTMENT_SUCCESS:
        return {
          ...state,
          loading: false,
          appointments: state.appointments.map((appointment) =>
            appointment._id === action.payload._id ? action.payload : appointment
          ),
        };
      case UPDATE_APPOINTMENT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_APPOINTMENT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case DELETE_APPOINTMENT_SUCCESS:
        return {
          ...state,
          loading: false,
          appointments: state.appointments.filter((appointment) => appointment._id !== action.payload),
        };
      case DELETE_APPOINTMENT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };

  export default appointmentReducer;