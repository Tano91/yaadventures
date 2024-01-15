import Footer from '@/components/Footer'
import Header from '@/components/Header'
import InfoCard from '@/components/InfoCard'
import Map from '@/components/MAPBOX TESTS/Map'

const Listings = ({allListings}) => {

  return (
    <div className='h-screen'>
        <Header />
        
        <main className='flex'>
            <section className='flex-grow pt-14 px-6'>
                 <p className='text-xs'>300+ Locations Listed </p>

                 <h1 
                    className='text-3xl font-semibold mt-2 mb-6'>
                    All Listings
                </h1>

                <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap'>
                    <p className='button'>Rivers</p>
                    <p className='button'>Hikes</p>
                    <p className='button'>Beaches</p>
                    <p className='button'>Caves</p>
                    <p className='button'>Springs</p>
                    <p className='button'>Other</p>
                </div>

               <div className='flex flex-col'>
                {allListings.map(({index, img, parish, address, title, description, type, star, price, long, lat}) => (
                    <InfoCard 
                    key={index}
                    index={index}
                    img={img}
                    parish={parish}
                    address={address}
                    title={title}
                    description={description}
                    type={type}
                    star={star}
                    price={price}
                    long={long}
                    lat={lat}
                    />
                  ))}
               </div>

            </section> 

                  {/* Map Section. Don't Need this, I think */}
            {/* <section className='hidden xl:inline-flex xl:min-w-[600px]'>
              <Map allListings={allListings} />
            </section> */}

        </main>

        <Footer />
    </div>
  )
}

export default Listings

export async function getServerSideProps(){
  const allListings = await fetch('https://www.jsonkeeper.com/b/32P2').then(res => res.json());

  return {
    props: {
      allListings: allListings  
    }
  }
}

// 3:50:28