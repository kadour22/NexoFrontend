import React,{useState,useEffect} from 'react'
import axiosInstance from '../../API/api'


const CommentsList = ({id}) => {
    const [comments,setComment] = useState([])
    useEffect(()=> {
    const post_comments_list = async () =>{
      try{
        const res = axiosInstance.get(`Comment/comments-list/${id}/`)
        setComment(res.data)
        console.log(res.data)
    }catch(error){
        setError(error);
      }
    }
    post_comments_list();
    
  },[])

    return (
    <div>CommentsList</div>
  )
}

export default CommentsList