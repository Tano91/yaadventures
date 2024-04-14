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
import { StarIcon, HeartIcon } from "@heroicons/react/24/solid";
import {
  PencilSquareIcon,
  HeartIcon as HeartIconOutline,
} from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";
import ImageDisplay from "@/components/ImageDisplay";
import ReviewsDisplay from "@/components/ReviewsDisplay";
import DeleteConfirmModal from "@/components/DeleteConfirmModal ";
import axios from "axios";
import Footer from "@/components/Footer";
import { useSession } from "next-auth/react";

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

  return {
    props: {
      listing: JSON.parse(
        JSON.stringify({ ...data, id: docRef.id, createdAt, updatedAt })
      ),
    },
  };
}

const listingDetails = ({ listing }) => {
  const [listingState, setListingState] = useState(listing);
  const [favourited, setFavourited] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  // console.log(session);

  const handleReviewClick = () => {
    document
      .getElementById("reviews-section")
      .scrollIntoView({ behavior: "smooth" });
  };

  const handleFavourite = (event) => {
    event.preventDefault();
    if (favourited === false) {
      setFavourited(true);
    } else {
      setFavourited(false);
    }
  };

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

  const handleEditListing = () => {};

  const regex = /yaadventures[\s\S]*?(?=\.)/;
  const getPublicIdFromUrl = (url) => {
    const match = url.match(regex);
    return match ? match[0] : null;
  };

  //Delete Logic
  const handleDeleteListing = async (item) => {
    // Delete images from Cloudinary if needed
    // Add public ID stuff here
    // Loop through and delete each
    if (listingState.images.length > 0) {
      for (let e = 0; e < listingState.images.length; e++) {
        const publicId = getPublicIdFromUrl(listingState.images[e]);

        try {
          const response = await axios.delete("/api/deleteImage", {
            data: {
              publicId: publicId,
            },
          });

          if (response.status === 200) {
            toast.success(`Image ${e} deleted successfully!`, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
        } catch (error) {
          toast.error(`Could Not Delete Image ${e}! Try Again!`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

          console.error("Error deleting image:", error);
          return;
        }
      }
    }

    await deleteDoc(doc(db, "listings", item))
      .then(() => {
        toast.success(`Listing Deleted!`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        router.push("/listings");
      })
      .catch((error) => {
        toast.error(`There was an error Deleting the Listing!`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.log(error);
      });
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/yvIcon_G.png" />
        <title>
          {listingState.title
            ? `YaadVentures - ${listingState.title}`
            : "YaadVentures"}
        </title>
      </Head>

      <div className="container pt-5 pr-8 pl-8 mx-auto flex flex-col mb-10">
        {/* Image Section */}
        <div className="container pr-5 pl-2 mx-auto flex flex-col items-center">
          <div className="w-full">
            <ImageDisplay images={listingState.images} />
          </div>
        </div>
        {/* Title Section */}
        <div className="pl-2 pt-5 pb-5 border-b border-gray-300">
          <div className="flex items-end justify-between">
            <h1 className="text-3xl leadng-none font-bold">
              {listingState.title}
            </h1>
            {/* Heart Icon */}
            <div onClick={handleFavourite}>
              {favourited === true ? (
                <HeartIcon className="text-emerald-600 h-6 mr-2 cursor-pointer hover:scale-125 transform transition duration-300 ease-out" />
              ) : (
                <HeartIconOutline className="h-6 mr-2 cursor-pointer hover:text-emerald-600 hover:scale-125 transform transition duration-300 ease-out" />
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mt-1">
            <p className="">
              {listingState.address}, {listingState.parish}
            </p>
            {/* Edit Icon */}

            {session?.user?.id === listingState.yvUser.id ? (
              <Link href={"/listings/edit/" + listingState.id}>
                <PencilSquareIcon
                  onClick={handleEditListing}
                  className="h-6 mr-2 text-black cursor-pointer hover:text-orange-500 hover:scale-125 transform transition duration-300 ease-out"
                />
              </Link>
            ) : (
              <PencilSquareIcon
                onClick={handleEditListing}
                className="h-6 mr-2 text-gray-300"
              />
            )}
          </div>

          <div className="flex items-center justify-between mt-2">
            <p className="">
              <em>{typeStr(listingState.type)}</em>{" "}
            </p>
            {/* Delete Icon */}
            {session?.user?.id === listingState.yvUser.id ? (
              <DeleteConfirmModal
                onConfirm={() => handleDeleteListing(listingState.id)}
              ></DeleteConfirmModal>
            ) : (
              <TrashIcon className="h-6 mr-2.5 text-gray-300" />
            )}
          </div>
          <p className="flex items-center mt-3">
            <StarIcon className="h-4 inline-block text-black pr-1" />
            <b>
              {Math.round(listingState.yvScore * 10) / 10} ·
              <u className="pl-1 cursor-pointer" onClick={handleReviewClick}>
                {listingState.yvRatings.length} Reviews
              </u>
            </b>
          </p>
        </div>

        {/* User */}

        <div className="mt-5 flex items-center pb-5 ">
          <div className="relative w-10 h-10 overflow-hidden bg-gray-400 rounded-full ">
            <Image
              src={
                listingState.yvUser.image
                  ? listingState.yvUser.image
                  : "/Sample_User_Icon_WC.png"
              }
              width={64}
              height={64}
              sizes="64px"
              alt="user profile image"
            />
          </div>
          <p className="pl-3">
            <b>{listingState.yvUser.name}</b>
          </p>
        </div>

        {/* Description */}
        <div className="pt-5 pb-5 border-b border-gray-300">
          <p className="text-gray-500 italic text-sm">
            {listingState.description}
          </p>
        </div>

        {/* Reviews Section */}

        <div id="reviews-section">
          <ReviewsDisplay
            listing={listing}
            listingState={listingState}
            setListingState={setListingState}
          />
        </div>
      </div>
      <div className="">
        <Footer />
      </div>
    </>
  );
};

export default listingDetails;
