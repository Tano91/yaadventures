import React from "react";

const Dropdown = ({ isVisible, setIsVisible, children }) => {
  return (
    <div
      className={`absolute right-0 mt-2 w-40 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ${
        isVisible ? "block" : "hidden"
      }`}
    >
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
