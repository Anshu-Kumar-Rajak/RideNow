import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CapatainContext'

const Captainlogin = () => {

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const { captain, setCaptain } = React.useContext(CaptainDataContext)
  const navigate = useNavigate()



  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = {
      email: email,
      password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)

    if (response.status === 200) {
      const data = response.data

      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')

    }

    setEmail('')
    setPassword('')
  }
  return (
<div className="min-h-screen  flex flex-col bg-gradient-to-b from-blue-50 to-white">

  {/* Header */}
  <div className="bg-white shadow-sm px-6 py-4 flex items-center gap-3 border-b">
    <i className="ri-steering-line text-2xl text-green-600"></i>
    <h1 className="text-xl font-bold text-gray-900">RideNow Captain</h1>
  </div>

  {/* Center Content */}
  <div className="flex-1 flex items-center justify-center px-4">

    <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 sm:p-8">

      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
        <p className="text-gray-600 text-sm">Sign in to your driver account</p>
      </div>

      {/* Form */}
      <form onSubmit={submitHandler} className="space-y-5">

        {/* Email */}
        <div>
          <label className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <i className="ri-mail-line text-green-600"></i>
            Email Address
          </label>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-600 focus:outline-none transition"
            type="email"
            placeholder="you@example.com"
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <i className="ri-lock-line text-green-600"></i>
            Password
          </label>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-600 focus:outline-none transition"
            type="password"
            placeholder="••••••••"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
        >
          <i className="ri-login-box-line"></i>
          Sign In
        </button>
      </form>

      {/* Signup */}
      <div className="mt-5 text-center text-sm">
        <p className="text-gray-600">
          New here?
          <Link to="/captain-signup" className="text-green-600 font-semibold ml-1">
            Register
          </Link>
        </p>
      </div>

      {/* Divider */}
      <div className="my-6 flex items-center">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="px-3 text-xs text-gray-400">OR</span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      {/* Switch Button */}
      <Link
        to="/login"
        className="w-full block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
      >
        Sign in as User
      </Link>

    </div>
  </div>
</div>

  )
}

export default Captainlogin