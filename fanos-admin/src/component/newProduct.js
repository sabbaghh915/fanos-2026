import { Typography, Box, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import ApiConfig from "src/config/APICongig";
import Axios from "axios";
import moment from "moment";
import Carousel from "react-material-ui-carousel";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  mainBox: {
    paddingTop: "20px",
  },
  flexBox: {
    display: "flex",
    gap: "10px",
    paddingBottom: "22px",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    color: "#242424",
    fontSize: "24px",
    fontWeight: " 500",

    [theme.breakpoints.up("xs")]: {
      fontSize: "18px",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "28px",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "28px",
    },
  },
  productImage: {
    width: "100%",
    height: "249px",
    borderRadius: "7.50088px 7.50088px 0px 0px",
  },
  productDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "12px",
  },
  productName: {
    color: "#0C576C",
    fontSize: "16px",
    fontWeight:" 600 !important",
    margin: "0",
    wordBreak:'break-word',
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
    //height:"200px",
  },
  boxCard: {
    cursor: "pointer",
    height: "100%",
    maxHeight: "400px",
    borderRadius: "7.794px",
    background: "#FFF",
    boxShadow:
      "0px 0px 1.15416px 0px rgba(9, 30, 66, 0.30), 0px 11.54162px 20.77491px 0px rgba(9, 30, 66, 0.15)",
  },
  subText: {
    color: "#0C576C",
    fontSize: "16px",
    fontWeight: "500 !important",

    cursor: "pointer",
    [theme.breakpoints.down("xs")]: {
      fontSize: "14px",
    },
  },
  boxDiv: {
    padding: "10px",
  },
  carousel: {
    position: "sticky !important",
    paddingTop: "15px",
    overflow: "hidden",
    "& .css-1l7c0cy": {
      background: "#FEE4C1",
      height: "280px",
    },
  },
  bottomSpacing: {
    paddingBottom: "20px",
  },

  bottomFlex: {
    display: "flex",
    justifyContent: "space-between",
  },
  
  secondFlex: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },

  productAndLocation:{
    display:'flex',
    flexDirection:'column',
    gap:'20px',
  },

  priceText: {
    color: "#707070",
    fontFamily: "Poppins",
    fontSize: "12px",
    fonWeight: "400 !important",
  },

  gridItem:{
    [theme.breakpoints.up('lg')]: {
      maxWidth:'unset',
      flexGrow:'1',
    }
  },
 
    price: {
      margin: "0",
      color: "#D39B2D",
      fontSize: "24px",
      fontWeight: "600 !important",
      wordBreak:'keep-all',
    },

    locationAndDateContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      marginTop: "9px",
      width:'100%',
      maxWidth:'155px',
  
      "& p": {
        margin: "0",
      },
    },

  
}));
export default function (props) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const history = useHistory();
  const [dataAds, setDataAds] = useState([]);

  const getRecentProduct = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.getRecentProduct,
      });

      if (res.data.responseCode === 200) {
        setData(res?.data?.result?.docs);
      }
    } catch (error) {}
  };

  const getAllAdvertisement = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.getAllAdvertisement,
      });

      if (res.data.responseCode === 200) {
        setDataAds(res.data.result);
      }
    } catch (error) {}
  };

  function Item(props) {
    return (
      <img
        src={
          props.item.img == "undefined" ? "/images/logo.svg" : props.item.img
        }
        alt="DashImage"
        style={{
          width: "100%",
          height: "280px",
          objectFit: "contain",
        }}
      />
    );
  }
  const sliceData = data?.length >= 5 ? data.slice(0, 5) : data;

  useEffect(() => {
    getRecentProduct();
    getAllAdvertisement();
  }, []);
  return (
    <Box className={classes.mainBox}>
      <Box className={classes.flexBox}>
        <Typography className={classes.heading}>New Products</Typography>
        <Box>
          <Typography
            className={classes.subText}
            onClick={() => history.push("/recent-product")}
          >
            View more <span style={{ color: "#D39B2D" }}>{">"}</span>
          </Typography>
        </Box>
      </Box>
      <Grid container spacing={3} className={classes.bottomSpacing}>
        {sliceData.length === 0 ? (
          <>
            <Grid container align="center" style={{ flexDirection: "column" }}>
              <img src="images/noproduct.svg" alt="NO DATA FOUND" />
              <Typography style={{ color: "#000", fontSize: "16px" }}>
                No Products Found
              </Typography>
            </Grid>
          </>
        ) : (
          <>
            {sliceData?.map((values) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={2} className={classes.gridItem}>
                  <Box
                    className={classes.boxCard}
                    onClick={() =>
                      history.push({
                        pathname: "/product",
                        state: { id: values._id, userId: values.userId },
                      })
                    }
                  >
                    <div className={classes.imageContainer}>
                      <img
                        alt="img"
                        className={classes.productImage}
                        src={values.productImage[0]}
                      />
                    </div>

                    <Box className={classes.productDiv}>
                      <Box className={classes.productNameContainer}>
                        <p className={classes.productName}>
                          {values.productName.length <= 8
                            ? values.productName
                            : values.productName.slice(0, 25)}
                        </p>
                      </Box>

                      <Box className={classes.bottomFlex}>
                        <Box className={classes.locationAndDateContainer}>
                          <p className={classes.productAdd}>
                            {values.location ? values.location : "--"}
                          </p>
                          <p className={classes.productAdd}>
                            {moment(values.updatedAt).format("DD MMM YYYY")}
                          </p>
                        </Box>

                        <Box
                        
                          className={classes.priceContainer}
                        >
                          <p className={classes.priceText}>Price</p>
                          <p
                        
                            className={classes.price}
                          >
                            {values.price}{values.currency}
                          </p>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </>
        )}
      </Grid>
      <Carousel
        className={classes.carousel}
        animation="slide"
        indicatorIconButtonProps={{
          style: {
            color: "#000",
          },
        }}
        activeIndicatorIconButtonProps={{
          style: {
            color: "#2FF3FF",
          },
        }}
        indicatorContainerProps={{
          style: {
            marginTop: "0px",
            textAlign: "center",
          },
        }}
      >
        {dataAds && dataAds.map((item, i) => <Item key={i} item={item} />)}
      </Carousel>
    </Box>
  );
}
