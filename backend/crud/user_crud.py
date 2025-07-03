from models.user import User
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.exc import IntegrityError
from auth import hash_password
from schemas.user_schema import UserCreate, UserUpdate  # Asegúrate de tener este schema

async def get_all_users(db: AsyncSession):
    result = await db.execute(select(User))
    return result.scalars().all()

async def get_user_by_id(db: AsyncSession, user_id: int):
    result = await db.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()

async def get_user_by_username(db: AsyncSession, username: str):
    result = await db.execute(select(User).where(User.username == username))
    return result.scalar_one_or_none()

async def create_user(db: AsyncSession, user_data: UserCreate):
    user = User(
        username=user_data.username,
        email=user_data.email,
        full_name=user_data.full_name,
        hashed_password=hash_password(user_data.password),
        role=getattr(user_data, "role", "user"),
    )
    db.add(user)
    try:
        await db.commit()
        await db.refresh(user)
        return user
    except IntegrityError:
        await db.rollback()
        raise ValueError("Username or email already exists")

async def update_user(db: AsyncSession, user_id: int, user_data):  # Puedes usar UserUpdate
    user = await get_user_by_id(db, user_id)
    if not user:
        return None

    # Solo actualiza si el campo viene en user_data (ideal para PATCH)
    for attr in ["username", "email", "full_name", "role"]:
        if hasattr(user_data, attr):
            value = getattr(user_data, attr)
            if value is not None:
                setattr(user, attr, value)

    # Actualiza la contraseña si se proporciona y la hashea
    if hasattr(user_data, "password") and user_data.password:
        user.hashed_password = hash_password(user_data.password)
    try:
        await db.commit()
        await db.refresh(user)
        return user
    except IntegrityError:
        await db.rollback()
        raise ValueError("Username or email already exists")

async def delete_user(db: AsyncSession, user_id: int):
    user = await get_user_by_id(db, user_id)
    if not user:
        return None
    await db.delete(user)
    await db.commit()
    return user
