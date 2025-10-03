import React, { useState, useEffect, useRef, useCallback } from "react";
import User_side_menu from '../../Componenet/user_side_menu';
import { useNavigate, Link } from "react-router-dom";
import EmployList from '../../Componenet/EmployList';
import SubHeader from '../../Componenet/sub_header';
import { ToastContainer, toast } from "react-toastify";
import { useDropzone } from 'react-dropzone';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Category_img from '../../assets/category.png';
import Searchdropdown from "../../Componenet/searchdropdown";
import { useAddCategoryMutation, useAddSubCategoryMutation, useGetCategories_fetch_allQuery, useGetCategoriesQuery } from "../../services/apiSlice";
import ThemeSwitcher from "../../Componenet/themeswicher";

const Create_category = () => {


    const [category, setCategory] = useState({ component: '' });



    const [modal, setModal] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);
    const [images, setImages] = useState([]);
    const [image, setImage] = useState(null);
    const [replaceIndex, setReplaceIndex] = useState(null);
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const dropdownRefs = useRef([]);
    const [previewImage, setPreviewImage] = useState(null);

    const [selectedImage, setSelectedImage] = useState(null); // State for the selected image
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal visibility


    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length === 0) return;

        const file = acceptedFiles[0]; // Take first file

        // Clean up previous preview if exists
        if (images[0]?.preview) {
            URL.revokeObjectURL(images[0].preview);
        }

        const preview = URL.createObjectURL(file); // Create preview URL from binary
        const fileWithPreview = Object.assign(file, { preview }); // Add preview property to file

        setImages([fileWithPreview]);         // Store binary with preview
        setSelectedImage(preview);            // For showing selected preview
    }, [images]);


    useEffect(() => {
        return () => {
            images.forEach(image => URL.revokeObjectURL(image.preview));
        };
    }, [images]);


    const { getRootProps, getInputProps } = useDropzone({
        accept: { "image/*": [] },
        multiple: false,
        onDrop
    });

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const reordered = Array.from(images);
        const [removed] = reordered.splice(result.source.index, 1);
        reordered.splice(result.destination.index, 0, removed);

        setImages(reordered);

        // Update selected image after reorder
        if (selectedImage) {
            const match = reordered.find(img => img.preview === selectedImage);
            setSelectedImage(match ? match.preview : reordered[0]?.preview || null);
        }
    };



    useEffect(() => {
        return () => {
            images.forEach(image => URL.revokeObjectURL(image.preview));
        };
    }, []);



    const handleClickOutside = (event) => {
        dropdownRefs.current.forEach((ref, index) => {
            if (ref && !ref.contains(event.target)) {
                setModal(prev => prev === index ? null : prev);
            }
        });
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const triggerFileDialog = (index = null) => {
        if (index !== null) {
            setReplaceIndex(index); // Set the index for replacing an image
        } else {
            setReplaceIndex(null);  // Reset replaceIndex if not passed
        }
        setIsModalOpen(true);  // Open modal for file selection
    };




    const removeImage = (index) => {
        setImages(prev => {
            const removed = prev[index];
            const updated = prev.filter((_, i) => i !== index);

            // Update selectedImage before revoking
            if (removed.preview === selectedImage) {
                setSelectedImage(updated[0]?.preview || null);
            }

            // Revoke only the removed image URL
            URL.revokeObjectURL(removed.preview);
            return updated;
        });
    };


    useEffect(() => {
        if (!selectedImage && images.length > 0) {
            setSelectedImage(images[0].preview);
        }
    }, [images, selectedImage]);



    // serching dropdown
    const [openDropdown, setOpenDropdown] = useState(null);

    const handleDropdownSelect = (field, value) => {
        setCategory((prev) => ({ ...prev, [field]: value }));
        setOpenDropdown(null);
    };

    const toggleDropdown = (index) => {
        setOpenDropdown((prev) => (prev === index ? null : index));
    };

    const [homeActive, setHomeActive] = useState(false);
    const [homeInactive, setHomeInactive] = useState(false);

    const [statusActive, setStatusActive] = useState(false);
    const [statusInactive, setStatusInactive] = useState(false);
    const toggleHomeActive = () => {
        setHomeActive(true);
        setHomeInactive(false);
    };

    const toggleHomeInactive = () => {
        setHomeActive(false);
        setHomeInactive(true);
    };

    const toggleStatusActive = () => {
        setStatusActive(true);
        setStatusInactive(false);
    };

    const toggleStatusInactive = () => {
        setStatusActive(false);
        setStatusInactive(true);
    };
    const [form, setForm] = useState({
        subcategoryname: "",
        description: "",
    });
    const [addsubcategory] = useAddSubCategoryMutation();

    const handlesubmit = async () => {

        try {
            const formData = new FormData();
            formData.append("name", form.subcategoryname);
            formData.append("description", form.description);
            formData.append("is_home", homeActive ? "True" : "False");
            formData.append("is_active", statusActive ? "True" : "False");
            formData.append("category_id", form.category_id);
            const response1 = await fetch(selectedImage);
            const blob = await response1.blob();

            // You can name the file manually if needed
            const fileName = "image.jpg"; // or derive from original file
            const file = new File([blob], fileName, { type: blob.type });

            formData.append("subcategory_img", file);



            const response = await addsubcategory(formData).unwrap();

            toast.success("Add Sub Category successfully add!");


            setTimeout(() => {
                navigate("/subcategory");
            }, 1000);


        } catch (error) {
            const errorMessage =
                error?.data?.message ||         // RTK Query error format
                error?.detail ||         // RTK Query error format
                error?.data?.detail ||         // RTK Query error format
                error?.error ||                 // RTK fallback error message (e.g., network error)
                error?.message ||               // JS error object message
                "Something went wrong!";
            console.log(error);
            toast.error(errorMessage)

        }
    };


    const [openDropdown1, setOpenDropdown1] = useState(null); // Track which dropdown is open

    const toggleDropdown1 = (label) => {
        setOpenDropdown1((prev) => (prev == label ? null : label));
    };

    let categoryOptions = [];
    const { data: categories } = useGetCategories_fetch_allQuery();
    if (categories?.data) {
        categoryOptions = categories?.data.map((val) => ({
            id: val.category_id,
            name: val.name,
        }));
    }
    const handleCategorySelect = (value) => {
        const selectedCategory = categoryOptions.find((cat) => cat.name === value);


        setForm({
            ...form,
            category_id: selectedCategory?.id,
        });
    };


    return (
        <div>
            <ThemeSwitcher />
            <ToastContainer position="top-center" autoClose={1500} />
            <User_side_menu setIsOpen={setIsOpen} isOpenside={isOpenside} />
            <div className='flex inter'>
                <EmployList isOpen={isOpen} setIsOpen={setIsOpen} />
                <div className="w-full width__right relative max-md:ms-0">
                    <SubHeader pageName={"Category Add"} />
                    <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block">
                        <h3 className="text-[22px] font-[700] text-[#707793] uppercase">Category Add</h3>
                        <div className="flex justify-end items-center max-lg:justify-start">
                            <nav className="text-sm text-gray-600 max-sm:mt-[15px] max-sm:ps-[5px]" aria-label="Breadcrumb">
                                <ol className="flex flex-wrap items-center">
                                    <li className="flex items-center">
                                        <Link to="/dashboard" className="hover:text-primary font-[12px] text-[#575864]">Dashboard</Link>
                                        <svg className="mx-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M9 5l7 7-7 7" />
                                        </svg>
                                    </li>
                                    <li className="flex items-center">
                                        <Link to="/dashboard" className="hover:text-primary font-[12px] text-[#575864]">Category</Link>
                                        <svg className="mx-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M9 5l7 7-7 7" />
                                        </svg>
                                    </li>
                                    <li className="text-primary font-medium text-[12px]">New Category</li>
                                </ol>
                            </nav>
                        </div>
                    </div>

                    <div className="flex gap-8 max-lg:block">
                        {/* Left Panel */}
                        <div className="w-[25%] max-2xl:w-[40%] max-lg:w-[100%]     ">
                            <div className="  p-[20px] max-sm:p-[10px] rounded-xl bg-white shadow-[0_4px_24px_2px_rgba(20,25,38,0.05)]">

                                <div className="mt-5">
                                    <h4 className="hans font-[600] text-[25px] text-[#313b5e] mb-[18px] max-sm:text-[16px] max-sm:mb-[12px]">{form.subcategoryname}</h4>


                                    {/* <p className="text-[#666666]">{form.description}</p> */}

                                    <div className="flex gap-10">
                                        <div>

                                            <h6 className="mt-[20px] text-[#9b9b9b]">Home</h6>
                                            {(homeActive || homeInactive) && (
                                                <div className="mt-3 inline-block">
                                                    <span
                                                        className={`px-3 py-[4px] rounded-[8px] text-[13px] font-medium ${homeActive
                                                            ? 'bg-[#ff6c2f] text-white'
                                                            : 'bg-[#d3d3d3] text-[#444]'
                                                            }`}
                                                    >
                                                        {homeActive ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div>

                                            <h6 className="mt-[20px] text-[#9b9b9b]">Status</h6>
                                            {(statusActive || statusInactive) && (
                                                <div className="mt-3 inline-block">
                                                    <span
                                                        className={`px-3 py-[4px] rounded-[8px] text-[13px] font-medium ${statusActive
                                                            ? 'bg-[#ff6c2f] text-white'
                                                            : 'bg-[#d3d3d3] text-[#444]'
                                                            }`}
                                                    >
                                                        {statusActive ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                    {/* <div className="grid grid-cols-3 gap-x-6 gap-y-4 pb-6 max-sm:p-0 max-sm:pb-4">
                                    <div>
                                        <p className="mb-[1px] mt-[6px] text-[#5D7186] text-[14px] text-nowrap">Created By :</p>
                                        <h5 className="hans text-[#313b5e] font-[600] text-[15px]">Seller</h5>
                                    </div>
                                    <div>
                                        <p className="mb-[1px] mt-[6px] text-[#5D7186] text-[14px]">Stock :</p>
                                        <h5 className="hans text-[#313b5e] font-[600] text-[15px]">46233</h5>
                                    </div>
                                    <div>
                                        <p className="mb-[1px] mt-[6px] text-[#5D7186] text-[14px]">ID :</p>
                                        <h5 className="hans text-[#313b5e] font-[600] text-[15px]">FS16276</h5>
                                    </div>
                                </div> */}
                                    {/* <div className="flex gap-2 border-t border-[#eaedf1] pt-4">
                                    <button className="w-[100%] h-[39px] text-gray border-[1px] border-gray rounded-[12px] text-[14px] mt-[12px]">Create Category</button>
                                    <button className="w-[100%] h-[39px] text-white bg-primary rounded-[12px] text-[14px] mt-[12px]">Cancel</button>
                                </div> */}
                                </div>
                            </div>
                        </div>

                        {/* Right Panel */}
                        <div className="w-[75%] max-2xl:w-[60%] max-lg:w-[100%]  rounded-xl  max-lg:mt-[24px]">
                            {/* <div className="w-[100%]  rounded-xl  max-lg:mt-[24px]"> */}

                            <div className="bg-white shadow-md rounded-[12px]">
                                <h4 className="px-[24px] py-[18px] max-lg:px-[18px] max-sm:p-[10px] font-[600] text-[#313b5e] text-[16px] border-b border-[#eaedf1] hans ">
                                    Add Product Photo
                                </h4>
                                <div className="mb-[24px] px-[24px] max-lg:px-[18px] max-sm:p-[10px] py-[18px]">
                                    <input
                                        ref={inputRef}
                                        type="file"
                                        accept="image/png,image/jpeg,image/gif,video/*"

                                        className="hidden"
                                        onChange={(e) => onDrop(Array.from(e.target.files))}
                                    />

                                    <DragDropContext onDragEnd={handleDragEnd}>
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            {images.length === 0 ? (
                                                <div
                                                    className="border-2 border-dashed border-[#d8dfe7] rounded-[6px] min-h-[150px] p-[20px] flex justify-center items-center cursor-pointer"
                                                    onClick={() => triggerFileDialog()}
                                                >
                                                    <div className="py-[32px] text-center">
                                                        <i className="fa-solid fa-cloud-arrow-up text-primary text-[3rem]" />
                                                        <h3 className="mt-[2.25rem] text-[24px] font-[600] text-[#313b5e] mb-[10px]">
                                                            Drop your images here, or{" "}
                                                            <span className="text-primary">click to browse</span>
                                                        </h3>
                                                        <p className="text-gray text-[13px]">
                                                            1600 x 1200 (4:3) recommended. PNG, JPG and GIF files are allowed
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="border-2 border-dashed border-[#d8dfe7] rounded-[6px] min-h-[150px] p-[25px] max-lg:p-[18px] max-sm:p-[10px] flex items-center cursor-pointer">
                                                    <Droppable droppableId="images" direction="horizontal">
                                                        {(provided) => (
                                                            <div
                                                                className="flex gap-5 flex-wrap max-sm:gap-3 max-lg:justify-center"
                                                                ref={provided.innerRef}
                                                                {...provided.droppableProps}
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                {images.map((file, idx) =>
                                                                    file.preview ? (
                                                                        <Draggable key={file.preview} draggableId={file.preview} index={idx}>
                                                                            {(provided) => (
                                                                                <div
                                                                                    className={`relative group w-[130px] max-lg:w-[110px] max-sm:w-[120px] ${selectedImage === file.preview ? "" : ""
                                                                                        }`}
                                                                                    ref={provided.innerRef}
                                                                                    {...provided.draggableProps}
                                                                                    {...provided.dragHandleProps}
                                                                                >
                                                                                    <span className="absolute top-1 left-1 bg-green-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center z-10">
                                                                                        {idx + 1}
                                                                                    </span>
                                                                                    <img
                                                                                        src={file.preview}
                                                                                        alt={`preview-${idx}`}
                                                                                        className="w-full h-[130px] rounded-[0.5rem]  max-lg:h-[110px] max-sm:h-[120px] object-cover  cursor-pointer"
                                                                                        onClick={(e) => {
                                                                                            e.stopPropagation();
                                                                                            setSelectedImage(file.preview);
                                                                                        }}
                                                                                    />
                                                                                    <button
                                                                                        onClick={(e) => {
                                                                                            e.stopPropagation();
                                                                                            removeImage(idx);
                                                                                        }}
                                                                                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition"
                                                                                    >
                                                                                        ✕
                                                                                    </button>
                                                                                </div>
                                                                            )}
                                                                        </Draggable>
                                                                    ) : null
                                                                )}
                                                                {provided.placeholder}
                                                            </div>
                                                        )}
                                                    </Droppable>
                                                </div>
                                            )}
                                        </div>
                                    </DragDropContext>
                                </div>
                            </div>
                            <div className="mb-[24px]     bg-white shadow-md rounded-[12px]">
                                <h4 className="px-[24px] py-[18px] max-lg:px-[18px] max-sm:p-[10px]   font-[600] text-[#313b5e] text-[16px] border-b border-[#eaedf1] hans">General Information</h4>
                                <div className="px-[24px] py-[18px] max-sm:p-[10px]  max-lg:px-[18px] ">
                                    <div className="mb-4 flex gap-5 max-sm:block">
                                        <div className="w-[100%] max-sm:mb-4">
                                            <Searchdropdown
                                                label="Category"
                                                onToggle={() => toggleDropdown1("Category")} // Pass 'Category' to toggle it
                                                options={categoryOptions.map((val) => val.name)}
                                                value={categoryOptions.find((cat) => cat.id == form.category_id)?.name || ""}
                                                isOpen={openDropdown1 === "Category"} // Check if this dropdown is open
                                                setIsOpen={(state) => setOpenDropdown1(state ? "Category" : null)}
                                                onSelect={handleCategorySelect}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4 flex gap-5 max-sm:block">
                                        <div className="w-[100%] max-sm:mb-4">
                                            <label className="block text-sm font-medium text-gray"> Name</label>
                                            <input
                                                type="text"
                                                value={form.subcategoryname}
                                                onChange={(e) => {

                                                    setForm({ ...form, subcategoryname: e.target.value });
                                                }}
                                                placeholder="Enter Title"
                                                className="mt-[5px] bg-transparent w-full h-[40px] px-[15px] border border-[#C8C8C8] text-[#9CA3AF] rounded-[7px] text-sm focus:ring-[#9CA3AF] focus:border-[#9CA3AF]"
                                            />
                                        </div>
                                    </div>



                                    <div className="mb-4 ">
                                        <label className="block text-sm font-medium text-gray">Description</label>
                                        <textarea
                                            value={form.description}
                                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                                            rows={6}
                                            placeholder="Enter  description..."
                                            className="w-full mt-[5px] px-[15px] bg-transparent py-[10px] border border-[#C8C8C8] rounded-lg text-sm text-[#9CA3AF]  focus:ring-[#9CA3AF] focus:border-[#9CA3AF] resize-y"
                                        />
                                    </div>
                                    <div className="mb-4 ">
                                        <label className="block text-sm font-medium text-gray mb-3">Home </label>
                                        <div className="cursor-pointer flex items-center  max-sm:hidden">
                                            <div onClick={toggleHomeActive}
                                                className={`border-1 checkbox w-[20px] h-[20px] rounded-[4px] bg-[#eef2f7] flex items-center justify-center transition-colors ${homeActive ? 'bg-[#ff6c2f] border-primary' : ' border-[#ece7e7f1]'}`}>
                                                <span className={`checkmark bg-[#ff6c2f] ${homeActive ? 'opacity-100' : 'opacity-0'} flex items-center justify-center text-white rounded-[3px] transition-opacity`}>
                                                    ✔
                                                </span>
                                            </div>
                                            <span className="pe-10 text-[14px] cursor-default text-[#5d7186]">Active</span>

                                            <div onClick={toggleHomeInactive}
                                                className={`border-1 checkbox w-[20px] h-[20px] rounded-[4px] bg-[#eef2f7] flex items-center justify-center transition-colors ${homeInactive ? 'bg-[#ff6c2f] border-primary' : ' border-[#ece7e7f1]'}`}>
                                                <span className={`checkmark bg-[#ff6c2f] ${homeInactive ? 'opacity-100' : 'opacity-0'} flex items-center justify-center text-white rounded-[3px] transition-opacity`}>
                                                    ✔
                                                </span>
                                            </div>
                                            <span className="pe-10 text-[14px] cursor-default text-[#5d7186]">InActive</span>
                                        </div>

                                    </div>
                                    <div className="mb-4 ">
                                        <label className="block text-sm font-medium text-gray mb-3"> Status</label>
                                        <div className="cursor-pointer flex items-center  max-sm:hidden">
                                            <div onClick={toggleStatusActive}
                                                className={`border-1 checkbox w-[20px] h-[20px] rounded-[4px] bg-[#eef2f7] flex items-center justify-center transition-colors ${statusActive ? 'bg-[#ff6c2f] border-primary' : ' border-[#ece7e7f1]'}`}>
                                                <span className={`checkmark bg-[#ff6c2f] ${statusActive ? 'opacity-100' : 'opacity-0'} flex items-center justify-center text-white rounded-[3px] transition-opacity`}>
                                                    ✔
                                                </span>
                                            </div>
                                            <span className="pe-10 text-[14px] cursor-default text-[#5d7186]">Active</span>

                                            <div onClick={toggleStatusInactive}
                                                className={`border-1 checkbox w-[20px] h-[20px] rounded-[4px] bg-[#eef2f7] flex items-center justify-center transition-colors ${statusInactive ? 'bg-[#ff6c2f] border-primary' : ' border-[#ece7e7f1]'}`}>
                                                <span className={`checkmark bg-[#ff6c2f] ${statusInactive ? 'opacity-100' : 'opacity-0'} flex items-center justify-center text-white rounded-[3px] transition-opacity`}>
                                                    ✔
                                                </span>
                                            </div>
                                            <span className="pe-10 text-[14px] cursor-default text-[#5d7186]">InActive</span>
                                        </div>

                                    </div>
                                </div>
                            </div>





                            <div className="flex justify-end items-center  bg-[#eef2f7] rounded-[12px]" >
                                <div className="p-[17px]  flex flex-row-reverse gap-3 max-sm:ps-0">

                                    <div className="flex gap-2 border-t border-[#eaedf1] w-[100%] ">
                                        <button onClick={handlesubmit} className="w-[182px]   max-sm:w-[125px] h-[39px] text-gray border-[1px] border-gray rounded-[12px] text-[14px] mt-[12px] hover:bg-gray hover:text-white">Save Change</button>
                                        <button onClick={() => {
                                            navigate(-1)
                                        }} className="w-[182px]  max-sm:w-[125px] h-[39px] text-white bg-primary  border-[1px] border-primary  rounded-[12px] text-[14px] mt-[12px] hover:text-primary hover:bg-transparent">Cancel</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create_category;
