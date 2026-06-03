// src/routes/search.route.ts

import { Router } from "express";
import { SearchController } from "../controllers/search.controller";

const router = Router();
const searchController = new SearchController();

/**
 * POST /api/search
 * Body: { ingredients: string[] }
 */
router.post("/", searchController.searchRecipes);

export default router;
