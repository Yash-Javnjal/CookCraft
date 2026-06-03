// src/routes/recipe.route.ts

import { Router } from "express";
import { RecipeController } from "../controllers/recipe.controller";

const router = Router();
const recipeController = new RecipeController();

/**
 * @route   GET /api/recipes
 * @desc    Fetch all recipes
 * @access  Public
 */
router.get("/", recipeController.getAllRecipes);

export default router;