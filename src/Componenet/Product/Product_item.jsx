import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductCard = ({
    image,
    title,
    rating,
    reviews,
    price,
    discount,
    isDropdownOpen,
    onDropdownToggle,
    addToCart, // Add the addToCart function prop
    productId, // Add productId as a prop
    onDeleteClick
}) => {
    const handleAddToCart = async () => {
        const quantity = 1;

        const formData = new FormData();
        formData.append('product_id', productId);
        formData.append('quantity', quantity);

        try {
            // Assuming addToCart is an async function
            const response = await addToCart(formData);

            if (response) {
                toast.success('Product added to cart successfully!'); // Success toast message
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again later.'); // Error toast message on failure
        }
    };

    const navigate = useNavigate()

    return (
        <div className="relative rounded-xl bg-white shadow-[0_4px_24px_2px_rgba(20,25,38,0.05)] mb-[10px] px-[24px] py-[18px] max-2xl:p-[10px] max-lg:px-[18px] max-sm:p-[10px]">
            {/* Product Image and Details */}
            <div>
                <img src={image} alt={title} className="w-full h-auto" />
            </div>
            <div>
                <h5 className="text-[#313b5e] mt-[10px]">{title}</h5>
                <div className="my-1">
                    <div className="mt-2 mb-1 flex gap-3 items-center">
                        <span className="font-[600] text-[18px] text-gray line-through hans">${price}</span>
                        <span className="font-[600] text-[18px] hans text-[#313b5e]">${discount}</span>
                    </div>
                    <div className="flex gap-2 mt-[24px]">
                        {/* Ellipsis button to toggle dropdown */}
                        <button
                            className="w-[48px] h-[39px] max-md:h-[35px] max-md:w-[35px] bg-[#ff6c2f1a] border-[1px] border-[#ffc4ac] flex justify-center items-center text-primary hover:bg-primary hover:text-white rounded-[0.8rem] max-md:rounded-[8px]"
                            onClick={onDropdownToggle}
                        >
                            <i className="fa-solid fa-ellipsis"></i>
                        </button>

                        {/* Responsive Dropdown menu */}
                        {isDropdownOpen && (
                            <div className="absolute -bottom-[76px] left-[25px] max-2xl:left-[10px] max-2xl:-bottom-[85px] max-lg:left-[20px] bg-white shadow-lg p-3 w-[150px] rounded-2xl border-gray-300 max-sm:w-[120px] z-10">
                                <ul>
                                    <li><button onClick={() => {
                                        navigate("/edit-product", {
                                            state: { product_id: productId }, // Passing product_id to state
                                        });
                                    }} className="text-gray text-sm hover:text-primary px-[2px]">Edit</button></li>
                                    <li><button onClick={onDeleteClick} className="text-gray text-sm hover:text-primary px-[2px]">Delete</button></li>
                                </ul>
                            </div>
                        )}

                        {/* Add To Cart button */}
                        <div className="w-full text-gray border-[1px] border-gray hover:text-white rounded-[12px] text-[14px] hover:bg-gray hover:text-white flex justify-center">
                            <button className=" h-[39px] px-[16px] " onClick={handleAddToCart}>
                                <i className="fa-solid fa-cart-shopping text-[12px] me-[4px]"></i> Add To Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
