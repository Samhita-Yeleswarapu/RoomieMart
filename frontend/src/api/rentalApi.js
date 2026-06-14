// src/api/rentalApi.js

import api from "./axios";

export const getRentals =
  async () => {
    const res =
      await api.get(
        "/rental-api"
      );

    return res.data;
  };

export const createRental =
  async (data) => {
    const res =
      await api.post(
        "/rental-api",
        data
      );

    return res.data;
  };

export const updateRental =
  async (id, data) => {
    const res =
      await api.put(
        `/rental-api/${id}`,
        data
      );

    return res.data;
  };

export const deleteRental =
  async (id) => {
    const res =
      await api.delete(
        `/rental-api/${id}`
      );

    return res.data;
  };