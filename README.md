# User Document Management System

This project is a backend service built using [NestJS](https://nestjs.com/). It provides functionality for user management, authentication, document management, and ingestion process handling.

---

## **Features**

### **1. Authentication APIs**
- **Register**: Create a new user account.
- **Login**: Authenticate and retrieve a JWT token.
- **Logout**: Invalidate tokens to securely log out users.
- **Role Management**: Support for roles such as `admin`, `editor`, and `viewer`.

### **2. User Management APIs**
- **Admin-only Access**: Manage user roles and permissions.
- **CRUD Operations**: Create, read, update, and delete user data.

### **3. Document Management APIs**
- **Metadata Management**: Manage document metadata (title, description, etc.).
- **File Upload**: Upload documents securely using Multer.
- **File Retrieval**: Fetch uploaded documents and their metadata.

### **4. Ingestion APIs**
- **Trigger Ingestion**: Interact with a Python backend to start ingestion processes.
- **Monitor Ingestion**: Track the status of ongoing ingestion processes.

---

## **Key Dependencies**
- **NestJS**: Backend framework for building scalable server-side applications.
- **TypeORM**: ORM for interacting with PostgreSQL.
- **Multer**: Middleware for handling file uploads.
- **amqp-connection-manager**: RabbitMQ connection management library.
- **Docker**: For containerized PostgreSQL and RabbitMQ setup.

---

## **Technology Stack**
- **Backend Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL (via TypeORM)
- **Authentication**: JWT with role-based authorization
- **Microservices**: RabbitMQ (optional, for inter-service communication)

---

## **Setup Instructions**

### **1. Prerequisites**
- [Node.js](https://nodejs.org/) (v16 or higher)
- [PostgreSQL](https://www.postgresql.org/) (Database)
- [Docker](https://www.docker.com/) (Optional for PostgreSQL setup)

### **2. Clone the Repository**
```bash
git clone https://github.com/shailendrapanwar14/user-doc-management.git
cd user-doc-management
```

### **3. Install Dependencies**
```bash
npm install
```

### **4. Configure Environment Variables**
Create a `.env` file in the root directory and configure the following:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=myuser
DB_PASSWORD=mypassword
DB_NAME=mydatabase

JWT_SECRET=your_secret_key
RABBITMQ_URL=amqp://localhost:5672
```

### **5. Setup PostgreSQL Using Docker**
Run the following command to set up PostgreSQL:
```bash
docker run --name postgres-db -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -e POSTGRES_DB=mydatabase -p 5432:5432 -d postgres
```

### **6. Run the Application**
- **Development Mode:**
  ```bash
  npm run start:dev
  ```
- **Production Mode:**
  ```bash
  npm run build
  npm run start:prod
  ```

### **7. Run Seed Script**
To populate the database with test users:
```bash
npm run seed
```

### **8. Optional: Docker Compose Setup**
To simplify setup, use `docker-compose.yml` to manage PostgreSQL, RabbitMQ, and the application. Example configuration:
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:latest
    environment:
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
      POSTGRES_DB: mydatabase
    ports:
      - "5432:5432"
  rabbitmq:
    image: rabbitmq:management
    ports:
      - "5672:5672"
      - "15672:15672"
  app:
    build:
      context: .
    environment:
      DB_HOST: postgres
      DB_PORT: 5432
      DB_USERNAME: myuser
      DB_PASSWORD: mypassword
      DB_NAME: mydatabase
      RABBITMQ_URL: amqp://rabbitmq:5672
```
Start the setup with:
```bash
docker-compose up
```
Stop the setup with:
```bash
docker-compose down
```

---

## **API Endpoints**

### **Authentication**
| Method | Endpoint       | Description             |
|--------|----------------|-------------------------|
| POST   | `/auth/register` | Register a new user     |
| POST   | `/auth/login`  | Authenticate a user     |
| POST   | `/auth/logout` | Log out a user          |

### **User Management**
| Method | Endpoint         | Description             |
|--------|------------------|-------------------------|
| GET    | `/users`         | Get all users           |
| GET    | `/users/:email`  | Get a user by email     |
| POST   | `/users`         | Create a new user       |
| PATCH  | `/users/:id`     | Update a user           |
| DELETE | `/users/:id`     | Delete a user           |

### **Document Management**
| Method | Endpoint          | Description             |
|--------|-------------------|-------------------------|
| POST   | `/documents/upload` | Upload a document       |
| GET    | `/documents`      | Get all documents       |
| DELETE | `/documents/:id`  | Delete a document       |

### **Ingestion APIs**
| Method | Endpoint                | Description                   |
|--------|-------------------------|-------------------------------|
| POST   | `/ingestion/trigger`    | Trigger the ingestion process |
| GET    | `/ingestion/:id/status` | Get the status of an ingestion process |

---

## **Testing**

### **Run Tests**
Execute the following command to run the test suite:
```bash
npm test
```

### **Test Coverage**
- Unit tests for `UsersController`, `AuthController`, and `DocumentsController`.
- Integration tests for authentication and user management.
- View test coverage reports by running:
  ```bash
  npm run test:cov
  ```

---

## **Work Done**

### **Implemented:**
1. **Authentication**:
   - JWT-based authentication with role-based access control.
   - Secure login, registration, and logout functionality.

2. **User Management**:
   - CRUD operations for users and admin-only role management.

3. **Document Management**:
   - File upload using Multer.
   - Metadata storage and CRUD operations.

4. **Ingestion Management**:
   - APIs to trigger and monitor ingestion processes.
   - Mock implementations to simulate Python backend communication.

5. **Database Seeder**:
   - Added a seeder script to populate the database with test data.
   - Generates 1000+ users with realistic data and roles (admin, editor, viewer).

6. **Docker Setup**:
   - Configured PostgreSQL using Docker for local development.
   - Includes support for environment variables and port mapping.

7. **Swagger Implementation**:
   - Integrated Swagger for API documentation.
   - Automatically generates and serves documentation at [http://localhost:3000/api/docs](http://localhost:3000/api/docs).
   - Includes schemas and examples for all major endpoints.

8. **Unit Test Cases**:
   - Added unit tests for critical services and controllers.
   - Achieved test coverage for authentication and user management modules.
   - Mocked dependencies to ensure isolated testing of application logic.

9. **Microservices Architecture**:
   - Implemented microservices architecture using NestJS to support modular and scalable designs.
   - Configured inter-service communication using message brokers and HTTP.

10. **RabbitMQ Integration**:
    - Integrated RabbitMQ for asynchronous communication between services.
    - Configured message queues for ingestion processes.
    - Ensured reliable messaging and error handling mechanisms for inter-service communication.

---

## **Planned Enhancements**
1. Implement real-time status updates using WebSockets.
2. Integrate with a live Python backend for ingestion.
3. Improve error handling and add custom exception filters.
4. Deploy the application to a cloud platform (e.g., AWS, GCP).
5. Add monitoring and observability with tools like Prometheus and Grafana.

---

## **Contributing**
Feel free to fork the repository and submit pull requests for new features or bug fixes. Please ensure code quality and include tests for your changes.

For more information on contributing, see the [CONTRIBUTING.md](CONTRIBUTING.md) file.

---
