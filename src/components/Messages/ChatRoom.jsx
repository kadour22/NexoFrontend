import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../API/api";

const ChatRoom = () => {
  const { roomName } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const ws = useRef(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom helper
  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  // Fetch previous messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axiosInstance.get(`/Messages/${roomName}`);
        const mappedMessages = res.data.messages.map((msg) => ({
          username: msg.user, // adjust if backend key differs
          message: msg.content,
        }));
        setMessages(mappedMessages);
        scrollToBottom();
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };
    fetchMessages();
  }, [roomName]);

  // Setup WebSocket
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const socket = new WebSocket(
      `wss://nexobackend-7pil.onrender.com/ws/chat/${roomName}/?token=${token}`
    );
    ws.current = socket;

    socket.onopen = () => console.log("WebSocket connected");
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
      scrollToBottom();
    };
    socket.onerror = (err) => console.error("WebSocket error:", err);
    socket.onclose = () => console.log("WebSocket closed");

    return () => {
      socket.close();
    };
  }, [roomName]);

  const sendMessage = () => {
    if (
      !newMessage.trim() ||
      !ws.current ||
      ws.current.readyState !== WebSocket.OPEN
    )
      return;
    ws.current.send(JSON.stringify({ message: newMessage }));
    setNewMessage("");
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded shadow p-4 flex flex-col h-[80vh]">
      <h2 className="text-xl font-bold mb-4">Room: {roomName}</h2>
      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg, idx) => (
          <div key={idx} className="p-2 rounded bg-gray-100">
            <strong>{msg.username}: </strong> {msg.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
