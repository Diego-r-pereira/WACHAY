from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models.incident import Incident
from schemas.incident_schema import IncidentCreate
from datetime import datetime

async def create_incident(db: AsyncSession, incident: IncidentCreate) -> Incident:
    new_incident = Incident(
        code=f"INC-{datetime.utcnow().strftime('%Y%m%d%H%M%S')}",
        location=incident.location,
        latitude=incident.latitude,
        longitude=incident.longitude,
        severity=incident.severity,
        description=incident.description,
        image=incident.image
    )
    db.add(new_incident)
    await db.commit()
    await db.refresh(new_incident)
    return new_incident

async def get_all_incidents(db: AsyncSession):
    result = await db.execute(select(Incident).order_by(Incident.date.desc()))
    return result.scalars().all()

async def get_active_incidents(db: AsyncSession):
    result = await db.execute(select(Incident).where(Incident.status == "Active").order_by(Incident.date.desc()))
    return result.scalars().all()

async def confirm_incident(db: AsyncSession, incident_id: int, user_id: int, new_status: str = "Confirmed"):
    incident = await db.get(Incident, incident_id)
    if incident:
        incident.status = new_status
        incident.confirmed_by = user_id
        await db.commit()
        await db.refresh(incident)
    return incident