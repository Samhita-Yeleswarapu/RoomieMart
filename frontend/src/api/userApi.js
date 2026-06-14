import api from "./axios";

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