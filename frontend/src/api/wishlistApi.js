import api from "./axios";

export const addToWishlist =
  async (productId) => {
    const res =
      await api.post(
        "/wishlist-api",
        {
          productId,
        }
      );

    return res.data;
  };

export const getWishlist =
  async () => {
    const res =
      await api.get(
        "/wishlist-api"
      );

    return res.data;
  };

export const removeWishlist =
  async (productId) => {
    const res =
      await api.delete(
        `/wishlist-api/${productId}`
      );

    return res.data;
  };