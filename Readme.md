# Project Demo
![Project Demo](https://www.youtube.com/watch?v=V5OnAN63vls)

# Setting up of DB(PostgreSQL)
- Install PostgreSQL from https://www.postgresql.org/download/windows/
- Install HeidiSQL for managing the DB https://www.heidisql.com/download.php
- Import DB/database.sql in HeidiSQL to create the tool_library_db database
- ![Neighborhood Database](docs/images/db.png)
- ![Neighborhood Database Schema](docs/images/db_schema.png)

# Setting up of Backend
## Backend APIs
- Implemented below set of APIs
  - Auth Controller
    - `/api/auth/login`
    - `/api/auth/signup`
  - Tool Controller
    - `/api/tools`
    - `/api/tools`
    - `/api/tools/1`
  - Reservation Controller
    - `/api/reservations`
    - `/api/reservations/my`
    - `/api/reservations/user/2`
  - Review Controller
    - `/api/reviews`
    - `/api/reviews/1`
  - Damage Report Controller
    - `/api/reports`
    - `/api/reports/1`

## How to run the backend?
- .env file has the DB connection details and database(tool_library_db) to connect
- The below command will run the backend at 5000 port
  - `npm run dev`
  - ![Start backend](docs/images/start_backend.png)

## How to test backend API?
- Used postman and create a API collection in
  `PostmanCollection/Neighborhood-Backend-API-Collection.json` to easily
  exercise backend API and validate the response
- ![Neighborhood Postman backend API collection](docs/images/postman_collection.png)
  - ![Login API](docs/images/api/login_api.png)
  - ![Get all tools API](docs/images/api/get_all_tools_api.png)
  - ![Reservation API](docs/images/api/reservations_api.png)
  - ![Review API](docs/images/api/review_api.png)
  - ![Submit Damage Report API](docs/images/api/submit_damage_report.png)

## Swagger documentation for backend API
- Swagger documentation is available at `http://localhost:5000/api-docs/`
  - ![Login API](docs/images/api/swagger_api.png)

# Setting up of Frontend
## Frontend overview
- Implemented below set of Components and pages
  - `src/api/api.js` - setup Axios for making HTTP requests with the backend API
  - `src/components/auth/LoginPage.jsx` - For logging user
  - `src/components/auth/RegisterPage.jsx` - For registering a new user
  - `src/components/ProtectedRoute.jsx` - For Routing protected resources
  - `src/components/ReviewSection.jsx` - A component for reusing a tool's review
  - `src/components/ToolCard.jsx` - A component for reusing a tool's detailed view
  - `src/pages/AdminPanel.jsx` - A page to show admin panel
  - `src/pages/ReservationsDashboard.jsx` - A page for booking/reserving a tool
  - `src/pages/ToolCatalog.jsx` - A page showing existing catalog
  - `src/pages/ToolDetail.jsx` - A page for showing details about a tool

## How to run the frontend?
- The below command will run the frontend at 3000 port
  - `npm start`
  - ![Start frontend](docs/images/start_frontend.png)

## How to test frontend?
- Exercised User Authentication & Roles
  - ![User Login](docs/images/front_end_testing/user_login.png)
- Exercised Tool Inventory
  - ![Tool Inventory](docs/images/front_end_testing/tool_inventory.png)
  - ![Tool Inventory Filters](docs/images/front_end_testing/filters.png)
  - ![Tool Inventory Category Filter](docs/images/front_end_testing/category_filter.png)
  - ![Tool Details](docs/images/front_end_testing/tool_details.png)
- Exercised Reservation System
  - Booking Reservations
  - ![Tool Reservation](docs/images/front_end_testing/reservation.png)
  - ![Reservation Table Update](docs/images/front_end_testing/reservation_db_update.png)
  - Listing existing reservations(Including multiple reservations)
  - ![Existing Reservations](docs/images/front_end_testing/existing_reservations.png)
  - ![Multiple Reservations](docs/images/front_end_testing/multiple_reservations.png)
  - Cancelling existing reservations
- Included an About page


# Deployment in to Docker
- Authored `docker-compose.yml` which orchestrates the below two Dockerfiles
  - src/client/Dockerfile
  - src/server/Dockerfile
  - `docker-compose.yml` defines three services
  - 1. server - Application backend
  - 2. client - Application frontend
  - 3. db - isolated PostgreSql DB instance
- docker-compose down -v
- docker-compose build
- docker-compose up
- ![Docker up and running](docs/images/docker.png)


