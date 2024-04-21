const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  DeleteAllNotificationController,
  getAllDoctorsController,
  bookAppointmentController,
  bookingAvaibilityController,
  userAppointmentsController,
} = require('../controllers/userCtrl');

const authMiddleware = require("../middlewares/authMiddleware")

//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post('/login', loginController);

//REGISTER || POST
router.post('/register', registerController);
module.exports = router;

//Auth || POST
router.post('/getUserData',authMiddleware,authController)


//Apply Doctor || POST
router.post('/apply-doctor',authMiddleware, applyDoctorController);

//Notificatio Doctor|| POST
router.post('/get-all-notification',authMiddleware, getAllNotificationController);

//Delete Notification Doctor|| POST
router.post('/delete-all-notification',authMiddleware, DeleteAllNotificationController);

//GET ALL DOC
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController)

//BOOK APPOINTMENT || POST
router.post('/book-appointment',authMiddleware,bookAppointmentController);

//Booking Avaibility
router.post('/booking-avaibility',authMiddleware,bookingAvaibilityController)


//Appointments List
router.get('/user-appointments',authMiddleware,userAppointmentsController)
module.exports = router;