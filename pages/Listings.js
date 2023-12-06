import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'

const Listings = () => {
  return (
    <div className='h-screen'>
        <Header />
        <h1>All Listings</h1>
        
        <main className='flex'>
            <section>
                 <p>300+ Locations Listed </p>
            </section> 

        </main>

        <Footer />
    </div>
  )
}

export default Listings