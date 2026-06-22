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

  /**
   * Fetch a single recipe by id, including ingredients (with names) and steps.
   * Steps are sorted ascending by `stepNumber`.
   */
  async getRecipeById(id: string) {
    const recipe = await prisma.recipe.findUnique({
      where: { id },
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
    });

    return recipe;
  }


  async getCuisineName(cuisine: string){
    const recipes = await prisma.recipe.findMany({
        where: {cuisine:{equals: cuisine,mode: "insensitive"}},
       select: {
        title: true, 
        cuisine: true,
        ingredients: {
          select: {
            quantity:true,
            ingredient:{
              select:{
                name:true
              }
            }
          }
        },
        steps:{
          select:{stepNumber:true, instruction:true},
          orderBy : {stepNumber: "asc"}
        }       
       }
    });

    return recipes;
  }

  /**
   * Create a new recipe belonging to a user, with nested ingredients and steps.
   */
  async createRecipe(userId: string, data: any) {
    const ingredientNames: string[] = Array.from(
      new Set((data.ingredients || []).map((i: any) => String(i.name).trim()))
    );

    // Create any ingredients that do not exist yet
    if (ingredientNames.length > 0) {
      await prisma.ingredient.createMany({
        data: ingredientNames.map((name) => ({ name })),
        skipDuplicates: true,
      });
    }

    const dbIngredients = await prisma.ingredient.findMany({
      where: { name: { in: ingredientNames } },
    });
    const ingredientIdsByName = new Map(
      dbIngredients.map((i) => [i.name.toLowerCase().trim(), i.id])
    );

    // Create the Recipe and related steps in a single transaction
    const recipe = await prisma.recipe.create({
      data: {
        userId,
        title: data.title,
        description: data.description,
        cuisine: data.cuisine || null,
        difficulty: data.difficulty,
        recipeType: data.recipeType,
        cookTime: Number(data.cookTime),
        calories: data.calories ? Number(data.calories) : null,
        imageUrl: data.imageUrl || null,
        steps: {
          create: (data.steps || []).map((s: any) => ({
            stepNumber: Number(s.stepNumber),
            instruction: s.instruction.trim(),
          })),
        },
      },
    });

    // Create the RecipeIngredient records
    if (data.ingredients && data.ingredients.length > 0) {
      await prisma.recipeIngredient.createMany({
        data: data.ingredients.map((ing: any) => {
          const ingId = ingredientIdsByName.get(ing.name.toLowerCase().trim());
          if (!ingId) {
            throw new Error(`Ingredient "${ing.name}" not found after database sync.`);
          }
          return {
            recipeId: recipe.id,
            ingredientId: ingId,
            quantity: ing.quantity.trim(),
          };
        }),
      });
    }

    return this.getRecipeById(recipe.id);
  }

  /**
   * Update an existing recipe, recreating its nested steps and ingredients.
   */
  async updateRecipe(id: string, data: any) {
    const ingredientNames: string[] = Array.from(
      new Set((data.ingredients || []).map((i: any) => String(i.name).trim()))
    );

    if (ingredientNames.length > 0) {
      await prisma.ingredient.createMany({
        data: ingredientNames.map((name) => ({ name })),
        skipDuplicates: true,
      });
    }

    const dbIngredients = await prisma.ingredient.findMany({
      where: { name: { in: ingredientNames } },
    });
    const ingredientIdsByName = new Map(
      dbIngredients.map((i) => [i.name.toLowerCase().trim(), i.id])
    );

    // Delete old steps and ingredients, and update recipe fields
    await prisma.$transaction([
      prisma.recipe.update({
        where: { id },
        data: {
          title: data.title,
          description: data.description,
          cuisine: data.cuisine || null,
          difficulty: data.difficulty,
          recipeType: data.recipeType,
          cookTime: Number(data.cookTime),
          calories: data.calories ? Number(data.calories) : null,
          imageUrl: data.imageUrl || null,
        },
      }),
      prisma.recipeStep.deleteMany({ where: { recipeId: id } }),
      prisma.recipeIngredient.deleteMany({ where: { recipeId: id } }),
    ]);

    // Recreate steps
    if (data.steps && data.steps.length > 0) {
      await prisma.recipeStep.createMany({
        data: data.steps.map((s: any) => ({
          recipeId: id,
          stepNumber: Number(s.stepNumber),
          instruction: s.instruction.trim(),
        })),
      });
    }

    // Recreate ingredients
    if (data.ingredients && data.ingredients.length > 0) {
      await prisma.recipeIngredient.createMany({
        data: data.ingredients.map((ing: any) => {
          const ingId = ingredientIdsByName.get(ing.name.toLowerCase().trim());
          if (!ingId) {
            throw new Error(`Ingredient "${ing.name}" not found during update.`);
          }
          return {
            recipeId: id,
            ingredientId: ingId,
            quantity: ing.quantity.trim(),
          };
        }),
      });
    }

    return this.getRecipeById(id);
  }

  /**
   * Delete a recipe. Relations will cascade delete.
   */
  async deleteRecipe(id: string) {
    return prisma.recipe.delete({
      where: { id },
    });
  }
}