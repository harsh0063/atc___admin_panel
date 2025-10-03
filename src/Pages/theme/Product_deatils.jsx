import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import User_side_menu from '../../Componenet/user_side_menu';
import EmployList from '../../Componenet/EmployList';
import SubHeader from '../../Componenet/sub_header';
import { ToastContainer,toast } from "react-toastify";

import { Link } from "react-router-dom";
import Category_img from '../../assets/category.png';
import Category_img1 from '../../assets/category_1.png';
import Meen from '../../assets/meen.png'
import { useAddWishlistMutation, useDeleteProductMutation, useGetCategories_fetch_allQuery, useGetCategoriesQuery, useGetColorQuery, useGetFebricQuery, useGetProductQuery, useGetSubCategories_fetchallQuery, useGetSubCategoriesQuery } from "../../services/apiSlice";
import ThemeSwitcher from "../../Componenet/themeswicher";


const Product_deatils = () => {
  const [modal, setModal] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef([]);
  const [deleteProduct] = useDeleteProductMutation();

  const location = useLocation()
  const item = location.state.product_id

  console.log(item);
  const { data: color } = useGetColorQuery()
  const { data: fabric } = useGetFebricQuery()
  const { data: category } = useGetCategories_fetch_allQuery()
  const { data: subcategory } = useGetSubCategories_fetchallQuery()

  const { data: product } = useGetProductQuery(item);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenside, setIsOpenside] = useState(false);

  const [userInteracted, setUserInteracted] = useState(false);
  console.log(color);

  // Slider images
  const images = product?.product?.media?.map((val) => {
    return import.meta.env.VITE_API_BASE_URL + val.file;
  });


  const [currentIndex, setCurrentIndex] = useState(0);
  const thumbnailRefs = useRef([]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images?.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images?.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    if (userInteracted && thumbnailRefs.current[currentIndex]) {
      thumbnailRefs.current[currentIndex].scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
      setUserInteracted(false); // reset
    }
  }, [currentIndex]);


  // Auto change image every 5 seconds
  useEffect(() => {
    if (!images || images.length === 0) return;

    // Don't auto slide if already on last image
    if (currentIndex >= images.length - 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : prevIndex
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, images]);



  // inc & dec 
  const [quantity, setQuantity] = useState(1);

  // Increment function
  const increment = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  // Decrement function (ensuring it doesn't go below 1)
  const decrement = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const [expanded, setExpanded] = useState(false);

  // Split description into words
  const words = product?.product?.description?.split(' ') || [];

  // Toggle function
  const toggleExpanded = () => setExpanded(!expanded);

  // Determine whether to show "Read More"
  const showReadMore = words.length > 40;

  // Truncate description if not expanded
  const visibleText = expanded ? description : words.slice(0, 40).join(' ') + (showReadMore ? '...' : '');

  const productInfo = [
    { label: "Brand", value: product?.product?.brand },
    { label: "SKU", value: product?.product?.sku },
    { label: "Pattern", value: product?.product?.pattern },
    { label: "Fit", value: product?.product?.fit },
    { label: "Sleeve", value: product?.product?.sleeve },
    { label: "Neck Type", value: product?.product?.neck_type },
    { label: "Gender", value: product?.product?.gender },
    { label: "GST", value: product?.product?.gst_percentage ? `${product?.product?.gst_percentage}%` : null },
    { label: "Wholesaler Price", value: product?.product?.wholesaler_price ? `₹${product?.product?.wholesaler_price}` : null },
    { label: "Stock", value: product?.product?.stock },
    { label: "Tags", value: product?.product?.tags },
    { label: "Fabric", value: fabric?.data?.find((val) => val.fabric_id == product?.product?.fabric)?.name },
    { label: "subcategory", value: subcategory?.data?.find((val) => val.subcategory_id == product?.product?.subcategory)?.name },
    { label: "category", value: category?.data?.find((val) => val.category_id == product?.product?.category)?.name },
  ];

  const [addwhishlist] = useAddWishlistMutation()

  const handlewishlist = async () => {
    try {

      const formData = new FormData();

      formData.append('product_id',product?.product?.product_id)

      const response = await addwhishlist(formData).unwrap();

      if (response) {
        toast.success("Product successfully whishlist!");

      }


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
  }





  return (
    <div>
       <ThemeSwitcher />
      <ToastContainer position="top-center" autoClose={1500} />
      <User_side_menu setIsOpen={setIsOpen} isOpenside={isOpenside} />
      <div className="flex inter">
        <EmployList isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="w-full width__right relative max-md:ms-0">
          <SubHeader setIsOpenside={setIsOpenside} pageName={"Product Details"} />
          <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block">
            <h3 className="text-[22px] font-[700] text-[#707793] uppercase ">Product Details</h3>

            <nav className="text-sm text-gray-600 max-sm:mt-[15px] max-sm:ps-[5px]" aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center">
                <li className="flex items-center">
                  <Link to="/dashboard" className="hover:text-primary transition-colors font-[12px] text-[#575864]">Dashboard</Link>
                  <svg className="mx-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </li>
                <li className="flex items-center">
                  <Link to="/dashboard" className="hover:text-primary transition-colors font-[12px] text-[#575864]">Product</Link>
                  <svg className="mx-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </li>
                <li className="text-primary font-medium text-[12px]">Product Details</li>
              </ol>
            </nav>
          </div>

          <div className="flex gap-5 max-lg:block">
            {/* Image carousel */}
            <div className="w-[30%] max-2xl:w-[50%] max-lg:w-[100%]">
              <div className="   h-[auto]  rounded-xl bg-white shadow-[0_4px_24px_2px_rgba(20,25,38,0.05)]">
                <div className="   p-[20px] max-sm:p-[10px]">
                  <div className="relative w-full max-w-[600px] mx-auto   ">
                    {/* Main Image with fade-in effect */}
                    <img
                      key={currentIndex} // Adding key to force re-render
                      src={images?.[currentIndex]}
                      alt={`Slide ${currentIndex}`}
                      className="w-full h-[400px] object-cover rounded-xl transition-opacity duration-1000 ease-in-out bg-[#eef2f7]"
                      style={{ opacity: 0, animation: "fadeIn 1s forwards" }}
                    />

                    {/* Navigation Buttons */}
                    <button
                      onClick={handlePrev}
                      className="absolute top-[40%] left-4 transform -translate-y-1/2 bg-white shadow p-2 rounded-full z-10"
                    >
                      <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute top-[40%] right-4 transform -translate-y-1/2 bg-white shadow p-2 rounded-full z-10"
                    >
                      <i className="fa-solid fa-chevron-right"></i>
                    </button>

                    <div className="flex gap-2 mt-4 overflow-x-auto max-w-full px-2 none__apee_scrol">
                      {images?.map((img, index) => (
                        <img
                          key={index}
                          ref={(el) => (thumbnailRefs.current[index] = el)}
                          src={img}
                          alt={`Thumbnail ${index}`}
                          onClick={() => {
                            setUserInteracted(true);
                            setCurrentIndex(index);
                          }}
                          className={`w-[120px] h-[105px] object-cover rounded cursor-pointer transition duration-200
      ${index === currentIndex
                              ? "bg-[#eef2f7] rounded-[8px]  "
                              : "opacity-50 grayscale hover:opacity-80 hover:grayscale-0"
                            }`}
                        />
                      ))}

                    </div>

                  </div>

                </div>
                <div className="border-t  border-[#eaedf1]   p-[20px] max-sm:p-[10px] flex gap-2 max-sm:block ">
                  <div className="w-full hover:text-primary border-[1px] hover:border-primary rounded-[12px] text-[14px] bg-primary text-white flex justify-center max-sm:mb-[10px]">
                    <button className="text-primary h-[39px] px-[16px] text-white text-nowrap ">
                      <i className="fa-solid fa-cart-shopping text-[12px] me-[4px]"></i> Add To Cart
                    </button>
                  </div>
                  <div className="w-full text-gray border-[1px] border-gray rounded-[12px] text-[14px] hover:bg-gray hover:text-white flex justify-center max-sm:mb-[10px]">
                    <button className="text-gray h-[39px] px-[16px] hover:text-white text-nowrap">
                      <i className="fa-solid fa-cart-shopping text-[12px] me-[4px] "></i> Add To Cart
                    </button>
                  </div>

                  <button onClick={handlewishlist} className=" max-md:min-h-[40px] max-md:min-w-[40px] max-sm:w-[100%]  bg-[#ff6c2f1a] flex justify-center items-center text-primary rounded-[0.5rem] hover:bg-primary hover:text-white align-middle px-[20px] ">

                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" className="min-w-[15px]" viewBox="0 0 24 24"><path fill="currentColor" d="m8.962 18.91l.464-.588zM12 5.5l-.54.52a.75.75 0 0 0 1.08 0zm3.038 13.41l.465.59zm-8.037-2.49a.75.75 0 0 0-.954 1.16zm-4.659-3.009a.75.75 0 1 0 1.316-.72zm.408-4.274c0-2.15 1.215-3.954 2.874-4.713c1.612-.737 3.778-.541 5.836 1.597l1.08-1.04C10.1 2.444 7.264 2.025 5 3.06C2.786 4.073 1.25 6.425 1.25 9.137zM8.497 19.5c.513.404 1.063.834 1.62 1.16s1.193.59 1.883.59v-1.5c-.31 0-.674-.12-1.126-.385c-.453-.264-.922-.628-1.448-1.043zm7.006 0c1.426-1.125 3.25-2.413 4.68-4.024c1.457-1.64 2.567-3.673 2.567-6.339h-1.5c0 2.198-.9 3.891-2.188 5.343c-1.315 1.48-2.972 2.647-4.488 3.842zM22.75 9.137c0-2.712-1.535-5.064-3.75-6.077c-2.264-1.035-5.098-.616-7.54 1.92l1.08 1.04c2.058-2.137 4.224-2.333 5.836-1.596c1.659.759 2.874 2.562 2.874 4.713zm-8.176 9.185c-.526.415-.995.779-1.448 1.043s-.816.385-1.126.385v1.5c.69 0 1.326-.265 1.883-.59c.558-.326 1.107-.756 1.62-1.16zm-5.148 0c-.796-.627-1.605-1.226-2.425-1.901l-.954 1.158c.83.683 1.708 1.335 2.45 1.92zm-5.768-5.63a7.25 7.25 0 0 1-.908-3.555h-1.5c0 1.638.42 3.046 1.092 4.275z"></path></svg>
                  </button>
                </div>
              </div>

            </div>

            <div className="w-[70%] max-2xl:w-[77%] max-lg:w-[100%]  rounded-xl  max-lg:mt-[24px]  bg-white shadow-[0_4px_24px_2px_rgba(20,25,38,0.05)] p-[20px] max-sm:p-[15px]">
              <div>
                <div className="flex items-center gap-3">

                  {product?.product?.is_new_arrival && (


                    <span className="bg-[#22c55e] text-white text-[14px] py-[5px] px-[11px] font-[600] rounded-[4px] ">
                      New Arrival
                    </span>
                  )}
                  {product?.product?.is_trending && (
                    <span className="bg-[#ff1e00] text-white text-[14px] py-[5px] px-[11px] font-[600] rounded-[4px]">
                      Trending
                    </span>
                  )}
                </div>
                <h4 className="text-[24px] my-[8px] text-[#313b5e] max-sm:text-[22px]">{product?.product?.name}</h4>

                <div className="flex items-center gap-3">
                  <ul className="flex gap-[1px]">
                    <li><i className="fa-solid fa-star text-[#f9b931] text-[20px] max-sm:text-[16px]"></i></li>
                    <li><i className="fa-solid fa-star text-[#f9b931] text-[20px] max-sm:text-[16px]"></i></li>
                    <li><i className="fa-solid fa-star text-[#f9b931] text-[20px] max-sm:text-[16px]"></i></li>
                    <li><i className="fa-solid fa-star text-[#f9b931] text-[20px] max-sm:text-[16px]"></i></li>
                    <li><i className="fa-solid fa-star-half-stroke text-[#f9b931] text-[20px] max-sm:text-[16px]"></i></li>
                  </ul>
                  <p className="text-[#313b5e] text-[18px]">
                    {product?.product?.average_rating} <span className="text-gray text-[13px]">({product?.product?.total_reviews} Review)</span>
                  </p>
                </div>
                <div className=" my-[24px] flex gap-3 items-center">
                  <h2 className="font-[600]  hans text-[#313b5e] text-[30px] max-sm:text-[25px]">₹{product?.product?.discount_price}</h2>
                  <span className="font-[600] text-[18px] text-gray line-through hans">₹{product?.product?.price}</span>
                  <small className="text-gray text-[12px] font-[600] hans">({parseInt(product?.product?.discount_percentage)}% Off)</small>
                </div>

                <div className=" my-[24px] flex gap-3 items-center max-sm:block">
                  <div className="min-w-[200px] max-xl:min-w-[180px] max-sm:mb-[14px]">
                    <h5 className="hans flex items-center text-[#313b5e] mb-[5px]">Colors &gt; Dark</h5>
                    <div>
                      <div className="flex flex-wrap gap-2" role="group" aria-label="Color selection">

                        {/* Dark */}


                        {/* Yellow */}
                        {color?.data
                          ?.filter((clr) => product?.product?.colors?.includes(clr.color_id))
                          ?.map((clr, index) => (
                            <div key={clr.color_id} className="relative m-1">
                              <input
                                type="checkbox"
                                id={`color-${index}`}
                                className="hidden peer"
                              />
                              <label
                                htmlFor={`color-${index}`}
                                className="bg-[#eef2f7] peer-checked:bg-[#bec2c6] hover:bg-[#bec2c6] p-2 rounded-md inline-flex items-center gap-2 cursor-pointer "
                              >
                                <div
                                  className="w-[16px] h-[16px] rounded-full"
                                  style={{ backgroundColor: clr.hex_code }}
                                ></div>
                              </label>
                            </div>
                          ))}



                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className="hans flex items-center text-[#313b5e] mb-[5px]">Size &gt; M</h5>
                    <div>
                      <div className="flex flex-wrap gap-2" role="group" aria-label="Basic checkbox toggle button group">
                        {/* Size S */}

                        {product?.product?.size?.map((val, index) => (
                          <div key={index} className="bg-[#eef2f7] hover:bg-[#bec2c6] peer-checked:bg-[#bec2c6] rounded-md inline-flex items-center gap-2 m-1">
                            <input
                              type="checkbox"
                              id={`size-${index}`}
                              className="hidden peer/size"
                            />
                            <label
                              htmlFor={`size-${index}`}
                              className="peer-checked/size:bg-[#bec2c6] peer-checked/size:text-white text-black h-[36px] w-[36px] flex justify-center items-center rounded-md text-sm font-medium cursor-pointer"
                            >
                              {val}
                            </label>
                          </div>
                        ))}


                      </div>
                    </div>


                  </div>
                </div>
                <div className="mb-[7px]">
                  <h4 className="text-[#313b5e] text-[18px] hans font-[600] mb-[10px]">Quantity :</h4>
                  <span className="flex items-center gap-2 border-[#eaedf1] justify-between border p-1 rounded-[8px] w-[135px]">
                    {/* Decrement Button */}
                    <button
                      onClick={decrement}
                      className="p-1 px-3 bg-[#eef2f7] rounded-full flex justify-center items-center cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>

                    {/* Quantity Input Box */}
                    <input
                      type="text"
                      value={quantity}
                      readOnly
                      className="w-8 h-8 text-center bg-gray-100 rounded-md  border-gray-300"
                      aria-label="Product quantity"
                    />

                    {/* Increment Button */}
                    <button
                      onClick={increment}
                      className="p-1 px-3 bg-[#eef2f7] rounded-full flex justify-center items-center cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </span>

                  <ul className="my-[24px]">
                    {product?.product?.is_available && (


                      <li className="text-[15px] text-gray"><i className="fa-solid fa-check text-[#22c55e] text-[12px] me-[2px]"></i> In Stock</li>
                    )
                    }
                    <li className="text-[15px] text-gray"><i className="fa-solid fa-check text-[#22c55e] text-[12px] me-[2px]"></i>  Free delivery available</li>
                    <li className="text-[15px] text-gray"><i className="fa-solid fa-check text-[#22c55e] text-[12px] me-[2px]"></i>   Sales 10% Off Use Code: <span className="text-[#313b5e] text-[16px]">CODE123</span></li>
                  </ul>
                  <div className="mb-[24px]">
                    <h4 className="text-[#313b5e] text-[18px] hans font-[600] mb-[10px]">Description :</h4>
                    <p className="text-gray">
                      {visibleText}
                      {showReadMore && !expanded && (
                        <span className="text-primary cursor-pointer ml-1" onClick={toggleExpanded}>
                          Read More
                        </span>
                      )}
                      {expanded && (
                        <span className="text-primary cursor-pointer ml-1" onClick={toggleExpanded}>
                          Show Less
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="">
                    <h4 className="text-[#313b5e] text-[18px] hans font-[600] mb-[10px]">Available offers :</h4>
                    <div className="flex  max-sm:items-start"><i className="fa-solid fa-bookmark text-[#22c55e] me-3 mt-1"></i> <p className="text-gray"><span className="text-[#313b5e]">Bank Offer</span>  10% instant discount on Bank Debit Cards, up to $30 on orders of $50 and above</p></div>
                    <div className="flex  mt-3  max-sm:items-start"><i className="fa-solid fa-bookmark text-[#22c55e] me-3 mt-1"></i> <p className="text-gray"><span className="text-[#313b5e]">Bank Offer</span>  Grab our exclusive offer now and save 20% on your next purchase! Don't miss out, shop today!</p></div>
                  </div>

                </div>
              </div>

              <div>

              </div>

            </div>
          </div>

          <div className="bg-white shadow-[0_4px_24px_2px_rgba(20,25,38,0.05)] p-[20px] max-sm:p-[15px] my-[10px]">
            <div className="grid grid-cols-4 max-xl:grid-cols-2 gap-6 max-sm:grid-cols-1 ">
              <div className="flex gap-3">
                <div className="text-primary bg-[#eef2f7] rounded-[8px] h-[48px] w-[48px] justify-center flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" className="w-[35px] h-[35px]" viewBox="0 0 24 24"><path fill="currentColor" d="M16.631 4.769a15 15 0 0 0-1.022-.019H14.38a.75.75 0 1 1 0-1.5h1.255c.435 0 .803 0 1.107.023c.32.024.622.075.918.206c.456.202.846.529 1.124.942c.181.269.283.558.36.867c.073.294.133.653.205 1.077l1.009 5.98a.75.75 0 0 1-.74.876c-2.487 0-4.488 1.99-4.488 4.426a.75.75 0 0 1-.75.75H7.42a3.13 3.13 0 0 1-3.039 2.353c-1.72 0-3.131-1.38-3.131-3.103c0-1.722 1.41-3.103 3.131-3.103c1.462 0 2.7.997 3.039 2.353h6.258c.337-2.64 2.425-4.73 5.065-5.113l-.868-5.143c-.077-.458-.128-.76-.186-.991c-.055-.222-.103-.324-.148-.391a1.15 1.15 0 0 0-.488-.408c-.077-.034-.19-.065-.422-.082"></path><path fill="currentColor" fillRule="evenodd" d="M16.488 17.647c0-1.722 1.41-3.103 3.131-3.103s3.131 1.38 3.131 3.103c0 1.722-1.41 3.103-3.13 3.103c-1.722 0-3.132-1.381-3.132-3.103" clipRule="evenodd" opacity=".5"></path></svg></div>
                <div>
                  <p className="text-[16px] mb-1 text-[#313b5e]">Free shipping for all orders over $200</p>
                  <p className="text-gray">Only in this week</p>
                </div>
                <div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="text-primary bg-[#eef2f7] rounded-[8px] h-[48px] w-[48px] justify-center flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" className="w-[35px] h-[35px]" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="m14.014 17l-.006 2.003c-.001.47-.002.705-.149.851s-.382.146-.854.146h-3.01c-3.78 0-5.67 0-6.845-1.172c-.81-.806-1.061-1.951-1.14-3.817c-.015-.37-.023-.556.046-.679c.07-.123.345-.277.897-.586a1.999 1.999 0 0 0 0-3.492c-.552-.308-.828-.463-.897-.586s-.061-.308-.045-.679c.078-1.866.33-3.01 1.139-3.817C4.324 4 6.214 4 9.995 4h3.51a.5.5 0 0 1 .501.499L14.014 7c0 .552.449 1 1.002 1v2c-.553 0-1.002.448-1.002 1v2c0 .552.449 1 1.002 1v2c-.553 0-1.002.448-1.002 1" clipRule="evenodd"></path><path fill="currentColor" d="M15.017 16c.553 0 1.002.448 1.002 1v1.976c0 .482 0 .723.155.87c.154.148.39.138.863.118c1.863-.079 3.007-.331 3.814-1.136c.809-.806 1.06-1.952 1.139-3.818c.015-.37.023-.555-.046-.678c-.069-.124-.345-.278-.897-.586a1.999 1.999 0 0 1 0-3.492c.552-.309.828-.463.897-.586c.07-.124.061-.309.046-.679c-.079-1.866-.33-3.011-1.14-3.818c-.877-.875-2.154-1.096-4.322-1.152a.497.497 0 0 0-.509.497V7c0 .552-.449 1-1.002 1v2a1 1 0 0 1 1.002 1v2c0 .552-.449 1-1.002 1z" opacity=".5"></path></svg></div>
                <div>
                  <p className="text-[16px] mb-1 text-[#313b5e]">Special discounts for customers</p>
                  <p className="text-gray">Coupons up to $ 100</p>
                </div>
                <div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="text-primary bg-[#eef2f7] rounded-[8px] h-[48px] w-[48px] justify-center flex items-center"><svg className="w-[35px] h-[35px]" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12s0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12" opacity=".5"></path><path fill="currentColor" fillRule="evenodd" d="M6.914 11.25H2v1.5h8.163A3.25 3.25 0 0 1 7 15.25a.75.75 0 0 0 0 1.5a4.75 4.75 0 0 0 4.25-2.626V22h1.5v-7.876A4.75 4.75 0 0 0 17 16.75a.75.75 0 0 0 0-1.5a3.25 3.25 0 0 1-3.163-2.5H22v-1.5h-4.913c.35-.438.613-.955.756-1.527c.538-2.153-1.413-4.103-3.565-3.565a4 4 0 0 0-1.528.756V2h-1.5v4.914a4 4 0 0 0-1.527-.756C7.57 5.62 5.62 7.57 6.158 9.723c.143.572.405 1.089.756 1.527m4.336 0H9.997a2.5 2.5 0 0 1-2.384-1.891A1.44 1.44 0 0 1 9.36 7.613a2.5 2.5 0 0 1 1.891 2.384zm2.753 0H12.75v-1.245a2.5 2.5 0 0 1 1.891-2.392a1.44 1.44 0 0 1 1.746 1.746a2.5 2.5 0 0 1-2.384 1.891" clipRule="evenodd"></path></svg></div>
                <div>
                  <p className="text-[16px] mb-1 text-[#313b5e]">Free gift wrapping</p>
                  <p className="text-gray">With 100 letters custom note</p>
                </div>
                <div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="text-primary bg-[#eef2f7] rounded-[8px] h-[48px] w-[48px] justify-center flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" className="w-[35px] h-[35px]" viewBox="0 0 24 24"><path fill="currentColor" d="M2 12.124C2 6.533 6.477 2 12 2s10 4.533 10 10.124v5.243c0 .817 0 1.378-.143 1.87a3.52 3.52 0 0 1-1.847 2.188c-.458.22-1.004.307-1.801.434l-.13.02a13 13 0 0 1-.727.105c-.209.02-.422.027-.64-.016a2.1 2.1 0 0 1-1.561-1.35a2.2 2.2 0 0 1-.116-.639c-.012-.204-.012-.452-.012-.742v-4.173c0-.425 0-.791.097-1.105a2.1 2.1 0 0 1 1.528-1.43c.316-.073.677-.044 1.096-.01l.093.007l.11.01c.783.062 1.32.104 1.775.275q.481.181.883.487v-1.174c0-4.811-3.853-8.711-8.605-8.711s-8.605 3.9-8.605 8.711v1.174c.267-.203.563-.368.883-.487c.455-.17.992-.213 1.775-.276l.11-.009l.093-.007c.42-.034.78-.063 1.096.01a2.1 2.1 0 0 1 1.528 1.43c.098.314.097.68.097 1.105v4.172c0 .291 0 .54-.012.743c-.012.213-.04.427-.116.638a2.1 2.1 0 0 1-1.56 1.35a2.2 2.2 0 0 1-.641.017c-.201-.02-.444-.059-.727-.104l-.13-.02c-.797-.128-1.344-.215-1.801-.436a3.52 3.52 0 0 1-1.847-2.188c-.118-.405-.139-.857-.142-1.461L2 17.58z"></path><path fill="currentColor" fillRule="evenodd" d="M12 5.75a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0v-5a.75.75 0 0 1 .75-.75m3 1.5a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75m-6 0a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0V8A.75.75 0 0 1 9 7.25" clipRule="evenodd" opacity=".5"></path></svg></div>
                <div>
                  <p className="text-[16px] mb-1 text-[#313b5e]">Expert Customer Service</p>
                  <p className="text-gray">8:00 - 20:00, 7 days/wee</p>
                </div>
                <div>
                </div>
              </div>

            </div>
          </div>
          <div className="grid grid-cols-2  max-lg:grid-cols-1 gap-5">
            <div className="bg-white shadow-[0_4px_24px_2px_rgba(20,25,38,0.05)] rounded-xl ">
              <h4 className="p-[20px] border-b border-[#eaedf1] max-sm:p-[15px] my-[10px] text-[#313b5e] font-[600] hans">Items Detils</h4>
              <div className="p-[20px] max-sm:p-[15px] my-[10px]">
                <div>
                  <ul className="space-y-1">
                    {productInfo.map(
                      (item, index) =>
                        item.value && (
                          <li key={index} className="text-gray text-[14px]">
                            <span className="text-[#313b5e]">{item.label}</span>
                            <span className="mx-2">:</span>
                            {item.value}
                          </li>
                        )
                    )}
                  </ul>
                </div>
                {/* <div className="mt-[10px]">
                  <span className="text-primary underline cursor-pointer inline-flex items-center gap-1">
                    View More Details
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 492.004 492.004"
                      className="w-4 h-4 fill-current font-[400]" >
                      <path d="M484.14 226.886 306.46 49.202c-5.072-5.072-11.832-7.856-19.04-7.856-7.216 0-13.972 2.788-19.044 7.856l-16.132 16.136c-5.068 5.064-7.86 11.828-7.86 19.04 0 7.208 2.792 14.2 7.86 19.264L355.9 207.526H26.58C11.732 207.526 0 219.15 0 234.002v22.812c0 14.852 11.732 27.648 26.58 27.648h330.496L252.248 388.926c-5.068 5.072-7.86 11.652-7.86 18.864 0 7.204 2.792 13.88 7.86 18.948l16.132 16.084c5.072 5.072 11.828 7.836 19.044 7.836 7.208 0 13.968-2.8 19.04-7.872l177.68-177.68c5.084-5.088 7.88-11.88 7.86-19.1.016-7.244-2.776-14.04-7.864-19.12z" />
                    </svg>
                  </span>
                </div> */}
              </div>
            </div>
            <div className="bg-white shadow-[0_4px_24px_2px_rgba(20,25,38,0.05)]  rounded-xl ">
              <h4 className="p-[20px] border-b border-[#eaedf1] max-sm:p-[15px] my-[10px] text-[#313b5e] font-[600] hans">Top Review From World</h4>
              <div className="p-[20px] max-sm:p-[15px] my-[10px] border-b border-[#eaedf1]">
                <div className="">
                  <div className="flex gap-5 items-center mb-[20px]">
                    <img src={Meen} className="h-[56px] w-[56px] rounded-full"></img>
                    <h5 className="text-[#313b5e]">Henny K. Mark</h5>
                  </div>
                  <div className="flex gap-5  mt-3 mb-2">
                    <ul className="flex gap-[1px] ">
                      <li><i className="fa-solid fa-star text-[#f9b931] text-[16px]"></i></li>
                      <li><i className="fa-solid fa-star text-[#f9b931] text-[16px]"></i></li>
                      <li><i className="fa-solid fa-star text-[#f9b931] text-[16px]"></i></li>
                      <li><i className="fa-solid fa-star text-[#f9b931] text-[16px]"></i></li>
                      <li><i className="fa-solid fa-star-half-stroke text-[#f9b931] text-[16px]"></i></li>
                    </ul>
                    <p className="text-[#313b5e]">Excellent Quality</p>
                  </div>
                  <p className="text-[15px] text-[#313b5e]">Reviewed in Canada on 16 November 2023</p>
                  <p className="text-gray text-[15px] max-sm:text-[12px]">Medium thickness. Did not shrink after wash. Good elasticity . XL size Perfectly fit for 5.10 height and heavy body. Did not fade after wash. Only for maroon colour t-shirt colour lightly gone in first wash but not faded. I bought 5 tshirt of different colours. Highly recommended in so low price.</p>

                  <div className="flex gap-6 mt-[15px]">
                    <div className="text-[14px] text-gray flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-[14px] w-[14px] text-gray"><path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2l144 0c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48l-97.5 0c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3l0-38.3 0-48 0-24.9c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192l64 0c17.7 0 32 14.3 32 32l0 224c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32L0 224c0-17.7 14.3-32 32-32z" fill="#5d7186" /></svg>
                      Helpful
                    </div>
                    <div className="text-[14px] text-gray">Report</div>
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

export default Product_deatils;
