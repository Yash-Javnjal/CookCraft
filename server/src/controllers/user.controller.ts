// src/controllers/user.controller.ts

import { Request, Response, NextFunction } from "express";
import { prisma } from "../../prisma/prisma";

export class UserController {
  /**
   * POST /api/users/sync
   * Upserts the user on login/registration in the database.
   */
  syncUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, name } = req.body;

      if (!email) {
        res.status(400).json({ success: false, message: "Email is required to sync user." });
        return;
      }

      // Extract a chef name from the email if not provided
      let finalName = name || "";
      if (!finalName) {
        const parts = email.split("@")[0].split(/[._-]/);
        finalName = parts
          .map((p: string) => p.charAt(0).toUpperCase() + p.slice(1))
          .join(" ");
        if (!finalName) finalName = "Chef";
      }

      // Upsert the user
      const user = await prisma.user.upsert({
        where: { email },
        update: { name: finalName },
        create: {
          email,
          name: finalName,
        },
      });

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /api/users/profile/:id
   * Retrieves the profile summary, statistics, created recipes, and recent activity.
   */
  getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = String(req.params.id);

      if (!id) {
        res.status(400).json({ success: false, message: "User ID is required." });
        return;
      }

      // Fetch the user
      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        res.status(404).json({ success: false, message: "User not found." });
        return;
      }

      // 1. Fetch user's created recipes
      const createdRecipes = await prisma.recipe.findMany({
        where: { userId: id },
        include: {
          ingredients: {
            include: {
              ingredient: { select: { name: true } },
            },
          },
          steps: {
            orderBy: { stepNumber: "asc" },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      // 2. Fetch user's favorited recipes
      const favorites: any[] = await prisma.favorite.findMany({
        where: { userId: id },
        include: {
          recipe: {
            include: {
              ingredients: {
                include: {
                  ingredient: { select: { name: true } },
                },
              },
              steps: {
                orderBy: { stepNumber: "asc" },
              },
            },
          },
        },
        orderBy: { id: "desc" }, // order by the favorite record creation time
      });

      const favoriteRecipes = favorites
        .map((f) => f.recipe)
        .filter((r) => r !== null); // safety filter

      // 3. Compute stats
      const recipesCreatedCount = createdRecipes.length;
      const favoritesSavedCount = favorites.length;

      // Most used cuisine (case-insensitive aggregation)
      const cuisineMap: Record<string, number> = {};
      createdRecipes.forEach((recipe) => {
        if (recipe.cuisine) {
          const cuisineCleaned = recipe.cuisine.trim();
          const normalized =
            cuisineCleaned.charAt(0).toUpperCase() +
            cuisineCleaned.slice(1).toLowerCase();
          cuisineMap[normalized] = (cuisineMap[normalized] || 0) + 1;
        }
      });

      let mostUsedCuisine = "None";
      let maxCount = 0;
      for (const [cuisine, count] of Object.entries(cuisineMap)) {
        if (count > maxCount) {
          maxCount = count;
          mostUsedCuisine = cuisine;
        }
      }

      // Total cooking time shared
      const totalCookTime = createdRecipes.reduce((sum, r) => sum + r.cookTime, 0);

      // Recent activity lists (max 3 items each)
      const recentCreated = createdRecipes.slice(0, 3);
      const recentFavorited = favoriteRecipes.slice(0, 3);

      res.status(200).json({
        success: true,
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
          },
          stats: {
            recipesCreatedCount,
            favoritesSavedCount,
            mostUsedCuisine,
            totalCookTime,
          },
          createdRecipes,
          favoriteRecipes,
          recentActivity: {
            created: recentCreated,
            favorited: recentFavorited,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  };
}
