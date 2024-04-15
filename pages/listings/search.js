import Footer from "@/components/Footer";
import Head from "next/head";
import InfoCard from "@/components/InfoCard";
import { listingsColRef } from "@/firebase/config";
import { getDocs } from "firebase/firestore";
import Link from "next/link";
import CounterField from "@/components/CounterField";
import { useRouter } from "next/router";

const SearchPage = ({ listings }) => {
  const router = useRouter();
  const { term } = router.query;

  const filteredListings = listings.filter((listing) =>
    listing.title.toLowerCase().includes(term)
  );

  return (
    <div className="h-screen">
      {/* convert to 32x32 favicon */}
      <Head>
        <link rel="icon" href="/yvIcon_G.png" />
        <title>{term ? `Search - ${term}` : "Search"}</title>
      </Head>
      <main className="flex">
        <section className="flex-grow pt-14 max-w-7xl mx-auto px-8 sm:px-16">
          <p className="text-xs">{filteredListings.length} Locations Listed </p>

          <h1 className="text-3xl mt-2 mb-6">
            <span className="font-light">Search:</span> <b>{term}</b>
          </h1>

          {/* All Buttons */}
          <div className="flex flex-wrap lg:inline-flex mb-5  sm:space-x-3 text-gray-800 whitespace-nowrap">
            <button
              onClick={() =>
                router.push("/listings/filtered-listings?type=Rivers")
              }
              className="button m-2 text-sm font-medium"
            >
              Rivers{" "}
              <CounterField
                fields={{
                  name: "Type",
                  toCount: "Rivers",
                }}
                listings={listings}
              />
            </button>
            <button
              onClick={() =>
                router.push("/listings/filtered-listings?type=Hikes")
              }
              className="button m-2 text-sm font-medium"
            >
              Hikes{" "}
              <CounterField
                fields={{
                  name: "Type",
                  toCount: "Hikes",
                }}
                listings={listings}
              />
            </button>
            <button
              onClick={() =>
                router.push("/listings/filtered-listings?type=Beaches")
              }
              className="button m-2 text-sm font-medium"
            >
              Beaches{" "}
              <CounterField
                fields={{
                  name: "Type",
                  toCount: "Beaches",
                }}
                listings={listings}
              />
            </button>
            <button
              onClick={() =>
                router.push("/listings/filtered-listings?type=Caves")
              }
              className="button m-2 text-sm font-medium"
            >
              Caves{" "}
              <CounterField
                fields={{
                  name: "Type",
                  toCount: "Caves",
                }}
                listings={listings}
              />
            </button>
            <button
              onClick={() =>
                router.push("/listings/filtered-listings?type=Springs")
              }
              className="button m-2 text-sm font-medium"
            >
              Springs{" "}
              <CounterField
                fields={{
                  name: "Type",
                  toCount: "Springs",
                }}
                listings={listings}
              />
            </button>
            <button
              onClick={() =>
                router.push("/listings/filtered-listings?type=Other")
              }
              className="button m-2 text-sm font-medium"
            >
              Other{" "}
              <CounterField
                fields={{
                  name: "Type",
                  toCount: "Other",
                }}
                listings={listings}
              />
            </button>
          </div>
          <div className="flex flex-col">
            {filteredListings.map(
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

      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default SearchPage;

// Refactored to SSR with getServerSideProps
export async function getServerSideProps() {
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

  // Sort the listings by the createdAt date in descending order
  dataListings.sort((a, b) => {
    // Convert strings to Date objects for accurate comparison
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA; // Sort in descending order
  });

  // Return Collection Data as a Prop for Component
  return {
    props: { listings: dataListings },
  };
}
