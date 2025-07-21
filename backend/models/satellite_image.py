from sqlalchemy import Column, Integer, String, Date
from database import Base

class SatelliteImage(Base):
    __tablename__ = "satellite_images"

    id = Column(Integer, primary_key=True, index=True)
    url = Column(String, nullable=False)
    date = Column(Date, nullable=False)
    description = Column(String, nullable=True)