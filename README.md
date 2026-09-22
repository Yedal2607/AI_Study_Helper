# AI Study Helper

AI Study Helper is an AI-assisted study application in active MVP development. It currently gives authenticated students a persistent chat workspace where they can ask study questions and continue previous conversations. The long-term product vision is an adaptive learning platform that turns learning inputs and student interactions into increasingly personalized study experiences.

> **Current scope:** authenticated AI chat with conversation history. Adaptive learning profiles, learning analytics, uploads, quizzes, flashcards, and document processing are not implemented yet.

## Product Direction

The project is guided by three documents:

- [Product vision](docs/system-documentation/vision.md): the long-term goal of a student-centered adaptive learning platform.
- [Domain model](docs/system-documentation/domain.md): the intended learning cycle, from learning inputs and study sessions to observations, evidence, profiles, and adaptation.
- [Chat design](docs/system-design/chat-design/): the current chat-history design and its data model.

The application is intentionally being built in stages. The chat is the first implemented study interaction and establishes the authenticated user and conversation foundation for future adaptive features.

## What Works Today

- User registration and login with hashed passwords.
- JWT-protected chat API and protected frontend routes.
- Creation of new conversations and access to a user's previous conversations.
- Persistent chats and messages stored in MongoDB.
- Per-user conversation isolation.
- AI-generated titles for new conversations.
- Conversational context: previous messages are included when the AI answers a follow-up question.
- Responsive React chat interface with a collapsible history sidebar.
- Markdown responses, including inline and block LaTeX math rendered with KaTeX.

## Current Architecture

```text
Browser
  └─ React + Vite frontend
       ├─ Authentication pages and AuthContext
       └─ AI chat UI and conversation-history state
              │  Bearer JWT
              ▼
       Express API
       ├─ /auth  registration and login
       └─ /chat  protected chat and history endpoints
              ├─ MongoDB: users, chats, messages
              └─ Ollama Generate API: AI responses and chat titles
```

## Repository Structure

```text
AI_Study_Helper/
├── backend/
│   ├── features/
│   │   ├── authentication/
│   │   │   ├── controller/       # Register and login handlers
│   │   │   ├── models/           # User schema
│   │   │   ├── routes/           # /auth routes
│   │   │   └── service/          # Password hashing and JWT creation
│   │   └── ai-chat/
│   │       ├── controller/       # Chat and message handlers
│   │       ├── models/           # Chat and Message schemas
│   │       ├── routes/           # /chat routes
│   │       └── service/          # History persistence and Ollama client
│   ├── middleware/               # JWT authentication middleware
│   └── server.js                 # Express server and MongoDB connection
├── frontend/
│   └── src/
│       ├── features/
│       │   ├── authentication/   # Login, registration, and AuthContext
│       │   └── ai-chat/          # Chat page, ChatBox, and chat hook
│       ├── assets/               # Static UI assets
│       ├── App.jsx               # Application routes and route protection
│       └── index.css             # Global styles and shared utilities
├── docs/
│   ├── images/                   # Product screenshots
│   ├── system-design/            # Current feature design notes
│   └── system-documentation/     # Vision and domain model
└── README.md
```

## Technology Stack

- **Frontend:** React 19, Vite, React Router, Tailwind CSS.
- **Markdown and math:** react-markdown, remark-math, rehype-katex, and KaTeX.
- **Backend:** Node.js, Express, Mongoose, bcrypt, and JSON Web Tokens.
- **Database:** MongoDB.
- **AI runtime:** a local Ollama instance using its `POST /api/generate` endpoint.

## API Endpoints

| Method | Endpoint | Authentication | Description |
| --- | --- | --- | --- |
| `POST` | `/auth/register` | No | Creates a user account. |
| `POST` | `/auth/login` | No | Signs in and returns a JWT. |
| `GET` | `/chat` | Bearer token | Lists the authenticated user's chats. |
| `GET` | `/chat/:chatId` | Bearer token | Returns a chat and its messages. |
| `POST` | `/chat/ask` | Bearer token | Sends a message, stores the exchange, and returns the AI response. |

## Getting Started

### Prerequisites

- A recent Node.js LTS release and npm.
- A running MongoDB instance (local or Atlas).
- [Ollama](https://ollama.com/) running locally on its default address, `http://localhost:11434`.
- An Ollama model pulled locally; its name is configured through `AI_MODEL`.

### 1. Clone and install dependencies

```bash
git clone git@github.com:Yedal2607/ai-study-helper.git
cd ai-study-helper

cd frontend
npm install

cd ../backend
npm install
```

> **Current setup note:** `backend/server.js` imports `dotenv/config`, but `dotenv` is not yet listed in the backend manifest. If it is not already available in your environment, run `npm install dotenv` in `backend/` before starting the server.

### 2. Configure environment variables

Create `backend/.env`:

```env
BACKEND_PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=use_a_long_random_secret
AI_MODEL=your_ollama_model_name
```

Create `frontend/.env.development`:

```env
VITE_BACKEND_URL=http://localhost:5000
```

`VITE_AI_CHAT_URL` is also supported for compatibility; when it is used, the frontend derives the chat base URL by removing `/ask`.

### 3. Start the application

In one terminal:

```bash
cd backend
npm run dev
```

In another terminal:

```bash
cd frontend
npm run dev
```

Open the URL displayed by Vite (normally `http://localhost:5173`).

### Frontend checks

```bash
cd frontend
npm run build
npm run lint
```

## Project Status

**Stage: MVP foundation in active development.**

| Area | Status | Notes |
| --- | --- | --- |
| Authentication | Implemented | Registration, login, password hashing, JWT issuance, and protected routes. |
| AI chat | Implemented | Uses Ollama, saves messages, and includes prior messages as context. |
| Chat history | Implemented | Chats are scoped to their owner, sorted by recent activity, and given AI-generated titles. |
| Markdown and math | Implemented | Markdown plus `$...$` and `$$...$$` LaTeX rendering. |
| Learning inputs | Planned | Documents, text, images, audio, and URLs described in the domain model. |
| Study activities | Planned | Flashcards, quizzes, explanations, exercises, and review workflows. |
| Adaptive learning | Planned | Learning observations, evidence, profiles, strategies, and personalization engine. |
| Dashboards and analytics | Planned | Student progress and learning-effectiveness views. |

## Roadmap Alignment

The next product stages should evolve toward the domain model rather than add disconnected AI utilities:

1. Accept and process learning inputs.
2. Create structured study sessions and learning activities.
3. Collect learning observations from those activities.
4. Analyze observations into validated learning evidence.
5. Build learning profiles and use them to select adaptive strategies.

## Screenshots

### Login

![Login page](docs/images/login-page.png)

### Registration

![Registration page](docs/images/signup-page.png)

### Chat workspace

![Chat UI](docs/images/chat-UI.png)

![Chat response](docs/images/chat-response.png)

## Author

Developed by [Yedal Abreu](https://github.com/Yedal2607).

## License

No license file has been added to this repository yet.
