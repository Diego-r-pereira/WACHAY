from models.satellite_image import SatelliteImage
from schemas.satellite_image_schema import SatelliteImageCreate
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

async def get_all_satellite_images(db: AsyncSession):
    result = await db.execute(select(SatelliteImage).order_by(SatelliteImage.date.desc()))
    return result.scalars().all()

async def create_satellite_image(db: AsyncSession, image: SatelliteImageCreate):
    new_image = SatelliteImage(
        url=image.url,
        date=image.date,
        description=image.description
    )
    db.add(new_image)
    await db.commit()
    await db.refresh(new_image)
    return new_image
