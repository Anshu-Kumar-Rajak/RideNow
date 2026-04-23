import React, { useEffect, useRef, useState, useContext } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
import { UserDataContext } from '../context/UserContext'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'
import LiveTracking from '../components/LiveTracking'

const Home = () => {
    const [pickup, setPickup] = useState('')
    const [destination, setDestination] = useState('')
    const [panelOpen, setPanelOpen] = useState(false)
    const [vehiclePanel, setVehiclePanel] = useState(false)
    const [confirmRidePanel, setConfirmRidePanel] = useState(false)
    const [vehicleFound, setVehicleFound] = useState(false)
    const [waitingForDriver, setWaitingForDriver] = useState(false)
    const [pickupSuggestions, setPickupSuggestions] = useState([])
    const [destinationSuggestions, setDestinationSuggestions] = useState([])
    const [activeField, setActiveField] = useState(null)
    const [fare, setFare] = useState({})
    const [vehicleType, setVehicleType] = useState(null)
    const [ride, setRide] = useState(null)

    const vehiclePanelRef = useRef(null)
    const confirmRidePanelRef = useRef(null)
    const vehicleFoundRef = useRef(null)
    const waitingForDriverRef = useRef(null)

    const navigate = useNavigate()
    const { socket } = useContext(SocketContext)
    const { user } = useContext(UserDataContext)

    useEffect(() => {
        socket.emit("join", { userType: "user", userId: user._id })
    }, [user])

    socket.on('ride-confirmed', ride => {
        setVehicleFound(false)
        setWaitingForDriver(true)
        setRide(ride)
    })

    socket.on('ride-started', ride => {
        setWaitingForDriver(false)
        navigate('/riding', { state: { ride } })
    })

    const handlePickupChange = async (e) => {
        setPickup(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            setPickupSuggestions(response.data)
        } catch (error) {
            console.error('Error fetching pickup suggestions:', error)
        }
    }

    const handleDestinationChange = async (e) => {
        setDestination(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            setDestinationSuggestions(response.data)
        } catch (error) {
            console.error('Error fetching destination suggestions:', error)
        }
    }

    const handleFareRequest = async () => {
        if (!pickup || !destination) return

        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
                params: { pickup, destination },
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            setFare(response.data)
            setVehiclePanel(true)
            setPanelOpen(false)
        } catch (error) {
            console.error('Error fetching fare:', error)
        }
    }

    const selectVehicle = (type) => {
        setVehicleType(type)
    }

    const handleCreateRide = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
                pickup,
                destination,
                vehicleType
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            setRide(response.data.ride)
            setVehicleFound(true)
            setConfirmRidePanel(false)
        } catch (error) {
            console.error('Error creating ride:', error)
        }
    }

    useGSAP(() => {
        if (vehiclePanel) {
            gsap.to(vehiclePanelRef.current, { transform: 'translateY(0)', duration: 0.5 })
        } else {
            gsap.to(vehiclePanelRef.current, { transform: 'translateY(100%)', duration: 0.5 })
        }
    }, [vehiclePanel])

    useGSAP(() => {
        if (confirmRidePanel) {
            gsap.to(confirmRidePanelRef.current, { transform: 'translateY(0)', duration: 0.5 })
        } else {
            gsap.to(confirmRidePanelRef.current, { transform: 'translateY(100%)', duration: 0.5 })
        }
    }, [confirmRidePanel])

    useGSAP(() => {
        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, { transform: 'translateY(0)', duration: 0.5 })
        } else {
            gsap.to(vehicleFoundRef.current, { transform: 'translateY(100%)', duration: 0.5 })
        }
    }, [vehicleFound])

    useGSAP(() => {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, { transform: 'translateY(0)', duration: 0.5 })
        } else {
            gsap.to(waitingForDriverRef.current, { transform: 'translateY(100%)', duration: 0.5 })
        }
    }, [waitingForDriver])

    return (
        <div className='h-screen w-screen flex flex-col bg-white overflow-hidden'>
            {/* Header */}
            <div className='sticky top-0 z-20 bg-white border-b border-gray-100 px-3 sm:px-4 md:px-6 lg:px-8 py-3 md:py-4 lg:py-5 flex items-center justify-between shadow-sm'>
                <div className='flex items-center gap-2'>
                    <i className='ri-car-line text-2xl sm:text-3xl lg:text-4xl text-blue-600'></i>
                    <h1 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900'>RideNow</h1>
                </div>
                <Link to='/user/logout' className='bg-red-50 hover:bg-red-100 text-red-600 p-2 md:p-3 lg:p-4 rounded-lg transition duration-200'>
                    <i className='ri-logout-box-r-line text-lg md:text-xl lg:text-2xl'></i>
                </Link>
            </div>

            {/* Main Content */}
            <div className='flex-1 flex flex-col lg:flex-row overflow-hidden gap-0 lg:gap-4 lg:p-4'>
                {/* Map Section */}
                <div className='h-1/3 sm:h-2/5 md:h-1/2 lg:h-full lg:flex-1 bg-gradient-to-b from-gray-100 to-gray-50 relative flex items-center justify-center rounded-0 lg:rounded-2xl overflow-hidden'>
                    <LiveTracking />
                </div>

                {/* Search Section */}
                <div className='flex-1 bg-white lg:w-1/3 overflow-y-auto rounded-t-3xl lg:rounded-2xl shadow-0 lg:shadow-lg'>
                    <div className='px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8 space-y-4 md:space-y-5 lg:space-y-6 max-w-2xl mx-auto lg:max-w-full'>
                        <div className='hidden lg:block mb-6 pb-4 border-b border-gray-200'>
                            <h2 className='text-2xl font-bold text-gray-900 mb-2'>Plan Your Ride</h2>
                            <p className='text-gray-600 text-sm'>Enter your pickup and destination to get started</p>
                        </div>

                        {/* Pickup Input */}
                        <div className='relative'>
                            <label className='block text-xs sm:text-sm lg:text-base font-semibold text-gray-900 mb-2 lg:mb-3 flex items-center gap-2'>
                                <i className='ri-map-pin-user-fill text-green-600 text-lg lg:text-xl'></i>
                                <span className='hidden sm:inline'>Pickup Location</span>
                                <span className='sm:hidden'>Pickup</span>
                            </label>
                            <input
                                onClick={() => {
                                    setPanelOpen(true)
                                    setActiveField('pickup')
                                }}
                                value={pickup}
                                onChange={handlePickupChange}
                                className='w-full px-4 sm:px-4 lg:px-5 py-3 md:py-3 lg:py-4 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:border-blue-600 focus:outline-none transition text-sm md:text-base lg:text-lg'
                                type="text"
                                placeholder='Where from?'
                            />
                        </div>

                        {/* Destination Input */}
                        <div className='relative'>
                            <label className='block text-xs sm:text-sm lg:text-base font-semibold text-gray-900 mb-2 lg:mb-3 flex items-center gap-2'>
                                <i className='ri-map-pin-fill text-red-600 text-lg lg:text-xl'></i>
                                <span className='hidden sm:inline'>Destination</span>
                                <span className='sm:hidden'>Destination</span>
                            </label>
                            <input
                                onClick={() => {
                                    setPanelOpen(true)
                                    setActiveField('destination')
                                }}
                                value={destination}
                                onChange={handleDestinationChange}
                                className='w-full px-4 sm:px-4 lg:px-5 py-3 md:py-3 lg:py-4 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:border-blue-600 focus:outline-none transition text-sm md:text-base lg:text-lg'
                                type="text"
                                placeholder='Where to?'
                            />
                        </div>

                        {/* Search Button */}
                        <button
                            onClick={handleFareRequest}
                            disabled={!pickup || !destination}
                            className='w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 md:py-3 lg:py-4 rounded-lg lg:rounded-xl transition duration-200 flex items-center justify-center gap-2 text-sm md:text-base lg:text-lg shadow-md hover:shadow-lg'
                        >
                            <i className='ri-search-line'></i>
                            Find Ride
                        </button>

                        {/* Suggestions */}
                        {panelOpen && (
                            <div className='bg-gray-50 rounded-lg lg:rounded-xl p-4 lg:p-6 space-y-2 lg:space-y-3'>
                                <LocationSearchPanel
                                    suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                                    setVehiclePanel={setVehiclePanel}
                                    setPanelOpen={setPanelOpen}
                                    setPickupSuggestions={setPickupSuggestions}
                                    setDestinationSuggestions={setDestinationSuggestions}
                                    activeField={activeField}
                                    setActiveField={setActiveField}
                                    pickup={pickup}
                                    destination={destination}
                                    setPickup={setPickup}
                                    setDestination={setDestination}
                                    getFare={handleFareRequest}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Vehicle Panel */}
            <div ref={vehiclePanelRef} className='fixed bottom-0 left-0 right-0 z-40 lg:fixed lg:inset-0 lg:flex lg:items-center lg:justify-center lg:bg-black lg:bg-opacity-50 bg-white lg:bg-transparent rounded-t-2xl sm:rounded-t-3xl lg:rounded-2xl shadow-2xl max-h-[75vh] sm:max-h-[80vh] lg:max-h-[85vh] overflow-y-auto translate-y-full lg:translate-y-0 lg:scale-100 lg:opacity-0 lg:pointer-events-none'>
                {vehiclePanel && (
                    <div className='w-full lg:w-2/5 max-w-2xl bg-white lg:rounded-2xl lg:shadow-2xl'>
                        <VehiclePanel
                            setVehiclePanel={setVehiclePanel}
                            selectVehicle={selectVehicle}
                            fare={fare}
                            setConfirmRidePanel={setConfirmRidePanel}
                        />
                    </div>
                )}
            </div>

            {/* Confirm Ride Panel */}
            <div ref={confirmRidePanelRef} className='fixed bottom-0 left-0 right-0 z-40 lg:fixed lg:inset-0 lg:flex lg:items-center lg:justify-center lg:bg-black lg:bg-opacity-50 bg-white lg:bg-transparent rounded-t-2xl sm:rounded-t-3xl lg:rounded-2xl shadow-2xl max-h-[75vh] sm:max-h-[80vh] lg:max-h-[85vh] overflow-y-auto translate-y-full lg:translate-y-0'>
                {confirmRidePanel && (
                    <div className='w-full lg:w-2/5 max-w-2xl bg-white lg:rounded-2xl lg:shadow-2xl'>
                        <ConfirmRide
                            pickup={pickup}
                            destination={destination}
                            fare={fare}
                            vehicleType={vehicleType}
                            setConfirmRidePanel={setConfirmRidePanel}
                            createRide={handleCreateRide}
                        />
                    </div>
                )}
            </div>

            {/* Looking For Driver Panel */}
            <div ref={vehicleFoundRef} className='fixed bottom-0 left-0 right-0 z-40 lg:fixed lg:inset-0 lg:flex lg:items-center lg:justify-center lg:bg-black lg:bg-opacity-50 bg-white lg:bg-transparent rounded-t-2xl sm:rounded-t-3xl lg:rounded-2xl shadow-2xl max-h-[75vh] sm:max-h-[80vh] lg:max-h-[85vh] overflow-y-auto translate-y-full lg:translate-y-0'>
                {vehicleFound && (
                    <div className='w-full lg:w-2/5 max-w-2xl bg-white lg:rounded-2xl lg:shadow-2xl'>
                        <LookingForDriver
                            ride={ride}
                            setVehicleFound={setVehicleFound}
                        />
                    </div>
                )}
            </div>

            {/* Waiting For Driver Panel */}
            <div ref={waitingForDriverRef} className='fixed bottom-0 left-0 right-0 z-40 lg:fixed lg:inset-0 lg:flex lg:items-center lg:justify-center lg:bg-black lg:bg-opacity-50 bg-white lg:bg-transparent rounded-t-2xl sm:rounded-t-3xl lg:rounded-2xl shadow-2xl max-h-[75vh] sm:max-h-[80vh] lg:max-h-[85vh] overflow-y-auto translate-y-full lg:translate-y-0'>
                {waitingForDriver && (
                    <div className='w-full lg:w-2/5 max-w-2xl bg-white lg:rounded-2xl lg:shadow-2xl'>
                        <WaitingForDriver
                            ride={ride}
                            setWaitingForDriver={setWaitingForDriver}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home
