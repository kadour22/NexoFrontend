import React, { useEffect } from 'react'
import './App.css'

import Header from './components/Header/Herader'

import PostList from './components/Posts/PostList'
import LikePost from './components/Posts/LikePost'
import PostDetail from './components/Posts/PostDetail' 

import Login from './components/User/Login' 
import Signup from './components/User/Signup' 
import ChangePassword from './components/Settings/ChangePassword'

import Profile from './components/Profile/Profile'
import UpdateProfile from './components/Profile/UpdateProfile'
import Settings from './components/Settings/Settings'
import {BrowserRouter as Router, Route, Routes , useNavigate
} from 'react-router-dom' 
import CreatePost from './components/Posts/CreatePost'
import Notificatoins from './components/Notifcatons/Notificatoins'

const App = () => {

  return (
    <div className='App'>
    <Router>
      <Header />
        <Routes>
          
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/update" element={<UpdateProfile />} />
          <Route path="/posts/posts-list/" element={<PostList />} /> 
          <Route path="/posts/create/" element={<CreatePost />} /> 
          <Route path="/posts/post/:id/" element={<PostDetail />} />
          <Route path="/posts/like_or_dislike/:id" element={<LikePost />} />

          <Route path="/notifications/" element={<Notificatoins />} />
        </Routes>
    </Router>
    </div>
  )
}
export default App