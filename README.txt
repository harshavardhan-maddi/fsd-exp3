EXPRESSJS SESSION MANAGEMENT AND USER AUTHENTICATION

Files:
- app.js
- package.json
- views/home.ejs
- views/login.ejs
- views/dashboard.ejs
- views/session.ejs
- output_1.png

How to run:
1. Open a terminal in this folder.
2. Run: npm install
3. Run: npm start
4. Open: http://localhost:3000

Demo credentials:
Username: admin
Password: admin123

Routes:
GET  /                 Home page
GET  /set-session      Set session variables
GET  /session          View session data
GET  /destroy-session  Destroy session
GET  /login            Login page
POST /login            Process login
GET  /dashboard        Protected dashboard
GET  /logout           Destroy authentication session

Note:
The hardcoded credentials and in-memory session store are only for academic demonstration.
