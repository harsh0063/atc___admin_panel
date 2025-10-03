import { useState, useEffect, useRef } from "react";

const Dropdown = ({
  label,
  options = [],
  value,
  onSelect,
  labelclassName,
  main_color,
  searchfield = "Select option",
  searchable = false,
  isOpen,          // controlled from parent
  onToggle         // controlled from parent
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filtered);
    setHighlightedIndex(-1);
  }, [searchTerm, options]);

  const handleSelect = (option) => {
    onSelect?.(option);
    setSearchTerm("");
    setHighlightedIndex(-1);
    onToggle?.(false); // Auto-close dropdown after selection
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prev) => Math.min(prev + 1, filteredOptions.length - 1));
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && highlightedIndex !== -1) {
      handleSelect(filteredOptions[highlightedIndex]);
    } else if (e.key === "Backspace" && !searchTerm) {
      onSelect?.("");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onToggle?.(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onToggle]);

  const toggleDropdown = () => {
    onToggle?.(!isOpen); // Toggle open/close
    if (isOpen) {
      setSearchTerm("");
      setHighlightedIndex(-1);
    }
  };

  return (
    <div className="relative w-full">
      {label && (
        <label className={`block text-sm font-medium ${labelclassName || "text-gray"}`}>
          {label}
        </label>
      )}

      <div
        onClick={toggleDropdown}
        className={`relative mt-[5px] flex items-center justify-between w-full h-[40px] px-[15px] border border-[#d8dfe7] ${main_color || "text-[#9CA3AF]"} rounded-[7px] text-sm cursor-pointer`}
      >
        <span>
          {value === "True" ? "Active" : value === "False" ? "Inactive" : value || searchfield}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
          fill="none"
          viewBox="0 0 16 16"
        >
          <path d="M8 0.8L4 6.4h8L8 0.8zM8 15.2l4-5.6H4l4 5.6z" fill="#A1A9B3" />
        </svg>
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-10 mt-1 w-full bg-white border border-[#ddd] rounded-[7px] shadow-lg max-h-40 overflow-y-auto"
        >
          {searchable && (
            <div className="p-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-2 py-[10px] border border-[#d8dfe7] rounded-[7px] text-sm"
              />
            </div>
          )}

          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={index}
                className={`px-[10px] py-[10px] cursor-pointer hover:bg-[#ececec] text-sm ${
                  highlightedIndex === index ? "bg-[#ececec]" : ""
                }`}
                onClick={() => handleSelect(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {option}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-400">No options found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
