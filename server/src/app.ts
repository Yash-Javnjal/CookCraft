// src/app.ts

import express, { Application, Request, Response, NextFunction } from "express";
import recipeRoutes from "./routes/recipe.route";
import searchRoutes from "./routes/search.route";

const app: Application = express();

// ─── Global Middleware ────────────────────────────────────

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Routes ──────────────────────────────────────────────

app.use("/api/recipes", recipeRoutes);
app.use("/api/search", searchRoutes);

// Health check
app.get("/api/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// ─── 404 Handler ─────────────────────────────────────────

app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

// ─── Global Error Handler ─────────────────────────────────

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("[Error]", err.message);
  res.status(500).json({
    success: false,
    message: err.message || "Internal server error.",
  });
});

console.log("APP LOADED");

export default app;

