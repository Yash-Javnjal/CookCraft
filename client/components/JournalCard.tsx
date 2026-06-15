"use client";

import Link from "next/link";
import { Recipe } from "@/types";

interface JournalCardProps {
  recipe: Recipe;
  index: number;
}

export default function JournalCard({ recipe, index }: JournalCardProps) {
  const rotationClasses = ["rotate-1", "-rotate-2", "rotate-2", "-rotate-1"];
  const rotation = rotationClasses[index % rotationClasses.length];

  // Format creation date
  const dateObj = new Date(recipe.createdAt);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const imageUrl = recipe.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop";

  return (
    <Link href={`/recipes/${recipe.id}`} className="block h-full">
      <article
        className={`journal-card relative rounded p-4 flex flex-col gap-4 transform ${rotation} cursor-pointer h-full`}
      >
        {/* Tape Effect overlay */}
        <div
          className="tape-effect"
          style={{
            transform: `translateX(-50%) rotate(${(index % 2 === 0 ? -2 : 3)}deg)`,
          }}
        ></div>

        <div className="w-full h-64 overflow-hidden rounded torn-edge relative bg-surface-container">
          <img
            alt={recipe.title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            src={imageUrl}
          />
        </div>

        <div className="flex justify-between items-start mt-2">
          <h3 className="text-headline-md font-headline-md text-primary leading-tight">
            {recipe.title}
          </h3>
          <span className="text-label-accent font-label-accent text-secondary italic whitespace-nowrap ml-2">
            {formattedDate}
          </span>
        </div>

        <p className="text-body-md font-body-md text-on-surface-variant flex-grow italic line-clamp-3">
          "{recipe.description}"
        </p>

        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-outline-variant/20">
          {recipe.cuisine && (
            <span className="px-3 py-1 rounded-full bg-tertiary-fixed-dim/30 text-on-tertiary-container text-label-caps font-label-caps uppercase">
              {recipe.cuisine}
            </span>
          )}
          {recipe.dietType && recipe.dietType !== "NONE" && (
            <span className="px-3 py-1 rounded-full bg-tertiary-fixed-dim/30 text-on-tertiary-container text-label-caps font-label-caps uppercase">
              {recipe.dietType.replace("_", " ")}
            </span>
          )}
          <span className="px-3 py-1 rounded-full bg-tertiary-fixed-dim/30 text-on-tertiary-container text-label-caps font-label-caps uppercase">
            {recipe.difficulty}
          </span>
        </div>
      </article>
    </Link>
  );
}
