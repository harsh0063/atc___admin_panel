import { useState } from "react";

const SelectButton = ({ label, options, value, onSelect, containerclassName = "grid grid-cols-2 max-sm:gap-[30px] gap-[50px] 2xl:w-4/12 md:w-8/12" }) => {
  return (
    <div>
      {/* Heading */}
      <h6 className="text-sm text-gray font-medium mb-[10px]">{label}</h6>

      {/* Button Container */}
      <div className={containerclassName}>
        {options.map((option, index) => {
          const isActive = String(value) == String(option.status);

          // console.log("Current Value:", value);
          // console.log("Option Status:", option.status);
          
          return (
            <button
              key={index}
              type="button"
              className={`rounded-[7px] w-full border py-2 px-4 flex items-center justify-between transition-all ${
                isActive ? "border-primary bg-[#D86A3733]" : "border-[#C8C8C8]"
              }`}
              onClick={() => {
                onSelect(option.status); // Fix: Ensure the correct value is passed
              }}
            >
              {/* Label */}
              <span className={`text-sm ${isActive ? "text-[#D86A37]" : "text-[#9CA3AF]"}`}>
                {option.label}
              </span>

              {/* Indicator */}
              <div className="indicator">
                <span
                  className={`w-[12px] h-[12px] block rounded-full border-[2px] ${
                    isActive ? "border-white bg-[#D86A37]" : "border-[#C8C8C8]"
                  }`}
                ></span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SelectButton;
