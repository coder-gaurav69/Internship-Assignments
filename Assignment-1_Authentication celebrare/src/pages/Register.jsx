import React, { useContext } from 'react'
import { GlobalContext } from '../Global/GlobalState';
import { Link, Navigate } from 'react-router-dom';
import { googleLogin } from '../firebase/googleLogin';


const Register = () => {
  const { user, loading } = useContext(GlobalContext);

    if (loading) {
      return <div className='h-screen w-screen flex items-center justify-center'>Loading...</div>
    }

    if(user){
        return <Navigate to="/dashboard"/>
    }

  return (
    <div className='min-h-screen w-screen flex items-center justify-center bg-gray-50 px-4'>
      <div className='w-full max-w-md bg-white border rounded-2xl p-6 shadow-sm'>
        <h1 className='text-2xl font-bold text-gray-900'>Register</h1>
        <p className='text-sm text-gray-600 mt-2'>Create your account using Google.</p>

        <button className='mt-6 w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-xl' onClick={googleLogin}>
          SignUp with Google
        </button>

        <p className='text-sm text-gray-600 mt-4 text-center'>
          Already have an account? <Link to='/login' className='text-blue-600 font-medium'>Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
