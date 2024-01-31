import { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import formatDateTime from "./formatDateTime";
import { useId } from "react-id-generator";

const ReviewsDisplay = ({ listing }) => {
  const [showFullText, setShowFullText] = useState(
    Array(listing.yvRatings.length).fill(false)
  );

  const truncatedComment = (fullComment) => {
    return fullComment.split(" ").slice(0, 30).join(" ");
  };

  const toggleFullText = (index) => {
    const newShowFullText = [...showFullText];
    newShowFullText[index] = !newShowFullText[index];
    setShowFullText(newShowFullText);
  };

  return (
    <div className="pt-5 mb-10 ">
      <p className="flex items-center">
        <StarIcon className="h-8 inline-block text-black pr-1" />
        <b className="text-2xl">
          {listing.yvScore} ·
          <span className="pl-1 cursor-pointer text-2xl">
            {listing.yvRatings.length} Reviews
          </span>
        </b>
      </p>

      {/* Comments Here */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Comments Map */}
        {listing.yvRatings.map((rating, index) => (
          <div
            key={useId()}
            className="w-full min-h-full mt-5 border border-gray-300 rounded-2xl p-5"
          >
            <p className="flex items-center ">
              <StarIcon className="h-3 inline-block text-black" />
              <StarIcon className="h-3 inline-block text-black" />
              <StarIcon className="h-3 inline-block text-black" />
              <StarIcon className="h-3 inline-block text-black" />
              <StarIcon className="h-3 inline-block text-gray-300" />
              <span className="text-lg pl-2"> · </span>
              <span className="text-sm pl-2">
                {" "}
                {formatDateTime(
                  new Date(
                    rating.createdAt.seconds * 1000 +
                      rating.createdAt.nanoseconds / 1e6
                  )
                )}
              </span>
            </p>
            {showFullText[index] ? (
              <p className="text-justify">{rating.comment}</p>
            ) : (
              <p>{truncatedComment(rating.comment)}</p>
            )}

            {/* Username + Readmore */}
            <div className="flex justify-between">
              {/* Username - Comments */}
              <div className="mt-5 flex items-center">
                <div className="relative w-7 h-7 overflow-hidden bg-gray-400 rounded-full ">
                  <svg
                    className="absolute w-9 h-9 text-gray-200 -left-1"
                    fillRule="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <p className="pl-2 text-sm">
                  <b>{listing.yvUser}</b>
                </p>
              </div>

              {/* Read More */}
              <button
                onClick={() => toggleFullText(index)}
                className="font-bold underline pt-5 text-sm"
              >
                {showFullText[index] ? "Read Less" : "Read More"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsDisplay;
