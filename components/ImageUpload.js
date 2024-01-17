import React from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";

const ImageUpload = () => {
  return (
    <div className="flex items-center justify-center">
      <input
        type="file"
        accept="image/*"
        className="absolute opacity-0 cursor-pointer h-80 w-80"
      />
      <div className="border border-gray-700 rounded-md h-80 w-80 flex items-center justify-center">
        <PhotoIcon className="h-35 w-35 text-gray-700" />
      </div>
    </div>
  );
};

export default ImageUpload;
