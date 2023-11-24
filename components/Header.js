import Image from "next/image"
import { 
  MagnifyingGlassIcon,
  GlobeAltIcon,
  Bars3Icon,
  UserCircleIcon
  } from '@heroicons/react/24/solid'
import yvFull_G from '@/public/yvFull_G.png'

function Header() {
  return (
    <header className="sticky to-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">

      {/* Left - Logo */}
      <div className="relative flex items-center h-10 cursor-pointer my-auto">
        <Image
          src={yvFull_G}
          fill
          alt="YaadVentures Logo"
          style={{objectFit: "contain", objectPosition:"left"}}	
        />
      </div>

      {/* Middle - Search */}
      <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
        <input type="text" placeholder="Search YaadVentures"className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"/>
        <MagnifyingGlassIcon className="hidden md:inline-flex h-8 bg-emerald-500 text-white rounded-full p-2 cursor-pointer md:mx-2"/>
      </div> 

      {/* Right - Personal Info */}

      <div className="flex items-center space-x-4 justify-end text-gray-500">
        <p className="hidden md:inline cursor-pointer">Host a YaadVenture</p>
        <GlobeAltIcon className="h-6 cursor-pointer"/>

        <div className="flex items-center space-x-2 border-2 p-2 rounded-full cursor-pointer">
          <Bars3Icon className="h-6"/>
          <UserCircleIcon className="h-6"/>
        </div>
      </div>
    </header>

    
  )
}

export default Header
