// src/routes/user.route.ts

import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();
const userController = new UserController();

/**
 * @route   POST /api/users/sync
 * @desc    Sync/upsert logged-in user in database
 */
router.post("/sync", userController.syncUser);

/**
 * @route   GET /api/users/profile/:id
 * @desc    Get user profile summary, stats, created recipes, and activity
 */
router.get("/profile/:id", userController.getProfile);

console.log("User Route LOADED");

export default router;
