from sqlalchemy import Column, Integer, String, DateTime, Float
from sqlalchemy.sql import func
from database import Base

class Incident(Base):
    __tablename__ = "incidents"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String, unique=True, index=True)
    date = Column(DateTime(timezone=True), server_default=func.now())
    location = Column(String, nullable=False)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    severity = Column(String, default="Medium")
    status = Column(String, default="Active")
    confirmed_by = Column(Integer, nullable=True)
    description = Column(String, nullable=True)
    image = Column(String, nullable=True)