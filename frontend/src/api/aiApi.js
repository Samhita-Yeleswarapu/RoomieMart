import api from "./axios";

export const getPriceSuggestion =
  async (data) => {
    const res = await api.post(
      "/ai-api/price",
      data
    );

    return res.data;
  };

export const generateDescription =
  async (data) => {
    const res = await api.post(
      "/ai-api/description",
      data
    );

    return res.data;
  };

export const scamCheck =
  async (data) => {
    const res = await api.post(
      "/ai-api/scam-check",
      data
    );

    return res.data;
  };