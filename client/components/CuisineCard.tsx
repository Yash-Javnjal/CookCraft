"use client";

import { Recipe } from "@/types";

interface CuisineCardProps {
  name: string;
  imageUrl: string;
  heritageText: string;
  icon: string;
  description: string;
  featuredRecipes: Partial<Recipe>[];
  colSpanClass: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function CuisineCard({
  name,
  imageUrl,
  heritageText,
  icon,
  description,
  featuredRecipes,
  colSpanClass,
  isSelected,
  onClick,
}: CuisineCardProps) {
  return (
    <article
      onClick={onClick}
      className={`card-lift ambient-shadow bg-surface-container-lowest rounded-xl overflow-hidden ${colSpanClass} flex flex-col cursor-pointer border transition-all duration-300 relative ${
        isSelected
          ? "border-secondary ring-2 ring-secondary/40 shadow-md transform scale-[1.01]"
          : "border-surface-variant/50"
      }`}
    >
      <div className="h-72 w-full relative overflow-hidden bg-surface-container">
        <img
          alt={`${name} Cuisine`}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          src={imageUrl}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent mix-blend-multiply"></div>
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3 text-secondary">
          <span className="material-symbols-outlined text-sm">{icon}</span>
          <span className="text-label-caps font-label-caps uppercase">{heritageText}</span>
        </div>
        <h2 className="text-headline-lg font-headline-lg text-primary mb-4">{name}</h2>
        <p className="text-label-accent font-label-accent italic text-on-surface-variant mb-6 line-clamp-3">
          "{description}"
        </p>
        
        {featuredRecipes.length > 0 && (
          <div className="mt-auto border-t border-outline-variant/30 pt-4">
            <h3 className="text-label-caps font-label-caps text-on-surface-variant mb-2">Signature Dishes</h3>
            <ul className="space-y-2">
              {featuredRecipes.slice(0, 2).map((recipe, index) => (
                <li
                  key={recipe.id || index}
                  className="flex items-center gap-3 text-body-md font-body-md text-primary hover:text-secondary transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  {recipe.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}
