
# Setting up of DB(PostgreSQL)
- Install PostgreSQL from https://www.postgresql.org/download/windows/
- Install HeidiSQL for managing the DB https://www.heidisql.com/download.php


# Setting up of Backend APIs
- Implemented below set of APIs
  - Auth Controller
  - Tool Controller
  - Reservation Controller
  - Review Controller
  - Damage Report Controller

## How to run the backend?
- .env file has the DB connection details and database(tool_library_db) to connect
- The below command will run the backend at 5000 port
  - npm run dev
