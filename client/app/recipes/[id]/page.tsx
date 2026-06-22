"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { recipeService } from "@/services/recipe.service";
import { Recipe } from "@/types";
import LoadingState from "@/components/LoadingState";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

interface RecipeDetailsProps {
  params: Promise<{ id: string }>;
}

export default function RecipeDetails({ params }: RecipeDetailsProps) {
  const router = useRouter();
  const { user, isInitialized, isFavorite, toggleFavorite } = useAuth();
  
  // Unwrap params using React.use() or standard unwrap since it is a Promise in Next.js 15
  const [id, setId] = useState<string | null>(null);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});

  // Redirect if user not logged in
  useEffect(() => {
    if (isInitialized && !user) {
      router.push("/login");
    }
  }, [isInitialized, user, router]);

  useEffect(() => {
    params.then((res) => {
      setId(res.id);
    });
  }, [params]);

  useEffect(() => {
    if (!id) return;
    
    recipeService
      .getRecipeById(id)
      .then((data) => {
        setRecipe(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching recipe details:", err);
        setError("Recipe not found or backend server is offline.");
        setLoading(false);
      });
  }, [id]);

  const toggleIngredient = (ingredientId: string) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [ingredientId]: !prev[ingredientId],
    }));
  };

  if (!isInitialized || loading) {
    return (
      <div className="py-24">
        <LoadingState />
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <main className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-24 text-center">
        <div className="bg-[#FFFFF0] border border-outline-variant/30 rounded-xl p-12 max-w-md mx-auto shadow-md">
          <span className="material-symbols-outlined text-error text-5xl mb-4">error</span>
          <h2 className="text-headline-md text-primary mb-2">Recipe Not Found</h2>
          <p className="font-body-md text-on-surface-variant mb-6">{error || "Could not retrieve recipe information."}</p>
          <button
            onClick={() => router.back()}
            className="bg-primary text-on-primary px-6 py-2 rounded font-label-caps text-xs tracking-widest hover:bg-primary-container"
          >
            Go Back
          </button>
        </div>
      </main>
    );
  }

  const isFav = id ? isFavorite(id) : false;

  return (
    <main className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-12 pb-section-gap flex flex-col items-center">
      {/* Contextual Header (Nav Back actions) */}
      <div className="w-full py-4 flex justify-between items-center mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-primary hover:text-secondary transition-colors duration-300 group"
        >
          <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">
            arrow_back
          </span>
          <span className="font-label-caps text-label-caps uppercase tracking-widest">Back</span>
        </button>

        <div className="flex items-center gap-6">
          <button
            onClick={() => {
              if (!user) {
                router.push("/login");
                return;
              }
              if (id) {
                toggleFavorite(id);
              }
            }}
            className={`flex items-center gap-2 transition-all duration-300 ${
              isFav ? "text-secondary font-bold scale-105" : "text-primary hover:text-secondary"
            }`}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: isFav ? "'FILL' 1" : undefined }}>
              {isFav ? "bookmark" : "bookmark_add"}
            </span>
            <span className="font-label-caps text-label-caps uppercase tracking-widest hidden sm:inline">
              {isFav ? "Favorited" : "Favorite"}
            </span>
          </button>
        </div>
      </div>

      {/* The Cookbook Spread */}
      <article className="w-full bg-surface shadow-[0_20px_60px_-15px_rgba(46,70,0,0.15)] rounded-lg flex flex-col md:flex-row relative z-10 overflow-hidden min-h-[800px] animate-page-turn border border-outline-variant/20 text-left">
        {/* Book Crease Overlay */}
        <div className="hidden md:block absolute inset-y-0 left-1/2 w-8 -ml-4 crease z-20 pointer-events-none"></div>

        {/* Left Page: Ingredients & Metadata */}
        <section className="w-full md:w-1/2 p-8 md:p-16 relative flex flex-col justify-between">
          <div>
            {/* Metadata Chips */}
            <div className="flex flex-wrap gap-3 mb-8">
              {recipe.cuisine && (
                <div className="bg-tertiary-container text-on-tertiary-container px-4 py-1.5 rounded-full font-label-caps text-label-caps uppercase flex items-center gap-1 shadow-sm">
                  <span className="material-symbols-outlined text-[16px]">restaurant_menu</span>
                  {recipe.cuisine}
                </div>
              )}
              <div className={`px-4 py-1.5 rounded-full font-label-caps text-label-caps uppercase flex items-center gap-1 border ${
                recipe.recipeType === "VEG"
                  ? "bg-green-50/70 text-green-800 border-green-200"
                  : "bg-red-50/70 text-red-800 border-red-200"
              } shadow-sm`}>
                <span className="material-symbols-outlined text-[16px]">fiber_manual_record</span>
                {recipe.recipeType === "VEG" ? "Vegetarian" : "Non-Veg"}
              </div>
              <div className="bg-surface-variant text-on-surface-variant px-4 py-1.5 rounded-full font-label-caps text-label-caps uppercase flex items-center gap-1 border border-outline-variant/30">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                {recipe.cookTime} Min
              </div>
              <div className="bg-surface-variant text-on-surface-variant px-4 py-1.5 rounded-full font-label-caps text-label-caps uppercase flex items-center gap-1 border border-outline-variant/30">
                <span className="material-symbols-outlined text-[16px]">restaurant</span>
                {recipe.difficulty}
              </div>
              {recipe.calories && (
                <div className="bg-surface-variant text-on-surface-variant px-4 py-1.5 rounded-full font-label-caps text-label-caps uppercase flex items-center gap-1 border border-outline-variant/30">
                  <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
                  {recipe.calories} kcal
                </div>
              )}
            </div>

            <h1 className="font-headline-xl text-headline-xl text-primary mb-6 leading-tight">
              {recipe.title}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant italic mb-10 leading-relaxed">
              {recipe.description}
            </p>

            <div className="relative">
              {/* Handwritten Annotation Quote */}
              <div className="absolute -top-10 right-0 rotate-3 font-label-accent text-label-accent italic text-secondary max-w-[150px] opacity-80 hidden lg:block">
                "Follow intuition, measure loosely."
                <svg className="w-8 h-8 text-secondary/30 mt-1" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </div>

              <h2 className="font-headline-md text-headline-md text-primary mb-6 border-b border-outline-variant/30 pb-2 inline-block">
                The Gatherings
              </h2>

              <ul className="space-y-4 font-body-lg text-body-lg text-on-surface">
                {recipe.ingredients.map((ri) => (
                  <li
                    key={ri.id}
                    onClick={() => toggleIngredient(ri.id)}
                    className="flex items-start gap-4 group cursor-pointer select-none"
                  >
                    <div className="w-5 h-5 rounded-full border-2 border-outline mt-1 flex-shrink-0 group-hover:border-secondary transition-colors relative flex items-center justify-center">
                      {checkedIngredients[ri.id] && (
                        <div className="absolute inset-0.5 bg-secondary rounded-full transform scale-100 transition-transform"></div>
                      )}
                    </div>
                    <span className={checkedIngredients[ri.id] ? "line-through text-on-surface-variant/50" : ""}>
                      <strong className="font-semibold">{ri.quantity}</strong> {ri.ingredient.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-outline-variant/20 relative">
            <span className="material-symbols-outlined text-outline/20 text-4xl absolute top-6 left-0">
              format_quote
            </span>
            <p className="font-label-accent text-label-accent italic text-primary/80 pl-10 leading-relaxed text-lg">
              "The secret ingredient is curiosity."
            </p>
          </div>
        </section>

        {/* Right Page: Preparation & Imagery */}
        <section className="w-full md:w-1/2 bg-surface-bright relative border-l border-outline-variant/10 flex flex-col">
          {/* Hero Image */}
          <div className="h-64 md:h-80 w-full overflow-hidden relative shadow-[inset_0_-20px_20px_-20px_rgba(0,0,0,0.2)] bg-surface-container">
            {recipe.imageUrl ? (
              <img
                alt={recipe.title}
                className="w-full h-full object-cover origin-top"
                src={recipe.imageUrl}
              />
            ) : (
              <div className="w-full h-full bg-surface-container flex items-center justify-center text-outline-variant">
                <span className="material-symbols-outlined text-6xl">cookie</span>
              </div>
            )}
          </div>

          <div className="p-8 md:p-16 flex-grow">
            <h2 className="font-headline-md text-headline-md text-primary mb-8 tracking-wide">Method</h2>
            <div className="space-y-10">
              {recipe.steps.map((step, index) => {
                const formattedNum = String(step.stepNumber).padStart(2, "0");
                return (
                  <div key={step.id} className="relative pl-12 step-container">
                    <span className="absolute left-0 top-0 font-headline-lg text-headline-lg text-secondary opacity-25 leading-none">
                      {formattedNum}
                    </span>
                    <h3 className="font-body-lg text-body-lg font-semibold text-primary mb-2">
                      Stage {step.stepNumber}
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      {step.instruction}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
