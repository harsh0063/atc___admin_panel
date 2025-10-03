import React, { useState, useEffect } from "react";

export default function ThemeSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState("Oragne");

    const colors = [
        {
            name: "Oragne",
            id: "Oragne",
            blue: "#ff6c2f",
            light_orange: "#ff6c2f1a",
            dashbg_orange: "#ff6c2f40",
            dashpath_orange: "#ff6c2f",
        },
        {
            name: "Transparent Dark",
            id: "transparent",
            blue: "#000000",
            light_orange: "#1818181a",
            dashbg_orange: "#00000024",
            dashpath_orange: "#00000085",
        },
    ];

    const changePrimaryColor = (colorId) => {
        const selected = colors.find((c) => c.id === colorId);
        if (!selected) return;

        setSelectedColor(colorId);
        document.documentElement.style.setProperty("--blue", selected.blue);
        document.documentElement.style.setProperty("--light_orange", selected.light_orange);
        document.documentElement.style.setProperty("--dashbg_orange", selected.dashbg_orange);
        document.documentElement.style.setProperty("--dashpath_orange", selected.dashpath_orange);
    };

    useEffect(() => {
        changePrimaryColor(selectedColor);
    }, []);

    return (
        <>
            {/* Fixed Button */}
            <button
                className="fixed top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-l-lg shadow-lg z-50"
                onClick={() => setIsOpen(true)}
            >
                ⚙️
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Side Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-60 bg-white shadow-lg transform transition-transform z-50 ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="p-4">
                    <h2 className="text-lg font-semibold mb-4">Choose Theme Color</h2>
                    <div className="flex gap-4">
                        {colors.map((color) => (
                            <div
                                key={color.id}
                                className={`w-10 h-10 rounded-full cursor-pointer border-2 transition duration-200 ${selectedColor === color.id ? "border-black scale-110" : "border-transparent"
                                    }`}
                                style={{ backgroundColor: color.blue }}
                                onClick={() => changePrimaryColor(color.id)}
                                title={color.name}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
