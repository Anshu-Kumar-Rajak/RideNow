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
            {/* Map */}
            <div className='h-2/3 md:h-3/4 bg-gray-800 relative'>
                <LiveTracking />
                
                {/* Home Button */}
                <Link to='/home' className='absolute top-4 right-4 z-10 h-10 w-10 md:h-12 md:w-12 bg-white hover:bg-gray-100 flex items-center justify-center rounded-full shadow-lg transition'>
                    <i className="text-lg md:text-xl font-medium text-blue-600 ri-home-5-line"></i>
                </Link>
            </div>

            {/* Ride Details */}
            <div className='h-1/3 md:h-1/4 bg-white flex flex-col overflow-y-auto'>
                {/* Captain Info */}
                <div className='px-4 sm:px-6 py-4 md:py-6 border-b border-gray-200'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3 md:gap-4 flex-1'>
                            <img className='h-12 md:h-14 w-12 md:w-14 rounded-full object-cover' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="Vehicle" />
                            <div className='flex-1 min-w-0'>
                                <h2 className='text-base md:text-lg font-bold text-gray-900 truncate'>
                                    {ride?.captain?.fullname?.firstname || 'Captain'}
                                </h2>
                                <p className='text-xs md:text-sm text-gray-600 truncate'>
                                    {ride?.captain?.vehicle?.plate || 'ABC-1234'}
                                </p>
                            </div>
                        </div>
                        <div className='text-right'>
                            <p className='text-lg md:text-xl font-bold text-blue-600'>★ 4.8</p>
                        </div>
                    </div>
                </div>

                {/* Ride Details */}
                <div className='flex-1 px-4 sm:px-6 py-4 md:py-6 space-y-3 md:space-y-4'>
                    {/* Destination */}
                    <div className='flex items-start gap-3 md:gap-4 pb-3 md:pb-4 border-b border-gray-200'>
                        <div className='flex-shrink-0'>
                            <div className='flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-full bg-red-100'>
                                <i className="text-red-600 text-lg md:text-xl ri-map-pin-fill"></i>
                            </div>
                        </div>
                        <div className='flex-1 min-w-0'>
                            <p className='text-xs md:text-sm text-gray-600 font-semibold'>DESTINATION</p>
                            <p className='text-sm md:text-base font-bold text-gray-900 truncate'>{ride?.destination || 'Loading...'}</p>
                        </div>
                    </div>

                    {/* Fare */}
                    <div className='flex items-center justify-between pt-3 md:pt-4'>
                        <div className='flex items-center gap-3'>
                            <div className='flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-full bg-green-100'>
                                <i className="text-green-600 text-lg md:text-xl ri-money-rupee-circle-fill"></i>
                            </div>
                            <div>
                                <p className='text-xs md:text-sm text-gray-600 font-semibold'>TOTAL FARE</p>
                                <p className='text-lg md:text-xl font-bold text-gray-900'>₹{ride?.fare || '0'}</p>
                            </div>
                        </div>
                        <p className='text-xs md:text-sm font-semibold text-gray-600'>Cash</p>
                    </div>
                </div>

                {/* Payment Button */}
                <div className='px-4 sm:px-6 py-3 md:py-4 border-t border-gray-200 bg-gray-50'>
                    <button className='w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2.5 md:py-3 rounded-lg transition text-sm md:text-base'>
                        <i className='ri-bank-card-2-line mr-2'></i>
                        Make Payment
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Riding
