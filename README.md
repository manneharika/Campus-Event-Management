# Campus Event Management Platform 

I made this backend sysytem for managing college events, student registrations, and attendance tracking. It is basically a digital event manager that helps colleges keep track of who's coming to what events and who actually shows up.

## About how I Built this Project

I used Node .js application with Express because it's known best for API's. For the database, I used SQLite since it is easy to setup and good for testing. This helps colleges manage their events, track attendance and allows students to register for events and give feedback.

The code is orgainzed in folders to keep everything clean and maintainable, which helped me not get lost in my own code!

## What I Built / How it is designed 

I created a complete backend system that includes: 

* Event Management - Colleges can create different types of events like workshops, fests and seminars etc.

* Student Registration - Students can signup for the events they want to attend.

* Attendance system - We can mark who actually attended or showed up on the event day.

* Feedback Collection - Students can give feedback and rate the events from scale of 1 to 5 stars.

The system is designed to handle multiple colleges with thousands of students and events.

## Stuff I Strugled with

Honestly, the database relationships where kinda confusing at first. Like figuring out how events connect to students and colleges took me couple tries to get it right.
Also, preventing duplicate registrations was tricker than I thought, to make sure students can't register twice for the same event.
Getting the attendance percentages right also took me some time to get it, but I got there eventually!!

## What I Learned

This project taught me a lot about:
- How to properly structure a backend project 
- How to write database queries that don't slow
everything down.
- Why Input validation is so important 

## Project Structure

Here's how I organized everything:
Event Management Platform
|-- 📁ai-conversations
|    |--📄 ai-conversations.md 
├── 📁config
│   └── 📄 database.js               
├── 📁controllers
│   ├── 📄 eventController.js          
│   └── 📄 reportController.js         
├── 📁 models
│   ├── 📄 index.js                   
│   ├── 📄 College.js                  
│   ├── 📄 Event.js                   
│   ├── 📄 Student.js                  
│   ├── 📄 Registration.js            
│   ├── 📄 Attendance.js              
│   └── 📄 Feedback.js                
├── 📁 routes/
│   ├── 📄 events.js                  
│   └── 📄 reports.js                  
├
│── 📄 design-document.md
│── 📄 Project-Summary.md        
├── 📄 .gitignore                      
├── 📄 app.js                          
├── 📄 create-sample-data.js          
├── 📄 package.json                   
└── 📄 README.md                      

Event Management Platform:
-- config # Database setup
-- controllers # Business logic
-- models # Database tables
-- routes # API endpoints
-- app.js # Main server file
-- create-sample-data.js # Sample data generator
-- README.md 

I found this structure easier as it keeps things organized without being too complicated.


## Conclusion

This was actually a fun project to work on. It started feeling real when I could actually creat events and see reports working.

If I had more time, I'd probably add user login and maybe email notifications. But for now, I'm pretty must satisified with how it turned out!

Built by [Manne Harika]
For Webknot Technologies Assignment
