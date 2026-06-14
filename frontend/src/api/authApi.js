// src/api/authApi.js

import api from "./axios";

export const registerUser =
  async (userData) => {
    const res =
      await api.post(
        "/user-api/register",
        userData
      );

    return res.data;
  };

export const loginUser =
  async (userData) => {
    const res =
      await api.post(
        "/user-api/login",
        userData
      );

    return res.data;
  };

export const getCurrentUser =
  async () => {
    const res =
      await api.get(
        "/user-api/current-user"
      );

    return res.data;
  };

export const logoutUser =
  async () => {
    const res =
      await api.get(
        "/user-api/logout"
      );

    return res.data;
  };