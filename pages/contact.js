import React from "react";
import Head from "next/head";
import Footer from "@/components/Footer";

const contact = () => {
  return (
    <div className="">
      <Head>
        <link rel="icon" href="/yvIcon_G.png" />
        <title>Yaadventures - Contact</title>
      </Head>

      <main className="max-w-7xl mx-auto px-32 sm:px-20 pt-14">
        {/* Phone Section - Emojis? Too Childish? */}
        <div>
          <h1 className="text-4xl font-black text-center mb-20">CONTACT US</h1>
        </div>
        <div className="mb-20">
          <div className="text-4xl text-center mb-4">📞</div>
          <div className="text-xl text-center font-bold mb-2">By Phone</div>
          <div className="text-xl text-center text-gray-600">xxx-xxx-xxxx</div>
        </div>
        {/* Email Section - Emojis? Too Childish? */}

        <div className="mb-20">
          <div className="text-4xl text-center mb-4">📧</div>
          <div className="text-xl text-center font-bold mb-2 ">By Email</div>
          <div className="text-xl text-center text-gray-600">
            santanomccalla@gmail.com
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default contact;
