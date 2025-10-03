import React, { useEffect, useState, useRef } from "react";
import User_side_menu from '../../Componenet/user_side_menu'
import EmployList from '../../Componenet/EmployList'
import SubHeader from '../../Componenet/sub_header'
import Dropdown from '../../Componenet/dropdown'
import { ToastContainer, toast } from "react-toastify";
import { useGetCategoriesQuery, useDeleteCategoryMutation, useGetProfileQuery, useGetCartQuery, useGetWishlistQuery, } from "../../services/apiSlice";
import { Link, useNavigate } from "react-router-dom";
import Category_img from '../../assets/category.png'
import { Icon } from '@iconify/react';
import ThemeSwitcher from "../../Componenet/themeswicher";


const Cart = () => {
    const [modal, setModal] = useState(null);
    const [category, setCategory] = useState({
        name: "",
        description: "",
        is_active: "",
        is_home: "",
        category_type: "",
        category_img: "",
        category_id: ""
    });


    const navigate = useNavigate()


    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRefs = useRef([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    // ✅ Fetch categories using RTK Query
    const { data: categories } = useGetWishlistQuery({
        size: itemsPerPage,
        page: currentPage,
        search: searchTerm,
    });
    const [deleteCategory] = useDeleteCategoryMutation();
    const categories1 = categories?.data || [];


    console.log(categories1)


    // ✅ Open & Close Modal
    const openModal = (modalId) => setModal(modalId);
    const closeModal = () => setModal(null);


    const [deletcategory, setDeletcategory] = useState(null);
    // ✅ Handle Delete Category
    const handleDeleteCategory = async () => {
        try {
            const formdata = new FormData()

            formdata.append('category_id', deletcategory)

            await deleteCategory(formdata).unwrap();
            toast.success("Category deleted successfully!");
            closeModal();
        } catch (error) {
            toast.error(error.data?.message || "Failed to delete category");
        }
    };

    // ✅ Dropdown Handling
    const toggleDropdown = (index) => setOpenDropdown(openDropdown === index ? null : index);
    const handleClickOutside = (event) => {
        dropdownRefs.current.forEach((ref, index) => {
            if (ref && !ref.contains(event.target)) {
                setOpenDropdown((prev) => (prev === index ? null : prev));
            }
        });
    };


    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);

    const filteredData = categories1



    const totalPages = categories?.total_pages;

    const displayedData = filteredData



    const handleItemChange = (event) => {
        const value = parseInt(event.target.value);
        setItemsPerPage(value);
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page on new search
    };

    const edit_category11 = (category) => {

        let user_category = data.find((val) => val.category_id == category)
        setCategory(user_category)
    }

    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {

            setSelectedImage(URL.createObjectURL(file));
            setCategory((prev) => ({ ...prev, file })); // Store the file object
        }
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState("");

    const handleImageClick = (imageUrl) => {
        setModalImage(imageUrl);
        setIsModalOpen(true);
    };

    const closeModal1 = () => {
        setIsModalOpen(false);
        setModalImage("");
    };

    const { data: user } = useGetProfileQuery();
    const userdata = user?.data || [];



    const [checkedItems, setCheckedItems] = useState({});

    const toggleCheckbox = (id) => {
        setCheckedItems((prev) => {
            const updated = { ...prev, [id]: !prev[id] };

            // Update header checkbox state
            const allChecked = categories1.every(item => updated[item.category_id]);
            setHeaderChecked(allChecked);

            return updated;
        });
    };

    const [headerChecked, setHeaderChecked] = useState(false);

    const toggleHeaderCheckbox = () => {
        const newCheckedState = !headerChecked;
        setCheckedItems(Array(displayedData.length).fill(newCheckedState));
        setHeaderChecked(newCheckedState);
    };


    // --------------------------------dropdown
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    const getVisiblePages = (currentPage, totalPages) => {
        const pages = [];

        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        pages.push(1);

        if (currentPage > 3) {
            pages.push("...");
        }

        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - 2) {
            pages.push("...");
        }

        pages.push(totalPages);

        return pages;
    };

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
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Whishlist"} />
                    <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block" >
                        <h3 className="text-[22px] font-[700] text-[#707793] uppercase "> Whishlist</h3>

                        <nav className="text-sm text-gray-600 max-sm:mt-[15px] max-sm:ps-[5px]" aria-label="Breadcrumb" >
                            <ol className="flex flex-wrap items-center ">

                                <li className="flex items-center">
                                    <Link to="/dashboard" className="hover:text-primary transition-colors font-[12px] text-[#575864]">Dashboard</Link>
                                    <svg className="mx-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M9 5l7 7-7 7" />
                                    </svg>
                                </li>
                                <li className="text-primary font-medium text-[12px]"> Whishlist</li>
                            </ol>
                        </nav>


                    </div>

                    <div className="border mt-[30px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F]  rounded-[10px]">
                        <div className="p-[20px] flex  gap-4 items-center justify-between">
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
                                              </div> */}

                            <div>
                                <h3 className="font-[600] text-[16px] text-[#313b5e] hans">All Whishlist List</h3>
                            </div>
                            <div className="flex gap-2">
                                <div className="flex items-center gap-2 max-md:hidden">
                                    <span className="text-[#95989d] text-[12px]">Showing</span>
                                    <select
                                        onChange={handleItemChange}
                                        value={itemsPerPage}
                                        className="border-[#dce7f2] text-[#5E5873] rounded-[6px] text-sm border h-[35px] ps-[5px] pe-[10px]"
                                    >
                                        <option value="10">10</option>
                                        <option value="15">15</option>
                                        <option value="20">20</option>
                                        <option value="30">30</option>
                                    </select>
                                    <span className="text-[#95989d] text-[12px]">Entries</span>
                                </div>


                            </div>


                        </div>

                        <div className="min-h-[65vh] ">
                            <table className="w-full ">
                                <thead className="border-y border-[#ddd]">

                                    <tr className="max-sm:h-[40px] h-[54px] ">
                                        <th className="px-[30px]  max-xl:px-[10px]">
                                            <div className="text-start  text-[14px] font-bold text-[#5d7186] sans flex gap-2 items-center">
                                                <div className="cursor-pointer flex items-center space-x-2 max-sm:hidden" onClick={toggleHeaderCheckbox} >
                                                    <div
                                                        className={`checkbox w-[20px] h-[20px] rounded-[4px] bg-[#eef2f7] flex items-center justify-center transition-colors ${headerChecked ? 'bg-[#ff6c2f]' : 'border-2 border-[#ece7e7f1]'
                                                            }`}
                                                    >
                                                        <span
                                                            className={`checkmark bg-[#ff6c2f] ${headerChecked ? 'opacity-100' : 'opacity-0'
                                                                } flex items-center justify-center text-white rounded-[3px] transition-opacity`}
                                                        >
                                                            ✔
                                                        </span>
                                                    </div>
                                                </div>
                                                Name

                                            </div>
                                        </th>

                                        <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-md:text-[13px]  max-sm:px-[10px]">Price</th>
                                        <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-md:text-[13px]  max-sm:px-[10px]">User</th>
                                        <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-md:text-[13px] max-sm:px-[10px]">Action</th>
                                    </tr>


                                </thead>
                                <tbody className="">
                                    {displayedData.map((item, index) => (
                                        <tr
                                            key={index}
                                            className="h-[44px] sm:h-[58px] transition-all duration-200 bg-white hover:bg-[rgba(238,243,249,0.8)] border-b border-[#ddd]"
                                        // onClick={() => navigate("/edit_category", { state: { category_id: item.category_id } })}
                                        >
                                            <td className="text-sm text-[#5E5873] flex  px-[30px] max-xl:px-[10px] max-sm:px-[5px] max-sm:min-w-[120px]   items-center gap-2 my-[15px] max-md:gap-1 max-md:text-[12px]">
                                                <div className="flex justify-center  rounded-[12px] max-sm:hidden">
                                                    <label className="cursor-pointer flex items-center ">
                                                        <div
                                                            className={`checkbox w-[20px] h-[20px]   rounded-[4px] bg-[#eef2f7] flex items-center justify-center transition-colors ${checkedItems[index] ? 'bg-[#ff6c2f] border-ring-[#ff6c2f]' : ' border-2 border-[#ece7e7f1]'
                                                                }`}
                                                            onClick={(e) => {
                                                                e.stopPropagation(); // Prevent row click event
                                                                toggleCheckbox(index)
                                                            }} // Pass the item id to toggle
                                                        >
                                                            <span
                                                                className={`checkmark bg-[#ff6c2f] ${checkedItems[index] ? 'opacity-100' : 'opacity-0'
                                                                    } flex items-center justify-center text-white rounded-[3px] transition-opacity`}
                                                            >
                                                                ✔
                                                            </span>
                                                        </div>
                                                    </label>
                                                </div>

                                                <div className="h-[56px] min-w-[56px] max-md:min-w-[40px] max-md:max-h-[40px] bg-[#eef2f7] rounded-[12px] flex items-center justify-center overflow-hidden">
                                                    <img
                                                        src={`${item.theme_img}`}
                                                        alt="category_img"
                                                        className="object-cover h-[56px] w-[56px] max-md:w-[40px] max-md:h-[40px]"
                                                    />
                                                </div>


                                                <div className="">
                                                    {item.theme_name}

                                                </div>

                                            </td>


                                            <td className="text-sm text-[#5E5873] text-center px-[30px]  max-xl:px-[10px] max-sm:px-[5px] text-nowrap max-md:text-[12px] ">
                                                {item.total_price}
                                            </td>
                                            <td className="text-sm text-[#5E5873] text-center px-[30px]  max-xl:px-[10px] max-sm:px-[5px] text-nowrap max-md:text-[12px] ">
                                                {item.username}
                                            </td>

                                            <td className="text-sm text-[#5E5873] text-center px-[30px] max-xl:px-[10px] max-sm:px-[5px]">
                                                <div className="flex gap-2 justify-center max-md:gap-1 max-sm:gap-0">
                                                    <Link className="w-[44px] h-[32px] max-md:h-[35px] max-md:w-[35px] bg-[#7272721a] flex justify-center items-center text-primary hover:bg-[#72727269] hover:text-white rounded-[0.5rem]" target="_blank" to={item?.demo_url}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" version="1.1" id="Layer_1" width="1.3em" height="1.3em" viewBox="0 0 72 72" enable-background="new 0 0 72 72" xml:space="preserve">
                                                            <g>
                                                                <g>
                                                                    <path d="M18.321,69.07c-2.874,0-5.775-0.845-8.31-2.604l-0.534-0.371c-6.614-4.593-8.259-13.712-3.666-20.326l13.931-18.588    c2.183-3.146,5.522-5.292,9.361-5.984c3.839-0.694,7.717,0.152,10.921,2.377l0.534,0.37c2.72,1.888,4.735,4.676,5.675,7.85    c0.313,1.059-0.291,2.172-1.351,2.485c-1.058,0.311-2.171-0.29-2.485-1.351c-0.691-2.337-2.116-4.308-4.119-5.698l-0.534-0.37    c-2.328-1.617-5.146-2.231-7.931-1.727c-2.787,0.503-5.212,2.061-6.828,4.388L9.055,48.108    c-3.293,4.744-2.099,11.365,2.704,14.701l0.534,0.371c4.801,3.334,11.423,2.142,14.759-2.66l4.256-6.126    c0.631-0.905,1.875-1.129,2.784-0.501c0.906,0.631,1.131,1.877,0.501,2.784l-4.256,6.125C27.504,66.882,22.948,69.07,18.321,69.07    z" />
                                                                </g>
                                                                <g>
                                                                    <path d="M40.297,51.043c-2.877,0-5.784-0.844-8.323-2.606l-0.538-0.375c-2.718-1.888-4.731-4.674-5.669-7.845    c-0.313-1.06,0.292-2.172,1.351-2.485c1.063-0.313,2.173,0.291,2.485,1.351c0.69,2.335,2.114,4.305,4.117,5.696l0.538,0.375    c4.799,3.332,11.421,2.138,14.757-2.664l13.93-18.59c3.294-4.744,2.1-11.365-2.703-14.701l-0.53-0.365    c-2.332-1.621-5.147-2.232-7.936-1.731c-2.787,0.503-5.212,2.061-6.828,4.388l-4.255,6.125c-0.63,0.908-1.876,1.132-2.783,0.502    s-1.132-1.876-0.502-2.783l4.255-6.125c2.225-3.205,5.564-5.351,9.404-6.043c3.838-0.691,7.718,0.153,10.922,2.379l0.529,0.365    c6.62,4.598,8.264,13.717,3.67,20.33l-13.93,18.59C49.453,48.868,44.914,51.043,40.297,51.043z" />
                                                                </g>
                                                                <g>
                                                                    <path d="M52.76,33.106c-0.209,0-0.419-0.065-0.599-0.2c-0.442-0.331-0.532-0.958-0.2-1.399l0.548-0.73    c0.331-0.442,0.959-0.53,1.399-0.2c0.442,0.331,0.532,0.958,0.2,1.399l-0.548,0.73C53.364,32.969,53.064,33.106,52.76,33.106z" />
                                                                </g>
                                                                <g>
                                                                    <path d="M55.047,30.056c-0.209,0-0.419-0.065-0.599-0.2c-0.442-0.331-0.532-0.958-0.2-1.399l4.426-5.904    c1.061-1.528,1.471-3.414,1.134-5.28c-0.337-1.867-1.38-3.491-2.938-4.572l-0.343-0.237c-0.454-0.315-0.567-0.938-0.253-1.392    c0.313-0.454,0.936-0.568,1.392-0.253l0.344,0.238c1.997,1.387,3.334,3.468,3.766,5.86s-0.094,4.81-1.48,6.806l-4.447,5.934    C55.651,29.918,55.352,30.056,55.047,30.056z" />
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </Link>

                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                        {categories?.total_items > itemsPerPage && (
                            <div className="flex items-center max-md:justify-center justify-end my-[20px] mx-[30px]  rounded-[8px] ">
                                {/* Previous Button */}
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className={`h-[32px] md:h-[38px] bg-[#ff6c2f1a] flex items-center justify-center border-[1px] text-[14px] border-[#eaedf1] px-[15px] transition-colors duration-200 hover:text-[#ff6c2f] ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-[6px] h-[10px] sm:w-[8px] sm:h-[16px]" viewBox="0 0 6 10" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.80868 0.175823C5.92127 0.288549 5.9845 0.441354 5.9845 0.600673C5.9845 0.759992 5.92127 0.912797 5.80868 1.02552L2.22552 4.60869L5.80868 8.19185C5.86775 8.24689 5.91512 8.31326 5.94798 8.38701C5.98084 8.46076 5.99851 8.54037 5.99994 8.62109C6.00136 8.70182 5.98651 8.782 5.95627 8.85686C5.92604 8.93172 5.88103 8.99972 5.82394 9.05681C5.76685 9.1139 5.69885 9.15891 5.62399 9.18914C5.54913 9.21938 5.46895 9.23423 5.38822 9.23281C5.3075 9.23138 5.22789 9.21371 5.15414 9.18085C5.08039 9.14799 5.01402 9.10062 4.95898 9.04155L0.950968 5.03354C0.838382 4.92081 0.775143 4.76801 0.775143 4.60869C0.775143 4.44937 0.838382 4.29656 0.950968 4.18384L4.95898 0.175823C5.07171 0.0632379 5.22451 -3.3899e-08 5.38383 -2.69349e-08C5.54315 -1.99709e-08 5.69596 0.0632379 5.80868 0.175823Z" fill="#515151"></path></svg>
                                </button>

                                {/* Pagination */}
                                <ul className="flex h-[32px] md:h-[38px] text-[14px] border-[#eaedf1]">
                                    {getVisiblePages(currentPage, totalPages).map((page, index) => {
                                        if (page === "...") {
                                            return (
                                                <li
                                                    key={`ellipsis-${index}`}
                                                    className="h-[32px] md:h-[38px] w-[32px] md:w-[38px] flex items-center justify-center text-[16px] md:text-[19px] text-[#5d7186]"
                                                >
                                                    ...
                                                </li>
                                            );
                                        }

                                        return (
                                            <li
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`h-[32px] md:h-[38px] w-[32px] md:w-[38px] flex items-center justify-center text-[16px] md:text-[19px] font-semibold transition-all duration-200 ${currentPage === page
                                                    ? "bg-[#ff6c2f] text-white"
                                                    : "bg-transparent text-[#5d7186] cursor-pointer hover:bg-[#ff6c2f1a]"
                                                    }`}
                                            >
                                                {page}
                                            </li>
                                        );
                                    })}
                                </ul>
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className={`h-[32px] md:h-[38px] bg-[#ff6c2f1a] border-[1px] border-[#eaedf1] flex items-center text-[14px] justify-center px-[15px] transition-colors duration-200 hover:text-[#ff6c2f] ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-[6px] h-[10px] sm:w-[8px] sm:h-[16px]" viewBox="0 0 6 10" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.19135 0.175823C0.0787642 0.288549 0.0155259 0.441354 0.0155259 0.600673C0.0155259 0.759992 0.0787643 0.912797 0.19135 1.02552L3.77451 4.60869L0.19135 8.19185C0.132283 8.24689 0.0849057 8.31326 0.0520464 8.38701C0.0191871 8.46076 0.00151821 8.54037 9.39398e-05 8.62109C-0.00133033 8.70182 0.0135193 8.782 0.0437565 8.85686C0.0739938 8.93172 0.119 8.99972 0.176089 9.05681C0.233178 9.1139 0.301181 9.15891 0.376041 9.18914C0.450901 9.21938 0.531085 9.23423 0.611808 9.23281C0.692532 9.23138 0.772142 9.21371 0.845889 9.18085C0.919636 9.14799 0.986009 9.10062 1.04105 9.04155L5.04906 5.03354C5.16165 4.92081 5.22489 4.76801 5.22489 4.60869C5.22489 4.44937 5.16165 4.29656 5.04906 4.18384L1.04105 0.175823C0.928323 0.0632379 0.775518 -3.3899e-08 0.616199 -2.69349e-08C0.45688 -1.99709e-08 0.304075 0.0632379 0.19135 0.175823Z" fill="#515151"></path></svg>
                                </button>
                            </div>

                        )}


                    </div>


                </div>
            </div>
        </div>
    )
}

export default Cart
