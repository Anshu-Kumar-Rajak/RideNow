import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'

const Riding = () => {
    const location = useLocation()
    const { ride } = location.state || {}
    const { socket } = useContext(SocketContext)
    const navigate = useNavigate()

    socket.on("ride-ended", () => {
        navigate('/home')
    })

    return (
        <div className='h-screen w-screen flex flex-col bg-gray-900 overflow-hidden'>
            {/* Header */}
            <div className='sticky top-0 z-20 bg-gradient-to-b from-black via-black to-transparent px-4 sm:px-6 lg:px-8 py-4 md:py-6 lg:py-8 flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <i className='ri-car-line text-2xl sm:text-3xl lg:text-4xl text-blue-500'></i>
                    <h1 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white'>RideNow</h1>
                </div>
                <Link to='/home' className='bg-blue-600 hover:bg-blue-700 text-white p-2 md:p-3 lg:p-4 rounded-lg transition duration-200'>
                    <i className='ri-arrow-right-line text-lg md:text-xl lg:text-2xl'></i>
                </Link>
            </div>

            {/* Main Content */}
            <div className='flex-1 flex flex-col lg:flex-row overflow-hidden gap-0 lg:gap-4 lg:p-4'>
                {/* Map Section */}
                <div className='h-2/3 md:h-3/4 lg:h-full lg:flex-1 bg-gray-800 relative flex items-center justify-center rounded-0 lg:rounded-2xl overflow-hidden'>
                    <LiveTracking />
                </div>

                {/* Details Section - Card Layout for Desktop */}
                <div className='h-1/3 md:h-1/4 lg:h-full lg:w-96 bg-white lg:rounded-2xl overflow-y-auto shadow-0 lg:shadow-lg'>
                    <div className='px-4 sm:px-6 lg:px-8 py-4 md:py-6 lg:py-8 space-y-4 md:space-y-5 lg:space-y-6'>
                        <div className='hidden lg:block mb-6 pb-4 border-b border-gray-200'>
                            <h2 className='text-2xl font-bold text-gray-900 mb-2'>Your Ride</h2>
                            <p className='text-gray-600 text-sm'>Captain arriving soon</p>
                        </div>

                        {/* Captain Info */}
                        <div className='bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg lg:rounded-xl p-3 sm:p-4 lg:p-6 flex items-center gap-3 lg:gap-4'>
                            <div className='h-12 md:h-14 lg:h-16 w-12 md:w-14 lg:w-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0'>
                                <i className='ri-user-line text-white text-lg md:text-xl lg:text-2xl'></i>
                            </div>
                            <div className='flex-1'>
                                <h3 className='font-bold text-gray-900 text-sm md:text-base lg:text-lg'>{ride?.captain?.fullname || 'Captain'}</h3>
                                <p className='text-gray-600 text-xs md:text-sm'>{ride?.vehicleType || 'UberGo'}</p>
                                <div className='flex items-center gap-1 mt-1'>
                                    {[...Array(5)].map((_, i) => (
                                        <i key={i} className='ri-star-fill text-yellow-400 text-xs lg:text-sm'></i>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Vehicle Plate */}
                        <div className='bg-gray-50 rounded-lg lg:rounded-xl p-3 sm:p-4 lg:p-6'>
                            <p className='text-xs font-semibold text-gray-600 mb-2 lg:mb-3 uppercase tracking-wide'>Vehicle</p>
                            <div className='flex items-center gap-2 text-sm md:text-base lg:text-lg font-bold text-gray-900'>
                                <i className='ri-car-line text-blue-600 text-lg lg:text-2xl'></i>
                                <span>{ride?.captain?.vehicle?.plate || 'AP 09 AB 1234'}</span>
                            </div>
                        </div>

                        {/* Destination */}
                        <div className='bg-gradient-to-r from-red-50 to-red-100 rounded-lg lg:rounded-xl p-3 sm:p-4 lg:p-6'>
                            <p className='text-xs font-semibold text-gray-600 mb-3 lg:mb-4 uppercase tracking-wide'>Destination</p>
                            <div className='flex items-start gap-3 lg:gap-4'>
                                <div className='h-10 w-10 lg:h-12 lg:w-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0'>
                                    <i className='ri-map-pin-line text-white text-lg lg:text-xl'></i>
                                </div>
                                <div className='flex-1 min-w-0'>
                                    <p className='font-semibold text-gray-900 text-sm md:text-base lg:text-lg line-clamp-2'>{ride?.destination || 'Your Destination'}</p>
                                    <p className='text-gray-600 text-xs md:text-sm mt-1 lg:mt-2'>About 5 mins away</p>
                                </div>
                            </div>
                        </div>

                        {/* Fare & Payment */}
                        <div className='bg-gradient-to-r from-green-50 to-green-100 rounded-lg lg:rounded-xl p-3 sm:p-4 lg:p-6 mt-auto lg:mt-6'>
                            <div className='flex items-center gap-3 mb-3 lg:mb-4'>
                                <div className='h-10 w-10 lg:h-12 lg:w-12 bg-green-500 rounded-full flex items-center justify-center'>
                                    <i className='ri-wallet-line text-white text-lg lg:text-xl'></i>
                                </div>
                                <div className='flex-1'>
                                    <p className='text-xs font-semibold text-gray-600'>Total Fare</p>
                                    <p className='font-bold text-gray-900 text-sm md:text-base lg:text-lg'>₹{ride?.fare || '0'}</p>
                                </div>
                                <p className='text-xs md:text-sm font-semibold text-gray-700'>Cash</p>
                            </div>
                            <button className='w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2.5 lg:py-3.5 rounded-lg lg:rounded-xl transition duration-200 text-sm md:text-base lg:text-lg shadow-md hover:shadow-lg'>
                                <i className='ri-bank-card-2-line mr-2'></i>
                                Make Payment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Riding
