import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic'

// Code is running on Server Side (Nextjs) so it cannot access the document object. To fix it, use Dynamic import with SSR disabled, importing JS modules as functions, loaded on demand, rather than in bundle:
const AddressAutofill = dynamic(() => import('@mapbox/search-js-react').then((mod) => mod.AddressAutofill), {
 ssr: false,
});

const AddressMinimap = dynamic(() => import('@mapbox/search-js-react').then((mod) => mod.AddressMinimap), {
  ssr: false,
 });


 const SearchBox = dynamic(() => import('@mapbox/search-js-react').then((mod) => mod.SearchBox), {
  ssr: false,
 });


const MapForm = () => {

  const [feature, setFeature] = useState()
  const [value, setValue] = useState('')
  
  const handleRetrieve = useCallback((res) => {
    const feature = res.features[0];
    setFeature(feature);
    console.log('WORKS')
    console.log(feature)
   }, []);
   
   

  const handleSubmit = async (e) =>{
        e.preventDefault()
    console.log(value)
  }

 return (

    <div className="min-h-screen flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-12">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Where is Your YaadVenture?
          </h2>
        </div>

        <SearchBox 
        onRetrieve={handleRetrieve}
        options={{
          country: 'JM',
          }}
          value={value}
        accessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY} />

      
        <form onSubmit={handleSubmit} className="mt-8 space-y-6" action="#" method="POST">

        <div className="rounded-md shadow-sm -space-y-px">
          {/* Address Line 1 */}
          <label className="sr-only">Address</label>
          <AddressAutofill
          options={{
            language: 'en',
            country: 'JM',
            }}
          onRetrieve={handleRetrieve}
          accessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}>
            <input
              name="address"
              placeholder="Start Typing Your Address..."
              autoComplete="address-line1"
              required
              type='text'
              className="appearance-none rounded-none relative block w-full px-3 py-5 border border-gray-300 placeholder-gray-300 text-gray-900 rounded-t-md focus:outline-none focus:ring-emerald-600 focus:border-emerald-600 focus:z-10 sm:text-md "
            />
          </AddressAutofill>

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

        
        


          {/* <div
            id='minimap-container'
            className='h-[340px] w-[460px]'
          >
              <AddressMinimap 
                show={true}
                feature={feature}
                canAdjustMarker={true}
                // satelliteToggle={true}
                // onSaveMarkerLocation={(coord) => {console.log(coord); }}
                footer=''
                accessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}>
              </AddressMinimap>
          </div> */}
        </div>

        <div className='flex align-center justify-center'>
          <button type="submit" className="flex justify-center mt-5 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600">
            Confirm Location
          </button>
        </div>

        </form>
      </div>
    </div>
 )
}

export default MapForm;
