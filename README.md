
# ComX - Community App

**ComX** is a robust community platform built to connect people. This full-stack application leverages modern web technologies to provide real-time communication, user authentication, and a seamless user experience. 

## Features

- Real-time communication via WebSockets
- User authentication and authorization with JWT
- State management using Redux Toolkit
- API integration with TanStack Query
- Frontend styled with ShadCN UI
- Backend powered by Node.js, Express.js, and PostgreSQL

---

## Tech Stack

**Frontend:**
- React
- ShadCN (UI components)
- TanStack Query
- Redux Toolkit

**Backend:**
- Node.js
- Express.js
- PostgreSQL
- WebSockets
- JSON Web Tokens (JWT)

---

## Getting Started

Follow the steps below to set up the project on your local machine.

### Prerequisites

Make sure you have the following installed:
- Node.js (v16 or later)
- npm (v8 or later) or Yarn
- PostgreSQL (v13 or later)

### Clone the Repository

```bash
git clone https://github.com/PrathamJain2601/comX.git
cd comX
```

---

## Backend Setup

1. **Navigate to the backend directory**  
   ```bash
   cd backend
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Set up the database**  
   - Create a PostgreSQL database.
   - Copy the `.env.example` file to `.env` and fill in the required details:  
     ```plaintext
     DATABASE_URL=your_postgres_connection_url
     JWT_SECRET=your_secret_key
     PORT=5000
     ```

4. **Run database migrations**  
   ```bash
   npm run migrate
   ```

5. **Start the backend server**  
   ```bash
   npm start
   ```

The backend server will run on `http://localhost:5000`.

---

## Frontend Setup

1. **Navigate to the frontend directory**  
   ```bash
   cd frontend
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Configure the environment**  
   - Copy the `.env.example` file to `.env` and update the `REACT_APP_API_URL` to point to your backend API (e.g., `http://localhost:5000`).

4. **Start the development server**  
   ```bash
   npm start
   ```

The frontend application will run on `http://localhost:3000`.

---

## Project Structure

```
comX/
├── backend/           # Backend application code
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── middleware/    # Express middleware
│   ├── utils/         # Utility functions
│   └── server.js      # Entry point for backend
├── frontend/          # Frontend application code
│   ├── components/    # Reusable components
│   ├── pages/         # Page components
│   ├── redux/         # Redux toolkit setup
│   ├── styles/        # Styling files (ShadCN)
│   └── App.js         # Entry point for frontend
└── README.md          # Documentation
```

---

## Running Tests

### Backend Tests
To run tests for the backend:
```bash
cd backend
npm test
```

### Frontend Tests
To run tests for the frontend:
```bash
cd frontend
npm test
```

---

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes and commit: `git commit -m 'Add feature-name'`.
4. Push to your fork: `git push origin feature-name`.
5. Submit a pull request.


---

## Contact

For questions or feedback, please contact:
- **Pratham Jain**  
  - GitHub: [@PrathamJain2601](https://github.com/PrathamJain2601)

---

