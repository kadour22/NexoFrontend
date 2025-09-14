import React,{useState,useEffect} from 'react'
import { BadgePlus, CheckCircle, Edit2Icon } from "lucide-react";
import {Heart,MessageCircle,Repeat2} from "lucide-react";
import axiosInstance from '../../API/api';
import { Link } from 'react-router-dom';
import Post from '../Posts/Post';

import img from '../../assets/a.jpg'

const Profile = () => {
      const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("Profile/profile/"); // adjust URL
        setProfile(response.data);
      } catch (err) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);
  
  if (loading) return <p className="text-center text-gray-400">Loading profile...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
         <div className="w-full bg-black text-white">
      {/* Banner */}
      <div className="relative w-full h-40 sm:h-56 md:h-64">
        <img
           src={profile?.profile_cover ? `https://nexobackend-7pil.onrender.com${profile.profile_cover}` : "https://via.placeholder.com/150"}
          alt="Banner"
          className="w-full h-full object-cover"
        />
        {/* Profile Image */}
        <div className="absolute -bottom-14 left-4 sm:left-8">
          <img
        src={profile?.profile_image ? `https://nexobackend-7pil.onrender.com${profile.profile_image}` : {img}}
        alt="Profile"
        className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-black object-cover"
/>
        </div>
      </div>

      {/* Info */}
      <div className="mt-16 px-4 sm:px-8">
        <div className="flex items-center gap-2">
          <h4 className="text-xl sm:text-2xl font-bold">{profile?.user.first_name} {profile?.user.last_name}</h4>
          <CheckCircle size={20} className="text-sky-500" />
        </div>
        <p className="text-gray-400 text-sm sm:text-base">Username : @{profile?.user.username}</p>
        <p className="text-gray-400 text-sm sm:text-base">Bio : {profile?.bio}</p>
      </div>
        <div>
            <Link to="/posts/create/" className="w-full px-6 py-2 rounded-lg text-white font-semibold 
          bg-gradient-to-r from-purple-500 to-pink-500 
          hover:from-purple-600 hover:to-pink-600 
          focus:outline-none focus:ring-2 focus:ring-pink-300">
              Add Post
            </Link>
        </div>
      {/* Stats */}
      <div className="flex flex-wrap justify-around sm:justify-start sm:gap-12 px-4 sm:px-8 mt-6 border-t border-gray-700 py-4">
        <div className="text-center sm:text-left">
          <p className="font-bold">32,086</p>
          <p className="text-gray-400 text-sm">Followers</p>
        </div>
        <div className="text-center sm:text-left">
          <p className="font-bold">4,698</p>
          <p className="text-gray-400 text-sm">Following</p>
        </div>
        <div className="text-center sm:text-left">
          <p className="font-bold">128</p>
          <p className="text-gray-400 text-sm">Posts</p>
        </div>
        <div className="text-center sm:text-left">
          <p className="font-bold">24</p>
          <p className="text-gray-400 text-sm">Collections</p>
        </div>
      </div>
      {profile?.user.posts?.map((post) => (<Post key={post.id} post={post} profile_image={profile?.profile_image} />))}
    </div>

    </div>
  )
}

export default Profile