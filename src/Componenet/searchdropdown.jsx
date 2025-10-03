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
    isOpen,
    onToggle, // ← externally managed open/close
}) => {
    const [selected, setSelected] = useState(defaultValue || "");
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (value !== undefined) {
            setSelected(value);
            setSearchTerm(value); // set searchTerm to selected
        }
    }, [value]);
    useEffect(() => {
        const filtered = options.filter((option) =>
            option.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredOptions(filtered);
        setHighlightedIndex(-1);
    }, [searchTerm, options]);

    const handleSelect = (option) => {
        setSelected(option);
        setSearchTerm("");
        if (onSelect) onSelect(option);
        if (onToggle) onToggle(null); // close dropdown after selection
    };

    const handleDivClick = () => {
        if (onToggle) {
            onToggle(label); // toggle by unique label (or index)
        }
        setSearchTerm("");
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onToggle?.(false); // Close the dropdown
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onToggle]);

    return (
        <div className="relative w-full">
            {label && (
                <label className={`block text-sm font-medium ${labelClass || "text-gray"}`}>
                    {label}
                </label>
            )}

            <div
                onClick={handleDivClick}
                className={`relative bg-transparent mt-[10px] flex items-center w-full h-[40px] px-[15px] border border-[#d8dfe7] ${main_color || "text-[#9CA3AF]"} rounded-[7px] text-sm cursor-pointer`}
            >
                {selected ? (
                    <span className="text-[#5d7186]">{selected}</span>
                ) : (
                    <span className="text-[#5d7186]">{searchfield}</span>
                )}

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

            {isOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute z-10 mt-1 w-full bg-white border border-[#ddd] rounded-[7px] shadow-lg max-h-[16rem] overflow-y-auto"
                >
                    <div className="p-2">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Backspace" && !searchTerm) {
                                    setSelected("");
                                }
                                if (e.key === "ArrowDown") {
                                    setHighlightedIndex((prev) => Math.min(prev + 1, filteredOptions.length - 1));
                                }
                                if (e.key === "ArrowUp") {
                                    setHighlightedIndex((prev) => Math.max(prev - 1, 0));
                                }
                                if (e.key === "Enter" && highlightedIndex !== -1) {
                                    handleSelect(filteredOptions[highlightedIndex]);
                                }
                            }}
                            className="w-full px-2 py-[10px] border border-[#d8dfe7] rounded-[7px] text-sm"
                        />
                    </div>

                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option, index) => (
                            <div
                                key={index}
                                className={`px-[10px] py-[10px] cursor-pointer hover:bg-[#ececec] text-sm ${highlightedIndex === index ? "bg-[#ececec]" : ""
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






