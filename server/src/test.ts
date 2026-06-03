// src/test.ts

import { prisma } from "../prisma/prisma";

async function main() {
  console.log("🔌 Connecting to database via Prisma...\n");

  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        ingredients: {
          include: {
            ingredient: { select: { name: true } },
          },
        },
        steps: {
          orderBy: { stepNumber: "asc" },
        },
      },
      take: 5, // Limit to 5 for testing
    });

    if (recipes.length === 0) {
      console.log("✅ Connected successfully. No recipes in database yet.");
    } else {
      console.log(`✅ Connected. Found ${recipes.length} recipe(s):\n`);
      recipes.forEach((recipe, i) => {
        console.log(`  ${i + 1}. ${recipe.title} (${recipe.difficulty})`);
        console.log(
          `     Ingredients: ${recipe.ingredients.map((ri) => ri.ingredient.name).join(", ")}`
        );
        console.log(`     Steps: ${recipe.steps.length}`);
      });
    }
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log("\n🔌 Prisma disconnected.");
  }
}

main();