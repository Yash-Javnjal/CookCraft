"use client";

import React, { useState } from "react";

interface SearchBarProps {
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  ingredients: string[];
  setIngredients: (ingredients: string[]) => void;
  regions: string[];
  onSearch: () => void;
  isLoading?: boolean;
}

export default function SearchBar({
  selectedRegion,
  setSelectedRegion,
  ingredients,
  setIngredients,
  regions,
  onSearch,
  isLoading = false,
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAddIngredient = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmed = inputValue.trim().replace(/,/g, "");
      if (trimmed && !ingredients.includes(trimmed)) {
        setIngredients([...ingredients, trimmed]);
      }
      setInputValue("");
    }
  };

  const handleAddClick = () => {
    const trimmed = inputValue.trim().replace(/,/g, "");
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
    }
    setInputValue("");
  };

  const handleRemoveIngredient = (indexToRemove: number) => {
    setIngredients(ingredients.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <section className="mb-16 bg-[#FFFFF0] editorial-shadow rounded-xl p-8 relative overflow-hidden border border-outline-variant/30">
      <div className="texture-overlay"></div>
      <div className="relative z-20 flex flex-col md:flex-row items-center gap-6">
        {/* Region Selection */}
        <div className="w-full md:w-1/3">
          <label className="block text-label-caps font-label-caps text-on-surface-variant mb-2 uppercase tracking-widest text-left">
            Select Region
          </label>
          <div className="relative">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full bg-transparent border-none border-b border-outline-variant pb-2 text-body-lg font-body-lg focus:outline-none focus:border-secondary appearance-none rounded-none text-left"
            >
              <option value="Any Region">Any Region</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-0 top-1 text-outline pointer-events-none">
              expand_more
            </span>
          </div>
        </div>

        {/* Add Separator */}
        <div className="flex items-center justify-center text-outline-variant px-4">
          <span className="material-symbols-outlined text-2xl font-light">add</span>
        </div>

        {/* Pantry Ingredients tags */}
        <div className="w-full md:w-1/2 flex-grow">
          <label className="block text-label-caps font-label-caps text-on-surface-variant mb-2 uppercase tracking-widest text-left">
            Pantry Ingredients
          </label>
          <div className="relative flex items-center border-b border-outline-variant pb-2">
            <span className="material-symbols-outlined text-outline mr-2">search</span>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleAddIngredient}
              className="w-full bg-transparent text-body-lg font-body-lg focus:outline-none focus:border-secondary border-none p-0 focus:ring-0"
              placeholder="Type ingredient and press Enter..."
            />
            {inputValue.trim() && (
              <button
                type="button"
                onClick={handleAddClick}
                className="text-xs bg-secondary text-on-secondary px-2 py-1 rounded"
              >
                Add
              </button>
            )}
          </div>
          
          {/* Chips Area */}
          <div className="flex flex-wrap gap-2 mt-3">
            {ingredients.map((ingredient, index) => (
              <span
                key={index}
                className="bg-[#31450d]/10 text-primary px-3 py-1 rounded-full text-label-caps font-label-caps flex items-center gap-1"
              >
                {ingredient}
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                  className="hover:text-secondary focus:outline-none flex items-center"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Submit Action */}
        <div className="w-full md:w-auto mt-4 md:mt-0 pt-6">
          <button
            type="button"
            onClick={onSearch}
            disabled={isLoading}
            className="w-full md:w-auto bg-primary text-on-primary px-8 py-3 rounded-lg text-label-caps font-label-caps hover:bg-primary-container transition-colors shadow-sm flex items-center justify-center gap-2 border-t border-white/20 disabled:opacity-50"
          >
            <span>{isLoading ? "Exploring..." : "Explore Combinations"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
