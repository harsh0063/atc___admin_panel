import { useState, useEffect, useRef } from "react";

const Dropdown = ({
    label,
    options = [],
    defaultValue,
    onSelect,
    labelClass,
    main_color,
    value,
    searchfield,
    isOpen = false,
    setIsOpen,
    onToggle,
    setValue // Assuming setValue is passed as a prop from the parent component
}) => {
    const [selected, setSelected] = useState(defaultValue || "");
    const [searchTerm, setSearchTerm] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const dropdownRef = useRef(null);

    // Sync value prop with internal state
    useEffect(() => {
        if (value !== undefined) {
            setSelected(value);
            setSearchTerm(value); // Set searchTerm to selected value
        }
    }, [value]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false); // Close dropdown when clicking outside
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setIsOpen]);

    // Handle selecting an option from the dropdown
    const handleSelect = (option) => {
        setSelected(option);
        setSearchTerm(option); // Set input value to selected option
        setValue(option); // Update the parent state with the selected option
        onSelect?.(option); // Trigger onSelect with the selected option
        setIsOpen(false); // Close the dropdown after selection
    };

    // Handle input changes (custom input or search term)
    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value); // Update search term with user input
        setValue(value); // Update the parent state with custom input

        if (!isOpen && onToggle) {
            onToggle(true); // Open dropdown while typing
        }
    };

    // Handle input selection logic for keyboard navigation
    const handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            setHighlightedIndex((prev) => Math.min(prev + 1, filteredOptions.length - 1));
        }
        if (e.key === "ArrowUp") {
            setHighlightedIndex((prev) => Math.max(prev - 1, 0));
        }
        if (e.key === "Enter" && highlightedIndex !== -1) {
            handleSelect(filteredOptions[highlightedIndex]); // Select highlighted option on Enter
        }
    };

    // Filter options based on the search term
    const filteredOptions = options.filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative w-full" ref={dropdownRef}>
            {label && (
                <label className={`block text-sm font-medium ${labelClass || "text-gray"}`}>
                    {label}
                </label>
            )}

            <div className="relative bg-transparent mt-[10px] flex items-center w-full">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange} // Handle input change (both custom and search)
                    className={`w-full outline-none h-[40px] px-[15px] focus:border-[#b0b0bb] border border-[#d8dfe7] rounded-[7px] text-sm ${main_color || "text-[#9CA3AF]"} text-[#5d7186]`}
                    placeholder={searchfield}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    onKeyDown={handleKeyDown} // Handle keyboard navigation
                />

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`absolute top-3 right-3 cursor-pointer transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
                    fill="#000000"
                    height="12px"
                    width="12px"
                    viewBox="0 0 330 330"
                >
                    <path d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z" />
                </svg>
            </div>

            {/* Dropdown options */}
            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-[#ddd] rounded-[7px] shadow-lg max-h-[16rem] overflow-y-auto">
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option, index) => (
                            <div
                                key={index}
                                className={`px-[10px] py-[10px] cursor-pointer hover:bg-[#ececec] text-sm ${highlightedIndex === index ? "bg-[#ececec]" : ""}`}
                                onClick={() => handleSelect(option)} // Select option on click
                                onMouseEnter={() => setHighlightedIndex(index)} // Highlight option on mouse hover
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
