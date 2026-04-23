import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = () => {
    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)
    const location = useLocation()
    const rideData = location.state?.ride

    useGSAP(() => {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)',
                duration: 0.5
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)',
                duration: 0.5
            })
        }
    }, [finishRidePanel])

    return (
        <div className='h-screen w-screen flex flex-col bg-gray-900 relative overflow-hidden'>
            {/* Header */}
            <div className='absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black via-black to-transparent px-4 sm:px-6 lg:px-8 py-4 md:py-6 lg:py-8 flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <i className='ri-steering-line text-2xl sm:text-3xl lg:text-4xl text-green-500'></i>
                    <h1 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white'>RideNow</h1>
                </div>
                <Link to='/captain-home' className='bg-gray-700 hover:bg-gray-800 text-white p-2 md:p-3 lg:p-4 rounded-lg transition duration-200'>
                    <i className='ri-close-line text-lg md:text-xl lg:text-2xl'></i>
                </Link>
            </div>

            {/* Map */}
            <div className='h-full bg-gray-800 relative'>
                <LiveTracking />
            </div>

            {/* Bottom Action Panel */}
            <div 
                className='absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black via-gray-900 to-transparent px-4 sm:px-6 lg:px-8 py-4 md:py-6 lg:py-8 lg:w-96 lg:left-4 lg:right-auto lg:bottom-4 lg:from-gray-900 lg:via-gray-800 lg:to-gray-700 lg:bg-gradient-to-t lg:rounded-2xl lg:shadow-2xl'
                onClick={() => setFinishRidePanel(true)}
            >
                <div className='flex items-center justify-between bg-yellow-400 hover:bg-yellow-500 rounded-xl lg:rounded-2xl px-4 sm:px-6 lg:px-6 py-3 md:py-4 lg:py-5 cursor-pointer transition duration-200 shadow-lg'>
                    <div className='flex-1'>
                        <h4 className='text-base md:text-lg lg:text-xl font-bold text-gray-900 flex items-center gap-2'>
                            <i className='ri-navigation-2-line'></i>
                            <span className='hidden sm:inline'>4 KM away</span>
                            <span className='sm:hidden'>4 KM</span>
                        </h4>
                    </div>
                    <button className='bg-green-600 hover:bg-green-700 text-white font-bold px-3 sm:px-6 lg:px-8 py-2 md:py-2.5 lg:py-3 rounded-lg lg:rounded-xl transition flex items-center gap-2 text-xs sm:text-sm md:text-base lg:text-lg whitespace-nowrap'>
                        <i className='ri-check-line'></i>
                        <span className='hidden sm:inline'>Complete Ride</span>
                        <span className='sm:hidden'>Complete</span>
                    </button>
                </div>

                {/* Info Cards */}
                <div className='grid grid-cols-2 gap-2 md:gap-3 lg:gap-4 mt-3 md:mt-4 lg:mt-5'>
                    <div className='bg-white bg-opacity-10 backdrop-blur border border-white border-opacity-20 rounded-lg lg:rounded-xl px-3 py-2 md:px-4 md:py-3 lg:px-5 lg:py-4'>
                        <p className='text-xs text-gray-200 font-semibold mb-1'>Distance</p>
                        <p className='text-base md:text-lg lg:text-xl font-bold text-white'>12.5 KM</p>
                    </div>
                    <div className='bg-white bg-opacity-10 backdrop-blur border border-white border-opacity-20 rounded-lg lg:rounded-xl px-3 py-2 md:px-4 md:py-3 lg:px-5 lg:py-4'>
                        <p className='text-xs text-gray-200 font-semibold mb-1'>Earnings</p>
                        <p className='text-base md:text-lg lg:text-xl font-bold text-yellow-400'>₹150</p>
                    </div>
                </div>
            </div>

            {/* Finish Ride Panel */}
            <div
                ref={finishRidePanelRef}
                className='fixed bottom-0 left-0 right-0 z-40 lg:fixed lg:inset-0 lg:flex lg:items-center lg:justify-center lg:bg-black lg:bg-opacity-50 bg-white lg:bg-transparent rounded-t-3xl lg:rounded-2xl shadow-2xl max-h-[75vh] md:max-h-[80vh] lg:max-h-[85vh] overflow-y-auto translate-y-full lg:translate-y-0'
            >
                {finishRidePanel && (
                    <div className='w-full lg:w-2/5 max-w-2xl bg-white lg:rounded-2xl lg:shadow-2xl'>
                        <FinishRide
                            ride={rideData}
                            setFinishRidePanel={setFinishRidePanel}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default CaptainRiding
