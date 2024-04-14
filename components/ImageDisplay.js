import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";

const ImageGrid = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Get the count of images
  const imageCount = images.length;

  return (
    <div className="flex flex-col md:flex-row overflow-hidden max-h-[500px]">
      {/* Main Image Logic */}
      <div
        className={`relative w-full md:w-1/2 max-h-[400px] md:max-h-[500px]  ${
          imageCount > 1
            ? "rounded-3xl md:rounded-none md:rounded-l-3xl overflow-hidden md:mr-3"
            : "rounded-3xl overflow-hidden "
        }`}
      >
        <Image
          src={images[currentIndex]}
          alt={`Image ${currentIndex}`}
          width={500}
          height={500}
          style={{ objectFit: "cover", height: "auto", width: "100%" }}
          sizes="450px"
          priority
          className=""
        />
        {/* Render Buttons Conditionally */}
        {imageCount > 1 && (
          <div
            className={`absolute top-10 bottom-10 left-0  items-center w-full p-2 z-10 flex  ${
              currentIndex === 0 ? " justify-end" : " justify-between"
            }`}
          >
            <button
              disabled={currentIndex === 0}
              onClick={handleBack}
              className="md:hidden disabled:hidden   text-white hover:scale-1110 active:scale-90 transform transition duration-300 ease-out"
            >
              <ArrowLeftCircleIcon className="h-8" />
            </button>
            <button
              disabled={currentIndex === images.length - 1}
              onClick={handleNext}
              className="md:hidden disabled:hidden text-white hover:scale-110 active:scale-90 transform transition duration-300 ease-out"
            >
              <ArrowRightCircleIcon className="h-8 " />
            </button>
          </div>
        )}
      </div>

      {/* Only render this div if there are more than one images */}
      {imageCount > 1 && (
        <div
          className={`grid ${
            imageCount === 2 ? "grid-cols-1 gap-3" : "grid-cols-2 gap-3"
          }`}
        >
          {images
            .filter((_, index) => index !== currentIndex)
            .slice(0, 4)
            .map((image, index) => (
              <div key={index} className={`w-full h-full hidden md:inline`}>
                <Image
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index}`}
                  width={500}
                  height={500}
                  style={{ objectFit: "cover", height: "100%", width: "auto" }}
                  sizes="450px"
                  priority
                  className={`w-full h-full hidden md:inline  ${
                    index === 1 || imageCount === 2
                      ? "md:rounded-r-3xl overflow-hidden "
                      : ""
                  }`}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ImageGrid;
