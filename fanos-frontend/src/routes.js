import React, { lazy } from "react";
import { Redirect } from "react-router-dom";
import HomeLayout from "src/layouts/HomeLayout";
// eslint-disable-next-line no-unused-vars
import PaymentLayout from "src/views/pages/paymentAdsPost/index.js";
export const routes = [

  {
    exact: true,
    path: "/",
    // guard: true,
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Dashboard")),
  },

  {
    exact: true,
    path: "/search",
    // guard: true,
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/search")),
  },
  {
    exact: true,
    path: "/view-BestPriceProducts",
    // guard: true,
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/bestPriceProduct")),
  },
  {
    exact: true,
    path: "/view-product",
    // guard: true,
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/suggestProduct")),
  },
  {
    exact: true,
    path: "/view",
    // guard: true,
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/viewProduct")),
  },
  {
    exact: true,
    path: "/popular-product",
    // guard: true,
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/popularProduct")),
  },
  {
    exact: true,
    path: "/recent-product",
    // guard: true,
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/recentProduct")),
  },
  {
    exact: true,
    path: "/best-for-you-products",
    // guard: true,
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/bestForYouProduct")),
  },
  {
    exact: true,
    path: "/great-price-products",
    // guard: true,
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/greatPriceProduct")),
  },
  {
    exact: true,
    path: "/featured-products",
    // guard: true,
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/viewProduct")),
  },

  {
    exact: true,
    path: "/no-data-found",
    // guard: true,
    layout: HomeLayout,
    component: lazy(() => import("src/component/noDataFound")),
  },

  {
    exact: true,
    path: "/ads",
    // guard: true,
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/advertisment/myAds")),
  },
  {
    exact: true,
    path: "/terms-and-conditions",
    // guard: true,
    layout: HomeLayout,
    component: lazy(() => import("src/component/termsAndConditions")),
  },
  {
    exact: true,
    path: "/learn-to-sell",
    // guard: true,
    layout: HomeLayout,
    component: lazy(() => import("src/component/LearnToSell")),
  },
  
  {
    exact: true,
    path: "/about-us",
    // guard: true,
    layout: HomeLayout,
    component: lazy(() => import("src/component/aboutUs")),
  },

  {
    exact: true,
    path: "/faq",
    // guard: true,
    layout: HomeLayout,
    component: lazy(() => import("src/component/faq")),
  },
  {
    exact: true,
    path: "/Privacypolicy",
    // guard: true,
    layout: HomeLayout,
    component: lazy(() => import("src/component/Privacypolicy")),
  },
  {
    exact: true,
    path: "/Privacypolicy1",
    // guard: true,
    layout: HomeLayout,
    component: lazy(() => import("src/component/Privacypolicy1")),
  },
  {
    exact: true,
    path: "/edit-ads",
    // guard: true,
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/advertisment/editAds")),
  },

  {
    exact: true,
    path: "/wishlist",
    guard: true,
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/advertisment/wishlist")),
  },

  {
    exact: true,
    path: "/product",
    // guard: true,
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/product")),
  },
  {
    exact: true,
    path: "/create-ads",
    guard: true,
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/product/createAds")),
  },
  {
    exact: true,
    path: "/chat",
    // guard: true,
    // eslint-disable-next-line no-unused-vars
    // layout: ChatLayout,
    component: lazy(() => import("src/views/pages/chat/index")),
  },

  {
    exact: true,
    path: "/chat-history",
    // guard: true,
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/chat/chatHistory")),
  },
  {
    exact: true,
    path: "/sellers",
    // guard: true,
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/sellers")),
  },

  {
    exact: true,
    path: "/settings",
    guard: true,
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/setting")),
  },

  {
    exact: true,
    path: "/productCategory",
    // guard: true,
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/productCategory/index")),
  },
  {
    exact: true,
    path: "/payment-ads",
    guard: true,
    layout: PaymentLayout,
    component: lazy(() => import("src/views/pages/paymentAdsPost")),
  },

  {
    exact: true,
    path: "/payment",
    guard: true,
    // layout: PaymentLayout,
    component: lazy(() => import("src/views/pages/payment/index.js")),
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
