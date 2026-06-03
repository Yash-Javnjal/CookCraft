// src/routes/recipe.route.ts

import { Router } from "express";
import { RecipeController } from "../controllers/recipe.controller";

const router = Router();
const recipeController = new RecipeController();

router.get("/test", (_req, res) => {
  res.json({
    route: "recipe route working",
  });
});

/**
 * @route   GET /api/recipes
 * @desc    Fetch all recipes
 * @access  Public
 */
router.get("/", recipeController.getAllRecipes);

/**
 * @route   GET /api/recipes/:id
 * @desc    Fetch single recipe by id
 * @access  Public
 */
router.get("/:id", recipeController.getRecipeById);

console.log("Recipe Route LOADED");

export default router;