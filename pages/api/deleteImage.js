import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_SECRET,
});

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const publicId = req.body.publicId || req.query.publicId;

    try {
      const destroyResult = await cloudinary.uploader.destroy(publicId);
      if (destroyResult.result === "ok") {
        res.status(200).json({ message: "Image deleted successfully" });
      } else {
        throw new Error("Image deletion failed");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      res
        .status(500)
        .json({ error: "Something went wrong during image deletion" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
