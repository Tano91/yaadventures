import Image from "next/image"
import { 
  MagnifyingGlassIcon,
  Bars3Icon,
  UserCircleIcon,
  PlusCircleIcon
  } from '@heroicons/react/24/solid'
import yvFull_G from '@/public/yvFull_G.png'
import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

function Header() {
  const [searchInput, setSearchInput] = useState('')
  
  const router = useRouter()

  return (
    <header className="sticky to-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">

      {/* Left - Logo */}
      <div
      onClick={ ()=>router.push('/') } 
      className="relative flex items-center h-10 cursor-pointer my-auto">
        <Image
          src={yvFull_G}
          priority
          fill
          sizes="500px"
          alt="YaadVentures Logo"
          style={{objectFit: "contain", objectPosition:"left"}}	
        />
      </div>

      {/* Middle - Search */}
      <div className="flex items-center border-2 rounded-full py-2 md:shadow-sm">

        <input 
        value={searchInput}
        onChange={(e)=> setSearchInput(e.target.value)}
        type="text" 
        placeholder="Search"
        className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"/>

        <MagnifyingGlassIcon className="hidden lg:inline-flex h-8 bg-emerald-500 text-white rounded-full p-2 cursor-pointer md:mx-1 hover:scale-105 active:scale-90 transform transition duration-300 ease-out"/>
      </div> 

      {/* Right - Personal Info */}

      <div className="flex items-center space-x-4 justify-end text-gray-500">
        <p className="cursor-pointer hover:scale-105 active:scale-90 transform transition duration-300 ease-out">
          <Link className="space-x-2" href={'/createListing'}>
          <PlusCircleIcon className="h-8 inline text-emerald-500" />
          <span 
          className="hidden lg:inline"> 
            <b>New YaadVenture</b>
          </span>
          </Link>
        </p>
        <div className="flex items-center space-x-2 border-2 p-2 rounded-full cursor-pointer">

          <UserCircleIcon className="h-6"/>
        </div>
      </div>
    </header>

    
  )
}

export default Header
