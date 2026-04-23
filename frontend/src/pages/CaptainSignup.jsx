import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CapatainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainSignup = () => {

  const navigate = useNavigate()

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')

  const [ vehicleColor, setVehicleColor ] = useState('')
  const [ vehiclePlate, setVehiclePlate ] = useState('')
  const [ vehicleCapacity, setVehicleCapacity ] = useState('')
  const [ vehicleType, setVehicleType ] = useState('')


  const { captain, setCaptain } = React.useContext(CaptainDataContext)


  const submitHandler = async (e) => {
    e.preventDefault()
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

    if (response.status === 201) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')

  }
  return (
    <div className='min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col justify-between'>
      {/* Header */}
      <div className='bg-white shadow-sm p-6 flex items-center gap-3 border-b border-gray-100'>
        <i className='ri-steering-line text-3xl text-green-600'></i>
        <h1 className='text-2xl font-bold text-gray-900'>RideNow Captain</h1>
      </div>

      {/* Main Content */}
      <div className='flex-1 flex flex-col justify-center px-6 py-8'>
        <div className='mb-8'>
          <h2 className='text-3xl font-bold text-gray-900 mb-2'>Join as a Captain</h2>
          <p className='text-gray-600'>Start earning today</p>
        </div>

        <form onSubmit={(e) => {
          submitHandler(e)
        }} className='space-y-5'>
          {/* Name Fields */}
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2'>
                <i className='ri-user-line text-green-600'></i>
                First Name
              </label>
              <input
                required
                className='w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none bg-white transition-colors'
                type="text"
                placeholder='First'
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value)
                }}
              />
            </div>
            <div>
              <label className='block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2'>
                <i className='ri-user-line text-green-600'></i>
                Last Name
              </label>
              <input
                required
                className='w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none bg-white transition-colors'
                type="text"
                placeholder='Last'
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value)
                }}
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label className='block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2'>
              <i className='ri-mail-line text-green-600'></i>
              Email Address
            </label>
            <input
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              className='w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none bg-white transition-colors'
              type="email"
              placeholder='you@example.com'
            />
          </div>

          {/* Password Input */}
          <div>
            <label className='block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2'>
              <i className='ri-lock-line text-green-600'></i>
              Password
            </label>
            <input
              className='w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none bg-white transition-colors'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              required 
              type="password"
              placeholder='••••••••'
            />
          </div>

          {/* Vehicle Information */}
          <div className='bg-green-50 p-4 rounded-lg border-2 border-green-100'>
            <h4 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
              <i className='ri-car-line text-green-600'></i>
              Vehicle Details
            </h4>
            
            <div className='grid grid-cols-2 gap-4 mb-4'>
              <div>
                <label className='block text-sm font-semibold text-gray-900 mb-2'>Color</label>
                <input
                  required
                  className='w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none bg-white transition-colors'
                  type="text"
                  placeholder='White'
                  value={vehicleColor}
                  onChange={(e) => {
                    setVehicleColor(e.target.value)
                  }}
                />
              </div>
              <div>
                <label className='block text-sm font-semibold text-gray-900 mb-2'>License Plate</label>
                <input
                  required
                  className='w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none bg-white transition-colors'
                  type="text"
                  placeholder='ABC-1234'
                  value={vehiclePlate}
                  onChange={(e) => {
                    setVehiclePlate(e.target.value)
                  }}
                />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-semibold text-gray-900 mb-2'>Capacity</label>
                <input
                  required
                  className='w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none bg-white transition-colors'
                  type="number"
                  placeholder='4'
                  value={vehicleCapacity}
                  onChange={(e) => {
                    setVehicleCapacity(e.target.value)
                  }}
                />
              </div>
              <div>
                <label className='block text-sm font-semibold text-gray-900 mb-2'>Vehicle Type</label>
                <select
                  required
                  className='w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none bg-white transition-colors'
                  value={vehicleType}
                  onChange={(e) => {
                    setVehicleType(e.target.value)
                  }}
                >
                  <option value="" disabled>Select Type</option>
                  <option value="car">Car</option>
                  <option value="auto">Auto</option>
                  <option value="moto">Moto</option>
                </select>
              </div>
            </div>
          </div>

          {/* Create Account Button */}
          <button
            type='submit'
            className='w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 mt-8'
          >
            <i className='ri-check-line'></i>
            Create Captain Account
          </button>
        </form>

        {/* Login Link */}
        <div className='mt-6 text-center'>
          <p className='text-gray-600'>
            Already have an account? 
            <Link to='/captain-login' className='text-green-600 font-semibold hover:text-green-700 ml-1'>
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className='bg-white border-t border-gray-100 p-6 text-center text-xs text-gray-500 space-y-2'>
        <p>This site is protected by reCAPTCHA and the</p>
        <p><span className='underline cursor-pointer hover:text-gray-700'>Google Privacy Policy</span> and <span className='underline cursor-pointer hover:text-gray-700'>Terms of Service</span> apply.</p>
      </div>
    </div>
  )
}

export default CaptainSignup