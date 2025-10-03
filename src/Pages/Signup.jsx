import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../services/apiSlice';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import Logo from "../assets/Logo.svg";

const SignupPage = () => {
  const navigate = useNavigate();
  const [signupUser] = useRegisterUserMutation();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Added this line for password visibility toggle
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};

    // First Name Validation
    if (!fname.trim()) {
      errors.fname = "First name is required";
    }

    // Last Name Validation
    if (!lname.trim()) {
      errors.lname = "Last name is required";
    }

    // Email Validation
    if (!email.trim()) {
      errors.email = "Please enter an email";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = "Invalid email address";
    }
    // Mobile Number Validation
    if (!mobile.trim()) {
      errors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(mobile)) {
      errors.mobile = "Mobile number must be 10 digits";
    }

    // Password Validation
    if (!password.trim()) {
      errors.password = "Please enter a password";
    } else if (password.length < 8 || password.length > 16) {
      errors.password = "Password must be 8–16 characters";
    }

    // Confirm Password Validation
    if (!confirmPassword.trim()) {
      errors.confirmPassword = "Please confirm your password";
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors; // Returns true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const formData = new FormData();
        formData.append("first_name", fname);
        formData.append("last_name", lname);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("confirm_password", confirmPassword);
        formData.append("mobile_number", mobile);

        const response = await signupUser(formData).unwrap();
        console.log("Signup response:", response);

        if (response?.message) {
          toast.success(response.message);

          // Navigate after showing message
          setTimeout(() => {
            navigate("/");
          }, 1500);
        } else {
          toast.error("Signup failed! Please try again.");
        }
      } catch (err) {
        console.error("Signup failed:", err);
        toast.error(err?.data?.message || "Signup failed");
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-orange-50">
      <ToastContainer position="top-center" autoClose={1500} />

      <div className="bg-white rounded-2xl  shadow-[0px_9px_50px_1px_#3DB0F733] w-full max-w-md sm:min-w-[400px] md:min-w-[500px] lg:min-w-[600px] max-sm:p-4 p-8 mx-auto">


        <div className="flex justify-center mb-6 max-sm:mb-4 max-sm:mt-[10px] ">
          <img src={Logo} alt="logo" className="w-[120px]" />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-2 max-sm:text-[18px]">Create an Admin Account</h2>
        <p className="text-gray-300 text-center mb-6 text-[15px] max-sm:text-[12px]">
          Sign up to access your admin panel and manage your platform efficiently.
        </p>


        <form onSubmit={handleSubmit} >
          {/* First Name */}
          <div className='flex justify-between gap-5 max-sm:block'>
            <div className="mb-4 w-[100%]">
              <label className="block text-sm font-medium mb-1 ">First Name</label>
              <input
                type="text"
                placeholder="First Name..."
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                className={`w-full p-3  max-sm:p-2 rounded-lg border ${errors.fname ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-primary max-sm:text-sm`}
              />
              {errors.fname && <div className="text-red-600 text-sm mt-1">{errors.fname}</div>}
            </div>

            {/* Last Name */}
            <div className="mb-4  w-[100%]">
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input
                type="text"
                placeholder="Last Name..."
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                className={`w-full p-3  max-sm:p-2 rounded-lg border ${errors.lname ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-primary  max-sm:text-sm`}
              />
              {errors.lname && <div className="text-red-600 text-sm mt-1">{errors.lname}</div>}
            </div>

          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 max-sm:p-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2  max-sm:text-sm focus:ring-primary`}
            />
            {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="number"
              placeholder="Phone Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              maxLength={10}
              minLength={10}
              className={`w-full p-3 max-sm:p-2  max-sm:text-sm rounded-lg border ${errors.mobile ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-primary`}
            />
            {errors.mobile && <div className="text-red-600 text-sm mt-1">{errors.mobile}</div>}
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type={showPassword ? 'text' : 'password'} // Toggle between 'password' and 'text'
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 max-sm:p-2  max-sm:text-sm rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-primary`}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-10 right-3 max-sm:top-9 cursor-pointer"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            >
              <path
                d="M9.99994 15.8334C8.63317 15.8504 7.28052 15.5554 6.04494 14.9709C5.08718 14.5036 4.22715 13.8582 3.51077 13.0692C2.75196 12.2535 2.15449 11.3014 1.74994 10.2634L1.6666 10L1.7541 9.73671C2.15895 8.69957 2.75513 7.74777 3.5116 6.93088C4.22772 6.14197 5.08747 5.4966 6.04494 5.02921C7.28053 4.4447 8.63317 4.14972 9.99994 4.16671C11.3667 4.14975 12.7193 4.44473 13.9549 5.02921C14.9127 5.49649 15.7728 6.14187 16.4891 6.93088C17.2493 7.74551 17.847 8.69785 18.2499 9.73671L18.3333 10L18.2458 10.2634C16.9384 13.6665 13.6451 15.8912 9.99994 15.8334ZM9.99994 5.83338C7.16316 5.74448 4.55945 7.39596 3.43077 10C4.55927 12.6043 7.1631 14.2558 9.99994 14.1667C12.8366 14.2554 15.4402 12.604 16.5691 10C15.4419 7.39469 12.8372 5.74261 9.99994 5.83338ZM9.99994 12.5C8.79771 12.508 7.75774 11.6645 7.51741 10.4865C7.27707 9.30853 7.9035 8.12506 9.01276 7.66143C10.122 7.19779 11.4043 7.58349 12.0737 8.58213C12.7431 9.58077 12.6127 10.9134 11.7624 11.7634C11.2969 12.2344 10.6622 12.4997 9.99994 12.5Z"
                fill="#9CA3AF"
              ></path>
            </svg>
            {errors.password && <div className="text-red-600 text-sm mt-1">{errors.password}</div>}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full p-3 max-sm:p-2  max-sm:text-sm rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-primary`}
            />
            {errors.confirmPassword && <div className="text-red-600 text-sm mt-1">{errors.confirmPassword}</div>}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-[30px] max-sm:pt-[15px] mx-auto">
            <button type="submit" className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary transition duration-200">
              Create Account
            </button>
          </div>
        </form>

        {/* Sign In Link */}
        <div className="text-center mt-6">
          <Link to="/" className="text-primary hover:underline"> </Link>
        </div>

        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <Link to="/" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignupPage;



