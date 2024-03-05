import Image from "next/image";
import {
  MagnifyingGlassIcon,
  GlobeAltIcon,
  UserCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import yvFull_G from "@/public/yvFull_G.png";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

function Header() {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
    // console.log(searchInput);
  };

  const handleSearchSubmit = (event) => {
    // setSearchInput(event.target.value);
    event.preventDefault();
    router.push(
      `/listings/search?term=${encodeURIComponent(searchInput).toLowerCase()}`
    );
    setSearchInput("");
  };

  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
      {/* Left - Logo */}
      <div className="w-28 h-10 cursor-pointer my-auto">
        <Link href="/">
          <Image
            src={yvFull_G}
            // priority
            sizes="500px"
            alt="YaadVentures Logo"
            style={{ objectFit: "contain", objectPosition: "left" }}
          />
        </Link>
      </div>

      {/* Middle - Search */}
      <form
        onSubmit={handleSearchSubmit}
        className="flex items-center border-2 rounded-full py-2 md:shadow-sm"
      >
        <input
          value={searchInput}
          onChange={() => handleSearchChange(event)}
          type="text"
          placeholder="Search"
          className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
        />

        {/* <MagnifyingGlassIcon className="hidden relative sm:right-2 md:right-1 sm:inline-flex h-8 bg-emerald-600 text-white rounded-full p-2 cursor-pointer md:mx-1 hover:scale-105 active:scale-90 transform transition duration-300 ease-out" /> */}
      </form>

      {/* Right - Personal Info */}

      <div className="flex  items-center sm:space-x-4 justify-end text-gray-500">
        <Link
          href={"/listings"}
          className="mr-1 sm:mr-2 flex items-center hover:scale-110 active:scale-100 transition ease-out cursor-pointer"
        >
          <GlobeAltIcon className="sm:mr-2 h-7 sm:h-8 text-emerald-600 " />
          <span className="hidden lg:inline">
            <b className="text-gray-500">All Listings</b>
          </span>
        </Link>
        <p className="cursor-pointer hover:scale-110 active:scale-100 transform transition duration-300 ease-out">
          <Link className="space-x-2 flex items-center" href={"/createListing"}>
            <PlusCircleIcon className="mr-1 sm:mr-0 h-7 sm:h-8 inline text-emerald-600" />
            <span className="hidden lg:inline">
              <b>New Listing</b>
            </span>
          </Link>
        </p>
        <div className="pl-0 sm:pl-2 flex items-center md:border-2 md:p-2 rounded-full cursor-pointer">
          <UserCircleIcon className="h-8 md:h-6" />
        </div>
      </div>
    </header>
  );
}

export default Header;
