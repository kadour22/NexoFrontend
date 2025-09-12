import React from 'react'
import { useNavigate } from "react-router-dom";
import { LogOutIcon } from 'lucide-react';
const LogoutUser = () => {
    const navigate = useNavigate()
    const logout = () => {
    // 1. Remove JWT tokens
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    // 2. Redirect to login page
    navigate("/", { replace: true });
  };
  return (
    <button onClick={logout}
    className="w-l px-6  flex py-2 rounded-lg text-white font-semibold 
          bg-gradient-to-r from-purple-500 to-pink-500 
          hover:from-purple-600 hover:to-pink-600 
          focus:outline-none focus:ring-2 focus:ring-pink-300"
        
    >LogOut <LogOutIcon/></button>
  )
}

export default LogoutUser