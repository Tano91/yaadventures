import Image from "next/image";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

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

    // Check if the number of total selected files is greater than 5
    if (totalFiles > 5) {
      // Prevent the selection of additional files
      toast.error("You can only select up to 5 images!");
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
    <div>
      <label
        className="flex flex-col items-center justify-center h-32 p-5 mb-5 border-2 border-dashed border-gray-500 rounded-2xl text-center cursor-pointer transition-colors duration-200 ease-in-out hover:bg-emerald-100 hover:border-emerald-600"
        htmlFor="upload"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const newFiles = Array.from(e.dataTransfer.files);
          if (selectedFiles.length + newFiles.length > 5) {
            toast.error("You can only select up to 5 images!");
            return;
          }
          setSelectedFiles([...selectedFiles, ...newFiles]);
          setIsImageUploadValid(true);
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

// Uploads are now being done on the createListing page
// const handleUpload = async () => {
//   for (let i = 0; i < selectedFiles.length; i++) {
//     const file = selectedFiles[i];

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "yaadventures_upload_present");

//     try {
//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_CLOUDINARY_API}`,
//         formData
//       );
//       console.log(res.data); // Log the response data
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     } finally {
//       setIsImageUploadValid(false);
//     }
//   }
// };
