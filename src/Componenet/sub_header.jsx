import React, { useEffect } from 'react';
import option from '../assets/option.png';
import User from '../assets/user.png'
import { useLocation } from 'react-router-dom';
import { useGetProfileQuery } from '../services/apiSlice'


const SubHeader = ({ setIsOpenside ,pageName: pageNameProp  }) => {


    const location = useLocation();

    const pageNameMap = {
        "/product_details": "Product Details",
        "/add_product": "Add Product",
        "/diamond": "Diamonds",
        "/add_diamond": "Add Diamond",
        "/edit_diamond": "Edit Diamond",
        "/metal": "Metals",
        "/add_metal": "Add Metal",
        "/edit_metal": "Edit Metal",
        "/product_media": "Product Media",
        "/add_product_media": "Add Product Media",
    };

    const showIconRoutes = Object.keys(pageNameMap); 
    const pageName = pageNameMap[location.pathname] || pageNameProp;


    const { data: user } = useGetProfileQuery();
    const userdata = user?.data || [];

    return (
        <div>
            <div className="flex mb-[30px] justify-between items-center p-[10px] sm:p-[15px] rounded-[10px] bg-white shadow-[0px_4px_4px_0px_#0000001A]">
                <div className="flex items-center gap-2">
                    {showIconRoutes.includes(location.pathname) && (
                        <div className="option-ico-1-1 hidden max-2xl:flex">
                            <img src={option} onClick={() => setIsOpenside(true)} alt="option icon" />
                        </div>
                    )}
                    <h3 className="text-[18px] text-gray">{pageName}</h3>
                </div>
                <div className="flex items-center">
                    <div className="relative w-[24px] h-[24px]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-[20px] h-[20px]"
                            viewBox="0 0 16 20"
                            fill="none"
                        >
                            <path
                                d="M8 20C9.1 20 10 19.1 10 18H6C6 19.1 6.9 20 8 20ZM14 14V9C14 5.93 12.37 3.36 9.5 2.68V2C9.5 1.17 8.83 0.5 8 0.5C7.17 0.5 6.5 1.17 6.5 2V2.68C3.64 3.36 2 5.92 2 9V14L0 16V17H16V16L14 14ZM12 15H4V9C4 6.52 5.51 4.5 8 4.5C10.49 4.5 12 6.52 12 9V15Z"
                                fill="#495567"
                            />
                        </svg>
                        <span className="absolute -top-2 right-0 flex items-center justify-center w-[16px] h-[16px] text-[12px] font-bold text-white bg-[#EA5455] rounded-full">
                            4
                        </span>
                    </div>
                    <div className="account py-0 bg-white m-0 flex items-center">
                        <div className="ms-3 hide__ala">
                            <span>{userdata?.username}</span>
                            <p className='text-end'>{userdata?.email}</p>
                        </div>

                        <div className="ms-3">
                            <img
                                src={User}  
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full"  
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubHeader;
