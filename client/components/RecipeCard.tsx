"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Recipe } from "@/types";
import { useAuth } from "@/context/AuthContext";

interface RecipeCardProps {
  recipe: {
    id?: string;
    recipeId?: string;
    title?: string;
    imageUrl?: string | null;
    cookTime?: number;
    calories?: number | null;
    difficulty?: string;
    recipeType?: string;
    cuisine?: string | null;
    description?: string;
    matchPercentage?: number;
    missingIngredients?: string[];
  };
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const router = useRouter();
  const { user, isFavorite, toggleFavorite } = useAuth();
  
  const recipeId = recipe.id || recipe.recipeId || "";
  const title = recipe.title || "Untitled Recipe";
  const imageUrl = recipe.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop";
  const cookTime = recipe.cookTime || 0;
  const calories = recipe.calories || null;
  const difficulty = recipe.difficulty || "MEDIUM";
  const recipeType = recipe.recipeType || "VEG";
  const cuisine = recipe.cuisine || "Global";
  const description = recipe.description || "A delicious handcrafted culinary creation from our journal.";
  const matchPercentage = recipe.matchPercentage;
  const missingIngredients = recipe.missingIngredients || [];

  const favorited = isFavorite(recipeId);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      router.push("/login");
      return;
    }

    toggleFavorite(recipeId);
  };

  return (
    <Link href={`/recipes/${recipeId}`} className="block h-full">
      <article className="recipe-card bg-[#FFFFF0] rounded-xl overflow-hidden shadow-[0_4px_15px_-5px_rgba(46,70,0,0.08)] flex flex-col h-full border border-surface-variant/50 cursor-pointer">
        <div className="relative h-64 w-full overflow-hidden bg-surface-container">
          <img
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            src={imageUrl}
          />
          {matchPercentage !== undefined && (
            <div className="absolute top-4 right-4 bg-tertiary-fixed text-on-tertiary-fixed-variant px-3 py-1 rounded-full text-label-caps font-label-caps backdrop-blur-sm bg-opacity-90 z-20">
              {matchPercentage}% Match
            </div>
          )}
        </div>
        <div className="p-6 flex flex-col flex-grow relative">
          <div className="texture-overlay"></div>
          <div className="flex justify-between items-start mb-2">
            <span className="text-label-caps font-label-caps text-secondary tracking-widest uppercase">
              {cuisine}
            </span>
            <div className="flex gap-2">
              <span className={`px-2 py-0.5 rounded text-xs font-label-caps uppercase ${
                recipeType === "VEG"
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-red-100 text-red-800 border border-red-200"
              }`}>
                {recipeType === "VEG" ? "Veg" : "Non-Veg"}
              </span>
              <span className="bg-[#e5e2da] text-on-surface-variant px-2 py-0.5 rounded text-xs font-label-caps uppercase">
                {difficulty.toLowerCase()}
              </span>
            </div>
          </div>
          <h2 className="text-headline-md font-headline-md text-primary mb-3">
            {title}
          </h2>
          <p className="text-body-md font-body-md text-on-surface-variant mb-4 flex-grow">
            {description}
          </p>

          {/* Missing Ingredients Section (for discover/search page) */}
          {missingIngredients.length > 0 && (
            <div className="mb-4 bg-surface-container-high/40 p-3 rounded-lg border border-outline-variant/20">
              <span className="text-label-caps font-label-caps text-xs text-secondary block mb-1">
                MISSING INGREDIENTS ({missingIngredients.length})
              </span>
              <p className="text-xs font-body-md text-on-surface-variant italic">
                {missingIngredients.join(", ")}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between border-t border-outline-variant/30 pt-4 mt-auto">
            <div className="flex items-center gap-4 text-on-surface-variant">
              <div className="flex items-center gap-1" title="Cook Time">
                <span className="material-symbols-outlined text-[18px]">schedule</span>
                <span className="text-sm font-body-md">{cookTime} min</span>
              </div>
              {calories !== null && (
                <div className="flex items-center gap-1" title="Calories">
                  <span className="material-symbols-outlined text-[18px]">local_fire_department</span>
                  <span className="text-sm font-body-md">{calories} kcal</span>
                </div>
              )}
            </div>
            <button
              onClick={handleBookmarkClick}
              aria-label={favorited ? "Remove Bookmark" : "Bookmark Recipe"}
              className={`transition-all duration-300 ${
                favorited ? "text-secondary scale-110" : "text-primary hover:text-secondary"
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: favorited ? "'FILL' 1" : undefined }}>
                {favorited ? "bookmark" : "bookmark_add"}
              </span>
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
}
