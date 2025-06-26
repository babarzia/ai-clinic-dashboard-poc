from fastapi import FastAPI, Depends, Request, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.auth import authenticate_user, create_access_token  # keep login support
from app.models import PatientCreate, create_patient
from app.chatbot import get_ai_reply
from app.database import create_tables, get_db

app = FastAPI()

# ✅ CORS setup (allow all for now, limit in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ DB setup on startup
@app.on_event("startup")
async def startup():
    create_tables()

# 🔐 Login route to return JWT access token
@app.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token = create_access_token({"sub": form_data.username})
    return {"access_token": token, "token_type": "bearer"}

# ✅ Public endpoint: Create new patient (no auth required)
@app.post("/patients")
def create_patient_record(
    patient: PatientCreate,
    db: Session = Depends(get_db)
):
    return create_patient(db, patient)

# ✅ Public endpoint: Chatbot response (no auth required)
@app.post("/chat")
async def chat_endpoint(request: Request):
    data = await request.json()
    user_message = data.get("message", "")
    return {"response": get_ai_reply(user_message)}
