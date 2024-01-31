import Image from "next/image";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { PhotoIcon } from "@heroicons/react/24/solid";

function ImageUpload({
  errors,
  selectedFiles,
  setSelectedFiles,
  setIsImageUploadValid,
  imageUrls,
  setImageUrls,
}) {
  const handleFileChange = (event) => {
    let newFiles = Array.from(event.target.files);
    let totalFiles = selectedFiles.length + newFiles.length;

    // Check if the number of total selected files is greater than 3
    if (totalFiles > 3) {
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

    // Append new files to the existing ones
    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    setIsImageUploadValid(true); // Update isImageUploadValid to true

    // Generate URLs for new files and append them to the existing ones
    let newUrls = newFiles.map((file) => URL.createObjectURL(file));
    setImageUrls((prevUrls) => [...prevUrls, ...newUrls]);
  };

  return (
    <div className="w-screen px-36">
      <label
        className="flex flex-col items-center justify-center h-32 pb-5 mb-5 border-2 border-dashed border-gray-500 rounded-2xl text-center cursor-pointer transition-colors duration-200 ease-in-out hover:bg-emerald-100 hover:border-emerald-600"
        htmlFor="upload"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const newFiles = Array.from(e.dataTransfer.files);
          if (selectedFiles.length + newFiles.length > 3) {
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
          setSelectedFiles([...selectedFiles, ...newFiles]);
          setIsImageUploadValid(true);
          let urls = newFiles.map((file) => URL.createObjectURL(file));
          setImageUrls([...imageUrls, ...urls]);
        }}
      >
        <PhotoIcon className="h-5" /> Drop Images Here!
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

export default ImageUpload;
