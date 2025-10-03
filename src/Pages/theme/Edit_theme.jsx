import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import User_side_menu from '../../Componenet/user_side_menu';
import { useNavigate, Link, useLocation } from "react-router-dom";
import EmployList from '../../Componenet/EmployList';
import SubHeader from '../../Componenet/sub_header';
import { ToastContainer, toast } from "react-toastify";
import { useDropzone } from 'react-dropzone';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Category_img from '../../assets/category.png';
import Dropdown from "../../Componenet/dropdown";
import Multiselect from 'multiselect-react-dropdown';
import { useGetCategoriesQuery, useGetSubCategoriesQuery, useAddThemesMutation, useEditThemesMutation, useGetThemesQuery, useDeleteMediaMutation, useGetCategories_fetch_allQuery, useGetSubCategories_fetchallQuery } from "../../services/apiSlice";
import Searchdropdown from '../../Componenet/searchdropdown'
import { ChevronDown } from "lucide-react";
import ThemeSwitcher from "../../Componenet/themeswicher";
import JoditEditor from 'jodit-react';

const Create_product = () => {
    const [form, setForm] = useState({
        category_id: "",
        theme_id: "",
        subcategory_id: "",
        name: "",
        description: "",
        price: "",
        demo_url: "",
        discount_percentage: "0",
        theme_file: "",
        thumbnail: "",
        features: "",
    });

    const [isOpen1, setIsOpen1] = useState(false);
    const contentRef = useRef(null);
    const [contentHeight, setContentHeight] = useState("0px");

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(isOpen1 ? `${contentRef.current.scrollHeight}px` : "0px");
        }
    }, [isOpen1]);
    const [images, setImages] = useState([]);
    const location = useLocation()
    let { data: pro } = useGetThemesQuery({ theme_id: location?.state?.product_id })



    useEffect(() => {
        if (pro?.data) {
            pro = pro?.data
            setForm({
                category_id: pro.category,
                subcategory_id: pro?.subcategory,
                name: pro?.name,
                description: pro?.description,
                theme_id: pro?.theme_id,
                discount_percentage: pro?.discount_percentage || "0",
                price: pro?.price,
                demo_url: pro?.demo_url,
                theme_file: pro?.theme_file,
                thumbnail: import.meta.env.VITE_API_BASE_URL + pro?.thumbnail,
                features: pro?.features,
                meta_title: pro?.meta_title || '',
                meta_description: pro?.meta_description || '',
                meta_keywords: pro?.meta_keywords || '',
                canonical_url: pro?.canonical_url || '',
                image_alt_text: pro?.image_alt_text || '',
            })
            setStates({
                trending: pro?.is_trending,
                sale: pro?.is_sale,
                featured: pro?.is_featured,
                newArrival: pro?.is_new_arrival,
                best_seller: pro?.is_best_seller,
                is_free: pro?.is_free,
            })
            if (pro?.is_active) {

                setHomeActive(true)
                setHomeInactive(false)
                console.log(pro?.is_active);
            } else {
                console.log(pro?.is_active);

                setHomeInactive(true)
                setHomeActive(false)
            }
            setSelectedImage(`${import.meta.env.VITE_API_BASE_URL}${pro.thumbnail}`)
            const existingMedia = pro?.img?.map((mediaItem, index) => ({
                id: `existing-${mediaItem.media_id}`,
                preview: `${import.meta.env.VITE_API_BASE_URL}${mediaItem.file}`,
                existing: true
            })) || [];

            setImages(existingMedia);
        }
    }, [pro])




    const [Edittheme] = useEditThemesMutation();



    let categoryOptions = [];
    const { data: categories } = useGetCategories_fetch_allQuery();
    if (categories?.data) {
        categoryOptions = categories?.data.map((val) => ({
            id: val.category_id,
            name: val.name,
        }));
    }

    // Fetch subcategories
    let subcategoryOptions = [];
    const { data: subcate } = useGetSubCategories_fetchallQuery();
    if (subcate?.data) {
        subcategoryOptions = subcate.data
            .filter((val) => val.category == form.category_id) // Filter by selected category
            .map((val) => ({
                id: val.subcategory_id,
                name: val.name,
            }));
    }

    const handleCategorySelect = (value) => {
        const selectedCategory = categoryOptions.find((cat) => cat.name === value);


        setForm({
            ...form,
            category_id: selectedCategory?.id,
            subcategory_id: "", // Reset subcategory on category change
        });
    };

    // Handle subcategory selection
    const handleSubcategorySelect = (value) => {
        const selectedSubcategory = subcategoryOptions.find(
            (sub) => sub.name === value
        );
        setForm({ ...form, subcategory_id: selectedSubcategory?.id });
    };






    const [modal, setModal] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);

    const [replaceIndex, setReplaceIndex] = useState(null);
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const dropdownRefs = useRef([]);
    const [previewImage, setPreviewImage] = useState(null);

    const [selectedImage, setSelectedImage] = useState(null); // State for the selected image
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal visibility


    const onDrop = useCallback((acceptedFiles) => {
        const filesArray = Array.from(acceptedFiles);

        const filesWithPreview = filesArray.map(file => ({
            file, // keep original File (binary) here
            preview: URL.createObjectURL(file),
            id: `new-${Date.now() + Math.random()}`,
        }));

        if (replaceIndex !== null) {
            const newImage = filesWithPreview[0];
            setImages(prev => {
                const updated = prev.map((img, idx) =>
                    idx === replaceIndex ? newImage : img
                );
                if (selectedImage === prev[replaceIndex]?.preview) {
                    setSelectedImage(newImage.preview);
                }
                return updated;
            });
            setReplaceIndex(null);
        } else {
            setImages(prev => [...prev, ...filesWithPreview]);
        }
    }, [replaceIndex, selectedImage]);



    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'image/*': [], 'video/*': [] },
        onDrop
    });


    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const reordered = Array.from(images);
        const [removed] = reordered.splice(result.source.index, 1);
        reordered.splice(result.destination.index, 0, removed);
        setImages(reordered);

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
                // close modal logic here if needed
            }
        });
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const triggerFileDialog = (index = null) => {
        if (index !== null) {
            setReplaceIndex(index);
        } else {
            setReplaceIndex(null);
        }
        setIsModalOpen(true);
    };

    const [deletemedia] = useDeleteMediaMutation()

    const removeImage = async (id) => {
        const isExisting = id.startsWith('existing-');
        console.log(id.replace('existing-', ''));

        const mediaId = isExisting ? id.replace('existing-', '') : null;
        console.log(mediaId);

        if (isExisting && mediaId) {
            try {
                const formData = new FormData();
                formData.append('media_id', mediaId);
                await deletemedia(formData).unwrap();
                toast.success('Image deleted successfully!');
            } catch (err) {
                toast.error('Failed to delete image.');
                return;
            }
        }

        // Update local state to remove the image
        setImages((prevImages) => prevImages.filter((img) => img.id !== id));
    }


    useEffect(() => {
        if (!selectedImage && images.length > 0) {
            setSelectedImage(images[0].preview);
        }
    }, [images, selectedImage]);



    // serching dropdown
    const [openDropdown, setOpenDropdown] = useState(null);

    const handleDropdownSelect = (field, value) => {
        setProduct((prev) => ({ ...prev, [field]: value }));
        setOpenDropdown(null);
    };


    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        return () => {
            images.forEach(image => URL.revokeObjectURL(image.preview));
        };
    }, []);

    useEffect(() => {
        if (!selectedImage && images.length > 0) {
            setSelectedImage(images[0].preview);
        }
    }, [images, selectedImage]);


    console.log(form.description);


    const handleSubmit = async () => {
        try {



            const formData = new FormData();
            Object.entries(form).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formData.append(key, value);
                }
                if (key === 'discount_percentage') {
                    formData.append('discount_percentage', value ? value : "0");
                }
            });

            const sortedImages = [...images];
            const orderingUpdates = [];

            sortedImages.forEach((img, idx) => {
                const order = idx + 1;
                console.log(img.id);

                if (img.id?.startsWith('new-')) {
                    formData.append('file', img.file);
                    formData.append('is_ordering_list', order);
                } else {
                    const mediaId = img?.id?.replace('existing-', '');
                    orderingUpdates.push({
                        media_id: mediaId,
                        ordering_priority: order,
                    });
                }
            });
            formData.append("is_trending", states.trending ? "True" : "False"); // Index represents the new order
            formData.append("is_sale", states.sale ? "True" : "False"); // Index represents the new order
            formData.append("is_new_arrival", states.newArrival ? "True" : "False"); // Index represents the new order
            formData.append("is_featured", states.featured ? "True" : "False"); // Index represents the new order
            formData.append("is_free", states.is_free ? "True" : "False"); // Index represents the new order
            formData.append("is_best_seller", states.best_seller ? "True" : "False"); // Index represents the new order
            formData.append("is_active", homeActive ? "True" : "False");
            if (orderingUpdates.length > 0) {
                formData.append('is_ordering', JSON.stringify({ media: orderingUpdates }));
            }

            const response = await Edittheme(formData).unwrap();

            if (response) {
                toast.success("Theme successfully Updates!");

            }
            setTimeout(() => {
                navigate(-1);
            }, 1000); // 1 second delay
        } catch (error) {
            console.error("Upload error:", error);
            const errorMessage =
                error?.data?.message ||         // RTK Query error format
                error?.detail ||         // RTK Query error format
                error?.data?.detail ||         // RTK Query error format
                error?.error ||                 // RTK fallback error message (e.g., network error)
                error?.message ||               // JS error object message
                "Something went wrong!";
            toast.error(errorMessage);
        }
    };







    const [openDropdown1, setOpenDropdown1] = useState(null); // Track which dropdown is open

    const toggleDropdown1 = (label) => {
        setOpenDropdown1((prev) => (prev == label ? null : label));
    };


    const [activeDropdown, setActiveDropdown] = useState(null); // null means no dropdown is open
    const toggleDropdown = () => {
        onToggle?.(!isOpen); // toggle the dropdown
        if (!isOpen) setSearchTerm("");
    };


    const handleSelect = (option) => {
        onSelect?.(option);
        onToggle?.(false); // CLOSE after selection
        setSearchTerm("");
        setHighlightedIndex(-1);
    };






    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file && file.type === "application/x-zip-compressed") {


            setForm((prev) => ({
                ...prev,
                theme_file: file, // Store the full File object
            }));
        } else {
            toast.error('Please upload a valid ZIP file');
        }
    };

    const fileInputRef = useRef();

    const triggerFileDialog1 = () => {
        fileInputRef.current.click();
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];


        if (file) {
            setForm({ ...form, thumbnail: file });
        }
    };

    const [states, setStates] = useState({
        trending: false,
        sale: false,
        featured: false,
        newArrival: false,
        is_free: false,
        best_seller: false,
    });

    const toggleCheckbox = (key) => {
        setStates((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const options = [
        { key: "trending", label: "Is Trending" },
        { key: "sale", label: "Is Sale" },
        { key: "featured", label: "Is Featured" },
        { key: "newArrival", label: "Is New Arrival" },
        { key: "best_seller", label: "Is Best Seller" },
        { key: "is_free", label: "Is Free" },
    ];

    console.log(states);


    const [homeActive, setHomeActive] = useState(false);
    const [homeInactive, setHomeInactive] = useState(false);

    const toggleHomeActive = () => {
        setHomeActive(true);
        setHomeInactive(false);
    };

    const toggleHomeInactive = () => {
        setHomeActive(false);
        setHomeInactive(true);
    };

    const editor = useRef(null);

    const config = useMemo(
        () => ({
            readonly: false, // all options from https://xdsoft.net/jodit/docs/,
            placeholder: '',
            height: 400,
        }),
        []
    );


    return (
        <div>
            <ThemeSwitcher />
            <ToastContainer position="top-center" autoClose={1500} />
            <User_side_menu setIsOpen={setIsOpen} isOpenside={isOpenside} />
            <div className='flex inter'>
                <EmployList isOpen={isOpen} setIsOpen={setIsOpen} />
                <div className="w-full width__right relative max-md:ms-0">
                    <SubHeader pageName={"Theme Add"} />
                    <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block">
                        <h3 className="text-[22px] font-[700] text-[#707793] uppercase"> Theme Add</h3>
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
                                        <Link to="/dashboard" className="hover:text-primary font-[12px] text-[#575864]">Theme</Link>
                                        <svg className="mx-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M9 5l7 7-7 7" />
                                        </svg>
                                    </li>
                                    <li className="text-primary font-medium text-[12px]">New Theme</li>
                                </ol>
                            </nav>
                        </div>
                    </div>

                    <div className="flex gap-8 max-lg:block">
                        {/* Left Panel */}
                        <div className="w-[25%] max-2xl:w-[40%] max-lg:w-[100%]   h-[auto] max-h-[650px]   p-[20px] max-sm:p-[10px] rounded-xl bg-white shadow-[0_4px_24px_2px_rgba(20,25,38,0.05)]">
                            <div
                                className="flex justify-center items-center bg-[#eef2f7] rounded-[12px] cursor-pointer"
                                onClick={() => {
                                    if (images.length === 0) {
                                        triggerFileDialog(); // Trigger file dialog if no images
                                    } else {
                                        setSelectedImage(images[0].preview); // Set first image as selected if available
                                    }
                                }}
                            >
                                <>
                                    {/* Upload Box or Image Preview */}
                                    {!form.thumbnail ? (
                                        <div
                                            className="border-2 border-dashed w-full border-[#d8dfe7] rounded-[6px] min-h-[150px] p-[20px] flex justify-center items-center cursor-pointer"
                                            onClick={triggerFileDialog1}
                                        >
                                            <div className="py-[32px] text-center">
                                                <i className="fa-solid fa-cloud-arrow-up text-primary text-[3rem]" />
                                                <h3 className="mt-[2.25rem] text-[24px] font-[600] text-[#313b5e] mb-[10px]">
                                                    Drop your <span className="text-primary">Thumbnail</span>
                                                </h3>
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            className="relative w-full max-w-[300px] rounded-[6px] overflow-hidden border border-[#d8dfe7] cursor-pointer"
                                            onClick={triggerFileDialog1}
                                        >
                                            <img
                                                src={
                                                    typeof form.thumbnail === "string"
                                                        ? form.thumbnail // API URL
                                                        : URL.createObjectURL(form.thumbnail) // Local uploaded file
                                                }
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
                            <div className="mt-5">
                                <h4 className="hans font-[600] text-[18px] text-[#313b5e] mb-[18px] max-sm:text-[16px] max-sm:mb-[12px]">{form.name}</h4>
                                <div className="mt-2">
                                    <h5 className="text-[#313b5e] hans">Price:</h5>
                                    <div className="mb-1 flex gap-3 items-center">
                                        <span className="font-[600] text-[18px] text-gray hans">₹{form.price}</span>
                                        <span className="font-[600] text-[18px] hans text-[#313b5e]">{form.discount_price}</span>
                                        <small className="text-gray text-[12px] font-[600] hans">({form.discount_percentage}% Off)</small>
                                    </div>


                                </div>


                            </div>
                        </div>

                        {/* Right Panel */}
                        <div className="w-[75%] max-2xl:w-[60%] max-lg:w-[100%]  rounded-xl  max-lg:mt-[24px]">
                            <div className="bg-white shadow-md rounded-[12px]">
                                <h4 className="px-[24px] py-[18px] max-lg:px-[18px] max-sm:p-[10px] font-[600] text-[#313b5e] text-[16px] border-b border-[#eaedf1] hans ">
                                    Add Theme Photo
                                </h4>
                                <div className="mb-[24px] px-[24px] max-lg:px-[18px] max-sm:p-[10px] py-[18px]">
                                    <input
                                        ref={inputRef}
                                        type="file"
                                        accept="image/png,image/jpeg,image/gif,video/*"
                                        multiple
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
                                                                                            removeImage(file.id);
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
                                <h4 className="px-[24px] py-[18px] max-lg:px-[18px] max-sm:p-[10px]   font-[600] text-[#313b5e] text-[16px] border-b border-[#eaedf1] hans">Theme Information</h4>
                                <div className="px-[24px] py-[18px] max-sm:p-[10px]  max-lg:px-[18px] ">

                                    <div className="mb-4 max-sm:block">

                                        <label className="block text-sm font-medium text-gray">Name</label>
                                        <input
                                            type="text"
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}

                                            className="mt-[5px] w-full h-[40px] bg-transparent px-[15px] border border-[#d8dfe7] text-[#9CA3AF] rounded-[7px] text-sm focus:ring-[#9CA3AF] focus:border-[#9CA3AF]" />

                                    </div>
                                    <div className="mb-4 grid grid-cols-2 gap-5  max-xl:gap-2 max-lg:gap-5 max-lg:grid-cols-2 max-sm:block">
                                        <div className="max-sm:mb-4">
                                            <Searchdropdown
                                                label="Category"
                                                onToggle={() => toggleDropdown1("Category")} // Pass 'Category' to toggle it
                                                options={categoryOptions.map((val) => val.name)}
                                                value={categoryOptions.find((cat) => cat.id === form.category_id)?.name || ""}
                                                isOpen={openDropdown1 === "Category"} // Check if this dropdown is open
                                                setIsOpen={(state) => setOpenDropdown1(state ? "Category" : null)}
                                                onSelect={handleCategorySelect}
                                            />
                                        </div>

                                        {/* Subcategory Dropdown */}
                                        <div className="max-sm:mb-4">
                                            <Searchdropdown
                                                label="Sub Category"
                                                onToggle={() => toggleDropdown1("subcategory")} // Pass 'subcategory' to toggle it
                                                isOpen={openDropdown1 === "subcategory"} // Check if this dropdown is open
                                                options={subcategoryOptions.map((val) => val.name)}
                                                value={subcategoryOptions.find((sub) => sub.id == form.subcategory_id)?.name || ""}
                                                setIsOpen={(state) => setOpenDropdown1(state ? "subcategory" : null)}
                                                onSelect={handleSubcategorySelect}
                                            />
                                        </div>




                                    </div>




                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray">Description</label>
                                        {/* <textarea
                                            value={form.description}
                                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                                            rows={6}
                                            className="w-full bg-transparent   mt-[5px] px-[15px] py-[10px] border border-[#d8dfe7] rounded-lg text-sm text-[#9CA3AF]  focus:ring-[#9CA3AF] focus:border-[#9CA3AF] resize-y"
                                        /> */}
                                        <JoditEditor
                                            ref={editor}
                                            value={form.description}
                                            config={config}
                                            tabIndex={1} // tabIndex of textarea
                                            onBlur={(newContent) =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    description: newContent, // ✅ Store JoditEditor content in `blog_body`
                                                }))
                                            } // preferred to use only this option to update the content for performance reasons
                                            onChange={(newContent) =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    description: newContent, // ✅ Store JoditEditor content in `blog_body`
                                                }))
                                            }
                                        />

                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray">Features</label>
                                        {/* <textarea
                                            value={form.features}
                                            onChange={(e) => setForm({ ...form, features: e.target.value })}
                                            rows={6}
                                            className="w-full bg-transparent   mt-[5px] px-[15px] py-[10px] border border-[#d8dfe7] rounded-lg text-sm text-[#9CA3AF]  focus:ring-[#9CA3AF] focus:border-[#9CA3AF] resize-y"
                                        /> */}
                                        <JoditEditor
                                            ref={editor}
                                            value={form.features}
                                            config={config}
                                            tabIndex={2} // tabIndex of textarea
                                            onBlur={(newContent) =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    features: newContent, // ✅ Store JoditEditor content in `blog_body`
                                                }))
                                            } // preferred to use only this option to update the content for performance reasons
                                            onChange={(newContent) =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    features: newContent, // ✅ Store JoditEditor content in `blog_body`
                                                }))
                                            }

                                        />
                                    </div>

                                    <div>

                                        <label className="block text-sm font-medium text-gray mb-3">Additional </label>
                                        <div className="cursor-pointer flex items-center mb-4 gap-4 flex-wrap">
                                            {options.map(({ key, label }) => (
                                                <div key={key} className="flex items-center gap-2">
                                                    <div
                                                        onClick={() => toggleCheckbox(key)}
                                                        className={`border-1 checkbox w-[20px] h-[20px] rounded-[4px] bg-[#eef2f7] flex items-center justify-center transition-colors ${states[key] ? "bg-[#ff6c2f] border-primary" : "border-[#ece7e7f1]"
                                                            }`}
                                                    >
                                                        <span
                                                            className={`checkmark bg-[#ff6c2f] ${states[key] ? "opacity-100" : "opacity-0"
                                                                } flex items-center justify-center text-white rounded-[3px] transition-opacity`}
                                                        >
                                                            ✔
                                                        </span>
                                                    </div>
                                                    <span className="pe-10 text-[14px] cursor-default text-[#5d7186]">{label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-4 ">
                                        <label className="block text-sm font-medium text-gray mb-3">Status </label>
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


                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray">Url</label>
                                        <input
                                            type="text"
                                            value={form.demo_url}
                                            onChange={(e) => setForm({ ...form, demo_url: e.target.value })}

                                            className="mt-[5px] w-full bg-transparent   h-[40px] px-[15px] border border-[#d8dfe7] text-[#9CA3AF] rounded-[7px] text-sm focus:ring-[#9CA3AF] focus:border-[#9CA3AF]" />
                                    </div>

                                    <div className=" grid grid-cols-2 gap-5  max-xl:gap-2 max-lg:gap-5 max-lg:grid-cols-2 max-sm:block mb-4">

                                        <div className="max-sm:w-[100%] max-sm:mb-4">
                                            <label className="block text-sm mb-1 font-medium text-gray">Price</label>
                                            <div className="flex items-center h-[40px] border overflow-hidden  border-[#d8dfe7] rounded-[0.5rem] text-sm text-[#5d7186] w-full">
                                                <span className="px-[16px]  h-[40px] flex items-center justify-center bg-[#eef2f7]">
                                                    <i className="fa-solid fa-indian-rupee-sign" />
                                                </span>
                                                <input
                                                    type="number"
                                                    value={form.price}
                                                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                                                    className="w-full bg-transparent px-4 min-w-[100px] h-[40px] border-l border-[#d8dfe7] rounded-r focus:outline-none focus:border-[#b0b0bb]"
                                                />
                                            </div>
                                        </div>
                                        <div className="max-sm:mb-4">
                                            <label className="block text-sm mb-1 font-medium text-gray">Discount Percentage</label>
                                            <div className="flex items-center h-[40px] rounded-[0.5rem] border border-[#d8dfe7]">
                                                <input
                                                    type="number"
                                                    value={form.discount_percentage}
                                                    onChange={(e) => setForm({ ...form, discount_percentage: e.target.value })}

                                                    className="w-full bg-transparent   px-4 h-[40px] text-sm text-[#5d7186] border border-[#d8dfe7] rounded-[8px_0px_0px_8px] focus:outline-none focus:border-[#b0b0bb]"

                                                />
                                                <span className="px-[16px] bg-[#eef2f7] text-[#313b5e] flex items-center justify-center h-full font-semibold">%</span>
                                            </div>
                                        </div>
                                        <div className="max-sm:w-[100%] max-sm:mb-4">
                                            <label className="block text-sm mb-1 font-medium text-gray">Zip</label>
                                            <div className="relative   w-full flex items-center rounded-[0.5rem]">
                                                <label className="bg-[#eef2f7] h-full flex items-center rounded-[0.5rem_0_0_0.5rem] border border-[#d8dfe7] whitespace-nowrap font-semibold text-[#5d7186] hover:bg-[#e4e4e4]  text-sm  py-2 px-4  cursor-pointer">
                                                    Choose File
                                                    <input
                                                        type="file"
                                                        accept=".zip"
                                                        onChange={handleFileChange}
                                                        className="absolute left-0 top-0 opacity-0 w-full h-full cursor-pointer"
                                                    />
                                                </label>

                                                <div style={{ wordBreak: 'break-all' }} className="border rounded-[0_0.5rem_0.5rem_0] whitespace-break-spaces border-l-0 border-[#d6e0ea] px-4 py-2 text-sm text-[#555] w-full">
                                                    {form?.theme_file?.name ? (form.theme_file.name) : form?.theme_file ? form?.theme_file : ('No file chosen')}
                                                </div>
                                            </div>
                                        </div>




                                    </div>




                                </div>
                            </div>

                            <div className="mb-[24px]     bg-white shadow-md rounded-[12px]">
                                <button
                                    onClick={() => setIsOpen1(!isOpen1)}
                                    className="flex justify-between items-center w-full px-[24px] py-[18px] max-lg:px-[18px] max-sm:p-[10px]   font-[600] text-[#313b5e] text-[16px] border-b border-[#eaedf1] hans"
                                >
                                    Meta Information
                                    <ChevronDown
                                        className={`transition-transform duration-300 ${isOpen1 ? "rotate-180" : "rotate-0"}`}
                                    />
                                </button>
                                <div
                                    ref={contentRef}
                                    className="transition-all duration-300 ease-in-out overflow-hidden"
                                    style={{ height: contentHeight }}
                                >
                                    <div className="px-[24px] py-[18px] max-sm:p-[10px] max-lg:px-[18px]">
                                        <div className="grid max-lg:grid-cols-1 grid-cols-2 gap-[16px]">

                                            <div className=" flex gap-5 max-sm:block">
                                                <div className="w-[100%] max-sm:mb-4 ">
                                                    <label className="block text-sm font-medium text-gray">Meta Title</label>
                                                    <input
                                                        type="text"
                                                        value={form.meta_title}
                                                        onChange={(e) => setForm({ ...form, meta_title: e.target.value })}
                                                        placeholder=""
                                                        className="mt-[5px] bg-transparent w-full h-[40px] px-[15px] border border-[#C8C8C8] text-[#9CA3AF] rounded-[7px] text-sm focus:ring-[#9CA3AF] focus:border-[#9CA3AF]" />
                                                </div>

                                            </div>
                                            <div className=" flex gap-5 max-sm:block">
                                                <div className="w-[100%] max-sm:mb-4 ">
                                                    <label className="block text-sm font-medium text-gray">Meta Keyword</label>
                                                    <input
                                                        type="text"
                                                        value={form.meta_keywords}
                                                        onChange={(e) => setForm({ ...form, meta_keywords: e.target.value })}
                                                        placeholder=""
                                                        className="mt-[5px] bg-transparent w-full h-[40px] px-[15px] border border-[#C8C8C8] text-[#9CA3AF] rounded-[7px] text-sm focus:ring-[#9CA3AF] focus:border-[#9CA3AF]" />
                                                </div>

                                            </div>
                                            <div className=" flex gap-5 max-sm:block">
                                                <div className="w-[100%] max-sm:mb-4 ">
                                                    <label className="block text-sm font-medium text-gray">Canonical Url</label>
                                                    <input
                                                        type="text"
                                                        value={form.canonical_url}
                                                        onChange={(e) => setForm({ ...form, canonical_url: e.target.value })}
                                                        placeholder=""
                                                        className="mt-[5px] bg-transparent w-full h-[40px] px-[15px] border border-[#C8C8C8] text-[#9CA3AF] rounded-[7px] text-sm focus:ring-[#9CA3AF] focus:border-[#9CA3AF]" />
                                                </div>

                                            </div>
                                            <div className=" flex gap-5 max-sm:block">
                                                <div className="w-[100%] max-sm:mb-4 ">
                                                    <label className="block text-sm font-medium text-gray">image Alt Text</label>
                                                    <input
                                                        type="text"
                                                        value={form.image_alt_text}
                                                        onChange={(e) => setForm({ ...form, image_alt_text: e.target.value })}
                                                        placeholder=""
                                                        className="mt-[5px] bg-transparent w-full h-[40px] px-[15px] border border-[#C8C8C8] text-[#9CA3AF] rounded-[7px] text-sm focus:ring-[#9CA3AF] focus:border-[#9CA3AF]" />
                                                </div>

                                            </div>
                                        </div>
                                        <div className="mt-[16px] ">
                                            <label className="block text-sm font-medium text-gray">Meta Description</label>
                                            <textarea
                                                value={form.meta_description}
                                                onChange={(e) => setForm({ ...form, meta_description: e.target.value })}
                                                rows={6}
                                                placeholder="Enter  description..."
                                                className="w-full mt-[5px] bg-transparent px-[15px] py-[10px] border border-[#C8C8C8] rounded-lg text-sm text-[#9CA3AF]  focus:ring-[#9CA3AF] focus:border-[#9CA3AF] resize-y"
                                            />
                                        </div>
                                    </div>
                                </div>


                            </div>







                            <div className="flex justify-end items-center  bg-[#eef2f7] rounded-[12px]" >
                                <div className="p-[17px]  flex flex-row-reverse gap-3 max-sm:ps-0">

                                    <div className="flex gap-2 border-t border-[#eaedf1] w-[100%] ">
                                        <button onClick={handleSubmit} type="submit" className="w-[182px]  max-sm:w-[125px] h-[39px] text-gray border-[1px] border-gray rounded-[12px] text-[14px] mt-[12px] hover:bg-gray hover:text-white" >Save Change</button>
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
    )
}

export default Create_product
