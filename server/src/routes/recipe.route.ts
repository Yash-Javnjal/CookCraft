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

/**
 * @route   POST /api/recipes
 * @desc    Create a new recipe
 */
router.post("/", recipeController.createRecipe);

/**
 * @route   PUT /api/recipes/:id
 * @desc    Update a recipe by id
 */
router.put("/:id", recipeController.updateRecipe);

/**
 * @route   DELETE /api/recipes/:id
 * @desc    Delete a recipe by id
 */
router.delete("/:id", recipeController.deleteRecipe);

console.log("Recipe Route LOADED");

export default router;