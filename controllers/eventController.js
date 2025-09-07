const { Event, Registration, Attendance, Feedback, Student } = require('../models');

const eventController = {
  createEvent: async (req, res) => {
    try {
      const { name, type, date, description, collegeId } = req.body;
      
      const event = await Event.create({
        name,
        type,
        date,
        description,
        collegeId
      });
      
      res.status(201).json({ message: 'Event created successfully', event });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  registerStudent: async (req, res) => {
    try {
      const { eventId } = req.params;
      const { studentId } = req.body;
      
      
      const [existing] = await sequelize.query(
        'SELECT * FROM Registrations WHERE eventId = ? AND studentId = ?',
        { replacements: [eventId, studentId] }
      );
      
      if (existing.length > 0) {
        return res.status(400).json({ error: 'Student already registered for this event' });
      }
      
      const [registration] = await sequelize.query(
        'INSERT INTO Registrations (eventId, studentId, registeredAt) VALUES (?, ?, datetime("now"))',
        { replacements: [eventId, studentId] }
      );
      
      res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  markAttendance: async (req, res) => {
    try {
      const { eventId } = req.params;
      const { studentId } = req.body;
      
      const [registration] = await sequelize.query(
        'SELECT * FROM Registrations WHERE eventId = ? AND studentId = ?',
        { replacements: [eventId, studentId] }
      );
      
      if (registration.length === 0) {
        return res.status(400).json({ error: 'Student not registered for this event' });
      }
      
      const [existing] = await sequelize.query(
        'SELECT * FROM Attendances WHERE eventId = ? AND studentId = ?',
        { replacements: [eventId, studentId] }
      );
      
      if (existing.length > 0) {
        return res.status(400).json({ error: 'Attendance already marked' });
      }
      
      await sequelize.query(
        'INSERT INTO Attendances (eventId, studentId, checkedInAt) VALUES (?, ?, datetime("now"))',
        { replacements: [eventId, studentId] }
      );
      
      res.status(201).json({ message: 'Attendance marked successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  submitFeedback: async (req, res) => {
    try {
      const { eventId } = req.params;
      const { studentId, rating, comment } = req.body;
      
      const [attendance] = await sequelize.query(
        'SELECT * FROM Attendances WHERE eventId = ? AND studentId = ?',
        { replacements: [eventId, studentId] }
      );
      
      if (attendance.length === 0) {
        return res.status(400).json({ error: 'Student did not attend this event' });
      }
      
      const [existing] = await sequelize.query(
        'SELECT * FROM Feedback WHERE eventId = ? AND studentId = ?',
        { replacements: [eventId, studentId] }
      );
      
      if (existing.length > 0) {
        return res.status(400).json({ error: 'Feedback already submitted' });
      }
      
      await sequelize.query(
        'INSERT INTO Feedback (eventId, studentId, rating, comment, submittedAt) VALUES (?, ?, ?, ?, datetime("now"))',
        { replacements: [eventId, studentId, rating, comment || ''] }
      );
      
      res.status(201).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = eventController;