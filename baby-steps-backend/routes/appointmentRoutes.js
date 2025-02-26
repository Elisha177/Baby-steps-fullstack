const express = require("express");
const router = express.Router();

const {
    getAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment,
} = require("../controller/appointmentController");

router.get("/", getAppointments);
router.post("/", createAppointment);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

module.exports = router;
// Compare this snippet from baby-steps-backend/config/db.js: