import { Box } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import PaymentBill from "src/component/payment.js";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  contentDiv: {
    height: "197px",
    boxShadow: "0px 4.02545px 6.03817px -1.00636px rgba(231, 64, 0, 0.1)",
    borderRadius: "7.88px",
    marginTop: "13px",
  },
  imgDiv: {
    width: "100%",
    maxWidth: "197px",
    maxHeight: "177px",
    height: "100%",
    borderRadius: "7.88px",
    padding: "0 !important",
    "& .itemImage": {
      width: "100%",
      maxWidth: "197px",
      maxHeight: "177px",
      height: "100%",
    },
  },
  heading: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "25.216px",
    lineHeight: "38px",
    color: "#8B5CF6",
  },
  price: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "28.368px",
    lineHeight: "43px",
    color: "#FF6B35",
  },
  description: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "24px",
    color: "#000000",
  },
  footerDiv: {
    display: "flex",
    justifyContent: "space-between",
  },
  content: {},
  specific: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "0.88px",
    textTransform: "uppercase",
    color: "#002F34",
  },
  location: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "15.76px",
    lineHeight: "24px",
    color: "#6D28D9",
  },
  buyButton: {
    background: "#FF6B35",
    width: "135px",
  },
  soldButton: {
    border: "1px solid #FF6B35",
    color: "#000",
    width: "135px",
  },
  buttonContainer: {
    justifyContent: "space-evenly",
  },
}));
const Payment = function () {
  const classes = useStyles();

  return (
    <Page title={"Payment"}>
      <Box className={classes.bannerbox}>
        <PaymentBill />
      </Box>
    </Page>
  );
};

export default Payment;
