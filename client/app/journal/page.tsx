"use client";

import { useEffect, useState } from "react";
import { recipeService } from "@/services/recipe.service";
import { Recipe } from "@/types";
import JournalCard from "@/components/JournalCard";
import LoadingState from "@/components/LoadingState";

export default function Journal() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleLimit, setVisibleLimit] = useState(6);

  useEffect(() => {
    recipeService
      .getAllRecipes()
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading recipes for journal:", err);
        setLoading(false);
      });
  }, []);

  const handleLoadMore = () => {
    setVisibleLimit((prev) => prev + 6);
  };

  const displayedRecipes = recipes.slice(0, visibleLimit);
  const hasMore = recipes.length > visibleLimit;

  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-section-gap text-left relative">
      {/* Header Section */}
      <section className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
        <h2 className="text-headline-lg-mobile md:text-headline-xl font-headline-lg-mobile md:font-headline-xl text-primary mb-4 animate-fade-in">
          Your Culinary Journal
        </h2>
        <p className="text-body-md font-body-md text-on-surface-variant italic">
          Preserving the memories, aromas, and quiet moments of every meal crafted.
        </p>
        <div className="mt-8 flex justify-center">
          <div className="h-px w-24 bg-outline-variant/50"></div>
        </div>
      </section>

      {/* Journal Grid */}
      {loading ? (
        <LoadingState />
      ) : recipes.length === 0 ? (
        <div className="text-center py-12">
          <p className="font-label-accent italic text-on-surface-variant">No cookbook entries found.</p>
        </div>
      ) : (
        <section className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-gutter relative z-10">
            {displayedRecipes.map((recipe, index) => (
              <JournalCard key={recipe.id} recipe={recipe} index={index} />
            ))}
          </div>

          {/* Post-it Note Detail (Hidden on mobile) */}
          <div
            className="hidden lg:block absolute right-[-40px] top-[18%] w-48 p-4 bg-[#fdf5c9] shadow-md transform rotate-3 z-0 border border-yellow-200/50"
            style={{ boxShadow: "2px 4px 10px rgba(0,0,0,0.1)" }}
          >
            <span className="material-symbols-outlined absolute top-2 right-2 text-outline/50 text-sm">
              push_pin
            </span>
            <p className="text-label-accent font-label-accent text-on-surface-variant italic text-xs leading-relaxed">
              Note to self: Try adding a pinch of smoked paprika to the ragù next time for extra depth.
            </p>
          </div>
        </section>
      )}

      {/* Load More Action */}
      {hasMore && !loading && (
        <div className="mt-20 flex justify-center">
          <button
            onClick={handleLoadMore}
            className="bg-primary text-on-primary px-8 py-3 rounded text-label-caps font-label-caps shadow-sm hover:bg-primary/90 transition-colors border border-primary-container/30 active:scale-95"
          >
            Turn the Page
          </button>
        </div>
      )}
    </main>
  );
}
