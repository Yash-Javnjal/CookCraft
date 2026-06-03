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
}