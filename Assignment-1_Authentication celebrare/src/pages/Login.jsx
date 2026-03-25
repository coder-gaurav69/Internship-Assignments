import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link, Navigate } from 'react-router-dom'

const Login = () => {
  const { user, isLoading, login } = useContext(AuthContext)

  if (isLoading) {
    return <div className='h-screen w-screen flex items-center justify-center'>Loading...</div>
  }

  if(user){
    return <Navigate to="/dashboard"/>
  }

  return (
    <div className='min-h-screen w-screen flex items-center justify-center bg-gray-50 px-4'>
      <div className='w-full max-w-md bg-white border rounded-2xl p-8 shadow-sm'>
        <h1 className='text-3xl font-extrabold text-gray-900'>Welcome Back</h1>
        <p className='text-sm text-gray-500 mt-2'>Login to manage your events with ease.</p>

        <button 
          className='mt-8 w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md' 
          onClick={login}
        >
          Login with Google
        </button>

        <p className='text-sm text-gray-600 mt-6 text-center'>
          New here? <Link to='/signup' className='text-blue-600 font-bold hover:underline'>Create account</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
