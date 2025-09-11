import React from 'react'
import './App.css'
import Login from './components/User/Login'
import {BrowserRouter as Router, Route, Routes
} from 'react-router-dom'
import Signup from './components/User/Signup'
import Profile from './components/Profile/Profile'
import UpdateProfile from './components/Profile/UpdateProfile'
import PostList from './components/Posts/PostList'
import LikePost from './components/Posts/LikePost'
import Header from './components/Header/Herader'
const App = () => {
  return (
    <div className='App'>
    <Router>
      <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/update" element={<UpdateProfile />} />
          <Route path="/posts/posts-list/" element={<PostList />} />
          <Route path="/posts/like_or_dislike/:id" element={<LikePost />} />
          <Route path="/" element={<Signup />} />
        </Routes>
    </Router>
    </div>
  )
}

export default App