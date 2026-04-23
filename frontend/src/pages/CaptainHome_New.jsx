import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CapatainContext'
import axios from 'axios'
import LiveTracking from '../components/LiveTracking'

const CaptainHome = () => {
    const [ridePopupPanel, setRidePopupPanel] = useState(false)
    const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
    const [ride, setRide] = useState(null)

    const ridePopupPanelRef = useRef(null)
    const confirmRidePopupPanelRef = useRef(null)

    const { socket } = useContext(SocketContext)
    const { captain } = useContext(CaptainDataContext)

    useEffect(() => {
        socket.emit('join', {
            userId: captain._id,
            userType: 'captain'
        })

        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
            }
        }

        const locationInterval = setInterval(updateLocation, 10000)
        updateLocation()
    }, [])

    socket.on('new-ride', (data) => {
        setRide(data)
        setRidePopupPanel(true)
    })

    async function confirmRide() {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
                rideId: ride._id,
                captainId: captain._id,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            setRidePopupPanel(false)
            setConfirmRidePopupPanel(true)
        } catch (error) {
            console.error('Error confirming ride:', error)
        }
    }

    useGSAP(() => {
        if (ridePopupPanel) {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(0)',
                duration: 0.5
            })
        } else {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(100%)',
                duration: 0.5
            })
        }
    }, [ridePopupPanel])

    useGSAP(() => {
        if (confirmRidePopupPanel) {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(0)',
                duration: 0.5
            })
        } else {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(100%)',
                duration: 0.5
            })
        }
    }, [confirmRidePopupPanel])

    return (
        <div className='h-screen w-screen flex flex-col bg-gray-900 overflow-hidden'>
            {/* Header */}
            <div className='absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black via-black to-transparent px-4 sm:px-6 py-4 md:py-6 flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <i className='ri-steering-line text-2xl sm:text-3xl text-green-500'></i>
                    <h1 className='text-lg sm:text-xl md:text-2xl font-bold text-white'>RideNow</h1>
                </div>
                <Link to='/captain/logout' className='bg-red-500 hover:bg-red-600 text-white p-2 md:p-3 rounded-lg transition duration-200'>
                    <i className='ri-logout-box-r-line text-lg md:text-xl'></i>
                </Link>
            </div>

            {/* Map */}
            <div className='h-full bg-gray-800 relative'>
                <LiveTracking />
            </div>

            {/* Captain Details Panel */}
            <div className='absolute bottom-0 left-0 right-0 z-30 bg-white rounded-t-3xl shadow-2xl px-4 sm:px-6 py-6 md:py-8'>
                <CaptainDetails captain={captain} />
            </div>

            {/* Ride Popup Panel */}
            <div
                ref={ridePopupPanelRef}
                className='fixed bottom-0 left-0 right-0 z-40 bg-white rounded-t-3xl shadow-2xl max-h-[75vh] md:max-h-[80vh] overflow-y-auto translate-y-full'
            >
                {ridePopupPanel && (
                    <RidePopUp
                        ride={ride}
                        setRidePopupPanel={setRidePopupPanel}
                        confirmRide={confirmRide}
                        setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    />
                )}
            </div>

            {/* Confirm Ride Popup Panel */}
            <div
                ref={confirmRidePopupPanelRef}
                className='fixed bottom-0 left-0 right-0 z-40 bg-white rounded-t-3xl shadow-2xl max-h-[75vh] md:max-h-[80vh] overflow-y-auto translate-y-full'
            >
                {confirmRidePopupPanel && (
                    <ConfirmRidePopUp
                        ride={ride}
                        setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    />
                )}
            </div>
        </div>
    )
}

export default CaptainHome
