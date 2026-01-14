import { Typography, Box, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ApiConfig from "src/config/APIConfig";
import Axios from "axios";
import moment from "moment";
import { useHistory } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
const useStyles = makeStyles((theme) => ({
  "@keyframes glow": {
    "0%": {
      boxShadow: "0px 0px 5px rgba(139, 92, 246, 0.5), 0px 0px 1.15416px 0px rgba(9, 30, 66, 0.30), 0px 11.54162px 20.77491px 0px rgba(9, 30, 66, 0.15)",
      border: "1px solid rgba(139, 92, 246, 0.3)",
    },
    "50%": {
      boxShadow: "0px 0px 20px rgba(139, 92, 246, 0.8), 0px 0px 1.15416px 0px rgba(9, 30, 66, 0.30), 0px 11.54162px 20.77491px 0px rgba(9, 30, 66, 0.15)",
      border: "1px solid rgba(139, 92, 246, 0.6)",
    },
    "100%": {
      boxShadow: "0px 0px 5px rgba(139, 92, 246, 0.5), 0px 0px 1.15416px 0px rgba(9, 30, 66, 0.30), 0px 11.54162px 20.77491px 0px rgba(9, 30, 66, 0.15)",
      border: "1px solid rgba(139, 92, 246, 0.3)",
    },
  },
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
    fontWeight: "500 !important",
    wordBreak: "unset !important",

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
  subText: {
    color: "#8B5CF6",
    fontSize: "16px",
    fontWeight: "500 !important",

    cursor: "pointer",

    [theme.breakpoints.down("xs")]: {
      fontSize: "14px",
    },
  },
  imageContainer: {
    width: "100%",
    height: "270px",
    overflow: "hidden",
  },

  productImage: {
    width: "100%",
    height: "100%",
    objectFit:'cover',
    borderRadius: "7.50088px 7.50088px 0px 0px",
  },
  productDiv: {
    display: "flex",
    flexDirection: "column",
    padding: "12px",
  },

  productName: {
    color: "#8B5CF6",
    fontSize: "16px",
    fontWeight: "600 !important",
    margin: "0",
  },

  productAdd: {
    color: "#707070",
    fontSize: "12px",
    fontWeight: "400 !important",
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

  priceContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    maxWidth: "50%",
    minWidth: "0",
    flexShrink: 1,

    "& p": {
      margin: "0",
    },
  },
  productPrice: {
    color: "#FF6B35",
    fontSize: "clamp(12px, 2vw, 24px)",
    fontWeight: "600 !important",
    wordBreak: "break-word",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "100%",
    lineHeight: "1.2",
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
    cursor: "pointer",
    height: "100%",
    maxHeight:'400px',
    borderRadius: "7.794px",
    background: "#FFF",
    boxShadow:
      "0px 0px 1.15416px 0px rgba(9, 30, 66, 0.30), 0px 11.54162px 20.77491px 0px rgba(9, 30, 66, 0.15)",
    border: "1px solid rgba(139, 92, 246, 0.3)",
    animation: "$glow 2s ease-in-out infinite",
  },

  boxDiv: {
    padding: "10px",
  },
  carousel: {
    position: "sticky !important",
    paddingTop: "15px",
    // height: "400px",
    overflow: "hidden",
    "& .css-1l7c0cy": {
      background: "transparent",
      height: "280px",
    },
  },
  bannerContainer: {
    display: "flex",
    gap: "10px",
    width: "100%",
    padding: "0 10px",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      gap: "20px",
    },
  },
  bannerItem: {
    flex: "1",
    minWidth: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "280px",
    [theme.breakpoints.down("md")]: {
      height: "auto",
    },
  },
  bannerImg: {
    width: "100%",
    height: "280px",
    objectFit: "contain",
  },
  bottomSpacing: {
    paddingBottom: "20px",
  },
  bottomFlex: {
    display: "flex",
    justifyContent: "space-between",
  },
  priceText: {
    color: "#707070",
    fontSize: " 12px",
    fontWeight: "400",
    lineHeight: "normal",
    opactiy: "0.5",
  },
  gridItem:{
    [theme.breakpoints.up('lg')]: {
      maxWidth: '16.666667%',
      flexBasis: '16.666667%',
      flexGrow: '0',
    }
  },
}));
const PopularProduct = function (props) {
  const classes = useStyles();
  const history = useHistory();
  const [data, setData] = useState([]);
  const [dataAds, setDataAds] = useState([]);

  const getPopularProduct = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.getPopularProduct,
      });

      if (res.data.responseCode === 200) {
        setData(res?.data?.result?.data);
      }
    } catch (error) {
      console.error("Error fetching popular products:", error);
    }
  };

  const getAllAdvertisement = async () => {
    try {
      // جلب إعلانات النوع الأول
      const resType1 = await Axios({
        method: "GET",
        url: ApiConfig.getAdvertisementType1,
      });
      
      // جلب إعلانات النوع الثاني
      const resType2 = await Axios({
        method: "GET",
        url: ApiConfig.getAdvertisementType2,
      });
      
      // دمج جميع الإعلانات
      const allAds = [];
      if (resType1.data.responseCode === 200 && resType1.data.result) {
        allAds.push(...resType1.data.result);
      }
      if (resType2.data.responseCode === 200 && resType2.data.result) {
        allAds.push(...resType2.data.result);
      }
      
      setDataAds(allAds);
    } catch (error) {
      console.error("Error fetching advertisements:", error);
    }
  };

  // Group advertisements into sets of 3
  const groupedAds = [];
  for (let i = 0; i < dataAds.length; i += 3) {
    groupedAds.push(dataAds.slice(i, i + 3));
  }

  function Item(props) {
    return (
      <div className={classes.bannerContainer}>
        {props.items.map((item, index) => (
          <div key={index} className={classes.bannerItem}>
            <img
              src={
                !item.img || item.img === "undefined" || item.img === undefined ? "/images/logo.svg" : item.img
              }
              alt="DashImage"
              className={classes.bannerImg}
            />
          </div>
        ))}
      </div>
    );
  }
  const sliceData = data?.length >= 5 ? data.slice(0, 5) : data;
  useEffect(() => {
    getPopularProduct();
    getAllAdvertisement();
  }, []);
  return (
    <Box className={classes.mainBox}>
      <Box className={classes.flexBox}>
        <Typography className={classes.heading}>Popular Products</Typography>
        <Box>
          <Typography
            className={classes.subText}
            onClick={() => history.push("/popular-product")}
          >
            View more <span style={{ color: "#FF6B35" }}>{">"}</span>
          </Typography>
        </Box>
      </Box>
      <Grid container spacing={3} className={classes.bottomSpacing}>
        {sliceData?.length === 0 ? (
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
                <Grid key={values._id || Math.random()} item xs={12} sm={6} md={4} lg={2} className={classes.gridItem}>
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
                          <p
                            className={classes.productAdd}
                          >
                            {values.location ? values.location : "--"}
                          </p>

                          <p className={classes.productAdd}>
                            {moment(values.updatedAt).format("DD MMM YYYY")}
                          </p>
                        </Box>

                        <Box
                          style={{ paddingTop: "3px" }}
                          className={classes.priceContainer}
                        >
                          <p className={classes.priceText}>Price</p>
                          <p
                            style={{ color: "#FF6B35" }}
                            className={classes.productPrice}
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
        {groupedAds && groupedAds.map((group, i) => <Item key={i} items={group} />)}
      </Carousel>
    </Box>
  );
};

export default PopularProduct;
