import React, { useState, useEffect } from "react";
import axiosInstance from "../../API/api";
import { useNavigate } from "react-router-dom";
import ChangePassword from "../Settings/ChangePassword";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    bio: "",
    image: null,
    cover: null,
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // Fetch current profile
  useEffect(() => {
    axiosInstance
      .get("Profile/profile/")
      .then((res) => {
        setFormData((prev) => ({
          ...prev,
          first_name: res.data.user.first_name || "",
          last_name: res.data.user.last_name || "",
          bio: res.data.bio || "",
        }));
      })
      .catch((err) => console.error(err));
  }, []);

  // Handle text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file inputs
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleCover = (e) => {
    setFormData({ ...formData, cover: e.target.files[0] });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const data = new FormData();
    data.append("first_name", formData.first_name);
    data.append("last_name", formData.last_name);
    data.append("bio", formData.bio);

    if (formData.image) {
      data.append("profile_image", formData.image);
    }
    if (formData.cover) {
      data.append("profile_cover", formData.cover);
    }

    try {
      await axiosInstance.put("Profile/update-profile/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("Profile updated successfully ✅");
      navigate("/profile");
    } catch (err) {
      setError("Failed to update profile ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="max-w-md mx-auto p-4 bg-black text-white rounded-xl shadow-lg">
      <h2 className="font-bold mb-4">Update Profile Info</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Text inputs */}
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        />
        <textarea
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        />

        {/* Profile Image Upload */}
        <p className="mt-2">Profile Image:</p>
        <div>
          <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full max-w-sm px-4 py-2 rounded-lg text-white font-semibold 
          bg-gradient-to-r from-purple-500 to-pink-500 
          hover:from-purple-600 hover:to-pink-600 
          focus:outline-none focus:ring-2 focus:ring-pink-300"
        />

        <p className="mt-2">Cover Image:</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleCover}
          className="w-full max-w-sm px-4 py-2 rounded-lg text-white font-semibold 
          bg-gradient-to-r from-purple-500 to-pink-500 
          hover:from-purple-600 hover:to-pink-600 
          focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
        </div>
        <br />
        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-2 rounded-lg text-white font-semibold 
          bg-gradient-to-r from-purple-500 to-pink-500 
          hover:from-purple-600 hover:to-pink-600 
          focus:outline-none focus:ring-2 focus:ring-pink-300"
        >
          {loading ? "Updating... ♻️" : "Update Profile"}
        </button>
      </form>

      {success && <p className="text-green-400 mt-2">{success}</p>}
      {error && <p className="text-red-400 mt-2">{error}</p>}
      
    </div>
  </>
  );
};

export default UpdateProfile;
