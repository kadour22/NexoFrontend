import React,{useState,useEffect} from 'react'
import axiosInstance from '../../API/api'
import { useParams } from 'react-router-dom'
import Post from './Post'
import AddComment from '../Comments/AddComment'
// posts/post/
const PostDetail = () => {
  const [post,setPost] = useState(null)
  const{id} = useParams()
  useEffect(() =>{
    const getPost = async () => {
      try{
      const response = await axiosInstance.get(`Post/posts/post/${id}/`);
      setPost(response.data);
      console.log(response.data)
      }catch(err){console.log(err)}
    }
    getPost()
  },[])
  
  return (
   <div className='post' style={{height:"100%", width :"100%",backgroundColor:"black"}}>

    <h2 style={{color:"white"}}>{post?.title}</h2>
    <img src={post?.image} alt="image" />
    <AddComment id={post?.id} />
   </div>
  )
}

export default PostDetail