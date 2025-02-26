/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import { createAppointment } from '../redux/actions/appointmentActions';
import { format } from 'date-fns';

const BookingForm = () => {
    const [patientName, setPatientName] = useState('');
    const [appointmentType, setAppointmentType] = useState('');
    const [notes, setNotes] = useState('');
    const dispatch = useDispatch();
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const appointmentData = {
        doctorId: doctorId,
        date: selectedSlot,
        duration: 30, // Or get duration from a form field
        appointmentType: appointmentType,
        patientName: patientName,
        notes: notes,
      };
  
      dispatch(createAppointment(appointmentData));
      onClose(); // Close the form after submission
    };
  
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex items-center justify-center">
        <div className="bg-white p-8 rounded-md shadow-md w-96">
          <h2 className="text-xl font-semibold mb-4 text-pink-600">Book Appointment</h2>
          <p className="mb-2">Doctor ID: {doctorId}</p>
          <p className="mb-2">Time: {format(selectedSlot, 'MMMM dd, yyyy hh:mm a')}</p>
  
          <form onSubmit={handleSubmit}>
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
                className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Book
              </button>
              <button
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default BookingForm