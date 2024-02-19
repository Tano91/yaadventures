import Image from "next/image";
import CounterField from "./CounterField";

const MediumCard = ({ img, title, listings }) => {
  return (
    <div className="cursor-pointer hover:scale-105 active:scale-95 transform transition duration-300 ease-out">
      <div className="relative h-80 w-80">
        <Image
          className="rounded-2xl"
          src={img}
          fill
          sizes="500px"
          alt="Adventures Image"
        />
      </div>

      <h3 className="text-xl font-bold mt-3">
        {title}{" "}
        <CounterField
          fields={{
            name: "Type",
            toCount: title,
          }}
          listings={listings}
        />
      </h3>
    </div>
  );
};

export default MediumCard;
