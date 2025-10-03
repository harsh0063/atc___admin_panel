import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import User_side_menu from '../../Componenet/user_side_menu'
import EmployList from '../../Componenet/EmployList'
import SubHeader from '../../Componenet/sub_header'
import Meen from '../../assets/meen.png'
import Searchdropdown from '../../Componenet/searchdropdown'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';

import Multiselect from 'multiselect-react-dropdown';
import { useAddRatingMutation } from '../../services/apiSlice';
import ThemeSwitcher from '../../Componenet/themeswicher';

const Create_Review = () => {
    const { state } = useLocation(); // Get the state passed via navigation
    const { order_id, product_id } = state || {};  // Destructure order_id and product_id from state

    console.log(order_id, product_id);

    const fileInputRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);
    const [rating, setRating] = useState(0);
    const [review, setreview] = useState('');
    const [photo, setphoto] = useState('');
    const [orderId, setOrderId] = useState(order_id || ''); // Set initial state if available
    const [productId, setproductId] = useState(product_id || ''); // Set initial state if available
    const [addReview] = useAddRatingMutation(); // Mutation for adding the review
    const navigate = useNavigate();

    useEffect(() => {
        if (order_id) setOrderId(order_id);  // Set the order_id from the passed state
        if (product_id) setproductId(product_id);  // Set the product_id from the passed state
    }, [order_id, product_id]);

    const handlesubmit = async () => {
        try {
            const formData = new FormData();

            formData.append('rating', rating);
            formData.append('review', review);
            formData.append('photo', photo);
            formData.append('theme_id', 6);  // Use productId from state
            formData.append('order_id', orderId);  // Use orderId from state

            console.log([...formData]);


            const response = await addReview({ formData }).unwrap();

            toast.success("Review successfully added!");

            setTimeout(() => {
                navigate("/review");
            }, 1000);

        } catch (error) {
            toast.error(error?.data?.message || "Something went wrong!");
        }
    };

    const handleDivClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setphoto(file);
        }
    };


    const [hoveredRating, setHoveredRating] = useState(0);

    const handleClick = (value) => {
        setRating(value); // Set rating value on click
    };

    const handleMouseEnter = (value) => {
        setHoveredRating(value); // Show hovered star value
    };

    const handleMouseLeave = () => {
        setHoveredRating(0); // Reset hover on mouse leave
    };

    return (
        <div>
             <ThemeSwitcher />
            <ToastContainer position="top-center" autoClose={1500} />
            <User_side_menu setIsOpen={setIsOpen} isOpenside={isOpenside} />
            <div className='flex inter'>
                <EmployList isOpen={isOpen} setIsOpen={setIsOpen} />
                <div className="w-full width__right relative max-md:ms-0">
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Review Add"} />
                    <div className="flex justify-between gap-[10px] mb-[50px] flex-wrap max-sm:mb-[20px]" >
                        <h4 className="text-[18px] text-gray font-semibold">Review Add</h4>
                    </div>

                    <div className='bg-white shadow-[0px_3px_4px_rgba(0,0,0,0.1)] rounded-[0.75rem]  mb-[30px]'>
                        <div className='px-[24px] py-[18px] border-b border-[#eaedf1]'>
                            <h3 className='text-[#313b5e] font-[600]'>Review </h3>
                        </div>
                        <div className='p-[24px] grid grid-cols-1 gap-[20px]'>
                        <div className="">
                                <label className="text-sm mb-[10px] text-[#313b5e] block">Photo</label>

                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                />

                                <div
                                    onClick={handleDivClick}
                                    className="border-dashed border-2 border-gray rounded-[8px] h-[100px] w-[100px] flex items-center justify-center cursor-pointer"
                                >
                                    {photo ? (
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt="Selected"
                                            className="w-full h-full object-contain rounded"
                                        />
                                    ) : (
                                        <FaCamera className="text-3xl" />
                                    )}
                                </div>
                            </div>
                            <div className="w-[50%] max-lg:w-[100%]">
                                <label className="text-sm mb-[10px] text-[#313b5e] block">Review </label>
                                <input
                                    type="text"
                                    value={review}
                                    onChange={(e) => setreview(e.target.value)}
                                    className="h-[40px] transition-all duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px] px-[16px] text-[#5d7186] border border-[#d8dfe7] w-full"
                                    placeholder="Review "
                                />
                            </div>

                            <div className="">
                                <label className="text-sm mb-[10px] text-[#313b5e] block">Rating</label>

                                <div className="flex items-center">
                                    {[...Array(5)].map((_, index) => {
                                        const starValue = index + 1;
                                        return (
                                            <svg
                                                key={starValue}
                                                onClick={() => handleClick(starValue)} // Set rating on click
                                                onMouseEnter={() => handleMouseEnter(starValue)} // Show rating on hover
                                                onMouseLeave={handleMouseLeave} // Reset hover
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill={starValue <= (hoveredRating || rating) ? "#FFB400" : "none"} // Highlight filled stars
                                                stroke="#FFB400"
                                                strokeWidth="2"
                                                className="h-[24px] w-[24px] cursor-pointer"
                                            >
                                                <path
                                                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                                />
                                            </svg>
                                        );
                                    })}
                                </div>

                                <input
                                    type="hidden"
                                    value={rating} // Store the rating value
                                    onChange={(e) => setRating(e.target.value)}
                                />
                            </div>

                        
                        </div>
                        <div className='px-[24px] py-[18px] border-t border-[#eaedf1]'>
                            <button
                                onClick={handlesubmit}
                                className="bg-primary text-white rounded-[0.75rem] ms-auto block text-[14px] h-[40px] px-[16px] py-[8px]"
                            >
                                Submit Review
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create_Review;
