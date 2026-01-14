import { Typography, Box, Button, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import ApiConfig from "src/config/APICongig";
import Axios from "axios";
import moment from "moment";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  heading: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "18px",
    lineHeight: "27px",
    color: "#000000",
  },
  contentDiv: {
    maxHeight: "197px",
    height: "100%",
    boxShadow:
      "0px 0px 1.15416px 0px rgba(9, 30, 66, 0.30), 0px 11.54162px 20.77491px 0px rgba(9, 30, 66, 0.15)",
    borderRadius: "7.88px",
    marginBottom: "26px",
    cursor:'pointer',
  },
  imgDiv: {
    width: "100%",
    maxWidth: "197px",
    height: "auto",
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
    color: "#0C576C",
    [theme.breakpoints.up("xs")]: {
      fontSize: "23px",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "25.216px",
    },
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
    color: "#0A2830",
  },
  buyButton: {
    background: "#D39B2D",
    width: "135px",
  },
  soldButton: {
    border: "1px solid #D39B2D",
    color: "#000",
    width: "135px",
  },
  buttonContainer: {
    justifyContent: "end",
    gap: "25px",
    // "@media (max-width: 600px)": {
    //   justifyContent: "space-between",
    // },
  },
  liveButton: {
    background: "#D39B2D",
    width: "125px",
  },
  liveButtonNext: {
    border: "2px solid #D39B2D",
    color: "#000",
    width: "125px",
  },
  soldButton: {
    background: "#D39B2D",
    width: "125px",
  },
  soldButtonNext: {
    border: "2px solid #D39B2D",
    color: "#000",
    width: "125px",
  },
  productImage: {
    maxHeight: "197px",
    borderRadius: "7.88px",
    height: "100%",
    maxWidth: "178px",
    width: "100%",
  },
  textName: {
    "& .input.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputMarginDense.MuiOutlinedInput-inputMarginDense":
      {
        color: "#000 !important",
      },
  },
  noDataGrid: {
    textAlign: "center",
    background: "lightGrey",
    margin: "22px 0px",
    padding: "40px 0 20px 0",
  },
  titleFlex: {
    // display: "flex",
    // justifyContent: "space-between",
  },
  buyDate: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "24px",
    color: "#000",
  },

  bannerbox: {
    boxSizing: "border-box",
    padding:'0 20px',
  },

  nameLocationAndPriceContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding:'10px 20px',

  },

  priceText: {
    color: "#707070",
    fontSize: "12px",
    fontWeight: "400 !important",
    opactiy: "0.5",
  },

  price: {
    color: " #D39B2D",
    fontSize: "24px",
    fontWeight: "600 !important",
  },

  productName: {
    color: "#0C576C",
    fontSize: "18px",
    fontWeight: "600 !important",
  },

  locationText: {
    color: "#707070",
    fonSize: "12px",
    fontWeight: "400 !important",
  },

  descriptionContainer:{
    marginTop:'23px',
    padding:'10px 20px',
  },

  description: {
    color: "#707070",
    fontSize: "16px",
    fontWeight: "400 !important",
  },
  contentBox:{

  },

}));
export default function () {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [openBuy, setOpenBuy] = useState(true);
  const [openSold, setOpenSold] = useState(false);
  const [dataNext, setDataNext] = useState([]);
  const history = useHistory();
  const orderHistoryData = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await Axios({
        method: "POST",
        url: ApiConfig.orderHistory,
        headers: {
          token: token,
        },
        data: {
          orderType: "BUY",
        },
      });

      if (res.data.responseCode === 200) {
        setData(res.data.result);
      }
    } catch (error) {}
  };

  const orderHistorySoldData = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await Axios({
        method: "POST",
        url: ApiConfig.orderHistory,
        headers: {
          token: token,
        },
        data: {
          orderType: "SELL",
        },
      });

      if (res.data.responseCode === 200) {
        setDataNext(res.data.result);
      }
    } catch (error) {}
  };
  useEffect(() => {
    orderHistoryData();
  }, []);

  return (
    <Box className={classes.bannerbox}>
      {/* <Grid container spacing={3}>
          <Grid item xs={4} lg={6} md={6} sm={6}>
            {" "}
            <Box>
              <Typography className={classes.heading}>Order History</Typography>
              <div className={classes.border}></div>
            </Box>
          </Grid>

          <Grid item xs={8} lg={6} md={6} sm={6}>
            <Grid container className={classes.buttonContainer}>
              <Button
                className={
                  openBuy ? classes.liveButton : classes.liveButtonNext
                }
                onClick={() => {
                  setOpenBuy(true);
                  setOpenSold(false);
                }}
              >
                Buy
              </Button>

              <Button
                className={
                  openSold ? classes.soldButton : classes.soldButtonNext
                }
                onClick={() => {
                  setOpenBuy(false);
                  setOpenSold(true);
                  orderHistorySoldData();
                }}
              >
                Sold
              </Button>
            </Grid>
          </Grid>
        </Grid> */}

      {openBuy === true && (
        <Box className={classes.contentBox}>
          {data?.length == 0 ? (
            <Grid className={classes.noDataGrid}>
              <img src="images/noData.svg" alt="no Data" />
              <p style={{ color: "black" }}>NO DATA FOUND</p>
            </Grid>
          ) : (
            data.map((value) => {
              if (openBuy === true) {
                return (
                  <>
                    <Grid container className={classes.contentDiv} 
                    onClick={() =>
                      history.push({
                        pathname: "/product",
                        state: {
                          id: value.productId,
                          userId: value._id,
                        },
                      })}>

                      <Grid
                        item
                        md={2}
                        sm={3}
                        xs={5}
                        className={classes.imgDiv}
                      >
                        <img
                          alt="img"
                          src={value.productDetails[0]?.productImage[0]}
                          className={classes.productImage}
                        />
                      </Grid>

                      <Grid
                        item
                        md={10}
                        sm={9}
                        xs={7}
                        className={classes.gridItemRight}
                      >
                        <Box className={classes.nameLocationAndPriceContainer}>
                          <div className={classes.nameAndLocation}>
                            <Typography className={classes.productName}>
                              {value.productDetails[0]?.productName}
                            </Typography>

                            <Typography className={classes.locationText}>
                              {/* <img src="/images/location.svg" alt="" /> */}
                              {value.productDetails[0]?.location}
                            </Typography>
                          </div>

                          <div className={classes.priceContainer}>
                            <Typography className={classes.priceText}>
                              Price
                            </Typography>
                            <Typography className={classes.price}>
                              {value.price}{value.productDetails[0]?.currency}
                            </Typography>
                          </div>
                        </Box>

                        <div className={classes.descriptionContainer}>
                          <Typography className={classes.description}>
                            {value.productDetails[0]?.description.length > 50
                              ? value.productDetails[0]?.description.slice(
                                  0,
                                  80
                                ) + "..."
                              : value.productDetails[0]?.description}
                          </Typography>
                        </div>

                        {/* <div>
                            <Typography className={classes.buyDate}>
                              BUY DATE:{" "}
                              {moment(value.productDetails[0].createdAt).format(
                                "ll"
                              )}
                            </Typography>
                          </div> */}

                        {/* <Grid container>
                            <Grid item md={5}></Grid>
                            <Grid item md={7}>
                     
                              
                            </Grid>
                          </Grid> */}
                        {/* <Box></Box> */}
                      </Grid>
                    </Grid>
                  </>
                );
              }
            })
          )}

        </Box>
      )}

      {openSold == true && (
        <>
          {dataNext?.length == 0 ? (
            <Grid className={classes.noDataGrid}>
              <img src="images/noData.svg" alt="no Data" />
              <p style={{ color: "black" }}>NO DATA FOUND</p>
            </Grid>
          ) : (
            dataNext.map((value) => {
              if (openSold === true) {
                return (
                  <>
                    <Grid container spacing={2} className={classes.contentDiv}>
                      <Grid item md={3} className={classes.imgDiv}>
                        <img
                          alt="img"
                          src={value.productDetails[0]?.productImage[0]}
                          className={classes.productImage}
                        />
                      </Grid>
                      <Grid item md={9}>
                        <Box>
                          <Typography className={classes.heading}>
                            {value.productDetails[0]?.productName}
                          </Typography>
                          <Typography className={classes.price}>
                            $ {value.price}
                          </Typography>
                          <Typography className={classes.description}>
                            {value.productDetails[0]?.description}
                          </Typography>
                        </Box>

                        <Box></Box>
                      </Grid>
                    </Grid>
                  </>
                );
              }
            })
          )}
        </>
      )}
    </Box>
  );
}
