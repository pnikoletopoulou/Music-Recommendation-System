# Music-Recommendation-System
Full stack music recommendation app based on emotion and activity using React, Django and MySQL.

## Key Features

- AI Recommendations: Select your Emotion and activity to get a music genre prediction powered by a Decision Tree model.

- User Authentication: Secure Register and Login system using JWT.

- Vibe History: Save your favorite recommendations and view them in a clean, card-based dashboard.

- Responsive UI: A modern interface with a pink aesthetic and smooth transitions. 

## Build With 

- Frontend: React.js + Axios

- Backend: Django & DRF (Django REST Framework)

- Auth: JWT 

- ML: Scikit-learn & Pandas

- Database: MySQL

- Infrastructure: Docker & Docker Compose

## Instalation & Setup 

### Prerequisites 

- Docker
- Docker Compose 
- Git 

### Clone the Project 

```bash
git clone https://github.com/pnikoletopoulou/Music-Recommendation-System.git
cd Music-Recommendation-System 
```

### Launch the Application
Use Docker Compose to build and start the frontend, backend, and database services:
```bash
docker-compose up --build 
```

### Database setup 

```bash 
docker-compose up --build
```

### Access the Application  

- Frontend: http://localhost:8080
- Backend API: http://localhost:8000/api/

## Project Structure 

- /frontend: Contains React components, styles, and API interceptors.

- /backend: Contains Django views, serializers, and the ML logic.

- /backend/api/music_dataset_mock2.csv: The training data for the ML model.
