from pydantic import BaseModel
from typing import Optional
from datetime import date

class SatelliteImageBase(BaseModel):
    url: str
    date: date
    description: Optional[str] = None

class SatelliteImageCreate(SatelliteImageBase):
    pass

class SatelliteImageRead(SatelliteImageBase):
    id: int

    class Config:
        from_attributes = True
