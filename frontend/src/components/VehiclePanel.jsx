import React from 'react'

const VehiclePanel = (props) => {
    return (
        <div className='pb-8 lg:pb-0'>
            <h5 className='p-1 text-center w-full lg:hidden cursor-pointer' onClick={() => {
                props.setVehiclePanel(false)
            }}><i className="text-3xl text-gray-300 ri-arrow-down-wide-line hover:text-gray-500 transition"></i></h5>
            
            <div className='pt-6 sm:pt-8 lg:pt-0 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto'>
                <div className='hidden lg:flex items-center justify-between mb-6 pb-4 border-b border-gray-200'>
                    <h3 className='text-3xl font-bold text-gray-900'>Choose Your Ride</h3>
                    <button onClick={() => props.setVehiclePanel(false)} className='text-gray-400 hover:text-gray-600 p-2'>
                        <i className='ri-close-line text-2xl'></i>
                    </button>
                </div>
                <h3 className='lg:hidden text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900'>Choose Your Ride</h3>
                
                {/* Car Option */}
                <div onClick={() => {
                    props.setConfirmRidePanel(true)
                    props.selectVehicle('car')
                }} className='flex gap-3 sm:gap-4 lg:gap-6 border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 active:border-blue-600 mb-3 sm:mb-4 lg:mb-5 rounded-lg lg:rounded-xl w-full p-3 sm:p-4 lg:p-5 items-center cursor-pointer transition-all transform hover:scale-105 bg-white shadow-sm hover:shadow-md'>
                    <img className='h-12 sm:h-14 lg:h-16 flex-shrink-0' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="UberGo" />
                    <div className='flex-1'>
                        <h4 className='font-bold text-sm sm:text-lg lg:text-xl text-gray-900'>UberGo <span className='text-xs sm:text-sm text-gray-600 ml-2'><i className="ri-user-fill text-blue-600"></i> 4</span></h4>
                        <h5 className='font-medium text-xs sm:text-sm text-gray-600'>2 mins away</h5>
                        <p className='font-normal text-xs text-gray-500 hidden sm:block'>Affordable, compact rides</p>
                    </div>
                    <h2 className='text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 flex-shrink-0'>₹{props.fare.car}</h2>
                </div>

                {/* Moto Option */}
                <div onClick={() => {
                    props.setConfirmRidePanel(true)
                    props.selectVehicle('moto')
                }} className='flex gap-3 sm:gap-4 lg:gap-6 border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 active:border-orange-600 mb-3 sm:mb-4 lg:mb-5 rounded-lg lg:rounded-xl w-full p-3 sm:p-4 lg:p-5 items-center cursor-pointer transition-all transform hover:scale-105 bg-white shadow-sm hover:shadow-md'>
                    <img className='h-12 sm:h-14 lg:h-16 flex-shrink-0' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="Moto" />
                    <div className='flex-1'>
                        <h4 className='font-bold text-sm sm:text-lg lg:text-xl text-gray-900'>Moto <span className='text-xs sm:text-sm text-gray-600 ml-2'><i className="ri-user-fill text-orange-600"></i> 1</span></h4>
                        <h5 className='font-medium text-xs sm:text-sm text-gray-600'>3 mins away</h5>
                        <p className='font-normal text-xs text-gray-500 hidden sm:block'>Affordable motorcycle rides</p>
                    </div>
                    <h2 className='text-lg sm:text-xl lg:text-2xl font-bold text-orange-600 flex-shrink-0'>₹{props.fare.moto}</h2>
                </div>

                {/* Auto Option */}
                <div onClick={() => {
                    props.setConfirmRidePanel(true)
                    props.selectVehicle('auto')
                }} className='flex gap-3 sm:gap-4 lg:gap-6 border-2 border-gray-200 hover:border-purple-500 hover:bg-purple-50 active:border-purple-600 mb-3 sm:mb-4 rounded-lg lg:rounded-xl w-full p-3 sm:p-4 lg:p-5 items-center cursor-pointer transition-all transform hover:scale-105 bg-white shadow-sm hover:shadow-md'>
                    <img className='h-12 sm:h-14 lg:h-16 flex-shrink-0' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="Auto" />
                    <div className='flex-1'>
                        <h4 className='font-bold text-sm sm:text-lg lg:text-xl text-gray-900'>UberAuto <span className='text-xs sm:text-sm text-gray-600 ml-2'><i className="ri-user-fill text-purple-600"></i> 3</span></h4>
                        <h5 className='font-medium text-xs sm:text-sm text-gray-600'>3 mins away</h5>
                        <p className='font-normal text-xs text-gray-500 hidden sm:block'>Affordable auto rides</p>
                    </div>
                    <h2 className='text-lg sm:text-xl lg:text-2xl font-bold text-purple-600 flex-shrink-0'>₹{props.fare.auto}</h2>
                </div>
            </div>
        </div>
    )
}

export default VehiclePanel