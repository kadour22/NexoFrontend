import React, { useState } from "react";
import axiosInstance from "../../API/api"; 
import {useNavigate} from 'react-router-dom'
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build FormData
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image); // <-- Important
    }

    try {
      const response = await axiosInstance.post("Post/create/", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // 👈 Required
        },
      });
      console.log("Post created:", response.data);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="w-full h-full max-w-2xl mx-auto bg-black text-white border-b border-gray-800 px-4 py-6">

    <form className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full"
        />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="block"
        />
      <button onClick={handleSubmit}
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Create Post
      </button>
    </form>
</div>
  );
};

export default CreatePost;
