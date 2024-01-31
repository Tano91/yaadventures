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
import { StarIcon } from "@heroicons/react/24/solid";
import ImageDisplay from "@/components/ImageDisplay";
import ReviewsDisplay from "@/components/ReviewsDisplay";

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
      listing: JSON.parse(
        JSON.stringify({ ...data, id: docRef.id, createdAt, updatedAt })
      ),
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
      {/* <Head>
        <link rel="icon" href="/yvIcon_G.png" />
        <title>Yaadventures - {listing.title}</title>
      </Head> */}

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

        <ReviewsDisplay listing={listing} />
      </div>
    </>
  );
};

export default listingDetails;
