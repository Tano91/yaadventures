import { useRouter } from "next/router";
import Link from "next/link";
import {
  ArrowLeftOnRectangleIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import Head from "next/head";
import { db } from "../../firebase/config";
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Footer from "@/components/Footer";

// get docRef from passed ID
export async function getServerSideProps(context) {
  const id = context.params.id;
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();

  return {
    props: {
      user: JSON.parse(JSON.stringify({ ...data, id: docRef.id })),
    },
  };
}

function ProfilePage({ user }) {
  const { data: session, status } = useSession();

  //   MAKE PROFILE EDIT PAGE!
  // Delete User
  // Change Name
  // Update Image
  // Delete Image

  return (
    <div>
      <Head>
        <link rel="icon" href="/yvIcon_G.png" />
        <title>Yaadventures - {user?.name}</title>
      </Head>

      <div className="container pt-5 pr-2 pl-2 mx-auto flex flex-col mb-20">
        <div className="container pr-2 pl-2 mx-auto flex flex-col items-center">
          <div className="flex flex-col items-center">
            {status === "authenticated" && user.id === session.user.id ? (
              <>
                <h1 className="text-4xl font-bold text-center mb-10 ">
                  User Profile
                </h1>
                <h1 className="text-lg mb-4 text-center">
                  <em className="text-gray-500 ">User Name:</em>{" "}
                  <p className="font-bold ">{user.name}</p>
                </h1>
                <h1 className="text-lg mb-4 text-center">
                  <em className="text-gray-500 ">Email:</em>{" "}
                  <p className="font-bold ">{user.email}</p>
                </h1>{" "}
                <h1 className="text-lg mb-4 text-center">
                  <em className="text-gray-500 ">Profile Image:</em>
                </h1>
                <Image
                  src={user.image}
                  alt="pofile image"
                  sizes="100px"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
              </>
            ) : (
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold text-center text-emerald-600 mb-10">
                  Please Log In to Continue!
                </h1>
                <Link href={"/login"}>
                  <div className=" rounded-full cursor-pointer hover:scale-110  active:scale-95 transition ease-in-out">
                    <ArrowLeftOnRectangleIcon className="sm:ml-2  h-12 text-gray-600 hover:text-emerald-600" />
                  </div>
                </Link>
              </div>
            )}
          </div>
          <div className="mt-10 flex space-x-20">
            <p className="flex flex-col justify-center items-center text-orange-500 cursor-pointer hover:text-orange-600 hover:scale-110 transform transition duration-300 ease-out">
              <PencilSquareIcon className="h-8 " />
              <p className="font-bold">Edit Profile</p>
            </p>
            <p className="flex flex-col justify-center items-center text-red-600 cursor-pointer hover:text-red-700 hover:scale-110 transform transition duration-300 ease-out">
              <TrashIcon className="h-8 " />
              <p className="font-bold">Delete Profile</p>
            </p>
          </div>
        </div>
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
}

export default ProfilePage;
