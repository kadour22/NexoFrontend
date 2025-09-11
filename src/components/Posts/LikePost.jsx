import React,{useEffect} from 'react'
import axiosInstance from '../../API/api'
import { useParams } from 'react-router-dom'
// like_or_dislike/id
const LikePost = ({post}) => {
      const{id} = useParams()
     

  return (
    <button
    onClick={LikeOrDislike}
    className="flex items-center gap-2 hover:text-red-500 transition"

    >
        {Array.isArray(post.likes) && post.likes.includes(post.author.id) ? (
                    <Heart size={18} className="text-red-500" />
                  ) : (
                    <Heart size={18} />
                  )}{" "}
                  {post.likes_count}
    </button>
  )
}

export default LikePost