import React, { useState } from 'react'
import axiosInstance from '../../API/api'
import { useNavigate } from 'react-router-dom';
const ChangePassword = () => {
  const[old_password,setOldPassword] = useState("");
  const[new_password,setNewPassword] = useState("");
  const[loading,setLoading] = useState(false);
  const[message,setMessage] = useState("");
  const[error,setError] = useState("");
  const navigate = useNavigate()
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      const response = await axiosInstance.post("User/change-password/",{
        old_password,
        new_password
    });
    setMessage(response.data);
    setLoading(false);
    navigate('/profile')
    }catch(error){
      setError(error)
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-black text-white rounded-xl shadow-lg">
      <h2 className="font-bold mb-4">Change Password</h2>
        <form className="space-y-3 gap-1"> 
          <div>
              <input
              type="password"
              name="old_password"
              placeholder="Current Password"
              value={old_password}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            />
          </div>
        <br />
            <div>
              <input
              type="password"
              name="new_password"
              placeholder="New Password"
              value={new_password}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700"
              />
            </div>
            <button
          type="submit"
          onClick={handleChangePassword}
          disabled={loading}
          className="w-full px-6 py-2 rounded-lg text-white font-semibold 
          bg-gradient-to-r from-purple-500 to-pink-500 
          hover:from-purple-600 hover:to-pink-600 
          focus:outline-none focus:ring-2 focus:ring-pink-300"
        >
          Chnage Password
        </button>
        </form>
        </div>
  )
}

export default ChangePassword