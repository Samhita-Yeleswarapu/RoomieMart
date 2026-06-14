import api from "./axios";

export const getConversations = async () => {
  const res = await api.get("/chat-api/conversations/all");
  return res.data;
};

export const getMessages =
  async (roomId) => {
    const res =
      await api.get(
        `/chat-api/${roomId}`
      );

    return res.data;
  };

export const sendMessage =
  async (data) => {
    const res =
      await api.post(
        "/chat-api",
        data
      );

    return res.data;
  };