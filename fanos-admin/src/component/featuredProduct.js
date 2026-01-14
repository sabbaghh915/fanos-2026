import { Typography, Box, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import ApiConfig from "src/config/APICongig";
import moment from "moment";
import { useHistory } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
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
    color: "#0C576C",
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
    // boxShadow: "0px 2px 1px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    height: "100%",
    maxHeight: "400px",
    borderRadius: " 7.794px",
    background: "#FFF",
    boxShadow:
      "0px 0px 1.15416px 0px rgba(9, 30, 66, 0.30), 0px 11.54162px 20.77491px 0px rgba(9, 30, 66, 0.15)",
  },

  subText: {
    cursor: "pointer",
    color: "#0C576C",
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
      background: "#FEE4C1",
      height: "280px",
    },
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
    color: "#D39B2D",
    fontSize: " 24px",
    fontWeight: "600 !important",
    wordBreak:'keep-all',
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
    // gap:'10px',

    "& p": {
      margin: "0",
    },
  },
  gridItem:{

    [theme.breakpoints.up('lg')]: {
      maxWidth:'unset',
      flexGrow:'1',
    }
  },
}));

export default function (props) {
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
    getFeaturedProduct();
    getAllAdvertisement();
  }, []);

  return (
    <Box className={classes.mainBox}>
      <Box className={classes.flexBox}>
        <Box>
          <Typography className={classes.heading}>Featured Products</Typography>
        </Box>
        <Box className={classes.viewAndArrow}>
          <Typography
            className={classes.subText}
            onClick={() => history.push("/view-product")}
          >
            View more <span style={{ color: "#D39B2D" }}>{">"}</span>
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
                            style={{ color: "#D39B2D" }}
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
        {dataAds && dataAds.map((item, i) => <Item key={i} item={item} />)}
      </Carousel>
      
    </Box>
  );
}
