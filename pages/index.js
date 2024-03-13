import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import LargeCard from "@/components/LargeCard";
import MediumCard from "@/components/MediumCard";
import SmallCard from "@/components/SmallCard";
import Head from "next/head";
import { listingsColRef, usersColRef } from "@/firebase/config";
import { getDocs } from "firebase/firestore";
import { getTypesImagePaths } from "@/utils/getTypesImagePaths";
import { getParishesImagePaths } from "@/utils/getParishesImagePaths";
import { useRouter } from "next/router";

export default function Home({ listings, users }) {
  const router = useRouter();
  const typesImages = getTypesImagePaths();
  const parishesImages = getParishesImagePaths();

  return (
    <div className="">
      <Head>
        <link rel="icon" href="/yvIcon_G.png" />
        <title>Yaadventures - Home</title>
      </Head>

      <Banner />

      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        {/* Section - 1 */}
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">
            YaadVentures by Parish
          </h2>

          {/* Pull Data from server - API Endpoints*/}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {parishesImages.map((item, index) => (
              <button
                key={index}
                onClick={() =>
                  router.push(`/listings/filtered-listings?type=${item.parish}`)
                }
              >
                <SmallCard
                  listings={listings}
                  img={item.img}
                  parish={item.parish}
                />
              </button>
            ))}
          </div>
        </section>

        {/* Section - 2 */}
        <section>
          <h2 className="text-4xl font-semibold py-8">Venture Anywhere</h2>

          {/* <div className="flex space-x-5 p-3 -ml-3  scrollbar-thumb-gray-200 scrollbar-track-white scrollbar-thin overflow-x-auto"> */}
          <div className="flex space-x-5 p-3 -ml-3 pb-10  overflow-x-auto">
            {typesImages.map((item, index) => (
              <button
                key={index}
                onClick={() =>
                  router.push(`/listings/filtered-listings?type=${item.title}`)
                }
              >
                <MediumCard
                  img={item.img}
                  title={item.title}
                  listings={listings}
                />
              </button>
            ))}
          </div>
        </section>

        {/* Section 3 */}
        <LargeCard
          img="/landscapebanner_2.jpg"
          title="Top Picks"
          description="Our Highest Rated YaadVentures"
          buttonText="Show Me!"
        />
      </main>

      <div className="">
        <Footer />
      </div>
    </div>
  );
}

// Refactored to SSR with getServerSideProps
export async function getServerSideProps() {
  // Create a query to retrieve the ordered documents

  // Get Collection Data
  const fetchedListings = await getDocs(listingsColRef);
  const fetchedUsers = await getDocs(usersColRef);

  // Store Collection Data in Object
  const dataListings = fetchedListings.docs.map((doc) => {
    const data = doc.data();
    // Check if createdAt field exists and is a valid date
    const createdAt =
      data.createdAt && data.createdAt.toDate()
        ? data.createdAt.toDate().toISOString()
        : null;
    const updatedAt =
      data.updatedAt && data.updatedAt.toDate()
        ? data.updatedAt.toDate().toISOString()
        : null;
    return { ...data, id: doc.id, createdAt, updatedAt };
  });

  const dataUsers = fetchedUsers.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });

  // Sort the listings by the createdAt date in descending order
  dataListings.sort((a, b) => {
    // Convert strings to Date objects for accurate comparison
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA; // Sort in descending order
  });

  // Return Collection Data as a Prop for Component
  return {
    props: { listings: dataListings, users: dataUsers },
  };
}
