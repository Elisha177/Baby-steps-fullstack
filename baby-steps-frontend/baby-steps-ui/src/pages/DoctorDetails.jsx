/* eslint-disable no-unused-vars */
import CalendarView from "../components/CalendarView";
import BookingForm from "../components/BookingForm";
import { useParams } from "react-router-dom";
import React ,{ useState } from "react";

const DoctorDetails = () => {

    const {doctorId} = useParams();
    const [selectedSlot, setSelectedSlot] = useState(null);
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setIsBookingFormOpen(true);
  };

  const handleBookingFormClose = () => {
    setIsBookingFormOpen(false);
    setSelectedSlot(null);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4 text-pink-500">Doctor Details</h1>

      {/* Doctor Details (Fetch from API based on doctorId) */}
      {doctorId && <CalendarView doctorId={doctorId} />}

      {selectedSlot && (
        <button
          className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
          onClick={() => handleSlotSelect(selectedSlot)}
        >
          Book Appointment
        </button>
      )}

      {isBookingFormOpen && selectedSlot && (
        <BookingForm
          doctorId={doctorId || ""} // Ensure doctorId is not undefined
          selectedSlot={selectedSlot}
          onClose={handleBookingFormClose}
        />
      )}
    </div>
  );

}


export default DoctorDetails