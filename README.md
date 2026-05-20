# TaskFlow API

A scalable REST API with JWT authentication, role-based access control, and a React frontend.


## Documentation

- [Project Documentation](docs/TaskFlow_Documentation.docx)
- [Project Screenshots](docs/TaskFlow_Screenshots.docx)

## PDF Versions

- [Documentation PDF](docs/TaskFlow_Documentation.pdf)
- [Screenshots PDF](docs/TaskFlow_Screenshots.pdf)

## Tech Stack

| Layer | Tech |
|---|---|
| Backend | Node.js, Express.js |
| Database | PostgreSQL + Sequelize ORM |
| Auth | JWT + bcrypt |
| Validation | Joi |
| Docs | Swagger (OpenAPI 3.0) |
| Frontend | React 18 + Vite |
| HTTP Client | Axios |

---

## Getting Started


### 1. Backend Setup

```bash
cd backend
cp .env.example .env

npm install
npm run dev
```

The server starts at `http://localhost:5000`.  
Swagger docs are live at `http://localhost:5000/api/v1/docs`.

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`. The Vite dev server proxies `/api` requests to the backend automatically.

### 3. Seed an Admin User

After the server starts, `POST /api/v1/auth/register` with:

```json
{
  "name": "Admin",
  "email": "admin@example.com",
  "password": "admin123",
  "role": "admin"
}
```

---

## API Endpoints

All routes prefixed with `/api/v1`.

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | Public | Register a user |
| POST | `/auth/login` | Public | Login, returns JWT |
| GET | `/auth/me` | User+ | Get own profile |
| GET | `/tasks` | User+ | List own tasks |
| POST | `/tasks` | User+ | Create task |
| GET | `/tasks/:id` | User+ | Get task by ID |
| PUT | `/tasks/:id` | User+ (owner) | Update task |
| DELETE | `/tasks/:id` | User+ (owner) | Delete task |
| GET | `/admin/users` | Admin | List all users |
| DELETE | `/admin/users/:id` | Admin | Delete a user |
| GET | `/admin/tasks` | Admin | List all tasks |



## Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Backend port (default 5000) |
| `DB_HOST` | Postgres host |
| `DB_PORT` | Postgres port |
| `DB_NAME` | Database name |
| `DB_USER` | Database user |
| `DB_PASSWORD` | Database password |
| `JWT_SECRET` | Secret for signing JWTs |
| `JWT_EXPIRES_IN` | Token expiry (e.g. `7d`) |
| `CLIENT_URL` | Frontend URL for CORS |

---

