const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.post('/', eventController.createEvent);
router.post('/:eventId/register', eventController.registerStudent);
router.post('/:eventId/attend', eventController.markAttendance);
router.post('/:eventId/feedback', eventController.submitFeedback);

module.exports = router;