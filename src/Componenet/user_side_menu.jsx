import React, { useState } from "react";
import Logo from '../assets/Logo.svg';
import user from "../assets/meen.png";
import SmallLogo from '../assets/logo_sm.svg'; // <-- mobile logo
import { Link } from "react-router-dom";
import { useEffect } from "react";

const user_side_menu = ({ setIsOpen, isOpenside }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 576);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 576);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      {/* First Header */}
      <div style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.19)" }} className={`flex py-2 max-lg:flex hidden shadow_11 bg-white items-center z-100 justify-between ${isOpenside ? 'z-[100]' : 'z-[20]'} sticky top-0 left-0`}>
        <div className="ms-[20px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="toogle__btn"
            onClick={() => setIsOpen(true)}
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className="h-[40px] max-sm:h-[34px]"
            x="0"
            y="0"
            viewBox="0 0 24 24"
            style={{ enableBackground: "new 0 0 512 512" }}
            xmlSpace="preserve"
          >
            <g>
              <g data-name="Layer 2">
                <path
                  d="M22 5H3a1 1 0 0 1 0-2h19a1 1 0 0 1 0 2zM17 10h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2zM22 16H3a1 1 0 0 1 0-2h19a1 1 0 0 1 0 2zM17 21h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2zM10 10H3a1 1 0 0 1 0-2h7a1 1 0 0 1 0 2zM10 21H3a1 1 0 0 1 0-2h7a1 1 0 0 1 0 2z"
                  fill="#000000"
                  opacity="1"
                  className=""
                />
              </g>
            </g>
          </svg>
        </div>
        <div>
          {

            <img src={isMobile ? SmallLogo : Logo} className="h-[40px]" alt="Logo" />
          }
        </div>
        <div className="me-[20px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            className="h-[40px]"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0"
            y="0"
            viewBox="0 0 24 24"
            style={{ enableBackground: "new 0 0 512 512" }}
            xmlSpace="preserve"
          >
            <g>
              <g data-name="Layer 2">
                <path
                  d="M22 5H3a1 1 0 0 1 0-2h19a1 1 0 0 1 0 2zM17 10h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2zM22 16H3a1 1 0 0 1 0-2h19a1 1 0 0 1 0 2zM17 21h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2zM10 10H3a1 1 0 0 1 0-2h7a1 1 0 0 1 0 2zM10 21H3a1 1 0 0 1 0-2h7a1 1 0 0 1 0 2z"
                  fill="#ffffff"
                  opacity="1"
                  className=""
                />
              </g>
            </g>
          </svg>
        </div>
      </div>

      {/* Main Header */}
      {/* <div id="header" className="bg-white-1 inter d-none-header max-2xl:block max-md:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src={Logo} className="logo-img" alt="Logo" />

            <div className="max-2xl:ms-5 max-lg:ms-1 margin-ad-start">
              <ul className="flex">
                <li className="relative">
                  <Link to="/dashboard">Dashboard</Link>
                  <ul className="drop_down_header absolute bg-white">
                    <li className="p-0">
                      <Link to="/category">Category</Link>
                    </li>
                    <li className="p-0">
                      <Link to="/sub_category">Sub Category</Link>
                    </li>
                    <li className="p-0">
                      <Link to="/product">Product</Link>
                    </li>
                    <li className="p-0">
                      <Link to="/team/devices">Devices</Link>
                    </li>
                    <li className="p-0">
                      <Link to="/team/leave-mangement" className="border-0">
                        Leave Management
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="active">
                  <Link to="/team/service_user_information">Service Users</Link>
                </li>
                <li>
                  <Link to="/team/logs">Logs</Link>
                </li>
                <li>
                  <Link to="">To-Do's</Link>
                </li>
                <li>
                  <Link to="">Reports</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex items-center mar-gin-2">
            <div>
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <g clipPath="url(#clip0_6_1419)">
                    <path
                      d="M11 0C4.95 0 0 4.95 0 11C0 17.05 4.95 22 11 22C17.05 22 22 17.05 22 11C22 4.95 17.05 0 11 0ZM11 20.625C5.6375 20.625 1.375 16.3625 1.375 11C1.375 5.6375 5.6375 1.375 11 1.375C16.3625 1.375 20.625 5.6375 20.625 11C20.625 16.3625 16.3625 20.625 11 20.625Z"
                      fill="#495567"
                    ></path>
                    <path
                      d="M10.0375 16.0874H11.9625V18.0124H10.0375V16.0874Z"
                      fill="#495567"
                    ></path>
                    <path
                      d="M11 3.9873C9.76251 3.9873 8.66251 4.2623 7.97501 4.9498C7.28751 5.6373 6.73751 6.5998 6.60001 7.8373L8.25001 8.1123C8.38751 7.1498 8.66251 6.4623 9.21251 6.0498C9.76251 5.6373 10.3125 5.3623 11 5.3623C11.6875 5.3623 12.375 5.6373 12.925 6.0498C13.475 6.5998 13.75 7.1498 13.75 7.8373C13.75 8.2498 13.6125 8.5248 13.475 8.9373C13.2 9.2123 12.925 9.6248 12.2375 10.1748C11.6875 10.5873 11.275 10.9998 11.1375 11.2748C10.725 11.6873 10.5875 11.9623 10.45 12.3748C10.3125 12.9248 10.175 13.4748 10.175 14.1623C10.175 14.2998 10.175 14.4373 10.175 14.7123H11.825C11.825 14.0248 11.825 13.6123 11.9625 13.1998C12.1 12.7873 12.1 12.5123 12.2375 12.3748C12.375 12.0998 12.7875 11.8248 13.3375 11.2748C14.1625 10.5873 14.7125 9.8998 14.9875 9.4873C15.2625 9.0748 15.4 8.3873 15.4 7.8373C15.4 6.7373 14.9875 5.9123 14.1625 5.2248C13.475 4.3998 12.375 3.9873 11 3.9873Z"
                      fill="#495567"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_6_1419">
                      <rect width="22" height="22" fill="white"></rect>
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </div>
            <div>
              <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M18.9165 9.69994L18.6003 8.32494L19.7811 6.28444L17.2545 3.13775L14.9926 3.82525L13.7053 3.21406L12.8363 1.03125H8.79242L7.92308 3.21406L6.63608 3.82731L4.3742 3.13844L1.84729 6.28478L3.02808 8.32528L2.71183 9.70028L0.757263 11.0296L1.65995 14.9583L4.00054 15.313L4.88811 16.4185L4.71589 18.765L8.3617 20.5047L10.099 18.9062H11.5297L13.267 20.5047L16.9125 18.7629L16.7406 16.4175L17.6278 15.3127L19.9688 14.9583L20.8711 11.0296L18.9162 9.69994H18.9165ZM18.5553 13.4341L16.7076 13.7146L14.9765 15.8699L15.1126 17.721L13.573 18.4532L12.199 17.1875H9.42973L8.05542 18.4532L6.51576 17.7189L6.65189 15.8689L4.92076 13.7139L3.07311 13.4338L2.69567 11.7896L4.23601 10.7418L4.85476 8.05028L3.92458 6.44256L4.98642 5.12016L6.77495 5.66431L9.27195 4.47391L9.95842 2.75H11.67L12.3564 4.47391L14.8534 5.66603L16.642 5.12119L17.7038 6.44325L16.7736 8.05062L17.3924 10.7422L18.933 11.7896L18.5549 13.4341H18.5553ZM10.847 7.21875C8.8567 7.21875 7.23833 8.83781 7.23833 10.8281C7.23833 12.8184 8.85739 14.4375 10.8477 14.4375C12.838 14.4375 14.4571 12.8184 14.4571 10.8281C14.4571 8.83781 12.8377 7.21875 10.847 7.21875ZM10.8477 12.7188C10.3465 12.7181 9.86595 12.5187 9.51153 12.1643C9.15711 11.8099 8.95771 11.3294 8.95708 10.8281C8.95708 10.3232 9.1537 9.84844 9.51051 9.49128C9.68572 9.31505 9.89416 9.17536 10.1238 9.0803C10.3534 8.98524 10.5995 8.9367 10.848 8.9375C11.8903 8.9375 12.7387 9.78588 12.7387 10.8281C12.7387 11.8704 11.8903 12.7188 10.848 12.7188H10.8477Z" fill="#495567"></path>
                </svg>
              </a>
            </div>
            <div className="account bg-white m-0  flex  items-center">
              <div>
               
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default user_side_menu;
