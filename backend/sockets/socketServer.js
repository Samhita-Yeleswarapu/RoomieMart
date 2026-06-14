import { Server } from "socket.io";

let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    console.log(
      "User Connected:",
      socket.id
    );

    socket.on(
      "join_room",
      (roomId) => {
        socket.join(roomId);
      }
    );

    socket.on(
      "send_message",
      (data) => {
        io.to(data.roomId).emit(
          "receive_message",
          data
        );
      }
    );

    socket.on(
      "disconnect",
      () => {
        console.log(
          "User Disconnected:",
          socket.id
        );
      }
    );
  });

  return io;
};

export const getIO = () => io;