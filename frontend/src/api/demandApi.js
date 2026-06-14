import api from "./axios";

export const getDemands = async () => {
  const res = await api.get(
    "/demand-api"
  );

  return res.data;
};

export const createDemand =
  async (data) => {
    const res = await api.post(
      "/demand-api",
      data
    );

    return res.data;
  };

export const replyToDemand =
  async (id, text) => {
    const res = await api.post(
      `/demand-api/${id}/reply`,
      { text }
    );

    return res.data;
  };