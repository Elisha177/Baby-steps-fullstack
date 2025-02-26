import { updateAppointment } from "../redux/actions/appointmentActions";
import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";


const EditAppointmentForm = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [patientName, setPatientName] = useState('');
    const [appointmentType, setAppointmentType] = useState('');
    const [date, setDate] = useState('');
    const [duration, setDuration] = useState(30);
    const [notes, setNotes] = useState('');
    const [doctorId, setDoctorId] = useState('');

    const appointments = useSelector((state) => state.appointments.appointments); // Access appointments from Redux store
    const [currentAppointment, setCurrentAppointment] = useState(null);

    useEffect(() => {
        const fetchAppointment = async (id) => {
            try {
                const response = await api.get(`/appointments/${id}`);
                setCurrentAppointment(response.data);
                setPatientName(response.data.patientName);
                setAppointmentType(response.data.appointmentType);
                setDate(format(new Date(response.data.date), 'yyyy-MM-ddTHH:mm')); // Format date for input
                setDuration(response.data.duration);
                setNotes(response.data.notes);
                setDoctorId(response.data.doctorId);

            } catch (error) {
                console.error('Error fetching appointment:', error);
            }
        };

        if (id) {
            fetchAppointment(id);
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!currentAppointment) {
            return;
        }

        const appointmentData = {
            doctorId: doctorId, // Ensure you have the doctorId
            date: date,
            duration: duration,
            appointmentType: appointmentType,
            patientName: patientName,
            notes: notes,
        };

        dispatch(updateAppointment(id, appointmentData));
        navigate('/appointments'); // Redirect to appointment list after editing
    };

    if (!currentAppointment) {
        return <p>Loading appointment details...</p>;
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4 text-pink-500">Edit Appointment</h1>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <div className="mb-4">
                    <label htmlFor="patientName" className="block text-gray-700 text-sm font-bold mb-2">
                        Patient Name:
                    </label>
                    <input
                        type="text"
                        id="patientName"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="appointmentType" className="block text-gray-700 text-sm font-bold mb-2">
                        Appointment Type:
                    </label>
                    <input
                        type="text"
                        id="appointmentType"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={appointmentType}
                        onChange={(e) => setAppointmentType(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">
                        Date and Time:
                    </label>
                    <input
                        type="datetime-local"
                        id="date"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="notes" className="block text-gray-700 text-sm font-bold mb-2">
                        Notes:
                    </label>
                    <textarea
                        id="notes"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Update Appointment
                    </button>
                    <button onClick={() => navigate('/appointments')} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );


}


export default EditAppointmentForm