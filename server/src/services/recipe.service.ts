// src/services/recipe.service.ts

import { prisma } from "../../prisma/prisma";

export class RecipeService {
  /**
   * Fetch all recipes including related ingredients and steps.
   * Steps are sorted by stepNumber; ingredients include name from Ingredient model.
   */
  async getAllRecipes() {
    const recipes = await prisma.recipe.findMany({
      include: {
        ingredients: {
          include: {
            ingredient: {
              select: { id: true, name: true },
            },
          },
        },
        steps: {
          orderBy: { stepNumber: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return recipes;
  }
}