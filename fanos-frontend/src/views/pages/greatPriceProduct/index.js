import { Typography, Box, Grid, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import ApiConfig from "src/config/APIConfig";
import moment from "moment";
import { useHistory } from "react-router-dom";
import MainCarousel from '../Dashboard/mainCarousel'

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
    paddingTop: "21px",
    paddingBottom: "95px",
  },
  flexBox: {
    display: "flex",
    gap: "10px",
    paddingBottom: "22px",
  },
  heading: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "28px",
    lineHeight: "16px",
    color: "#000000",
  },
  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "7.50088px 7.50088px 0px 0px",
  },
  productDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "12px",
  },

  productName: {
    color: "#8B5CF6",
    fontSize: "16px",
    fontWeight: " 600 !important",
    margin: "0",
  },

  productAdd: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "12.0014px",
    lineHeight: " 18px",
    /* identical to box height */

    color: "#8B5CF6",
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
    cursor: "pointer",
    height: "100%",
    maxHeight: "400px",
    borderRadius: "7.794px",
    background: "#FFF",
    boxShadow:
      "0px 0px 1.15416px 0px rgba(9, 30, 66, 0.30), 0px 11.54162px 20.77491px 0px rgba(9, 30, 66, 0.15)",
    border: "1px solid rgba(139, 92, 246, 0.3)",
    animation: "$glow 2s ease-in-out infinite",
  },
  imageContainer: {
    width: "100%",
    height: "270px",
    overflow: "hidden",
  },

  subText: {
    fontSize: "16px",
    color: "#000",
    fontWeight: "400",
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
      background: "#8B5CF61f",
    },
  },
  search: {
    color: "#000",
    fontSize: "24px",
    fontWeight: "500 !important",

  },
  viewMoreBox: {
    padding: "20px 0",
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  loadMoreBtn: {
    color: "#242424",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "600",
    width: '100%',
    maxWidth: '151px',
    height: '50px',
    borderRadius:'8px',
    background:'#FF6B35',
  },

  forwardArrow: {
    color: '#FF6B35',
  },

  NoDatafound: {
    paddingTop: "10px",
  },

  gridItem: {
    [theme.breakpoints.up("lg")]: {
      maxWidth: "16.666667%",
      flexBasis: "16.666667%",
      flexGrow: "0",
    },
  },
  bottomFlex: {
    display: "flex",
    justifyContent: "space-between",
  },
  priceText: {
    color: "#707070",
    fontSize: "12px",
    fontWeight: " 400 !important",
    opacity: "0.5",
    margin: "0",
  },
  locationAndDate: {
    display: "flex",
    flexDirection: "column",
    gap: " 20px",
    width: "100%",
    maxWidth: "155px",
    wordBreak: " break-word",
  },

  priceContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: "10px",
  },

  price: {
    margin: "0",
    color: "#FF6B35",
    fontSize: "24px",
    fontWeight: "600",
    wordBreak: 'keep-all',
  },
  loadMoreBtnContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '15px',
  },

}));

const GreatPriceProduct = function () {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const history = useHistory();
  const [allProdLimit, setAllProdLimit] = useState(10);
  const [allProdTotal, setAllProdTotal] = useState(10);
  const [pages, setPages] = useState(1);

  const getFeaturedProduct = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.getgreatPriceProduct,
        params: {
          limit: allProdLimit,
        },
      });

      if (res.data.responseCode === 200) {
        setData(res?.data?.result?.docs);
        setAllProdLimit(res?.data?.result?.limit);
        setAllProdTotal(res?.data?.result?.total);
        setPages(res?.data?.result?.pages);
      }
    } catch (error) { }
  };

  useEffect(() => {
    getFeaturedProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProdLimit]);

  return (
    <Box className={classes.mainBox}>
      <MainCarousel />

      {data?.length === 0 ? null : allProdTotal > allProdLimit ? (
        pages > 1 ? (
          <>
            <Box className={classes.viewMoreBox}>
              <Typography className={classes.search}>Great Price Products</Typography>

            </Box>
          </>
        ) : null
      ) : null}
      <Grid container spacing={3} className={classes.NoDatafound}>
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
            {data.map((data) => {
              localStorage.setItem("userId", data._id);
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={2}
                  className={classes.gridItem}
                >
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

                    <Box className={classes.productDiv}>
                      <p className={classes.productName}>
                        {data.productName.length <= 8
                          ? data.productName
                          : data.productName.slice(0, 20) + ".."}
                      </p>

                      <Box className={classes.bottomFlex}>
                        <Box className={classes.locationAndDate}>
                          <p className={classes.productAdd}>
                            {data.location ? data.location : "--"}
                          </p>
                          <p className={classes.productAdd}>
                            {moment(data.updatedAt).format("MM/DD/YYYY")}
                          </p>
                        </Box>

                        <Box className={classes.priceContainer}>
                          <p className={classes.priceText}>Price</p>
                          <p

                            className={classes.price}
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

      <Box className={classes.loadMoreBtnContainer}>
        <Button
          className={classes.loadMoreBtn}
          onClick={() => {
            setAllProdLimit(allProdLimit + 10);
          }}
        // endIcon={<ArrowForwardIosIcon size='small' className={classes.forwardArrow} />}
        >
          Load More
        </Button>
      </Box>



    </Box>
  );
};

export default GreatPriceProduct;
