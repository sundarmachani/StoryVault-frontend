# StoryVault Application

## Overview

StoryVault is a full-stack diary application consisting of two separate repositories: **StoryVault-backend** and **Storyvault-frontend**.

- **StoryVault-backend** is a Spring Boot application (Java 21) that provides secure RESTful APIs using JWT authentication, integrates Swagger for API documentation, and uses PostgreSQL for data storage.
- **Storyvault-frontend** is a ReactJS application that delivers a modern, responsive user interface for user authentication (login and registration) and diary entry management.

## Features

### Backend (StoryVault-backend)

- **Secure Authentication:** Uses JWT tokens to secure API endpoints.
- **User Registration:** Validates email addresses and enforces strong password criteria.
- **Diary Management:** CRUD operations for diary entries.
- **API Documentation:** Swagger UI for interactive API exploration.
- **Database:** Uses PostgreSQL for persistent storage.
- **Technologies:** Java 21, Spring Boot, Maven.

### Frontend (Storyvault-frontend)

- **User Interface:** Responsive design built with ReactJS.
- **Routing & Navigation:** Uses React Router for smooth navigation.
- **Authentication & Registration:** Forms with client-side validations for email and password strength.
- **Diary Entry Management:** Create, view, update, and delete diary entries.
- **HTTP Communication:** Axios for API calls.
- **Styling:** Custom CSS with variables and media queries.
- **Technologies:** ReactJS, Axios, React Router, CSS.

## Project Structure

The project is maintained as two separate repositories:

**StoryVault-backend**

```
StoryVault-backend/
├── src/main/java/           # Java source code (controllers, services, models, security, etc.)
├── src/main/resources/      # Configuration files (e.g., application.properties)
└── pom.xml                  # Maven build file
```

**Storyvault-frontend**

```
Storyvault-frontend/
├── public/                  # Static assets (index.html, favicon, etc.)
├── src/                     # React components, pages, etc.
└── package.json             # npm dependencies and scripts
```

## Setup Instructions

### Prerequisites

- **Backend:** Java 21, Maven, PostgreSQL.
- **Frontend:** Node.js and npm.

### Backend Setup (StoryVault-backend)

1. **Configure Database:**  
   Edit `src/main/resources/application.properties` and set your PostgreSQL connection details:

   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/
   spring.datasource.username=
   spring.datasource.password=
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   ```

2. **Build and Run:**

   ```bash
   cd StoryVault-backend
   mvn clean install
   mvn spring-boot:run
   ```

3. **API Documentation:**
   Access Swagger UI at:
   ```
   http://localhost:8080/swagger-ui/index.html
   ```

### Frontend Setup (Storyvault-frontend)

1. **Install Dependencies:**

   ```bash
   cd Storyvault-frontend
   npm install
   ```

2. **Start the Development Server:**

   ```bash
   npm run dev
   ```

3. **Access the Application:**
   Open `http://localhost:5173` in your browser.

## Environment Variables (Frontend)

Create a `.env` file in the root of the Storyvault-frontend repository:

```
REACT_APP_API_BASE_URL=http://localhost:8080
```

## API Endpoints (Backend)

### Authentication & Registration

- **POST /authenticate**
  Authenticates user credentials and returns a JWT token.
- **POST /register**
  Registers a new user.
  Example payload:
  ```json
  {
    "username": "user@example.com",
    "password": "YourStrongP@ssw0rd"
  }
  ```

### Diary Entry Endpoints

| Endpoint           | Method | Description                    |
| ------------------ | ------ | ------------------------------ |
| /new-entry         | POST   | Create a new diary entry       |
| /get-all           | GET    | Retrieve all diary entries     |
| /get-entry/{id}    | GET    | Retrieve a diary entry by ID   |
| /update-entry      | PUT    | Update an existing diary entry |
| /delete-entry/{id} | DELETE | Delete a diary entry by ID     |

## Deployment

### Frontend Deployment (Vercel)

1. **Push Code:**
   Push the Storyvault-frontend code to GitHub.
2. **Vercel Setup:**
   - Sign up or log in to Vercel and import the repository.
   - Set the project's root directory to the Storyvault-frontend folder.
   - Configure the build command (e.g., npm run build) and output directory (typically build).
   - Set environment variables (e.g., REACT_APP_API_BASE_URL) to point to your live backend URL.
3. **Deploy:**
   Vercel will deploy the frontend and provide a live URL.

### Backend Deployment (Render)

1. **Create a Web Service:**
   - Sign up or log in to Render.
   - Create a new Web Service and select your GitHub repository.
   - Choose the Java runtime environment.
   - Set the build command (e.g., `./mvnw clean install`).
   - Set the start command (e.g., `java -jar target/storyvault-backend.jar`).
2. **Configure Environment Variables:**
   - Set environment variables for your PostgreSQL connection (from Render PostgreSQL instance).
   - Add any other necessary environment variables like JWT secret.
3. **Deploy:**
   - Render will automatically build and deploy your application.
   - Monitor the deployment logs to ensure everything starts correctly.

### Database (Render PostgreSQL)

1. **Create a PostgreSQL Instance:**
   - In the Render dashboard, create a new PostgreSQL database.
   - Note the connection details (host, port, database name, username, password).
2. **Configure Connection:**
   - Add the PostgreSQL connection details as environment variables in your Render Web Service configuration.
3. **Security:**
   - Render automatically secures the connection between your web service and database when both are hosted on Render.

## Running the Application Locally

1. **Start the Backend:**
   Follow the Backend Setup instructions in the StoryVault-backend repository.
2. **Start the Frontend:**
   Follow the Frontend Setup instructions in the Storyvault-frontend repository.
3. **Access the Application:**
   Open `http://localhost:5173` in your browser.
   - Example test credentials
     - Username: admin
     - Password: password

## Future Enhancements

- Implement role-based access control and advanced user management.
- Add pagination and search functionality for diary entries.
- Enhance the UI with additional themes and animations.
- Integrate comprehensive unit and integration tests.
- Improve logging and monitoring for production.

## Contact

For questions or support, please contact [sundarmachani@gmail.com]
