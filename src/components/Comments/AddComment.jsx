import React, { useState } from 'react'
import axiosInstance from '../../API/api'
import { useParams } from 'react-router-dom'

const AddComment = () => {
  const[content,setContent] = useState("")
  const {id} = useParams()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axiosInstance.post(`Comment/comments/create/${id}/`,{content}) ; 
      console.log(response.data)
    }catch(error){
      console.log(error)
    }
  }

  const [loading, setLoading] = useState(false);
  return (
    <div className="max-w-md mx-auto p-4 bg-black text-white rounded-xl shadow-lg">
         <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">
              Comment
            </label>
            <input
              type="text"
              id="username"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Comment"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <br />
         <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full p-2 rounded bg-blue-600 hover:bg-blue-700 transition"
        >
          {loading ? "Adding..." : "Add Comment"}
        </button>
    </div>
  )
}

export default AddComment