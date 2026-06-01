# 🍳 CookCraft

> Discover recipes from ingredients you already have.

CookCraft is a modern full-stack recipe discovery platform that helps users find recipes based on the ingredients available in their kitchen. Instead of searching for a recipe first and then purchasing ingredients, CookCraft works in reverse by identifying recipes that can be prepared using ingredients the user already owns.

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
