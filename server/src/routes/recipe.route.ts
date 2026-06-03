// src/routes/recipe.route.ts

import { Router } from "express";
import { RecipeController } from "../controllers/recipe.controller";

const router = Router();
const recipeController = new RecipeController();



/**
 * @route   GET /api/recipes
 * @desc    Fetch all recipes
 */
router.get("/", recipeController.getAllRecipes);

/**
 * @route   GET /api/recipes/:id
 * @desc    Fetch single recipe by id
 */
router.get("/:id", recipeController.getRecipeById);

/**
 * @route   GET /api/recipes/cuisine/:name
 * @desc    Fetch single recipe by cuisine name
 */
router.get("/cuisine/:name", recipeController.getCuisineName);

console.log("Recipe Route LOADED");

export default router;