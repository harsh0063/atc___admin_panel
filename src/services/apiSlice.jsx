import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setToken, clearToken } from "./authtoken"; // Import Redux actions

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = getState()?.auth?.token;
      if (token && endpoint !== "loginUser" && endpoint !== "registerUser") {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    //regietr user
    registerUser: builder.mutation({
      query: (userData) => ({
        url: 'register/',
        method: 'POST',
        body: userData,
      }),
    }),

    // ✅ Login
    loginUser: builder.mutation({
      query: (formData) => ({
        url: "login/",
        method: "POST",
        body: formData,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.access) {
            dispatch(setToken(data.access)); // ✅ Store token in Redux
          }
        } catch (error) {
          console.error("Login Failed:", error);
        }
      },
    }),

    getProfile: builder.query({
      query: (is_all) => {
        // if is_all is true, add query param
        return is_all ? "profile/?is_all=true" : "profile/";
      },
      providesTags: ["Profile"], // ✅ Add tag for automatic refetch
    }),

    // ✅ Fetch Categories
    getCategories: builder.query({
      query: ({ size, page, search } = {}) => {
        const params = new URLSearchParams();

        if (size) params.append('page_size', size);
        if (page) params.append('page', page);
        if (search) params.append('search_query', search);

        return `view-categories/?${params.toString()}`;
      },
      providesTags: ['Category'],
    }),

    getCategories_fetch_all: builder.query({
      query: () => {

        return `view-categories/?fetch_all=true`;

      },
      providesTags: ["Category"],
    }),


    // ✅ Add Category
    addCategory: builder.mutation({
      query: (formData) => ({
        url: "add-category/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Category"], // ✅ Auto refetch categories
    }),

    // ✅ Edit Category
    editCategory: builder.mutation({
      query: ({ formData }) => {

        return {
          url: `update-category/`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Category"],
    }),


    // ✅ Delete Category
    deleteCategory: builder.mutation({
      query: (formdata) => ({
        url: `delete-category/`,
        method: "DELETE",
        body: formdata
      }),
      invalidatesTags: ["Category"],
    }),



    // add Subcategory
    addSubCategory: builder.mutation({
      query: (formData) => ({
        url: "add-subcategory/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["SubCategory"], // ✅ Auto refetch categories
    }),

    // getSub category
    getSubCategories: builder.query({
      query: ({ size, page, search } = {}) => {
        const params = new URLSearchParams();

        if (size) params.append('page_size', size);
        if (page) params.append('page', page);
        if (search) params.append('search', search);

        return `view-subcategories/?${params.toString()}`;
      },
      providesTags: ['SubCategory'],

    }),

    editSubCategory: builder.mutation({
      query: ({ formData }) => ({
        url: `update-subcategory/`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["SubCategory"],
    }),

    deleteSubCategory: builder.mutation({
      query: (formData) => ({
        url: `delete-subcategory/`,
        method: "DELETE",
        body: formData,
      }),
      invalidatesTags: ["SubCategory"],
    }),

    getSubCategories_fetchall: builder.query({
      query: (key) => {
        if (key) {
          return `view-subcategories/?fetch_all=true&category_id=${key}`; // ✅ fixed
        }
        return `view-subcategories/?fetch_all=true`;
      },
      providesTags: ['SubCategory'],
    }),


    addProduct: builder.mutation({
      query: (formData) => ({
        url: "add-product/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"], // ✅ Auto refetch categories
    }),

    getProduct: builder.query({
      query: (productId) => productId
        ? `view-products/?product_id=${productId}` // If productId is passed, use it as a query parameter
        : "view-products/", // Otherwise, get all products
      providesTags: ["Product"],
    }),

    editProduct: builder.mutation({
      query: ({ formData }) => ({
        url: `update-product/`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation({
      query: (formData) => ({
        url: `delete-product/`,
        method: "DELETE",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),





    getProductMedia: builder.query({
      query: (keyword) => {
        if (keyword) {
          return `view-product-media/?product_id=${encodeURIComponent(keyword)}`;
        }
        return 'view-product-media/';
      },
      providesTags: ["media"], // ✅ Add tag for automatic refetch
    }),

    editProduct_Media: builder.mutation({
      query: ({ formData }) => {

        return {
          url: `update-product-media/`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["media"],
    }),
    deleteProductMedia: builder.mutation({
      query: (formdata) => ({
        url: `delete-product-media/`,
        method: "DELETE",
        body: formdata
      }),
      invalidatesTags: ["media"],
    }),



    getOrder: builder.query({
      query: (keyword) => {
        if (keyword) {
          return `view-order/?order_id=${encodeURIComponent(keyword)}`;
        }
        return 'view-order/';
      },
      providesTags: ["Order"], // ✅ Add tag for automatic refetch
    }),
    getOrder_all: builder.query({

      query: ({ size, page } = {}) => {
        const params = new URLSearchParams();

        if (size) params.append('page_size', size);
        if (page) params.append('page', page);

        return `view-order/?${params.toString()}`;
      },
      providesTags: ['Order'],
    }),

    addBulkProduct: builder.mutation({
      query: (formData) => ({
        url: "add-fabric/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Febric"],
    }),

    getAddress: builder.query({
      query: (keyword) => {
        if (keyword) {
          return `view-addresses/?address_id=${keyword}`;
        }
        return 'view-addresses/';
      },
      providesTags: ["address"], // ✅ Add tag for automatic refetch
    }),



    addRating: builder.mutation({
      query: ({ formData }) => ({
        url: 'add-rating/',
        method: 'POST',
        body: formData,

      }),
      invalidatesTags: ['Rating'],
    }),





    getReview: builder.query({
      query: () => "view-ratings/",
      providesTags: ["Review"],
    }),

    addCart: builder.mutation({
      query: (formData) => ({
        url: "add-cart/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Cart"],
    }),

    getCart: builder.query({
      query: ({ size, page, search } = {}) => {
        const params = new URLSearchParams();

        if (size) params.append('page_size', size);
        if (page) params.append('page', page);
        if (search) params.append('search_query', search);

        return `view-cart/?${params.toString()}`;
      },
      providesTags: ['Cart'],

    }),









    addWishlist: builder.mutation({
      query: (formData) => ({
        url: 'add-wishlist/', // adjust as needed
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ["Wishlist", 'Product'],
    }),

    getWishlist: builder.query({
      query: ({ size, page, search } = {}) => {
        const params = new URLSearchParams();

        if (size) params.append('page_size', size);
        if (page) params.append('page', page);
        if (search) params.append('search_query', search);

        return `view-wishlist/?${params.toString()}`;
      },
      providesTags: ['Wishlist'],

    }),

    getPricing: builder.query({
      query: () => `view-pricing/`,
      providesTags: ["Pricing"],
    }),



    deletePricing: builder.mutation({
      query: (formdata) => ({
        url: "delete-pricing/",
        method: "DELETE",
        body: formdata
      }),
      invalidatesTags: ["Pricing"],
    }),


    getThemes: builder.query({
      query: ({ size, page, search, theme_id } = {}) => {
        const params = new URLSearchParams();

        if (size) params.append('page_size', size);
        if (page) params.append('page', page);
        if (search) params.append('search', search);
        if (theme_id) params.append('theme_id', theme_id);

        return `view-themes/?${params.toString()}`;
      },
      providesTags: ['Themes'],

    }),


    addThemes: builder.mutation({
      query: (formData) => ({
        url: 'add-theme/', // adjust as needed
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ["Themes"],
    }),


    editThemes: builder.mutation({
      query: (formData) => {

        return {
          url: "update-theme/",
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Themes"],
    }),



    deleteThemes: builder.mutation({
      query: (formdata) => ({
        url: "delete-theme/",
        method: "DELETE",
        body: formdata
      }),
      invalidatesTags: ["Themes"],
    }),


    deleteMedia: builder.mutation({
      query: (formdata) => ({
        url: "delete-media/",
        method: "DELETE",
        body: formdata
      }),
      invalidatesTags: ["Themes"],
    }),

    addTracking_script: builder.mutation({
      query: (formData) => ({
        url: 'add-tracking-script/', // adjust as needed
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ["tracking_script"],
    }),


    getTracking_script: builder.query({
      query: () => `view-tracking-scripts/`,
      providesTags: ["tracking_script"],
    }),

    editBlog: builder.mutation({
      query: (formData) => {

        return {
          url: "update-blog/",
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Blog"],
    }),


    addMultipleTheme: builder.mutation({
      query: (formData) => ({
        url: 'upload-themes/', // adjust as needed
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ["Themes"],
    }),

    getBlog: builder.query({
      query: ({ size, page, search } = {}) => {
        const params = new URLSearchParams();

        if (size) params.append('page_size', size);
        if (page) params.append('page', page);
        if (search) params.append('search_query', search);

        return `view-blog/?${params.toString()}`;
      },
      providesTags: ['Blog'],

    }),


    addBlog: builder.mutation({
      query: (formData) => ({
        url: 'add-blog/', // adjust as needed
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ["Blog"],
    }),

    
    deleteBlog: builder.mutation({
      query: (formdata) => ({
        url: "delete-blog/",
        method: "DELETE",
        body: formdata
      }),
      invalidatesTags: ["Blog"],
    }),



  }),
});


// Export hooks for components
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetProfileQuery,


  useGetCategoriesQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,

  useAddSubCategoryMutation,
  useGetSubCategoriesQuery,
  useEditSubCategoryMutation,
  useDeleteSubCategoryMutation,

  useGetProductQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useEditProductMutation,

  useEditProduct_MediaMutation,
  useDeleteProductMediaMutation,
  useGetProductMediaQuery,


  useGetOrderQuery,
  useGetOrder_allQuery,
  useAddBulkProductMutation,
  useGetAddressQuery,

  useAddRatingMutation,
  useGetReviewQuery,



  useAddCartMutation,
  useGetCartQuery,
  useGetCategories_fetch_allQuery,




  useAddWishlistMutation,
  useGetWishlistQuery,


  useGetPricingQuery,
  useDeletePricingMutation,

  useGetThemesQuery,
  useAddThemesMutation,
  useEditThemesMutation,
  useDeleteThemesMutation,
  useDeleteMediaMutation,
  
  useAddTracking_scriptMutation,
  useGetTracking_scriptQuery,
  useGetSubCategories_fetchallQuery,
  
  useAddMultipleThemeMutation,
  
  useGetBlogQuery,
  useAddBlogMutation,
  useEditBlogMutation,
  useDeleteBlogMutation,




} = apiSlice;
