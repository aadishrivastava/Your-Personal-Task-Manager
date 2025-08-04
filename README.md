🗂️ Task Management App =>

A full-stack Task Management application where users can register, log in, and manage their daily tasks with completion tracking, filtering, and detailed task views.


🚀 Features

🔐 Authentication – Secure login and signup using JWT.

🧑‍💻 User Dashboard – View all tasks associated with a user.

✅ Task Completion – Mark tasks as complete/incomplete.

🗃️ Filtering – Separate APIs and views for completed and incomplete tasks.

⏱️ Timestamps – Automatically shows task creation date.

🔄 Real-time Updates – Task state updates instantly using React state.


🛠️ Tech Stack

Frontend:

React.js

Axios

Tailwind CSS (or your styling choice)

React Router DOM


Backend:

Node.js

Express.js

MongoDB with Mongoose

JWT (JSON Web Token) for authentication


📁 Project Structure

Task-Manager/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
└── README.md


🧪 API Endpoints (Backend)

Route	Method	Description

/api/v2/register	POST	Register new user

/api/v2/login	POST	User login

/api/v2/task/add-task	POST	Add a new task

/api/v2/user	GET	Get user details with populated tasks

/api/v2/get-complete-tasks	GET	Fetch completed tasks

/api/v2/get-incomplete-tasks	GET	Fetch incomplete tasks


📦 Installation & Setup

Clone the repo

git clone https://github.com/aadishrivastava/Your-Personal-Task-Manager.git

cd Your-Personal-Task-Manager


Install Backend Dependencies

cd backend

npm install

Install Frontend Dependencies

cd ../frontend

npm install

Start Both Servers

Backend:
npm start or use node "(your main file eg. app.js)"

Frontend: 
npm run dev (if using Vite) or npm start (for CRA)


🔑 Environment Variables

In the backend .env file, set:

MONGO_URI=your_mongo_connection_string

JWT_SECRET=your_jwt_secret


👨‍💻 Author

Aadi Shrivastava


📄 This project is licensed under the [MIT License](LICENSE).
