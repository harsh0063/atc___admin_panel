import { useState, useEffect } from "react";

const Dropdown = ({ label, options, defaultValue, onSelect, labelclassName, main_color, value }) => {
    const [selected, setSelected] = useState(defaultValue || options[0]?.name);
    const [isOpen, setIsOpen] = useState(false);
    console.log(selected);
    
    useEffect(() => {
        if (value !== undefined) {
            setSelected(value);
        }
    }, [value]);

    const handleSelect = (option) => {
        setSelected(option.name);
        setIsOpen(false);
        if (onSelect) onSelect(option); // Pass full object {id, name}
    };

    console.log(options);
    

    return (
        <div className="relative w-full">
            <label className={`block text-sm font-medium ${labelclassName || "text-gray"}`}>{label}</label>

            <div
                className="flex items-center justify-between mt-[10px] relative appearance-none w-full h-[40px] px-[15px] border border-[#C8C8C8] text-[#000000] rounded-[7px] bg-transparent text-sm focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={`text-sm ${main_color || "text-[#9CA3AF]"}`}>{selected}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path d="M8 0.8L4 6.4h8L8 0.8zM8 15.2l4-5.6H4l4 5.6z" fill="#A1A9B3"></path>
                </svg>
            </div>

            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border-[0.2px] border-black rounded-[7px] shadow-lg dropdown-menu">
                    {options.map((option) => (
                        <div
                            key={option.id}
                            className="p-2 py-1 cursor-pointer hover:bg-gray-100 dropdown-option flex items-center gap-2"
                            onClick={() => handleSelect(option)}
                        >
                            {option.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
