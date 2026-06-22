"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import RecipeCard from "@/components/RecipeCard";
import LoadingState from "@/components/LoadingState";
import { searchService } from "@/services/search.service";
import { SearchResult } from "@/types";
import Link from "next/link";

export default function Discover() {
  const [selectedRegion, setSelectedRegion] = useState("Any Region");
  const [selectedType, setSelectedType] = useState<"ANY" | "VEG" | "NON_VEG">("ANY");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const regions = ["Italian", "Japanese", "Indian", "Mexican", "Hawaiian", "Steakhouse"];

  const handleSearch = async () => {
    if (ingredients.length === 0) {
      setError("Please add at least one pantry ingredient to search.");
      return;
    }
    setError(null);
    setLoading(true);
    setHasSearched(true);
    try {
      const data = await searchService.searchRecipes(ingredients);
      // Filter by region and type if selected
      let filtered = data;
      if (selectedRegion !== "Any Region") {
        filtered = filtered.filter(
          (r) => r.cuisine?.toLowerCase() === selectedRegion.toLowerCase()
        );
      }
      if (selectedType !== "ANY") {
        filtered = filtered.filter(
          (r) => r.recipeType === selectedType
        );
      }
      setResults(filtered);
    } catch (err: any) {
      console.error("Search failed:", err);
      setError(err?.response?.data?.message || "Search failed. Please ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-16 text-left">
      {/* Hero Section */}
      <section className="mb-16 md:mb-24 text-center">
        <h1 className="text-headline-xl font-headline-xl text-primary mb-4">The Culinary Atlas</h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl mx-auto italic font-label-accent text-label-accent">
          Embark on a journey through global flavors. Combine centuries of tradition with the ingredients resting in your pantry.
        </p>
      </section>

      {/* Search & Combine Interface */}
      <SearchBar
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        ingredients={ingredients}
        setIngredients={setIngredients}
        regions={regions}
        onSearch={handleSearch}
        isLoading={loading}
      />

      {error && (
        <div className="mb-8 p-4 bg-error-container text-on-error-container rounded-lg border border-error/20 font-body-md text-sm">
          {error}
        </div>
      )}

      {/* Results or Default Cuisine Grid */}
      {loading ? (
        <LoadingState />
      ) : hasSearched ? (
        <section className="animate-fade-in-up">
          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-headline-lg font-headline-lg text-primary">
              Matching Recipes ({results.length})
            </h2>
            <button
              onClick={() => {
                setHasSearched(false);
                setResults([]);
                setIngredients([]);
                setSelectedType("ANY");
                setSelectedRegion("Any Region");
              }}
              className="text-sm text-secondary hover:underline font-label-caps"
            >
              Clear Search
            </button>
          </div>

          {results.length === 0 ? (
            <div className="text-center py-16 bg-[#FFFFF0] border border-outline-variant/30 rounded-xl p-8 relative">
              <div className="texture-overlay"></div>
              <span className="material-symbols-outlined text-outline/50 text-5xl mb-4">cookie</span>
              <p className="font-label-accent text-lg italic text-on-surface-variant">
                No matching combinations found for your ingredients. Try adding simpler elements like garlic, tomatoes, or oil!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {results.map((result) => (
                <RecipeCard key={result.recipeId} recipe={result} />
              ))}
            </div>
          )}
        </section>
      ) : (
        /* Bento Grid of Cuisines from static discover.html */
        <section className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Italian - Large Featured */}
          <article className="col-span-1 md:col-span-8 group relative rounded-xl overflow-hidden editorial-shadow h-[400px] cursor-pointer">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBbE5mvbCWy2SaXC_SBvBVdVYaGfZJ6T4gMMaK3Ln3t5LAedG_bP_eiHT1gShZOH0uORG7i25iYPj8oyLL5qIBVQPx8Kuazt_gju5SZxNCPCzJREWtSjXKgGsJFfOXqQPCyv6IFwaG0E7_V4178e56rAUNCDBFgEtypryssKFx7GPz98ldw_juQqFO4yfnT5R-PwYwxf1dH60Fp1vbpXEgavCFUAcZcbjpVvBWki3IkxFVrV-QcZIEty6zBJvxNqUcuSs6P23XTWNi7')",
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-8 text-on-primary">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-secondary-fixed">restaurant_menu</span>
                <span className="text-label-caps font-label-caps tracking-widest text-secondary-fixed">
                  Mediterranean
                </span>
              </div>
              <h2 className="text-headline-lg font-headline-lg mb-2">Italian</h2>
              <p className="text-body-md font-body-md text-surface-container-high max-w-lg hidden md:block">
                The poetry of simplicity. Where a handful of pristine ingredients—flour, water, olive oil, and tomatoes—transform into profound comfort.
              </p>
            </div>
          </article>

          {/* Japanese - Tall */}
          <article className="col-span-1 md:col-span-4 group relative rounded-xl overflow-hidden editorial-shadow h-[400px] cursor-pointer">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDgp5GuWBbae7fW807n-BRYR3-Zi0swdeTtgLyU-9FU6G_TSGXucXnjs2pc4KZ3HMZLANFzwDIeDNLItoT_p_1gJUme52qg-VfuSJ1oHIz4HgO5UE1EvMjBo016xvf6JCaS5ji4Fo0pL0OyJ3zZ_Rlmdb8GoFhSHnX8gA_8-eykewKIRLOTp4LvcbMjKENKMRYcqj-B3Rv07q-RIEiilxFv07UTj_asHs-xcLNUb3GuP8S2UvzAFHg0cyk_k96wbMJ_TQV4Icnx8WBA')",
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-6 text-on-primary">
              <span className="text-label-caps font-label-caps tracking-widest text-tertiary-fixed mb-1 block">
                East Asia
              </span>
              <h2 className="text-headline-md font-headline-md mb-2">Japanese</h2>
              <p className="text-body-md font-body-md text-surface-container-high line-clamp-2">
                A masterclass in restraint and reverence for seasonal perfection.
              </p>
            </div>
          </article>

          {/* Indian - Wide */}
          <article className="col-span-1 md:col-span-6 group relative rounded-xl overflow-hidden editorial-shadow h-[300px] cursor-pointer bg-[#FFFFF0] border border-outline-variant/20">
            <div className="flex h-full">
              <div className="w-1/2 p-6 flex flex-col justify-center relative z-10">
                <div className="texture-overlay"></div>
                <span className="text-label-caps font-label-caps tracking-widest text-secondary mb-2">
                  South Asia
                </span>
                <h2 className="text-headline-md font-headline-md text-primary mb-3">Indian</h2>
                <p className="text-body-md font-body-md text-on-surface-variant italic font-label-accent text-label-accent">
                  A symphony of layered spices, blooming in ghee, creating curries that tell stories of ancient trade routes.
                </p>
              </div>
              <div className="w-1/2 relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAmovZluTq08QkKUBZ4iwpO3ldon6eG9hIyBTYIPahWjo9gkACBJSnO-6dPhsU1GXZnkpAu9942ysWa50S5mqlv374hcIjQE2AGRHFfxhbo5QyFYpjRsIwwwH7JqdycRJOcD3LLb4BWMgxdBlpz1Q96XKFfmJxcZLBL8ul1J8vdR3rnWoO072DbKQC4PVrSBN-00Jbq71E5ghEydw4pp48moaTv8gogym8Q5qwMt8qcZgMW-H3-g0cjCas5l1Y3x8SzE_izpweTG5jo')",
                  }}
                ></div>
              </div>
            </div>
          </article>

          {/* Mexican - Wide */}
          <article className="col-span-1 md:col-span-6 group relative rounded-xl overflow-hidden editorial-shadow h-[300px] cursor-pointer bg-[#FFFFF0] border border-outline-variant/20">
            <div className="flex h-full flex-row-reverse">
              <div className="w-1/2 p-6 flex flex-col justify-center relative z-10">
                <div className="texture-overlay"></div>
                <span className="text-label-caps font-label-caps tracking-widest text-secondary mb-2">
                  Latin America
                </span>
                <h2 className="text-headline-md font-headline-md text-primary mb-3">Mexican</h2>
                <p className="text-body-md font-body-md text-on-surface-variant italic font-label-accent text-label-accent">
                  Vibrant, fiery, and deeply rooted in indigenous earthiness. The magic of masa, chillies, and slow-roasted meats.
                </p>
              </div>
              <div className="w-1/2 relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuByRBqK0mUcBAXn0wnoUFPya5xnLceaIgASedfywc7wPMaIwg719eDM0BG2a4Ji4b3xzBjxkyDPn_soZfxQ--Mq7xA41RPFbjxYvM0pqi28T3Rj-8UQFeCRoF7BOQjsL-6MbM9QzCtc_oue8Y9XKwAh4Yun-T8F9ochJX8t5xDaVilMjB5Rl-fyJoGsxkxtPFJrYy3mdwagv4pTnrAJq-v_DRNSLmjEd1zV-eAifCDRdb_G3jdijizSF_X_ZRQrLxK9VY2FQOwWmSX8')",
                  }}
                ></div>
              </div>
            </div>
          </article>
        </section>
      )}

      {/* Chef Sticky Note */}
      <section className="mt-20 flex justify-center">
        <div className="bg-[#FFFCE0] p-6 max-w-sm rotate-[-2deg] editorial-shadow border border-yellow-200/50">
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-secondary text-xl">push_pin</span>
            <div>
              <p className="font-label-accent text-label-accent italic text-on-surface-variant leading-relaxed">
                "Don't be afraid to cross borders. A touch of miso in an Italian Bolognese adds unexpected umami depth. The pantry is a passport."
              </p>
              <p className="mt-3 text-label-caps font-label-caps text-secondary text-right">- Chef Collective</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
