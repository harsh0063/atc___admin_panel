import React, { useEffect, useState, useRef } from "react";
import EmployList from '../Componenet/EmployList'
import SubHeader from '../Componenet/sub_header'
import Dropdown from '../Componenet/dropdown'
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Category_img from '../assets/category.png'
import { Icon } from '@iconify/react';
import Meen from '../assets/meen.png'
import { useGetProfileQuery } from '../services/apiSlice'
import ThemeSwitcher from "../Componenet/themeswicher";

const Profile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);


    const [activeDropdown, setActiveDropdown] = useState(null);
    const [form, setForm] = useState({ gender: "" });

    const toggleDropdown = (key, isOpen) => {
        setActiveDropdown(isOpen ? key : null);
    };

    const { data: user } = useGetProfileQuery();
    const userData = user?.data;
    console.log(userData);



    return (
        <div>
             <ThemeSwitcher />
            <ToastContainer
                position="top-center"
                autoClose={1500}
            />
            <div className='flex inter'>
                <EmployList isOpen={isOpen} setIsOpen={setIsOpen} />
                {/* <Service_side_menu isOpenside={isOpenside} setIsOpenside={setIsOpenside} /> */}
                <div className="w-full width__right relative max-md:ms-0">
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Employee"} />
                    <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block" >
                        <h3 className="text-[22px] font-[700] text-[#707793] uppercase "> Employee Profile</h3>

                        <nav className="text-sm text-gray-600 max-sm:mt-[15px] max-sm:ps-[5px]" aria-label="Breadcrumb" >
                            <ol className="flex flex-wrap items-center ">

                                <li className="flex items-center">
                                    <Link to="/dashboard" className="hover:text-primary transition-colors font-[12px] text-[#575864]">Dashboard</Link>
                                    <svg className="mx-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M9 5l7 7-7 7" />
                                    </svg>
                                </li>
                                <li className="text-primary font-medium text-[12px]">Employee Profile</li>
                            </ol>
                        </nav>
                    </div>

                    <div className="mt-[30px] flex gap-5 max-xl:block">
                        <div className="border bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] rounded-[10px] p-[20px] max-sm:p-[10px] w-[58%] max-2xl:w-[53%] max-xl:w-[100%]">
                            <div className="flex justify-between items-center mb-[20px]">
                                <h5 className="text-[20px] text-[#444050] font-[700] hans">Personal Information</h5>
                                <button className="text-primary bg-[#ff6c2f1a] h-[30px] w-[30px] rounded-full"><i className="fa-solid fa-pen"></i></button>
                            </div>

                            {userData && (
                                <div className="flex justify-between mb-[20px] max-2xl:block max-xl:flex max-md:block">
                                    <div className="flex gap-5 max-sm:block">
                                        <div className="max-sm:mb-[20px]">
                                            <img src={Meen} className="h-[100px] w-[100px] rounded-full" />
                                        </div>
                                        <div>
                                            <h3 className="text-[30px] font-[700] text-[#444050] text-nowrap">
                                                {userData.first_name} {userData.last_name}
                                            </h3>
                                            <h6 className="text-gray text-[16px] font-[700] hans">Chief Executive Officer</h6>
                                            <span className="text-gray hasn">Web Designer</span>
                                            <h6 className="text-[13px] font-[700] text-[#362a2a] my-[5px]">Employee ID : MD-0001</h6>
                                            <span className="text-gray hans text-[15px]">Date of Join : 05 01 2024</span>
                                            <div className="mt-[20px]">
                                                <button className="bg-primary text-white py-[6px] px-[24px] rounded-[6px]">Send Message</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="max-2xl:mt-[30px] max-lg:ms-[20px] max-md:ms-0">
                                        <ul>
                                            <li className="mb-[5px]">
                                                <div className="text-gray text-[16px] font-[600]">Phone:</div>
                                                <div className="text-gray text-[14px]">{userData.mobile_no || "+15551234567"}</div>
                                            </li>
                                            <li className="mb-[5px]">
                                                <div className="text-gray text-[16px] font-[600]">Email:</div>
                                                <div className="text-gray text-[14px]">{userData.email || "ethanmitchell@example.com"}</div>
                                            </li>
                                            <li className="mb-[5px]">
                                                <div className="text-gray text-[16px] font-[600]">Birthday:</div>
                                                <div className="text-gray text-[14px]">{userData.dob || "28 December 1992"}</div>
                                            </li>
                                            <li className="mb-[5px]">
                                                <div className="text-gray text-[16px] font-[600]">Address:</div>
                                                <div className="text-gray text-[14px]">{userData.address || "Miami, United States"}</div>
                                            </li>
                                            <li className="mb-[5px]">
                                                <div className="text-gray text-[16px] font-[600]">Gender:</div>
                                                <div className="text-gray text-[14px]">{userData.gender || "Male"}</div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )}

                        </div>
                        <div className="border bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] rounded-[10px] p-[20px] max-sm:p-[10px] w-[42%] max-2xl:w-[47%] max-xl:w-[100%] max-xl:mt-[24px] max-sm:mt-[15px]">
                            <div className="flex justify-between items-center mb-[20px]">
                                <h5 className="text-[20px] text-[#444050] font-[700] hans">Emergency Contact</h5>
                                <button className="text-primary bg-[#ff6c2f1a] h-[30px] w-[30px] rounded-full"><i className="fa-solid fa-pen"></i></button>
                            </div>
                            <div className="flex justify-between mb-[20px] gap-3 max-sm:block">

                                <div>
                                    <h6 className="text-gray text-[16px] font-[700]">Primary Contact</h6>
                                    <ul>
                                        <li className="mb-[5px]">
                                            <div className="text-gray text-[16px] font-[600]">Name:</div>
                                            <div className="text-gray text-[14px]">John Doe</div>
                                        </li>
                                        <li className="mb-[5px]">
                                            <div className="text-gray text-[16px] font-[600]">Relationship:</div>
                                            <div className="text-gray text-[14px]">Father</div>
                                        </li>
                                        <li className="mb-[5px]">
                                            <div className="text-gray text-[16px] font-[600]">Phone:</div>
                                            <div className="text-gray text-[14px]">9876543210, 9876543210</div>
                                        </li>
                                        <li className="mb-[5px]">
                                            <div className="text-gray text-[16px] font-[600]">Address:</div>
                                            <div className="text-gray text-[14px]">100 Terminal, Fort Lauderdale, Miami 33315, United States</div>
                                        </li>
                                        <li className="mb-[5px]">
                                            <div className="text-gray text-[16px] font-[600]">Gender:</div>
                                            <div className="text-gray text-[14px]">Male</div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="max-sm:mt-[20px]">
                                    <h6 className="text-gray text-[16px] font-[700]">Secondary Contact</h6>
                                    <ul>
                                        <li className="mb-[5px]">
                                            <div className="text-gray text-[16px] font-[600]">Phone:</div>
                                            <div className="text-gray text-[14px]">+15551234567</div>
                                        </li>
                                        <li className="mb-[5px]">
                                            <div className="text-gray text-[16px] font-[600]">Email:</div>
                                            <div className="text-gray text-[14px]">ethanmitchell@example.com</div>
                                        </li>
                                        <li className="mb-[5px]">
                                            <div className="text-gray text-[16px] font-[600]">Birthday:</div>
                                            <div className="text-gray text-[14px]">28 December 1992</div>
                                        </li>
                                        <li className="mb-[5px]">
                                            <div className="text-gray text-[16px] font-[600]">Address:</div>
                                            <div className="text-gray text-[14px]">100 Terminal, Fort Lauderdale, Miami 33315, United States</div>
                                        </li>
                                        <li className="mb-[5px]">
                                            <div className="text-gray text-[16px] font-[600]">Gender:</div>
                                            <div className="text-gray text-[14px]">Male</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-[30px] flex gap-5 max-xl:block">
                        <div className="border bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] rounded-[10px] p-[20px] max-sm:p-[10px] w-[50%] max-xl:w-[100%] max-2xl:w-[53%]">
                            <div className="flex justify-between items-center mb-[20px]">
                                <h5 className="text-[20px] text-[#444050] font-[700] hans">Education Qualification</h5>
                                <button className="text-primary bg-[#ff6c2f1a] h-[30px] w-[30px] rounded-full"><i className="fa-solid fa-pen"></i></button>
                            </div>
                            <div>
                                <ul className="list-disc list-inside">
                                    <li className="mb-[10px] list-mark">
                                        <h5 className="text-[#495057] text-[15px] font-[700] inline max-sm:text-[13px]">
                                            International College of Arts and Science (UG)
                                        </h5><br />
                                        <span className="text-gray text-[14px] ms-[21px]">MSc In Computer Science</span>
                                        <br />
                                        <span className="text-[12px] text-gray ms-[21px]">2000 - 2003</span>
                                    </li>
                                    <li className="mb-[10px]">
                                        <h5 className="text-[#495057] text-[15px] font-[700] inline max-sm:text-[13px]">
                                            International College of Arts and Science (UG)
                                        </h5><br />
                                        <span className="text-gray text-[14px] ms-[21px]">MSc In Computer Science</span>
                                        <br />
                                        <span className="text-[12px] text-gray ms-[21px]">2000 - 2003</span>
                                    </li>
                                    <li className="mb-[10px]">
                                        <h5 className="text-[#495057] text-[15px] font-[700] inline max-sm:text-[13px]">
                                            International College of Arts and Science (UG)
                                        </h5><br />
                                        <span className="text-gray text-[14px] ms-[21px]">MSc In Computer Science</span>
                                        <br />
                                        <span className="text-[12px] text-gray ms-[21px]">2000 - 2003</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="border bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] rounded-[10px] p-[20px] max-sm:p-[10px] w-[50%] max-xl:mt-[24px] max-xl:w-[100%] max-2xl:w-[53%]">
                            <div className="flex justify-between items-center mb-[20px]">
                                <h5 className="text-[20px] text-[#444050] font-[700] hans">Experience Details</h5>
                                <button className="text-primary bg-[#ff6c2f1a] h-[30px] w-[30px] rounded-full"><i className="fa-solid fa-pen"></i></button>
                            </div>
                            <div>
                                <ul className="list-disc list-inside">
                                    <li className="mb-[10px] list-mark">
                                        <h5 className="text-[#495057] text-[15px] font-[700] inline max-sm:text-[13px]">
                                            Envato Inc, Melbourne
                                        </h5><br />
                                        <span className="text-gray text-[14px] ms-[21px]">Head Of Review Team</span>
                                        <br />
                                        <span className="text-[12px] text-gray ms-[21px]">2020 - Present</span>
                                    </li>
                                    <li className="mb-[10px]">
                                        <h5 className="text-[#495057] text-[15px] font-[700] inline max-sm:text-[13px]">
                                            CodeCanyon Sydney
                                        </h5><br />
                                        <span className="text-gray text-[14px] ms-[21px]">Software Developer</span>
                                        <br />
                                        <span className="text-[12px] text-gray ms-[21px]">2016 - 2018</span>
                                    </li>
                                    <li className="mb-[10px]">
                                        <h5 className="text-[#495057] text-[15px] font-[700] inline max-sm:text-[13px]">
                                            Facebook Inc, California
                                        </h5><br />
                                        <span className="text-gray text-[14px] ms-[21px]">Junior Software Developer</span>
                                        <br />
                                        <span className="text-[12px] text-gray ms-[21px]">2011 - 2016</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </div>
    )
}

export default Profile
