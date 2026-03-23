import React, { useContext } from 'react'
import { GlobalContext } from '../Global/GlobalState'

const Navbar = () => {
  const { user, handleLogout, sessionExpiresAt } = useContext(GlobalContext)

  const expiryText = sessionExpiresAt
    ? new Date(sessionExpiresAt).toLocaleString()
    : 'Session expired'

  return (
    <div className='w-full border-b px-6 py-4 flex items-center justify-between bg-white'>
      <div>
        <h1 className='text-xl font-bold'>Dashboard</h1>
        <p className='text-sm text-gray-600'>Session expires: {expiryText}</p>
      </div>
      <div className='flex items-center gap-3'>
        <p className='text-sm text-gray-700'>{user?.email}</p>
        <button className='px-4 py-2 bg-blue-500 text-white font-semibold rounded-xl' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar
