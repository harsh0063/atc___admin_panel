
import React, { useEffect, useState, useRef } from "react";
import 'nouislider/dist/nouislider.css';
import User_side_menu from '../../Componenet/user_side_menu'
import EmployList from '../../Componenet/EmployList'
import SubHeader from '../../Componenet/sub_header'
import Dropdown from '../../Componenet/dropdown'
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Category_img from '../../assets/category.png'
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';
import PriceRangeSlider from "../../Componenet/Product/Pricing_Range";
import ProductCard from "../../Componenet/Product/Product_item";
import { useGetProductQuery, useAddCartMutation, useDeleteProductMutation, useGetCategoriesQuery, useGetCategories_fetch_allQuery } from "../../services/apiSlice";
import ThemeSwitcher from "../../Componenet/themeswicher";


const Product_grid = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);


    const handleItemChange = (event) => {
        const value = parseInt(event.target.value, 5);
        setItemsPerPage(value);
        setCurrentPage(1);
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




    // -----------searching -----------------------------
    const [searchTerm, setSearchTerm] = useState("");

    const data = [
        "Diamond Ring",
        "Gold Necklace",
        "Silver Bracelet",
        "Platinum Earrings",
        "Ruby Pendant",
    ];

    const filteredData = data.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [selectedRating, setSelectedRating] = useState("");
    const ratings = [
        { label: '1', value: '1', count: 437 },
        { label: '2', value: '2', count: 320 },
        { label: '3', value: '3', count: 250 },
        { label: '4', value: '4', count: 120 },
        { label: '5', value: '5', count: 50 }
    ];

    const {data:category} = useGetCategories_fetch_allQuery() 

    const sections = [
        {
            title: 'Categories',
            content: (
                <div className="space-y-2">
                    {category?.data?.map((cat,index) => (
                        <label key={index} className="flex items-center  space-x-2 text-[13px]">
                            <label className="inline-flex items-center justify-center">
                                <input
                                    type="checkbox"
                                    className="appearance-none relative h-4 w-4 cursor-pointer border-[1px] border-[#d8dfe7] rounded checked:bg-primary checked:border-primary before:content-['✔'] before:absolute before:inset-0 before:flex before:items-center before:justify-center before:text-white  focus:outline-none  "
                                />
                            </label>



                            <span className="text-gray cursor-pointer">{cat.name}</span>
                        </label>
                    ))}
                </div>
            ),
        },
        {
            title: 'Product Price',
            content: (
                <div>
                    <div className="space-y-2">
                        {['All Price', 'Below $200 (145)', '$200 - $500 (1,885)', '$200 - $ $500 (1,885)', "$200 - $ $500 (1,885)"].map((product) => (
                            <label key={product} className="flex items-center space-x-2 text-[13px]">
                                <label className="inline-block">
                                    <input
                                        type="checkbox"
                                        className="appearance-none relative h-4 w-4 border-[1px] border-[#d8dfe7] rounded checked:bg-primary checked:border-primary before:content-['✔'] before:absolute before:inset-0 before:flex before:items-center before:justify-center before:text-white  focus:outline-none  "
                                    />
                                </label>
                                <span className="text-gray">{product}</span>
                            </label>
                        ))}
                    </div>
                    <div className="mt-[24px]">
                        <h5 className="mb-[10px] font-medium text-sm">Custom Price Range:</h5>
                        <PriceRangeSlider
                            min={0}
                            max={2000}
                            step={1}
                            startMin={0}
                            startMax={200}
                            onChange={(min, max) => {
                                console.log("Selected Price Range:", min, max);
                                // Save to state, filter API, etc.
                            }}
                        />

                    </div>
                </div>
            ),
        },
        {
            title: 'Gender',
            content: (
                <div>
                    <div className="space-y-2">
                        {['Men (1,834)', 'Women (2,890)', "kids's (2,231)"].map((gender) => (
                            <label key={gender} className="flex items-center space-x-2 text-[13px]">
                                <label className="inline-block">
                                    <input
                                        type="checkbox"
                                        className="appearance-none relative h-4 w-4 border-[1px] border-[#d8dfe7] rounded checked:bg-primary checked:border-primary before:content-['✔'] before:absolute before:inset-0 before:flex before:items-center before:justify-center before:text-white  focus:outline-none  "
                                    />
                                </label>
                                <span className="text-gray">{gender}</span>
                            </label>
                        ))}
                    </div>

                </div>
            ),
        },
        {
            title: 'Size & Fit',
            content: (
                <div>
                    <div className="space-y-2">
                        <span className="text-[13px] text-gray">"For better results, select gender and category"</span>
                        {['S (1,834)', 'M (2,890)', "L (2,890)", "XL (2,890)", "XXL (2,890)"].map((size) => (
                            <label key={size} className="flex items-center space-x-2 text-[13px]">
                                <label className="inline-block">
                                    <input
                                        type="checkbox"
                                        className="appearance-none relative h-4 w-4 border-[1px] border-[#d8dfe7] rounded checked:bg-primary checked:border-primary before:content-['✔'] before:absolute before:inset-0 before:flex before:items-center before:justify-center before:text-white  focus:outline-none  "
                                    />
                                </label>
                                <span className="text-gray">{size}</span>
                            </label>
                        ))}
                    </div>

                </div>
            ),
        },
        {
            title: 'Rating',
            content: (
                <div>
                    <div className="space-y-2">
                        <span className="text-[13px] text-gray">
                            For better results, select rating
                        </span>
                        {ratings.map((rating) => (
                            <label key={rating.value} className="flex items-center space-x-2 text-[13px]">
                                <input
                                    type="radio"
                                    name="rating"
                                    value={rating.value}
                                    checked={selectedRating === rating.value} // Check if this radio button is selected
                                    onChange={() => setSelectedRating(rating.value)} // Update selected rating when the user selects it
                                    className="appearance-none relative h-4 w-4 border-[1px] border-[#d8dfe7] rounded-full checked:bg-primary checked:border-primary before:content-[''] before:absolute before:inset-1 before:rounded-full before:bg-white checked:before:bg-white focus:outline-none"
                                />
                                <span className="text-gray">
                                    {rating.label}
                                    <i className="fa-solid fa-star text-yellow-500 ml-1"></i> {/* Star icon */}
                                    & Above ({rating.count})
                                </span>
                            </label>
                        ))}

                    </div>
                </div>
            ),
        },
    ];


    const [openStates, setOpenStates] = useState(sections.map(() => false));

    const toggle = (i) =>
        setOpenStates((prev) => prev.map((v, idx) => (idx === i ? !v : v)));



    // ----------------------------product items-----------------------------
    const productList = [
        {
            image: Category_img,
            title: 'Men Black Slim Fit T-shirt',
            rating: 4.5,
            reviews: 55,
            originalPrice: 100,
            discountedPrice: 80,
            discount: 20,
        },
        {
            image: Category_img,
            title: 'Women White Floral Dress',
            rating: 4.0,
            reviews: 120,
            originalPrice: 120,
            discountedPrice: 90,
            discount: 25,
        },
        {
            image: Category_img,
            title: 'Sports Running Shoes',
            rating: 4.2,
            reviews: 200,
            originalPrice: 150,
            discountedPrice: 120,
            discount: 20,
        },
    ];


    const [openDropdown, setOpenDropdown] = useState(null);

    const handleDropdownToggle = (index) => {
        setOpenDropdown(openDropdown === index ? null : index); // Toggle the dropdown or close it
    };

    const navigate = useNavigate()

    const [modal, setModal] = useState(null);



    // api calling
    const { data: product } = useGetProductQuery()
    const productdata = product?.data || [];
    console.log(productdata);

    const openModal = (modalId) => setModal(modalId);
    const closeModal = () => setModal(null);


    const [addToCart] = useAddCartMutation(); // Initialize the mutation

    const [deleteProduct, setDeletProduct] = useState(null);
    const [deleteProductId] = useDeleteProductMutation();
    const handleDeleteCategory = async () => {
        try {

            const formdata = new FormData()

            formdata.append('product_id', deleteProduct)

            await deleteProductId(formdata).unwrap();
            toast.success("Product deleted successfully!");
            closeModal();
        } catch (error) {
            toast.error(error.data?.message || "Failed to delete category");
        }
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
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Category"} />
                    <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block" >
                        <h3 className="text-[22px] font-[700] text-[#707793] uppercase ">Product Grid</h3>

                        <nav className="text-sm text-gray-600 max-sm:mt-[15px] max-sm:ps-[5px]" aria-label="Breadcrumb" >
                            <ol className="flex flex-wrap items-center ">

                                <li className="flex items-center">
                                    <Link to="/dashboard" className="hover:text-primary transition-colors font-[12px] text-[#575864]">Dashboard</Link>
                                    <svg className="mx-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M9 5l7 7-7 7" />
                                    </svg>
                                </li>
                                <li className="text-primary font-medium text-[12px]">All Product</li>
                            </ol>
                        </nav>
                    </div>

                    <div className="flex gap-8 max-lg:block">


                        {/* Left Panel */}
                        <div className="w-[25%] max-2xl:w-[33%] max-lg:w-[100%]   h-[auto]  max-sm:p-[10px] ">
                            <div className="rounded-xl bg-white shadow-[0_4px_24px_2px_rgba(20,25,38,0.05)] mb-[10px]">
                                <div className="relative w-full max-w-md mx-auto  px-[24px] py-[18px] max-lg:px-[18px] max-sm:p-[10px]">
                                    <i className="fa-solid fa-magnifying-glass absolute left-8 top-9 transform -translate-y-1/2 text-gray text-sm pointer-events-none" />
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        className="w-full border border-[#d8dfe7] h-[39px] text-gray rounded-[8px] pl-[40px] pr-[20px]  focus:outline-none focus:ring-1 focus:ring-[#9CA3AF] focus:border-[#9CA3AF]"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="rounded-xl bg-white shadow-md ">
                                <div className="p-[24px] space-y-4">
                                    {sections.map((section, idx) => {
                                        const isOpen = openStates[idx];
                                        return (
                                            <div
                                                key={idx}
                                                className="rounded-xl bg-white shadow-[0_4px_24px_2px_rgba(20,25,38,0.05)] overflow-hidden"
                                            >
                                                <button
                                                    onClick={() => toggle(idx)}
                                                    className="w-full flex justify-between items-center px-[18px] py-[12px] bg-[#eef2f7] focus:outline-none"
                                                >
                                                    <h5 className="font-medium text-[#313b5e]">{section.title}</h5>
                                                    <Icon
                                                        icon={isOpen ? 'akar-icons:chevron-up' : 'akar-icons:chevron-down'}
                                                        className="text-lg text-gray"
                                                    />
                                                </button>

                                                <AnimatePresence initial={false}>
                                                    {isOpen && (
                                                        <motion.div
                                                            key="content"
                                                            initial="collapsed"
                                                            animate="open"
                                                            exit="collapsed"
                                                            variants={{
                                                                open: { height: 'auto', opacity: 1 },
                                                                collapsed: { height: 0, opacity: 0 },
                                                            }}
                                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                            className="px-[24px] overflow-hidden"
                                                        >
                                                            <div className="py-[16px] ">
                                                                {section.content}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="p-[24px] ">
                                    <button className=" w-[100%] h-[42px]  text-white bg-primary  border-[1px] border-primary  rounded-xl text-[14px]  hover:text-primary hover:bg-white">Apply</button>
                                </div>
                            </div>
                        </div>

                        <div className="w-[75%] max-2xl:w-[77%] max-lg:w-[100%]  rounded-xl  max-lg:mt-[24px]">
                            <div className="rounded-xl bg-white shadow-[0_4px_24px_2px_rgba(20,25,38,0.05)] mb-[10px] px-[24px] py-[18px] max-lg:px-[18px] max-sm:p-[10px] flex justify-between items-center">
                                <div><p className="text-gray">Showing all  <span className="font-[600] text-black">{productdata?.length}</span>  items results</p></div>
                                <div className="flex gap-3">
                                    <button className="text-gray h-[39px] px-[16px] text-gray border-[1px] border-gray rounded-[12px] text-[14px]  hover:bg-gray hover:text-white "><i className="fa-solid fa-gear text-[12px] me-[4px]"></i> More Setting</button>
                                    {/* <button className="text-gray h-[39px] px-[16px] text-gray border-[1px] border-gray rounded-[12px] text-[14px]  hover:bg-gray hover:text-white "><i className="fa-solid fa-filter text-[12px] me-[4px]"></i>Filters</button> */}
                                    <button onClick={() => {
                                        navigate('/create-product')
                                    }} className="text-gray h-[39px] px-[16px]  border-[1px] border-primary rounded-[12px]  text-[14px]  bg-primary text-white "><i className="fa-solid fa-plus text-[12px] me-[4px]"></i> New Product</button>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3 max-2xl:grid-cols-2 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
                                {/* <div className="rounded-xl bg-white shadow-[0_4px_24px_2px_rgba(20,25,38,0.05)] mb-[10px] px-[24px] py-[18px] max-lg:px-[18px] max-sm:p-[10px]  ">
                                    <div>
                                        <img src={Category_img} />
                                    </div>
                                    <div>
                                        <h5 className="text-[#313b5e]">Men Black Slim Fit T-shirt</h5>
                                        <div className="my-1 ">
                                            <div className="flex items-center gap-3">
                                                <ul className="flex gap-[1px]">
                                                    <li><i className="fa-solid fa-star text-[#f9b931] text-[14px]"></i></li>
                                                    <li><i className="fa-solid fa-star text-[#f9b931] text-[14px]"></i></li>
                                                    <li><i className="fa-solid fa-star text-[#f9b931] text-[14px]"></i></li>
                                                    <li><i className="fa-solid fa-star text-[#f9b931] text-[14px]"></i></li>
                                                    <li><i className="fa-solid fa-star-half-stroke text-[#f9b931] text-[14px]"></i></li>
                                                </ul>
                                                <p className="text-[#313b5e] text-[15px]">4.5 <span className="text-gray text-[13px]"> (55 Review)</span></p>
                                            </div>
                                            <div className="mt-2 mb-1 flex gap-3 items-center">
                                                <span className="font-[600] text-[18px] text-gray line-through hans">$100</span>

                                                <span className="font-[600] text-[18px] hans text-[#313b5e]">$80</span>
                                                <small className="text-gray  text-[12px] font-[600] hans">(30% Off)</small>
                                            </div>
                                            <div className="flex gap-2 mt-[24px]">
                                                <button className="w-[48px] h-[39px] max-md:h-[35px] max-md:w-[35px] bg-[#ff6c2f1a] border-[1px] border-[#ffc4ac] flex justify-center items-center text-primary hover:bg-primary hover:text-white rounded-[0.8rem]">
                                                    <i className="fa-solid fa-ellipsis"></i>
                                                </button>
                                                <div className="w-[100%] text-gray border-[1px] border-gray rounded-[12px] text-[14px]  hover:bg-gray hover:text-white flex justify-center">
                                                    <button className=" text-gray h-[39px] px-[16px] "><i className="fa-solid fa-cart-shopping text-[12px] me-[4px]"></i> Add To Cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                                {/* {productdata.map((product, index) => (
                                    <ProductCard
                                        key={index}
                                        {...product}
                                        isDropdownOpen={openDropdown === index}
                                        onDropdownToggle={() => handleDropdownToggle(index)}
                                    />
                                ))} */}


                                {productdata
                                    .filter((product) =>
                                        product.name.toLowerCase().includes(searchTerm.toLowerCase())
                                    )
                                    .map((product, index) => (
                                        <ProductCard
                                            key={product.product_id} // Use a unique ID if available
                                            title={product.name}
                                            price={product.price}
                                            discount={product.discount_price}
                                            image={import.meta.env.VITE_API_BASE_URL + product.media[0]?.file}
                                            isDropdownOpen={openDropdown === index}
                                            onDropdownToggle={() => handleDropdownToggle(index)}
                                            addToCart={addToCart} // Pass the addToCart function here
                                            productId={product.product_id} // Pass the product ID to identify the product
                                            onDeleteClick={() => {
                                                openModal('modal3');
                                                setDeletProduct(product.product_id);
                                            }}
                                        />
                                    ))}

                            </div>
                        </div>
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
                                        <p className="pt-[14px] text-[#8492A6]">Are you sure you want to delete this product?</p>


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

export default Product_grid
