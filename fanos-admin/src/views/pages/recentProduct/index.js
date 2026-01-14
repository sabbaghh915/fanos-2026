import { Typography, Box, Grid ,Button} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ApiConfig from "src/config/APICongig";
import Axios from "axios";
import moment from "moment";
import { useHistory } from "react-router-dom";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import MainCarousel from '../Dashboard/mainCarousel'

const useStyles = makeStyles((theme) => ({
  mainBox: {
    paddingTop: "20px",
  },
  flexBox: {
    display: "flex",
    gap: "10px",
    paddingBottom: "22px",
  },
  heading: {
    color: "#000",
    fontSize: "24px",
    fontWeight: "500 !important",
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
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "18.0021px",
    lineHeight: "27px",
    whiteSpace: "noWrap",
    color: "#0A2830",
    margin: "0",
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
  imageContainer: {
    width: "100%",
    height: "270px",
    overflow: "hidden",
  },
  subText: {
    fontSize: "16px",
    color: "#000",
    fontWeight: "400",
    cursor: "pointer",
  },
  boxDiv: {
    padding: "10px",
  },
  carousel: {
    position: "sticky !important",
    paddingTop: "15px",
    overflow: "hidden",
    "& .css-1l7c0cy": {
      background: "#0c576c1f",
    },
  },
  bottomSpacing: {
    paddingBottom: "20px",
  },
  viewMoreBox: {
    padding: "20px 0",
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
  },
  loadMoreBtnContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin:'15px 0'
  },

  loadMoreBtn: {
    color: "#242424",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "600",
    width: '100%',
    maxWidth: '151px',
    height: '50px',
    borderRadius: '8px',
    background: '#D39B2D',
  },
  forwardArrow:{
    color:'#D39B2D',
  },
  gridItem: {
    [theme.breakpoints.up("lg")]: {
      maxWidth: "19.666667%",
      flexBasis: "19.666667%",
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
    color: "#D39B2D",
    fontSize: "24px",
    fontWeight: "600 !important",
    wordBreak:"keep-all",
  },
}));

export default function (props) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const history = useHistory();
  const [recentProdlimit, setRecentProdLimit] = useState(10);
  const [recentProdTotal, setrecentProdTotal] = useState(10);
  const [pages, setPages] = useState(1);
  const getRecentProduct = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.getRecentProduct,
        params: {
          limit: recentProdlimit,
        },
      });

      if (res.data.responseCode === 200) {
        setData(res?.data?.result?.docs);
        setRecentProdLimit(res?.data?.result?.limit);
        setrecentProdTotal(res?.data?.result?.total);
        setPages(res?.data?.result?.pages);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getRecentProduct();
  }, [recentProdlimit]);

  return (
    <Box className={classes.mainBox}>
        <MainCarousel/>
       
        {data?.length === 0 ? null : recentProdTotal > recentProdlimit ? (
        pages > 1 ? (
          <>
            <Box className={classes.viewMoreBox}>
            <Typography className={classes.heading}>New Products</Typography>
            
            </Box>
          </>
        ) : null
      ) : null}
      <Grid container spacing={3} className={classes.bottomSpacing}>
        {data?.length === 0 ? (
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
            {data?.map((values) => {
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
                            : values.productName.slice(0, 20) + ".."}
                        </p>
                      </Box>

                      <Box className={classes.bottomFlex}>
                        <Box className={classes.locationAndDate}>
                          <p className={classes.productAdd}>
                            {values.location ? values.location : "--"}
                          </p>
                          <p className={classes.productAdd}>
                            {moment(values.updatedAt).format("MM/DD/YYYY")}
                          </p>
                        </Box>

                        <Box className={classes.priceContainer}>
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

      <Box className={classes.loadMoreBtnContainer}>
      <Button
                className={classes.loadMoreBtn}
                onClick={() => {
                  setRecentProdLimit(recentProdlimit + 10);
                }}
                // endIcon={<ArrowForwardIosIcon size='small' className={classes.forwardArrow}/>}
              >
                Load More
              </Button>
      </Box>
     
    </Box>
  );
}
