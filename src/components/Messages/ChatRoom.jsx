import React, { useState, useEffect } from "react";
import axiosInstance from "../../API/api";
import { useParams } from "react-router-dom";

const ChatRoom = () => {
  const [RoomMessages, setRoomMessages] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const AllRoomMessages = async () => {
      try {
        const response = await axiosInstance.get(`Messages/rooms/${id}`);
        setRoomMessages(response.data);
        console.log(response.data.room.messages);
      } catch (error) {
        console.log(error);
      }
    };
    AllRoomMessages();
  }, [id]);

  return (
    <div className="flex flex-col items-center min-h-screen">
      {/* Room name */}
      <h3 className="text-2xl font-bold text-blue-400 mb-6 text-center">
        {RoomMessages?.room?.name}
      </h3>

      {/* Messages */}
      <div className="w-full max-w-2xl space-y-4">
        {RoomMessages?.room?.messages?.map((msg, index) => (
          <div
            key={index}
            className="w-full px-6 py-3 rounded-lg text-white shadow-md
                       bg-gradient-to-r from-purple-500 to-pink-500
                       hover:from-purple-600 hover:to-pink-600
                       transition duration-200"
          >
            {/* Username */}
            <strong className="block text-lg">Author : {msg.user.username}</strong>

            {/* Message Content */}
            <p className="mt-1 text-base">message : {msg.content}</p>

            {/* Timestamp */}
            <small className="block text-right text-xs opacity-80 mt-2">
              posted at : {msg.timestamp}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatRoom;
