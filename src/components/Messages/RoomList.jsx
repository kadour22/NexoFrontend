import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllRooms = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          navigate("/login"); // redirect if no token
          return;
        }

        const response = await axios.get("https://nexobackend-7pil.onrender.com/Messages/rooms/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRooms(response.data);
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 401) {
          // token invalid or expired
          navigate("/");
        }
      }
    };

    getAllRooms();
  }, [navigate]);

  return (
    <div className="max-w-md mx-auto bg-white rounded shadow p-4 mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Chat Rooms</h1>
      <ul>
        {rooms.length === 0 && <p className="text-gray-500">No rooms available.</p>}
        {rooms.map((room) => (
          <li
            key={room.id}
            className="cursor-pointer p-2 hover:bg-gray-100 rounded"
            onClick={() => navigate(`/rooms/room/${room.id}`)}
          >
            {room.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
