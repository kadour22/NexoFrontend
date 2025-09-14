import React,{useState,useEffect} from "react";
import axios from "axios";
const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.warn("⚠️ No JWT token found. User may not be authenticated.");
      return;
    }

    axios
      .get("https://nexobackend-7pil.onrender.com/Notifications/notifications/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setNotifications(res.data.notifications);
        setCount(res.data.count);
      })
      .catch((err) => console.error("❌ Error fetching notifications:", err));

    const socket = new WebSocket(
      `wss://nexobackend-7pil.onrender.com/ws/notifications/?token=${token}`
    );
    socket.onopen = () => console.log("✅ WebSocket Connected");
    socket.onclose = () => console.log("❌ WebSocket Closed");
    socket.onerror = (err) => console.error("⚠️ WebSocket Error:", err);

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.message) {
          setNotifications((prev) => [...prev, { message: data.message }]);
          setCount((prev) => prev + 1);
        }
      } catch (err) {
        console.error("⚠️ Invalid WS message:", event.data);
      }
    };

    return () => socket.close();
  }, []);

  return (
    <div className="max-w-md mx-auto p-4 bg-black text-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-2">Notifications ({count})</h2>
      <div className="space-y-2">
        {notifications.map((notif, index) => (
          <div
            key={index}
            className="w-full px-6 py-2 rounded-lg text-white font-semibold 
          bg-gradient-to-r from-purple-500 to-pink-500 
          hover:from-purple-600 hover:to-pink-600 
          focus:outline-none focus:ring-2 focus:ring-pink-300"
          >
            {notif.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification