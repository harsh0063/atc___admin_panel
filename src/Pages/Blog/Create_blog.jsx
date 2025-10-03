import React, { useState, useEffect, useRef, useCallback } from "react";
import User_side_menu from '../../Componenet/user_side_menu';
import { useNavigate, Link } from "react-router-dom";
import EmployList from '../../Componenet/EmployList';
import SubHeader from '../../Componenet/sub_header';
import { ToastContainer, toast } from "react-toastify";
import { useDropzone } from 'react-dropzone';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Category_img from '../../assets/category.png';
import Dropdown from "../../Componenet/dropdown";
import { useAddBlogMutation, useAddCategoryMutation } from "../../services/apiSlice";
import ThemeSwitcher from "../../Componenet/themeswicher";
import JoditEditor from 'jodit-react';

const Create_category = () => {

    const editor = useRef(null);
    const [category, setCategory] = useState({ component: '' });
    const [content, setContent] = useState('');






    const [modal, setModal] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);
    const [images, setImages] = useState([]);

    const navigate = useNavigate();
    const dropdownRefs = useRef([]);

    const [selectedImage, setSelectedImage] = useState(null); // State for the selected image
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal visibility


    useEffect(() => {
        return () => {
            images.forEach(image => URL.revokeObjectURL(image.preview));
        };
    }, [images]);




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






    useEffect(() => {
        if (!selectedImage && images.length > 0) {
            setSelectedImage(images[0].preview);
        }
    }, [images, selectedImage]);



    // serching dropdown
    const [openDropdown, setOpenDropdown] = useState(null);





    const [statusActive, setStatusActive] = useState(false);
    const [statusInactive, setStatusInactive] = useState(false);


    const toggleStatusActive = () => {
        setStatusActive(true);
        setStatusInactive(false);
    };

    const toggleStatusInactive = () => {
        setStatusActive(false);
        setStatusInactive(true);
    };
    const [form, setForm] = useState({
        title: "",
        subtitle: "",
        meta_title: "",
        meta_keyword: "",
        meta_description: "",
        alt_text: "",
        canonical_url: "",
        editor_notes: "",
        body: "", // from Jodit
        blog_picture: null, // file
    });

    const [addblog] = useAddBlogMutation();

    const handlesubmit = async () => {

        try {
            const formData = new FormData();
            formData.append("title", form.title);
            formData.append("subtitle", form.subtitle);
            formData.append("body", form.body); // Rich HTML from Jodit Editor
            formData.append("meta_title", form.meta_title || "");
            formData.append("meta_keyword", form.meta_keyword || "");
            formData.append("meta_description", form.meta_description || "");
            formData.append("alt_text", form.alt_text || "");
            formData.append("canonical_url", form.canonical_url || "");
            formData.append("publish_blog", statusActive ? "True" : "False");
            formData.append("draft_mode", draft_active ? "True" : "False");
            formData.append("reviewed", reviewed_active ? "True" : "False");
            formData.append("editor_notes", form.editor_notes || "");
            const now = new Date();

            const formattedDateTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
                now.getDate()
            ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(
                now.getMinutes()
            ).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

            formData.append("publish_date", formattedDateTime);


            if (form.blog_picture) {
                formData.append("blog_picture", form.blog_picture); // should be File object
            }

            const response1 = await fetch(selectedImage);
            const blob = await response1.blob();

            // You can name the file manually if needed
            const fileName = "image.jpg"; // or derive from original file
            const file = new File([blob], fileName, { type: blob.type });




            const response = await addblog(formData).unwrap();

            toast.success("Blog successfully add!");


            setTimeout(() => {
                navigate("/blog");
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

    const fileInputRef = useRef();
    const triggerFileDialog1 = () => {
        fileInputRef.current.click();
    };
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm({ ...form, blog_picture: file });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };


    const [draft_active, setdraft_active] = useState(false);
    const [draft_inactive, setdraft_inactive] = useState(false);


    const toggledraft_active = () => {
        setdraft_active(true);
        setdraft_inactive(false);
    };

    const toggledraft_inactive = () => {
        setdraft_active(false);
        setdraft_inactive(true);
    };

    const [reviewed_active, setreviewed_active] = useState(false);
    const [reviewed_inactive, setreviewed_inactive] = useState(false);


    const togglereviewed_active = () => {
        setreviewed_active(true);
        setreviewed_inactive(false);
    };

    const togglereviewed_inactive = () => {
        setreviewed_active(false);
        setreviewed_inactive(true);
    };

    return (
        <div>
            <ThemeSwitcher />
            <ToastContainer position="top-center" autoClose={1500} />
            <User_side_menu setIsOpen={setIsOpen} isOpenside={isOpenside} />
            <div className='flex inter'>
                <EmployList isOpen={isOpen} setIsOpen={setIsOpen} />
                <div className="w-full width__right relative max-md:ms-0">
                    <SubHeader pageName={"Blog Add"} />
                    <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block">
                        <h3 className="text-[22px] font-[700] text-[#707793] uppercase">Blog Add</h3>
                        <div className="flex justify-end items-center max-lg:justify-start">
                            <nav className="text-sm text-gray-600 max-sm:mt-[15px] max-sm:ps-[5px]" aria-label="Breadcrumb">
                                <ol className="flex flex-wrap items-center">
                                    <li className="flex items-center">
                                        <Link to="/dashboard" className="hover:text-[var(--blue)] font-[12px] text-[#575864]">Dashboard</Link>
                                        <svg className="mx-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M9 5l7 7-7 7" />
                                        </svg>
                                    </li>
                                    <li className="flex items-center">
                                        <Link to="/dashboard" className="hover:text-[var(--blue)] font-[12px] text-[#575864]">Blog</Link>
                                        <svg className="mx-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M9 5l7 7-7 7" />
                                        </svg>
                                    </li>
                                    <li className="text-[var(--blue)] font-medium text-[12px]">New Blog</li>
                                </ol>
                            </nav>
                        </div>
                    </div>

                    <div className="flex gap-8 max-lg:block">
                        {/* Left Panel */}
                        <div className="w-[25%] max-2xl:w-[40%] max-lg:w-[100%]     ">
                            <div className="  p-[20px] max-sm:p-[10px] rounded-xl bg-white shadow-[0_4px_24px_2px_rgba(20,25,38,0.05)]">

                                <div
                                    className="flex justify-center items-center bg-transparent rounded-[12px] cursor-pointer"

                                >
                                    <>
                                        {/* Upload Box or Image Preview */}
                                        {!form?.blog_picture ? (
                                            <div
                                                className="border-2 border-dashed w-full border-[#d8dfe7] rounded-[6px] min-h-[150px] p-[20px] flex justify-center items-center cursor-pointer"
                                                onClick={triggerFileDialog1}
                                            >
                                                <div className="py-[32px] text-center">
                                                    <i className="fa-solid fa-cloud-arrow-up text-primary text-[3rem]" />
                                                    <h3 className="mt-[2.25rem] text-[24px] font-[600] text-[#313b5e] mb-[10px]">
                                                        Drop your <span className="text-primary">Image</span>
                                                    </h3>
                                                </div>
                                            </div>
                                        ) : (
                                            <div
                                                className="relative w-full max-w-[300px] rounded-[6px] overflow-hidden border border-[#d8dfe7] cursor-pointer"
                                                onClick={triggerFileDialog1}
                                            >
                                                <img
                                                    src={URL.createObjectURL(form?.blog_picture)}
                                                    alt="Thumbnail"
                                                    className="w-full h-auto object-cover"
                                                />
                                            </div>
                                        )}

                                        {/* Hidden File Input */}
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageUpload}
                                        />
                                    </>

                                </div>
                            </div>
                        </div>

                        {/* Right Panel */}
                        <div className="w-[75%] max-2xl:w-[60%] max-lg:w-[100%]  rounded-xl  max-lg:mt-[24px]">
                            {/* <div className="w-[100%]  rounded-xl  max-lg:mt-[24px]"> */}


                            <div className="mb-[24px]     bg-white shadow-md rounded-[12px]">
                                <h4 className="px-[24px] py-[18px] max-lg:px-[18px] max-sm:p-[10px]   font-[600] text-[#313b5e] text-[16px] border-b border-[#eaedf1] hans">General Information</h4>
                                <div className="px-[24px] py-[18px] max-sm:p-[10px]  max-lg:px-[18px] ">
                                    <div className=" grid grid-cols-2 gap-4">
                                        {[
                                            { label: "Title", name: "title" },
                                            { label: "Subtitle", name: "subtitle" },
                                            { label: "Meta Title", name: "meta_title" },
                                            { label: "Meta Keyword", name: "meta_keyword" },
                                            { label: "Meta Description", name: "meta_description" },
                                            { label: "Alt Text", name: "alt_text" },
                                            { label: "Canonical URL", name: "canonical_url" },
                                        ].map(({ label, name }) => (
                                            <div key={name} className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    {label}
                                                </label>
                                                <input
                                                    type="text"
                                                    name={name}
                                                    value={form[name]}
                                                    onChange={handleInputChange}
                                                    className="mt-1 w-full h-[40px] px-4 border border-[#C8C8C8] text-[#333] rounded-[7px] text-sm focus:ring-[#9CA3AF] focus:border-[#9CA3AF]"
                                                />
                                            </div>
                                        ))}

                                        <div className="mb-4 col-span-2">
                                            <label className="block text-sm font-medium text-gray-700">Editor Notes</label>
                                            <textarea
                                                name="editor_notes"
                                                value={form.editor_notes}
                                                onChange={handleInputChange}
                                                className="mt-1 w-full h-[80px] px-4 py-2 border border-[#C8C8C8] text-[#333] rounded-[7px] text-sm focus:ring-[#9CA3AF] focus:border-[#9CA3AF]"
                                            />
                                        </div>




                                    </div>
                                    <div className="mb-8 ">
                                        <label className="block text-sm font-medium text-gray mb-3">Reviewed</label>
                                        <div className="cursor-pointer flex items-center  max-sm:hidden">
                                            <div onClick={togglereviewed_active}
                                                className={`border-1 checkbox w-[20px] h-[20px] rounded-[4px] bg-[#eef2f7] flex items-center justify-center transition-colors ${reviewed_active ? 'bg-[#ff6c2f] border-[var(--blue)]' : ' border-[#ece7e7f1]'}`}>
                                                <span className={`checkmark bg-[#ff6c2f] ${reviewed_active ? 'opacity-100' : 'opacity-0'} flex items-center justify-center text-white rounded-[3px] transition-opacity`}>
                                                    ✔
                                                </span>
                                            </div>
                                            <span className="pe-10 text-[14px] cursor-default text-[#5d7186]">Active</span>

                                            <div onClick={togglereviewed_inactive}
                                                className={`border-1 checkbox w-[20px] h-[20px] rounded-[4px] bg-[#eef2f7] flex items-center justify-center transition-colors ${reviewed_inactive ? 'bg-[#ff6c2f] border-[var(--blue)]' : ' border-[#ece7e7f1]'}`}>
                                                <span className={`checkmark bg-[#ff6c2f] ${reviewed_inactive ? 'opacity-100' : 'opacity-0'} flex items-center justify-center text-white rounded-[3px] transition-opacity`}>
                                                    ✔
                                                </span>
                                            </div>
                                            <span className="pe-10 text-[14px] cursor-default text-[#5d7186]">InActive</span>
                                        </div>

                                    </div>
                                    <div className="mb-8 ">
                                        <label className="block text-sm font-medium text-gray mb-3"> Draft Mode</label>
                                        <div className="cursor-pointer flex items-center  max-sm:hidden">
                                            <div onClick={toggledraft_active}
                                                className={`border-1 checkbox w-[20px] h-[20px] rounded-[4px] bg-[#eef2f7] flex items-center justify-center transition-colors ${draft_active ? 'bg-[#ff6c2f] border-[var(--blue)]' : ' border-[#ece7e7f1]'}`}>
                                                <span className={`checkmark bg-[#ff6c2f] ${draft_active ? 'opacity-100' : 'opacity-0'} flex items-center justify-center text-white rounded-[3px] transition-opacity`}>
                                                    ✔
                                                </span>
                                            </div>
                                            <span className="pe-10 text-[14px] cursor-default text-[#5d7186]">Active</span>

                                            <div onClick={toggledraft_inactive}
                                                className={`border-1 checkbox w-[20px] h-[20px] rounded-[4px] bg-[#eef2f7] flex items-center justify-center transition-colors ${draft_inactive ? 'bg-[#ff6c2f] border-[var(--blue)]' : ' border-[#ece7e7f1]'}`}>
                                                <span className={`checkmark bg-[#ff6c2f] ${draft_inactive ? 'opacity-100' : 'opacity-0'} flex items-center justify-center text-white rounded-[3px] transition-opacity`}>
                                                    ✔
                                                </span>
                                            </div>
                                            <span className="pe-10 text-[14px] cursor-default text-[#5d7186]">InActive</span>
                                        </div>

                                    </div>
                                    <div className="mb-8 ">
                                        <label className="block text-sm font-medium text-gray mb-3"> Publish Blog </label>
                                        <div className="cursor-pointer flex items-center  max-sm:hidden">
                                            <div onClick={toggleStatusActive}
                                                className={`border-1 checkbox w-[20px] h-[20px] rounded-[4px] bg-[#eef2f7] flex items-center justify-center transition-colors ${statusActive ? 'bg-[#ff6c2f] border-[var(--blue)]' : ' border-[#ece7e7f1]'}`}>
                                                <span className={`checkmark bg-[#ff6c2f] ${statusActive ? 'opacity-100' : 'opacity-0'} flex items-center justify-center text-white rounded-[3px] transition-opacity`}>
                                                    ✔
                                                </span>
                                            </div>
                                            <span className="pe-10 text-[14px] cursor-default text-[#5d7186]">Active</span>

                                            <div onClick={toggleStatusInactive}
                                                className={`border-1 checkbox w-[20px] h-[20px] rounded-[4px] bg-[#eef2f7] flex items-center justify-center transition-colors ${statusInactive ? 'bg-[#ff6c2f] border-[var(--blue)]' : ' border-[#ece7e7f1]'}`}>
                                                <span className={`checkmark bg-[#ff6c2f] ${statusInactive ? 'opacity-100' : 'opacity-0'} flex items-center justify-center text-white rounded-[3px] transition-opacity`}>
                                                    ✔
                                                </span>
                                            </div>
                                            <span className="pe-10 text-[14px] cursor-default text-[#5d7186]">InActive</span>
                                        </div>

                                    </div>
                                    <JoditEditor
                                        ref={editor}
                                        value={form.body}
                                      config={{
                                            readonly: false,
                                            height: 400,
                                            toolbarSticky: false,
                                            uploader: {
                                                insertImageAsBase64URI: true, // 👈 paste image as base64
                                            },
                                            filebrowser: {
                                                ajax: {
                                                    url: 'your-server-endpoint',
                                                },
                                            },
                                            // 👇 Important configs for paste to work
                                            askBeforePasteHTML: false,
                                            askBeforePasteFromWord: false,
                                            pasteInlineImages: true,   // allow inline base64 images
                                            processPasteHTML: true,
                                            processPaste: true,
                                        }}
                                         onBlur={(newContent) => setForm({ ...form, body: newContent })}
                                        // Keep onChange just for live typing if needed (but don't set state here)
                                        onChange={() => { }}
                                    />
                                </div>
                            </div>





                            <div className="flex justify-end items-center  bg-[#eef2f7] rounded-[12px]" >
                                <div className="p-[17px]  flex flex-row-reverse gap-3 max-sm:ps-0">

                                    <div className="flex gap-2 border-t border-[#eaedf1] w-[100%] ">
                                        <button onClick={handlesubmit} className="w-[182px]   max-sm:w-[125px] h-[39px] text-gray border-[1px] border-gray rounded-[12px] text-[14px] mt-[12px] hover:bg-gray hover:text-white">Save Change</button>
                                        <button onClick={() => {
                                            navigate(-1)
                                        }} className="w-[182px]  max-sm:w-[125px] h-[39px] text-white bg-[var(--blue)]  border-[1px] border-[var(--blue)]  rounded-[12px] text-[14px] mt-[12px] hover:text-[var(--blue)] hover:bg-transparent">Cancel</button>
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
