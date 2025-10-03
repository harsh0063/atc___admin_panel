import React, { useEffect, useState, useRef } from "react";
import User_side_menu from '../../Componenet/user_side_menu'
import EmployList from '../../Componenet/EmployList'
import SubHeader from '../../Componenet/sub_header'
import Dropdown from '../../Componenet/dropdown'
import { ToastContainer, toast } from "react-toastify";
import { useGetCategoriesQuery, useDeleteCategoryMutation, useGetProfileQuery, } from "../../services/apiSlice";
import { Link, useNavigate } from "react-router-dom";
import Category_img from '../../assets/category.png'
import { Icon } from '@iconify/react';
import ThemeSwitcher from "../../Componenet/themeswicher";


const Category = () => {
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
    const { data: categories } = useGetCategoriesQuery({
        size: itemsPerPage,
        page: currentPage,
        search: searchTerm,
    });
    const [deleteCategory] = useDeleteCategoryMutation();
    const categories1 = categories?.data || [];





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



    const totalPages = categories?.total_pages

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
                {/* <Service_side_menu isOpenside={isOpenside} setIsOpenside={setIsOpenside} /> */}
                <div className="w-full width__right relative max-md:ms-0">
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Category"} />
                    <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block" >
                        <h3 className="text-[22px] font-[700] text-[#707793] uppercase "> Category</h3>

                        <nav className="text-sm text-gray-600 max-sm:mt-[15px] max-sm:ps-[5px]" aria-label="Breadcrumb" >
                            <ol className="flex flex-wrap items-center ">

                                <li className="flex items-center">
                                    <Link to="/dashboard" className="hover:text-[var(--blue)] transition-colors font-[12px] text-[#575864]">Dashboard</Link>
                                    <svg className="mx-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M9 5l7 7-7 7" />
                                    </svg>
                                </li>
                                <li className="text-[var(--blue)] font-medium text-[12px]">All Category</li>
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
                                <h3 className="font-[600] text-[16px] text-[#313b5e] hans">All Categories List</h3>
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
                                <div>
                                    <Link to="/create_category">
                                        <button className="bg-[var(--blue)] text-white text-[12.6px] rounded-[8px] py-[5.56px] px-[12px]">Add Category</button>
                                    </Link>
                                </div>
                                <div>

                                    <div className="relative inline-block text-left max-sm:hidden" ref={dropdownRef}>
                                        <button
                                            onClick={() => setOpen(!open)}
                                            className="bg-[#eef2f7] text-[#5d7186] text-[12.6px] rounded-[8px] py-[6px] px-[12px] hover:bg-[#dce3ec] transition-colors"
                                        >
                                            This Month
                                        </button>

                                        {open && (
                                            <div className="absolute right-0 mt-2 w-40 bg-[#eef2f7] border border-[#ddd] rounded-[8px] shadow-md z-10">
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-sm text-[#5d7186] hover:bg-[#dce3ec] transition-colors"
                                                >
                                                    Download
                                                </a>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-sm text-[#5d7186] hover:bg-[#dce3ec] transition-colors"
                                                >
                                                    Export
                                                </a>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-sm text-[#5d7186] hover:bg-[#dce3ec] transition-colors"
                                                >
                                                    Import
                                                </a>
                                            </div>
                                        )}
                                    </div>
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

                                        <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-lg:hidden max-md:text-[13px] max-sm:px-[10px]">Description</th>
                                        <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-md:text-[13px] max-sm:hidden max-sm:px-[10px]">Is Home</th>
                                        <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-md:text-[13px] max-sm:px-[10px]">Status</th>
                                        <th className="text-[14px] font-bold text-center text-[#5d7186] sans text-nowrap max-md:text-[13px] max-sm:px-[10px]">Action</th>
                                    </tr>


                                </thead>
                                <tbody className="">
                                    {displayedData.map((item, index) => (
                                        <tr
                                            key={index}
                                            className="h-[44px] sm:h-[58px] transition-all duration-200 bg-white hover:bg-[rgba(238,243,249,0.8)] border-b border-[#ddd]"
                                            onClick={() => {
                                                if (window.innerWidth <= 640) {
                                                    navigate("/edit_category", {
                                                        state: { category_id: item },
                                                    });
                                                }
                                            }}

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
                                                        src={`${import.meta.env.VITE_API_BASE_URL}${item.category_img}`}
                                                        alt="category_img"
                                                        className="object-cover h-[56px] w-[56px] max-md:w-[40px] max-md:h-[40px]"
                                                    />
                                                </div>


                                                <div className="">
                                                    {item.name}

                                                </div>

                                            </td>
                                            <td className="text-sm text-[#5E5873] text-center px-[30px] max-xl:px-[10px] max-sm:px-[5px] max-lg:hidden max-md:text-[12px]">
                                                {item.description.split(" ").slice(0, 10).join(" ")}{item.description.split(" ").length > 10 ? '...' : ''}
                                            </td>

                                            <td className="text-sm text-[#5E5873] text-center px-[30px]  max-xl:px-[10px] max-sm:px-[5px] text-nowrap max-md:text-[12px] max-sm:hidden">
                                                <button
                                                    className={`px-[16px] py-1 rounded-[400px] ${item?.is_home == true
                                                        ? "bg-[#22c55e1a] text-[#22c55e]"
                                                        : "text-[var(--blue)] bg-[#ff6c2f1a] "
                                                        }`}
                                                >
                                                    {item?.is_home ? "Active" : "Inactive"}
                                                </button>
                                            </td>
                                            <td className="text-sm text-[#5E5873] text-center px-[30px]  max-xl:px-[10px] max-sm:px-[5px] max-md:text-[12px]">
                                                <button
                                                    className={`px-[16px] py-1 rounded-[400px] ${item?.is_active == true
                                                        ? "bg-[#22c55e1a] text-[#22c55e]"
                                                        : "text-[var(--blue)] bg-[#ff6c2f1a] "
                                                        }`}
                                                >
                                                    {item?.is_active ? "Active" : "Inactive"}
                                                </button>
                                            </td>
                                            <td className="text-sm text-[#5E5873] text-center px-[30px] max-xl:px-[10px] max-sm:px-[5px]">
                                                <div className="flex gap-2 justify-center max-md:gap-1 max-sm:gap-0">
                                                    {/* <button className="w-[44px] h-[32px] max-md:h-[25px] max-md:w-[30px] bg-[#ff6c2f1a] flex justify-center items-center text-primary rounded-[0.5rem] hover:bg-primary max-md:hidden hover:text-white">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                                                            <g fill="none" stroke="currentColor" strokeWidth="1.5">
                                                                <path strokeLinecap="round" d="M9 4.46A9.8 9.8 0 0 1 12 4c4.182 0 7.028 2.5 8.725 4.704C21.575 9.81 22 10.361 22 12c0 1.64-.425 2.191-1.275 3.296C19.028 17.5 16.182 20 12 20s-7.028-2.5-8.725-4.704C2.425 14.192 2 13.639 2 12c0-1.64.425-2.191 1.275-3.296A14.5 14.5 0 0 1 5 6.821"></path>
                                                                <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z"></path>
                                                            </g>
                                                        </svg>
                                                    </button> */}
                                                    <button className="w-[44px] h-[32px] max-md:h-[35px] max-md:w-[35px] max-sm:hidden bg-[#ff6c2f1a] flex justify-center items-center text-[var(--blue)] rounded-[0.5rem] hover:bg-[var(--blue)] hover:text-white" onClick={() => navigate("/edit_category", { state: { category_id: item } })}>
                                                        <Icon icon="solar:pen-2-broken" className="align-middle h-[1.3em] w-[1.3em]" />
                                                    </button>
                                                    <button onClick={(e) => {
                                                        openModal('modal3')
                                                        e.stopPropagation(); // Prevent row click event
                                                        setDeletcategory(item.category_id)
                                                    }} className="w-[44px] h-[32px] max-md:h-[35px] max-md:w-[35px] bg-[#ff6c2f1a] flex justify-center items-center text-[var(--blue)] hover:bg-[var(--blue)] hover:text-white rounded-[0.5rem]">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                                                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M20.5 6h-17m5.67-2a3.001 3.001 0 0 1 5.66 0m3.544 11.4c-.177 2.654-.266 3.981-1.131 4.79s-2.195.81-4.856.81h-.774c-2.66 0-3.99 0-4.856-.81c-.865-.809-.953-2.136-1.13-4.79l-.46-6.9m13.666 0l-.2 3"></path>
                                                        </svg>
                                                    </button>
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

                                {/* Next Button */}
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





            {
                modal === 'modal3' && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">

                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                                <div className="relative transform overflow-hidden p-[30px] border-t-[8px] border-[#F44336] rounded-[6px] bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl z-40">
                                    <div className="bg-white ">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xl font-medium text-gray">Delete</h3>
                                            <div onClick={closeModal}>
                                                <svg className="closeModal cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M1.15128 0.751862C1.61991 0.283233 2.3797 0.283233 2.84833 0.751862L7.9998 5.90333L13.1513 0.751862C13.6199 0.283233 14.3797 0.283233 14.8483 0.751862C15.317 1.22049 15.317 1.98029 14.8483 2.44892L9.69686 7.60039L14.8483 12.7519C15.317 13.2205 15.317 13.9803 14.8483 14.4489C14.3797 14.9175 13.6199 14.9175 13.1513 14.4489L7.9998 9.29745L2.84833 14.4489C2.3797 14.9175 1.61991 14.9175 1.15128 14.4489C0.682647 13.9803 0.682647 13.2205 1.15128 12.7519L6.30275 7.60039L1.15128 2.44892C0.682647 1.98029 0.682647 1.22049 1.15128 0.751862Z" fill="#495567" />
                                                </svg>
                                            </div>
                                        </div>
                                        <p className="pt-[14px] text-[#8492A6]">Are you sure you want to delete this category?</p>


                                    </div>
                                    <div className="  pt-[30px] flex flex-row-reverse gap-3 ">
                                        <button type="button" onClick={handleDeleteCategory} className="inline-flex h-[35px] sm:h-[40px]  w-[114px] shadow-[0px_8px_20px_1px_#F443364D] rounded-md bg-[#F44336] items-center   justify-center py-2 text-sm font-semibold text-white shadow-xs  sm:ml-3 ">Delete</button>
                                        <button type="button" className=" bg-[#F4F1FC] h-[35px] sm:h-[40px] w-[114px] closeModal   rounded-md border-0   inline-flex justify-center items-center  py-2 text-sm font-semibold  shadow-xs   sm:mt-0 " onClick={closeModal} >Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {isModalOpen && (
                <div
                    className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50"
                    onClick={closeModal}
                >
                    <div className="">
                        <img
                            src={modalImage}
                            alt="Zoomed"
                            className="w-auto h-auto max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
                        />
                        {/* Close Button */}
                        <button
                            className="absolute top-2 right-2 bg-white text-black px-3 py-1 rounded-full text-xl"
                            onClick={closeModal1}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}


        </div>
    )
}
export default Category
