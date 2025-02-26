const Doctor = require('../models/Doctor');


// @desc    Get all doctors
// @route   GET /doctors
// @access  Public
const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

// @desc    Get doctor by ID
// @route   GET /doctors/:id
const getDoctorSlots = async (req, res) => {
    try {
        const doctorId = req.params.id;
        const date = new Date(req.query.date);
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ msg: 'Doctor not found' });
        }
        const appointments = await require('./models/Appointment').find({
            doctorId: doctorId,
            date: {
                $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
                $lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
            }
        });

        const workingHoursStart = doctor.workingHours.start;
        const workingHoursEnd = doctor.workingHours.end;
        const slotDuration = 30;
        // Function to calculate available slots
        const calculateAvailableSlots = (workingHoursStart, workingHoursEnd, slotDuration, appointments, date) => {
            const slots = [];
            let currentTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(workingHoursStart.split(':')[0]), parseInt(workingHoursStart.split(':')[1]));
            const endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(workingHoursEnd.split(':')[0]), parseInt(workingHoursEnd.split(':')[1]));

            while (currentTime < endTime) {
                const slotEnd = new Date(currentTime.getTime() + slotDuration * 60000); // Add slotDuration in milliseconds
                const isBooked = appointments.some(appointment => {
                    const appointmentStart = new Date(appointment.date);
                    const appointmentEnd = new Date(appointmentStart.getTime() + appointment.duration * 60000);

                    // Check if the current slot overlaps with the appointment
                    return (currentTime < appointmentEnd && slotEnd > appointmentStart);
                });

                if (!isBooked) {
                    slots.push(new Date(currentTime));
                }

                currentTime = new Date(currentTime.getTime() + slotDuration * 60000); // Increment currentTime by slotDuration
            }
            return slots;
        };
        const availableSlots = calculateAvailableSlots(workingHoursStart, workingHoursEnd, slotDuration, appointments, date);

        res.json(availableSlots);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}


module.exports = {getDoctors, getDoctorSlots};