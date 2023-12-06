import Image from "next/image"

const LargeCard = ({ img, title, description, buttonText}) => {
  return (
    <section className="relative py-16 cursor-pointer">
        <div className="relative h-96 min-w-[300px]">
        <Image
        className="brightness-50 rounded-2xl contrast-125"
            src={img}
            priority
            fill     
            sizes="500px"
            style={{objectFit: 'cover'}}
            alt="Top Rated Image"
        />
        </div>

        <div className="absolute top-32 left-12">
            <h3 className="text-white text-4xl mb-3 w-64">{title}</h3>
            <p className="text-white">{description}</p>
            <button className="text-white text-sm bg-emerald-600 px-4 py-2 rounded-lg mt-5 hover:bg-emerald-800 hover:scale-105 active:scale-90  transform transition duration-300 ease-out">{buttonText}</button>

        </div>
    </section>
  )
}

export default LargeCard