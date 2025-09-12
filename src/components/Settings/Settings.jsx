import React from 'react'
import UpdateProfile from '../Profile/UpdateProfile'
import ChangePassword from './ChangePassword'
import LogoutUser from '../User/LogoutUser'

const Settings = () => {
  return (
    <div className="max-w-md mx-auto p-4 bg-black text-white rounded-xl shadow-lg">
        <LogoutUser/>
        <UpdateProfile />
        <ChangePassword/>
    </div>
  )
}

export default Settings