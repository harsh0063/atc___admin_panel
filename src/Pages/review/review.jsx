import React, { useEffect, useState, useRef } from "react";
import User_side_menu from '../../Componenet/user_side_menu'
import EmployList from '../../Componenet/EmployList'
import SubHeader from '../../Componenet/sub_header'
import { ToastContainer, toast } from "react-toastify";
import { useGetProductQuery, useGetProfileQuery, useGetReviewQuery, useGetThemesQuery } from "../../services/apiSlice";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import ThemeSwitcher from "../../Componenet/themeswicher";



const Review = () => {


    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);


    // ✅ Fetch categories using RTK Query
    const { data: product } = useGetThemesQuery();
    const { data: review, isLoading, isError } = useGetReviewQuery();
    const reviewData = review?.data || [];

    console.log("dsgxchgd", reviewData);

    const { data: profile } = useGetProfileQuery()

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
                {/* <Service_side_menu isOpenside={isOpenside} setIsOpenside={setIsOpenside} /> */}
                <div className="w-full width__right relative max-md:ms-0">
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Review List"} />
                    <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block" >
                        <h3 className="text-[22px] font-[700] text-[#707793] uppercase "> Review List</h3>

                        <nav className="text-sm text-gray-600 max-sm:mt-[15px] max-sm:ps-[5px]" aria-label="Breadcrumb" >
                            <ol className="flex flex-wrap items-center ">

                                <li className="flex items-center">
                                    <Link to="/dashboard" className="hover:text-primary transition-colors font-[12px] text-[#575864]">Dashboard</Link>
                                    <svg className="mx-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M9 5l7 7-7 7" />
                                    </svg>
                                </li>
                                <li className="text-primary font-medium text-[12px]">All Review List</li>
                            </ol>
                        </nav>


                    </div>

                    <div className="grid grid-cols-4 max-2xl:grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 gap-4">
                        {reviewData.map((item, index) => {
                            const createdDate = new Date(item.created_at).toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            });

                            return (
                                <div key={index} className="  ">
                                    <div className="bg-white shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)] rounded-[10px]  overflow-hidden">

                                    <div className="p-[24px]">
                                        <div>
                                            <h5 className="text-[15px] text-[#313b5e] font-[600] mb-[12px]">
                                                {item.review}
                                            </h5>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <ul className="flex items-center gap-1">
                                                {[...Array(item.rating)].map((_, i) => (
                                                    <li key={i}><i className="fa-solid fa-star text-[#f9b931]"></i></li>
                                                ))}
                                                {[...Array(5 - item.rating)].map((_, i) => (
                                                    <li key={i}><i className="fa-regular fa-star text-[#f9b931]"></i></li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="bg-primary mt-[30px] py-[18px] px-[24px]">
                                        <div className="relative">
                                            <div className="flex absolute -top-[85px] justify-between w-full items-center">
                                                <div>
                                                    <img
                                                        src={item?.photo ? import.meta.env.VITE_API_BASE_URL + item.photo : "https://techzaa.in/larkon/admin/assets/images/users/avatar-2.jpg"}
                                                        className="w-[72px] h-[72px] border-[3px] object-cover border-[#eef2f7] rounded-full"
                                                        alt="Reviewer"
                                                    />


                                                </div>
                                                <div>
                                                    <img src="https://techzaa.in/larkon/admin/assets/images/double.png" alt="quote" />
                                                </div>
                                            </div>

                                            <div className="mt-[30px]">
                                                <h4 className="text-white text-[18px] font-[600]">User ID: {profile?.data?.username}</h4>
                                                <p className="text-white mb-0 text-[14px]">Product : {product?.data?.find((val) => val.product_id == item.product)?.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Review
