Neighborhood Tool Library
Full Stack Development Project


Objective
Build a full-stack Neighborhood Tool Library platform where community members 
can borrow shared tools (e.g., lawnmowers, drills). The system should include 
inventory management, reservations, reminders, and community-driven features 
like damage reporting and reviews.


Functional Requirements
Frontend (React)
1. User Authentication & Roles
a. Sign-up/login with email/password.
b. Roles: Member (borrow tools) and Admin (manage inventory, resolve issues). **
2. Tool Inventory
a. Browse tools with filters (category, availability).
b. View tool details: description, availability calendar, and user reviews.
3. Reservation System
a. Reserve tools for specific dates (check real-time availability).
b. View/cancel upcoming reservations in a dashboard.
4. Damage Reporting
a. Submit reports with descriptions and optional photo uploads.
5. User Reviews
a. Leave ratings and comments after returning a tool.


Frontend (React)
3. Admin Dashboard **
a. Add/remove tools, manage reservations, and resolve damage reports. **
4. UI/UX
a. Responsive design with clear status indicators (e.g., "Available until Friday").

Functional Requirements


Functional Requirements
Backend (Node.js/Express)
1. Authentication
a. JWT-based authentication with role-based access control (RBAC).
2. APIs
a. Tools:
i. CRUD operations (GET /api/tools, POST /api/tools).
ii. Check availability by querying overlapping reservations.
b. Reservations:
i. Handle reservations (POST /api/reservations) with date validation.
c. Damage Reports:
i. Submit and resolve reports (PATCH /api/reports/:id).
d. Reviews:
i. Post reviews (POST /api/reviews) after reservation completion.


Functional Requirements
Backend (Node.js/Express)
3. Reminders **
a. Send email/SMS reminders 24 hours before pickup (use SendGrid/Twilio). **
4. Validation **
a. Prevent double bookings and invalid dates (e.g., past dates). **


Functional Requirements
Database (PostgreSQL):
1. Tables
a. Users: id, name, email, password_hash, role (member/admin).
b. Tools: id, name, description, category, image_url.
c. Reservations: id, tool_id, user_id, start_date, end_date, status 
pending/active/closed).
d. DamageReports: id, tool_id, user_id, description, image_url, resolved (boolean).
e. Reviews: id, tool_id, user_id, rating (1-5), comment.
2. Relationships
a. Users → Reservations: 1:N.
b. Tools → Reservations: 1:N.
c. Tools → DamageReports: 1:N.
d. Tools → Reviews: 1:N.


1. Dockerize
a. Create Dockerfile for frontend, backend, and PostgreSQL.
b. Use docker-compose.yml to manage services and environment variables.
2. Cloud Deployment
a. Deploy containers to AWS EC2, Heroku, or DigitalOcean.
b. Configure secrets (e.g., JWT_SECRET, SENDGRID_API_KEY).

Deployment


Testing
1. Backend
a. Test API endpoints for reservation conflicts and role-based access.
2. Frontend
a. Validate form submissions (e.g., reservation dates, review ratings). *
3. Database
a. Ensure cascading deletes (e.g., deleting a tool removes its reservations). *


Documentation
1. README.md
a. Setup instructions (local and Docker).
b. API documentation (Postman/Swagger).
c. Screenshots of key pages (tool catalog, reservation flow).
2. Bonus
a. Add a video demo of the QR checkout process.


Submission Requirements
1. GitHub Repository
a. Organized code (e.g., client, server, database).
b. Include SQL schema and docker-compose.yml.
2. Deployed Application
a. Live links to the hosted frontend and backend.


1. QR Code Check-In/Checkout  **
a. Generate QR codes for tools; scan to update reservation status.
2. SMS Notifications
a. Integrate Twilio for pickup/return reminders.
3. Tool Categories
a. Advanced filtering (e.g., "Gardening Tools", "Power Tools").

Bonus Features (Optional)


Project Guidelines
Development Guidelines:
● Follow clean, modular design principles.
● Use version control (GitHub) and maintain a clear commit history.
● Write well-documented code with meaningful comments.

Testing:
● Validate SQL queries for performance and accuracy.
● Test all API endpoints for expected functionality.
● Validate form inputs.
● Verify the functionalities.
● Check relational integrity using foreign key constraints.
● Test indexing for optimized query performance.


Project Guidelines
Documentation:
● Provide a README.md file with:
○ Development process.
○ Challenges faced and solutions implemented.
○ Screenshots and examples of the application in use.
○ Deployment steps and requirements.
● Database Initialization:
○ Provide SQL scripts to create tables and insert initial data.


Submission Requirements
● GitHub Repository:
○ Share the repository link containing the complete codebase, including Docker 
configurations.
● Deployed Application:
○ Provide live links to the deployed frontend (e.g., Vercel) and backend (e.g., Heroku).
● Documentation (README.md):
○ Explain the development process and tools used.
○ Include screenshots, videos, or GIFs demonstrating the application’s functionality and 
design.

