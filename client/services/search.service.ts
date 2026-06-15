import { api } from "../lib/api";
import { SearchResult } from "../types";

export const searchService = {
  async searchRecipes(ingredients: string[]): Promise<SearchResult[]> {
    const response = await api.post<{ success: boolean; count: number; data: SearchResult[] }>("/search", {
      ingredients,
    });
    return response.data.data;
  },
};
