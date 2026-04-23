
import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-between bg-gradient-to-br from-blue-50 via-white to-blue-50 lg:bg-gradient-to-r lg:from-blue-50 lg:to-blue-100'>
      {/* Header */}
      <div className='w-full pt-8 sm:pt-12 lg:pt-16 px-4 sm:px-8 lg:px-12 text-center'>
        <div className='flex items-center justify-center gap-2 sm:gap-3 mb-2 lg:mb-4'>
          <i className='ri-car-line text-3xl sm:text-4xl lg:text-5xl text-blue-600'></i>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900'>RideNow</h1>
        </div>
        <p className='text-gray-600 text-xs sm:text-sm lg:text-lg mt-1 lg:mt-2'>Your Journey, Our Priority</p>
      </div>

      {/* Hero Content */}
      <div className='flex-1 flex items-center justify-center px-4 sm:px-8 lg:px-12 py-8 lg:py-0'>
        <div className='text-center max-w-md lg:max-w-2xl'>
          <i className='ri-map-pin-line text-5xl sm:text-6xl lg:text-7xl text-blue-500 mb-4 sm:mb-6 lg:mb-8 block'></i>
          <h2 className='text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-6'>Welcome to RideNow</h2>
          <p className='text-gray-600 text-base sm:text-lg lg:text-2xl mb-6 sm:mb-8 lg:mb-12'>Safe, reliable, and affordable rides at your fingertips</p>
          
          <div className='flex flex-col gap-2 sm:gap-3 lg:gap-4 mb-8 sm:mb-12 lg:max-w-sm lg:mx-auto'>
            <Link to='/login' className='flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2.5 sm:py-3 lg:py-4 rounded-full lg:rounded-xl font-semibold transition-all transform hover:scale-105 text-sm sm:text-base lg:text-lg shadow-md hover:shadow-lg'>
              <i className='ri-user-line'></i>
              Ride as User
            </Link>
            <Link to='/captain-login' className='flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-2.5 sm:py-3 lg:py-4 rounded-full lg:rounded-xl font-semibold transition-all transform hover:scale-105 text-sm sm:text-base lg:text-lg shadow-md hover:shadow-lg'>
              <i className='ri-steering-line'></i>
              Drive with Us
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Features */}
      <div className='w-full px-4 sm:px-8 lg:px-12 pb-8 sm:pb-12 lg:pb-16'>
        <div className='grid grid-cols-3 gap-2 sm:gap-3 lg:gap-6 text-center max-w-2xl mx-auto'>
          <div className='p-2 sm:p-4 lg:p-6 bg-white rounded-lg lg:rounded-xl shadow-sm hover:shadow-md transition-shadow'>
            <i className='ri-map-pin-line text-xl sm:text-2xl lg:text-4xl text-blue-600 mb-1 sm:mb-2 lg:mb-3 block'></i>
            <p className='text-xs sm:text-sm lg:text-base font-semibold text-gray-800'>Real-Time</p>
            <p className='text-xs text-gray-600 hidden sm:block mt-1'>Live tracking</p>
          </div>
          <div className='p-2 sm:p-4 lg:p-6 bg-white rounded-lg lg:rounded-xl shadow-sm hover:shadow-md transition-shadow'>
            <i className='ri-shield-check-line text-xl sm:text-2xl lg:text-4xl text-green-600 mb-1 sm:mb-2 lg:mb-3 block'></i>
            <p className='text-xs sm:text-sm lg:text-base font-semibold text-gray-800'>Verified</p>
            <p className='text-xs text-gray-600 hidden sm:block mt-1'>Safe drivers</p>
          </div>
          <div className='p-2 sm:p-4 lg:p-6 bg-white rounded-lg lg:rounded-xl shadow-sm hover:shadow-md transition-shadow'>
            <i className='ri-wallet-line text-xl sm:text-2xl lg:text-4xl text-orange-600 mb-1 sm:mb-2 lg:mb-3 block'></i>
            <p className='text-xs sm:text-sm lg:text-base font-semibold text-gray-800'>Affordable</p>
            <p className='text-xs text-gray-600 hidden sm:block mt-1'>Best prices</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Start