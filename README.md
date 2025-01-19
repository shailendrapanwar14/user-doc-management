# NestJS Backend Application

This project is a backend service built using [NestJS](https://nestjs.com/). The application includes user management, authentication, and document management features.

---

## **Features**

### **1. User Management**
- **CRUD Operations**: Create, Read, Update, and Delete users.
- **Role Management**: Supports roles such as `admin`, `editor`, and `viewer`.
- **Seed Data**: Automatically populates the database with test users for development purposes.

### **2. Authentication**
- **JWT-based Authentication**: Secure login using JSON Web Tokens.
- **Role-based Access Control**: API routes are protected based on user roles.
- **Login and Registration**: Endpoints for users to authenticate and create accounts.

### **3. Document Management**
- **Planned Features**: (To be implemented)
  - Document upload and metadata management.
  - Secure access and CRUD operations on documents.

---

## **Setup Instructions**

### **1. Prerequisites**
- [Docker](https://www.docker.com/) (for PostgreSQL setup)
- [Node.js](https://nodejs.org/) (v16 or higher)
- npm or yarn (Package manager)

### **2. Clone the Repository**
```bash
git clone <repository-url>
cd <project-folder>
