import React, { useState, useEffect } from "react";

const FormButtonGroup = ({ options, setSelectedOption, setValue, trigger }) => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (selected) {
      setValue("selectedOption", selected);
      trigger("selectedOption"); // Trigger validation for the selectedOption field
    }
  }, [selected]);

  const handleClick = (option) => {
    setSelected(option);
    setSelectedOption(option);
  };

  return (
    <div>
      <div>
        <h1 className="text-center text-3xl font-bold text-gray-900 mb-10 mt-10">
          What Type of YaadVenture is It?
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {options.map((option) => (
          <button
            className="text-black rounded-xl px-10 py-10 font-medium"
            type="button"
            key={option}
            // disabled={selected !== null && selected !== option}
            style={{
              border:
                selected === option ? "2px solid #059669" : "2px solid #d1d5db",
            }}
            onClick={() => handleClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FormButtonGroup;
