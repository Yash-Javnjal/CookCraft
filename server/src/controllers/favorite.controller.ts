// src/controllers/favorite.controller.ts

import { Request, Response, NextFunction } from "express";
import { prisma } from "../../prisma/prisma";

export class FavoriteController {
  /**
   * POST /api/favorites/toggle
   * Toggles the favorite status of a recipe for a user.
   */
  toggleFavorite = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userId, recipeId } = req.body;

      if (!userId || !recipeId) {
        res.status(400).json({ success: false, message: "userId and recipeId are required." });
        return;
      }

      // Check if user exists
      const userExists = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!userExists) {
        res.status(404).json({ success: false, message: "User not found in database." });
        return;
      }

      // Check if recipe exists
      const recipeExists = await prisma.recipe.findUnique({
        where: { id: recipeId },
      });
      if (!recipeExists) {
        res.status(404).json({ success: false, message: "Recipe not found." });
        return;
      }

      // Check if already favorited
      const existing = await prisma.favorite.findUnique({
        where: {
          userId_recipeId: { userId, recipeId },
        },
      });

      if (existing) {
        // Delete favorite
        await prisma.favorite.delete({
          where: {
            userId_recipeId: { userId, recipeId },
          },
        });
        res.status(200).json({
          success: true,
          favorited: false,
          message: "Recipe removed from favorites.",
        });
      } else {
        // Create favorite
        await prisma.favorite.create({
          data: {
            userId,
            recipeId,
          },
        });
        res.status(200).json({
          success: true,
          favorited: true,
          message: "Recipe added to favorites.",
        });
      }
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /api/favorites/:userId
   * Returns all recipe IDs favorited by the user.
   */
  getUserFavorites = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = String(req.params.userId);

      if (!userId) {
        res.status(400).json({ success: false, message: "userId parameter is required." });
        return;
      }

      const favorites = await prisma.favorite.findMany({
        where: { userId },
        select: { recipeId: true },
      });

      const recipeIds = favorites.map((f) => f.recipeId);

      res.status(200).json({
        success: true,
        data: recipeIds,
      });
    } catch (error) {
      next(error);
    }
  };
}
