import Footer from "@/components/Footer";
import Head from "next/head";
import InfoCard from "@/components/InfoCard";
import { listingsColRef } from "@/firebase/config";
import { getDocs } from "firebase/firestore";
import Link from "next/link";
import CounterField from "@/components/CounterField";

const listings = ({ listings }) => {
  return (
    <div className="h-screen">
      {/* convert to 32x32 favicon */}
      <Head>
        <link rel="icon" href="/yvIcon_G.png" />
        <title>Yaadventures - All Listings</title>
      </Head>
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">{listings.length} Locations Listed </p>

          <h1 className="text-3xl font-semibold mt-2 mb-6">All Listings</h1>

          <div className="flex flex-wrap lg:inline-flex mb-5  sm:space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button m-2 text-sm font-medium">
              Rivers{" "}
              <CounterField
                fields={{
                  name: "Type",
                  toCount: "Rivers",
                }}
                listings={listings}
              />
            </p>
            <p className="button m-2 text-sm font-medium">
              Hikes{" "}
              <CounterField
                fields={{
                  name: "Type",
                  toCount: "Hikes",
                }}
                listings={listings}
              />
            </p>
            <p className="button m-2 text-sm font-medium">
              Beaches{" "}
              <CounterField
                fields={{
                  name: "Type",
                  toCount: "Beaches",
                }}
                listings={listings}
              />
            </p>
            <p className="button m-2 text-sm font-medium">
              Caves{" "}
              <CounterField
                fields={{
                  name: "Type",
                  toCount: "Caves",
                }}
                listings={listings}
              />
            </p>
            <p className="button m-2 text-sm font-medium">
              Springs{" "}
              <CounterField
                fields={{
                  name: "Type",
                  toCount: "Springs",
                }}
                listings={listings}
              />
            </p>
            <p className="button m-2 text-sm font-medium">
              Other{" "}
              <CounterField
                fields={{
                  name: "Type",
                  toCount: "Other",
                }}
                listings={listings}
              />
            </p>
          </div>

          <div className="flex flex-col">
            {listings.map(
              ({
                id,
                type,
                title,
                description,
                price,
                address,
                parish,
                images,
                yvFavourited,
                yvScore,
                yvUser,
                createdAt,
              }) => (
                <Link href={"/listings/" + id} key={id}>
                  <InfoCard
                    key={id}
                    id={id}
                    type={type}
                    title={title}
                    description={description}
                    price={price}
                    address={address}
                    parish={parish}
                    images={images}
                    yvScore={yvScore}
                    yvFavourited={yvFavourited}
                    yvUser={yvUser}
                    createdAt={createdAt}
                  />
                </Link>
              )
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default listings;

//ISR Revalidate Incrementally with updated data on new request
export async function getStaticProps() {
  // Create a query to retrieve the ordered documents

  // Get Collection Data
  const fetchedListings = await getDocs(listingsColRef);
  // const fetchedUsers = await getDocs(usersColRef);

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

  // const dataUsers = fetchedUsers.docs.map((doc) => {
  //   return { ...doc.data(), id: doc.id };
  // });

  // Return Collection Data as a Prop for Component
  return {
    props: { listings: dataListings },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 2 seconds
    revalidate: 2,
  };
}
