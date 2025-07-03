
from sqlalchemy import Column, Integer, String, DateTime, Float, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from .user import Base

class Incident(Base):
    __tablename__ = "incidents"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String, unique=True, index=True)
    date = Column(DateTime, default=datetime.utcnow)
    location = Column(String, nullable=False)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    status = Column(String, default="Active")
    severity = Column(String, default="Medium")
    confirmed_by = Column(Integer, ForeignKey("users.id"), nullable=True)

    confirmer = relationship("User", backref="confirmed_incidents")
