import Image from "next/image";
import React from "react";
import { useState } from "react";
import { StarIcon, HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useId } from "react-id-generator";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";

const InfoCard = React.memo(
  ({
    index,
    type,
    title,
    description,
    price,
    images,
    parish,
    yvScore,
    yvFavourited,
  }) => {
    /*
  Grab logged in user
  Push username To yvFavourited array & update doc with username
  FOR DISPLAY:
  If username is in array, render HeartIconSolid
  disable if unauthenticated
  */

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

    const [favourited, setFavourited] = useState(false);

    const handleArrowClick = (event) => {
      event.preventDefault();
    };

    return (
      <div className="sm:rounded-2xl flex flex-col sm:flex-row py-7  cursor-pointer hover:bg-emerald-50 hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t">
        <div className="relative h-60 w-80 ml-1 sm:ml-0 flex-shrink-0">
          <Carousel
            swipeable={true}
            showThumbs={false}
            axis="horizontal"
            showStatus={false}
            className="relative"
            renderArrowPrev={(clickHandler, hasPrev) => (
              <div
                className={`${
                  hasPrev ? "absolute" : "hidden"
                } top-0 bottom-0 left-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20`}
                onClick={(event) => {
                  handleArrowClick(event);
                  clickHandler();
                }}
              >
                <ArrowLeftCircleIcon className="w-9 h-9 text-white" />
              </div>
            )}
            renderArrowNext={(clickHandler, hasNext) => (
              <div
                className={`${
                  hasNext ? "absolute" : "hidden"
                } top-0 bottom-0 right-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20`}
                onClick={(event) => {
                  handleArrowClick(event);
                  clickHandler();
                }}
              >
                <ArrowRightCircleIcon className="w-9 h-9 text-white" />
              </div>
            )}
          >
            {/* Carousel Items */}

            {images.map((img) => (
              <div key={useId()} className="h-60 md:max-w-30 object-scale-down">
                <img
                  className="rounded-2xl"
                  src={img}
                  style={{
                    width: "100%",
                    height: "100%",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "cover",
                  }}
                  alt={`${title} - Image`}
                />
              </div>
            ))}
          </Carousel>
        </div>

        <div className="flex flex-col flex-grow pl-5 sm:pt-0 pt-3">
          <div className="flex justify-between">
            <p className="text-gray-500">
              {typeStr(type)} in {parish}
            </p>
            {/* If username is in array, render HeartIconSolid */}
            <div>
              {favourited === true ? (
                <HeartIcon className="text-red-600 h-6" />
              ) : (
                <HeartIconOutline className="h-6" />
              )}
            </div>
          </div>

          <h4 className="text-xl">{title}</h4>
          <div className="border-b w-10 pt-2" />
          <p className="pt-2 text-sm text-gray-500 flex-grow">{description}</p>
          <div className="flex justify-between items-end pt-5">
            <p className="flex items-center">
              <StarIcon className="h-5 text-emerald-600" />
              {Math.round(yvScore * 10) / 10}
            </p>

            <div className="">
              <p className="text-lg lg:text-2xl font-semibold pb-2">${price}</p>
              <p className="text-right font-extralight">JMD</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default InfoCard;
