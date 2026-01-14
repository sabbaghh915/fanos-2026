import { Typography, Box, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import ApiConfig from "src/config/APIConfig";
import moment from "moment";
import { useHistory } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { toast } from "react-toastify";

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
    paddingTop: "14px",
  },
  flexBox: {
    display: "flex",
    gap: "10px",
    paddingBottom: "22px",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500 !important",
    fontSize: "24px",
    wordBreak: "unset !important",
    color: "#242424",

    [theme.breakpoints.up("xs")]: {
      fontSize: "18px",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "28px",
      fontWeight: "600",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "28px",
      fontWeight: "600",
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
    color: "#8B5CF6",
    fontFamily: "Poppins",
    fontSize: "16px",
    fontWeight: "600 !important",

  },

  productAdd: {
    fontFamily: "Poppins",
    color: "#707070",
    fontSize: "12px",
    fontWeight: "400",
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
    maxHeight: "400px",
    borderRadius: " 7.794px",
    background: "#FFF",
    boxShadow:
      "0px 0px 1.15416px 0px rgba(9, 30, 66, 0.30), 0px 11.54162px 20.77491px 0px rgba(9, 30, 66, 0.15)",
    border: "1px solid rgba(139, 92, 246, 0.3)",
    animation: "$glow 2s ease-in-out infinite",
  },

  subText: {
    cursor: "pointer",
    color: "#8B5CF6",
    fontSize: "16px",
    fontWeight: "500 !important",

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
  productLocationDate: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "12px",
  },
  cardDataContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px",
  },
  priceText: {
    color: "#707070",
    fontSize: "12px",
    fontWeight: " 400 !important",
    opacity: "0.5",
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
  priceContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    maxWidth: "50%",
    minWidth: "0",
    flexShrink: 1,
    // gap:'10px',

    "& p": {
      margin: "0",
    },
  },
  gridItem:{
    [theme.breakpoints.up('lg')]: {
      maxWidth: '16.666667%',
      flexBasis: '16.666667%',
      flexGrow: '0',
    }
  },
}));

const FeaturedProduct = function (props) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [dataAds, setDataAds] = useState([]);
  const history = useHistory();

  const getFeaturedProduct = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.getFeaturedProduct,
      });
      if (res.data.responseCode === 200) {
        setData(res?.data?.result?.docs);
      } else {
        toast.warn("Sign in First");
      }
    } catch (error) {}
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
    getFeaturedProduct();
    getAllAdvertisement();
  }, []);

  return (
    <Box className={classes.mainBox}>
      <Box className={classes.flexBox}>
        <Box>
          <Typography className={classes.heading}>Featured Products </Typography>
        </Box>
        <Box className={classes.viewAndArrow}>
          <Typography
            className={classes.subText}
            onClick={() => history.push("/view-product")}
          >
            View more <span style={{ color: "#FF6B35" }}>{">"}</span>
          </Typography>
        </Box>
      </Box>
      <Grid container spacing={3} className={classes.bottomSpacing}>
        {data.length === 0 ? (
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
            {sliceData.map((data) => {
              localStorage.setItem("userId", data._id);
              return (
                <Grid key={data._id || Math.random()} item xs={12} sm={6} md={4} lg={2} className={classes.gridItem}>
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
                            : data.productName.slice(0,25)}
                        </span>
                      </Box>

                      <Box className={classes.bottomFlex}>
                        <Box className={classes.productAndLocation}>
                          <p className={classes.productAdd}>
                            {data.location ? data.location : "--"}
                          </p>

                          <p className={classes.productAdd}>
                            {moment(data.updatedAt).format("DD MMM YYYY")}
                          </p>
                        </Box>

                        <Box className={classes.priceContainer}>
                          <p className={classes.priceText}>Price</p>
                          <p
                            style={{ color: "#FF6B35" }}
                            className={classes.productPrice}
                          >
                            {data.price}{data.currency ? data.currency : "--"}
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

export default FeaturedProduct;
