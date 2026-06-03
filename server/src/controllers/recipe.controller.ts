// src/controllers/recipe.controller.ts

import { Request, Response, NextFunction } from "express";
import { RecipeService } from "../services/recipe.service";

export class RecipeController {
  private recipeService: RecipeService;

  constructor() {
    this.recipeService = new RecipeService();
  }

  /**
   * GET /api/recipes
   * Returns all recipes with their ingredients and steps.
   */
  getAllRecipes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const recipes = await this.recipeService.getAllRecipes();
      res.status(200).json({
        success: true,
        count: recipes.length,
        data: recipes,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /api/recipes/:id
   */
  getRecipeById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = String(req.params.id);

      if (!id) {
        res.status(400).json({ success: false, message: "Invalid recipe id" });
        return;
      }

      const recipe = await this.recipeService.getRecipeById(id);

      if (!recipe) {
        res.status(404).json({ success: false, message: "Recipe not found" });
        return;
      }

      res.status(200).json({ success: true, data: recipe });
    } catch (error) {
      next(error);
    }
  };
}