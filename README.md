# Holiday Management Application

## Overview
The **Holiday Management Application** is a full-stack web application that allows users to search,
filter, and display official holidays for a selected country and year using the **Calendarific API**.
The application consists of a **Django backend** (REST API) and a **React frontend** styled with **Tailwind CSS**.

---

## Features

### Backend (Django)
- Django project with an app named `holidays`.
- API endpoint to fetch holiday data from the **Calendarific API**.
- Django REST Framework (**DRF**) for serving API responses.
- **Caching** holiday data for performance optimization.
- Custom API endpoint to **search holidays by name**.
- `.env` file for managing API keys securely.

### Frontend (React+Vite)
- **Home Page**: A search form to select a country and year.
- **Holiday List Page**: Displays holidays fetched from the backend.
- **Holiday Details Modal**: Displays detailed information on selected holidays.
- **Dropdowns & Filters**:
  - Country selection dropdown (ISO 3166-1 alpha-2 codes).
  - Month selection dropdown.
  - Year selection dropdown.
  - Search bar to filter holidays by name.
  - Date range picker & holiday type filter.
- **Pagination**: If holidays exceed 12 per page.
- **Responsive UI** built with Tailwind CSS.
- **Graceful Error Handling** for API failures.

---

## Tech Stack

### Backend:
- Django
- Django REST Framework (DRF)
- SQLite (database)
- Django Caching Framework
- Environment Variables (dotenv)

### Frontend:
- React.js (Vite setup)
- Axios (API calls)
- React Router
- Tailwind CSS

---

## Setup Instructions

### Prerequisites
Ensure you have the following installed:
- Python (>=3.8)
- Node.js (>=16)
- Git

### Backend Setup (Django)
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd holiday-management
   ```
2. Create and activate a virtual environment:
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Set up environment variables:
   ```sh
   cp .env.example .env  # Rename the example file
   ```
   Edit the `.env` file and add your Calendarific API key.
5. Apply database migrations:
   ```sh
   python manage.py migrate
   ```
6. Start the backend server:
   ```sh
   python manage.py runserver
   ```
   The API will be available at `http://127.0.0.1:8000/api/holidays/`.

---

### Frontend Setup (React)
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   ```sh
   cp .env.example .env  # Rename the example file
   ```
   Edit the `.env` file and add the backend API URL.
4. Start the React development server:
   ```sh
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173/`.

---

## API Endpoints
| Endpoint                     | Method | Description |
|------------------------------|--------|-------------|
| `/api/holidays?country=US&year=2024` | GET | Fetch holidays for a country & year |
| `/api/holidays/search?query=Christmas` | GET | Search holidays by name |

---

## Known Issues & Limitations
- Requires a **valid Calendarific API key**.
- Currently supports only **a single API provider**.

