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
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBbE5mvbCWy2SaXC_SBvBVdVYaGfZJ6T4gMMaK3Ln3t5LAedG_bP_eiHT1gShZOH0uORG7i25iYPj8oyLL5qIBVQPx8Kuazt_gju5SZxNCPCzJREWtSjXKgGsJFfOXqQPCyv6IFwaG0E7_V4178e56rAUNCDBFgEtypryssKFx7GPz98ldw_juQqFO4yfnT5R-PwYwxf1dH60Fp1vbpXEgavCFUAcZcbjpVvBWki3IkxFVrV-QcZIEty6zBJvxNqUcuSs6P23XTWNi7",
    icon: "water",
    heritage: "Coastal Heritage",
    desc: "The poetry of simplicity. Where a handful of pristine ingredients—flour, water, olive oil, and tomatoes—transform into profound comfort.",
  },
  nordic: {
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBP1nBALI5IMecsK57YHqX7ll4dPxf_bjQO4ZVbme4sGXdkHQ1bwFFzzPP8xcfVc5IGgIyl5a5b-1q_EoFOThp060nQ3yeNKJ58VzeK8PzfSluowrkPH14KB4TvTEUZ0Ec8sLDmR17_B7I82ujhNDdySr04TsbHHLWov0QJH8Y6EnlLlh7qD7j4mdbdpCcxpJaPPiGNy_cGmQqE6uAxOKoyZ2Aa0oebdCDolUooFtXdDfa69MW1ODT6Sd35-tKbwjxEElkvuKEj-xwU",
    icon: "11mp",
    heritage: "Foraged & Preserved",
    desc: "Born from necessity and cold winters. A study in stark contrasts: the sharp bite of pickling against the rich umami of smoked meats.",
  },
  "east asian": {
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCoNKZm2rveINK0g6VDMXTZhPfqoaz7DrgMib5QjO7LSdCgoSY-rVlG7HWlfLNEuF17GcW7iNs60lXdlVd4i8iYhftqeS1jfrLv8Ch_a3d3bGEI_J8WcRQ-NNjX3C6ZrJu6kSl8jOgInvi7nuL9_OzAOdlQ_pXc2ZdJzUSTGpZGEJA0jIrXjMN0LaFDF5H_Vcv-v9nrGXdisH1Hd1LOmez4fP0IATOyWdU1sBxKYwU5dL64l33ml-GKMJeEK7_GzgF2JrnVo64WFrA1",
    icon: "local_fire_department",
    heritage: "Wok & Steam",
    desc: "The mastery of balance. Where fire meets water, and the precise geometry of folding dough yields comfort in every bite.",
  },
  japanese: {
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDgp5GuWBbae7fW807n-BRYR3-Zi0swdeTtgLyU-9FU6G_TSGXucXnjs2pc4KZ3HMZLANFzwDIeDNLItoT_p_1gJUme52qg-VfuSJ1oHIz4HgO5UE1EvMjBo016xvf6JCaS5ji4Fo0pL0OyJ3zZ_Rlmdb8GoFhSHnX8gA_8-eykewKIRLOTp4LvcbMjKENKMRYcqj-B3Rv07q-RIEiilxFv07UTj_asHs-xcLNUb3GuP8S2UvzAFHg0cyk_k96wbMJ_TQV4Icnx8WBA",
    icon: "spa",
    heritage: "Zen Restraint",
    desc: "A masterclass in restraint and reverence for seasonal perfection.",
  },
  "latin american": {
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCEybDI-QjLw2dkvOO0cL9IYaZC4JctwbRQEzl0goyZ5IxpZ_cVbkvIpQgPAsFEh2jJmrRLEQmvRQm1pKGju5WM-PdY4xla7-89Kbbwi3M81HrFXhNihI0R0brh6cLQeeqvjOP78CMv4paLcpF39kIHOXTRSa47bYAdCSAIqN9pORACje-XQD9m3P1hhiQAxgJTM49LIIoB9tgWTkth8mcsGWZZenXeJBfuEIHRIjtBmg7SQ4UUcLHZBlRdagNllG2GRSZLSxohinSx",
    icon: "agriculture",
    heritage: "Maize & Spice",
    desc: "A vibrant tapestry of indigenous roots and colonial influences. Built upon the foundational trio of corn, beans, and native chilies.",
  },
  mexican: {
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuByRBqK0mUcBAXn0wnoUFPya5xnLceaIgASedfywc7wPMaIwg719eDM0BG2a4Ji4b3xzBjxkyDPn_soZfxQ--Mq7xA41RPFbjxYvM0pqi28T3Rj-8UQFeCRoF7BOQjsL-6MbM9QzCtc_oue8Y9XKwAh4Yun-T8F9ochJX8t5xDaVilMjB5Rl-fyJoGsxkxtPFJrYy3mdwagv4pTnrAJq-v_DRNSLmjEd1zV-eAifCDRdb_G3jdijizSF_X_ZRQrLxK9VY2FQOwWmSX8",
    icon: "local_dining",
    heritage: "Fireside Fiesta",
    desc: "Vibrant, fiery, and deeply rooted in indigenous earthiness. The magic of masa, chillies, and slow-roasted meats.",
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
        <span className="text-label-caps font-label-caps text-secondary uppercase tracking-widest mb-4">
          Volume IV · Global Pairings
        </span>
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
                  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop",
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
