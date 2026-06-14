import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { getMessages, sendMessage, getConversations } from "../api/chatApi";
import useAuthStore from "../store/authStore";

const SOCKET_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

function Chat() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState([]);

  const socketRef = useRef(null);
  const bottomRef = useRef(null);

  // Load inbox conversations
  useEffect(() => {
    const loadConversations = async () => {
      try {
        const data = await getConversations();
        setConversations(Array.isArray(data) ? data : []);
      } catch (err) {
        console.log(err);
      }
    };

    loadConversations();
  }, [roomId]);

  // Load messages for current room
  useEffect(() => {
    if (!roomId) return;

    const loadMessages = async () => {
      try {
        const data = await getMessages(roomId);
        setMessages(Array.isArray(data) ? data : []);
      } catch (err) {
        console.log(err);
      }
    };

    loadMessages();
  }, [roomId]);

  // Socket connection
  useEffect(() => {
    if (!roomId) return;

    const socket = io(SOCKET_URL, { withCredentials: true });
    socketRef.current = socket;

    socket.emit("join_room", roomId);

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.disconnect();
  }, [roomId]);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const msgData = {
      _id: Date.now().toString(),
      roomId,
      message,
      senderId: {
        _id: user?._id,
        username: user?.username,
        profilePic: user?.profilePic,
      },
      createdAt: new Date().toISOString(),
    };

    socketRef.current?.emit("send_message", msgData);

    try {
      await sendMessage({ roomId, message });
    } catch (err) {
      console.log(err);
    }

    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getOtherUser = (conv) => {
    const senderId =
      conv.senderId?._id || conv.senderId?.toString();
    if (senderId === user?._id) {
      return conv.receiverId;
    }
    return conv.senderId;
  };

  return (
    <div className="max-w-6xl mx-auto px-8 py-12 flex gap-6">

      {/* Inbox sidebar */}
      <div className="w-72 bg-white border rounded-3xl p-4 flex-shrink-0">
        <h2 className="text-xl font-bold text-[#06153A] mb-4">
          Conversations
        </h2>

        {conversations.length === 0 ? (
          <p className="text-gray-400 text-sm text-center mt-8">
            No conversations yet
          </p>
        ) : (
          <div className="space-y-2">
            {conversations.map((conv) => {
              const other = getOtherUser(conv);
              const isActive = roomId === conv._id;

              return (
                <button
                  key={conv._id}
                  onClick={() => navigate(`/chat/${conv._id}`)}
                  className={`w-full text-left flex items-center gap-3 p-3 rounded-xl transition ${
                    isActive
                      ? "bg-blue-50 border border-blue-200"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <img
                    src={
                      other?.profilePic ||
                      "https://placehold.co/36x36"
                    }
                    alt=""
                    className="w-9 h-9 rounded-full object-cover bg-gray-100"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-[#06153A] truncate">
                      {other?.username || "User"}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {conv.lastMessage}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Chat window */}
      <div className="flex-1">
        {!roomId ? (
          <div className="bg-white border rounded-3xl p-10 text-center h-full flex flex-col items-center justify-center">
            <h2 className="text-2xl font-semibold mb-3">
              Select a Conversation
            </h2>
            <p className="text-gray-500">
              Choose a chat from the sidebar, or open a
              product and click "Chat Seller".
            </p>
          </div>
        ) : (
          <div className="bg-white border rounded-3xl p-6">
            <div className="h-[500px] overflow-y-auto border rounded-xl p-4 mb-5">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">
                  No messages yet. Start the conversation.
                </div>
              ) : (
                messages.map((msg, idx) => {
                  const senderId =
                    msg.senderId?._id ||
                    msg.senderId?.toString();
                  const isMe = senderId === user?._id;

                  return (
                    <div
                      key={msg._id || idx}
                      className={`mb-3 flex ${
                        isMe ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`px-4 py-3 rounded-2xl max-w-xs ${
                          isMe
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-black"
                        }`}
                      >
                        {msg.message}
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={bottomRef} />
            </div>

            <div className="flex gap-3">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type message..."
                className="flex-1 border p-3 rounded-xl"
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-6 rounded-xl"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;