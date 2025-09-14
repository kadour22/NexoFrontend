import React from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../API/api";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof FileList) {
        if (value.length > 0) formData.append(key, value[0]); // file input
      } else {
        formData.append(key, value);
      }
    });

    try {
      await axiosInstance.post("Post/create/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      reset();
      navigate("/posts/posts-list/");
    } catch (error) {
      alert("❌ Failed to create post. Try again.");
      console.error(error);
    }
  };

  return (
    <div className="w-full h-full max-w-2xl mx-auto bg-black text-white border-b border-gray-800 px-4 py-6">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: true })}
          className="border p-2 w-full"
        />
        <textarea
          placeholder="Content"
          {...register("content", { required: true })}
          className="border p-2 w-full"
        />
        <input
          type="file"
          accept="image/*"
          {...register("image")}
          className="block"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 rounded ${
            isSubmitting ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600"
          }`}
        >
          {isSubmitting ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default React.memo(CreatePost);
