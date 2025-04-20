
# Setting up of DB(PostgreSQL)
- Install PostgreSQL from https://www.postgresql.org/download/windows/
- Install HeidiSQL for managing the DB https://www.heidisql.com/download.php
- Import DB/database.sql in HeidiSQL to create the tool_library_db database
- ![Neighborhood Database](docs/images/db.png)

# Setting up of Backend APIs
- Implemented below set of APIs
  - Auth Controller
    - /api/auth/login
    - /api/auth/signup
  - Tool Controller
    - /api/tools
    - /api/tools
    - /api/tools/1
  - Reservation Controller
    - /api/reservations
    - /api/reservations/my
    - /api/reservations/user/2
  - Review Controller
    - /api/reviews
    - /api/reviews/1
  - Damage Report Controller
    - /api/reports
    - /api/reports/1

## How to run the backend?
- .env file has the DB connection details and database(tool_library_db) to connect
- The below command will run the backend at 5000 port
  - npm run dev
- ![Start backend](docs/images/start_backend.png)

## How to test backend API?
- Used postman and create a API collection in
  PostmanCollection/Neighborhood-Backend-API-Collection.json to easily exercise
  backend API and validate the response
- ![Neighborhood Postman backend API collection](docs/images/postman_collection.png)
  - ![Login API](docs/images/api/login_api.png)
  - ![Get all tools API](docs/images/api/get_all_tools_api.png)
  - ![Reservation API](docs/images/api/reservations_api.png)
  - ![Review API](docs/images/api/review_api.png)
  - ![Submit Damage Report API](docs/images/api/submit_damage_report.png)
