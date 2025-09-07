const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Report routes
router.get('/events/popularity', reportController.getEventPopularity);
router.get('/students/participation', reportController.getStudentParticipation);
router.get('/events/:eventId/report', reportController.getEventReport);
router.get('/students/top-active', reportController.getTopActiveStudents);
router.get('/events/type/:type', reportController.getEventsByType);

module.exports = router;