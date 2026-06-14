import { create } from "zustand";

const storedUser =
  localStorage.getItem("user");

const useAuthStore = create(
  (set) => ({
    user: storedUser
      ? JSON.parse(storedUser)
      : null,

    token:
      localStorage.getItem(
        "token"
      ) || null,

    setUser: (user) => {
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      set({ user });
    },

    setToken: (token) => {
      localStorage.setItem(
        "token",
        token
      );

      set({ token });
    },

    logout: () => {
      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      set({
        user: null,
        token: null,
      });
    },
  })
);

export default useAuthStore;