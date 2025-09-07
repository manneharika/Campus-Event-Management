# How I built the Campus Event Manager 

## Database Setup

I created six tables that actually work together: 

- Colleges: This is where we store each college's informantion.
- Events: This consists of all the vents with their details(like dates, type of event etc).
- Students: This contains Students profiles or details with their college info.
- Registration: This consists of the info of who signed up for what events
- Attendance: This records who actually showed up on the event day
- Feedback: This records the ratings and feedbacks from the students  

# Database Schema

The flow of these tables is connected like this: 

College have students and events
            |
            V
Students register for the events 
            |
            V
We can track who attended the event 
            |
            V
Records the feedbacks given by the Students 


# API design and testing 

I tested these endpoints to:

- To Check if server is running: `http://localhost:3000/health`

- To See the event popularity: `http://localhost:3000/api/reports/events/popularity`

- To View student participation: `http://localhost:3000/api/reports/students/participation`

# Workflow/ How everything works

1. First a college will create or organize an event.
2. Then the Students will signup for the events they like.
3. On the day of the event, the college can mark who actually came to the event through this platform.
4. After the event is completed, then the students will give us some feedbacks on the event.
5. Then we generate reports to see what actually working

# Handling the Problems 

-Double Registration: No students can signup for the same event twice.

-Attendance Check: The student must be registered before attending any event.

-Feedback validation: Only the students that attended the event can rate and give feedbacks on it.

-Missing ratings: Students that have attended the events may not give the feedback, but still we can handle these empty feedbacks positively.