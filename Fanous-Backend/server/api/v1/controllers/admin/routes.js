import Express from "express";
import controller from "./controller.js";
import auth from "../../../../helper/auth.js";
import upload from "../../../../helper/uploadHandler.js";

export default Express.Router()

.get("/deleteColelctionofCoupon", controller.deleteColelctionofCoupon)


  .put("/forgotPassword", controller.forgotPassword)
  .put("/resendOtp", controller.resendOtp)
  .post("/login", controller.login)
  .post("/verifyOTP", controller.verifyOTP)

  .use(auth.verifyToken)
  .use(auth.isAdmin)
  .put("/updateEmail", controller.updateEmail)
  .post("/resetPassword", controller.resetPassword)
  .post("/changePassword", controller.changePassword)
  .get("/listUser", controller.listUser)
  .get("/viewUserProfile", controller.viewUserProfile)
  .get("/viewAdminProfile", controller.viewAdminProfile)
  .get("/viewUserlist", controller.viewUserlist)
  .put("/blockUnblockUser", controller.blockUnblockUser)
  .delete("/deleteUser", controller.deleteUser)
  .delete("/deleteAllUsers", controller.deleteAllUsers)

  .get("/dashboard", controller.dashboard)
  .get("/getPaymentDeatilsDatabyAdmin", controller.getPaymentDeatilsDatabyAdmin)
  .get("/getPaymentDatabyUserId", controller.getPaymentDatabyUserId)
  .post("/updateProductApproveStatus", controller.updateProductApproveStatus)

  .delete("/deleteProduct", controller.deleteProduct)
  .delete("/deleteProducts", controller.deleteProducts)
  .post("/getReportList", controller.getReportList)
  .get("/getReportListByUserId", controller.getReportListByUserId)

  .put("/websiteMaintainance", controller.websiteMaintainance)
  .post("/sendNotificationToUser", controller.sendNotificationToUser)
  .post("/sendNotificationToAllUser", controller.sendNotificationToAllUser)
  .get(
    "/getPaymentDeatilsOfProductPurchaseAndAddProduct",
    controller.getPaymentDeatilsOfProductPurchaseAndAddProduct
  );
