import { api } from "../lib/api";
import { Recipe } from "../types";

export const recipeService = {
  async getAllRecipes(): Promise<Recipe[]> {
    const response = await api.get<{ success: boolean; count: number; data: Recipe[] }>("/recipes");
    return response.data.data;
  },

  async getRecipeById(id: string): Promise<Recipe> {
    const response = await api.get<{ success: boolean; data: Recipe }>(`/recipes/${id}`);
    return response.data.data;
  },
};
