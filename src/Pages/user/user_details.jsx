import React, { useEffect, useState, useRef } from "react";
import User_side_menu from '../../Componenet/user_side_menu'
import EmployList from '../../Componenet/EmployList'
import SubHeader from '../../Componenet/sub_header'
import Dropdown from '../../Componenet/dropdown'
import { ToastContainer, toast } from "react-toastify";
import { useGetCartQuery, useGetOrderQuery, useGetProfileQuery, useGetWishlistQuery } from "../../services/apiSlice";
import { Link, useNavigate } from "react-router-dom";
import Category_img from '../../assets/category.png'
import { Icon } from '@iconify/react';
import AreaChart from "../../Componenet/Customers/CustomerChart";
import ThemeSwitcher from "../../Componenet/themeswicher";


const Category = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);

    const invoices = [
        { id: "INV2540", date: "16 May 2024" },
        { id: "INV2541", date: "17 May 2024" },
        { id: "INV2541", date: "18 May 2024" },
        { id: "INV2541", date: "19 May 2024" },
        // Add more...
    ];

    const dropdownRef = useRef([]);
    const [openDropdown, setOpenDropdown] = useState(null);

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest(".dropdown-container")) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    const [layer, setlayer] = useState('cart')



    const { data: order } = useGetOrderQuery()
    const { data: cart } = useGetCartQuery()
    const { data: wishlist } = useGetWishlistQuery()
    console.log(cart);

    const categories1 = order?.data

    const { data: profile } = useGetProfileQuery()
    console.log(profile);
    const [searchTerm, setSearchTerm] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredData = categories1?.filter(item =>
        item?.status?.toLowerCase().includes(searchTerm.toLowerCase())
    );



    const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage);

    const displayedData = filteredData?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    // ---------------------------------------------------------------------------------
    const [currentPage1, setCurrentPage1] = useState(1);

    const filteredData1 = cart?.data?.filter(item =>
        item.product_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );



    const totalPages1 = Math.ceil((filteredData1?.length || 0) / itemsPerPage);

    const displayedData1 = filteredData1?.slice(
        (currentPage1 - 1) * itemsPerPage,
        currentPage1 * itemsPerPage
    );
    // ---------------------------------------------------------------------------------
    const [currentPage2, setCurrentPage2] = useState(1);

    const filteredData2 = wishlist?.data?.filter(item =>
        item.product_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );



    const totalPages2 = Math.ceil((filteredData2?.length || 0) / itemsPerPage);

    const displayedData2 = filteredData2?.slice(
        (currentPage2 - 1) * itemsPerPage,
        currentPage2 * itemsPerPage
    );



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


                <div className="w-full width__right relative max-md:ms-0">
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Customers Details"} />
                    <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block" >
                        <h3 className="text-[22px] font-[700] text-[#707793] uppercase ">Customers Details</h3>

                        <nav className="text-sm text-gray-600 max-sm:mt-[15px] max-sm:ps-[5px]" aria-label="Breadcrumb" >
                            <ol className="flex flex-wrap items-center ">

                                <li className="flex items-center">
                                    <Link to="/dashboard" className="hover:text-primary transition-colors font-[12px] text-[#575864]">Dashboard</Link>
                                    <svg className="mx-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M9 5l7 7-7 7" />
                                    </svg>
                                </li>
                                <li className="text-primary font-medium text-[12px]">Customers Details</li>
                            </ol>
                        </nav>
                    </div>

                    <div className="flex gap-8 max-2xl:gap-3 max-lg:block">


                        {/* Left Panel */}
                        <div className="w-[30%] max-2xl:w-[40%] max-lg:w-[100%]   h-[auto]  max-sm:p-[10px] ">
                            <div className="rounded-xl bg-white shadow-[0_4px_24px_2px_rgba(20,25,38,0.05)] mb-[10px]  overflow-hidden">
                                <div>
                                    <div className="bg-primary background-img relative">
                                        <img src="https://techzaa.in/larkon/admin/assets/images/users/avatar-2.jpg" className="h-[72px] w-[72px] rounded-full border-[3px] border-white absolute -bottom-[40px] left-[20px]"></img>

                                    </div>
                                    <div className="mt-4 pt-[40px] p-4">
                                        <div className="flex items-center">
                                            <h4 className="text-[18px] font-[500]"> Michael A. Miner</h4>
                                            <i className="fa-solid fa-check bg-[#22c55e] text-white p-[3px] text-[10px] rounded-full ms-[5px]"></i>
                                        </div>
                                        <div className="mt-2">
                                            <a href="" className="text-primary text-[15px]">@michael_cus_2024</a>
                                            <p className="text-[15px] my-1"><span className="font-[600] text-gray">Email : </span> michaelaminer@dayrep.com</p>
                                            <p className="text-[15px] my-1"><span className="font-[600] text-gray">Phone : </span>  +28 (57) 760-010-27</p>
                                        </div>

                                    </div>
                                    <div className="flex gap-2 border-t border-[#eaedf1] pt-4 p-4">
                                        <button className="w-[100%] h-[39px]  bg-primary  text-white   rounded-[12px] text-[14px] mt-[12px]">Send Message</button>
                                        <button className="w-[100%] h-[39px] text-gray border-[1px] border-gray rounded-[12px] text-[14px] mt-[12px] hover:bg-gray hover:text-white">Analytics</button>
                                        <button className="px-[9px] py-[7px] text-gray border-[1px] border-gray rounded-[12px] text-[14px] mt-[12px] hover:bg-gray hover:text-white"><i className="fa-solid fa-pen"></i></button>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl bg-white shadow-[0_4px_24px_2px_rgba(20,25,38,0.05)] mb-[10px]  overflow-hidden">
                                <div className='shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)] rounded-[0.75rem] mb-[1rem]'>
                                    <div className='px-[24px] py-[18px] max-lg:px-[18px] max-sm:p-[10px]  bg-white  border-b border-[#eaedf1] hans flex justify-between'>
                                        <h4 className="font-[600] text-[#313b5e]">
                                            Customer Details
                                        </h4>
                                        <div><span className="text-[#22c55e] bg-[#d3f3df] text-[12px] px-[12px] py-[6px] rounded-[6px] font-[600]">Active User</span></div>
                                    </div>
                                    <div className='px-[24px] py-[15px] max-lg:px-[18px] max-sm:p-[10px]  bg-white'>
                                        <div className='flex     text-sm  border-b border-[#eaedf1] py-[13px]'>
                                            <div className='flex gap-[0.375rem]'>
                                                <p className='font-[600]'>Account ID  :</p>
                                            </div>
                                            <p className='text-sm text-[#313b5e]'>#AC-278699</p>
                                        </div>
                                        <div className='flex  text-sm  border-b border-[#eaedf1] py-[13px]'>
                                            <div className='flex gap-[0.375rem] '>
                                                <p className='font-[600]'>  Invoice Email :  </p>
                                            </div>
                                            <p className='text-sm text-[#313b5e]'>michaelaminer@dayrep.com</p>
                                        </div>
                                        <div className='flex  text-sm  border-b border-[#eaedf1] py-[13px]'>
                                            <div className='flex gap-[0.375rem] '>
                                                <p className='font-[600] text-nowrap'> Delivery Address :  </p>
                                            </div>
                                            <p className='text-sm text-[#313b5e]'>62, rue des Nations Unies 22000 SAINT-BRIEUC</p>
                                        </div>
                                        <div className='flex  text-sm border-b border-[#eaedf1]  py-[13px]'>
                                            <div className='flex gap-[0.375rem] '>
                                                <p className='font-[600]'> Language : </p>
                                            </div>
                                            <p className='text-sm text-[#313b5e]'>English</p>
                                        </div>
                                        <div className='flex  text-sm   py-[13px]'>
                                            <div className='flex gap-[0.375rem] '>
                                                <p className='font-[600]'> Latest Invoice Id : </p>
                                            </div>
                                            <p className='text-sm text-[#313b5e]'>#INV2540</p>
                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div className="rounded-xl bg-white shadow-[0_4px_24px_2px_rgba(20,25,38,0.05)] mb-[10px]  overflow-hidden">
                                <div className='shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)]  rounded-[0.75rem] mb-[1rem]'>
                                    <div className='px-[24px] py-[18px] max-lg:px-[18px] max-sm:p-[10px]  bg-white  border-b border-[#eaedf1] hans flex justify-between items-center'>
                                        <div>
                                            <h4 className="font-[600] text-[#313b5e]">
                                                Latest Invoice
                                            </h4>
                                            <p className="text-gray text-[14px]">Total 234 file, 2.5GB space used</p>

                                        </div>
                                        <div><span className="text-white bg-primary text-[12px] px-[12px] py-[8px] rounded-[6px] font-[600] text-nowrap ">View All</span></div>
                                    </div>
                                    <div className='px-[24px] py-[15px] max-lg:px-[18px] max-sm:p-[10px]  bg-white'>
                                        <div className="flex text-sm py-[13px]">
                                            <div className="flex gap-3 items-center w-full justify-between">
                                                <div className=" bg-white rounded-xl  w-[100%]">
                                                    {invoices.map((invoice, index) => (
                                                        <div key={index} className="flex justify-between items-center  py-3 text-sm">
                                                            <div className="flex gap-3 items-center">
                                                                <div className="bg-[#ffe2d5] text-primary h-[48px] w-[48px] rounded-full flex justify-center items-center">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                                                        <path fill="currentColor" d="m19.352 7.617l-3.96-3.563c-1.127-1.015-1.69-1.523-2.383-1.788L13 5c0 2.357 0 3.536.732 4.268S15.643 10 18 10h3.58c-.362-.704-1.012-1.288-2.228-2.383" />
                                                                        <path fill="currentColor" fillRule="evenodd" d="M10 22h4c3.771 0 5.657 0 6.828-1.172S22 17.771 22 14v-.437c0-.873 0-1.529-.043-2.063h-4.052c-1.097 0-2.067 0-2.848-.105c-.847-.114-1.694-.375-2.385-1.066c-.692-.692-.953-1.539-1.067-2.386c-.105-.781-.105-1.75-.105-2.848l.01-2.834q0-.124.02-.244C11.121 2 10.636 2 10.03 2C6.239 2 4.343 2 3.172 3.172C2 4.343 2 6.229 2 10v4c0 3.771 0 5.657 1.172 6.828S6.229 22 10 22m-2.013-2.953a.75.75 0 0 0 1.026 0l2-1.875a.75.75 0 0 0-1.026-1.094l-.737.69V13.5a.75.75 0 0 0-1.5 0v3.269l-.737-.691a.75.75 0 0 0-1.026 1.094z" clipRule="evenodd" />
                                                                    </svg>
                                                                </div>
                                                                <div>
                                                                    <p className="text-[#313b5e] text-[14px]">Invoice Id #{invoice.id}</p>
                                                                    <p className="text-gray text-[14px]">{invoice.date}</p>
                                                                </div>
                                                            </div>

                                                            {/* Dropdown */}
                                                            <div className="relative dropdown-container">
                                                                <i
                                                                    className="fa-solid fa-caret-down cursor-pointer text-gary"
                                                                    onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                                                                ></i>
                                                                {openDropdown === index && (
                                                                    <div className="absolute right-0 mt-2 w-32 bg-white  rounded shadow-xl z-10">
                                                                        <div
                                                                            className="px-4 py-2  cursor-pointer text-sm text-gray"
                                                                            onClick={() => {
                                                                                console.log("Download PDF for", invoice.id);
                                                                                setOpenDropdown(null);
                                                                            }}
                                                                        >
                                                                            Download
                                                                        </div>
                                                                        <div
                                                                            className="px-4 py-2 text-gray cursor-pointer text-sm"
                                                                            onClick={() => {
                                                                                console.log("Send Email for", invoice.id);
                                                                                setOpenDropdown(null);
                                                                            }}
                                                                        >
                                                                            Share
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>


                        </div>


                        <div className="w-[70%] max-2xl:w-[60%] max-lg:w-[100%]  rounded-xl  max-lg:mt-[24px]">
                            <div className="grid grid-cols-3 gap-4 max-xl:grid-cols-1 max-sm:gap-2 ">
                                <div onClick={() => {
                                    setlayer('whishlist')
                                }} className="border hover:bg-[#f8f8f8] cursor-pointer  bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] p-[20px] rounded-[10px] flex justify-between">
                                    <div>
                                        <h4 className="mb-2 text-[#313b5e] text-[16px] font-[600]">Total Whishlist</h4>
                                        <p className="text-[22px] text-[#5d7186]">490</p>
                                    </div>
                                    <div className="bg-[#ff6c2f1a] text-primary h-[56px] w-[56px] rounded-[8px] flex justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24"><path fill="currentColor" d="M7.245 2h9.51c1.159 0 1.738 0 2.206.163a3.05 3.05 0 0 1 1.881 1.936C21 4.581 21 5.177 21 6.37v14.004c0 .858-.985 1.314-1.608.744a.946.946 0 0 0-1.284 0l-.483.442a1.657 1.657 0 0 1-2.25 0a1.657 1.657 0 0 0-2.25 0a1.657 1.657 0 0 1-2.25 0a1.657 1.657 0 0 0-2.25 0a1.657 1.657 0 0 1-2.25 0l-.483-.442a.946.946 0 0 0-1.284 0c-.623.57-1.608.114-1.608-.744V6.37c0-1.193 0-1.79.158-2.27c.3-.913.995-1.629 1.881-1.937C5.507 2 6.086 2 7.245 2" opacity=".5"></path><path fill="currentColor" d="M7 6.75a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5zm3.5 0a.75.75 0 0 0 0 1.5H17a.75.75 0 0 0 0-1.5zM7 10.25a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5zm3.5 0a.75.75 0 0 0 0 1.5H17a.75.75 0 0 0 0-1.5zM7 13.75a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5zm3.5 0a.75.75 0 0 0 0 1.5H17a.75.75 0 0 0 0-1.5z"></path></svg></div>
                                </div>
                                <div onClick={() => {
                                    setlayer('cart')
                                }} className="border hover:bg-[#f8f8f8]  bg-white border-[#EBE9F1] cursor-pointer shadow-[0px_4px_24px_0px_#0000000F] p-[20px] rounded-[10px] flex justify-between">
                                    <div>
                                        <h4 className="mb-2 text-[#313b5e] text-[16px] font-[600]">Total Cart</h4>
                                        <p className="text-[22px] text-[#5d7186]">490</p>
                                    </div>
                                    <div className="bg-[#ff6c2f1a] text-primary h-[56px] w-[56px] rounded-[8px] flex justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24"><path fill="currentColor" d="M8.422 20.618C10.178 21.54 11.056 22 12 22V12L2.638 7.073l-.04.067C2 8.154 2 9.417 2 11.942v.117c0 2.524 0 3.787.597 4.801c.598 1.015 1.674 1.58 3.825 2.709z"></path><path fill="currentColor" d="m17.577 4.432l-2-1.05C13.822 2.461 12.944 2 12 2c-.945 0-1.822.46-3.578 1.382l-2 1.05C4.318 5.536 3.242 6.1 2.638 7.072L12 12l9.362-4.927c-.606-.973-1.68-1.537-3.785-2.641" opacity=".7"></path><path fill="currentColor" d="m21.403 7.14l-.041-.067L12 12v10c.944 0 1.822-.46 3.578-1.382l2-1.05c2.151-1.129 3.227-1.693 3.825-2.708c.597-1.014.597-2.277.597-4.8v-.117c0-2.525 0-3.788-.597-4.802" opacity=".5"></path><path fill="currentColor" d="m6.323 4.484l.1-.052l1.493-.784l9.1 5.005l4.025-2.011q.205.232.362.498c.15.254.262.524.346.825L17.75 9.964V13a.75.75 0 0 1-1.5 0v-2.286l-3.5 1.75v9.44A3 3 0 0 1 12 22c-.248 0-.493-.032-.75-.096v-9.44l-8.998-4.5c.084-.3.196-.57.346-.824q.156-.266.362-.498l9.04 4.52l3.387-1.693z"></path></svg></div>
                                </div>
                                <div onClick={() => {
                                    setlayer('order')
                                }} className="border  hover:bg-[#f8f8f8] bg-white border-[#EBE9F1] cursor-pointer shadow-[0px_4px_24px_0px_#0000000F] p-[20px] rounded-[10px] flex justify-between">
                                    <div>
                                        <h4 className="mb-2 text-[#313b5e] text-[16px] font-[600]">Total Order</h4>
                                        <p className="text-[22px] text-[#5d7186]">490</p>
                                    </div>
                                    <div className="bg-[#ff6c2f1a] text-primary h-[56px] w-[56px] rounded-[8px] flex justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12c0 1.6.376 3.112 1.043 4.453c.178.356.237.763.134 1.148l-.595 2.226a1.3 1.3 0 0 0 1.591 1.592l2.226-.596a1.63 1.63 0 0 1 1.149.133A9.96 9.96 0 0 0 12 22" opacity=".5"></path><path fill="currentColor" d="M12.75 8a.75.75 0 0 0-1.5 0v.01c-1.089.275-2 1.133-2 2.323c0 1.457 1.365 2.417 2.75 2.417c.824 0 1.25.533 1.25.917s-.426.916-1.25.916s-1.25-.532-1.25-.916a.75.75 0 0 0-1.5 0c0 1.19.911 2.049 2 2.323V16a.75.75 0 0 0 1.5 0v-.01c1.089-.274 2-1.133 2-2.323c0-1.457-1.365-2.417-2.75-2.417c-.824 0-1.25-.533-1.25-.917s.426-.916 1.25-.916s1.25.532 1.25.916a.75.75 0 0 0 1.5 0c0-1.19-.911-2.048-2-2.323z"></path></svg></div>
                                </div>

                            </div>

                            <div className=" overflow-x-scroll over__scroll mb-[24px] ">
                                {layer == 'whishlist' && (

                                    <div className="border mt-[30px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F]  rounded-[10px]">
                                        <div className="p-[20px] flex  gap-4 max-lg:items-center justify-between">
                                            <div>
                                                <h3 className="font-[600] text-[16px] text-[#313b5e] hans">All wishlist List</h3>
                                            </div>


                                        </div>


                                        <div className="min-h-[45vh] px-[30px]">
                                            <table className="w-full ">
                                                <thead className="border-y bg-[#fcfcfd] border-[#ddd]">

                                                    <tr className="max-sm:h-[40px] h-[44px] ">
                                                        <th className="px-[30px]  max-xl:px-[10px]">
                                                            <div className="text-start  text-[14px] font-bold text-[#5d7186] sans flex gap-2 items-center">

                                                                Product

                                                            </div>
                                                        </th>

                                                        <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap  max-md:text-[13px] max-sm:px-[10px]">User</th>
                                                        <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap  max-md:text-[13px] max-sm:px-[10px]">Total Price</th>

                                                    </tr>


                                                </thead>
                                                <tbody className="">
                                                    {displayedData2?.map((item, index) => (
                                                        <tr
                                                            key={index}
                                                            className="h-[40px] sm:h-[42px] transition-all duration-200 bg-white  border-b border-[#eaedf1]"

                                                        >
                                                            <td className="text-sm text-[#5E5873] flex  px-[30px] max-xl:px-[10px] max-sm:px-[5px] max-sm:min-w-[120px]   items-center gap-2 my-[15px] max-md:gap-1 max-md:text-[12px]">


                                                                <div className="h-[46px] min-w-[46px] max-md:min-w-[40px] max-md:max-h-[40px] bg-[#eef2f7] rounded-[12px] flex items-center justify-center overflow-hidden">
                                                                    <img src={import.meta.env.VITE_API_BASE_URL + item.product_img} alt="category_img" className="object-cover h-[56px] w-[56px] max-md:w-[40px] max-md:h-[40px]" />
                                                                </div>

                                                                <div className="">
                                                                    {item.product_name}
                                                                </div>

                                                            </td>
                                                            <td className=" text-[#5E5873] text-center px-[30px]  max-xl:px-[10px] max-sm:px-[5px]   text-[12px]">{item.username}</td>

                                                            <td className=" text-[#5E5873] text-center px-[30px]  max-xl:px-[10px] max-sm:px-[5px]  text-[12px]">{item.total_price}</td>



                                                        </tr>
                                                    ))}
                                                </tbody>

                                            </table>
                                        </div>
                                        {wishlist?.data?.length > itemsPerPage && (
                                            <div className="flex items-center max-md:justify-center justify-end my-[20px] mx-[30px]  rounded-[8px] ">

                                                <button
                                                    onClick={() => setCurrentPage2((prev) => Math.max(prev - 1, 1))}
                                                    disabled={currentPage2 === 1}
                                                    className={`h-[32px] md:h-[32px] bg-[#ff6c2f1a] flex items-center justify-center border-[1px] text-[14px] border-[#eaedf1] px-[15px] transition-colors duration-200 hover:text-[#ff6c2f] ${currentPage2 === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                                                >
                                               <svg xmlns="http://www.w3.org/2000/svg" class="w-[6px] h-[10px] sm:w-[8px] sm:h-[16px]" viewBox="0 0 6 10" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.80868 0.175823C5.92127 0.288549 5.9845 0.441354 5.9845 0.600673C5.9845 0.759992 5.92127 0.912797 5.80868 1.02552L2.22552 4.60869L5.80868 8.19185C5.86775 8.24689 5.91512 8.31326 5.94798 8.38701C5.98084 8.46076 5.99851 8.54037 5.99994 8.62109C6.00136 8.70182 5.98651 8.782 5.95627 8.85686C5.92604 8.93172 5.88103 8.99972 5.82394 9.05681C5.76685 9.1139 5.69885 9.15891 5.62399 9.18914C5.54913 9.21938 5.46895 9.23423 5.38822 9.23281C5.3075 9.23138 5.22789 9.21371 5.15414 9.18085C5.08039 9.14799 5.01402 9.10062 4.95898 9.04155L0.950968 5.03354C0.838382 4.92081 0.775143 4.76801 0.775143 4.60869C0.775143 4.44937 0.838382 4.29656 0.950968 4.18384L4.95898 0.175823C5.07171 0.0632379 5.22451 -3.3899e-08 5.38383 -2.69349e-08C5.54315 -1.99709e-08 5.69596 0.0632379 5.80868 0.175823Z" fill="#515151"></path></svg>
                                                </button>


                                                <ul className="flex h-[32px] md:h-[32px] text-[14px]   border-[#eaedf1]">
                                                    {currentPage2 > 2 && (
                                                        <>
                                                            <li
                                                                onClick={() => setCurrentPage2(1)}
                                                                className="h-[32px] md:h-[32px] w-[32px] md:w-[32px] flex items-center justify-center text-[16px] md:text-[19px] font-semibold cursor-pointer text-[#5d7186] hover:bg-[#ff6c2f1a]"
                                                            >
                                                                1
                                                            </li>
                                                            <li className="h-[32px] md:h-[32px] w-[32px] md:w-[32px] flex items-center justify-center text-[16px] md:text-[19px] font-semibold text-[#5d7186]">
                                                                ...
                                                            </li>
                                                        </>
                                                    )}

                                                    {Array.from({ length: totalPages2 }, (_, i) => i + 1).map((page) => {
                                                        if (page >= currentPage2 - 2 && page <= currentPage2 + 2) {
                                                            return (
                                                                <li
                                                                    key={page}
                                                                    onClick={() => setCurrentPage2(page)}
                                                                    className={`h-[32px] md:h-[32px] w-[32px] md:w-[32px] flex items-center justify-center text-[16px] md:text-[19px] font-semibold transition-all duration-200 ${currentPage2 === page ? "bg-[#ff6c2f] text-white" : "bg-transparent text-[#5d7186] cursor-pointer hover:bg-[#ff6c2f1a]"}`}
                                                                >
                                                                    {page}
                                                                </li>
                                                            );
                                                        }
                                                        return null;
                                                    })}

                                                    {currentPage2 < totalPages2 - 2 && (
                                                        <>
                                                            <li className="h-[32px] md:h-[32px] w-[32px] md:w-[32px] flex items-center justify-center text-[16px] md:text-[19px] font-semibold text-[#5d7186]">
                                                                ...
                                                            </li>
                                                            <li
                                                                onClick={() => setCurrentPage2(totalPages2)}
                                                                className="h-[32px] md:h-[32px] w-[32px] md:w-[32px] flex items-center justify-center text-[16px] md:text-[19px] font-semibold cursor-pointer text-[#5d7186] hover:bg-[#ff6c2f1a]"
                                                            >
                                                                {totalPages2}
                                                            </li>
                                                        </>
                                                    )}
                                                </ul>


                                                <button
                                                    onClick={() => setCurrentPage2((prev) => Math.min(prev + 1, totalPages2))}
                                                    disabled={currentPage2 === totalPages2}
                                                    className={`h-[32px] md:h-[32px] bg-[#ff6c2f1a] border-[1px] border-[#eaedf1] flex items-center text-[14px] justify-center px-[15px] transition-colors duration-200 hover:text-[#ff6c2f] ${currentPage2 === totalPages2 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                                                >
                                                   <svg xmlns="http://www.w3.org/2000/svg" class="w-[6px] h-[10px] sm:w-[8px] sm:h-[16px]" viewBox="0 0 6 10" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.19135 0.175823C0.0787642 0.288549 0.0155259 0.441354 0.0155259 0.600673C0.0155259 0.759992 0.0787643 0.912797 0.19135 1.02552L3.77451 4.60869L0.19135 8.19185C0.132283 8.24689 0.0849057 8.31326 0.0520464 8.38701C0.0191871 8.46076 0.00151821 8.54037 9.39398e-05 8.62109C-0.00133033 8.70182 0.0135193 8.782 0.0437565 8.85686C0.0739938 8.93172 0.119 8.99972 0.176089 9.05681C0.233178 9.1139 0.301181 9.15891 0.376041 9.18914C0.450901 9.21938 0.531085 9.23423 0.611808 9.23281C0.692532 9.23138 0.772142 9.21371 0.845889 9.18085C0.919636 9.14799 0.986009 9.10062 1.04105 9.04155L5.04906 5.03354C5.16165 4.92081 5.22489 4.76801 5.22489 4.60869C5.22489 4.44937 5.16165 4.29656 5.04906 4.18384L1.04105 0.175823C0.928323 0.0632379 0.775518 -3.3899e-08 0.616199 -2.69349e-08C0.45688 -1.99709e-08 0.304075 0.0632379 0.19135 0.175823Z" fill="#515151"></path></svg>
                                                </button>
                                            </div>

                                        )}


                                    </div>

                                )}
                                {layer == 'cart' && (



                                    <div className="border mt-[30px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F]  rounded-[10px]">
                                        <div className="p-[20px] flex  gap-4 max-lg:items-center justify-between">
                                            <div>
                                                <h3 className="font-[600] text-[16px] text-[#313b5e] hans">All Cart List</h3>
                                            </div>


                                        </div>


                                        <div className="min-h-[45vh] px-[30px]">
                                            <table className="w-full ">
                                                <thead className="border-y bg-[#fcfcfd] border-[#ddd]">

                                                    <tr className="max-sm:h-[40px] h-[44px] ">
                                                        <th className="px-[30px]  max-xl:px-[10px]">
                                                            <div className="text-start  text-[14px] font-bold text-[#5d7186] sans flex gap-2 items-center">
                                                                Product
                                                            </div>
                                                        </th>

                                                        <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap  max-md:text-[13px] max-sm:px-[10px]">Quantity</th>
                                                        <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap  max-md:text-[13px] max-sm:px-[10px]">Total Price</th>
                                                        {/* <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-md:text-[13px] max-sm:px-[10px]">Action</th> */}
                                                    </tr>


                                                </thead>
                                                <tbody className="">
                                                    {displayedData1?.map((item1, index) => (
                                                        <tr
                                                            key={index}
                                                            className="h-[40px] sm:h-[42px] transition-all duration-200 bg-white  border-b border-[#eaedf1]"

                                                        >
                                                            <td className="text-sm text-[#5E5873] flex  px-[30px] max-xl:px-[10px] max-sm:px-[5px] max-sm:min-w-[120px]   items-center gap-2 my-[15px] max-md:gap-1 max-md:text-[12px]">


                                                                {/* <div className="h-[46px] min-w-[46px] max-md:min-w-[40px] max-md:max-h-[40px] bg-[#eef2f7] rounded-[12px] flex items-center justify-center overflow-hidden">
                                                                    <img src={import.meta.env.VITE_API_BASE_URL + item.product_img} alt="category_img" className="object-cover h-[56px] w-[56px] max-md:w-[40px] max-md:h-[40px]" />
                                                                </div> */}

                                                                <div className="">
                                                                    {item1.product_name}
                                                                </div>

                                                            </td>
                                                            <td className=" text-[#5E5873] text-center px-[30px]  max-xl:px-[10px] max-sm:px-[5px]  text-[12px]">{item1.quantity}</td>
                                                            <td className=" text-[#5E5873] text-center px-[30px]  max-xl:px-[10px] max-sm:px-[5px]  text-[12px]">{item1.total_price}</td>



                                                        </tr>
                                                    ))}
                                                </tbody>

                                            </table>
                                        </div>
                                        {cart?.data?.length > itemsPerPage && (
                                            <div className="flex items-center max-md:justify-center justify-end my-[20px] mx-[30px]  rounded-[8px] ">

                                                <button
                                                    onClick={() => setCurrentPage1((prev) => Math.max(prev - 1, 1))}
                                                    disabled={currentPage1 === 1}
                                                    className={`h-[32px] md:h-[32px] bg-[#ff6c2f1a] flex items-center justify-center border-[1px] text-[14px] border-[#eaedf1] px-[15px] transition-colors duration-200 hover:text-[#ff6c2f] ${currentPage1 === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                                                >
                                                  <svg xmlns="http://www.w3.org/2000/svg" class="w-[6px] h-[10px] sm:w-[8px] sm:h-[16px]" viewBox="0 0 6 10" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.80868 0.175823C5.92127 0.288549 5.9845 0.441354 5.9845 0.600673C5.9845 0.759992 5.92127 0.912797 5.80868 1.02552L2.22552 4.60869L5.80868 8.19185C5.86775 8.24689 5.91512 8.31326 5.94798 8.38701C5.98084 8.46076 5.99851 8.54037 5.99994 8.62109C6.00136 8.70182 5.98651 8.782 5.95627 8.85686C5.92604 8.93172 5.88103 8.99972 5.82394 9.05681C5.76685 9.1139 5.69885 9.15891 5.62399 9.18914C5.54913 9.21938 5.46895 9.23423 5.38822 9.23281C5.3075 9.23138 5.22789 9.21371 5.15414 9.18085C5.08039 9.14799 5.01402 9.10062 4.95898 9.04155L0.950968 5.03354C0.838382 4.92081 0.775143 4.76801 0.775143 4.60869C0.775143 4.44937 0.838382 4.29656 0.950968 4.18384L4.95898 0.175823C5.07171 0.0632379 5.22451 -3.3899e-08 5.38383 -2.69349e-08C5.54315 -1.99709e-08 5.69596 0.0632379 5.80868 0.175823Z" fill="#515151"></path></svg>
                                                </button>


                                                <ul className="flex h-[32px] md:h-[32px] text-[14px]   border-[#eaedf1]">
                                                    {currentPage1 > 2 && (
                                                        <>
                                                            <li
                                                                onClick={() => setCurrentPage1(1)}
                                                                className="h-[32px] md:h-[32px] w-[32px] md:w-[32px] flex items-center justify-center text-[16px] md:text-[19px] font-semibold cursor-pointer text-[#5d7186] hover:bg-[#ff6c2f1a]"
                                                            >
                                                                1
                                                            </li>
                                                            <li className="h-[32px] md:h-[32px] w-[32px] md:w-[32px] flex items-center justify-center text-[16px] md:text-[19px] font-semibold text-[#5d7186]">
                                                                ...
                                                            </li>
                                                        </>
                                                    )}

                                                    {Array.from({ length: totalPages1 }, (_, i) => i + 1).map((page) => {
                                                        if (page >= currentPage1 - 2 && page <= currentPage1 + 2) {
                                                            return (
                                                                <li
                                                                    key={page}
                                                                    onClick={() => setCurrentPage1(page)}
                                                                    className={`h-[32px] md:h-[32px] w-[32px] md:w-[32px] flex items-center justify-center text-[16px] md:text-[19px] font-semibold transition-all duration-200 ${currentPage1 === page ? "bg-[#ff6c2f] text-white" : "bg-transparent text-[#5d7186] cursor-pointer hover:bg-[#ff6c2f1a]"}`}
                                                                >
                                                                    {page}
                                                                </li>
                                                            );
                                                        }
                                                        return null;
                                                    })}

                                                    {currentPage1 < totalPages1 - 2 && (
                                                        <>
                                                            <li className="h-[32px] md:h-[32px] w-[32px] md:w-[32px] flex items-center justify-center text-[16px] md:text-[19px] font-semibold text-[#5d7186]">
                                                                ...
                                                            </li>
                                                            <li
                                                                onClick={() => setCurrentPage1(totalPages1)}
                                                                className="h-[32px] md:h-[32px] w-[32px] md:w-[32px] flex items-center justify-center text-[16px] md:text-[19px] font-semibold cursor-pointer text-[#5d7186] hover:bg-[#ff6c2f1a]"
                                                            >
                                                                {totalPages1}
                                                            </li>
                                                        </>
                                                    )}
                                                </ul>


                                                <button
                                                    onClick={() => setCurrentPage1((prev) => Math.min(prev + 1, totalPages1))}
                                                    disabled={currentPage1 === totalPages1}
                                                    className={`h-[32px] md:h-[32px] bg-[#ff6c2f1a] border-[1px] border-[#eaedf1] flex items-center text-[14px] justify-center px-[15px] transition-colors duration-200 hover:text-[#ff6c2f] ${currentPage1 === totalPages1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                                                >
                                                     <svg xmlns="http://www.w3.org/2000/svg" class="w-[6px] h-[10px] sm:w-[8px] sm:h-[16px]" viewBox="0 0 6 10" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.19135 0.175823C0.0787642 0.288549 0.0155259 0.441354 0.0155259 0.600673C0.0155259 0.759992 0.0787643 0.912797 0.19135 1.02552L3.77451 4.60869L0.19135 8.19185C0.132283 8.24689 0.0849057 8.31326 0.0520464 8.38701C0.0191871 8.46076 0.00151821 8.54037 9.39398e-05 8.62109C-0.00133033 8.70182 0.0135193 8.782 0.0437565 8.85686C0.0739938 8.93172 0.119 8.99972 0.176089 9.05681C0.233178 9.1139 0.301181 9.15891 0.376041 9.18914C0.450901 9.21938 0.531085 9.23423 0.611808 9.23281C0.692532 9.23138 0.772142 9.21371 0.845889 9.18085C0.919636 9.14799 0.986009 9.10062 1.04105 9.04155L5.04906 5.03354C5.16165 4.92081 5.22489 4.76801 5.22489 4.60869C5.22489 4.44937 5.16165 4.29656 5.04906 4.18384L1.04105 0.175823C0.928323 0.0632379 0.775518 -3.3899e-08 0.616199 -2.69349e-08C0.45688 -1.99709e-08 0.304075 0.0632379 0.19135 0.175823Z" fill="#515151"></path></svg>
                                                </button>
                                            </div>

                                        )}


                                    </div>
                                )}
                                {layer == 'order' && (



                                    <div className="border mt-[30px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F]  rounded-[10px]">
                                        <div className="p-[20px] flex  gap-4 max-lg:items-center justify-between">
                                            <div>
                                                <h3 className="font-[600] text-[16px] text-[#313b5e] hans">All Order List</h3>
                                            </div>


                                        </div>


                                        <div className="min-h-[45vh] px-[30px]">
                                            <table className="w-full ">
                                                <thead className="border-y bg-[#fcfcfd] border-[#ddd]">

                                                    <tr className="max-sm:h-[40px] h-[44px] ">
                                                        <th className="px-[30px]  max-xl:px-[10px]">
                                                            <div className="text-start  text-[14px] font-bold text-[#5d7186] sans flex gap-2 items-center">

                                                                Order ID

                                                            </div>
                                                        </th>

                                                        <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-lg:hidden max-md:text-[13px] max-sm:px-[10px]">Create at</th>
                                                        <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap  max-md:text-[13px] max-sm:px-[10px]">Total Price</th>
                                                        <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-md:text-[13px] max-sm:px-[10px]">User</th>
                                                        <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-md:text-[13px] max-sm:px-[10px]">Status</th>
                                                        {/* <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-md:text-[13px] max-sm:px-[10px]">Action</th> */}
                                                    </tr>


                                                </thead>
                                                <tbody className="">
                                                    {displayedData?.map((item, index) => (
                                                        <tr
                                                            key={index}
                                                            className="h-[40px] sm:h-[42px] transition-all duration-200 bg-white  border-b border-[#eaedf1]"

                                                        >
                                                            <td className=" text-[#5E5873] flex  px-[30px]  max-xl:px-[10px] max-sm:px-[5px]   items-center gap-2 my-[15px] max-md:gap-1 text-[12px]">
                                                                <div className="">
                                                                    {item.order_id}
                                                                </div>
                                                            </td>
                                                            <td className=" text-[#5E5873] text-center px-[30px]  max-xl:px-[10px] max-sm:px-[5px]  max-lg:hidden text-[12px]">{item.created_at}</td>
                                                            <td className=" text-[#5E5873] text-center px-[30px]  max-xl:px-[10px] max-sm:px-[5px]  text-[12px]">{item.total_amount}</td>
                                                            <td className=" text-[#5E5873] text-center px-[30px]  max-xl:px-[10px] max-sm:px-[5px]  text-[12px]">{profile?.data?.username}</td>
                                                            <td className=" text-[#5E5873] text-center px-[30px]  max-xl:px-[10px] max-sm:px-[5px] max-md:text-[12px]">
                                                                <button
                                                                    className={`px-[16px] py-[3px] rounded-[400px] font-medium text-[12px]
    ${item?.status === 'Pending' && 'bg-[#fde68a] text-[#92400e]'} 
    ${item?.status === 'Processing' && 'bg-[#bfdbfe] text-[#1e3a8a]'}
    ${item?.status === 'Shipped' && 'bg-[#ddd6fe] text-[#6b21a8]'}
    ${item?.status === 'Delivered' && 'bg-[#bbf7d0] text-[#166534]'}
  `}
                                                                >
                                                                    {item?.status}
                                                                </button>

                                                            </td>


                                                        </tr>
                                                    ))}
                                                </tbody>

                                            </table>
                                        </div>
                                        {categories1?.length > itemsPerPage && (
                                            <div className="flex items-center max-md:justify-center justify-end my-[20px] mx-[30px]  rounded-[8px] ">

                                                <button
                                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                                    disabled={currentPage === 1}
                                                    className={`h-[32px] md:h-[32px] bg-[#ff6c2f1a] flex items-center justify-center border-[1px] text-[14px] border-[#eaedf1] px-[15px] transition-colors duration-200 hover:text-[#ff6c2f] ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-[6px] h-[10px] sm:w-[8px] sm:h-[16px]" viewBox="0 0 6 10" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.80868 0.175823C5.92127 0.288549 5.9845 0.441354 5.9845 0.600673C5.9845 0.759992 5.92127 0.912797 5.80868 1.02552L2.22552 4.60869L5.80868 8.19185C5.86775 8.24689 5.91512 8.31326 5.94798 8.38701C5.98084 8.46076 5.99851 8.54037 5.99994 8.62109C6.00136 8.70182 5.98651 8.782 5.95627 8.85686C5.92604 8.93172 5.88103 8.99972 5.82394 9.05681C5.76685 9.1139 5.69885 9.15891 5.62399 9.18914C5.54913 9.21938 5.46895 9.23423 5.38822 9.23281C5.3075 9.23138 5.22789 9.21371 5.15414 9.18085C5.08039 9.14799 5.01402 9.10062 4.95898 9.04155L0.950968 5.03354C0.838382 4.92081 0.775143 4.76801 0.775143 4.60869C0.775143 4.44937 0.838382 4.29656 0.950968 4.18384L4.95898 0.175823C5.07171 0.0632379 5.22451 -3.3899e-08 5.38383 -2.69349e-08C5.54315 -1.99709e-08 5.69596 0.0632379 5.80868 0.175823Z" fill="#515151"></path></svg>
                                                </button>


                                                <ul className="flex h-[32px] md:h-[32px] text-[14px]   border-[#eaedf1]">
                                                    {currentPage > 2 && (
                                                        <>
                                                            <li
                                                                onClick={() => setCurrentPage(1)}
                                                                className="h-[32px] md:h-[32px] w-[32px] md:w-[32px] flex items-center justify-center text-[16px] md:text-[19px] font-semibold cursor-pointer text-[#5d7186] hover:bg-[#ff6c2f1a]"
                                                            >
                                                                1
                                                            </li>
                                                            <li className="h-[32px] md:h-[32px] w-[32px] md:w-[32px] flex items-center justify-center text-[16px] md:text-[19px] font-semibold text-[#5d7186]">
                                                                ...
                                                            </li>
                                                        </>
                                                    )}

                                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                                        if (page >= currentPage - 2 && page <= currentPage + 2) {
                                                            return (
                                                                <li
                                                                    key={page}
                                                                    onClick={() => setCurrentPage(page)}
                                                                    className={`h-[32px] md:h-[32px] w-[32px] md:w-[32px] flex items-center justify-center text-[16px] md:text-[19px] font-semibold transition-all duration-200 ${currentPage === page ? "bg-[#ff6c2f] text-white" : "bg-transparent text-[#5d7186] cursor-pointer hover:bg-[#ff6c2f1a]"}`}
                                                                >
                                                                    {page}
                                                                </li>
                                                            );
                                                        }
                                                        return null;
                                                    })}

                                                    {currentPage < totalPages - 2 && (
                                                        <>
                                                            <li className="h-[32px] md:h-[32px] w-[32px] md:w-[32px] flex items-center justify-center text-[16px] md:text-[19px] font-semibold text-[#5d7186]">
                                                                ...
                                                            </li>
                                                            <li
                                                                onClick={() => setCurrentPage(totalPages)}
                                                                className="h-[32px] md:h-[32px] w-[32px] md:w-[32px] flex items-center justify-center text-[16px] md:text-[19px] font-semibold cursor-pointer text-[#5d7186] hover:bg-[#ff6c2f1a]"
                                                            >
                                                                {totalPages}
                                                            </li>
                                                        </>
                                                    )}
                                                </ul>


                                                <button
                                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                                    disabled={currentPage === totalPages}
                                                    className={`h-[32px] md:h-[32px] bg-[#ff6c2f1a] border-[1px] border-[#eaedf1] flex items-center text-[14px] justify-center px-[15px] transition-colors duration-200 hover:text-[#ff6c2f] ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-[6px] h-[10px] sm:w-[8px] sm:h-[16px]" viewBox="0 0 6 10" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.19135 0.175823C0.0787642 0.288549 0.0155259 0.441354 0.0155259 0.600673C0.0155259 0.759992 0.0787643 0.912797 0.19135 1.02552L3.77451 4.60869L0.19135 8.19185C0.132283 8.24689 0.0849057 8.31326 0.0520464 8.38701C0.0191871 8.46076 0.00151821 8.54037 9.39398e-05 8.62109C-0.00133033 8.70182 0.0135193 8.782 0.0437565 8.85686C0.0739938 8.93172 0.119 8.99972 0.176089 9.05681C0.233178 9.1139 0.301181 9.15891 0.376041 9.18914C0.450901 9.21938 0.531085 9.23423 0.611808 9.23281C0.692532 9.23138 0.772142 9.21371 0.845889 9.18085C0.919636 9.14799 0.986009 9.10062 1.04105 9.04155L5.04906 5.03354C5.16165 4.92081 5.22489 4.76801 5.22489 4.60869C5.22489 4.44937 5.16165 4.29656 5.04906 4.18384L1.04105 0.175823C0.928323 0.0632379 0.775518 -3.3899e-08 0.616199 -2.69349e-08C0.45688 -1.99709e-08 0.304075 0.0632379 0.19135 0.175823Z" fill="#515151"></path></svg>
                                                </button>
                                            </div>

                                        )}


                                    </div>
                                )}

                            </div>

                            <div className="flex gap-2 max-xl:block">
                                <div className="rounded-xl bg-white shadow-[0_4px_24px_2px_rgba(20,25,38,0.05)] mb-[10px] w-[50%] max-xl:w-[100%]">
                                    <img src="https://techzaa.in/larkon/admin/assets/images/user-profile.png" className="max-lg:w-[80%] m-auto"></img>
                                    <div className="pb-[20px]">
                                        <h4 className="flex gap-2 text-[18px] font-[600] hans items-center justify-center mb-[5px]"><i className="fa-solid fa-coins text-primary"></i>3,764 <span className="text-gray text-[15px]">Points Earned</span></h4>
                                        <p className="text-gray text-[14px] text-center">Collect reward points with each purchase.</p>
                                    </div>
                                    <div className="flex gap-2 border-t border-[#eaedf1] pt-4 p-4">
                                        <button className="w-[100%] h-[39px]  bg-primary  text-white   rounded-[12px] text-[14px] mt-[12px]">Earn Point</button>
                                        <button className="w-[100%] h-[39px] text-gray border-[1px] border-gray rounded-[12px] text-[14px] mt-[12px] hover:bg-gray hover:text-white">View Items</button>

                                    </div>
                                </div>

                                <div className="w-[50%]  max-xl:w-[100%]">
                                    <div className="rounded-xl bg-white shadow-[0_4px_24px_2px_rgba(20,25,38,0.05)] mb-[10px] w-[100%] p-[24px]">
                                        <div className="flex justify-between items-center">
                                            <div className="flex gap-5">
                                                <div className="bg-[#eef2f7] text-[48px] h-[48px] w-[48px] text-gray flex justify-center items-center rounded-full">
                                                    <i className="fa-solid fa-arrow-down text-[30px]"></i>
                                                </div>
                                                <div>
                                                    <h4 className="text-[#313b5e] text-[14px] font-[500]">Payment Arrived</h4>
                                                    <p className="text-gray text-[14px]">23 min ago</p>
                                                </div>
                                            </div>
                                            <div className="">
                                                <h4 className="text-gray">$1,340</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rounded-xl bg-white shadow-[0_4px_24px_2px_rgba(20,25,38,0.05)] mb-[10px] w-[100%]">
                                        <div className="flex justify-between items-center p-[24px]">
                                            <div className="flex gap-5 items-center">
                                                <div className="bg-[#eef2f7] text-[48px]">
                                                    <img src="https://techzaa.in/larkon/admin/assets/images/users/avatar-2.jpg" className=" h-[48px] w-[48px]  rounded-full" />
                                                </div>
                                                <div>
                                                    <h4 className="text-[#313b5e] text-[14px] font-[500]">Michael A. Miner</h4>
                                                    <p className="text-gray text-[14px]">Welcome Back</p>
                                                </div>
                                            </div>
                                            <div className="text-gray">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M14.279 2.152C13.909 2 13.439 2 12.5 2s-1.408 0-1.779.152a2 2 0 0 0-1.09 1.083c-.094.223-.13.484-.145.863a1.62 1.62 0 0 1-.796 1.353a1.64 1.64 0 0 1-1.579.008c-.338-.178-.583-.276-.825-.308a2.03 2.03 0 0 0-1.49.396c-.318.242-.553.646-1.022 1.453c-.47.807-.704 1.21-.757 1.605c-.07.526.074 1.058.4 1.479c.148.192.357.353.68.555c.477.297.783.803.783 1.361s-.306 1.064-.782 1.36c-.324.203-.533.364-.682.556a2 2 0 0 0-.399 1.479c.053.394.287.798.757 1.605s.704 1.21 1.022 1.453c.424.323.96.465 1.49.396c.242-.032.487-.13.825-.308a1.64 1.64 0 0 1 1.58.008c.486.28.774.795.795 1.353c.015.38.051.64.145.863c.204.49.596.88 1.09 1.083c.37.152.84.152 1.779.152s1.409 0 1.779-.152a2 2 0 0 0 1.09-1.083c.094-.223.13-.483.145-.863c.02-.558.309-1.074.796-1.353a1.64 1.64 0 0 1 1.579-.008c.338.178.583.276.825.308c.53.07 1.066-.073 1.49-.396c.318-.242.553-.646 1.022-1.453c.47-.807.704-1.21.757-1.605a2 2 0 0 0-.4-1.479c-.148-.192-.357-.353-.68-.555c-.477-.297-.783-.803-.783-1.361s.306-1.064.782-1.36c.324-.203.533-.364.682-.556a2 2 0 0 0 .399-1.479c-.053-.394-.287-.798-.757-1.605s-.704-1.21-1.022-1.453a2.03 2.03 0 0 0-1.49-.396c-.242.032-.487.13-.825.308a1.64 1.64 0 0 1-1.58-.008a1.62 1.62 0 0 1-.795-1.353c-.015-.38-.051-.64-.145-.863a2 2 0 0 0-1.09-1.083M12.5 15c1.67 0 3.023-1.343 3.023-3S14.169 9 12.5 9s-3.023 1.343-3.023 3s1.354 3 3.023 3" clipRule="evenodd"></path></svg>

                                            </div>
                                        </div>
                                        <div className=" p-[24px] max-sm:p-[10px] pt-[10px]">
                                            <div className="flex justify-between"><h5 className="font-[600] hans">All Account <span className="text-gray text-[13px] ps-[10px] pe-[7px]"><i className="fa-solid fa-circle"></i></span><span className="text-gray text-[15px]">Total Balance</span></h5>
                                                <div className="flex items-center gap-1 text-[12px]">
                                                    UTS
                                                    <i className="fa-solid fa-arrow-down text-primary"></i>
                                                </div>
                                            </div>
                                            <div className="my-[10px] flex gap-5 items-center">
                                                <h3 className="text-[24px] font-[600] hans">$4,700 </h3>
                                                <span className="text-gray text-[14px] hans">+$232</span>
                                            </div>

                                            <div>
                                                <AreaChart />
                                                <div className="flex gap-2 border-t border-[#eaedf1] pt-4 p-4">
                                                    <button className="w-[100%] h-[39px]  bg-primary  text-white   rounded-[12px] text-[14px] mt-[12px]">Send</button>
                                                    <button className="w-[100%] h-[39px] text-gray border-[1px] border-gray rounded-[12px] text-[14px] mt-[12px] hover:bg-gray hover:text-white">Receive</button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>







        </div>
    )
}
export default Category
