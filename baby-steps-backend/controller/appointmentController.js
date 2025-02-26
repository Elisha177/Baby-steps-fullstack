const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const { format, parseISO } = require('date-fns');


// @desc    Get all appointments
// @route   GET /appointments
// @access  Public
const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('doctorId', 'name workingHours');
        res.json(appointments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get appointment by ID
// @route   GET /appointments/:id
// @access  Public
const getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id).populate('doctorId', 'name workingHours');

        if (!appointment) {
            return res.status(404).json({ msg: 'Appointment not found' });
        }

        res.json(appointment);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Appointment not found' });
        }
        res.status(500).send('Server Error');
    }
};

// @desc    Create a new appointment
// @route   POST /appointments
// @access  Public
const createAppointment = async (req, res) => {
    try {
        const { doctorId, date, duration, appointmentType, patientName, notes } = req.body;

        // Validate inputs
        if (!doctorId || !date || !duration || !appointmentType || !patientName) {
            return res.status(400).json({ msg: 'Please provide all required fields' });
        }

        // Check if the doctor exists
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ msg: 'Doctor not found' });
        }

        // Convert the input date to a Date object
        const appointmentDate = new Date(date);

        // Check for overlapping appointments
        const overlappingAppointments = await Appointment.find({
            doctorId: doctorId,
            date: {
                $lt: new Date(appointmentDate.getTime() + duration * 60000), // Appointment end time
                $gte: appointmentDate, // Appointment start time
            },
        });

        if (overlappingAppointments.length > 0) {
            return res.status(400).json({ msg: 'The selected time slot is not available' });
        }

        // Create a new appointment
        const newAppointment = new Appointment({
            doctorId,
            date: appointmentDate,
            duration,
            appointmentType,
            patientName,
            notes,
        });

        const appointment = await newAppointment.save();
        res.status(201).json(appointment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// @desc    Update an existing appointment
// @route   PUT /appointments/:id
// @access  Public
const updateAppointment = async (req, res) => {
    try {
        const { doctorId, date, duration, appointmentType, patientName, notes } = req.body;

        // Validate inputs
        if (!doctorId || !date || !duration || !appointmentType || !patientName) {
            return res.status(400).json({ msg: 'Please provide all required fields' });
        }

        // Check if the doctor exists
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ msg: 'Doctor not found' });
        }

        // Convert the input date to a Date object
        const appointmentDate = new Date(date);

        // Check for overlapping appointments, excluding the current appointment
        const overlappingAppointments = await Appointment.find({
            _id: { $ne: req.params.id }, // Exclude the current appointment
            doctorId: doctorId,
            date: {
                $lt: new Date(appointmentDate.getTime() + duration * 60000), // Appointment end time
                $gte: appointmentDate, // Appointment start time
            },
        });

        if (overlappingAppointments.length > 0) {
            return res.status(400).json({ msg: 'The selected time slot is not available' });
        }

        // Find the appointment by ID
        let appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ msg: 'Appointment not found' });
        }

        // Update the appointment
        appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            {
                doctorId,
                date: appointmentDate,
                duration,
                appointmentType,
                patientName,
                notes,
            },
            { new: true }
        );

        res.json(appointment);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Appointment not found' });
        }
        res.status(500).send('Server Error');
    }
};


// @desc    Delete an appointment
// @route   DELETE /appointments/:id
// @access  Public
const deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ msg: 'Appointment not found' });
        }

        await appointment.remove();

        res.json({ msg: 'Appointment removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Appointment not found' });
        }
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getAppointments,
    getAppointmentById,
    createAppointment,
    updateAppointment,
    deleteAppointment
};