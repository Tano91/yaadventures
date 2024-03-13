import React from "react";
import Head from "next/head";
import Footer from "@/components/Footer";

const about = () => {
  return (
    <div className="">
      <Head>
        <link rel="icon" href="/yvIcon_G.png" />
        <title>Yaadventures - About</title>
      </Head>

      <main className="max-w-7xl mx-auto sm:px-20 pt-14">
        <div>
          <h1 className="text-4xl font-black text-center mb-20">ABOUT</h1>
        </div>
        <div className="border-l-4 border-r-4 border-gray-200 pl-12 pr-12">
          <span className="text-2xl">🌟</span>
          <span className="pl-2 underline decoration-8 decoration-yellow-300 underline-offset-8 font-bold text-2xl">
            Our Mission:
          </span>
          <p className="mt-5 text-gray-600 text-justify">
            Showcasing the beauty and variety of Jamaica is our greatest passion
            and goal. To this end, we galvanize our users to explore, discover
            and display hidden gens, popular attractions and interesting areas
            that illustrate the beauty of our island.
          </p>
        </div>
        <div className="mt-20 border-l-4 border-r-4 border-gray-200 pl-12 pr-12">
          <span className="text-2xl">🔎</span>
          <span className="pl-2 underline decoration-8 decoration-blue-400 underline-offset-8 font-bold text-2xl">
            Our History:
          </span>
          <p className="mt-5 text-gray-600 text-justify">
            Though we are a new platform, we are locals who have a lifetime of
            history with local adventures!
          </p>
        </div>

        <div className="mt-20 border-l-4 border-r-4 border-gray-200 pl-12 pr-12">
          <span className="text-2xl">🌱 </span>
          <span className="pl-2 underline decoration-8 decoration-green-400 underline-offset-8 font-bold text-2xl">
            Our Values:
          </span>
          <p className="mt-5 text-gray-600 text-justify">
            To avheive our goals, we value the saftey of our users, their
            satisfactioin, and the highest quality user experience we can
            provide. These values guide our decisions and shape our approach to
            everything we do.
          </p>
        </div>

        <div className="mt-20 border-l-4 border-r-4 border-gray-200 pl-12 pr-12">
          <span className="text-2xl">🚀</span>
          <span className="pl-2 underline decoration-8 decoration-red-400 underline-offset-8 font-bold text-2xl">
            What's Next:
          </span>
          <p className="mt-5  text-gray-600 text-justify">
            We are excited to expand our platform to better serve our vision
            users! Our next step is to incorporate a map that can help guide our
            users to their next YaadVenture! We look forward to continuing to
            bring value to our users and make a positive impact in our tiny, but
            beautiful island!
          </p>
        </div>
        <p className="italic text-center font-bold mb-20 mt-20">
          " Any adventure is welcome, as long as it is a Yaadventure! "
        </p>
      </main>
      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default about;
