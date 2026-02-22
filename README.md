# PrimeTrade Backend Developer Assignment - Scalable REST API

A full-stack implementation of a scalable REST API featuring secure JWT authentication, Role-Based Access Control (RBAC), and full CRUD operations. Built as part of the PrimeTrade Backend Developer (Intern) assessment.

### 🔑 Test Credentials (RBAC Demonstration)
To test the Role-Based Access Control without manipulating the database, please use the following pre-configured accounts:

* **Admin Account:**
  * **Email:** `admin@primetrade.com` *(Create this in your app, then promote via database!)*
  * **Password:** `admin123`
  * **Permissions:** Full CRUD access, including the ability to permanently `DELETE` entities.
* **Standard User Account:**
  * **Email:** `user@primetrade.com` *(Create this in your app!)*
  * **Password:** `user123`
  * **Permissions:** Read, Write, and Update access. The `DELETE` functionality is explicitly restricted at both the UI and API router levels.

---

## 🏗️ Architecture & Scalability Note

Designing for the Web3 and crypto-intelligence space requires systems built for high throughput and reliability. This backend architecture was designed with the following scalability principles:

1. **Database Connection Pooling (Neon Serverless Postgres):**
   * Utilizing Neon allows the database layer to scale compute automatically. Connection pooling is configured to prevent connection exhaustion during high concurrent lambda/serverless invocations on Vercel.
2. **Modular Architecture:**
   * The codebase strictly separates Concerns (Routes → Controllers → Middlewares). This structure ensures that as new modules are added, the system can easily be decoupled into a **Microservices Architecture**.
3. **Stateless Authentication (JWT):**
   * By embedding the user `id` and `role` within the JWT payload, the API remains completely stateless. This eliminates the need for database lookups on every protected request and allows horizontal scaling behind a Load Balancer.
4. **Future Optimizations (Ready to Implement):**
   * **Caching:** The controller logic is structured to easily integrate **Redis** for caching frequently accessed read-heavy routes (like fetching notes/bookmarks).
   * **Rate Limiting:** Ready for IP-based rate limiting to prevent DDoS attacks and brute-force login attempts.

---

## ⚙️ Tech Stack

**Backend (Primary Focus):**
* **Node.js & Express.js** (API Framework)
* **PostgreSQL** (Database - Hosted on Neon)
* **Prisma ORM** (Schema management & type-safe queries)
* **Bcryptjs & JSONWebToken** (Security & Auth)
* **Vercel** (Serverless Deployment)

**Frontend (Supportive UI):**
* **Next.js (React)** * **TailwindCSS** (Styling)
* **Lucide React** (Icons)

---

## 🔒 Core Features Implemented

- [x] **API Versioning:** All routes are correctly versioned (e.g., `/api/v1/auth`, `/api/v1/notes`).
- [x] **Secure Authentication:** Passwords hashed with `bcrypt` (10 rounds). JWT token generation upon login.
- [x] **Role-Based Access (RBAC):** Custom middleware intercepts requests to verify `ADMIN` vs `USER` privileges encoded in the JWT.
- [x] **CRUD Operations:** Fully functional Endpoints for managing Notes and Bookmarks.
- [x] **Validation & Error Handling:** Graceful error handling preventing raw database errors from leaking to the client.
- [x] **Frontend Integration:** A clean, responsive Next.js UI that consumes the APIs, manages JWT state in `localStorage`, and conditionally renders UI elements based on the user's role.

---

## 💻 Local Setup Instructions

If you wish to run this application locally:

### 1. Clone the repository
```bash
git clone [https://github.com/aryangoel984/PrimeTrade-Backend-Assignment.git](https://github.com/aryangoel984/PrimeTrade-Backend-Assignment.git)

cd PrimeTrade-Backend-Assignment
cd backend
npm install

# Create a .env file and add your credentials:
# DATABASE_URL="your_neon_postgres_url"
# JWT_SECRET="your_secret_key"
# PORT=3001

npx prisma generate
npx prisma db push

npm run dev
cd ../frontend
npm install

# Create a .env.local file and add your local API URL:
# NEXT_PUBLIC_API_URL="http://localhost:3001/api/v1"

npm run dev
Developed by Aryan Goel for the PrimeTrade Engineering Assessment.