const express = require('express');
const router = express.Router();

const { getDoctors, getDoctorSlots } = require('../controller/doctorController');

router.get('/', getDoctors);
router.get('/:id', getDoctorSlots);

module.exports = router;
// Compare this snippet from baby-steps-backend/routes/appointmentRoutes.js: