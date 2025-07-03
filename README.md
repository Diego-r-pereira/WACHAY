# WACHAY

**WACHAY** is an end-to-end system for real-time satellite monitoring of forest fires in protected areas. The project combines advanced image acquisition from Sentinel-2, automated detection algorithms using Python and OpenCV, robust geospatial data storage with PostgreSQL/PostGIS, and a modern React web interface designed for both administrators and rangers.

---

## 🚀 Project Overview

**WACHAY** addresses the critical challenge of early forest fire detection and management in large natural reserves. By integrating open-access satellite imagery with state-of-the-art processing and a user-friendly web platform, WACHAY empowers both technical users and field operators to monitor, analyze, and respond to wildfire threats effectively.

---

## 🛠️ Technology Stack

- **Satellite Data Source:** [Sentinel-2 (Copernicus)](https://scihub.copernicus.eu/)
- **Backend:** Python 3, [FastAPI](https://fastapi.tiangolo.com/), [OpenCV](https://opencv.org/), [SQLAlchemy](https://www.sqlalchemy.org/)
- **Database:** PostgreSQL + [PostGIS](https://postgis.net/) (for spatial queries)
- **Frontend:** [React](https://react.dev/), [React Router](https://reactrouter.com/), [Axios](https://axios-http.com/)
- **Authentication:** JWT (JSON Web Tokens)
- **Geospatial Visualization:** [React-Leaflet](https://react-leaflet.js.org/) (map integration)
- **Deployment:** Docker-ready (planned), Linux-first

---

## 📊 System Architecture

```
[Sentinel-2 API] ---> [Python Acquisition/Processing] ---> [FastAPI Backend/API] ---> [PostgreSQL/PostGIS]
                                                                                             |
                                                                                             v
                                                                                      [React Frontend]
```

### Main Modules:

1. **Data Acquisition:**
    - Scheduled or on-demand download of Sentinel-2 images via API.
    - Option to process historical data for testing.

2. **Image Processing:**
    - Automated detection of fire or anomalies using OpenCV (NDVI, color thresholding, change detection, or ML models).
    - Extraction of event metadata: coordinates, timestamp, confidence score, etc.

3. **Data Storage:**
    - All events, image metadata, and user data are stored in PostgreSQL with geospatial support (PostGIS).
    - Images are stored as file paths or BLOBs, depending on configuration.

4. **Backend API:**
    - FastAPI REST endpoints for event creation, image upload, event retrieval, authentication, and role-based access.

5. **Frontend:**
    - Modern React SPA for data visualization.
    - Role-based views (Admin vs. Ranger): Admin can manage users and review history; Rangers see live alerts and maps.

---

## 🌐 Features

- **Real-time fire event monitoring via satellite imagery.**
- **Automated fire detection using customizable algorithms.**
- **Interactive map visualization with spatial filtering (area selection, historical view).**
- **Role-based authentication:**
    - **Admin:** User management, event oversight, access to all historical data.
    - **Ranger:** Real-time fire alerts, area-focused data visualization.
- **REST API for integration or expansion (e.g., mobile apps, dashboards).**
- **Easy integration with other GIS tools via PostGIS.**
- **Modular design:** Each component (acquisition, processing, API, frontend) can be maintained or upgraded independently.

---

## 📦 Project Structure

```
WACHAY/
├── backend/
│   ├── app/
│   │   ├── main.py           # FastAPI application
│   │   ├── models.py         # SQLAlchemy models
│   │   ├── crud.py           # DB access functions
│   │   ├── auth.py           # JWT authentication
│   │   ├── satellite.py      # Sentinel-2 integration & image processing
│   │   └── ...
│   └── requirements.txt      # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── db/
│   ├── init.sql              # Initial DB structure
│   └── ...
├── README.md
└── docs/                     # Diagrams, technical documentation
```

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone git@github.com:Diego-r-pereira/WACHAY.git
cd WACHAY
```

### 2. Backend Setup

#### a) Create a virtual environment and install dependencies

```bash
cd backend
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

#### b) Configure PostgreSQL/PostGIS

- Create a database named `wachay`.
- Enable the `postgis` extension.
- Update DB credentials in your `backend/app/config.py` or as environment variables.

#### c) Run database migrations (if available)
```bash
# Example with Alembic, adjust if using another tool
alembic upgrade head
```

#### d) Start the backend server

```bash
uvicorn app.main:app --reload
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

### 4. Environment Variables

Set required environment variables for both backend and frontend.  
Examples:
- Backend: `DATABASE_URL`, `SECRET_KEY`
- Frontend: `REACT_APP_API_URL`

---

## 🧪 Testing and Development

- **Unit tests:** Provided in `/backend/tests` and `/frontend/src/__tests__`
- **Linting:** Python with `flake8` / JS with `eslint`
- **Docker (Planned):** To ease deployment and reproducibility

---

## 🗺️ API Overview

**Main endpoints:**
- `POST /api/auth/login` – User login
- `GET /api/events` – List all detected fire events
- `POST /api/events` – Submit a new fire event
- `GET /api/events/:id` – Event details
- `GET /api/users` – (Admin only) List/manage users

**See `/docs` route when running FastAPI for auto-generated API documentation (Swagger UI).**

---

## 👥 User Roles

- **Admin**
    - Add/edit/delete users
    - View and manage all fire events
    - Access system settings

- **Ranger**
    - View fire events relevant to assigned areas
    - Receive real-time alerts
    - Download or view satellite images

---

## 📈 Roadmap

- [x] Initial architecture and setup
- [x] Sentinel-2 integration and testing
- [x] Basic image processing (OpenCV)
- [ ] Machine learning model for advanced fire detection
- [ ] Notification system (email, SMS, WhatsApp, etc.)
- [ ] Full Docker deployment
- [ ] Mobile-friendly version

---

## 📚 References

- [Sentinel Hub API Documentation](https://docs.sentinel-hub.com/api/latest/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [PostGIS Manual](https://postgis.net/documentation/)
- [React Documentation](https://react.dev/)

---

## 🙌 Acknowledgments

- Open-source community for Sentinel-2 data and tools.
- Python, React, and PostGIS contributors.
- Academic advisors and field rangers supporting forest conservation.

---

**WACHAY – Protecting forests with the power of open data and technology.**
