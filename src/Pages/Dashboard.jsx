import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import User_side_menu from '../Componenet/user_side_menu'
import EmployList from '../Componenet/EmployList'
import SubHeader from '../Componenet/sub_header'
import Meen from '../assets/meen.png'
import { Link } from 'react-router-dom';
import ColumnChart from '../Componenet/Dashboard_componet/Chart'
import SpeedMeter from '../Componenet/Dashboard_componet/Speed_meter';
import jsVectorMap from 'jsvectormap';;
import 'jsvectormap/dist/jsvectormap.css';
import 'jsvectormap/dist/maps/world.js'; // ✅ just import — don't install via npm
import ThemeSwitcher from '../Componenet/themeswicher';



const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);
    const [map, setmap] = useState(false);


    const data = {}
    useEffect(() => {
        const mapContainer = document.getElementById('world-map');
        if (!mapContainer) {
            console.error("Map container not found.");
            return;  // Exit if the element doesn't exist.
        }

        let mapInstance = null;

        const markers = [
            { name: "Canada", coords: [56.1304, -106.3468] },
            { name: "India", coords: [20.5937, 78.9629] },
            { name: "USA", coords: [37.0902, -95.7129] },
        ];

        try {
            mapInstance = new jsVectorMap({
                selector: "#world-map",
                map: "world",
                zoomButtons: false,
                markers: markers,
                markerStyle: {
                    initial: {
                        fill: '#5d7287',
                        stroke: '#fff',
                        r: 7,
                    },
                    hover: {
                        fill: '#1C9CD9',
                    },
                },
                regionStyle: {
                    initial: {
                        fill: "#D2D6DC",
                    },
                    hover: {
                        fill: "#3DB0F7",
                    },
                },
            });
        } catch (error) {
            console.error("Error initializing map:", error);
        }

        // Cleanup to prevent duplicate maps
        return () => {
            if (mapInstance) {
                // mapInstance.destroy();
            }
        };
    }, [data]);

    return (
        <div>
            <ThemeSwitcher />
            <ToastContainer
                position="top-center"
                autoClose={1500}
            />
            <User_side_menu setIsOpen={setIsOpen} isOpenside={isOpenside} />
            <div className='flex inter'>
                <EmployList isOpen={isOpen} setIsOpen={setIsOpen} />
                <div className="w-full width__right relative max-2xl:ms-0">
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Dashboard"} />
                    <div className="flex justify-between gap-[10px] mb-[50px] flex-wrap max-sm:mb-[20px]" >
                        <h4 className="text-[26px] text-gray font-semibold">Welcome!</h4>
                    </div>

                    <div>
                        <div className='grid grid-cols-1 gap-5 max-lg:grid-cols-1'>
                            <div className=''>

                                <div>
                                    <div className='grid grid-cols-4 max-sm:grid-cols-1 gap-5'>
                                        <div className="p-6  border bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] rounded-[10px]">
                                            {/* Top Section: Icon + Title + Number */}
                                            <div className="flex justify-between items-center">
                                                {/* Icon */}
                                                <div className="bg_ff6c2f40 h-[56px] w-[56px] flex justify-center items-center rounded-[12px]">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="1em"
                                                        height="1em"
                                                        viewBox="0 0 24 24"
                                                        className="h-[32px] w-[32px]"
                                                    >
                                                        <path
                                                            fill="#ff6c2f"
                                                            d="M3.555 14.257c-.718-3.353-1.078-5.03-.177-6.143C4.278 7 5.993 7 9.422 7h5.156c3.43 0 5.143 0 6.044 1.114s.541 2.79-.177 6.143l-.429 2c-.487 2.273-.73 3.409-1.555 4.076S16.474 21 14.15 21h-4.3c-2.324 0-3.486 0-4.31-.667c-.826-.667-1.07-1.803-1.556-4.076z"
                                                            opacity=".5"
                                                        />
                                                        <path
                                                            fill="#ff6c2f"
                                                            d="M8 11.25a.75.75 0 0 0 0 1.5h8a.75.75 0 0 0 0-1.5zM9.25 15a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75"
                                                        />
                                                        <path
                                                            fill="#ff6c2f"
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M14.665 2.33a.75.75 0 0 1 1.006.335l3 6a.75.75 0 1 1-1.342.67l-3-6a.75.75 0 0 1 .336-1.006m-5.33.001a.75.75 0 0 0-1.006.335l-3 6a.75.75 0 1 0 1.342.67l3-6a.75.75 0 0 0-.336-1.006"
                                                        />
                                                    </svg>
                                                </div>
                                                {/* Text */}
                                                <div className="text-right">
                                                    <span className="text-[#5d7186] block text-[15px] truncate sans">Total Orders</span>
                                                    <h3 className="text-xl font-semibold mt-[6px] text-[24px] tracking-wide ">13, 647</h3>
                                                </div>
                                            </div>

                                            {/* Bottom Section */}
                                            <div className="mt-4 flex justify-between items-center">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <span className="text-[#22c55e] flex items-center gap-1">
                                                        <i className="fa-solid fa-caret-down"></i> 2.3%
                                                    </span>
                                                    <span className="text-[#5d7186] text-[12px]">Last Week</span>
                                                </div>
                                                <div className="text-[12px] text-[#8486a7] cursor-pointer ">
                                                    View More
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-6  border bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] rounded-[10px]">
                                            {/* Top Section: Icon + Title + Number */}
                                            <div className="flex justify-between items-center">
                                                {/* Icon */}
                                                <div className="bg_ff6c2f40 h-[56px] w-[56px] flex justify-center items-center rounded-[12px]">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="1em"
                                                        height="1em"
                                                        viewBox="0 0 24 24"
                                                        className="h-[32px] w-[32px]"
                                                    >
                                                        <path
                                                            fill="#ff6c2f"
                                                            d="M3.555 14.257c-.718-3.353-1.078-5.03-.177-6.143C4.278 7 5.993 7 9.422 7h5.156c3.43 0 5.143 0 6.044 1.114s.541 2.79-.177 6.143l-.429 2c-.487 2.273-.73 3.409-1.555 4.076S16.474 21 14.15 21h-4.3c-2.324 0-3.486 0-4.31-.667c-.826-.667-1.07-1.803-1.556-4.076z"
                                                            opacity=".5"
                                                        />
                                                        <path
                                                            fill="#ff6c2f"
                                                            d="M8 11.25a.75.75 0 0 0 0 1.5h8a.75.75 0 0 0 0-1.5zM9.25 15a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75"
                                                        />
                                                        <path
                                                            fill="#ff6c2f"
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M14.665 2.33a.75.75 0 0 1 1.006.335l3 6a.75.75 0 1 1-1.342.67l-3-6a.75.75 0 0 1 .336-1.006m-5.33.001a.75.75 0 0 0-1.006.335l-3 6a.75.75 0 1 0 1.342.67l3-6a.75.75 0 0 0-.336-1.006"
                                                        />
                                                    </svg>
                                                </div>
                                                {/* Text */}
                                                <div className="text-right">
                                                    <span className="text-[#5d7186] block text-[15px] truncate sans">Total Orders</span>

                                                    <h3 className="text-xl font-semibold mt-[6px] text-[24px] tracking-wide">13, 647</h3>
                                                </div>
                                            </div>

                                            {/* Bottom Section */}
                                            <div className="mt-4 flex justify-between items-center">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <span className="text-[#22c55e] flex items-center gap-1">
                                                        <i className="fa-solid fa-caret-down"></i> 2.3%
                                                    </span>
                                                    <span className="text-[#5d7186] text-[12px]">Last Week</span>
                                                </div>
                                                <div className="text-[12px] text-[#8486a7] cursor-pointer ">
                                                    View More
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6  border bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] rounded-[10px]">
                                            {/* Top Section: Icon + Title + Number */}
                                            <div className="flex justify-between items-center">
                                                {/* Icon */}
                                                <div className="bg_ff6c2f40 h-[56px] w-[56px] flex justify-center items-center rounded-[12px]">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="1em"
                                                        height="1em"
                                                        viewBox="0 0 24 24"
                                                        className="h-[32px] w-[32px]"
                                                    >
                                                        <path
                                                            fill="#ff6c2f"
                                                            d="M3.555 14.257c-.718-3.353-1.078-5.03-.177-6.143C4.278 7 5.993 7 9.422 7h5.156c3.43 0 5.143 0 6.044 1.114s.541 2.79-.177 6.143l-.429 2c-.487 2.273-.73 3.409-1.555 4.076S16.474 21 14.15 21h-4.3c-2.324 0-3.486 0-4.31-.667c-.826-.667-1.07-1.803-1.556-4.076z"
                                                            opacity=".5"
                                                        />
                                                        <path
                                                            fill="#ff6c2f"
                                                            d="M8 11.25a.75.75 0 0 0 0 1.5h8a.75.75 0 0 0 0-1.5zM9.25 15a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75"
                                                        />
                                                        <path
                                                            fill="#ff6c2f"
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M14.665 2.33a.75.75 0 0 1 1.006.335l3 6a.75.75 0 1 1-1.342.67l-3-6a.75.75 0 0 1 .336-1.006m-5.33.001a.75.75 0 0 0-1.006.335l-3 6a.75.75 0 1 0 1.342.67l3-6a.75.75 0 0 0-.336-1.006"
                                                        />
                                                    </svg>
                                                </div>
                                                {/* Text */}
                                                <div className="text-right">
                                                    <span className="text-[#5d7186] block text-[15px] truncate sans">Total Orders</span>

                                                    <h3 className="text-xl font-semibold mt-[6px] text-[24px] tracking-wide">13, 647</h3>
                                                </div>
                                            </div>

                                            {/* Bottom Section */}
                                            <div className="mt-4 flex justify-between items-center">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <span className="text-[#22c55e] flex items-center gap-1">
                                                        <i className="fa-solid fa-caret-down"></i> 2.3%
                                                    </span>
                                                    <span className="text-[#5d7186] text-[12px]">Last Week</span>
                                                </div>
                                                <div className="text-[12px] text-[#8486a7] cursor-pointer ">
                                                    View More
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-6  border bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] rounded-[10px]">
                                            {/* Top Section: Icon + Title + Number */}
                                            <div className="flex justify-between items-center">
                                                {/* Icon */}
                                                <div className="bg_ff6c2f40 h-[56px] w-[56px] flex justify-center items-center rounded-[12px]">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="1em"
                                                        height="1em"
                                                        viewBox="0 0 24 24"
                                                        className="h-[32px] w-[32px]"
                                                    >
                                                        <path
                                                            fill="#ff6c2f"
                                                            d="M3.555 14.257c-.718-3.353-1.078-5.03-.177-6.143C4.278 7 5.993 7 9.422 7h5.156c3.43 0 5.143 0 6.044 1.114s.541 2.79-.177 6.143l-.429 2c-.487 2.273-.73 3.409-1.555 4.076S16.474 21 14.15 21h-4.3c-2.324 0-3.486 0-4.31-.667c-.826-.667-1.07-1.803-1.556-4.076z"
                                                            opacity=".5"
                                                        />
                                                        <path
                                                            fill="#ff6c2f"
                                                            d="M8 11.25a.75.75 0 0 0 0 1.5h8a.75.75 0 0 0 0-1.5zM9.25 15a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75"
                                                        />
                                                        <path
                                                            fill="#ff6c2f"
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M14.665 2.33a.75.75 0 0 1 1.006.335l3 6a.75.75 0 1 1-1.342.67l-3-6a.75.75 0 0 1 .336-1.006m-5.33.001a.75.75 0 0 0-1.006.335l-3 6a.75.75 0 1 0 1.342.67l3-6a.75.75 0 0 0-.336-1.006"
                                                        />
                                                    </svg>
                                                </div>
                                                {/* Text */}
                                                <div className="text-right">
                                                    <span className="text-[#5d7186] block text-[15px] truncate sans">Total Orders</span>

                                                    <h3 className="text-xl font-semibold mt-[6px] text-[24px] tracking-wide">13, 647</h3>
                                                </div>
                                            </div>

                                            {/* Bottom Section */}
                                            <div className="mt-4 flex justify-between items-center">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <span className="text-[#22c55e] flex items-center gap-1">
                                                        <i className="fa-solid fa-caret-down"></i> 2.3%
                                                    </span>
                                                    <span className="text-[#5d7186] text-[12px]">Last Week</span>
                                                </div>
                                                <div className="text-[12px] text-[#8486a7] cursor-pointer ">
                                                    View More
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-6  border bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] rounded-[10px]">
                                            {/* Top Section: Icon + Title + Number */}
                                            <div className="flex justify-between items-center">
                                                {/* Icon */}
                                                <div className="bg_ff6c2f40 h-[56px] w-[56px] flex justify-center items-center rounded-[12px]">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="1em"
                                                        height="1em"
                                                        viewBox="0 0 24 24"
                                                        className="h-[32px] w-[32px]"
                                                    >
                                                        <path
                                                            fill="#ff6c2f"
                                                            d="M3.555 14.257c-.718-3.353-1.078-5.03-.177-6.143C4.278 7 5.993 7 9.422 7h5.156c3.43 0 5.143 0 6.044 1.114s.541 2.79-.177 6.143l-.429 2c-.487 2.273-.73 3.409-1.555 4.076S16.474 21 14.15 21h-4.3c-2.324 0-3.486 0-4.31-.667c-.826-.667-1.07-1.803-1.556-4.076z"
                                                            opacity=".5"
                                                        />
                                                        <path
                                                            fill="#ff6c2f"
                                                            d="M8 11.25a.75.75 0 0 0 0 1.5h8a.75.75 0 0 0 0-1.5zM9.25 15a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75"
                                                        />
                                                        <path
                                                            fill="#ff6c2f"
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M14.665 2.33a.75.75 0 0 1 1.006.335l3 6a.75.75 0 1 1-1.342.67l-3-6a.75.75 0 0 1 .336-1.006m-5.33.001a.75.75 0 0 0-1.006.335l-3 6a.75.75 0 1 0 1.342.67l3-6a.75.75 0 0 0-.336-1.006"
                                                        />
                                                    </svg>
                                                </div>
                                                {/* Text */}
                                                <div className="text-right">
                                                    <span className="text-[#5d7186] block text-[15px] truncate sans">Total Orders</span>
                                                    <h3 className="text-xl font-semibold mt-[6px] text-[24px] tracking-wide ">13, 647</h3>
                                                </div>
                                            </div>

                                            {/* Bottom Section */}
                                            <div className="mt-4 flex justify-between items-center">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <span className="text-[#22c55e] flex items-center gap-1">
                                                        <i className="fa-solid fa-caret-down"></i> 2.3%
                                                    </span>
                                                    <span className="text-[#5d7186] text-[12px]">Last Week</span>
                                                </div>
                                                <div className="text-[12px] text-[#8486a7] cursor-pointer ">
                                                    View More
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-6  border bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] rounded-[10px]">
                                            {/* Top Section: Icon + Title + Number */}
                                            <div className="flex justify-between items-center">
                                                {/* Icon */}
                                                <div className="bg_ff6c2f40 h-[56px] w-[56px] flex justify-center items-center rounded-[12px]">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="1em"
                                                        height="1em"
                                                        viewBox="0 0 24 24"
                                                        className="h-[32px] w-[32px]"
                                                    >
                                                        <path
                                                            fill="#ff6c2f"
                                                            d="M3.555 14.257c-.718-3.353-1.078-5.03-.177-6.143C4.278 7 5.993 7 9.422 7h5.156c3.43 0 5.143 0 6.044 1.114s.541 2.79-.177 6.143l-.429 2c-.487 2.273-.73 3.409-1.555 4.076S16.474 21 14.15 21h-4.3c-2.324 0-3.486 0-4.31-.667c-.826-.667-1.07-1.803-1.556-4.076z"
                                                            opacity=".5"
                                                        />
                                                        <path
                                                            fill="#ff6c2f"
                                                            d="M8 11.25a.75.75 0 0 0 0 1.5h8a.75.75 0 0 0 0-1.5zM9.25 15a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75"
                                                        />
                                                        <path
                                                            fill="#ff6c2f"
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M14.665 2.33a.75.75 0 0 1 1.006.335l3 6a.75.75 0 1 1-1.342.67l-3-6a.75.75 0 0 1 .336-1.006m-5.33.001a.75.75 0 0 0-1.006.335l-3 6a.75.75 0 1 0 1.342.67l3-6a.75.75 0 0 0-.336-1.006"
                                                        />
                                                    </svg>
                                                </div>
                                                {/* Text */}
                                                <div className="text-right">
                                                    <span className="text-[#5d7186] block text-[15px] truncate sans">Total Orders</span>

                                                    <h3 className="text-xl font-semibold mt-[6px] text-[24px] tracking-wide">13, 647</h3>
                                                </div>
                                            </div>

                                            {/* Bottom Section */}
                                            <div className="mt-4 flex justify-between items-center">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <span className="text-[#22c55e] flex items-center gap-1">
                                                        <i className="fa-solid fa-caret-down"></i> 2.3%
                                                    </span>
                                                    <span className="text-[#5d7186] text-[12px]">Last Week</span>
                                                </div>
                                                <div className="text-[12px] text-[#8486a7] cursor-pointer ">
                                                    View More
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6  border bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] rounded-[10px]">
                                            {/* Top Section: Icon + Title + Number */}
                                            <div className="flex justify-between items-center">
                                                {/* Icon */}
                                                <div className="bg_ff6c2f40 h-[56px] w-[56px] flex justify-center items-center rounded-[12px]">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="1em"
                                                        height="1em"
                                                        viewBox="0 0 24 24"
                                                        className="h-[32px] w-[32px]"
                                                    >
                                                        <path
                                                            fill="#ff6c2f"
                                                            d="M3.555 14.257c-.718-3.353-1.078-5.03-.177-6.143C4.278 7 5.993 7 9.422 7h5.156c3.43 0 5.143 0 6.044 1.114s.541 2.79-.177 6.143l-.429 2c-.487 2.273-.73 3.409-1.555 4.076S16.474 21 14.15 21h-4.3c-2.324 0-3.486 0-4.31-.667c-.826-.667-1.07-1.803-1.556-4.076z"
                                                            opacity=".5"
                                                        />
                                                        <path
                                                            fill="#ff6c2f"
                                                            d="M8 11.25a.75.75 0 0 0 0 1.5h8a.75.75 0 0 0 0-1.5zM9.25 15a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75"
                                                        />
                                                        <path
                                                            fill="#ff6c2f"
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M14.665 2.33a.75.75 0 0 1 1.006.335l3 6a.75.75 0 1 1-1.342.67l-3-6a.75.75 0 0 1 .336-1.006m-5.33.001a.75.75 0 0 0-1.006.335l-3 6a.75.75 0 1 0 1.342.67l3-6a.75.75 0 0 0-.336-1.006"
                                                        />
                                                    </svg>
                                                </div>
                                                {/* Text */}
                                                <div className="text-right">
                                                    <span className="text-[#5d7186] block text-[15px] truncate sans">Total Orders</span>

                                                    <h3 className="text-xl font-semibold mt-[6px] text-[24px] tracking-wide">13, 647</h3>
                                                </div>
                                            </div>

                                            {/* Bottom Section */}
                                            <div className="mt-4 flex justify-between items-center">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <span className="text-[#22c55e] flex items-center gap-1">
                                                        <i className="fa-solid fa-caret-down"></i> 2.3%
                                                    </span>
                                                    <span className="text-[#5d7186] text-[12px]">Last Week</span>
                                                </div>
                                                <div className="text-[12px] text-[#8486a7] cursor-pointer ">
                                                    View More
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-6  border bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] rounded-[10px]">
                                            {/* Top Section: Icon + Title + Number */}
                                            <div className="flex justify-between items-center">
                                                {/* Icon */}
                                                <div className="bg_ff6c2f40 h-[56px] w-[56px] flex justify-center items-center rounded-[12px]">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="1em"
                                                        height="1em"
                                                        viewBox="0 0 24 24"
                                                        className="h-[32px] w-[32px]"
                                                    >
                                                        <path
                                                            fill="#ff6c2f"
                                                            d="M3.555 14.257c-.718-3.353-1.078-5.03-.177-6.143C4.278 7 5.993 7 9.422 7h5.156c3.43 0 5.143 0 6.044 1.114s.541 2.79-.177 6.143l-.429 2c-.487 2.273-.73 3.409-1.555 4.076S16.474 21 14.15 21h-4.3c-2.324 0-3.486 0-4.31-.667c-.826-.667-1.07-1.803-1.556-4.076z"
                                                            opacity=".5"
                                                        />
                                                        <path
                                                            fill="#ff6c2f"
                                                            d="M8 11.25a.75.75 0 0 0 0 1.5h8a.75.75 0 0 0 0-1.5zM9.25 15a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75"
                                                        />
                                                        <path
                                                            fill="#ff6c2f"
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M14.665 2.33a.75.75 0 0 1 1.006.335l3 6a.75.75 0 1 1-1.342.67l-3-6a.75.75 0 0 1 .336-1.006m-5.33.001a.75.75 0 0 0-1.006.335l-3 6a.75.75 0 1 0 1.342.67l3-6a.75.75 0 0 0-.336-1.006"
                                                        />
                                                    </svg>
                                                </div>
                                                {/* Text */}
                                                <div className="text-right">
                                                    <span className="text-[#5d7186] block text-[15px] truncate sans">Total Orders</span>

                                                    <h3 className="text-xl font-semibold mt-[6px] text-[24px] tracking-wide">13, 647</h3>
                                                </div>
                                            </div>

                                            {/* Bottom Section */}
                                            <div className="mt-4 flex justify-between items-center">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <span className="text-[#22c55e] flex items-center gap-1">
                                                        <i className="fa-solid fa-caret-down"></i> 2.3%
                                                    </span>
                                                    <span className="text-[#5d7186] text-[12px]">Last Week</span>
                                                </div>
                                                <div className="text-[12px] text-[#8486a7] cursor-pointer ">
                                                    View More
                                                </div>
                                            </div>
                                        </div>


                                    </div>

                                </div>
                            </div>
                            <div className='max-h-[385px] max-sm:max-h-[330px]'>
                                <ColumnChart color="var(--blue)" />
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-3 gap-5 max-lg:grid-cols-1'>
                        <div className='w-full  border mt-[20px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] p-[24px] max-sm:p-[20px] rounded-[10px]'>

                            <SpeedMeter color="var(--blue)"/>
                            <div>
                                <div className='flex '>
                                    <div className='w-[50%] text-center'>

                                        <span className='sans text-[#5d7186] mb-[12px] text-[16px]'>This Week</span><br />
                                        <h3 className='text-[#313b5e] text-[24px] font-[600]'>23.5k</h3>
                                    </div>
                                    <div className='w-[50%] text-center'>
                                        <span className='sans text-[#5d7186] mb-[12px] text-[16px]'>Last Week</span><br />
                                        <h3 className='text-[#313b5e] mb-[24px] text-[24px] font-[600]'>41.05k</h3>
                                    </div>
                                </div>
                                <button className='bg-[#eef2f7] text-[#323a46] h-[39px] w-[100%] rounded-[12px] sans font-[500]'>View Deatils</button>
                            </div>
                        </div>
                        <div className='w-full  border mt-[20px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] p-[24px] max-sm:p-[20px] rounded-[10px]'>
                            <h5 className="chart-title   mb-[16px] font-[600] text-[16px] text-[#313b5e]">Sessions by Country</h5>
                            {
                                <div id="world-map" className="w-full h-[300px]"></div>
                            }

                            <div>
                                <div className='flex '>
                                    <div className='w-[50%] text-center'>

                                        <span className='sans text-[#5d7186] mb-[12px] text-[16px]'>This Week</span><br />
                                        <h3 className='text-[#313b5e] text-[24px] font-[600]'>23.5k</h3>
                                    </div>
                                    <div className='w-[50%] text-center'>
                                        <span className='sans text-[#5d7186] mb-[12px] text-[16px]'>Last Week</span><br />
                                        <h3 className='text-[#313b5e] mb-[24px] text-[24px] font-[600]'>41.05k</h3>
                                    </div>
                                </div>
                                <button className='bg-[#eef2f7] text-[#323a46] h-[39px] w-[100%] rounded-[12px] sans font-[500]'>View Deatils</button>
                            </div>
                        </div>
                        {/* <div className='w-full  border mt-[20px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] p-[24px] max-sm:p-[20px] rounded-[10px]'>
                            <WorldMap />
                        </div> */}

                        <div className="w-full  border mt-[20px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] p-[24px] max-sm:p-[20px] rounded-[10px]">
                            <div className='flex justify-between items-center mb-[18px] max-sm:mb-0'>
                                <div className="text-[16px] font-[600] max-sm:mb-[10px]  text-[#313b5e]">
                                    <h5>Top Pages</h5>
                                </div>
                                <Link to="/order">
                                    <div className='text-[13px] font-[400] text-[var(--blue)] bg_ff6c2f1a cursor-pointer  rounded-[12px] py-[6px] px-[11px] hover:bg-[var(--blue)] hover:text-white sans'>
                                        View All
                                    </div>

                                </Link>
                            </div>


                            <div className="overflow-x-auto none__apee_scrol">
                                <table className="min-w-[450px] w-full text-left max-lg:py-3  divide-y divide-[#dcd7ee] border-t border-t-[#e1dcf1]">

                                    <thead className="bg-[#f9f9f9]">
                                        <tr className=''>
                                            <th className="px-4 py-3 border-b text-[#5d7186] font-[600] sans">Page Path</th>
                                            <th className="px-4 py-3 border-b text-[#5d7186] font-[600] sans">Page View</th>
                                            <th className="px-4 py-3 border-b text-[#5d7186] font-[600] sans">Exit Rate</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[1, 2, 3, 4, 5, 6, 7].map((_, index) => (
                                            <tr key={index} className="hover:bg-[#f5f5f5]">
                                                <td className="pe-4 py-4 border-b">
                                                    <span className="text-[15px] font-[500] max-sm:text-[12px] text-[#5d7186] sans">larkon/ecommerce.html</span>
                                                </td>
                                                <td className="px-4 py-4 text-left max-sm:text-center border-b">
                                                    <span className="text-[15px] font-[500] max-sm:text-[12px] text-[#5d7186] sans">465</span>
                                                </td>
                                                <td className="px-4 py-4 text-left max-sm:text-center border-b">
                                                    <span className="text-[12px] font-[600] max-sm:text-[12px] bg-[#22c55e2e] text-[#22c55e] px-[6px] py-[3px] rounded-[8px] sans">4.4%</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>

                        </div>


                    </div>


                    <div className="w-full  border mt-[20px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] p-[24px] max-sm:p-[20px] rounded-[10px]">
                        <div className='flex justify-between items-center mb-[18px] max-sm:mb-0'>
                            <div className="text-[16px] font-[600] max-sm:mb-[10px]  text-[#313b5e]">
                                <h5>Recent Orders</h5>
                            </div>
                            <Link to="/order">
                                <div className='text-[13px] font-[400] text-[var(--blue)] bg_ff6c2f1a cursor-pointer  rounded-[12px] py-[6px] px-[11px] hover:bg-[var(--blue)] hover:text-white sans'>
                                    Create Order
                                </div>

                            </Link>
                        </div>


                        <div className="overflow-x-auto none__apee_scrol">
                            <table className="min-w-[450px] w-full text-left max-lg:py-3  divide-y divide-[#dcd7ee] border-t border-t-[#e1dcf1]">

                                <thead className="bg-[#f9f9f9]">
                                    <tr className=''>
                                        <th className="px-4 py-3 border-b text-[#5d7186] font-[600] sans">Page Path</th>
                                        <th className="px-4 py-3 border-b text-[#5d7186] font-[600] sans">Page View</th>
                                        <th className="px-4 py-3 border-b text-[#5d7186] font-[600] sans">Exit Rate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[1, 2, 3, 4, 5, 6, 7].map((_, index) => (
                                        <tr key={index} className="hover:bg-[#f5f5f5]">
                                            <td className="pe-4 py-4 border-b">
                                                <span className="text-[15px] font-[500] max-sm:text-[12px] text-[#5d7186] sans">larkon/ecommerce.html</span>
                                            </td>
                                            <td className="px-4 py-4 text-left max-sm:text-center border-b">
                                                <span className="text-[15px] font-[500] max-sm:text-[12px] text-[#5d7186] sans">465</span>
                                            </td>
                                            <td className="px-4 py-4 text-left max-sm:text-center border-b">
                                                <span className="text-[12px] font-[600] max-sm:text-[12px] bg-[#22c55e2e] text-[#22c55e] px-[6px] py-[3px] rounded-[8px] sans">4.4%</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Dashboard
