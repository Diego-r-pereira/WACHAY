from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class IncidentBase(BaseModel):
    location: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    severity: Optional[str] = Field(default="Medium")
    description: Optional[str] = None
    image: Optional[str] = None

class IncidentCreate(IncidentBase):
    pass

class IncidentConfirm(BaseModel):
    status: str = Field(default="Confirmed")

class IncidentRead(IncidentBase):
    id: int
    code: str
    date: datetime
    status: str
    confirmed_by: Optional[int] = None

    class Config:
        from_attributes = True
