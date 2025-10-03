import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const DropdownComponent = ({ options, initialValue, onChange, buttonclassName, menuclassName, itemclassName, optionLinks }) => {
    const [isMenuVisible, setMenuVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState(initialValue);
    const menuRef = useRef(null);
    const navigate = useNavigate(); // Initialize useNavigate

    // Toggle dropdown menu visibility
    const toggleDropdown = (e) => {
        e.stopPropagation();
        setMenuVisible(!isMenuVisible);
    };

    // Handle dropdown option selection and navigation
    const selectOption = (value, link) => {
        setSelectedValue(value);
        setMenuVisible(false);
        if (onChange) {
            onChange(value);
        }
        if (link) {
            navigate(link); // Redirect to the new page
        }
    };

    // Close dropdown when clicking outside
    const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setMenuVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className={`relative ms-auto inline-block w-full ${buttonclassName}`}>
            <div
                className={`inline-flex items-center justify-center gap-2 h-[35px] sm:h-[40px] sm:px-[22px] px-[12px] rounded-[7px] bg-[#D86A37] cursor-pointer dropdown-toggle ${buttonclassName}`}
                onClick={toggleDropdown}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path d="M10.0938 5.33984H5.66406V0.910156C5.66406 0.683627 5.48044 0.5 5.25391 0.5C5.02738 0.5 4.84375 0.683627 4.84375 0.910156V5.33984H0.414062C0.187533 5.33984 0.00390625 5.52347 0.00390625 5.75C0.00390625 5.97653 0.187533 6.16016 0.414062 6.16016H4.84375V10.5898C4.84375 10.8164 5.02738 11 5.25391 11C5.48044 11 5.66406 10.8164 5.66406 10.5898C5.66406 8.85994 5.66406 7.89006 5.66406 6.16016H10.0938C10.3203 6.16016 10.5039 5.97653 10.5039 5.75C10.5039 5.52347 10.3203 5.33984 10.0938 5.33984Z" fill="white" />
                </svg>
                <span className="dropdown-selected text-white flex gap-3 items-center text-sm font-medium">
                    {selectedValue}
                </span>
            </div>

            {/* Dropdown Menu */}
            {isMenuVisible && (
                <div
                    className={`absolute z-10 mt-1 w-full bg-white border-[0.2px] border-black rounded-[7px] shadow-lg dropdown-menu ${menuclassName}`}
                    ref={menuRef}
                >
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={`p-2 py-1 cursor-pointer hover:bg-gray-100 dropdown-option flex items-center gap-2 ${itemclassName}`}
                            onClick={() => selectOption(option, optionLinks ? optionLinks[index] : null)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5" fill="none">
                                <path
                                    d="M4.80469 2.30469H2.69531V0.195313C2.69531 0.0874414 2.60787 0 2.5 0C2.39213 0 2.30469 0.0874414 2.30469 0.195313V2.30469H0.195313C0.0874414 2.30469 0 2.39213 0 2.5C0 2.60787 0.0874414 2.69531 0.195313 2.69531H2.30469V4.80469C2.30469 4.91256 2.39213 5 2.5 5C2.60787 5 2.69531 4.91256 2.69531 4.80469C2.69531 3.98093 2.69531 3.51907 2.69531 2.69531H4.80469C4.91256 2.69531 5 2.60787 5 2.5C5 2.39213 4.91256 2.30469 4.80469 2.30469Z"
                                    fill="black"
                                ></path>
                            </svg>
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropdownComponent;
