import { useState } from 'react';

const MapForm = () => {  

  const handleSubmit = async (e) =>{
        e.preventDefault()
  }

 return (

    <div className="min-h-screen flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-12">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Where is Your YaadVenture?
          </h2>
        </div>

      
        <form onSubmit={handleSubmit} className="mt-8 space-y-6" action="#" method="POST">

        <div className="rounded-md shadow-sm -space-y-px">
          {/* Address Line 1 */}
          <label className="sr-only">Address</label>
  
            <input
              name="address"
              placeholder="Start Typing Your Address..."
              autoComplete="address-line1"
              required
              type='text'
              className="appearance-none rounded-none relative block w-full px-3 py-5 border border-gray-300 placeholder-gray-300 text-gray-900 rounded-t-md focus:outline-none focus:ring-emerald-600 focus:border-emerald-600 focus:z-10 sm:text-md "
            />


          <label className="sr-only">Address Line 2</label>
          <input 
          placeholder='Apartment'
          autoComplete="address-line2"
          className="appearance-none rounded-none relative block w-full px-3 py-5 border border-gray-300 placeholder-gray-300 text-gray-900  focus:outline-none focus:ring-emerald-600 focus:border-emerald-600 focus:z-10 sm:text-md"
          />

          <label className="sr-only">City</label>
          <input
          placeholder='City'
          autoComplete="address-level2"
          className="appearance-none rounded-none relative block w-full px-3 py-5 border border-gray-300 placeholder-gray-300 text-gray-900  focus:outline-none focus:ring-emerald-600 focus:border-emerald-600 focus:z-10 sm:text-md"
          />

          <label className="sr-only">Parish</label>
          <input
          placeholder='Parish'
          autoComplete="address-level1"
          className="appearance-none rounded-none relative block w-full px-3 py-5 border border-gray-300 placeholder-gray-300 text-gray-900 rounded-b-md focus:outline-none focus:ring-emerald-600 focus:border-emerald-600 focus:z-10 sm:text-md"
          />
     
        </div>

        {/* <div className='flex align-center justify-center'>
          <button type="submit" className="flex justify-center mt-5 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600">
            Confirm Location
          </button>
        </div> */}

        </form>
      </div>
    </div>
 )
}

export default MapForm;
