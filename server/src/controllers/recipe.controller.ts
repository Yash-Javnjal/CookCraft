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
    next: NextFunction,
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
    next: NextFunction,
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

  getCuisineName = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const name = String(req.params.name);

      if (!name) {
        res.status(400).json({ success: false, message: "Invalid cuisine" });
        return;
      }

      const recipes = await this.recipeService.getCuisineName(name);

      if (recipes.length === 0) {
        res.status(200).json({ success: false, message: "No recipes found" });
        return;
      }

      res.status(200).json({ success: true, data: recipes });
    } catch (error) {
      next(error);
    }
  };

  createRecipe = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { userId, ...recipeData } = req.body;
      if (!userId) {
        res.status(400).json({ success: false, message: "userId is required to create a recipe." });
        return;
      }
      const { recipeType } = recipeData;
      if (!recipeType || (recipeType !== "VEG" && recipeType !== "NON_VEG")) {
        res.status(400).json({ success: false, message: "recipeType is required and must be either 'VEG' or 'NON_VEG'." });
        return;
      }
      const recipe = await this.recipeService.createRecipe(userId, recipeData);
      res.status(201).json({ success: true, data: recipe });
    } catch (error) {
      next(error);
    }
  };

  updateRecipe = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = String(req.params.id);
      const recipeData = req.body;
      if (!id) {
        res.status(400).json({ success: false, message: "Recipe ID is required." });
        return;
      }
      const { recipeType } = recipeData;
      if (!recipeType || (recipeType !== "VEG" && recipeType !== "NON_VEG")) {
        res.status(400).json({ success: false, message: "recipeType is required and must be either 'VEG' or 'NON_VEG'." });
        return;
      }
      const recipe = await this.recipeService.updateRecipe(id, recipeData);
      res.status(200).json({ success: true, data: recipe });
    } catch (error) {
      next(error);
    }
  };

  deleteRecipe = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = String(req.params.id);
      if (!id) {
        res.status(400).json({ success: false, message: "Recipe ID is required." });
        return;
      }
      await this.recipeService.deleteRecipe(id);
      res.status(200).json({ success: true, message: "Recipe deleted successfully." });
    } catch (error) {
      next(error);
    }
  };
}
