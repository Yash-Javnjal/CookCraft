# 🍳 CookCraft

> Discover recipes from ingredients you already have.

CookCraft is a modern full-stack recipe discovery platform that helps users find recipes based on the ingredients available in their kitchen. Instead of searching for a recipe first and then purchasing ingredients, users input what they have and discover what they can cook.

---

## ✨ Vision

Millions of people open their refrigerator every day and ask the same question:

> "What can I cook with what I already have?"

CookCraft aims to answer that question instantly through intelligent ingredient matching, recipe discovery, and a seamless user experience.

---

## 🚀 Core Features

### Ingredient-Based Recipe Search

Search recipes using available ingredients.

Example:

```text
Eggs, Cheese, Onion, Tomato
```

CookCraft returns recipes that best match the provided ingredients.

---

### Smart Match Percentage

Each recipe includes a compatibility score.

Example:

```text
Cheese Omelette

95% Match

Missing:
- Milk
```

Users immediately understand how close they are to preparing a recipe.

---

### Recipe Discovery

Browse recipes with:

* Images
* Cook Time
* Calories
* Difficulty
* Cuisine
* Ingredient Match Score

---

### Detailed Recipe Pages

Every recipe contains:

* Ingredients
* Step-by-step instructions
* Nutrition information
* Missing ingredients
* Preparation details

---

### Favorites System

Authenticated users can:

* Save recipes
* View saved recipes
* Manage personal collections

---

### Advanced Filtering

Filter recipes by:

* Cuisine
* Difficulty
* Cook Time
* Dietary Preference

---

## 🏗️ Architecture

```text
User
 │
 ▼
Next.js Frontend
 │
 ▼
Express API
 │
 ▼
Prisma ORM
 │
 ▼
PostgreSQL Database
```

---

## 🛠️ Technology Stack

### Frontend

* Next.js
* TypeScript
* CSS Modules
* Framer Motion

### Backend

* Node.js
* Express.js
* TypeScript

### Database

* PostgreSQL (Supabase)

### ORM

* Prisma

### Authentication

* Supabase Auth
* Google OAuth (Planned)

### Deployment

* Vercel
* Railway / Render
* Supabase

---

## 📂 Project Structure

```text
cookcraft/

├── client/
│   ├── src/
│   └── public/
│
├── server/
│   ├── prisma/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   └── utils/
│
└── docs/
    ├── architecture.md
    ├── api-routes.md
    ├── database-design.md
    └── project-roadmap.md
```

---

## 🗄️ Database Design

Primary entities:

* Users
* Recipes
* Ingredients
* Recipe Ingredients
* Recipe Steps
* Favorites

Relationships are managed through Prisma and PostgreSQL.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database (or Supabase account)

### Environment Setup

1. Clone the repository:
```bash
git clone https://github.com/Yash-Javnjal/CookCraft.git
cd CookCraft
```

2. Create `.env.local` files in both `client/` and `server/` directories with the required environment variables.

---

## 💾 Database Setup with Prisma

### 1. Install Dependencies

From the `server/` directory:

```bash
cd server
npm install
```

### 2. Configure Database Connection

Update the `.env` file in the `server/` directory with your database URL:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/cookcraft"
# or for Supabase:
DATABASE_URL="postgresql://user:password@db.supabase.co:5432/postgres"
```

### 3. Run Prisma Migrations

Initialize and apply database migrations:

```bash
# Generate Prisma Client
npx prisma generate

# Create/Update database schema
npx prisma migrate dev --name init

# Or apply existing migrations
npx prisma migrate deploy
```

### 4. Seed the Database (Optional)

If you have seed data:

```bash
npx prisma db seed
```

### 5. View Database in Prisma Studio

To visualize and manage your database:

```bash
npx prisma studio
```

This opens a web interface at `http://localhost:5555`

---

## 🖥️ Frontend Setup

### 1. Install Dependencies

From the `client/` directory:

```bash
cd client
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the `client/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The frontend will be available at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
npm run start
```

---

## ⚙️ Backend Setup

### 1. Install Dependencies

From the `server/` directory:

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `server/` directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/cookcraft"
PORT=5000
NODE_ENV=development
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
JWT_SECRET=your_jwt_secret
```

### 3. Run Prisma Migrations

```bash
npx prisma migrate dev --name init
```

### 4. Start Development Server

```bash
npm run dev
# or
npm start
```

The backend API will be available at `http://localhost:5000`

### 5. Build for Production

```bash
npm run build
npm start
```

---

## 🔄 Complete Setup Flow

Here's the recommended order to get everything running:

```bash
# 1. Clone repository
git clone https://github.com/Yash-Javnjal/CookCraft.git
cd CookCraft

# 2. Setup Database with Prisma
cd server
npm install
# Configure .env with DATABASE_URL
npx prisma generate
npx prisma migrate dev --name init
npx prisma studio  # (optional, to verify database)

# 3. Start Backend
npm run dev

# 4. In a new terminal, setup Frontend
cd ../client
npm install
# Configure .env.local with API and Supabase URLs
npm run dev

# Frontend will be at http://localhost:3000
# Backend API at http://localhost:5000
# Prisma Studio at http://localhost:5555
```

---

## 📈 Development Roadmap

### MVP (Current Phase)

* Ingredient Search
* Match Percentage Algorithm
* Recipe Listing
* Recipe Details
* Authentication
* Favorites
* Responsive Design
* Deployment

### Future Releases

* AI Recipe Generation
* Fridge Image Recognition
* Meal Planning
* Shopping List Generation
* Personalized Recommendations

---

## 🎯 Project Goals

* Reduce food waste
* Simplify meal discovery
* Provide a fast and intuitive cooking experience
* Build a scalable recipe intelligence platform

---

## 👨‍💻 Author

**Yash Javanjal**

Building modern full-stack applications with a focus on scalable architecture, developer experience, and real-world problem solving.

GitHub:
https://github.com/Yash-Javnjal

---

> CookCraft transforms everyday ingredients into discoverable meals, making home cooking simpler, smarter, and more accessible.
