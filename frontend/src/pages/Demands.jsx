import { useEffect, useState } from "react";

import {
  getDemands,
  createDemand,
  replyToDemand,
} from "../api/demandApi";

import useAuthStore from "../store/authStore";

function Demands() {
  const { user } = useAuthStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [demands, setDemands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  const [replyText, setReplyText] = useState({});
  const [replyLoading, setReplyLoading] = useState({});
  const [openReplyId, setOpenReplyId] = useState(null);

  useEffect(() => {
    fetchDemands();
  }, []);

  const fetchDemands = async () => {
    try {
      const data = await getDemands();

      if (Array.isArray(data)) {
        setDemands(data);
      } else {
        setDemands([]);
      }
    } catch (error) {
      console.log(error);
      setDemands([]);
    } finally {
      setLoading(false);
    }
  };

  const addDemand = async () => {
    if (!title.trim()) return;

    if (!user) {
      alert("Please login to post a demand");
      return;
    }

    try {
      setPosting(true);

      const newDemand = await createDemand({
        title,
        description,
      });

      setDemands([newDemand, ...demands]);

      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error);
      alert(
        error?.response?.data?.message ||
          "Failed to post demand"
      );
    } finally {
      setPosting(false);
    }
  };

  const submitReply = async (demandId) => {
    const text = replyText[demandId];

    if (!text || !text.trim()) return;

    if (!user) {
      alert("Please login to reply");
      return;
    }

    try {
      setReplyLoading((prev) => ({
        ...prev,
        [demandId]: true,
      }));

      const updatedDemand = await replyToDemand(
        demandId,
        text
      );

      setDemands((prev) =>
        prev.map((d) =>
          d._id === demandId ? updatedDemand : d
        )
      );

      setReplyText((prev) => ({
        ...prev,
        [demandId]: "",
      }));
    } catch (error) {
      console.log(error);
      alert(
        error?.response?.data?.message ||
          "Failed to post reply"
      );
    } finally {
      setReplyLoading((prev) => ({
        ...prev,
        [demandId]: false,
      }));
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";

    return new Date(dateStr).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-8">
      <h1 className="text-4xl font-bold text-[#06153A] mb-8">
        Demand Board
      </h1>

      <div className="card p-6 mb-8">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Looking for a laptop, cycle..."
          className="w-full border rounded-xl p-3"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add more details (optional)..."
          className="w-full border rounded-xl p-3 mt-3"
          rows={2}
        />

        <button
          onClick={addDemand}
          disabled={posting}
          className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-xl disabled:opacity-50"
        >
          {posting ? "Posting..." : "Post Demand"}
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">
          Loading demands...
        </div>
      ) : demands.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No demands posted yet. Be the first!
        </div>
      ) : (
        <div className="space-y-4">
          {demands.map((d) => (
            <div key={d._id} className="card p-5">
              {/* Posted by info */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      d.userId?.profilePic ||
                      "https://placehold.co/40x40"
                    }
                    alt={d.userId?.username || "User"}
                    className="w-9 h-9 rounded-full object-cover bg-gray-100"
                  />

                  <div>
                    <p className="font-semibold text-[#06153A] text-sm">
                      {d.userId?.username || "Unknown User"}
                    </p>

                    <p className="text-xs text-gray-400">
                      {formatDate(d.createdAt)}
                    </p>
                  </div>
                </div>

                {d.fulfilled && (
                  <span className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full">
                    Fulfilled
                  </span>
                )}
              </div>

              {/* Demand content */}
              <h3 className="text-lg font-semibold text-[#06153A]">
                {d.title}
              </h3>

              {d.description && (
                <p className="text-gray-600 mt-1">
                  {d.description}
                </p>
              )}

              {/* Replies */}
              {d.replies?.length > 0 && (
                <div className="mt-4 space-y-3 border-t border-gray-100 pt-4">
                  {d.replies.map((reply, idx) => (
                    <div
                      key={reply._id || idx}
                      className="flex items-start gap-3"
                    >
                      <img
                        src={
                          reply.userId?.profilePic ||
                          "https://placehold.co/32x32"
                        }
                        alt={reply.userId?.username || "User"}
                        className="w-7 h-7 rounded-full object-cover bg-gray-100 mt-1"
                      />

                      <div className="bg-gray-50 rounded-xl px-4 py-2 flex-1">
                        <p className="text-sm font-semibold text-[#06153A]">
                          {reply.userId?.username ||
                            "Unknown User"}
                          <span className="text-xs text-gray-400 font-normal ml-2">
                            {formatDate(reply.createdAt)}
                          </span>
                        </p>

                        <p className="text-sm text-gray-700 mt-1">
                          {reply.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply input */}
              <div className="mt-4">
                {openReplyId === d._id ? (
                  <div className="flex gap-2">
                    <input
                      value={replyText[d._id] || ""}
                      onChange={(e) =>
                        setReplyText((prev) => ({
                          ...prev,
                          [d._id]: e.target.value,
                        }))
                      }
                      placeholder="Write a reply..."
                      className="flex-1 border rounded-xl p-2 text-sm"
                    />

                    <button
                      onClick={() => submitReply(d._id)}
                      disabled={replyLoading[d._id]}
                      className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm disabled:opacity-50"
                    >
                      {replyLoading[d._id]
                        ? "Sending..."
                        : "Send"}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setOpenReplyId(d._id)}
                    className="text-sm text-blue-600 font-medium"
                  >
                    Reply
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Demands;