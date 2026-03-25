import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)

  return (
    <nav className='w-full border-b px-6 py-4 flex items-center justify-between bg-white shadow-sm'>
      <div>
        <h1 className='text-2xl font-extrabold text-blue-600 tracking-tight'>EventManager</h1>
      </div>
      <div className='flex items-center gap-6'>
        <div className='hidden md:block text-right'>
          <p className='text-sm font-bold text-gray-900'>{user?.name || "Intern User"}</p>
          <p className='text-xs text-gray-500 font-medium'>{user?.email}</p>
        </div>
        <button 
          className='px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-bold rounded-lg transition-colors shadow-sm' 
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar
