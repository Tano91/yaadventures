import React from 'react'

const Footer = () => {
  return (
    <div className='bg-gray-100'>

      <div className='flex flex-col items-center md:flex-row md:justify-evenly px-16 md:px-32 py-14'>
        <div className='text-md text-grey-800 mb-6 md:my-0'>
            <h5 className='font-bold cursor-pointer'>ABOUT</h5>
        </div>
        <div className='text-md text-grey-800'>
            <h5 className='font-bold cursor-pointer'>CONTACT</h5>
        </div>
        
      </div>

    <div className='flex justify-center'>
      <p className='text-gray-300 text-sm pb-5'>© Santano McCalla</p>
    </div>

    </div>
  )
}

export default Footer