import { useEffect, useState } from "react";
import api from "../api/axios";

function Notifications() {
  const [notifications, setNotifications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications =
    async () => {
      try {
        const res =
          await api.get(
            "/notification-api"
          );

        setNotifications(
          res.data
        );
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

  const markRead =
    async (id) => {
      try {
        await api.put(
          `/notification-api/${id}`
        );

        setNotifications(
          (prev) =>
            prev.map((n) =>
              n._id === id
                ? {
                    ...n,
                    isRead: true,
                  }
                : n
            )
        );
      } catch (err) {
        console.log(err);
      }
    };

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading Notifications...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-8">

      <h1 className="text-4xl font-bold text-[#06153A] mb-8">
        Notifications
      </h1>

      {notifications.length ===
      0 ? (
        <div className="bg-white rounded-2xl border p-10 text-center">
          No notifications yet.
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map(
            (n) => (
              <div
                key={n._id}
                className={`p-5 rounded-2xl border ${
                  n.isRead
                    ? "bg-white"
                    : "bg-blue-50 border-blue-200"
                }`}
              >
                <p>
                  {n.message}
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  {new Date(
                    n.createdAt
                  ).toLocaleString()}
                </p>

                {!n.isRead && (
                  <button
                    onClick={() =>
                      markRead(
                        n._id
                      )
                    }
                    className="mt-3 text-blue-600"
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default Notifications;