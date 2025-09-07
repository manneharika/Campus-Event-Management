const { sequelize } = require('../models');

const reportController = {
  // Event popularity report
  getEventPopularity: async (req, res) => {
    try {
      const [results] = await sequelize.query(`
        SELECT 
          e.id,
          e.name,
          e.type,
          e.date,
          COUNT(r.id) as registrationCount
        FROM Events e
        LEFT JOIN Registrations r ON e.id = r.eventId
        GROUP BY e.id
        ORDER BY registrationCount DESC
      `);
      res.json(results);
    } catch (error) {
      console.error('Error in getEventPopularity:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Student participation report
  getStudentParticipation: async (req, res) => {
    try {
      const [results] = await sequelize.query(`
        SELECT 
          s.id,
          s.name,
          s.email,
          COUNT(a.id) as eventsAttended
        FROM Students s
        LEFT JOIN Attendances a ON s.id = a.studentId
        GROUP BY s.id
        ORDER BY eventsAttended DESC
      `);
      res.json(results);
    } catch (error) {
      console.error('Error in getStudentParticipation:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // event report
  getEventReport: async (req, res) => {
    try {
      const { eventId } = req.params;
      
      const [results] = await sequelize.query(`
        SELECT 
          e.id,
          e.name,
          e.type,
          e.date,
          e.description,
          COUNT(r.id) as totalRegistrations,
          COUNT(a.id) as attendanceCount,
          ROUND((COUNT(a.id) * 100.0 / NULLIF(COUNT(r.id), 0)), 2) as attendancePercentage,
          AVG(f.rating) as averageRating
        FROM Events e
        LEFT JOIN Registrations r ON e.id = r.eventId
        LEFT JOIN Attendances a ON e.id = a.eventId AND r.studentId = a.studentId
        LEFT JOIN Feedback f ON e.id = f.eventId
        WHERE e.id = ?
        GROUP BY e.id
      `, { replacements: [eventId] });

      res.json(results[0] || {});
    } catch (error) {
      console.error('Error in getEventReport:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Top 3 most active students
  getTopActiveStudents: async (req, res) => {
    try {
      const [results] = await sequelize.query(`
        SELECT 
          s.id,
          s.name,
          s.email,
          COUNT(a.id) as eventsAttended
        FROM Students s
        LEFT JOIN Attendances a ON s.id = a.studentId
        GROUP BY s.id
        ORDER BY eventsAttended DESC
        LIMIT 3
      `);
      res.json(results);
    } catch (error) {
      console.error('Error in getTopActiveStudents:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Filter events by type
  getEventsByType: async (req, res) => {
    try {
      const { type } = req.params;
      
      const [results] = await sequelize.query(`
        SELECT 
          e.id,
          e.name,
          e.type,
          e.date,
          COUNT(r.id) as registrationCount
        FROM Events e
        LEFT JOIN Registrations r ON e.id = r.eventId
        WHERE e.type = ?
        GROUP BY e.id
        ORDER BY registrationCount DESC
      `, { replacements: [type] });

      res.json(results);
    } catch (error) {
      console.error('Error in getEventsByType:', error);
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = reportController;