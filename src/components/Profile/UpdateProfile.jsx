import React, { useState, useEffect } from "react";
import axiosInstance from "../../API/api"; // your axios instance with baseURL + JWT token
import { useNavigate } from "react-router-dom";
const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    bio: "",
    image: null, // file upload
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // Fetch current profile
  useEffect(() => {
    axiosInstance
      .get("Profile/profile/") // assuming you already have a GET endpoint
      .then((res) => {
        setFormData({
          first_name: res.data.user.first_name || "",
          last_name: res.data.user.last_name || "",
          bio: res.data.bio || "",
          image: null,
        });
      })
      .catch((err) => console.error(err));
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image file upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
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
      data.append("image", formData.image);
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
    <div className="max-w-md mx-auto p-4 bg-gray-900 text-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Update Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
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
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          className="w-full"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 rounded bg-blue-600 hover:bg-blue-700 transition"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>

      {success && <p className="text-green-400 mt-2">{success}</p>}
      {error && <p className="text-red-400 mt-2">{error}</p>}
    </div>
  );
};

export default UpdateProfile;
