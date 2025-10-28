# Project Setup Guide

This project consists of a simple backend server with Mastra AI integration and a frontend application. Mainly I am exploring the integration of AI into web dev. Testing, deployment anf other features will be added in future.

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or pnpm package manager

## Backend Setup

### 1. Navigate to the server directory

```bash
cd server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the `server` directory with the following content:

```properties
DATABASE_URL="file:./dev.db"
PORT=5000
GOOGLE_GENERATIVE_AI_API_KEY="your_api_key_here"
```

**Get your Google AI API Key:**
- Visit https://aistudio.google.com/
- Click "Get API Key"
- Create a new API key (free tier available, no credit card required)
- Replace `your_api_key_here` with your actual API key

### 4. Setup database

Run Prisma migrations to create the database:

```bash
npx prisma migrate dev
```

### 5. Seed the database (optional)

```bash
npm run db:seed
```

### 6. Start the backend server

```bash
npm run dev
```

The server should now be running on `http://localhost:5000`

---

## Frontend Setup

### 1. Navigate to the frontend directory

From the root of the project:

```bash
cd frontend
```

Or if you're in the server directory:

```bash
cd ../frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The frontend should now be running on `http://localhost:3000`

---

## Tech Stack

### Backend
- Express.js
- Mastra AI Framework
- Google Gemini AI
- Prisma ORM
- SQLite

### Frontend
- React
- TailwindCSS
- Vite
- Shadcn
