import Banner from "@/components/Banner"
import Header from "@/components/Header"
import SmallCard from "@/components/SmallCard"
import Head from "next/head"

export default function Home({exploreData}) {
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
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">
            YaadVentures by Parish
          </h2>

          {/* Pull Data from server - API Endpoints*/}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map(({index, img, parish, listings}) => (
              <SmallCard 
                key={index}
                img={img} 
                parish={parish} 
                listings={listings}  
              />
            ))}
          </div>
        </section>
      </main>


    </div>
  )
}

// 1:33:50

export async function getStaticProps(){
  const exploreData = await fetch('https://www.jsonkeeper.com/b/0OO9')
  .then(res => res.json())
  return {
    props: {
      exploreData
    }
  }
   
}