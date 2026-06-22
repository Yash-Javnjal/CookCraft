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

  async createRecipe(userId: string, recipeData: any): Promise<Recipe> {
    const response = await api.post<{ success: boolean; data: Recipe }>("/recipes", {
      userId,
      ...recipeData,
    });
    return response.data.data;
  },

  async updateRecipe(recipeId: string, recipeData: any): Promise<Recipe> {
    const response = await api.put<{ success: boolean; data: Recipe }>(`/recipes/${recipeId}`, recipeData);
    return response.data.data;
  },

  async deleteRecipe(recipeId: string): Promise<void> {
    await api.delete<{ success: boolean; message: string }>(`/recipes/${recipeId}`);
  },
};
