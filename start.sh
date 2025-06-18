#!/bin/bash

echo "🚀 Starting Venue Booking System..."

# Check if we're in the right directory
if [ ! -f "README.md" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command_exists node; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

if ! command_exists python3; then
    echo "❌ Python 3 is not installed. Please install Python 3 first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Start frontend
echo "🌐 Starting frontend..."
cd frontend
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

# Start frontend in background
npm start &
FRONTEND_PID=$!

# Go back to root
cd ..

# Start backend (if backend directory exists)
if [ -d "backend" ]; then
    echo "🔧 Starting backend..."
    cd backend
    
    # Check if virtual environment exists
    if [ ! -d "venv" ]; then
        echo "🐍 Creating virtual environment..."
        python3 -m venv venv
    fi
    
    # Activate virtual environment
    source venv/bin/activate
    
    # Install dependencies
    if [ ! -f "requirements.txt" ]; then
        echo "📦 Installing backend dependencies..."
        pip install fastapi uvicorn sqlalchemy psycopg2-binary alembic python-jose[cryptography] passlib[bcrypt] python-multipart
    else
        echo "📦 Installing backend dependencies..."
        pip install -r requirements.txt
    fi
    
    # Start backend in background
    uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 &
    BACKEND_PID=$!
    
    cd ..
else
    echo "⚠️  Backend directory not found. Starting frontend only."
fi

echo ""
echo "🎉 Venue Booking System is starting up!"
echo ""
echo "📱 Frontend will be available at: http://localhost:3000"
if [ -d "backend" ]; then
    echo "🔧 Backend API will be available at: http://localhost:8000"
    echo "📚 API Documentation will be available at: http://localhost:8000/docs"
fi
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for user to stop
trap "echo ''; echo '🛑 Stopping services...'; kill $FRONTEND_PID $BACKEND_PID 2>/dev/null; exit" INT
wait 