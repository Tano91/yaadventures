import Image from "next/image";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";

//Allow For Displaying Images
//Allow For Adding Images as long as it is still less than 3 minus number of images
//Allow for deleting of images on x click

function ImageUploadEdit({
  errors,
  selectedFiles,
  setSelectedFiles,
  setIsImageUploadValid,
  imageUrls,
  setImageUrls,
  toBeDeleted,
  setToBeDeleted,
  existingImages,
  setExistingImages,
}) {
  const handleFileChange = (event) => {
    // new Files added are stored here
    let newFiles = Array.from(event.target.files);

    //Get a count of existingImages and new Images
    let totalFiles =
      existingImages.length + selectedFiles.length + newFiles.length;

    // Check if the number of total selected files is less than 3 and append new files if it is
    if (totalFiles <= 3) {
      // Append new files to the existing ones
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
      setIsImageUploadValid(true); // Update isImageUploadValid to true

      // Generate URLs for new files and append them to the existing ones
      let newUrls = newFiles.map((file) => URL.createObjectURL(file));
      setImageUrls((prevUrls) => [...prevUrls, ...newUrls]);
    } else {
      // Prevent the selection of additional files
      toast.error(`You Can Only Select 3 Images!`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      event.target.value = "";
      return;
    }
  };

  const handleDelete = (url) => {
    //Copy the current state array
    const updatedExistedImages = [...existingImages];
    // Filter out the item
    const newExistingImages = updatedExistedImages.filter(
      (image) => image !== url
    );
    // Update the state with the new array
    setExistingImages(newExistingImages);

    setToBeDeleted((prevToBeDelete) => [...prevToBeDelete, url]);
  };

  const handleRestore = (url) => {
    //Get a count of existingImages and new Images
    let totalFiles = existingImages.length + selectedFiles.length;

    // Check if the number of total selected files is less than 3 and append new files if it is
    if (totalFiles < 3) {
      //Copy the current state array
      const updatedToBeDeleted = [...toBeDeleted];
      // Filter out the item
      const newToBeDeleted = updatedToBeDeleted.filter(
        (image) => image !== url
      );
      // Update the state with the new array
      setToBeDeleted(newToBeDeleted);

      setExistingImages((prevExistingImages) => [...prevExistingImages, url]);
    } else {
      // Prevent the selection of additional files
      toast.error(`You Can Only Select 3 Images! Remove an Image to Restore!`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      event.target.value = "";
      return;
    }
  };

  useEffect(() => {
    if (existingImages.length > 0) {
      setIsImageUploadValid(true);
    } else if (imageUrls.length === 0) {
      setIsImageUploadValid(false);
    }
  }),
    [handleDelete];

  return (
    <div className="w-screen px-36">
      <label
        className="flex flex-col items-center justify-center h-32 pb-5 mb-5 border-2 border-dashed border-gray-500 rounded-2xl text-center cursor-pointer transition-colors duration-200 ease-in-out hover:bg-emerald-100 hover:border-emerald-600"
        htmlFor="upload"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const newFiles = Array.from(e.dataTransfer.files);
          if (
            existingImages.length + selectedFiles.length + newFiles.length <=
            3
          ) {
            setSelectedFiles([...selectedFiles, ...newFiles]);
            setIsImageUploadValid(true);
            let urls = newFiles.map((file) => URL.createObjectURL(file));
            setImageUrls([...imageUrls, ...urls]);
          } else {
            toast.error(`You Can Only Select 3 Images!`, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            return;
          }
        }}
      >
        <PhotoIcon className="h-5" /> Drop New Images Here!
        <input
          id="upload"
          name="upload"
          className="sr-only"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
      </label>
      {errors.upload && (
        <p className="text-red-600 text-sm mt-2">{errors.upload.message}</p>
      )}

      {/* Current Images Display */}
      <p
        className={`${
          existingImages.length > 0 ? "text-lg italic text-gray-600" : "hidden"
        } `}
      >
        Existing Images:
      </p>
      <div className="grid grid-cols-5 gap-4 pt-3">
        {existingImages.map((url, index) => (
          <div
            key={index}
            className="flex flex-col space-y-5 items-center justify-between"
          >
            <div className="">
              <Image
                className={`border-4 ${
                  toBeDeleted.includes(url)
                    ? "opacity-50 border-gray-500"
                    : "border-red-600"
                } rounded-xl`}
                src={url}
                alt="Preview"
                width={150}
                height={150}
              />
            </div>
            <button
              className={`${
                toBeDeleted.includes(url) ? "bg-emerald-600" : "bg-red-600"
              } rounded-lg hover:scale-110 active:scale-90 transform transition duration-300 ease-out`}
              onClick={() => {
                if (toBeDeleted.includes(url)) {
                  setToBeDeleted(
                    (prevToBeDelete) =>
                      prevToBeDelete.filter((item) => item !== url)
                    // How can we prevent more than 3 here?
                  );
                  // console.log(toBeDeleted);
                } else {
                  handleDelete(url);
                }
              }}
            >
              <p className="font-bold text-white px-2 py-1">
                {toBeDeleted.includes(url) ? "RESTORE" : "DELETE"}
              </p>
            </button>
          </div>
        ))}
      </div>

      <p
        className={`${
          toBeDeleted.length > 0
            ? "text-lg italic text-gray-600 mt-5"
            : "hidden"
        } `}
      >
        Removed Images:
      </p>
      {/* Deleted Images Display */}
      <div className="grid grid-cols-5 gap-4 pt-3">
        {toBeDeleted.map((url, index) => (
          <div
            key={index}
            className="flex flex-col space-y-5 items-center justify-between"
          >
            <div className="">
              <Image
                className={`border-4 ${
                  toBeDeleted.includes(url)
                    ? "opacity-50 border-gray-500"
                    : "border-red-600"
                } rounded-xl`}
                src={url}
                alt="Preview"
                width={150}
                height={150}
              />
            </div>
            <button
              className={`${
                toBeDeleted.includes(url) ? "bg-emerald-600" : "bg-red-600"
              } rounded-lg hover:scale-110 active:scale-90 transform transition duration-300 ease-out`}
              onClick={() => {
                if (toBeDeleted.includes(url)) {
                  handleRestore(url);
                }
              }}
            >
              <p className="font-bold text-white px-2 py-1">
                {toBeDeleted.includes(url) ? "RESTORE" : "DELETE"}
              </p>
            </button>
          </div>
        ))}
      </div>

      <p
        className={`${
          imageUrls.length > 0 ? "text-lg italic text-gray-600 mt-5" : "hidden"
        } `}
      >
        New Images:
      </p>
      {/* New Images Display */}
      <div className="grid grid-cols-5 gap-4 pt-3">
        {imageUrls.map((url, index) => (
          <div
            key={index}
            className="flex flex-col space-y-5 items-center justify-between"
          >
            <div className="">
              <Image
                className="border-2 border-gray-600 rounded-xl"
                src={url}
                alt="Preview"
                width={150}
                height={150}
              />
            </div>
            <button
              className="hover:scale-125 active:scale-90 transform transition duration-300 ease-out"
              onClick={() => {
                let newUrls = [...imageUrls];
                let newFiles = [...selectedFiles];
                newUrls.splice(index, 1);
                newFiles.splice(index, 1);
                setImageUrls(newUrls);
                setSelectedFiles(newFiles);
                if (!newUrls.length) {
                  setIsImageUploadValid(false); // All images have been removed
                }
              }}
            >
              <XCircleIcon className="w-7 text-gray-600" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageUploadEdit;
