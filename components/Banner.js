import React from 'react'
import Image from 'next/image'

const Banner = () => {
  return (
    <div className='relative h-[300px] sm:h-[400px] lg:h-[500px]xl:h-[600px] 2xl:h-[700px]'>
        <Image
        src='https://images.unsplash.com/photo-1594242505542-bca88a4076fc?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        fill
        alt="Banner Image"
        style={{objectFit: "cover"}}
        className='brightness-50'
        />
        <div className='absolute top-1/2 w-full text-center'>
            <p className='text-sm sm:text-lg text-white'>
              Let's find your next YaadVenture!</p>

            <button className='bg-white px-10 py-4 shadow-md rounded-full font-bold my-3 hover:shadow-xl hover:text-emerald-600 active:scale-90 transition duration-150'>Let's Go!</button>
        </div>
    </div>
  )
}

// 1:03:00

export default Banner