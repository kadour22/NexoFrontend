import React from 'react'
import './App.css'
import Login from './components/User/Login'
import {BrowserRouter as Router, Route, Routes
} from 'react-router-dom'
import Signup from './components/User/Signup'
import Profile from './components/Profile/Profile'
const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Signup />} />
        </Routes>
    </Router>
  )
}

export default App