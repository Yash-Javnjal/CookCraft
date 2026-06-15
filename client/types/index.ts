export type Difficulty = "EASY" | "MEDIUM" | "HARD";
export type DietType = "VEGETARIAN" | "VEGAN" | "HIGH_PROTEIN" | "KETO" | "NONE";

export interface IngredientInfo {
  id: string;
  name: string;
}

export interface RecipeIngredient {
  id: string;
  recipeId: string;
  ingredientId: string;
  quantity: string;
  ingredient: IngredientInfo;
}

export interface RecipeStep {
  id: string;
  recipeId: string;
  stepNumber: number;
  instruction: string;
}

export interface Recipe {
  id: string;
  title: string;
  imageUrl: string | null;
  cookTime: number;
  calories: number | null;
  difficulty: Difficulty;
  createdAt: string;
  cuisine: string | null;
  description: string;
  dietType: DietType;
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
}

export interface SearchResult {
  recipeId: string;
  title: string;
  matchPercentage: number;
  missingIngredients: string[];
  cookTime: number;
  calories: number | null;
  difficulty: Difficulty | string;
  cuisine: string | null;
  imageUrl?: string | null;
  description?: string;
}

