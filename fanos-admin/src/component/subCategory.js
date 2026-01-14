import { Typography, Box, Grid } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  mainBox: {
    paddingTop: "30px",
  },
  heading: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "28px",
    lineHeight: "16px",
    color: "#000000",
    paddingBottom: "30px",
  },
  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "7.50088px 7.50088px 0px 0px",
  },
  productDiv: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  productName: {
    color: "#0C576C",
    fontFamily: "Poppins",
    fontSize: "16px",
    fontWeight: "600 !important",
  },

  productAdd: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "12.0014px",
    lineHeight: " 18px",
    /* identical to box height */

    color: "#0C576C",
    margin: "0",
    marginTop: "7px",
  },
  bannerImage: {
    height: "348px",
  },
  buyTicket: {
    background: "transparent",
    border: "1px solid #853600",
    borderRadius: "5px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "18px",
    lineHeight: "49px",
    color: "#843300",
  },
  mainHeading: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "64px",
    lineHeight: "68px",
    color: "#76452C",
    paddingTop: "36px",
  },
  advertisement: {
    background: "#BF9C76",
    height: "152px",
  },
  boxCard: {
    // boxShadow: "0px 2px 1px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    height: "100%",
    maxHeight: "400px",
    borderRadius: " 7.794px",
    background: "#FFF",
    boxShadow:
      "0px 0px 1.15416px 0px rgba(9, 30, 66, 0.30), 0px 11.54162px 20.77491px 0px rgba(9, 30, 66, 0.15)",
  },
  flexBox: {
    display: "flex",
  },
  subText: {
    fontSize: "16px",
    color: "#000",
    paddingLeft: "15px",
    fontWeight: "400",
  },
  viewMoreBox: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0",
    "& .viewMore": {
      color: "#fff",

      border: "none",
      height: "42px",
      fontSize: "14px",
      background: "#D39B2D",
      fontStyle: "normal",
      fontFamily: "Poppins",
      fontWeight: "500",
      lineHeight: "14px",
      borderRadius: "5px",
    },
  },
  topText: {
    color: "#000",
  },
  gridItem:{

    [theme.breakpoints.up('lg')]: {
      maxWidth: '19.666667%',
      flexBasis: '19.666667%',
      flexGrow:'1',
    }
  },
  imageContainer: {
    width: "100%",
    height: "270px",
    overflow: "hidden",
  },
  productLocationDate: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "12px",
  },
  bottomFlex: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  productAndLocation: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginTop: "10px",
    width: "100%",
    maxWidth: "155px",

    "& p": {
      margin: "0",
    },
  },
  productAdd: {
    fontFamily: "Poppins",
    color: "#707070",
    fontSize: "12px",
    fontWeight: "400",
  },
  priceContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    // gap:'10px',

    "& p": {
      margin: "0",
    },
  },
  priceText: {
    color: "#707070",
    fontSize: "12px",
    fontWeight: " 400 !important",
    opacity: "0.5",
  },
  productPrice: {
    color: "#D39B2D",
    fontSize: " 24px",
    fontWeight: "600 !important",
    wordBreak:'keep-all',
  },
}));
export default function ({ listProduct, getListProduct, productSearchSort }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box className={classes.mainBox}>
      <Grid container spacing={3}>
        {productSearchSort &&
          productSearchSort.map((data) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={2} className={classes.gridItem}>
                  <Box
                    className={classes.boxCard}
                    onClick={() =>
                      history.push({
                        pathname: "/product",
                        search: `?productId=${data._id}`,
                        state: { id: data._id, userId: data.userId },
                      })
                    }
                  >
                    <div className={classes.imageContainer}>
                      <img
                        alt="img"
                        className={classes.productImage}
                        src={data.productImage[0]}
                      />
                    </div>

                    <Box className={classes.productLocationDate}>
                      <Box className={classes.productNameContainer}>
                        <span className={classes.productName}>
                          {data.productName.length <= 8
                            ? data.productName
                            : data.productName.slice(0, 30) }
                        </span>
                      </Box>

                      <Box className={classes.bottomFlex}>
                        <Box className={classes.productAndLocation}>
                          <p className={classes.productAdd}>
                            {data.location ? data.location.split(',')[0].slice(0,20) : "--"}<br/>
                            {data.location ? data.location.split(',')[1] : "--"}
                          </p>

                          <p className={classes.productAdd}>
                            {moment(data.updatedAt).format("DD MMM YYYY")}
                          </p>
                        </Box>

                        <Box className={classes.priceContainer}>
                          <p className={classes.priceText}>Price</p>
                          <p
                            style={{ color: "#D39B2D" }}
                            className={classes.productPrice}
                          >
                            {data.price} {data.currency ? data.currency : "--"}
                          </p>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              // <Grid item xs={12} sm={6} md={4} lg={3}>
              //   <Box
              //     className={classes.boxCard}
              //     onClick={() =>
              //       history.push({
              //         pathname: "/product",
              //         state: { id: data._id, userId: data.userId },
              //       })
              //     }
              //   >
              //     <img
              //       alt="img"
              //       className={classes.productImage}
              //       src={
              //         data?.productImage
              //           ? data?.productImage.length > 0
              //             ? data?.productImage[0]
              //             : "/images/noproduct.svg"
              //           : "/images/noproduct.svg"
              //       }
              //     />
              //     <Box className={classes.productDiv}>
              //       <p className={classes.productName}>
              //         {data.productName.length <= 8
              //           ? data.productName
              //           : data.productName.slice(0, 8) + ".."}
              //       </p>
              //       <p className={classes.productAdd}>
              //         {moment(data.updatedAt).format("LL")}
              //       </p>
              //     </Box>
              //     <Box
              //       style={{ paddingTop: "3px" }}
              //       className={classes.productDiv}
              //     >
              //       <p className={classes.productAdd}>
              //         {data.location ? data.location : "--"}
              //       </p>

              //       <p
              //         style={{ color: "#D39B2D" }}
              //         className={classes.productName}
              //       >
              //         {data.price}$
              //       </p>
              //     </Box>
              //   </Box>
              // </Grid>
            );
          })}
      </Grid>
      {productSearchSort && productSearchSort.length === 0 && (
        <Box align="center" pt={2}>
          <img src="images/noproduct.svg" alt="NO DATA FOUND" />
          <Typography className={classes.topText}>
            Product not found!
          </Typography>
        </Box>
      )}
    </Box>
  );
}
