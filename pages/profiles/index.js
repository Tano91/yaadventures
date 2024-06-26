import React from "react";
import DeleteAccountModal from "@/components/DeleteAccountModal";
import Footer from "@/components/Footer";

const handleDeleteUserData = async () => {
  const response = await fetch("/api/delete-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: "user-id" }),
    // Replace 'user-id' with the actual user ID
  });

  if (response.ok) {
    //  log out the user
  } else {
    // Handle error
  }
};

const profiles = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto px-8 sm:px-16">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <DeleteAccountModal onConfirm={() => handleDeleteUserData(user.id)} />
      </div>
      <div className="fixed bottom-0 left-0 right-0">
        <Footer />
      </div>
    </>
  );
};

export default profiles;
