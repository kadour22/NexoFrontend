import React from 'react'
import { useState } from 'react'
const AddComment = () => {
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
            //   value={username}
            //   onChange={(e) => setUsername(e.target.value)}
              placeholder="Comment"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <br />
         <button
          type="submit"
          disabled={loading}
          className="w-full p-2 rounded bg-blue-600 hover:bg-blue-700 transition"
        >
          {loading ? "Adding..." : "Add Comment"}
        </button>
    </div>
  )
}

export default AddComment