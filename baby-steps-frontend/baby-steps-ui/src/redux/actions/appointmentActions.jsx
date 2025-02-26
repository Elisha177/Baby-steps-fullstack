
import {
    FETCH_APPOINTMENTS_FAILURE,
    FETCH_APPOINTMENTS_SUCCESS,
    FETCH_APPOINTMENTS_REQUEST,
    CREATE_APPOINTMENT_FAILURE,
    CREATE_APPOINTMENT_SUCCESS,
    CREATE_APPOINTMENT_REQUEST,
    UPDATE_APPOINTMENT_FAILURE,
    UPDATE_APPOINTMENT_SUCCESS,
    UPDATE_APPOINTMENT_REQUEST,
    DELETE_APPOINTMENT_FAILURE,
    DELETE_APPOINTMENT_SUCCESS,
    DELETE_APPOINTMENT_REQUEST

} from "./types"

import api from "../../utils/api";


export const fetchAppointmentsRequest = () => ({
    type: FETCH_APPOINTMENTS_REQUEST
})

export const fetchAppointmentsSuccess = (appointments) => ({
    type: FETCH_APPOINTMENTS_SUCCESS,
    payload: appointments
})

export const fetchAppointmentsFailure = (error) => ({
    type: FETCH_APPOINTMENTS_FAILURE,
    payload: error
})


export const createAppointmentRequest = () => ({
    type: CREATE_APPOINTMENT_REQUEST
})

export const createAppointmentSuccess = (appointment) => ({
    type: CREATE_APPOINTMENT_SUCCESS,
    payload: appointment
})

export const createAppointmentFailure = (error) => ({
    type: CREATE_APPOINTMENT_FAILURE,
    payload: error
})


// Action Creators for Updating an Appointment
export const updateAppointmentRequest = () => ({
    type: UPDATE_APPOINTMENT_REQUEST,
  });

  export const updateAppointmentSuccess = (appointment) => ({
    type: UPDATE_APPOINTMENT_SUCCESS,
    payload: appointment,
  });

  export const updateAppointmentFailure = (error) => ({
    type: UPDATE_APPOINTMENT_FAILURE,
    payload: error,
  });

  // Action Creators for Deleting an Appointment
  export const deleteAppointmentRequest = () => ({
    type: DELETE_APPOINTMENT_REQUEST,
  });

  export const deleteAppointmentSuccess = (appointmentId) => ({
    type: DELETE_APPOINTMENT_SUCCESS,
    payload: appointmentId,
  });

  export const deleteAppointmentFailure = (error) => ({
    type: DELETE_APPOINTMENT_FAILURE,
    payload: error,
  });

  // Async Actions for Appointments
  export const fetchAppointments = () => async (dispatch) => {
    dispatch(fetchAppointmentsRequest());
    try {
      const response = await api.get('/appointments');
      dispatch(fetchAppointmentsSuccess(response.data));
    } catch (error) {
      dispatch(fetchAppointmentsFailure(error.message));
    }
  };

  export const createAppointment = (appointmentData) => async (dispatch) => {
    dispatch(createAppointmentRequest());
    try {
      const response = await api.post('/appointments', appointmentData);
      dispatch(createAppointmentSuccess(response.data));
    } catch (error) {
      dispatch(createAppointmentFailure(error.message));
    }
  };

  export const updateAppointment = (id, appointmentData) => async (dispatch) => {
    dispatch(updateAppointmentRequest());
    try {
      const response = await api.put(`/appointments/${id}`, appointmentData);
      dispatch(updateAppointmentSuccess(response.data));
    } catch (error) {
      dispatch(updateAppointmentFailure(error.message));
    }
  };

  export const deleteAppointment = (id) => async (dispatch) => {
    dispatch(deleteAppointmentRequest());
    try {
      await api.delete(`/appointments/${id}`);
      dispatch(deleteAppointmentSuccess(id));
    } catch (error) {
      dispatch(deleteAppointmentFailure(error.message));
    }
  };
















