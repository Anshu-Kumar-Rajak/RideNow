import React from 'react'

const RidePopUp = (props) => {
    return (
        <div className='pb-8'>
            <h5 className='p-1 text-center w-[93%] absolute top-0 cursor-pointer' onClick={() => {
                props.setRidePopupPanel(false)
            }}><i className="text-3xl text-gray-300 ri-arrow-down-wide-line hover:text-gray-500 transition"></i></h5>
            
            <div className='pt-8 px-4'>
                <h3 className='text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2'>
                    <i className='ri-checkbox-circle-line text-green-600'></i>
                    New Ride Available!
                </h3>
                
                {/* User Card */}
                <div className='flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl mb-6 border border-blue-200'>
                    <div className='flex items-center gap-4'>
                        <img className='h-16 w-16 rounded-full object-cover shadow-md' src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="User" />
                        <div>
                            <h2 className='text-lg font-bold text-gray-900'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
                            <p className='text-sm text-gray-600 flex items-center gap-1'><i className='ri-star-fill text-yellow-500'></i> 4.8</p>
                        </div>
                    </div>
                    <div className='text-right'>
                        <h5 className='text-xl font-bold text-blue-600'>2.2 KM</h5>
                        <p className='text-xs text-gray-600'>Away</p>
                    </div>
                </div>

                {/* Details */}
                <div className='space-y-4 mb-6'>
                    {/* Pickup */}
                    <div className='flex items-center gap-4 p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-blue-400 transition'>
                        <div className='flex-shrink-0'>
                            <i className="ri-map-pin-user-fill text-2xl text-green-600"></i>
                        </div>
                        <div className='flex-1'>
                            <h3 className='text-sm font-semibold text-gray-600'>PICKUP</h3>
                            <p className='text-lg font-bold text-gray-900'>{props.ride?.pickup}</p>
                        </div>
                    </div>

                    {/* Destination */}
                    <div className='flex items-center gap-4 p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-blue-400 transition'>
                        <div className='flex-shrink-0'>
                            <i className="ri-map-pin-fill text-2xl text-red-600"></i>
                        </div>
                        <div className='flex-1'>
                            <h3 className='text-sm font-semibold text-gray-600'>DESTINATION</h3>
                            <p className='text-lg font-bold text-gray-900'>{props.ride?.destination}</p>
                        </div>
                    </div>

                    {/* Fare */}
                    <div className='flex items-center gap-4 p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-blue-400 transition'>
                        <div className='flex-shrink-0'>
                            <i className="ri-money-rupee-circle-fill text-2xl text-orange-600"></i>
                        </div>
                        <div className='flex-1'>
                            <h3 className='text-sm font-semibold text-gray-600'>FARE</h3>
                            <p className='text-lg font-bold text-gray-900'>₹{props.ride?.fare}</p>
                        </div>
                        <p className='text-sm text-gray-600'>Cash</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className='space-y-3'>
                    <button onClick={() => {
                        props.setConfirmRidePopupPanel(true)
                        props.confirmRide()
                    }} className='w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg'>
                        <i className='ri-check-line text-xl'></i>
                        Accept Ride
                    </button>

                    <button onClick={() => {
                        props.setRidePopupPanel(false)
                    }} className='w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-xl transition-all'>
                        <i className='ri-close-line'></i> Decline
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RidePopUp