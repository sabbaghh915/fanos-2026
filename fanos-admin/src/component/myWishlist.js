import { Typography, Box, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import ApiConfig from "src/config/APICongig";
import moment from "moment";
import { toast } from "react-toastify";
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

    color: "#000000",
   
  },
  productImage: {
    width: "100%",
    height: "190px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
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
    margin:'0',
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
  spanText: {
    color: '#707070',
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontWeight: 400,
    [theme.breakpoints.down("xs")]: {
      fontSize: "14px !important",
    },

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
  soldDiv: {
    position: "absolute",
    width: "124.8px",
    height: "39px",
    textAlign: "center",

    background: " #096B00",
    borderRadius: "3.12px",
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
  imageAds: {
    borderTopRightRadius: "10px",
    height: "38px",
  },
  iconimgdiv: {
    position: "relative",
    textAlign: "right",
    marginBottom: "-45px",
  },
  gridItem: {

    [theme.breakpoints.up('lg')]: {
      flexGrow: 1,
      maxWidth: '19.666667%',
      flexBasis: '19.666667%'
    }
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
export default function (props) {
  const classes = useStyles();
  const history = useHistory();
  const [openLive, setOpenLive] = useState(true);
  const [data, setData] = useState([]);
  const [wishList, setWishList] = useState(10);
  const [totalwishListCount, setTotalWishListCount] = useState(10);
  const [pages, setPages] = useState(1);
  const handleDeleteStatus = (id) => {
    DeleteData(id);
  };

  const getWishlistData = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await Axios({
        method: "POST",
        url: ApiConfig.wishlist,
        headers: {
          token: token,
        },
        params: {
          limit: wishList,
        },
      });
      if (res?.data?.responseCode === 200) {
        setData(res?.data?.result?.docs);
        setTotalWishListCount(res?.data?.result?.docs?.total);
        setPages(res?.data?.result?.docs?.pages);
      }
    } catch (error) { }
  };

  const DeleteData = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const res = await Axios({
        method: "DELETE",
        url: ApiConfig.removeWishlist,
        headers: {
          token: token,
        },
        params: {
          wishlistId: id,
        },
      });

      if (res.data.responseCode === 200) {
        toast.success("Deleted Successfully");
        getWishlistData();
        history.push("/wishlist");
      } else {
        toast.error(res.data.responseMessage);
      }
    } catch (error) {
      toast.error(error.response.data.responseMessage);
    }
  };
  useEffect(() => {
    getWishlistData();
  }, []);

  return (
    <Box className={classes.mainBox}>
      <Grid container>
        <Grid item lg={12}>
          <Box style={{display:'flex', alignItems:'center', paddingBottom: "30px",}}>
            <Typography className={classes.heading}> My Wishlist&nbsp;&nbsp;
            </Typography>
            <span className={classes.spanText}>
                  {'( '} Showing
                    {/* {user?.filteredData?.length} */}
                    &nbsp;
                    {data?.length}
                    &nbsp; results{' )'}
                  </span>{" "}
          </Box>
        </Grid>
      </Grid>

      {openLive == true ? (
        <Grid container spacing={3}>
          {data?.length == 0 ? (
            <>
              <Grid
                container
                align="center"
                style={{ flexDirection: "column" }}
              >
                <img src="images/noproduct.svg" alt="NO DATA FOUND" />
                <Typography style={{ color: "#000", fontSize: "16px" }}>
                  No Products Found
                </Typography>
              </Grid>
            </>
          ) : (
            <>
              {data?.map((values) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={2} className={classes.gridItem}>
                    <Box
                      className={classes.boxCard}
                      onClick={() =>
                        history.push({
                          pathname: "/product",
                          state: {
                            id: values.productId._id,
                            userId: values.productId._id,
                          },
                        })
                      }
                    >
                      <div className={classes.iconimgdiv}>
                        <img
                          alt="img"
                          src="images/delete.svg"
                          className={classes.imageAds}
                          onClick={() => handleDeleteStatus(values._id)}
                        />
                      </div>
                      <img
                        alt="img"
                        className={classes.productImage}
                        src={values?.productId?.productImage[0]}
                      />
                      <Box className={classes.productLocationDate}>
                        <Box className={classes.productNameContainer}>
                          <p className={classes.productName}>
                            {values?.productId?.productName?.length <= 8
                              ? values?.productId?.productName
                              : values?.productId?.productName?.slice(0, 20) +
                              ".."}
                          </p>
                        </Box>
                        <Box className={classes.bottomFlex}>
                          <Box className={classes.productAndLocation}>
                            <p className={classes.productAdd}>
                              {values?.productId?.location
                                ? values?.productId?.location.split(',')[0].slice(0,20) : "--"}
                                {values?.productId?.location
                                ? values?.productId?.location.split(',')[1] : "--"}
                            </p>
                            <p className={classes.productAdd}>
                              {moment(values?.updatedAt).format("MM/DD/YYYY")}
                            </p>
                          </Box>
                          <Box className={classes.priceContainer}>
                            <p className={classes.priceText}>Price</p>
                            <p
                              style={{ color: "#D39B2D" }}
                              className={classes.productPrice}
                            >
                              {values?.productId?.price}{values?.productId?.currency}
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
      ) : (
        <Grid container spacing={3}>
          {data?.length == 0 ? (
            <>
              <Grid
                container
                align="center"
                style={{ flexDirection: "column" }}
              >
                <img src="images/noproduct.svg" alt="NO DATA FOUND" />
                <Typography style={{ color: "#000", fontSize: "16px" }}>
                  No Products Found
                </Typography>
              </Grid>
            </>
          ) : (
            <>
              {data?.map((data) => {
                return (
                  <Grid item xs={12} sm={6} md={3} lg={3}>
                    <Box className={classes.boxCard}>
                      <div className={classes.soldDiv}>Sold</div>
                      <img
                        alt="img"
                        className={classes.productImage}
                        src={data.img}
                      />

                      <Box className={classes.productDiv}>
                        <p className={classes.productName}>{data.name}</p>
                        <p className={classes.productAdd}>{data.date}</p>
                      </Box>
                      <Box
                        style={{ paddingTop: "7px" }}
                        className={classes.productDiv}
                      >
                        <p className={classes.productAdd}>{data.add}</p>
                        <p
                          style={{ color: "#D39B2D" }}
                          className={classes.productName}
                        >
                          {data.price}
                        </p>
                      </Box>
                    </Box>
                  </Grid>
                );
              })}
            </>
          )}

          {data?.length === 0 ? null : totalwishListCount > wishList ? (
            pages > 1 ? (
              <>
                <Box className={classes.viewMoreBox}>
                  <button
                    className={classes.viewMoreItem}
                    onClick={() => {
                      setWishList(wishList + 10);
                    }}
                  >
                    View More
                  </button>
                </Box>
              </>
            ) : null
          ) : null}
        </Grid>
      )}
    </Box>
  );
}
