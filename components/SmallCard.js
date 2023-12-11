import Image from "next/image"

// Change this to be highest rated Ventures or by Parish

const SmallCard = ({img, parish, listings}) => {
  return (
    <div className="flex items-center m-2 mt-5 space-x-4 rounded-xl cursor-pointer hover:bg-emerald-50 hover:scale-105 transition transform duration-200 ease-out">

        {/* Left */}
        <div className="relative h-16 w-16">
            <Image
            className="rounded-lg"
            src={img}
            fill
            sizes="100px"
            alt="Parish Image"
            />
        </div>
        {/* Right */}

        <div>
            <h2><b>{parish}</b> </h2>
            <h3 className="text-sm">
              <b>{listings}</b> Listings</h3>
        </div>
        
    </div>
  )
}

export default SmallCard

// 1:27:29