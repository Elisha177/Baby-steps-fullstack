/* eslint-disable no-unused-vars */
import React, {useState,useEffect} from 'react'
import Calendar from "react-calendar";
import {format} from "date-fns";
import 'react-calendar/dist/Calendar.css';
import api from "../utils/api"



const CalendarView = ({doctorId}) => {
  const [date, setDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      setLoading(true);
      setError(null);
      try {
        const formattedDate = format(date, 'yyyy-MM-dd');
        const response = await api.get(`/doctors/${doctorId}/slots?date=${formattedDate}`);
        setAvailableSlots(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableSlots();
  }, [doctorId, date]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-xl font-semibold mb-4 text-pink-500">Available Slots for {format(date, 'MMMM dd, yyyy')}</h2>

      <Calendar
        onChange={handleDateChange}
        value={date}
        className="w-full shadow-md rounded-md"
      />

      {loading && <p className="mt-4">Loading available slots...</p>}
      {error && <p className="mt-4 text-red-500">Error: {error}</p>}

      <div className="mt-4">
        {availableSlots.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableSlots.map((slot) => (
              <li key={slot} className="bg-pink-100 rounded-md p-2">
                {format(new Date(slot), 'hh:mm a')}
              </li>
            ))}
          </ul>
        ) : (
          <p>No available slots for this date.</p>
        )}
      </div>
    </div>
  )
}

export default CalendarView;