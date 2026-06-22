// src/services/search.service.ts

import { prisma } from "../../prisma/prisma";

type SearchResult = {
	recipeId: string;
	title: string;
	matchPercentage: number;
	missingIngredients: string[];
	cookTime: number;
	calories?: number | null;
	difficulty: string;
	recipeType: string;
	cuisine?: string | null;
	imageUrl?: string | null;
	description?: string;
};

// Helper to normalize and check if user ingredient matches recipe ingredient
function matchesIngredient(userIng: string, recipeIng: string): boolean {
  const u = userIng.toLowerCase().trim();
  const r = recipeIng.toLowerCase().trim();
  
  if (u === r) return true;
  
  // Helper to strip plural 's' or 'es'
  const singularize = (str: string) => {
    if (str.endsWith("es")) {
      if (str.endsWith("toes")) return str.slice(0, -2); // tomatoes -> tomato
      if (str.endsWith("ies")) return str.slice(0, -3) + "y"; // chillies -> chilly
      return str.slice(0, -1);
    }
    if (str.endsWith("s") && !str.endsWith("ss")) {
      return str.slice(0, -1);
    }
    return str;
  };
  
  const uSing = singularize(u);
  const rSing = singularize(r);
  
  if (uSing === rSing) return true;
  
  // Check if one contains the other as a whole word or substring
  if (r.includes(u) || u.includes(r) || rSing.includes(uSing) || uSing.includes(rSing)) {
    return true;
  }
  
  return false;
}

export class SearchService {
	/**
	 * Search recipes by provided ingredients array.
	 * Returns results sorted by highest match percentage and excludes 0-match recipes.
	 */
	async searchRecipes(userIngredients: string[]): Promise<SearchResult[]> {
		const recipes = await prisma.recipe.findMany({
			include: {
				ingredients: {
					include: {
						ingredient: {
							select: { name: true },
						},
					},
				},
			},
		});

		const results: SearchResult[] = [];

		for (const r of recipes) {
			const recipeIngredientNames = Array.from(
				new Set(
					r.ingredients.map((ri) => ri.ingredient.name.trim())
				)
			);

			const total = recipeIngredientNames.length;
			if (total === 0) continue;

			let matched = 0;
			const missing: string[] = [];

			for (let idx = 0; idx < recipeIngredientNames.length; idx++) {
				const recipeIngName = recipeIngredientNames[idx];
				// Check if any user ingredient matches this recipe ingredient
				const isMatched = userIngredients.some((userIng) => 
					matchesIngredient(userIng, recipeIngName)
				);

				if (isMatched) {
					matched += 1;
				} else {
					missing.push(recipeIngName);
				}
			}

			if (matched === 0) continue; // exclude recipes with 0 matches

			const matchPercentage = Math.round((matched / total) * 100);

			results.push({
				recipeId: r.id,
				title: r.title,
				matchPercentage,
				missingIngredients: missing,
				cookTime: r.cookTime,
				calories: r.calories ?? null,
				difficulty: String(r.difficulty),
				recipeType: r.recipeType,
				cuisine: r.cuisine ?? null,
				imageUrl: r.imageUrl,
				description: r.description,
			});
		}

		// sort by highest matchPercentage desc, then by fewest missing (more complete), then by title
		results.sort((a, b) => {
			if (b.matchPercentage !== a.matchPercentage)
				return b.matchPercentage - a.matchPercentage;
			if (a.missingIngredients.length !== b.missingIngredients.length)
				return a.missingIngredients.length - b.missingIngredients.length;
			return a.title.localeCompare(b.title);
		});

		return results;
	}
}

