// src/routes/favorite.route.ts

import { Router } from "express";
import { FavoriteController } from "../controllers/favorite.controller";

const router = Router();
const favoriteController = new FavoriteController();

/**
 * @route   POST /api/favorites/toggle
 * @desc    Toggle favorite status of a recipe for a user
 */
router.post("/toggle", favoriteController.toggleFavorite);

/**
 * @route   GET /api/favorites/:userId
 * @desc    Get all recipe IDs favorited by user
 */
router.get("/:userId", favoriteController.getUserFavorites);

console.log("Favorite Route LOADED");

export default router;
