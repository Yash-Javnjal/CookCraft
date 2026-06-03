// src/controllers/search.controller.ts

import { Request, Response, NextFunction } from "express";
import { SearchService } from "../services/search.service";

export class SearchController {
  private searchService: SearchService;

  constructor() {
    this.searchService = new SearchService();
  }

  /**
   * POST /api/search
   * Body: { ingredients: string[] }
   */
  searchRecipes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { ingredients} = req.body;

      if (!Array.isArray(ingredients)) {
        res
          .status(400)
          .json({ success: false, message: "`ingredients` must be an array" });
        return;
      }

      const cleaned = ingredients
        .filter((i) => typeof i === "string")
        .map((i: string) => i.trim())
        .filter(Boolean);

      if (cleaned.length === 0) {
        res
          .status(400)
          .json({ success: false, message: "`ingredients` cannot be empty" });
        return;
      }

      const results = await this.searchService.searchRecipes(cleaned);

      res.status(200).json({ success: true, count: results.length, data: results });
    } catch (error) {
      next(error);
    }
  };
}
