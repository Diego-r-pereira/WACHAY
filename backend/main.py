from fastapi import FastAPI, Depends, HTTPException, Path
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from database import async_session
from typing import List
from models.user import User

from schemas.incident_schema import IncidentCreate, IncidentRead, IncidentConfirm
from crud.incident_crud import create_incident, get_all_incidents, get_active_incidents, confirm_incident

from schemas.satellite_image_schema import SatelliteImageCreate, SatelliteImageRead
from crud.satellite_image_crud import get_all_satellite_images, create_satellite_image

from fastapi.security import OAuth2PasswordRequestForm
from crud.user_crud import (
    get_all_users, create_user, get_user_by_id, update_user, delete_user
)
from schemas.user_schema import UserCreate, UserRead
from auth import authenticate_user, create_access_token, get_current_user, require_role

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

async def get_db():
    async with async_session() as session:
        yield session

@app.get("/", tags=["Root"])
def read_root():
    return {"message": "WACHAY backend funcionando 🚀"}

# USER ENDPOINTS

@app.get("/users", response_model=List[UserRead], tags=["Usuarios"])
async def list_users(db: AsyncSession = Depends(get_db)):
    return await get_all_users(db)

@app.get("/users/{user_id}", response_model=UserRead, tags=["Usuarios"])
async def get_user(user_id: int, db: AsyncSession = Depends(get_db)):
    user = await get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.post("/users", response_model=UserRead, tags=["Usuarios"])
async def add_user(user: UserCreate, db: AsyncSession = Depends(get_db)):
    try:
        new_user = await create_user(db, user)
        return new_user
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.put("/users/{user_id}", response_model=UserRead, tags=["Usuarios"])
async def update_user_endpoint(user_id: int, user: UserCreate, db: AsyncSession = Depends(get_db)):
    updated = await update_user(db, user_id, user)
    if not updated:
        raise HTTPException(status_code=404, detail="User not found")
    return updated

@app.delete("/users/{user_id}", response_model=UserRead, tags=["Usuarios"])
async def delete_user_endpoint(user_id: int, db: AsyncSession = Depends(get_db)):
    deleted = await delete_user(db, user_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="User not found")
    return deleted

# AUTH ENDPOINTS

@app.post("/login", tags=["Auth"])
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    user = await authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token = create_access_token(data={"sub": user.username, "role": user.role})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "username": user.username,
        "role": user.role
    }

@app.get("/me", response_model=UserRead, tags=["Auth"])
async def read_users_me(current_user: UserRead = Depends(get_current_user)):
    return current_user

@app.get("/admin-only", tags=["Auth"])
async def admin_only(current_user: UserRead = Depends(require_role("admin"))):
    return {"message": f"Hello {current_user.username}, eres admin"}

# Incidents
@app.get("/incidents", response_model=List[IncidentRead])
async def list_all_incidents(db: AsyncSession = Depends(get_db)):
    return await get_all_incidents(db)

@app.get("/incidents/active", response_model=List[IncidentRead])
async def list_active_incidents(db: AsyncSession = Depends(get_db)):
    return await get_active_incidents(db)

@app.post("/incidents", response_model=IncidentRead)
async def add_incident(incident: IncidentCreate, db: AsyncSession = Depends(get_db)):
    return await create_incident(db, incident)

@app.post("/incidents/{incident_id}/confirm", response_model=IncidentRead)
async def confirm_incident_status(
    incident_id: int = Path(...),
    data: IncidentConfirm = Depends(),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    updated = await confirm_incident(db, incident_id, current_user.id, data.status)
    if not updated:
        raise HTTPException(status_code=404, detail="Incident not found")
    return updated

# Satellite Images
@app.get("/satellite-images", response_model=List[SatelliteImageRead])
async def list_satellite_images(db: AsyncSession = Depends(get_db)):
    return await get_all_satellite_images(db)

@app.post("/satellite-images", response_model=SatelliteImageRead)
async def add_satellite_image(image: SatelliteImageCreate, db: AsyncSession = Depends(get_db)):
    return await create_satellite_image(db, image)