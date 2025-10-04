import React, { useState } from "react";
import Logo from "../assets/Logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useLoginUserMutation } from '../services/apiSlice';

import { setToken } from "../services/authtoken"; // Redux action

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser] = useLoginUserMutation(); // RTK Query login API

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    let errors = {};
    if (!email.trim()) {
      errors.email = "Please enter an email";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = "Invalid email address";
    }
    if (!password.trim()) {
      errors.password = "Please enter a password";
    } else if (password.length < 8 || password.length > 16) {
      errors.password = "Password length should be between 8 to 16 characters";
    }
    return errors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    setError(errors);

    if (Object.keys(errors).length === 0) {
      // Check for specific email & password first
      if (email !== "aithemecode@gmail.com" || password !== "ATC@m25.") {
        toast.error("Invalid email or password", { autoClose: 1500 });
        return; // Stop further execution
      }

      try {
        let formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        console.log(email);

        // Call your login API
        const response = await loginUser(formData).unwrap(); // Send FormData
        console.log(response?.access);

        dispatch(setToken(response?.access));
        localStorage.setItem("allopstoken", response?.access); // Store token in localStorage
        toast.success("Login successful!", { autoClose: 1500 });

        // Delay navigation by 1 second
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);

      } catch (err) {
        toast.error(err?.data?.message || "Login failed", { autoClose: 1500 });
      }
    }
  };


  return (
    <section className="min-h-screen flex items-center justify-center  px-4 bg-blue-50">
      <ToastContainer position="top-center" autoClose={1500} />
      <div className="bg-white rounded-2xl shadow-[0px_9px_50px_1px_#3DB0F733] w-full max-w-md sm:min-w-[400px] md:min-w-[500px] lg:min-w-[600px] max-sm:p-4 p-8 mx-auto">



        <div className="flex justify-center mb-6 max-sm:mb-4 max-sm:mt-[10px]">
          <img src={Logo} alt="logo" className="w-[120px]" />
        </div>

        <h2 className="text-2xl font-semibold text-center mb-2 max-sm:text-[19px]">Welcome Back</h2>
        <p className="text-gray-300 text-center mb-6 text-[15px] max-sm:text-[12px]">Log in to your account</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 max-sm:p-2 rounded-lg border ${error.email ? 'border-red-500' : 'border-gray-200'
                } focus:outline-none focus:ring-2 focus:ring-primary max-sm:text-sm`}
            />
            {error.email && <div className="text-red-600 text-sm mt-1">{error.email}</div>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full p-3 max-sm:p-2 rounded-lg border ${error.password ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-primary max-sm:text-sm`}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-3 right-3 cursor-pointer"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                onClick={() => setShowPassword(!showPassword)}
              >
                <path
                  d="M9.99994 15.8334C8.63317 15.8504 7.28052 15.5554 6.04494 14.9709C5.08718 14.5036 4.22715 13.8582 3.51077 13.0692C2.75196 12.2535 2.15449 11.3014 1.74994 10.2634L1.6666 10L1.7541 9.73671C2.15895 8.69957 2.75513 7.74777 3.5116 6.93088C4.22772 6.14197 5.08747 5.4966 6.04494 5.02921C7.28053 4.4447 8.63317 4.14972 9.99994 4.16671C11.3667 4.14975 12.7193 4.44473 13.9549 5.02921C14.9127 5.49649 15.7728 6.14187 16.4891 6.93088C17.2493 7.74551 17.847 8.69785 18.2499 9.73671L18.3333 10L18.2458 10.2634C16.9384 13.6665 13.6451 15.8912 9.99994 15.8334ZM9.99994 5.83338C7.16316 5.74448 4.55945 7.39596 3.43077 10C4.55927 12.6043 7.1631 14.2558 9.99994 14.1667C12.8366 14.2554 15.4402 12.604 16.5691 10C15.4419 7.39469 12.8372 5.74261 9.99994 5.83338ZM9.99994 12.5C8.79771 12.508 7.75774 11.6645 7.51741 10.4865C7.27707 9.30853 7.9035 8.12506 9.01276 7.66143C10.122 7.19779 11.4043 7.58349 12.0737 8.58213C12.7431 9.58077 12.6127 10.9134 11.7624 11.7634C11.2969 12.2344 10.6622 12.4997 9.99994 12.5Z"
                  fill="#9CA3AF"
                ></path>
              </svg>
            </div>
            {error.password && <div className="text-red-600 text-sm mt-1">{error.password}</div>}
          </div>

          <div className="flex items-center justify-between text-sm mb-6">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            {/* <Link to="/forget_password" className="text-primary hover:underline">
            Forgot Password?
          </Link> */}
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary transition duration-200"
          >
            Log In
          </button>
        </form>

        {/* <p className="text-sm text-center mt-6">
        Don’t have an account?{" "}
        <Link to="/register" className="text-primary hover:underline">
          Signup
        </Link>
      </p> */}
      </div>
    </section>

  );
};

export default Login;
