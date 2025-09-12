import React from 'react'
import UpdateProfile from '../Profile/UpdateProfile'

const Settings = () => {
  return (
    <div className="max-w-md mx-auto p-4 bg-black text-white rounded-xl shadow-lg">
        <div className="password-reset" style={{width:"700px"}}>
          <form action="">
             <div>
             <input
          type="text"
          name="first_name"
          placeholder="First Name"
          // value={formData.first_name}
          // onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        />
          </div>
          </form>
        </div>
        <UpdateProfile />
    </div>
  )
}

export default Settings