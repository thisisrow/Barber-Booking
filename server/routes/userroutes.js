const express = require("express");
const { createBooking, deleteBooking,getAllBookings,deleteAdminBooking } = require("../controller/usercontrollers");

const router = express.Router();


router.post("/booking", createBooking);
router.delete("/deleting", deleteBooking);
router.delete("/admin", deleteAdminBooking); 
router.get("/alluser",getAllBookings);


module.exports = router;
