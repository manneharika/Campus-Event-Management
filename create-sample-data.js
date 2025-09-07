const { College, Event, Student, Registration, Attendance, Feedback } = require('./models');

async function createSampleData() {
  try {
    //  colleges
    const college1 = await College.create({ name: 'IIT Bombay', email: 'iitb@example.com' });
    const college2 = await College.create({ name: 'IIT Delhi', email: 'iitd@example.com' });
    const college3 = await College.create({ name: 'Jain University', email: 'jain@example.com' });
    const college4 = await College.create({ name: 'PES University', email: 'pes@example.com' });

    // students
    const students = [];
    for (let i = 1; i <= 10; i++) {
      const collegeId = i % 2 === 0 ? college2.id : college1.id;
      const student = await Student.create({
        name: `Student ${i}`,
        email: `student${i}@example.com`,
        collegeId
      });
      students.push(student);
    }

    //  events
    const events = [];
    const eventTypes = ['Workshop', 'Fest', 'Seminar', 'Hackathon', 'Tech Talk'];
    
    for (let i = 1; i <= 5; i++) {
      const collegeId = i % 2 === 0 ? college2.id : college1.id;
      const event = await Event.create({
        name: `Event ${i} - ${eventTypes[i % eventTypes.length]}`,
        type: eventTypes[i % eventTypes.length],
        date: new Date(Date.now() + i * 86400000), // i days from now
        description: `Description for Event ${i}`,
        collegeId
      });
      events.push(event);
    }

    //  registrations (students register for events)
    console.log('Creating registrations...');
    for (const event of events) {
      for (let i = 0; i < 5; i++) { // 5 registrations per event
        const student = students[Math.floor(Math.random() * students.length)];
        
        await Registration.create({
          eventId: event.id,
          studentId: student.id
        });
      }
    }

    // attendance 
    console.log('Creating attendance records...');
    const registrations = await Registration.findAll();
    for (const registration of registrations) {
      // 80% chance of attendance
      if (Math.random() < 0.8) {
        await Attendance.create({
          eventId: registration.eventId,
          studentId: registration.studentId
        });
      }
    }

    //  feedback
    console.log('Creating feedback records...');
    const attendances = await Attendance.findAll();
    for (const attendance of attendances) {
      // 70% chance of giving feedback
      if (Math.random() < 0.7) {
        await Feedback.create({
          eventId: attendance.eventId,
          studentId: attendance.studentId,
          rating: Math.floor(Math.random() * 5) + 1, 
          comment: `Feedback for event ${attendance.eventId}`
        });
      }
    }

    console.log('Sample data created successfully!');
    console.log(`Created: ${await College.count()} colleges`);
    console.log(`Created: ${await Student.count()} students`);
    console.log(`Created: ${await Event.count()} events`);
    console.log(`Created: ${await Registration.count()} registrations`);
    console.log(`Created: ${await Attendance.count()} attendance records`);
    console.log(`Created: ${await Feedback.count()} feedback records`);

  } catch (error) {
    console.error('Error creating sample data:', error);
  }
}

if (require.main === module) {
  const { sequelize } = require('./models');
  sequelize.sync({ force: true }).then(() => {
    console.log('Database synchronized');
    createSampleData();
  });
}

module.exports = createSampleData;