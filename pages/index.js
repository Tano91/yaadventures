import Banner from "@/components/Banner"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import LargeCard from "@/components/LargeCard"
import MediumCard from "@/components/MediumCard"
import SmallCard from "@/components/SmallCard"
import Head from "next/head"

export default function Home({exploreData, cardsData}) {
  return (
    <div className=''>
      {/* convert to 32x32 favicon */}
      <Head>
      <link rel="icon" href="/yvIcon_G.png"/>
        <title>Yaadventures - Tano</title>
      </Head>

      <Header/>
      <Banner />
      
      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        {/* Section - 1 */}
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">
            YaadVentures by Parish
          </h2>

          {/* Pull Data from server - API Endpoints*/}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map(({index, img, parish, listings}) => (
              // Small Parish Cards
              <SmallCard 
                key={index}
                img={img} 
                parish={parish} 
                listings={listings}  
              />
            ))}
          </div>
        </section>

        {/* Section - 2 */}
        <section>
          <h2 className="text-4xl font-semibold py-8">
              Venture Anywhere
          </h2>

          <div className="flex space-x-5 overflow-scroll scrollbar-hide p-3 -ml-3">
            {cardsData?.map(({index, img, title}) =>(
              // Medium Offerings Cards
                <MediumCard
                key={index}
                img={img}
                title={title}
                />
            ))}
          </div>


        </section>

        {/* Section 3 */}
        <LargeCard 
          img='https://res.cloudinary.com/dcottdki8/image/upload/v1701023180/yaadventures/landscapebanner_2.jpg'
          title='Top Picks'
          description='Our Highest Rated YaadVentures'
          buttonText='Show Me!'
        />
      </main>

      <Footer />
    </div>
  )
}


export async function getStaticProps(){
  const exploreData = await fetch('https://www.jsonkeeper.com/b/0OO9')
  .then(res => res.json()
  );

  const cardsData = await fetch('https://www.jsonkeeper.com/b/NKTP')
  .then(res => res.json()
  );

  return {
    props: {
      exploreData,
      cardsData
    },
  }
}

// 1:53:23