import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import User_side_menu from '../../Componenet/user_side_menu'
import EmployList from '../../Componenet/EmployList'
import SubHeader from '../../Componenet/sub_header'
import Meen from '../../assets/meen.png'
import Searchdropdown from '../../Componenet/searchdropdown'
import { FaPen } from 'react-icons/fa';



import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css"; // Or choose another theme

import Multiselect from 'multiselect-react-dropdown';
import { FaCheckCircle, FaSpinner, FaCircle } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetAddressQuery, useGetCategories_fetch_allQuery, useGetCategoriesQuery, useGetOrderQuery } from '../../services/apiSlice';
import ThemeSwitcher from '../../Componenet/themeswicher';

const timelineData = [
    {
        title: "The packing has been started",
        subtext: "Confirmed by Gaston Lapierre",
        status: "processing",
        timestamp: "April 23, 2024, 09:40 am",
    },
    {
        title: "The Invoice has been sent to the customer",
        subtext: "Invoice email was sent to ",
        email: "hello@dundermufflin.com",
        action: { label: "Resend Invoice", variant: "secondary" },
        status: "completed",
        timestamp: "April 23, 2024, 09:40 am",
    },
    {
        title: "The Invoice has been created",
        subtext: "Invoice created by Gaston Lapierre",
        action: { label: "Download Invoice", variant: "primary" },
        status: "completed",
        timestamp: "April 23, 2024, 09:40 am",
    },
    {
        title: "Order Payment",
        subtext: "Using Master Card",
        statusLabel: "Paid",
        status: "completed",
        timestamp: "April 23, 2024, 09:40 am",
    },
    {
        title: "4 Order conform by Gaston Lapierre",
        tags: ["Order 1", "Order 2", "Order 3", "Order 4"],
        status: "completed",
        timestamp: "April 23, 2024, 09:40 am",
    },
];



