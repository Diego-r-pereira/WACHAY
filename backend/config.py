# config.py
import os
from dotenv import load_dotenv

load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
SECRET_KEY = os.getenv("SECRET_KEY")

# Buenas prácticas: Falla si falta SECRET_KEY
if not SECRET_KEY:
    raise RuntimeError("SECRET_KEY no está definida en el .env")
