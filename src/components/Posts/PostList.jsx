import React , {useState,useEffect} from 'react'
import axiosInstance from '../../API/api'
import Post from './Post'
import { Heart, MessageCircle, Repeat2 } from "lucide-react";
import {Link, useParams} from 'react-router-dom'
// posts : list 

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeuser,setActiveUser] = useState(null);
  // Fetch posts data ✅
  useEffect(()=> {
    const posts_list = async () =>{
      try{
        const response = await axiosInstance.get('Post/posts/');
        setPosts(response.data);
      }catch(error){
        setError(error);
      }
    }
    posts_list();
    
  },[])
  const LikeOrDislike = async (id) => {
    try{
      const response = await axiosInstance.post(`Post/like_or_dislike/${id}`);
      console.log(response.data)
      setActiveUser(response.data.user_id)
        }catch(error){
          console.log(error)
        }
    }
  return (
    <div>
      {posts.map((post,index) => (
         <div key={index} className="w-full max-w-2xl mx-auto bg-black text-white border-b border-gray-800 px-4 py-6">
      {/* Author Info */}
      <div className="flex items-center gap-3">
        <img
  src={
    post.author.posts?.[0]?.author?.profile?.profile_image
      ? post.author.posts[0].author.profile.profile_image
      : "https://via.placeholder.com/150"
  }
  alt="Author"
  className="w-12 h-12 rounded-full object-cover"
/>
        <div>
          <div className="items-center gap-2">
            <h2 className="font-semibold">{post.author.first_name} {post.author.last_name}</h2><br />
            <span className="text-gray-400 text-sm">@{post.author.username}</span>
            <span className="text-gray-500 text-xs">· {post.created_at}</span>
          </div>
        </div>
      </div>

      {/* Post Text */}
      <div className="mt-3 text-gray-200 text-sm sm:text-base">
        <h2 className=''>{post.title}</h2>
        <p>{post.content}</p>
      </div>
      <br />
      {/* Post Image */}
      <div className="mt-3">
        <img
          src={post.image}
          alt="Post"
          className="w-full rounded-xl object-cover max-h-[500px]"
        />
      </div>
      
      {/* Actions */}
      <div className="flex justify-between items-center mt-4 text-gray-400 text-sm">
        <button onClick={()=>LikeOrDislike(post.id)} className="flex items-center gap-2 hover:text-red-500 transition">
                  {Array.isArray(post.likes) && post.likes.includes(post.author.id) ? (
                    <Heart size={18} className="text-red-500" />
                  ) : (
                    <Heart size={18} />
                  )}{" "}
                  {post.likes_count}
        </button>
        <button className="flex items-center gap-2 hover:text-sky-500 transition">
          <MessageCircle size={18} /> 348
        </button>
        <button className="flex items-center gap-2 hover:text-green-500 transition">
          <Repeat2 size={18} /> 89
        </button>
      </div>
    </div>
      ))}
    </div>
  )
}

export default PostList