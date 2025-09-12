import React from 'react'
import { Mail, Bell , Settings,User,House } from "lucide-react";
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <div className="flex justify-between items-center px-4 py-3 border-b border-gray-800">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 180" width="120" height="50">
            <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#4F8EF7"/>
                <stop offset="100%" stop-color="#A76CFF"/>
                </linearGradient>
            </defs>
            <circle cx="90" cy="90" r="70" fill="url(#grad)" />
            <path d="M60 120 V60 L120 120 V60" 
                    fill="none" 
                    stroke="white" 
                    stroke-width="12" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"/>
            <text x="180" y="110" 
                    font-family="Inter, system-ui, sans-serif" 
                    font-size="64" 
                    font-weight="700" 
                    fill="url(#grad)">
                Nexo
            </text>
        </svg>

        <div className="flex gap-4">
        <Link to="/profile" className="text-sky-500 hover:text-yellow-300 transition">
            <User size={20} />
        </Link>
        <Link to="/posts/posts-list/" className="text-sky-500 hover:text-yellow-300 transition">
            <House size={20} />
        </Link>
        {/* Messages Link */}
        <Link to="/messages" className="text-sky-500 hover:text-sky-400 transition">
            <Mail size={20} />
        </Link>
        {/* Notifications Link */}
        <Link to="/notifications" className="text-sky-500 hover:text-yellow-300 transition">
            <Bell size={20} />
        </Link>
        
        <Link to="/settings" className="text-sky-500 hover:text-yellow-300 transition">
            <Settings size={20} />
        </Link>
        </div>
    </div>
  )
}

export default Header