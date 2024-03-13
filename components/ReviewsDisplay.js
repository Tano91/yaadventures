import { useState } from "react";
import {
  StarIcon,
  PaperAirplaneIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import formatDateTime from "./formatDateTime";
import { arrayUnion } from "firebase/firestore";
import { db } from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { arrayRemove, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Image from "next/image";

const ReviewsDisplay = ({ listing, listingState, setListingState }) => {
  const [showFullText, setShowFullText] = useState(
    Array(listingState.yvRatings.length).fill(false)
  );
  const [selectedStar, setSelectedStar] = useState(1);
  const [commentText, setCommentText] = useState("");
  const [allRatings, setAllRatings] = useState(listingState.yvRatings || []);

  const truncatedComment = (fullComment) => {
    if (fullComment.split(" ").length > 30) {
      return fullComment.split(" ").slice(0, 30).join(" ") + " . . . ";
    } else {
      return fullComment;
    }
  };

  const toggleFullText = (index) => {
    const newShowFullText = [...showFullText];
    newShowFullText[index] = !newShowFullText[index];
    setShowFullText(newShowFullText);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session, status } = useSession();

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create a UTC date object using Date.UTC()
    const nowUTC = new Date(
      Date.UTC(
        new Date().getUTCFullYear(),
        new Date().getUTCMonth(),
        new Date().getUTCDate(),
        new Date().getUTCHours(),
        new Date().getUTCMinutes(),
        new Date().getUTCSeconds()
      )
    );

    const formattedUTC = formatDateTime(nowUTC);

    const reviewData = {
      user: {
        username: session?.user.name ? session?.user.name : "Admin",
        image: session?.user.image ? session?.user.image : "",
        userID: session?.user.id ? session?.user.id : "",
      },
      comment: commentText,
      score: selectedStar,
      id: crypto.randomUUID(), // Generate a unique ID here
      createdAt: formattedUTC, // Assign the date object
    };

    const docRef = doc(db, "listings", listingState.id);

    try {
      // Calculate the new average score if there are ratings
      // Calculate the new average score if there are ratings
      let newAverageScore = 0;
      if (listingState.yvRatings.length === 0) {
        // No existing ratings, so the average score is the score of the new review
        newAverageScore = reviewData.score;
      } else {
        // Existing ratings, calculate the new average score
        newAverageScore =
          (listingState.yvRatings.reduce(
            (sum, rating) => sum + rating.score,
            0
          ) +
            reviewData.score) /
          (listingState.yvRatings.length + 1);
      }

      await updateDoc(docRef, {
        yvRatings: arrayUnion(reviewData),
        yvScore: newAverageScore, // Update the average score on the backend
      });

      setListingState((prevState) => ({
        ...prevState,
        yvRatings: [...prevState.yvRatings, reviewData],
        yvScore: newAverageScore,
      }));

      toast.success(`Review Submitted!`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      toast.error(`An error occurred while adding the review!`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setIsSubmitting(false);
    }

    setCommentText(""); // Clear the text field
    setSelectedStar(1); // Reset star selection
  };

  const handleDeleteReview = async (item) => {
    const docRef = doc(db, "listings", listingState.id);

    try {
      // Calculate the new average score if there are ratings left
      let newAverageScore = 0;
      if (listingState.yvRatings.length === 1) {
        // Only one rating left, so after deletion, the average score is  0
        newAverageScore = 0;
      } else {
        // More than one rating, calculate the new average score
        newAverageScore =
          listingState.yvRatings
            .filter((review) => review.id !== item.id)
            .reduce((sum, rating) => sum + rating.score, 0) /
          (listingState.yvRatings.length - 1);
      }

      await updateDoc(docRef, {
        yvRatings: arrayRemove(item),
        yvScore: newAverageScore, // Update the average score on the backend
      });

      setListingState((prevState) => ({
        ...prevState,
        yvRatings: prevState.yvRatings.filter(
          (review) => review.id !== item.id
        ),
        yvScore: newAverageScore,
      }));

      toast.success(`Review Deleted Successfully`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      toast.error(`Error Deleting Review!`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const isSelected = selectedStar !== null && i < selectedStar;
      const starClass = isSelected
        ? "h-8 inline-block text-black pr-3 transform hover:scale-125 transition ease-out cursor-pointer"
        : "h-8 inline-block text-gray-300 pr-3 transform hover:scale-125 transition ease-out cursor-pointer";
      stars.push(
        <StarIcon
          key={i}
          className={starClass}
          onClick={() => handleStarClick(i + 1)}
        />
      );
    }
    return stars;
  };

  const handleStarClick = (starValue) => {
    setSelectedStar(starValue);
  };

  return (
    <div className="pt-5 mb-10 ">
      <p className="flex items-center border-b border-gray-300 pb-5">
        <StarIcon className="h-8 inline-block text-black pr-1" />
        <b className="text-2xl">
          {Math.round(listingState.yvScore * 10) / 10} ·
          <span className="pl-1 cursor-pointer text-2xl ">
            {listingState.yvRatings.length} Reviews
          </span>
        </b>
      </p>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleReviewSubmit}
        className="pb-10 pt-5 border-b  border-gray-300"
      >
        {status === "authenticated" ? generateStars() : null}

        {status === "authenticated" ? (
          <label htmlFor="review" className="flex items-center space-x-3 mt-5">
            <textarea
              type="text"
              className="flex-1 h-36 border border-gray-300 rounded-lg p-4 text-pretty"
              placeholder={
                status !== "authenticated"
                  ? "Sign In to Leave A Review!"
                  : "Type your Review Here!"
              }
              alt="review text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              disabled={status !== "authenticated"}
            />
            <button
              type="submit"
              disabled={isSubmitting || status !== "authenticated"}
              className="disabled:text-gray-300 disabled:pointer-events-none"
            >
              <PaperAirplaneIcon className="h-8 cursor-pointer hover:scale-125 active:scale-90 transform transition duration-300 ease-out " />
            </button>
          </label>
        ) : (
          <div className="mt-5 text-xl font-bold text-red-600">
            Sign In to Leave a Review
          </div>
        )}
      </form>

      {/* Comments Here */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5">
        {/* Comments Map */}
        {listingState.yvRatings.map((rating, index) => (
          <div
            key={rating.id}
            className="w-full min-h-full mt-5 border border-gray-300 rounded-2xl p-5"
          >
            <div className="flex justify-between items-center">
              <p className="flex items-center ">
                {[...Array(5)].map((_, starIndex) => {
                  const score = Math.round(rating.score);
                  const isFilled = starIndex < score;
                  const className = isFilled
                    ? "h-3 inline-block text-black"
                    : "h-3 inline-block text-gray-300";
                  return <StarIcon key={starIndex} className={className} />;
                })}

                <span className="text-lg pl-2"> · </span>
                <span className="text-sm pl-2">
                  {" "}
                  {rating.createdAt ? rating.createdAt : "no date!"}
                </span>
              </p>
              {session?.user.id === rating.user.userID && (
                <TrashIcon
                  className="h-5 text-red-500 cursor-pointer hover:scale-125 active: scale-95 transition ease-out "
                  onClick={() => handleDeleteReview(rating)}
                />
              )}
            </div>
            {showFullText[index] ? (
              <p className="text-justify">{rating.comment}</p>
            ) : (
              <p className="text-justify">{truncatedComment(rating.comment)}</p>
            )}

            {/* Username + Readmore */}
            <div className="flex justify-between">
              {/* Username - Comments */}
              <div className="mt-5 flex items-center">
                <div className="relative w-7 h-7 overflow-hidden bg-gray-400 rounded-full ">
                  <Image
                    src={
                      rating.user.image
                        ? rating.user.image
                        : "/Sample_User_Icon_WC.png"
                    }
                    width={32}
                    height={32}
                    sizes="32px"
                    alt="user profile image"
                  />
                </div>
                <p className="pl-2 text-sm">
                  <b>{rating.user.username}</b>
                </p>
              </div>

              {/* Read More */}
              {rating.comment.split(" ").length > 30 && (
                <button
                  onClick={() => toggleFullText(index)}
                  className="font-bold hover:scale-105  hover:text-emerald-600 transform transition duration-300 ease-out underline pt-5 text-sm"
                >
                  {showFullText[index] ? "Read Less" : "Read More"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsDisplay;
