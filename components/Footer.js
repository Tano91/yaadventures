import React from "react";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();
  return (
    <div className="bg-gray-100">
      <div className="flex flex-col items-center lg:flex-row lg:justify-evenly px-16 lg:px-32 py-14">
        <div className="text-md text-grey-800 mb-6 lg:my-0">
          <h5
            className="font-bold cursor-pointer"
            onClick={() => router.push("/about")}
          >
            ABOUT
          </h5>
        </div>
        <div
          className="text-md text-grey-800"
          onClick={() => router.push("/contact")}
        >
          <h5 className="font-bold cursor-pointer">CONTACT</h5>
        </div>
      </div>

      <div className="flex justify-center">
        <p className="text-gray-300 text-sm pb-5">
          © 2024 Santano McCalla - Made with ❤️ using Next.js
        </p>
      </div>
    </div>
  );
};

export default Footer;
