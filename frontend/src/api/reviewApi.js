// src/api/reviewApi.js

import api from "./axios";

export const addReview = async (data) => {
  const res = await api.post(
    "/review-api",
    data
  );

  return res.data;
};

export const getReviews = async (
  productId
) => {
  const res = await api.get(
    `/review-api/${productId}`
  );

  return res.data;
};