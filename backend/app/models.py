# backend/app/models.py

from pydantic import BaseModel
from typing import List
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import Session, declarative_base

Base = declarative_base()

class PatientDB(Base):
    __tablename__ = "patients"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    age = Column(Integer)
    issue = Column(String)

class PatientCreate(BaseModel):
    name: str
    age: int
    issue: str

class Patient(PatientCreate):
    id: int

    class Config:
        orm_mode = True

def get_all_patients(db: Session):
    return db.query(PatientDB).all()

def create_patient(db: Session, patient: PatientCreate):
    db_patient = PatientDB(**patient.dict())
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    return db_patient