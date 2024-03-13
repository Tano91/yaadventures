import React from "react";
import Head from "next/head";
import Footer from "@/components/Footer";
import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/solid";

const contact = () => {
  return (
    <div className="">
      <Head>
        <link rel="icon" href="/yvIcon_G.png" />
        <title>Yaadventures - Contact</title>
      </Head>

      <main className="max-w-7xl mx-auto sm:px-20 pt-14">
        {/* Phone Section - Emojis? Too Childish? */}
        <div>
          <h1 className="text-4xl font-black text-center mb-20 text-emerald-600">
            CONTACT US
          </h1>
        </div>
        <div className="mb-20">
          <div className="text-4xl mb-4 flex justify-center items-center">
            <PhoneIcon className="h-10 text-emerald-600" />
          </div>
          <div className="text-xl text-center font-bold mb-2">By Phone</div>
          <div className="text-xl text-center text-gray-600">xxx-xxx-xxxx</div>
        </div>
        {/* Email Section - Emojis? Too Childish? */}

        <div className="mb-20">
          <div className="text-4xl mb-4 flex justify-center items-center">
            <EnvelopeIcon className="h-10 text-emerald-600" />
          </div>
          <div className="text-xl text-center font-bold mb-2 ">By Email</div>
          <div className="text-xl text-center text-gray-600">
            santanomccalla@gmail.com
          </div>
        </div>
      </main>
      <div className="fixed bottom-0 left-0 right-0">
        <Footer />
      </div>
    </div>
  );
};
export default contact;
