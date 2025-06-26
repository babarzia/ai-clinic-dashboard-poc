# 🦷 AI Clinic Dashboard (POC)

This is a full-stack AI-powered dashboard for a dental clinic, featuring secure patient management and a conversational chatbot interface. Built with **FastAPI** and **React**, it integrates JWT-based authentication, PostgreSQL persistence, and is deployment-ready with Docker.

---

## 📦 Tech Stack

- **Backend**: FastAPI, SQLAlchemy, JWT Auth, PostgreSQL
- **Frontend**: React.js, TailwindCSS
- **Chatbot**: Dummy AI integration (can be extended to OpenAI or similar)
- **Auth**: JWT-based via `/token` endpoint
- **Deployment**: Docker & Docker Compose

---

## 📁 Project Structure

ai-patient-dashboard/
│
├── backend/ # FastAPI backend
│ ├── app/
│ │ ├── main.py # Main FastAPI app
│ │ ├── auth.py # JWT Auth logic
│ │ ├── chatbot.py # AI dummy response
│ │ ├── database.py # DB setup and session
│ │ └── models.py # Pydantic and ORM models
│ ├── Dockerfile # Backend Dockerfile
│ └── requirements.txt
│
├── frontend/ # React frontend
│ ├── public/
│ ├── src/
│ │ ├── components/ # Chatbot & PatientForm
│ │ ├── App.js
│ │ └── index.js
│ ├── tailwind.config.js
│ ├── Dockerfile # Frontend Dockerfile
│ └── package.json
│
├── docker-compose.yml # Full stack orchestration
└── README.md

yaml
Copy
Edit

---

## 🔐 Authentication

- To get a token:  
  `POST /token` with form data `username` and `password`  
  (Default: `admin` / `admin123`)
- Use `Authorization: Bearer <token>` to access `/patients` and `/chat`

---

## 🧠 Chatbot

- `POST /chat`  
  Accepts `{ "message": "your question" }` and returns a dummy AI reply.  
  Can be extended with OpenAI API.

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/babarzia/ai-clinic-dashboard-poc.git
cd ai-clinic-dashboard-poc
2. Run with Docker
Ensure Docker & Docker Compose are installed. Then:

bash
Copy
Edit
docker-compose up --build
Frontend: http://localhost:3000

Backend (Swagger Docs): http://localhost:8000/docs

DB: PostgreSQL running inside container

3. Manual Local Run
🔧 Backend (FastAPI)
bash
Copy
Edit
cd backend
python -m venv venv
venv\Scripts\activate       # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
💻 Frontend (React)
bash
Copy
Edit
cd frontend
npm install
npm run dev
📄 API Endpoints
Method	Endpoint	Description	Auth Required
POST	/token	Get JWT access token	❌
POST	/patients	Add new patient record	✅
POST	/chat	Get AI chatbot reply	✅

🐳 Docker Overview
Uses multi-container setup:

backend: Python + FastAPI + PostgreSQL client

frontend: Node.js + React + Tailwind

db: PostgreSQL

Data persisted using Docker volumes.

✅ Future Improvements
Use real AI integration (OpenAI, Cohere, etc.)

Replace dummy auth with DB-stored users

Admin dashboard for patient filtering/search

Add tests & CI pipeline

✍️ Author
Babar Zia
