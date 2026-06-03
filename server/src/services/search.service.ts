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
	cuisine?: string | null;
};

export class SearchService {
	/**
	 * Search recipes by provided ingredients array.
	 * Returns results sorted by highest match percentage and excludes 0-match recipes.
	 */
	async searchRecipes(userIngredients: string[]): Promise<SearchResult[]> {
		const normalizedUserIngredients = new Set(
			userIngredients
				.filter(Boolean)
				.map((i) => i.trim().toLowerCase())
		);

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

			const recipeIngredientNamesNorm = recipeIngredientNames.map((n) =>
				n.toLowerCase()
			);

			const total = recipeIngredientNamesNorm.length;
			if (total === 0) continue;

			let matched = 0;
			const missing: string[] = [];

			for (let idx = 0; idx < recipeIngredientNamesNorm.length; idx++) {
				const nameNorm = recipeIngredientNamesNorm[idx];
				if (normalizedUserIngredients.has(nameNorm)) {
					matched += 1;
				} else {
					// push original-cased name
					missing.push(recipeIngredientNames[idx]);
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
				cuisine: r.cuisine ?? null,
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
