import cloudinary from "cloudinary-react";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_SECRET,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const fileStr = req.body.image; // Assuming the image is sent as a base64 string from the frontend

    try {
      // Upload the image to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: "yaadventures_upload_present", // Set this up in your Cloudinary settings
      });

      // Send the uploaded image URL back to the frontend
      res.status(200).json({ imageURL: uploadResponse.secure_url });
    } catch (error) {
      // Handle any errors that may occur during the upload process
      console.error("Error uploading image:", error);
      res
        .status(500)
        .json({ error: "Something went wrong during image upload" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