const Order_details = () => {

    const { data: cate } = useGetCategories_fetch_allQuery()

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);
    const [value, setValue] = useState(1);
    const [date, setDate] = useState(new Date());
    const [date1, setDate1] = useState(new Date());
    const increment = () => setValue((prev) => Math.min(prev + 1, 100));
    const decrement = () => setValue((prev) => Math.max(prev - 1, 0));

    const location = useLocation()
    const orderId = location.state?.orderId;

    const data = orderId
    console.log(data);
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const datePart = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        const timePart = date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
        return `${datePart} at ${timePart}`;
    };
    const stepLabels = ["Pending", "Processing", "Shipped", "Delivered"];

    const currentStatus = data?.status; // e.g., "Shipped"

    const currentIndex = stepLabels.findIndex(label => label === currentStatus);


    const steps = stepLabels.map((label, index) => {


        if ('Delivered' == data?.status) {
            return { label, status: "Completed" };
        }
        else if (index < currentIndex) {
            return { label, status: "Completed" };
        } else if (index == currentIndex) {
            return { label, status: "Processing" };
        } else {
            return { label, status: "Pending" };
        }
    });

    const allowedSteps = [
        { status: "Pending", title: "Order has been placed", subtext: "Awaiting confirmation from seller" },
        { status: "Processing", title: "Order is being processed", subtext: "Confirmed by team, preparing the order" },
        { status: "Shipped", title: "Order has been shipped", subtext: "Shipped via Delhivery" },
        { status: "Delivered", title: "Order delivered successfully", subtext: "Received by customer" },
    ];

    const isDelivered = data?.status === "Delivered";

    const currentIndex1 = allowedSteps.findIndex(step => step.status === data?.status);

    const timelineData = allowedSteps.map((step, index) => ({
        ...step,
        status: index == 3 ? "Completed" : index < currentIndex1 ? "Completed" : index === currentIndex1 ? "processing" : "pending",
    }));


    const getStatusIcon = (status, currentIndex, index) => {
        if (data?.status == 'Delivered') {
            return <FaCheckCircle className="text-green-500 text-lg" />;
        } else if (index < currentIndex) {
            return <FaCheckCircle className="text-green-500 text-lg" />;
        } else if (index === currentIndex) {
            return <FaSpinner className="text-yellow-500 animate-spin text-lg" />;
        } else {
            return <FaCircle className="text-gray-300 bg-transparent fill-transparent text-lg" />;
        }
    };

    const { data: address } = useGetAddressQuery(data?.address);


    const displayedData = data?.order_items



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
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Order Details"} />
                    <div className="flex justify-between gap-[10px] mb-[50px] flex-wrap max-sm:mb-[20px]" >
                        <h4 className="text-[18px] text-gray font-semibold">Order Details</h4>
                    </div>

                    <div className='flex max-lg:flex-wrap gap-[24px] max-xl:block'>
                        <div className='w-[70%] max-2xl:w-[65%] max-xl:w-[100%]  max-md:w-full'>
                            <div className='bg-white mb-[24px] shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)]  rounded-[0.75rem]'>
                                <div className='p-[24px] max-sm:p-[10px]'>


                                    <div className='flex items-center flex-wrap justify-between max-xl:block'>
                                        <div className='max-2xl:mb-[20px]'>
                                            <div className='flex mb-[10px] items-center gap-[0.75rem]'>

                                                <h3 className='text-[18px] font-[600] text-[#313b5e] hans'>#{data?.order_id}</h3>
                                                <span className='h-[25px] px-[12px] text-[13px] flex items-center rounded-[4px] justify-center font-[500] text-[#22c55e] bg-[#d3f3df]'>{data?.status}</span>



                                            </div>
                                            <p className='text-[14px] text-[#5d7186]'>Order / Order Details / #{data?.order_id} - {formatDate(data?.created_at)}</p>
                                        </div>
                                        <div className='flex items-center gap-[0.25rem] '>
                                            {/* <a href="" className='px-[16px] inline-block leading-[38px] h-[40px] border border-[#5d7186] text-[#5d7186] text-[14px] rounded-[0.75rem]'>Refund</a>
                                            <a href="" className='px-[16px] inline-block leading-[38px] h-[40px] border border-[#5d7186] text-[#5d7186] text-[14px] rounded-[0.75rem]'>Return</a> */}
                                            {data?.payment_status == 'Success' && (

                                                <a href="" onClick={() => {
                                                    navigate('/invoice-details', {
                                                        state: { order_id: data?.order_id }
                                                    });

                                                }} className='px-[16px] inline-block leading-[38px] bg-primary h-[40px] border border-primary text-[white] text-[14px] rounded-[0.75rem]'>Invoice</a>
                                            )}
                                        </div>
                                    </div>

                                    <h4 className='mt-10 mb-4 text-[#313b5e] font-[500] text-[1.125rem] hans'>Tracking</h4>
                                    <div className="grid grid-cols-4 max-2xl:grid-cols-2 w-full gap-4 max-sm:gap-6 px-4 max-2xl:px-0 max-sm:grid-cols-1">
                                        {steps.map((step, index) => (
                                            <div key={index} className="space-y-1 w-full">
                                                {/* Progress Bar */}
                                                <div className="w-full h-[10px] rounded-full bg-[#eef2f7] relative overflow-hidden">
                                                    {/* Completed Step (Full Green Bar) */}
                                                    {step.status === "Completed" && (
                                                        <div className="absolute h-full w-full bg-green-500 animate-stripes" />
                                                    )}
                                                    {/* Processing Step (Yellow Half Bar) */}
                                                    {step.status === "Processing" && (
                                                        <div className="absolute h-full w-1/2 bg-[#f9b931] animate-stripes" />
                                                    )}
                                                    {/* Pending Step (Gray Bar) */}
                                                    {step.status === "Pending" && (
                                                        <div className="absolute h-full w-full bg-[#eef2f7]" />
                                                    )}
                                                    {/* Delivered Status - Full Green Bar */}
                                                    {step.status === "Delivered" && (
                                                        <div className="absolute h-full w-full bg-green-500" />
                                                    )}
                                                </div>

                                                {/* Label and Spinner */}
                                                <div className="text-sm flex items-center gap-2 text-[#5d7186] pt-3 max-sm:pt-1">
                                                    <span>{step.label}</span>
                                                    {step.status === "Processing" && (
                                                        <FaSpinner className="animate-spin text-yellow-500 text-[15px]" />
                                                    )}
                                                </div>
                                            </div>
                                        ))}

                                    </div>

                                </div>
                                <div className='p-[24px] max-sm:p-[10px] bg-[#fcfcfd]'>
                                    <div className='flex justify-between max-sm:justify-center flex-wrap'>
                                        <p className='py-[6px] px-[12px] flex items-center gap-2  text-[14px] bg-[#f9f7f7] border text-[#5d7186] border-[#eaedf1] rounded-[0.75rem]'><i className="fa-solid fa-right-from-bracket"></i>  Estimated shipping date : Apr 25 , 2024

                                        </p>
                                        {/* <a href="" className='px-[16px] inline-block leading-[38px] bg-primary h-[40px] border border-primary max-sm:mt-[20px] text-[white] text-[14px] rounded-[0.75rem]'>Make As Ready To Ship</a> */}
                                        {(data?.status === 'Delivered' || data?.status === 'processing' || data?.status === 'shipped') && (
                                            <a
                                                href="#"
                                                className='px-[16px] inline-block leading-[38px] bg-primary h-[40px] border border-primary max-sm:mt-[20px] text-[white] text-[14px] rounded-[0.75rem]'
                                                onClick={(e) => {
                                                    e.preventDefault(); // Prevent the default anchor behavior
                                                    navigate("/invoice-details", {
                                                        state: {
                                                            order_id: orderId,
                                                        },
                                                    });
                                                }}
                                            >
                                                View Invoice
                                            </a>
                                        )}

                                    </div>
                                </div>
                            </div>
                            <div className="border overflow-hidden mb-[24px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F]  rounded-[10px]">
                                <div className="p-[20px] flex  gap-4 max-lg:items-center justify-between">

                                    {/* <div className="flex flex-col lg:flex-row lg:items-center gap-3 w-full lg:w-auto">
                            
                                                           
                            
                            
                                                            <div className=" max-sm:w-[250px] w-[458px]">
                                                                <fieldset className="relative border border-[#dce7f2] text-[#5E5873] rounded-[6px] h-[40px] mt-2 lg:mt-0">
                                                                    <input
                                                                        placeholder="Search here..."
                                                                        tabIndex="2"
                                                                        required
                                                                        type="text"
                                                                        name="name"
                                                                        value={searchTerm}
                                                                        onChange={handleSearchChange}
                                                                        className="outline-none shadow-none w-full h-full pr-8 text-sm font-inter font-normal leading-5 bg-transparent focus:bg-white selection:bg-white text-heading ps-[10px] transition-colors duration-200"
                                                                    />
                                                                    <i className="fa-solid fa-magnifying-glass absolute right-2 top-1/2 -translate-y-1/2 text-[#5E5873] text-sm pointer-events-none"></i>
                                                                </fieldset>
                                                            </div> 
                                                        </div>*/}

                                    <div>
                                        <h3 className="font-[600] text-[16px] text-[#313b5e] hans">All product List</h3>
                                    </div>



                                </div>

                                <div className="over__scroll overflow-x-scroll">
                                    <table className="w-full ">
                                        <thead className="border-y border-[#ddd]">

                                            <tr className="max-sm:h-[40px] h-[54px] ">
                                                <th className="px-[30px]  max-xl:px-[10px]">
                                                    <div className="text-start  text-[14px] font-bold text-[#5d7186] sans flex gap-2 items-center">

                                                        Product Name Size

                                                    </div>
                                                </th>

                                                <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-lg:hidden max-md:text-[13px] max-sm:px-[10px]">Description</th>
                                                <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap  max-md:text-[13px] max-sm:px-[10px]">Price</th>
                                                <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-md:text-[13px] max-md:hidden max-sm:px-[10px]">Dis Per (%)</th>
                                                <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-md:text-[13px] max-md:hidden max-sm:px-[10px]">Dis Price</th>
                                                <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-md:text-[13px] max-sm:px-[10px]">Total</th>
                                                <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-md:text-[13px] max-sm:px-[10px] max-md:hidden"></th>
                                            </tr>


                                        </thead>
                                        <tbody className="">
                                            {displayedData?.map((item, index) => (
                                                <tr
                                                    key={item.id}
                                                    className="h-[44px] sm:h-[58px] transition-all duration-200 bg-white hover:bg-[rgba(238,243,249,0.8)] border-b border-[#ddd]"
                                                    // onClick={() =>
                                                    //     navigate("/create_review", {
                                                    //         state: {
                                                    //             order_id: orderId.order_id,
                                                    //             product_id: item?.theme?.theme_id,
                                                    //         },
                                                    //     })
                                                    // }
                                                >
                                                    <td className="text-sm text-[#5E5873] flex  px-[30px] max-xl:px-[10px] max-sm:px-[5px] max-sm:min-w-[120px]   items-center gap-2 my-[15px] max-md:gap-1 max-md:text-[12px]">

                                                        <div className="h-[56px] min-w-[56px] max-md:min-w-[40px] max-md:max-h-[40px] bg-[#eef2f7] rounded-[12px] flex items-center justify-center overflow-hidden">
                                                            <img src={import.meta.env.VITE_API_BASE_URL + item?.theme?.thumbnail} alt="category_img" className="object-cover h-[56px] w-[56px] max-md:w-[40px] max-md:h-[40px]" />
                                                        </div>
                                                        <div className="">
                                                            <h1 className="text-[#313b5e]">{item?.theme?.name}</h1><p className="text-[#5d7186] text-[13px] mt-[2px]"><span>Category :
                                                            </span> {cate?.data?.find((val) => val.category_id == item?.theme?.category)?.name}  </p></div>
                                                    </td>
                                                    <td className="text-sm text-[#5E5873] text-center px-[30px]  max-xl:px-[10px] max-sm:px-[5px]  max-lg:hidden max-md:text-[12px]"> {item.product?.short_description}</td>
                                                    <td className="text-sm text-[#5E5873] text-center px-[30px]  max-xl:px-[10px] max-sm:px-[5px]   max-md:text-[12px]"> {item.price}</td>
                                                    <td className="text-sm text-[#5E5873] text-center px-[30px]  max-xl:px-[10px] max-sm:px-[5px] max-md:hidden max-md:text-[12px]">{item?.theme?.discount_percentage}</td>
                                                    <td className="text-sm text-[#5E5873] text-center px-[30px]  max-xl:px-[10px] max-sm:px-[5px] text-nowrap max-md:text-[12px]  max-md:hidden">
                                                        {item.product?.total_gst || 0}%
                                                    </td>
                                                    <td className="text-sm text-[#5E5873] text-center px-[30px]  max-xl:px-[10px] max-sm:px-[0px] max-md:text-[12px]">
                                                        {item?.theme?.discount_price}
                                                    </td>
                                                    <td>
                                                        {data.status === 'Delivered' && (
                                                            <td className="text-sm text-[#5E5873] text-center px-[30px] max-xl:px-[10px] max-sm:px-[5px] max-md:text-[12px] max-sm:hidden">
                                                                <button
                                                                    className="bg-primary text-white rounded-[8px] px-[8px] py-[5px]"
                                                                    onClick={() =>
                                                                        navigate("/create_review", {
                                                                            state: {
                                                                                order_id: orderId.order_id,
                                                                                product_id: item?.theme?.theme_id,
                                                                            },
                                                                        })
                                                                    }
                                                                >
                                                                    Review
                                                                </button>
                                                            </td>
                                                        )}

                                                    </td>


                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>
                                </div>



                            </div>
                            <div className='bg-white mb-[24px] shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)]  rounded-[0.75rem] '>
                                <div className='p-[24px] max-sm:p-[10px] max-sm:p-[24px]'>

                                    <div className="p-6 bg-white rounded-md max-lg:p-0">
                                        <div className="relative border-l-[1px] flex flex-col gap-10 border-[#eaedf1]">
                                            {timelineData.map((item, index) => (
                                                <div key={index} className=" ml-6 relative">
                                                    {/* Icon */}
                                                    <span className="absolute bg-[#eef2f7] p-[5px] rounded-full -left-[38px] top-1">
                                                        {getStatusIcon(item.status, currentIndex, index)} {/* Dynamic icon */}
                                                    </span>

                                                    {/* Title */}
                                                    <div className="text-sm text-gray-800 font-medium">{item.title}</div>

                                                    {/* Subtext */}
                                                    <div className="text-xs text-gray-500">{item.subtext}</div>

                                                    {/* Timestamp */}
                                                    <div className="text-[11px] text-gray-400 mt-1">{item.timestamp}</div>
                                                </div>
                                            ))}


                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div className='grid grid-cols-4 max-2xl:grid-cols-2 gap-4 max-sm:grid-cols-1'>
                                <div className='bg-white shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)]  rounded-[0.75rem] flex justify-between p-[10px]'>
                                    <div>
                                        <p className='text-[#313b5e] font-[500] mb-[2px]'>Vender</p>
                                        <p className='text-gray text-[13px]'>Catpiller</p>
                                    </div>
                                    <div className='w-[48px] h-[48px] bg-[#eef2f7] rounded-[12px] flex justify-center items-center text-primary'><svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24"><path fill="currentColor" d="M16.528 2H7.472c-1.203 0-1.804 0-2.288.299c-.483.298-.752.836-1.29 1.912L2.491 7.76c-.325.82-.608 1.786-.062 2.479A2 2 0 0 0 6 9a2 2 0 1 0 4 0a2 2 0 1 0 4 0a2 2 0 1 0 4 0a2 2 0 0 0 3.571 1.238c.546-.693.262-1.659-.062-2.479l-1.404-3.548c-.538-1.076-.806-1.614-1.29-1.912C18.332 2 17.73 2 16.528 2M9.5 21.25V18.5c0-.935 0-1.402.201-1.75a1.5 1.5 0 0 1 .549-.549C10.598 16 11.065 16 12 16s1.402 0 1.75.201a1.5 1.5 0 0 1 .549.549c.201.348.201.815.201 1.75v2.75z"></path><path fill="currentColor" fillRule="evenodd" d="M4 11a2 2 0 0 0 2-2a2 2 0 1 0 4 0a2 2 0 1 0 4 0a2 2 0 1 0 4 0a2 2 0 0 0 2 2v10.25h-5.5V18.5c0-.935 0-1.402-.201-1.75a1.5 1.5 0 0 0-.549-.549C13.402 16 12.935 16 12 16s-1.402 0-1.75.201a1.5 1.5 0 0 0-.549.549c-.201.348-.201.815-.201 1.75v2.75H4z" clipRule="evenodd" opacity=".5"></path><path fill="currentColor" d="M14.5 21.25H2a.75.75 0 0 0 0 1.5h20a.75.75 0 0 0 0-1.5z"></path></svg></div>
                                </div>
                                <div className='bg-white shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)]  rounded-[0.75rem] flex justify-between p-[10px]'>
                                    <div>
                                        <p className='text-[#313b5e] font-[500] mb-[2px]'>Date</p>
                                        <p className='text-gray text-[13px]'>April 23 , 2024</p>
                                    </div>
                                    <div className='w-[48px] h-[48px] bg-[#eef2f7] rounded-[12px] flex justify-center items-center text-primary'><svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24"><path fill="currentColor" d="M6.96 2c.418 0 .756.31.756.692V4.09c.67-.012 1.422-.012 2.268-.012h4.032c.846 0 1.597 0 2.268.012V2.692c0-.382.338-.692.756-.692s.756.31.756.692V4.15c1.45.106 2.403.368 3.103 1.008c.7.641.985 1.513 1.101 2.842v1H2V8c.116-1.329.401-2.2 1.101-2.842c.7-.64 1.652-.902 3.103-1.008V2.692c0-.382.339-.692.756-.692"></path><path fill="currentColor" d="M22 14v-2c0-.839-.013-2.335-.026-3H2.006c-.013.665 0 2.161 0 3v2c0 3.771 0 5.657 1.17 6.828C4.349 22 6.234 22 10.004 22h4c3.77 0 5.654 0 6.826-1.172S22 17.771 22 14" opacity=".5"></path><path fill="currentColor" fillRule="evenodd" d="M14 12.25A1.75 1.75 0 0 0 12.25 14v2a1.75 1.75 0 1 0 3.5 0v-2A1.75 1.75 0 0 0 14 12.25m0 1.5a.25.25 0 0 0-.25.25v2a.25.25 0 1 0 .5 0v-2a.25.25 0 0 0-.25-.25" clipRule="evenodd"></path><path fill="currentColor" d="M11.25 13a.75.75 0 0 0-1.28-.53l-1.5 1.5a.75.75 0 0 0 1.06 1.06l.22-.22V17a.75.75 0 0 0 1.5 0z"></path></svg></div>
                                </div>
                                <div className='bg-white shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)]  rounded-[0.75rem] flex justify-between p-[10px]'>
                                    <div>
                                        <p className='text-[#313b5e] font-[500] mb-[2px]'>Paid By</p>
                                        <p className='text-gray text-[13px]'>Gaston Lapierre</p>
                                    </div>
                                    <div className='w-[48px] h-[48px] bg-[#eef2f7] rounded-[12px] flex justify-center items-center text-primary'><svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24"><path fill="currentColor" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10" opacity=".5"></path><path fill="currentColor" d="M16.807 19.011A8.46 8.46 0 0 1 12 20.5a8.46 8.46 0 0 1-4.807-1.489c-.604-.415-.862-1.205-.51-1.848C7.41 15.83 8.91 15 12 15s4.59.83 5.318 2.163c.35.643.093 1.433-.511 1.848M12 12a3 3 0 1 0 0-6a3 3 0 0 0 0 6"></path></svg></div>
                                </div>
                                <div className='bg-white shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)]  rounded-[0.75rem] flex justify-between p-[10px]'>
                                    <div>
                                        <p className='text-[#313b5e] font-[500] mb-[2px]'>Reference #IMEMO</p>
                                        <p className='text-gray text-[13px]'>#0758267/90</p>
                                    </div>
                                    <div className='w-[48px] h-[48px] bg-[#eef2f7] rounded-[12px] flex justify-center items-center text-primary'><svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24"><path fill="currentColor" d="M21 15.998v-6c0-2.828 0-4.242-.879-5.121C19.353 4.109 18.175 4.012 16 4H8c-2.175.012-3.353.109-4.121.877C3 5.756 3 7.17 3 9.998v6c0 2.829 0 4.243.879 5.122c.878.878 2.293.878 5.121.878h6c2.828 0 4.243 0 5.121-.878c.879-.88.879-2.293.879-5.122" opacity=".5"></path><path fill="currentColor" d="M8 3.5A1.5 1.5 0 0 1 9.5 2h5A1.5 1.5 0 0 1 16 3.5v1A1.5 1.5 0 0 1 14.5 6h-5A1.5 1.5 0 0 1 8 4.5z"></path><path fill="currentColor" fillRule="evenodd" d="M6.25 14.5a.75.75 0 0 1 .75-.75h8a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75m0 3.5a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75" clipRule="evenodd"></path></svg></div>
                                </div>

                            </div>
                        </div>

                        <div className='w-[30%] max-2xl:w-[35%] max-xl:w-[100%]'>
                            <div className='shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)] overflow-hidden rounded-[0.75rem] mb-[1rem]'>
                                <div className='px-[24px] py-[18px] max-lg:px-[18px] max-sm:p-[10px]  bg-white font-[600] text-[#313b5e] border-b border-[#eaedf1] hans'>
                                    Order Summary
                                </div>
                                <div className='px-[24px] py-[18px] max-lg:px-[18px] max-sm:p-[10px]  bg-white'>
                                    <div className='flex justify-between text-sm text-[#5d7186] border-b border-[#eaedf1] py-[13px]'>
                                        <div className='flex gap-[0.375rem] items-center'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" d="M7 18h5.5"></path><path d="M8 3.5A1.5 1.5 0 0 1 9.5 2h5A1.5 1.5 0 0 1 16 3.5v1A1.5 1.5 0 0 1 14.5 6h-5A1.5 1.5 0 0 1 8 4.5z"></path><path strokeLinecap="round" d="M21 16c0 2.829 0 4.243-.879 5.122C19.243 22 17.828 22 15 22H9c-2.828 0-4.243 0-5.121-.878C3 20.242 3 18.829 3 16v-3m13-8.998c2.175.012 3.353.109 4.121.877C21 5.758 21 7.172 21 10v2M8 4.002c-2.175.012-3.353.109-4.121.877S3.014 6.825 3.002 9M7 14.5h1m7 0h-4"></path></g></svg>
                                            <p className=''>Sub Total :</p>
                                        </div>
                                        <p className='text-sm text-[#313b5e]'>${data?.price}</p>
                                    </div>
                                    <div className='flex justify-between text-sm text-[#5d7186] border-b border-[#eaedf1] py-[13px]'>
                                        <div className='flex gap-[0.375rem] items-center'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><path stroke="currentColor" strokeWidth="1.5" d="M14 11a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0z"></path><path fill="currentColor" d="m14.008 19.003l-.75-.002zM14.014 17l.75.002V17zM3.15 18.828l-.53.531zm0-13.656l-.53-.531zm-.197 5.082l-.366.655zm-.942-1.265l-.75-.031zm.942 4.757l-.366-.655zm-.942 1.265l.749-.032zm19.036-4.757l.366.655zm.942-1.265l.75-.031zM20.85 5.172l.53-.531zm.197 8.574l-.366.655zm.942 1.265l.75.031zm-1.139 3.817l.53.531zm1.094-4.496l.654-.366zm0-4.664l.654.366zM2.056 14.332l-.654-.366zm0-4.664l.655-.366zM14.014 7h.75v-.002zm-.008-2.501l-.75.002zm2.522-.48l.02-.75zm.506 15.945l.031.75zm-3.174-.11l-.53-.531zm.898-.849l.006-2.003l-1.5-.004L13.258 19zm.258-2.255c.141 0 .253.114.253.25h1.5c0-.968-.787-1.75-1.753-1.75zm0-1.5c-.966 0-1.752.782-1.752 1.75h1.5c0-.136.111-.25.252-.25zM9.995 4.75h3.51v-1.5h-3.51zm3.013 14.5H9.995v1.5h3.013zm-3.013 0c-1.911 0-3.27-.002-4.3-.14c-1.01-.135-1.591-.389-2.016-.813L2.62 19.36c.75.748 1.702 1.08 2.876 1.238c1.154.155 2.63.153 4.5.153zm0-16c-1.87 0-3.346-.002-4.5.153c-1.174.158-2.125.49-2.875 1.238l1.06 1.062c.424-.424 1.006-.678 2.015-.813c1.03-.138 2.389-.14 4.3-.14zm-7.408 7.659c.386.215.643.624.643 1.091h1.5a2.75 2.75 0 0 0-1.41-2.401zM2.76 9.02c.078-1.856.331-2.732.92-3.318L2.62 4.64C1.59 5.668 1.34 7.08 1.26 8.958zM3.23 12c0 .467-.257.876-.643 1.092l.732 1.31A2.75 2.75 0 0 0 4.73 12zm-1.969 3.042c.08 1.876.33 3.29 1.359 4.317l1.06-1.062c-.589-.586-.842-1.462-.92-3.318zM20.77 12c0-.467.257-.876.643-1.091l-.732-1.31A2.75 2.75 0 0 0 19.27 12zm1.969-3.042c-.08-1.876-.33-3.29-1.359-4.317l-1.06 1.062c.588.586.842 1.462.92 3.318zm-1.326 4.134A1.25 1.25 0 0 1 20.77 12h-1.5c0 1.034.571 1.932 1.411 2.401zm-.173 1.887c-.078 1.856-.331 2.732-.92 3.318l1.06 1.062c1.03-1.027 1.28-2.44 1.359-4.317zm-.559-.578c.284.159.47.263.595.342c.062.039.09.06.098.066c.014.012-.037-.024-.085-.11l1.31-.733a1.1 1.1 0 0 0-.269-.312a2.4 2.4 0 0 0-.254-.18c-.167-.106-.396-.233-.663-.383zm2.058.641c.007-.171.015-.348.009-.496a1.3 1.3 0 0 0-.15-.58l-1.309.732c-.05-.09-.043-.152-.04-.086q.002.04 0 .134l-.009.233zm-1.326-4.133c.267-.15.496-.277.663-.383a3 3 0 0 0 .254-.18a1.1 1.1 0 0 0 .268-.312l-1.309-.732c.048-.087.099-.123.084-.111a1 1 0 0 1-.097.066c-.125.08-.31.183-.595.342zM21.24 9.02l.009.233q.002.094 0 .134c-.003.066-.01.004.04-.086l1.31.732a1.3 1.3 0 0 0 .149-.58a6 6 0 0 0-.01-.496zM2.587 13.09c-.267.15-.496.277-.663.383a2.4 2.4 0 0 0-.254.18a1.1 1.1 0 0 0-.268.312l1.309.732c-.048.087-.099.123-.085.111c.009-.007.036-.027.098-.066c.125-.08.31-.183.595-.342zm.173 1.888l-.009-.233a2 2 0 0 1 0-.134c.003-.066.01-.004-.04.086l-1.31-.732a1.3 1.3 0 0 0-.149.58c-.006.148.002.325.01.496zm.559-5.38c-.284-.159-.47-.263-.595-.342a1 1 0 0 1-.098-.066c-.014-.012.037.024.085.11l-1.31.733c.084.148.195.25.269.312c.08.066.169.126.254.18c.167.106.396.233.663.383zm-2.059-.64c-.007.171-.015.348-.009.496c.007.15.03.367.15.58l1.309-.732c.05.09.043.152.04.086a2 2 0 0 1 0-.134l.009-.233zm13.503-1.96l-.008-2.502l-1.5.005l.008 2.501zm.252.252a.25.25 0 0 1-.252-.25h-1.5c0 .968.786 1.75 1.752 1.75zM15.27 7c0 .136-.112.25-.253.25v1.5c.966 0 1.753-.782 1.753-1.75zm0-2.484V7h1.5V4.516zm1.24.253c2.188.056 3.169.292 3.812.934l1.06-1.062c-1.113-1.11-2.687-1.316-4.834-1.372zm.26-.253c0 .14-.116.256-.26.253l.038-1.5a1.247 1.247 0 0 0-1.278 1.247zm-3.264.234a.25.25 0 0 1-.249-.25l1.5-.004a1.25 1.25 0 0 0-1.25-1.246zm3.56 15.964c1.875-.08 3.288-.33 4.315-1.355l-1.06-1.062c-.586.586-1.464.84-3.318.918zM15.27 17v1.977h1.5V17zm-2.011 2c0 .121 0 .214-.003.293c-.002.08-.006.126-.01.155s-.005.019.006-.01a.4.4 0 0 1 .079-.115l1.059 1.062a1.24 1.24 0 0 0 .342-.733c.027-.197.026-.433.027-.647zm-.25 1.75c.214 0 .45.002.647-.025c.219-.03.498-.105.734-.34l-1.06-1.062a.4.4 0 0 1 .117-.078c.028-.012.038-.01.01-.007a2 2 0 0 1-.156.01c-.08.002-.172.002-.292.002zm3.994-1.535c-.12.005-.213.009-.292.01s-.125 0-.152-.003s-.015-.005.015.007c.037.014.08.04.119.076l-1.038 1.083c.244.234.529.304.757.326c.202.02.44.009.654 0zm-1.733-.238c0 .218-.002.46.026.663c.031.226.112.511.359.748l1.038-1.083c.04.038.066.081.082.117c.012.03.01.04.007.012a2 2 0 0 1-.01-.159c-.002-.08-.002-.175-.002-.298z"></path></g></svg>
                                            <p className=''> Discount : </p>
                                        </div>
                                        <p className='text-sm text-[#313b5e]'>$777.00</p>
                                    </div>
                                    <div className='flex justify-between text-sm text-[#5d7186] border-b border-[#eaedf1] py-[13px]'>
                                        <div className='flex gap-[0.375rem] items-center'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M14.381 17.647v.75a.75.75 0 0 0 .75-.75zm5.238-5.176v.75a.75.75 0 0 0 .74-.875zm-1.744-5.83a.75.75 0 1 0 1.48-.25zM14.381 3.25a.75.75 0 1 0 0 1.5zm3.782 1.59l-.622.419zm-.806-.675l.303-.686zm2.67 6.21a.75.75 0 0 0-1.48.25zM10 18.397a.75.75 0 0 0 0-1.5zm3-1.5a.75.75 0 1 0 0 1.5zm8.25.75c0 .877-.722 1.603-1.631 1.603v1.5c1.72 0 3.131-1.38 3.131-3.103zm-1.631 1.603c-.91 0-1.63-.726-1.63-1.603h-1.5c0 1.722 1.41 3.103 3.13 3.103zm-1.63-1.603c0-.877.72-1.603 1.63-1.603v-1.5c-1.72 0-3.13 1.381-3.13 3.103zm1.63-1.603c.91 0 1.631.726 1.631 1.603h1.5c0-1.722-1.41-3.103-3.131-3.103zm-4.488 1.603c0-2.436 2-4.426 4.488-4.426v-1.5c-3.299 0-5.988 2.645-5.988 5.926zm.478-14.397H14.38v1.5h1.228zm3.746 3.142c-.074-.436-.136-.804-.21-1.104a2.7 2.7 0 0 0-.36-.867l-1.244.838c.045.067.093.169.148.39c.058.232.11.534.186.992zM15.609 4.75c.47 0 .78 0 1.022.019c.232.017.345.048.422.082l.607-1.372a2.7 2.7 0 0 0-.917-.206c-.31-.023-.687-.023-1.134-.023zm3.176-.329a2.65 2.65 0 0 0-1.125-.942l-.607 1.372c.2.088.368.23.488.408zM6.012 17.647c0 .877-.722 1.603-1.631 1.603v1.5c1.72 0 3.13-1.38 3.13-3.103zM4.38 19.25c-.91 0-1.631-.726-1.631-1.603h-1.5c0 1.722 1.41 3.103 3.131 3.103zm-1.63-1.603c0-.877.722-1.603 1.631-1.603v-1.5c-1.72 0-3.131 1.381-3.131 3.103zm1.631-1.603c.91 0 1.63.726 1.63 1.603h1.5c0-1.722-1.41-3.103-3.13-3.103zm15.978-3.698l-.333-1.97l-1.479.249l.332 1.97zM10 16.897H6.762v1.5H10zm4.381 0H13v1.5h1.381z"></path></svg>
                                            <p className=''>Delivery Charge : </p>
                                        </div>
                                        <p className='text-sm text-[#313b5e]'>$777.00</p>
                                    </div>
                                    <div className='flex justify-between text-sm text-[#5d7186]  py-[13px]'>
                                        <div className='flex gap-[0.375rem] items-center'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464c.974.974 1.3 2.343 1.41 4.536M18 8.5h-4m4 6h-4m4 3h-4m-4-9H8m0 0H6m2 0v-2m0 2v2m1.5 4L8 16m0 0l-1.5 1.5M8 16l-1.5-1.5M8 16l1.5 1.5"></path></svg>
                                            <p className=''>Estimated Tax (15.5%) :</p>
                                        </div>
                                        <p className='text-sm text-[#313b5e]'>$777.00</p>
                                    </div>
                                </div>
                                <div className='px-[24px] py-[18px] max-lg:px-[18px] max-sm:p-[10px]  bg-[#fcfcfd] border-t border-[#eaedf1]'>
                                    <div className='flex gap-[0.375rem] items-center justify-between'>

                                        <p className='text-[14px] text-[#313b5e]'>Total Amount</p>
                                        <p className='text-[14px] text-[#313b5e]'>${data?.price}</p>
                                    </div>

                                </div>
                            </div>

                            <div className='shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)] overflow-hidden rounded-[0.75rem] mb-[1rem]'>
                                <div className='px-[24px] py-[18px] max-lg:px-[18px] max-sm:p-[10px]  bg-white font-[600] text-[#313b5e] border-b border-[#eaedf1] hans '>
                                    Payment Information
                                </div>

                                <div className='px-[24px] py-[18px] max-lg:px-[18px] max-sm:p-[10px]  bg-white'>
                                    <div className='flex justify-between items-center mb-[10px]'>
                                        <div className='flex gap-2 items-center'>
                                            <div className='bg-[#eef2f7] h-[48px] w-[48px] rounded'>
                                                <img src={'https://techzaa.in/larkon/admin/assets/images/card/mastercard.svg'} className='px-[2px]' />
                                            </div>
                                            <div>
                                                <p className='text-[#313b5e] text-[14px] '>Master Card</p>
                                                <p className='text-[#313b5e] text-[14px] '>xxxx xxxx xxxx 7812</p>
                                            </div>
                                        </div>
                                        <div className='text-[#22c55e]'><svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5"><path strokeLinejoin="round" d="m8.5 12.5l2 2l5-5"></path><path d="M7 3.338A9.95 9.95 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-1.821.487-3.53 1.338-5"></path></g></svg></div>
                                    </div>
                                    <p className='text-[#313b5e] text-[13px] mb-1 font-[550]'>Transaction ID :  <span className='text-gary font-[500]'> #IDN768139059</span></p>
                                    <p className='text-[#313b5e] text-[13px] mb-1 font-[550]'>Card Holder Name  :  <span className='text-gary font-[500]'>  Gaston Lapierre</span></p>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>


            </div>
        </div >

    )
}

export default Order_details
