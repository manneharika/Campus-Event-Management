const sequelize = require('../config/database');
const College = require('./College');
const Event = require('./Event');
const Student = require('./Student');
const Registration = require('./Registration');
const Attendance = require('./Attendance');
const Feedback = require('./Feedback');

// College Associations
College.hasMany(Event, { foreignKey: 'collegeId', as: 'events' });
College.hasMany(Student, { foreignKey: 'collegeId', as: 'students' });

Event.belongsTo(College, { foreignKey: 'collegeId', as: 'college' });
Student.belongsTo(College, { foreignKey: 'collegeId', as: 'college' });

// Event Associations
Event.hasMany(Registration, { foreignKey: 'eventId', as: 'registrations' });
Event.hasMany(Attendance, { foreignKey: 'eventId', as: 'attendances' });
Event.hasMany(Feedback, { foreignKey: 'eventId', as: 'feedbacks' });

// Student Associations
Student.hasMany(Registration, { foreignKey: 'studentId', as: 'registrations' });
Student.hasMany(Attendance, { foreignKey: 'studentId', as: 'attendances' });
Student.hasMany(Feedback, { foreignKey: 'studentId', as: 'feedbacks' });

// Registration Associations
Registration.belongsTo(Event, { foreignKey: 'eventId', as: 'event' });
Registration.belongsTo(Student, { foreignKey: 'studentId', as: 'student' });

// Attendance Associations
Attendance.belongsTo(Event, { foreignKey: 'eventId', as: 'event' });
Attendance.belongsTo(Student, { foreignKey: 'studentId', as: 'student' });

// Feedback Associations
Feedback.belongsTo(Event, { foreignKey: 'eventId', as: 'event' });
Feedback.belongsTo(Student, { foreignKey: 'studentId', as: 'student' });

module.exports = {
  sequelize,
  College,
  Event,
  Student,
  Registration,
  Attendance,
  Feedback
};