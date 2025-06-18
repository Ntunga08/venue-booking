# Venue Booking System

A modern web application for booking venues, built with FastAPI, React, and PostgreSQL.

## Features

- User authentication and authorization
- Venue browsing and searching with filters
- Venue booking management
- User dashboard with statistics
- Responsive design
- Modern UI with Material-UI components

## Tech Stack

### Backend
- Python 3.8+
- FastAPI
- SQLAlchemy
- PostgreSQL
- Alembic for database migrations
- JWT for authentication

### Frontend
- React 18
- Material-UI
- React Router
- Axios for API calls
- Recharts for data visualization
- React Hook Form for form handling

## Project Structure

```
venue-booking/
├── backend/
│   ├── alembic/              # Database migrations
│   ├── app/
│   │   ├── api/             # API endpoints
│   │   ├── core/            # Core functionality
│   │   ├── db/              # Database models and session
│   │   ├── schemas/         # Pydantic models
│   │   └── services/        # Business logic
│   ├── tests/               # Backend tests
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── public/             # Static files
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── utils/         # Utility functions
│   └── package.json       # Node.js dependencies
└── docker-compose.yml     # Docker configuration
```

## Getting Started

### Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- PostgreSQL 12 or higher
- Docker and Docker Compose (optional)

### Backend Setup

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Run database migrations:
   ```bash
   alembic upgrade head
   ```

5. Start the backend server:
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend Setup

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

### Docker Setup

1. Build and start the containers:
   ```bash
   docker-compose up --build
   ```

2. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## Development

### Backend Development

- API documentation is available at `/docs` when running the backend server
- Use `alembic revision --autogenerate -m "description"` to create new migrations
- Run tests with `pytest`

### Frontend Development

- The development server supports hot reloading
- Use `npm run build` to create a production build
- Run tests with `npm test`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 