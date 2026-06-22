"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { recipeService } from "@/services/recipe.service";
import { Recipe } from "@/types";
import RecipeCard from "@/components/RecipeCard";
import LoadingState from "@/components/LoadingState";

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    recipeService
      .getAllRecipes()
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching recipes:", err);
        setLoading(false);
      });
  }, []);

  const topRecipes = recipes.slice(0, 6);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[870px] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover"
            alt="rustic kitchen table"
            src="https://i.pinimg.com/736x/09/52/6a/09526a6b908856f823a1c5ae7d5eba42.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-container-max mx-auto px-margin-desktop w-full">
          <div className="max-w-2xl space-y-6 text-left">
            <h1 className="font-headline-xl text-headline-xl text-primary leading-tight">
              Every Great Dish Begins with a Story.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
              A culinary journal for the modern home, where intuition meets ingredient. Rediscover the ritual of cooking through heritage recipes and sensory exploration.
            </p>
            <div className="flex gap-4 pt-4">
              <Link href="/discover">
                <button className="px-8 py-4 bg-primary text-on-primary font-label-caps tracking-widest text-label-caps rounded-lg hover:shadow-lg transition-all active:scale-95 border-t border-on-tertiary-container/20">
                  Begin Your Journey
                </button>
              </Link>
              <Link href="/journal">
                <button className="px-8 py-4 bg-surface-container-highest/50 backdrop-blur-sm text-primary font-label-caps tracking-widest text-label-caps rounded-lg hover:bg-surface-container-highest transition-all border border-outline-variant/30">
                  View Journal
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Culinary Atlas */}
      <section className="py-section-gap bg-surface-bright">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="mb-12 text-center">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-2">The Culinary Atlas</h2>
            <p className="font-body-md text-on-surface-variant">Explore the world's most evocative flavor profiles.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Indian */}
            <div className="group cursor-pointer card-lift bg-surface-container rounded-xl overflow-hidden border border-outline-variant/20 shadow-sm text-left">
              <Link href="/cuisines">
                <div className="h-80 overflow-hidden relative">
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="Indian feast spread"
                    src="https://images.stockcake.com/public/0/2/f/02f1ddcd-7014-4479-89de-6a6387442ab2_large/indian-feast-spread-stockcake.jpg"
                  />
                  <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/60 to-transparent w-full">
                    <span className="font-label-caps text-white/90 tracking-widest">South Asia</span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-headline-md text-headline-md text-primary mb-2">Indian</h3>
                  <p className="font-body-md text-on-surface-variant mb-4 font-normal">
                    An ancient alchemy of spice, heat, and heart — from the char of a tandoor to the slow bloom of a curry.
                  </p>
                  <span className="font-label-caps text-secondary flex items-center gap-2 group-hover:gap-3 transition-all">
                    EXPLORE REGION <span className="material-symbols-outlined">arrow_right_alt</span>
                  </span>
                </div>
              </Link>
            </div>

            {/* American */}
            <div className="group cursor-pointer card-lift bg-surface-container rounded-xl overflow-hidden border border-outline-variant/20 shadow-sm text-left">
              <Link href="/cuisines">
                <div className="h-80 overflow-hidden relative">
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="American cuisine spread"
                    src="https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/american_cuisine_header_2b8ea6aebb.jpg"
                  />
                  <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/60 to-transparent w-full">
                    <span className="font-label-caps text-white/90 tracking-widest">North America</span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-headline-md text-headline-md text-primary mb-2">American</h3>
                  <p className="font-body-md text-on-surface-variant mb-4 font-normal">
                    Bold, generous, and unapologetically diverse — from smoky Southern BBQ to diner counter classics.
                  </p>
                  <span className="font-label-caps text-secondary flex items-center gap-2 group-hover:gap-3 transition-all">
                    EXPLORE REGION <span className="material-symbols-outlined">arrow_right_alt</span>
                  </span>
                </div>
              </Link>
            </div>

            {/* Mexican */}
            <div className="group cursor-pointer card-lift bg-surface-container rounded-xl overflow-hidden border border-outline-variant/20 shadow-sm text-left">
              <Link href="/cuisines">
                <div className="h-80 overflow-hidden relative">
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="Mexican tacos and dishes"
                    src="https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/hmlujvrb/fd6813c5-b6d8-4283-8bba-7786894144e7.jpg"
                  />
                  <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/60 to-transparent w-full">
                    <span className="font-label-caps text-white/90 tracking-widest">Latin America</span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-headline-md text-headline-md text-primary mb-2">Mexican</h3>
                  <p className="font-body-md text-on-surface-variant mb-4 font-normal">
                    Vibrant, fiery, and deeply rooted in indigenous earthiness. The magic of masa, chillies, and slow-roasted meats.
                  </p>
                  <span className="font-label-caps text-secondary flex items-center gap-2 group-hover:gap-3 transition-all">
                    EXPLORE REGION <span className="material-symbols-outlined">arrow_right_alt</span>
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Share Your Recipe Section */}
      <section className="py-20 bg-[#FFFFF0] border-t border-b border-outline-variant/30 relative">
        <div className="max-w-container-max mx-auto px-margin-desktop relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-left">
          <div className="max-w-xl">
            <span className="font-label-caps text-secondary text-label-caps tracking-widest block mb-2 uppercase">
              COMMUNITY ARCHIVE
            </span>
            <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Share Your Culinary Creations</h2>
            <p className="font-body-lg text-on-surface-variant mb-6">
              Do you have a family recipe passed down through generations, or a custom kitchen experiment you want to preserve? Document your story, ingredients, and steps in our digital archive and share it with other food enthusiasts.
            </p>
            <Link href="/profile">
              <button className="px-8 py-3 bg-secondary text-on-secondary font-bold rounded-lg shadow-lg hover:bg-secondary-fixed transition-all active:scale-95">
                Document Your Recipe
              </button>
            </Link>
          </div>
          <div className="w-full md:w-1/3 overflow-hidden rounded-2xl relative shadow-md h-64 bg-surface-container">
            <img
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=600&auto=format&fit=crop"
              alt="handwritten recipe book"
            />
          </div>
        </div>
      </section>

      {/* Mid-page CTA: Ingredient Matcher */}
      <section className="py-24 bg-primary-container relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <svg className="w-full h-full scale-150" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M47,-62.4C60.3,-53.4,70.1,-38.7,75.4,-22.9C80.7,-7.1,81.5,9.8,75.5,24.3C69.5,38.8,56.7,50.8,42,59.3C27.3,67.8,10.6,72.7,-6.1,81.1C-22.8,89.5,-39.5,101.4,-52.1,97.7C-64.7,94,-73.2,74.7,-78.9,56.5C-84.6,38.3,-87.5,21.1,-84.9,5.1C-82.3,-10.9,-74.2,-25.6,-64.1,-38.7C-54,-51.8,-42,-63.3,-28.5,-72.1C-15,-80.9,0.1,-87,14.6,-85.7C29.1,-84.4,43.2,-75.7,47,-62.4Z"
              fill="#ffffff"
              transform="translate(200 200)"
            ></path>
          </svg>
        </div>
        <div className="max-w-container-max mx-auto px-margin-desktop relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-left">
          <div className="max-w-xl text-on-primary">
            <h2 className="font-headline-lg text-headline-lg mb-4 text-primary-fixed">Cook with What You Have</h2>
            <p className="font-body-lg text-on-tertiary-container mb-8">
              Our AI-powered matcher turns your kitchen scraps and pantry staples into artisanal meals. Tell us what's in your fridge, and we'll craft the menu.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <Link href="/discover">
                <button className="px-8 py-3 bg-secondary-container text-on-secondary-container font-bold rounded-lg shadow-xl hover:bg-secondary-fixed transition-all active:scale-95">
                  Launch Matcher
                </button>
              </Link>
              <span className="flex items-center gap-2 text-on-tertiary-container font-label-accent italic">
                <span className="material-symbols-outlined">eco</span> 0% food waste mission
              </span>
            </div>
          </div>
          <div className="w-full md:w-1/3 bg-surface/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 transform rotate-2">
            <div className="flex flex-wrap gap-2 justify-start">
              <span className="bg-primary text-on-primary px-3 py-1 rounded-full text-xs font-label-caps">LEMON</span>
              <span className="bg-primary text-on-primary px-3 py-1 rounded-full text-xs font-label-caps">GARLIC</span>
              <span className="bg-primary text-on-primary px-3 py-1 rounded-full text-xs font-label-caps">CHICKEN</span>
              <span className="bg-primary text-on-primary px-3 py-1 rounded-full text-xs font-label-caps">KALE</span>
            </div>
            <div className="mt-8 border-t border-white/20 pt-4">
              <p className="text-white italic font-label-accent">"Try: Meyer Lemon Roast Chicken with Crispy Kale Chips"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Recipe Cards List */}
      <section className="py-section-gap text-left bg-surface-bright">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="font-label-caps text-secondary text-label-caps tracking-widest block mb-2 uppercase">
                Featured Selections
              </span>
              <h2 className="font-headline-lg text-headline-lg text-primary">Discover Culinary Delights</h2>
            </div>
            <Link href="/journal" className="text-primary hover:text-secondary transition-colors font-label-caps border-b border-primary pb-1">
              BROWSE ALL RECIPES
            </Link>
          </div>

          {loading ? (
            <LoadingState />
          ) : recipes.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-label-accent italic text-on-surface-variant">No recipes found in the database.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                {topRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>

              {recipes.length > 6 && (
                <div className="flex justify-center mt-16">
                  <Link href="/journal">
                    <button className="px-10 py-4 bg-primary text-on-primary font-label-caps tracking-widest text-label-caps rounded-lg hover:shadow-lg transition-all active:scale-95 flex items-center gap-3">
                      VIEW MORE RECIPES
                      <span className="material-symbols-outlined">arrow_right_alt</span>
                    </button>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}