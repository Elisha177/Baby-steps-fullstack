
import { FETCH_DOCTORS_REQUEST,FETCH_DOCTORS_FAILURE, FETCH_DOCTORS_SUCCESS } from "./types"

import api from "../../utils/api"


export const fetchDoctorsRequest = () => ({
    type : FETCH_DOCTORS_REQUEST
})

export const fetchDoctorsSuccess = (doctors) => ({
    type: FETCH_DOCTORS_SUCCESS,
    payload: doctors
})

export const fetchDoctorsFailure = (error) => ({
    type: FETCH_DOCTORS_FAILURE,
    payload: error
})


export const fetchDoctors = () => {
    return async (dispatch) => {
        dispatch(fetchDoctorsRequest());
        try{
            const response = await api.get('/doctors');
            const doctors = response.data;
            dispatch(fetchDoctorsSuccess(doctors));
        }catch(error){
            const errorMsg = error.message;
            dispatch(fetchDoctorsFailure(errorMsg));

        }
    }
}








