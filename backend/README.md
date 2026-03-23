# Dahira DETBN Backend

Backend for the Dahira Management System built with Node.js, Express, and MongoDB.

## Prerequisites

- Node.js (v14+)
- MongoDB (Running locally or on Atlas)

## Getting Started

1.  **Clone or Download** the backend folder.
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Configure Environment Variables**:
    -   Rename `.env.example` to `.env`.
    -   Update `MONGODB_URI` and `JWT_SECRET`.
4.  **Seed the Database**:
    ```bash
    npm run seed
    ```
5.  **Start the Server**:
    ```bash
    npm run dev
    ```

## Project Structure

-   `models/`: Mongoose schemas for data entities.
-   `routes/`: Express routes (to be implemented).
-   `controllers/`: Route logic (to be implemented).
-   `config/`: Database connection.
-   `seed.js`: Data seeding script.
-   `server.js`: Entry point.

## API Endpoints (Planned)

-   `POST /api/auth/register`: Register a new user.
-   `POST /api/auth/login`: Login and get a JWT.
-   `GET /api/members`: List all members.
-   `POST /api/members`: Add a new member.
-   `GET /api/events`: List all events.
-   `GET /api/news`: List all news articles.
-   `GET /api/finances`: List all transactions.
