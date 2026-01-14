import { Typography, Box, Grid } from "@material-ui/core";
import React, { useEffect, useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import { UserContext } from "src/context/User";
import moment from "moment";
import { useHistory } from "react-router-dom";

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
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  mainbox: {
    paddingTop: "21px",
    paddingBottom: "95px",
  },
  bookDiv: {
    background: "#BF9C76",
    height: "348px",
    paddingLeft: "47px",
    paddingRight: "47px",
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
  subHeading: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "18px",
    lineHeight: "70px",
    color: "#FFFFFF",
  },
  search: {
    color: '#8B5CF6',
    fontFamily: 'Poppins',
    fontSize: '24px',
    fontWeight: 500,
    [theme.breakpoints.down("xs")]: {
      fontSize: "18px !important",
    },
  },
  productImage: {
    width: "100%",
    height: "249px",
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
  spanText: {
    color: '#707070',
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontWeight: 400,
    [theme.breakpoints.down("xs")]: {
      fontSize: "14px !important",
    },
  },
  productLocationDate: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "12px",
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
  viewMoreBox: {
    padding: "20px 20px",
    textAlign: "end",
  },
  viewMoreItem: {
    color: "#fff",
    width: "100%",
    border: "none",
    cursor: "pointer",
    height: "42px",
    fontSize: "14px",
    maxWidth: "105px",
    background: "#FF6B35",
    fontStyle: "normal",
    fontFamily: "Poppins",
    fontWeight: "500",
    lineHeight: "14px",
    borderRadius: "5px",
  },
  gridItem:{
    [theme.breakpoints.up('lg')]: {
      maxWidth: '16.666667%',
      flexBasis: '16.666667%',
      flexGrow: '0',
    }
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
  productPrice: {
    color: "#FF6B35",
    fontSize: " 24px",
    fontWeight: "600 !important",
    wordBreak:'keep-all',
  },
  priceContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
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
}));
const Search = function (props) {
  const classes = useStyles();
  const history = useHistory();
  const user = useContext(UserContext);
  const [productLimt, setProductLimit] = useState(10);
  let pages = 1 ;
  let productTotal = 10;

  useEffect(() => {
    getSearchProduct(productLimt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSearchProduct = async (limit, search, location) => {
    const res = await user.getSearchProduct(limit, user.searchText, location);
    if (res?.data?.responseCode === 200) {
      productTotal = res?.data?.result?.docs?.total;
      pages =res?.data?.result?.docs?.pages
      user.setFilteredData(res?.data?.result);
    }
  };
  const searchProductDocs = user?.searchProduct?.data?.result?.docs;
  useEffect(() => {
    if (user?.searchProduct && searchProductDocs) {
      user.setFilteredData(searchProductDocs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchProductDocs]);
  return (
    <Page title={"home"}>
      <Box className={classes.bannerbox}>
        <Box className={classes.mainbox}>
          <Typography className={classes.search}>
            Search Results{" "}
            <span className={classes.spanText}>
              Showing {user?.filteredData?.length} results
            </span>{" "}
          </Typography>
          <Grid container spacing={2} style={{marginTop:'35px'}}>
            {user?.filteredData &&
              user?.filteredData.map((data) => {
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
                            : data.productName.slice(0, 5) + ".."}
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
                            {data.price}{data.currency}
                          </p>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
               
                );
              })}
            {user?.filteredData?.length === 0 ? (
              <>
                <Grid container>
                  <Grid item lg={4}></Grid>
                  <Grid item lg={4} align="center">
                    <Grid className={classes.noDataGrid}>
                      <img src="images/noData.svg" alt="no Data" />
                      <p style={{ color: "black", textAlign: "center" }}>
                        No Products Found <br /> Please try to search something
                        different.
                      </p>
                    </Grid>
                  </Grid>

                  <Grid item lg={4}></Grid>
                </Grid>
              </>
            ) : (
              ""
            )}
          </Grid>

       {/* This conditions apply because the limit is contiously increase to reduce api 
           product limit is 10 show first time
       */}
  {user?.filteredData?.length === 0 ? null : productTotal > productLimt ? (
        pages > 1 ? (
          <>
            <Box className={classes.viewMoreBox}>
              <button
                className={classes.viewMoreItem}
                onClick={() => {
                  setProductLimit(productLimt + 10);
                  let valueLImit = productLimt + 10;
                  getSearchProduct(valueLImit);
                }}
              >
                View More
              </button>
            </Box>
          </>
        ) : null
      ) : null}
        </Box>
      </Box>
    </Page>
  );
};

export default Search;
