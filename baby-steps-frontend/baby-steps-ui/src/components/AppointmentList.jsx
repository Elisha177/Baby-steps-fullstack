/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAppointments, deleteAppointment } from "../redux/actions/appointmentActions";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const AppointmentList = () => {
    const dispatch = useDispatch();
    const { appointments, loading, error } = useSelector(state => state.appointment);

    useEffect(() => {
        dispatch(fetchAppointments());
    }, [dispatch])


    const handleDelete = (id) => {
        dispatch(deleteAppointment(id));
    }


    if (loading) {
        return <p>Loading appointments...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }



    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4 text-pink-500">Your Appointments</h1>
            {appointments.length === 0 ? (
                <p>No appointments scheduled.</p>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {appointments.map((appointment) => (
                        <li key={appointment._id} className="py-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-lg font-semibold text-pink-600">{appointment.patientName}</p>
                                    <p className="text-gray-600">
                                        {format(new Date(appointment.date), 'MMMM dd, yyyy hh:mm a')} - {appointment.appointmentType}
                                    </p>
                                    {/* Add more appointment details here */}
                                </div>
                                <div className="flex space-x-2">
                                    <Link to={`/edit-appointment/${appointment._id}`} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline">
                                        Edit
                                    </Link>
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
                                        onClick={() => handleDelete(appointment._id)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );





}

export default AppointmentList;