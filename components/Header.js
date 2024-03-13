import Image from "next/image";
import {
  GlobeAltIcon,
  UserCircleIcon,
  PlusCircleIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import yvFull_G from "@/public/yvFull_G.png";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Dropdown from "./Dropdown";
import { useSession, signOut } from "next-auth/react";

function Header() {
  const { data: session, status } = useSession();

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null); //Ref for Dropdown

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    signOut();
    // router.push("/login");
  };

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
      </form>

      {/* Right - Personal Info */}

      <div className="flex  items-center sm:space-x-4 justify-end text-gray-500">
        <p className="mr-1 space-x-2 flex items-center">
          <Link
            href={"/listings"}
            className=" hover:scale-110 active:scale-100 transition ease-out cursor-pointer"
          >
            <GlobeAltIcon className=" h-7 sm:h-8 text-emerald-600 " />
          </Link>
          <span className="hidden lg:inline">
            <b className="text-gray-500">All Listings</b>
          </span>
        </p>

        {/* New Listing */}
        <p className="space-x-2 flex items-center">
          <Link
            className=" cursor-pointer hover:scale-110 active:scale-100 transform transition duration-300 ease-out"
            href={"/createListing"}
          >
            <PlusCircleIcon className=" h-7 sm:h-8 inline text-emerald-600" />
          </Link>
          <span className="hidden lg:inline">
            <b>New Listing</b>
          </span>
        </p>

        {/* Login */}
        {status === "unauthenticated" && (
          <Link href={"/login"}>
            <div className=" rounded-full cursor-pointer hover:scale-110  active:scale-95 transition ease-in-out">
              <ArrowLeftOnRectangleIcon className="sm:ml-2  h-8 text-gray-600 hover:text-emerald-600" />
            </div>
          </Link>
        )}
        {/* Log Out */}
        {session && status === "authenticated" && (
          <div className="relative" ref={dropdownRef}>
            <div className="flex items-center">
              <Image
                src={session.user ? session.user.image : ""}
                alt={session.user ? session.user.name : ""}
                width={32} // Example width
                height={32} // Example height
                className="ml-2 md:ml-2 h-6 w-6 sm:h-7 sm:w-7  text-emerald-600 cursor-pointer hover:scale-110 active:scale-95 transition ease-in-out rounded-full"
                onClick={handleDropdownToggle}
              />
              <span className="hidden lg:inline ml-2">
                <b className="text-gray-500">
                  Hi, {session.user.name.split(" ")[0]}!
                </b>
              </span>
            </div>

            <Dropdown
              isVisible={isDropdownVisible}
              setIsVisible={setIsDropdownVisible}
            >
              <Link href={"/profiles/" + session.user.id}>
                <div
                  className="block px-4 py-2 text-sm font-bold text-emerald-600 hover:scale-105 active:scale-95 transition ease-in-out"
                  role="menuitem"
                >
                  <Cog6ToothIcon className="inline pr-3 h-8 text-emerald-600" />
                  Settings
                </div>
              </Link>
              <Link href="/api/auth/signout">
                <div
                  className="block px-4 py-2 text-sm font-bold text-red-600 hover:scale-105 active:scale-95 transition ease-in-out"
                  role="menuitem"
                  onClick={handleLogout}
                >
                  <ArrowRightOnRectangleIcon className="inline pr-3 h-8 text-red-600" />
                  Log Out
                </div>
              </Link>
            </Dropdown>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
