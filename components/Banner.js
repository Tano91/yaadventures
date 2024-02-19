import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const Banner = () => {
  const router = useRouter();

  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px]xl:h-[600px] 2xl:h-[700px]">
      <Image
        src="/landscapebanner_1.jpg"
        priority
        fill
        alt="Banner Image"
        style={{ objectFit: "cover" }}
        className="brightness-50 contrast-125"
      />

      <div className="absolute top-1/2 w-full text-center">
        <p className="text-lg sm:text-xl text-white">
          Let's find your next YaadVenture!
        </p>

        <button
          onClick={() => router.push("/listings")}
          className="text-white bg-emerald-600 px-10 py-4 shadow-md rounded-full font-bold my-3 hover:shadow-xl hover:bg-emerald-800 hover:scale-105 active:scale-95 transition duration-150"
        >
          Show Listings
        </button>
      </div>
    </div>
  );
};

export default Banner;
