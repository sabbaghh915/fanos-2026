
//export const url = "https://node.fanos.one/api/v1";
export const url = "http://localhost:3032/api/v1";
const user = `${url}/user`;
const static1 = `${url}/static`;
const admin = `${url}/admin`;
const notification = `${url}/notification`;
const contactUsForm = `${url}/contactUs`;

const ApiConfig = {
  userLogin: `${admin}/login`,
  sendNotificationtoUser : `${admin}/sendNotificationToUser`,
  sendNotificationtoAll : `${admin}/sendNotificationToAllUser`,
  deleteRoleData: `${admin}/deleteRoleData`,
  viewAdminProfile: `${admin}/viewAdminProfile`,
  listUser: `${admin}/listUser`,
  blockUnblock: `${admin}/blockUnblockUser`,
  deleteUser: `${admin}/deleteUser`,
  deleteAllUsers: `${admin}/deleteAllUsers`,
  userDetails: `${admin}/viewUserProfile`,
  dashboardData: `${admin}/dashboard`,
  userSignUp: `${user}/signup`,
  verifyOTP: `${admin}/verifyOTP`,
  resendOTP: `${user}/resendOTP`,
  forgotPassword: `${admin}/forgotPassword`, ///verify-sms-code-mobile-app
  verifyOTPSMS: `${user}/verify-sms-code-mobile-app`, //verify-sms-code-mobile-app
  resetPassword: `${admin}/resetPassword`,
  listBanner: ` ${url}/banner/get-all-banners-for-admin`,
  viewBanner: ` ${url}/banner/getBanner`,


    ///ADVERTISEMENT LIST  

  advertisementList:`${url}/advertisement/get-all-advertisement-for-admin`,
  addAdvertisement: `${url}/advertisement/addadvertisement`,
  viewAdvertisement:`${url}/viewAdvertisement`,
  updateAdvertisement:`${url}/advertisement/updateAdvertisementData`,
  blockUnblockAdvertisement:`${url}/advertisement/blockAndUnblockAdvertisementStatus`, 
  deleteAdvertisement:`${url}/advertisement/deleteAdvertisement`, 


  //Coupon Section: `${url}`
  getcouponlist :`${url}/superviser/getAllCouponList`,  ///// GET
  generatecoupon :`${url}/superviser/createCoupon`,   ////////    POST
  deletecoupon : `${url}/superviser/deleteCoupon`,       //////////  DELETE
  deleteAllCoupons : `${url}/superviser/deleteAllCoupons`,
  blockUnblockcoupon : `${url}/superviser/blockAndUnblockCoupon`,     /////////   PUT
  couponDetails : `${url}/superviser/getSingleCouponData`,           /////// GET


  //Chart Data
  getItemAddedChart:`${url}/charts/itemsAdded`,     ///////GET
  getUserLogChart:`${url}/charts/userLog`,       //////GET


  // account
  uploadFile: `${user}/uploadImage`,
  editUserProfile: `${admin}/updateProfile`,


  //Help and Support 

  getHelp :`${url}/feedback/getFeedback`,
  getSingleFeedback:`${url}//feedback/getSingleFeedback`,

  
  // static
  contactUS: `${contactUsForm}/contactUs`,
  addFeedback: `${contactUsForm}/addFeedback`,
  StaticData: `${static1}/static`,
  subscribeToNewsLetter: `${user}/subscribeToNewsLetter`,

  // notification
  getNotification: `${notification}/get-notification-data`,
  readNotification: `${notification}/read-notification`,
  clearAllNotifications: `${admin}/clearAllNotifications`,

  // <<<<<<< HEAD
  clearNotification: `${notification}/clear-notification`,
  sendNotificationForP2pExchange: `${notification}/send-notification-for-p2p-exchange`,
  viewNotification:`${notification}/getSingleNotification`,
  changepassword: `${admin}/changePassword`,

  // verification-otp



  // productmanagement
  ProductList: `${url}/product/listProduct`,
  deleteProduct: `${admin}/deleteProduct`,
  deleteProducts: `${admin}/deleteProducts`,
  productDetails: `${url}/product/viewProduct`,
  productApproveReject: `${admin}/updateProductApproveStatus`,
  

  listNotificationAll: `${url}/notification/getNotificationListbyAdmin`,
  readNotification: `${notification}/readNotification`,
  deleteNotificationList: `${notification}/notification`,

  //Payment method
  paymentDetails: `${admin}/getPaymentDeatilsDatabyAdmin`,
  paymentAddedAds: `${admin}/getPaymentDeatilsOfProductPurchaseAndAddProduct`,
  viewAddedPayment: `${admin}/getPaymentDatabyUserId`, 


  // Website Management
  maintainanceMode : `${admin}/websiteMaintainance`,
  getMaintainanceStatus:`${user}/getMaintainanceStatus`,
  reportUserList:`${admin}/getReportList`,
  reportUserList:`${admin}/getReportList`,
  reportUserListById:`${admin}/getReportListByUserId`,

  // Static Content API 
  staticContentList: `${static1}/staticContentList`,
  editStaticContent:`${url}/static/editStaticContent`,
  viewStaticContent: `${static1}/viewStaticContent`,
  subscribeNewsLetter: `${user}/subscribeToNewsLetter`,

  // Category
  categoryList: `${url}/category/listCategory`,
  deleteCategory: `${url}/category/deleteCategory`,
  updateCategory: `${url}/category/updateCategory`,
  addCategory: `${url}/category/createCategory`,
  viewCategory: `${url}/category/viewCategory`,

  
  //Sub Category
  subCategoryList: `${url}/category/listSubCategory`,
  subCategoryDetails: `${url}/category/viewSubCategory`,
  deleteSubCategory: `${url}/category/deleteSubCategory`,
  updateSubCategory:`${url}/category/updateSubCategory`,
  addSubCategory: `${url}/category/createSubCategory`,


  //add Banner
  addBanner: `${url}/banner/addBanner`,
  blockUnblockBanner: `${url}/banner/blockAndUnblockBanner`,
  deleteBanner:`${url}/banner/deleteBanner`,
};



export default ApiConfig;
