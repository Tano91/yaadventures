import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { db } from "../../firebase/config";
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import formatDateTime from "@/components/formatDateTime";
import { toast } from "react-toastify";
import { useState } from "react";
import ImageDisplay from "@/components/ImageDisplay";
import { StarIcon, HeartIcon } from "@heroicons/react/24/solid";

export async function getServerSideProps(context) {
  const id = context.params.id;
  const docRef = doc(db, "listings", id);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();

  // Convert Firebase Server Timestamp to a serializable format
  const createdAt =
    data.createdAt && data.createdAt.toDate()
      ? formatDateTime(data.createdAt.toDate().toISOString())
      : null;
  const updatedAt =
    data.updatedAt && data.updatedAt.toDate()
      ? formatDateTime(data.updatedAt.toDate().toISOString())
      : null;

  //grab users
  // const fetchedUsers = await getDocs(usersColRef);
  // const dataUsers = fetchedUsers.docs.map((doc) => {
  //     return { ...doc.data(), id: doc.id };
  //   });

  return {
    props: {
      listing: { ...data, id: docRef.id, createdAt, updatedAt },
      // users:{...dataUsers}
    },
  };
}

const listingDetails = ({ listing }) => {
  const typeStr = (type) => {
    if (type === "Rivers") {
      return "River";
    } else if (type === "Hikes") {
      return "Hike";
    } else if (type === "Beaches") {
      return "Beach";
    } else if (type === "Caves") {
      return "Cave";
    } else if (type === "Springs") {
      return "Spring";
    } else {
      return "Other";
    }
  };
  return (
    <>
      <Head>
        <link rel="icon" href="/yvIcon_G.png" />
        <title>Yaadventures - {listing.title}</title>
      </Head>

      <div className="container pt-5 pr-2 pl-2 mx-auto flex flex-col">
        <div className="container pr-2 pl-2 mx-auto flex flex-col items-center">
          <div className="w-full">
            <ImageDisplay images={listing.images} />
          </div>
        </div>
        {/* Title Section */}
        <div className="pl-2 pt-5 pb-5 border-b border-gray-300">
          <h1 className="text-3xl leadng-none font-bold">{listing.title}</h1>
          <p className="">
            {listing.address}, {listing.parish}
          </p>
          <p className="">
            <em>{typeStr(listing.type)}</em>{" "}
          </p>
          <p className="flex items-center">
            <StarIcon className="h-4 inline-block text-black pr-1" />
            <b>
              {listing.yvScore} ·
              <u className="pl-1 cursor-pointer">
                {listing.yvRatings.length} Reviews
              </u>
            </b>
          </p>
        </div>

        {/* User */}

        <div className="mt-5 flex items-center pb-5 ">
          <div className="relative w-10 h-10 overflow-hidden bg-gray-400 rounded-full ">
            <svg
              className="absolute w-12 h-12 text-gray-200 -left-1"
              fillRule="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <p className="pl-3">
            <b>{listing.yvUser}</b>
          </p>
        </div>

        {/* Description */}
        <div className="pt-5 pb-5 border-b border-gray-300">
          <p className="text-gray-500 italic text-sm">{listing.description}</p>
        </div>

        {/* Reviews Section */}
        <section className="pt-5 pb-5 border-b border-gray-300">
          <p className="flex items-center">
            <StarIcon className="h-8 inline-block text-black pr-1" />
            <b className="text-2xl">
              {listing.yvScore} ·
              <span className="pl-1 cursor-pointer text-2xl">
                {listing.yvRatings.length} Reviews
              </span>
            </b>
          </p>
          <div className="mt-5 border border-gray-300 rounded-2xl p-5">
            <p className="flex items-center">
              <StarIcon className="h-3 inline-block text-black" />
              <StarIcon className="h-3 inline-block text-black" />
              <StarIcon className="h-3 inline-block text-black" />
              <StarIcon className="h-3 inline-block text-black" />
              <StarIcon className="h-3 inline-block text-gray-300" />
              <span className="text-lg pl-2"> · </span>
              <span className="text-sm pl-2"> 2 weeks ago</span>
            </p>
            <p>
              The place is definitely a hidden gem! I love this place! I can't
              believe how great it is! You really should go!
            </p>
            {/* Username */}
            <div className="mt-5 flex items-center">
              <div className="relative w-7 h-7 overflow-hidden bg-gray-400 rounded-full ">
                <svg
                  className="absolute w-9 h-9 text-gray-200 -left-1"
                  fillRule="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <p className="pl-2 text-sm">
                <b>{listing.yvUser}</b>
              </p>
            </div>
          </div>
          <div className="mt-5 border border-gray-300 rounded-2xl p-5">
            <p className="flex items-center">
              <StarIcon className="h-3 inline-block text-black" />
              <StarIcon className="h-3 inline-block text-black" />
              <StarIcon className="h-3 inline-block text-black" />
              <StarIcon className="h-3 inline-block text-black" />
              <StarIcon className="h-3 inline-block text-gray-300" />
              <span className="text-lg pl-2"> · </span>
              <span className="text-sm pl-2"> 2 weeks ago</span>
            </p>
            <p>
              The place is definitely a hidden gem! I love this place! I can't
              believe how great it is! You really should go!
            </p>
            {/* Username */}
            <div className="mt-5 flex items-center">
              <div className="relative w-7 h-7 overflow-hidden bg-gray-400 rounded-full ">
                <svg
                  className="absolute w-9 h-9 text-gray-200 -left-1"
                  fillRule="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <p className="pl-2 text-sm">
                <b>{listing.yvUser}</b>
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default listingDetails;
