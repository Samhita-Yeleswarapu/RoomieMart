import api from "./axios";

export const getProducts =
  async () => {
    const res =
      await api.get(
        "/product-api"
      );

    return res.data;
  };

export const getProduct =
  async (id) => {
    const res =
      await api.get(
        `/product-api/${id}`
      );

    return res.data;
  };

export const createProduct =
  async (formData) => {
    const res =
      await api.post(
        "/product-api",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return res.data;
  };

export const updateProduct =
  async (
    id,
    data
  ) => {
    const res =
      await api.put(
        `/product-api/${id}`,
        data
      );

    return res.data;
  };

export const deleteProduct =
  async (id) => {
    const res =
      await api.delete(
        `/product-api/${id}`
      );

    return res.data;
  };