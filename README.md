# AI Study Helper

AI Study Helper is a SaaS platform that uses AI to support students with studying, note-taking, and future learning tools such as PDF summarization, flashcards, and more.

## Overview

AI Study Helper helps students upload study materials, ask questions, and get AI-powered assistance in a clean and simple interface.  
It is designed to make studying faster and smarter for high school and university students.

## Current Features

✔ User registration
✔ User login
✔ JWT authentication
✔ AI chat
✔ Responsive interface
✔ React Router
✔ Express REST API

More features such as PDF analysis, flashcards, and quizzes are planned.

## Screenshots

### Login Page
![Login Page](docs/images/login-page.png)

The login screen lets returning users sign in with their email and password.

### Register Page
![Register Page](docs/images/signup-page.png)

The register screen allows new users to create an account and start using the platform.

### Chat UI
![Chat UI](docs/images/chat-UI.png)

The chat interface is the main study area where users can send questions and receive AI-generated answers.

## Project Structure

```text
project-root/
├── frontend/   React application (user interface)
├── backend/    Express + MongoDB API (server logic)
├── docs/       Notes, architecture, and development documentation
└── README.md
```

## Technologies

- **Frontend:** React, Tailwind CSS, Vite
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas 
- **Version Control:** Git + GitHub (SSH setup)

## How to Run the Project

### Setup and Installation

1. Clone the repository

   ```bash
   git clone git@github.com:Yedal2607/ai-study-helper.git
   ```

2. Navigate into the project folder

   ```bash
   cd ai-study-helper
   ```

3. Install dependencies

   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

4. Run the development servers

   ```bash
   npm run dev
   ```

## Project Status

Current stage: **MVP**

### Completed

- Backend API
- Frontend interface
- AI chat working
- JWT authentication
- Protected routes

### In Progress

- Study features
- Flashcard generation
- PDF analysis

### Planned

- File uploads
- Study dashboards

## Author

Developed by [Yedal Abreu](https://github.com/Yedal2607)

An aspiring full-stack developer passionate about building practical AI-powered tools.

## License

This project is open-source and available under the MIT License.
