import React, { useEffect, useState, useRef } from "react";
import User_side_menu from '../Componenet/user_side_menu'
import EmployList from '../Componenet/EmployList'
import SubHeader from '../Componenet/sub_header'
import Dropdown from '../Componenet/dropdown'
import { ToastContainer, toast } from "react-toastify";
import { useGetCategoriesQuery, useDeleteCategoryMutation, useGetProfileQuery, useAddTracking_scriptMutation, useGetTracking_scriptQuery, } from "../services/apiSlice";
import { Link, useNavigate } from "react-router-dom";
import Category_img from '../assets/category.png'
import { Icon } from '@iconify/react';
import ThemeSwitcher from "../Componenet/themeswicher";


const Category = () => {
    const [modal, setModal] = useState(null);
    const [track, setTrack] = useState({
        google_tag_manager_1: "",
        google_tag_manager_2: "",
        google_analytics: "",
        heatmap: "",
        meta_pixel: "",
        sitemaps: "",
        robots_file: ""
    });


    const { data: script } = useGetTracking_scriptQuery()
    console.log(script);

    useEffect(() => {
        setTrack({
            google_tag_manager_1: script?.data[1].google_tag_manager_1,
            google_tag_manager_2: script?.data[1].google_tag_manager_2,
            google_analytics: script?.data[1].google_analytics,
            heatmap: script?.data[1].heatmap,
            meta_pixel: script?.data[1].meta_pixel,
        })
    },[script])



    const [addTracking_script] = useAddTracking_scriptMutation()


    const handlesubmit = async () => {
        try {

            const formdata = new FormData()

            formdata.append('google_tag_manager_1', track.google_tag_manager_1)
            formdata.append('google_tag_manager_2', track.google_tag_manager_2)
            formdata.append('google_analytics', track.google_analytics)
            formdata.append('heatmap', track.heatmap)
            formdata.append('meta_pixel', track.meta_pixel)
            formdata.append('sitemaps', track.sitemaps)
            formdata.append('robots_file', track.robots_file)

            await addTracking_script(formdata).unwrap()

            toast.success('Scrpit Successfully Added');

        } catch (error) {
            toast.error(error?.message || 'Something Went Wrong')
        }
    }





    // ✅ Open & Close Modal
    const openModal = (modalId) => setModal(modalId);
    const closeModal = () => setModal(null);









    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);





    // --------------------------------dropdown
    const [open, setOpen] = useState(false);





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
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Google Tag"} />

                    <div className="mb-[24px]     bg-white shadow-md rounded-[12px]">
                        <h4 className="px-[24px] py-[18px] max-lg:px-[18px] max-sm:p-[10px]   font-[600] text-[#313b5e] text-[16px] border-b border-[#eaedf1] hans">Information</h4>
                        <div className="px-[24px] py-[18px] max-sm:p-[10px] grid grid-cols-2 gap-5 max-sm:grid-cols-1  max-lg:px-[18px] ">

                            <div className=" ">
                                <label className="block text-sm font-medium text-gray">HeatMap</label>
                                <textarea value={track?.heatmap} onChange={(e) => setTrack({ ...track, heatmap: e.target.value })} rows="6" className="w-full mt-[5px] px-[15px] bg-transparent py-[10px] border border-[#C8C8C8] rounded-lg text-sm text-[#9CA3AF]  focus:ring-[#9CA3AF] focus:border-[#9CA3AF] resize-y"></textarea>
                            </div>

                            <div className=" ">
                                <label className="block text-sm font-medium text-gray">Google Tag Manager 1</label>
                                <textarea value={track?.google_tag_manager_1} onChange={(e) => setTrack({ ...track, google_tag_manager_1: e.target.value })} rows="6" className="w-full mt-[5px] px-[15px] bg-transparent py-[10px] border border-[#C8C8C8] rounded-lg text-sm text-[#9CA3AF]  focus:ring-[#9CA3AF] focus:border-[#9CA3AF] resize-y"></textarea>
                            </div>
                            <div className=" ">
                                <label className="block text-sm font-medium text-gray">Google Tag Manager 2</label>
                                <textarea value={track?.google_tag_manager_2} onChange={(e) => setTrack({ ...track, google_tag_manager_2: e.target.value })} rows="6" className="w-full mt-[5px] px-[15px] bg-transparent py-[10px] border border-[#C8C8C8] rounded-lg text-sm text-[#9CA3AF]  focus:ring-[#9CA3AF] focus:border-[#9CA3AF] resize-y"></textarea>
                            </div>
                            <div className=" ">
                                <label className="block text-sm font-medium text-gray">Google Analytics</label>
                                <textarea value={track?.google_analytics} onChange={(e) => setTrack({ ...track, google_analytics: e.target.value })} rows="6" className="w-full mt-[5px] px-[15px] bg-transparent py-[10px] border border-[#C8C8C8] rounded-lg text-sm text-[#9CA3AF]  focus:ring-[#9CA3AF] focus:border-[#9CA3AF] resize-y"></textarea>
                            </div>
                            <div className=" ">
                                <label className="block text-sm font-medium text-gray">Meta Pixel</label>
                                <textarea value={track?.meta_pixel} onChange={(e) => setTrack({ ...track, meta_pixel: e.target.value })} rows="6" className="w-full mt-[5px] px-[15px] bg-transparent py-[10px] border border-[#C8C8C8] rounded-lg text-sm text-[#9CA3AF]  focus:ring-[#9CA3AF] focus:border-[#9CA3AF] resize-y"></textarea>
                            </div>


                        </div>
                    </div>
                    <div className="flex justify-end items-center  bg-[#eef2f7] rounded-[12px]">
                        <div className="p-[17px]  flex flex-row-reverse gap-3 max-sm:ps-0">
                            <div className="flex gap-2  w-[100%] ">
                                <button onClick={() => handlesubmit()} className="w-[182px]   max-sm:w-[125px] h-[39px] text-gray border-[1px] border-gray rounded-[12px] text-[14px]  hover:bg-gray hover:text-white">Save Change</button>

                            </div>
                        </div>
                    </div>

                </div>
            </div>









        </div>
    )
}
export default Category
