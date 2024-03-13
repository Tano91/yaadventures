import { doc, deleteDoc } from "firebase/firestore";
import { usersColRef } from "@/firebase/config";
import { getSession } from "next-auth/react";

// FIND ACCOUNT WITH MATCHING USER ID AND DELETE TOO!!!!

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  // Authenticate the user using NextAuth's session management
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Use the session user ID to securely verify the user's identity
  const userId = session.user.id;

  try {
    await deleteDoc(doc(usersColRef, userId));
    return res.status(200).json({ message: "User data deleted successfully" });
  } catch (error) {
    console.error("Error deleting user data:", error);
    return res.status(500).json({ error: "Failed to delete user data" });
  }
}
