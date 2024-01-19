import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/solid";

function ImageUpload({
  errors,
  selectedFiles,
  setSelectedFiles,
  setIsImageUploadValid,
}) {
  // const [selectedFiles, setSelectedFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const handleFileChange = (event) => {
    let files = Array.from(event.target.files);

    // Check if the number of selected files is greater than 5
    if (files.length > 5) {
      // Prevent the selection of additional files
      alert("You can only select up to 5 images.");
      event.target.value = "";
      return;
    }

    setSelectedFiles(files);
    setIsImageUploadValid(true); // Update isImageUploadValid to true

    let urls = files.map((file) => URL.createObjectURL(file));
    setImageUrls(urls);
  };

  const handleUpload = async () => {
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "yaadventures_upload_present");

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_CLOUDINARY_API}`,
          formData
        );
        console.log(res.data); // Log the response data
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setIsImageUploadValid(false);
      }
    }
  };

  return (
    <div>
      <label
        className="relative flex flex-col items-center justify-center h-32 p-5 mb-5 border-2 border-dashed border-gray-500 rounded-2xl text-center cursor-pointer transition-colors duration-200 ease-in-out hover:bg-emerald-100 hover:border-emerald-600"
        htmlFor="upload"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const newFiles = Array.from(e.dataTransfer.files);
          if (selectedFiles.length + newFiles.length > 5) {
            alert("You can only select up to 5 images.");
            return;
          }
          setSelectedFiles([...selectedFiles, ...newFiles]);
          setIsImageUploadValid(true); // Add this line
          let urls = newFiles.map((file) => URL.createObjectURL(file));
          setImageUrls([...imageUrls, ...urls]);
        }}
      >
        Drop Images Here!
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
            <div className="4">
              <Image
                className="border-2 border-gray-600 rounded-xl"
                src={url}
                alt="Preview"
                width={100}
                height={100}
              />
            </div>
            <button
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
              <TrashIcon className="h-5 text-red-600" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageUpload;
