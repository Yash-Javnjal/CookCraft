"use client";

import { useEffect, useState } from "react";
import { recipeService } from "@/services/recipe.service";
import { Recipe } from "@/types";
import CuisineCard from "@/components/CuisineCard";
import RecipeCard from "@/components/RecipeCard";
import LoadingState from "@/components/LoadingState";

const CUISINE_METADATA: Record<
  string,
  { imageUrl: string; icon: string; heritage: string; desc: string }
> = {
  italian: {
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyuTTTfxTx6Ww1ZyWxvyT7dbyWz4nc-QQfcA&s",
    icon: "water",
    heritage: "Coastal Heritage",
    desc: "The poetry of simplicity. Where a handful of pristine ingredients—flour, water, olive oil, and tomatoes—transform into profound comfort.",
  },
  mexican: {
    imageUrl:
      "https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/hmlujvrb/fd6813c5-b6d8-4283-8bba-7786894144e7.jpg",
    icon: "local_dining",
    heritage: "Fireside Fiesta",
    desc: "Vibrant, fiery, and deeply rooted in indigenous earthiness. The magic of masa, chillies, and slow-roasted meats.",
  },
  indian: {
    imageUrl:
      "https://images.stockcake.com/public/0/2/f/02f1ddcd-7014-4479-89de-6a6387442ab2_large/indian-feast-spread-stockcake.jpg",
    icon: "spa",
    heritage: "Spice & Soul",
    desc: "A civilization's worth of flavor layered into every dish. From the char of a tandoor to the slow bloom of a curry, Indian cooking is an ancient alchemy of spice, heat, and heart.",
  },
  american: {
    imageUrl:
      "https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/american_cuisine_header_2b8ea6aebb.jpg",
    icon: "local_fire_department",
    heritage: "Melting Pot",
    desc: "Bold, generous, and unapologetically diverse. A cuisine shaped by immigrants and open roads — from the smoky low-and-slow of the South to the diner counter classics that defined a century.",
  },
  chinese: {
    imageUrl:
      "https://cdn.britannica.com/12/196512-050-76584C2F/dishes-Chinese.jpg",
    icon: "restaurant",
    heritage: "Wok & Dynasty",
    desc: "Five thousand years of culinary mastery distilled into smoke, steam, and precision. Where the wok's sear, the dumpling's fold, and the broth's depth tell stories older than any cookbook.",
  },
};

export default function Cuisines() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);

  useEffect(() => {
    recipeService
      .getAllRecipes()
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching cuisines data:", err);
        setLoading(false);
      });
  }, []);

  // Group recipes by cuisine dynamically
  const cuisinesMap: Record<string, Recipe[]> = {};
  recipes.forEach((recipe) => {
    const rawCuisine = recipe.cuisine || "Global";
    const cuisine = rawCuisine.trim();
    if (!cuisinesMap[cuisine]) {
      cuisinesMap[cuisine] = [];
    }
    cuisinesMap[cuisine].push(recipe);
  });

  const uniqueCuisines = Object.keys(cuisinesMap);

  // Filter recipes for selected cuisine (or show all if null)
  const filteredRecipes = selectedCuisine
    ? recipes.filter(
        (r) =>
          (r.cuisine || "Global").toLowerCase() ===
          selectedCuisine.toLowerCase()
      )
    : recipes;

  // Bento col-spans layout cycling
  const getColSpan = (index: number) => {
    const patterns = [
      "md:col-span-7",
      "md:col-span-5",
      "md:col-span-6",
      "md:col-span-6",
    ];
    return patterns[index % patterns.length];
  };

  return (
    <main className="flex-grow pb-32 md:pb-section-gap text-left">
      {/* Hero Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-24 flex flex-col items-center text-center">
        <h1 className="text-headline-xl font-headline-xl text-primary mb-6">CookCraft Atlas</h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
          A curated culinary journal exploring the world's most evocative flavor profiles. Turn the page to discover regional traditions, signature ingredients, and timeless recipes born from the hearth.
        </p>
      </section>

      {loading ? (
        <LoadingState />
      ) : uniqueCuisines.length === 0 ? (
        <div className="text-center py-12">
          <p className="font-label-accent italic text-on-surface-variant">No cuisines found.</p>
        </div>
      ) : (
        <>
          {/* Bento Grid Layout for Cuisines */}
          <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-gutter mb-20">
            {uniqueCuisines.map((cuisineName, index) => {
              const normalized = cuisineName.toLowerCase();
              const meta = CUISINE_METADATA[normalized] || {
                imageUrl:
                  "https://images.stockcake.com/public/0/2/f/02f1ddcd-7014-4479-89de-6a6387442ab2_large/indian-feast-spread-stockcake.jpg",
                icon: "restaurant",
                heritage: "Global Taste",
                desc: `Discover dynamic, authentic recipe creations from the ${cuisineName} tradition.`,
              };

              return (
                <CuisineCard
                  key={cuisineName}
                  name={cuisineName}
                  imageUrl={meta.imageUrl}
                  heritageText={meta.heritage}
                  icon={meta.icon}
                  description={meta.desc}
                  featuredRecipes={cuisinesMap[cuisineName]}
                  colSpanClass={getColSpan(index)}
                  isSelected={selectedCuisine === cuisineName}
                  onClick={() => {
                    if (selectedCuisine === cuisineName) {
                      setSelectedCuisine(null); // toggle off filter
                    } else {
                      setSelectedCuisine(cuisineName);
                    }
                  }}
                />
              );
            })}
          </section>

          {/* filtered recipes section */}
          <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop border-t border-outline-variant/30 pt-16">
            <div className="mb-12 flex justify-between items-end">
              <div>
                <span className="font-label-caps text-secondary text-label-caps tracking-widest block mb-2 uppercase">
                  {selectedCuisine ? `${selectedCuisine} Recipes` : "All Recipes"}
                </span>
                <h2 className="font-headline-lg text-headline-lg text-primary">
                  {selectedCuisine ? `Flavors of ${selectedCuisine}` : "Explore All Creations"}
                </h2>
              </div>
              {selectedCuisine && (
                <button
                  onClick={() => setSelectedCuisine(null)}
                  className="text-sm text-secondary hover:underline font-label-caps"
                >
                  Show All Cuisines
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 animate-fade-in-up">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}