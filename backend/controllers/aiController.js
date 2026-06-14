import { suggestPrice } from "../services/aiPriceService.js";

import { generateDescription } from "../services/aiDescriptionService.js";

import { detectScam } from "../services/aiScamDetectionService.js";

export const getPriceSuggestion =
  (req, res) => {
    const {
      category,
      condition,
      originalPrice
    } = req.body;

    const price =
      suggestPrice(
        category,
        condition,
        originalPrice
      );

    res.json({
      suggestedPrice:
        price
    });
  };

export const getDescription =
  (req, res) => {
    const {
      title,
      condition
    } = req.body;

    const description =
      generateDescription(
        title,
        condition
      );

    res.json({
      description
    });
  };

export const scamCheck =
  (req, res) => {
    const result =
      detectScam(
        req.body.title,
        req.body.description
      );

    res.json(result);
  };