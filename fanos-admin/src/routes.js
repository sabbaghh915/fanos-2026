import React, { lazy } from "react";
import { Redirect } from "react-router-dom";
import DashboardLayout from "src/layouts/DashboardLayout";
import HomeLayout from "src/layouts/HomeLayout";
import LoginLayout from "src/layouts/LoginLayout";

export const routes = [
  {
    exact: true,
    path: "/",
    layout: LoginLayout,
    component: lazy(() => import("src/views/auth/LogIn")),
  },

  {
    exact: true,
    path: "/dashboard",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Dashboard")),
  },
  {
    exact: true,
    path: "/generate-coupon",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/CouponManagement/GenerateCoupon")),
  },
  {
    exact: true,
    path: "/view-notification",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/notifications/ViewNotification")),

  },
  {
    exact: true,
    path: "/help-and-support",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/SupportManagement/HelpAndSupport")),
  },
  {
    exact: true,
    path: "/view-user-support",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/SupportManagement/ViewuserSupport")),
  },
  {
    exact: true,
    path: "/editSubCategory",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/category/editSubCategory")),
  },
  {
    exact: true,
    path: "/my-profile",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/profile")),
  },

  {
    exact: true,
    path: "/edit-profile",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/profile/editProfile")),
  },

  {
    exact: true,
    path: "/verify-otp",

    layout: LoginLayout,
    component: lazy(() =>
      import("src/views/auth/forget-password-link/OtpVerify")
    ),
  },

  {
    exact: true,
    path: "/reset-password",
    layout: LoginLayout,
    component: lazy(() => import("src/views/auth/reset-password/index")),
  },
  {
    exact:true,
    path:"/view-Added-Ads",
    layout:DashboardLayout,
    component:lazy(() => import("src/views/pages/PaymentManagemnent/viewAddedAds")),
  },
  {
    exact:true,
    path:"/view-purchased-Ads",
    layout:DashboardLayout,
    component:lazy(() => import("src/views/pages/PaymentManagemnent/viewProductPurchasedAds")),
  },

  {
    exact: true,
    path: "/changePassword",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Change Password/Index")),
  },
  {
    exact: true,
    path: "/forget-password",

    layout: LoginLayout,
    component: lazy(() => import("src/views/auth/forget-password/index")),
  },
  {
    exact: true,
    path: "/user-management",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/userManagement")),
  },
  {
    exact: true,
    path: "/static-content-management",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/staticContent")),
  },
  {
    exact: true,
    path: "/edit-static-content",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/staticContent/editStaticContent")),
  },
  {
    exact: true,
    path: "/edit-category",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/category/editCategory")),
  },
  {
    exact: true,
    path: "/view-static-content",
    // guard: true,
    // new one
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/staticContent/viewStaticContent")),
  },
  {
    exact: true,
    path: "/banner-management",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/bannerManagement")),
  },
  {
    exact: true,
    path: "/logo-settings",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/siteSettings/logoSettings")),
  },
  {
    exact: true,
    path: "/view-banner",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/bannerManagement/viewBanner")),
  },
  {
    exact: true,
    path: "/coupon",
    layout: DashboardLayout,
    component: lazy(() => import("./views/pages/CouponManagement/viewcoupon")),
  },
  {
    exact: true,
    path: "/add-banner",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/bannerManagement/addNewBanner")),
  },

  {
    exact: true,
    path: "/Coupon-Management",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/CouponManagement/index")),

  },
  {
    exact: true,
    path: "/advertisement-management",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/advertisementManagement/index")),
  },
  {
    exact: true,
    path: "/add-advertisement-management",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/advertisementManagement/Addadvertisement")),
  },
  {
    exact: true,
    path: "/edit-advertisement",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/advertisementManagement/editAdvertisement")),
  },
  {
    exact: true,
    path: "/advertisement-management-type1",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/advertisementManagement/AdvertisementManagement1")),
  },
  {
    exact: true,
    path: "/add-advertisement-management-type1",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/advertisementManagement/AddAdvertisementType1")),
  },
  {
    exact: true,
    path: "/edit-advertisement-type1",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/advertisementManagement/EditAdvertisementType1")),
  },
  {
    exact: true,
    path: "/advertisement-management-type2",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/advertisementManagement/AdvertisementManagement2")),
  },
  {
    exact: true,
    path: "/add-advertisement-management-type2",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/advertisementManagement/AddAdvertisementType2")),
  },
  {
    exact: true,
    path: "/edit-advertisement-type2",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/advertisementManagement/EditAdvertisementType2")),
  },
 
  {
    exact: true,
    path: "/website-settings",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/websiteManagement/index")),
  },
  {
    exact: true,
    path: "/product-management",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/products/index")),
  },
  {
    exact: true,
    path: "/view-product-details",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/products/ViewProductDetails")),
  },
  {
    exact: true,
    path: "/notifications",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/notifications/index")),
  },
  {
    exact: true,
    path: "/category-management",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/category/categoryManagement")),
  },
  {
    exact: true,
    path: "/view-category-details",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/category/viewCategoryDetails")),
  },
  {
    exact: true,
    path: "/sub-category-management",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/category/subCategoryManagement")),
  },
  {
    exact: true,
    path: "/add-category",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/category/addCategory")),
  },
  {
    exact: true,
    path: "/add-sub-category",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/category/addSubCategory")),
  },
  {
    exact: true,
    path: "/view-sub-category-details",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/category/viewSubCategoryDetails")),
  },
  {
    exact: true,
    path: "/view-user-details",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/userManagement/viewUserDetails")),
  },
  {
    exact:true,
    path:"/added-ads",
    layout: DashboardLayout,
    component:lazy(() => import("src/views/pages/PaymentManagemnent/addedAds")),
  },
  {
    exact:true,
    path:"/payment-management",
    layout: DashboardLayout,
    component:lazy(() => import("src/views/pages/PaymentManagemnent/index")),
  },
  {
    exact:true,
    path:"/payment-product-purchased",
    layout: DashboardLayout,
    component:lazy(() => import("src/views/pages/PaymentManagemnent/productPurchased")),
  },
  {
    exact:true,
    path:"/view-payment-user-details",
    layout:DashboardLayout,
    component:lazy(() => import("src/views/pages/PaymentManagemnent/viewPaymentUserdetails")),
  },
  {
    exact:true,
    path:"/report-user",
    layout:DashboardLayout,
    component:lazy(() => import("src/views/pages/reportUserManagement")),
  },
  {
    exact:true,
    path:"/reported-user-details",
    layout:DashboardLayout,
    component:lazy(() => import("src/views/pages/reportUserManagement/viewReport")),
  },
  {
    exact: true,
    path: "/404",
    component: lazy(() => import("src/views/errors/NotFound")),
  },
  {
    component: () => <Redirect to="/404" />,
  },
];
