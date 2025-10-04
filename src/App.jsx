import React from 'react'
import Login from './Pages/Login'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './Pages/Dashboard';
import SignupPage from './Pages/Signup';
import Category from './Pages/Category/category';
import Edit_category from './Pages/Category/Edit_Category';
import Themes from './Pages/theme/themes';

import Create_category from './Pages/Category/Create_category';
import Create_theme from './Pages/theme/Create_theme';
import Edit_theme from './Pages/theme/Edit_theme';

import Profile from './Pages/User';

import Subcategory from './Pages/Subcategory/subcategory';
import Create_subcategory from './Pages/Subcategory/Create_subcategory';
import Edit_subCategory from './Pages/Subcategory/Edit_subCategory';

import Users from './Pages/user/users';
import User_details from './Pages/user/user_details';

import Review from './Pages/review/review';
import Create_review from './Pages/review/Create_Review';

import Order from './Pages/Orders/Order';
import Whishlist from './Pages/whishlist/whishlist';


import Cart from './Pages/Orders/Cart';
import Google_tag from './Pages/google_tag';
import Order_deatils from './Pages/Orders/Order_deatils';
import Bluk_import_theme from './Pages/theme/Bluk_import_theme';

import Blog from './Pages/Blog/blog';
import Create_blog from './Pages/Blog/Create_blog';
import Edit_blog from './Pages/Blog/Edit_blog';


import Contact from './Pages/contact/contact';





const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("allopstoken");
  return token ? element : <Navigate to="/" />;
};

const App = () => {
  const token = localStorage.getItem("allopstoken");


  return (
    <BrowserRouter basename='/admin'>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Categroy */}
        <Route path="/category" element={<PrivateRoute element={<Category />} />} />
        <Route path="/create_category" element={<PrivateRoute element={<Create_category />} />} />
        <Route path="/edit_category" element={<PrivateRoute element={<Edit_category />} />} />

        {/* Product */}
        <Route path="/themes" element={<Themes />} />
        <Route path="/create_theme" element={<Create_theme />} />
        <Route path="/edit_theme" element={<Edit_theme />} />


        {/* Product */}
        <Route path="/subcategory" element={<Subcategory />} />
        <Route path="/create_subcategory" element={<Create_subcategory />} />
        <Route path="/edit_subcategory" element={<Edit_subCategory />} />



        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user_details" element={<User_details />} />

        <Route path="/review" element={<Review />} />

        <Route path="/order" element={<Order />} />
        <Route path="/whishlist" element={<Whishlist />} />


        <Route path="/cart" element={<Cart />} />
        <Route path="/google_tag" element={<Google_tag />} />
        <Route path="/order_deatils" element={<Order_deatils />} />
        <Route path="/create_review" element={<Create_review />} />
        <Route path="/signupPage" element={<SignupPage />} />
        <Route path="/bluk_import_theme" element={<Bluk_import_theme />} />



        <Route path="/blog" element={<Blog />} />
        <Route path="/create_blog" element={<Create_blog />} />
        <Route path="/edit_blog" element={<Edit_blog />} />

        <Route path="/contact" element={<Contact />} />




      </Routes>
    </BrowserRouter>
  )
}

export default App;



// onClick={() =>
//   navigate("/create_review", {
//       state: {
//           order_id: orderId,  // Pass order_id
//           product_id: item.product.product_id  // Pass product_id
//       }
//   })

// }