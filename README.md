# CookCraft

A full-stack recipe discovery platform that helps users find recipes based on ingredients they already have. Users can search by ingredient, browse by cuisine, create and manage their own recipes, and save favorites — all through a polished, editorial-style interface.

**Live:** [cook-craft-eosin.vercel.app](https://cook-craft-eosin.vercel.app)

**Author:** [Yash Javanjal](https://github.com/Yash-Javnjal)

---

## Tech Stack

| Layer          | Technology                                              |
| -------------- | ------------------------------------------------------- |
| Frontend       | Next.js 16, React 19, TypeScript, Tailwind CSS 4        |
| Animations     | Framer Motion, Lenis (smooth scroll)                    |
| Backend        | Node.js, Express 5, TypeScript                          |
| Database       | PostgreSQL (Supabase)                                   |
| ORM            | Prisma 7                                                |
| Authentication | Supabase Auth                                           |
| Deployment     | Vercel (client), Railway (server)                       |

---

## Features

- **Ingredient-Based Search** — Input available ingredients and get ranked recipes with a match percentage and missing-ingredient breakdown.
- **Recipe CRUD** — Authenticated users can create, edit, and delete their own recipes with ingredients, step-by-step instructions, images, and metadata.
- **Favorites System** — Save and manage a personal collection of bookmarked recipes.
- **Cuisine Browsing** — Explore recipes filtered by cuisine, difficulty, cook time, and dietary preference.
- **User Profile Dashboard** — View personal stats (recipes created, favorites saved, most-used cuisine, total cook time), manage recipes, and track recent activity.
- **Detailed Recipe Pages** — Full recipe view with ingredients, instructions, nutrition info, and related metadata.

---

## Architecture

```
Client (Next.js)  →  REST API (Express)  →  Prisma ORM  →  PostgreSQL
```

### API Routes

| Method   | Endpoint                    | Description                  |
| -------- | --------------------------- | ---------------------------- |
| `GET`    | `/api/recipes`              | List all recipes             |
| `GET`    | `/api/recipes/:id`          | Get recipe by ID             |
| `GET`    | `/api/recipes/cuisine/:name`| Get recipes by cuisine       |
| `POST`   | `/api/recipes`              | Create a recipe              |
| `PUT`    | `/api/recipes/:id`          | Update a recipe              |
| `DELETE` | `/api/recipes/:id`          | Delete a recipe              |
| `GET`    | `/api/search?q=`            | Search recipes by ingredient |
| `POST`   | `/api/favorites`            | Add a favorite               |
| `DELETE` | `/api/favorites`            | Remove a favorite            |
| `GET`    | `/api/users/profile/:id`    | Get user profile & stats     |

### Data Model

```
User ──< Recipe ──< RecipeStep
              │
              ├──< RecipeIngredient >── Ingredient
              │
              └──< Favorite >── User
```

Core entities: `User`, `Recipe`, `Ingredient`, `RecipeIngredient`, `RecipeStep`, `Favorite`. Enums for `Difficulty`, `DietType`, and `RecipeType`.

---

## Project Structure

```
cookcraft/
├── client/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # Reusable UI components
│   ├── context/          # Auth context provider
│   ├── services/         # API service layer
│   ├── lib/              # Axios instance & utilities
│   └── types/            # TypeScript type definitions
│
└── server/
    ├── prisma/            # Schema & migrations
    └── src/
        ├── controllers/   # Request handlers
        ├── routes/        # Express route definitions
        └── services/      # Business logic layer
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 16
- PostgreSQL database (or [Supabase](https://supabase.com) account)

### Setup

```bash
git clone https://github.com/Yash-Javnjal/CookCraft.git
cd CookCraft

# Server
cd server
npm install
# Configure .env with DATABASE_URL, SUPABASE_URL, SUPABASE_ANON_KEY
npx prisma generate
npx prisma migrate dev --name init
npm run dev                          # → http://localhost:5000

# Client (new terminal)
cd ../client
npm install
# Configure .env with NEXT_PUBLIC_API_URL, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
npm run dev                          # → http://localhost:3000
```

---
## License

MIT



