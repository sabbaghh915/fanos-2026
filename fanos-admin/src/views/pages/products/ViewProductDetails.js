import { Typography, Box, Grid, Card, CardContent } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import ApiConfig from "src/config/APICongig";
import Axios from "axios";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  mainbox: {
    borderRadius: "20px",
    padding: "20px 0px",

    "& h4": {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "36px",
      lineHeight: "54px",

      color: "#0C576C",
      [theme.breakpoints.down("sm")]: {
        fontSize: "30px",
       
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "27px",
       
      },
    },
    [theme.breakpoints.down("sm")]: {
      padding: "20px 16px 20px 16px",
      borderRadius: "16px",
    },
  },
  CategoryTitel: {
    fontSize: "16px",
    fontFamily: "'Inter', sans-serif",
    fontWeight: "400",
    lineHeight: "1.6",
    letterSpacing: "0.00938em",
    color: "#263238",
    margin: "30px",
    width: "100%",
  },
  CategoryValue: {
    fontSize: "16px",
    fontFamily: "'Inter', sans-serif",
    fontWeight: "400",
    lineHeight: "1.6",
    letterSpacing: "0.00938em",
    color: "#263238",
    margin: "30px",
  },
  viewCard: {
    width: "60%",
    padding: "40px",
  },
  viewCardGrid: {
    display: "flex",
    justifyContent: "center",
  },
  viewSubImg: {
    width: "35%",
  },
  buttonbox: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "700 !important",
    fontSize: "22px",
    textAlign: "center",
    letterSpacing: "0.2px",
    color: "#FFFFFF",
    background: "#0C576C",
    borderRadius: "10px",
    width: "30%",
    height: "50px",
    marginTop: "24px",
  },
}));

const ViewProductDetails = (props) => {
  const classes = useStyles();
  const [profileData, setProfileData] = useState([]);
  const userId = props?.location?.state?.id;
  const history = useHistory();
  const [showFullCategoryName, setShowFullCategoryName] = useState(false);
  const [showFullCategoryDiscription, setShowFullCategoryDiscription] = useState(false);
  const handleClickViewMore = () => {
    setShowFullCategoryName(!showFullCategoryName);
  };
  const handleClickViewMoreD = () => {
    setShowFullCategoryDiscription(!showFullCategoryDiscription);
  };
  const getUserById = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.productDetails,
        headers: {
          token: token,
        },
        params: {
          productId: id,
        },
      });

      if (res.data.responseCode == 200) {
        const Data = res;
        setProfileData(res.data.result);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getUserById(userId);
  }, [userId]);

  return (
    <Page title={"Dashboard"}>
      <Box className={classes.bannerbox}>
        <Box className={classes.mainbox}>
          <Grid container className="d-flex justify-space-between">
            <Typography variant="h4">View Product Details</Typography>
          </Grid>

          <Box mt={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} className={classes.viewCardGrid}>
                <Card className={classes.viewCard}>
                  <CardContent>
                    <Grid container>
                      <Grid itme xs={12}>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <img
                            src={profileData?.productImage}
                            alt=""
                            className={classes.viewSubImg}
                          />
                        </div>
                        </Grid>
                      </Grid>
                      <Grid container item xs={12} style={{display:'flex', justifyContent:'center'}}>
                        <div >
                          {profileData?.productImage &&
                          profileData.productImage.length > 0 ? (
                            <img
                              src={profileData.productImage[0]}
                              alt="Product Image"
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </Grid>
                      <Grid container item xs={12}>
                        <Grid item xs={4}>
                          <div>
                            {" "}
                            <Typography className={classes.CategoryTitel}>
                              Category Name
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item xs={4}>
                          <div>
                            {" "}
                            <Typography className={classes.CategoryTitel}>
                              :
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item xs={4}>
                          <div>
                            {" "}
                            <Typography className={classes.CategoryValue}>
                              {profileData?.subCategoryId?.subCategoryName
                                ? profileData?.subCategoryId?.subCategoryName
                                : "--"}
                            </Typography>
                          </div>
                        </Grid>
                      </Grid>
                      <Grid container item xs={12}>
                        <Grid item xs={4}>
                          <div>
                            {" "}
                            <Typography className={classes.CategoryTitel}>
                              Product Name
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item xs={4}>
                          <div>
                            {" "}
                            <Typography className={classes.CategoryTitel}>
                              :
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item xs={4}>
                          <div>
                            {" "}
                            <Typography className={classes.CategoryValue}>
                              {profileData.productName &&
                              profileData.productName.length > 25
                                ? showFullCategoryName
                                  ? profileData.productName
                                  : profileData.productName.slice(0, 25) +
                                    "......."
                                : profileData.productName || "--"}
                              {profileData.productName &&
                                profileData.productName.length > 25 && (
                                  <Button
                                    style={{
                                      color: showFullCategoryName
                                      ? "#004e63"
                                        : "#0C576C",
                                      //border: showFullCategoryName ? '1px solid red' : '1px solid blue',
                                    }}
                                    className={classes.ViewMoreLink}
                                    onClick={handleClickViewMore}
                                  >
                                    {showFullCategoryName
                                      ? "View Less"
                                      : "View More"}
                                  </Button>
                                )}
                            </Typography>
                          </div>
                        </Grid>
                      </Grid>
                      <Grid container item xs={12}>
                        <Grid item xs={4}>
                          <div>
                            {" "}
                            <Typography className={classes.CategoryTitel}>
                              Price
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item xs={4}>
                          <div>
                            {" "}
                            <Typography className={classes.CategoryTitel}>
                              :
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item xs={4}>
                          <div>
                            {" "}
                            <Typography className={classes.CategoryValue}>
                              {profileData.price ? profileData.price : "--"}
                            </Typography>
                          </div>
                        </Grid>
                      </Grid>
                      <Grid container item xs={12}>
                        <Grid item xs={4}>
                          <div>
                            {" "}
                            <Typography className={classes.CategoryTitel}>
                              currency
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item xs={4}>
                          <div>
                            {" "}
                            <Typography className={classes.CategoryTitel}>
                              :
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item xs={4}>
                          <div>
                            {" "}
                            <Typography className={classes.CategoryValue}>
                              {profileData.currency ? profileData.currency : "--"}
                            </Typography>
                          </div>
                        </Grid>
                      <Grid container item xs={12}>
                        <Grid item xs={4}>
                          <div>
                            {" "}
                            <Typography className={classes.CategoryTitel}>
                              Payment Status
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item xs={4}>
                          <div>
                            {" "}
                            <Typography className={classes.CategoryTitel}>
                              :
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item xs={4}>
                          <div>
                            {" "}
                            <Typography className={classes.CategoryValue}>
                              {profileData.paymentStatus
                                ? profileData.paymentStatus
                                : "--"}
                            </Typography>
                          </div>
                        </Grid>
                      </Grid>
                      <Grid container item xs={12}>
                        <Grid item xs={4}>
                          <div>
                            {" "}
                            <Typography className={classes.CategoryTitel}>
                              Date & Time
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item xs={4}>
                          <div>
                            {" "}
                            <Typography className={classes.CategoryTitel}>
                              :
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item xs={4}>
                          <div>
                            <Typography className={classes.CategoryValue}>
                              {profileData.createdAt
                                ? profileData.createdAt.slice(0, 10)
                                : "--"}
                            </Typography>
                          </div>
                        </Grid>
                      </Grid>
                      <Grid container item xs={12}>
                        <Grid item xs={4}>
                          <div>
                            <Typography className={classes.CategoryTitel}>
                              Description
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item xs={4}>
                          <div>
                            {" "}
                            <Typography className={classes.CategoryTitel}>
                              :
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item xs={4}>
                          <div>
                            <Typography className={classes.CategoryValue}>
                              {profileData.description &&
                              profileData.description.length > 25
                                ? showFullCategoryDiscription
                                  ? profileData.description
                                  : profileData.description.slice(0, 25) +
                                    "......."
                                : profileData.description || "--"}
                              {profileData.description &&
                                profileData.description.length > 25 && (
                                  <Button
                                    style={{
                                      color: showFullCategoryDiscription
                                        ? "#004e63"
                                        : "#0C576C",
                                    }}
                                    className={classes.ViewMoreLink}
                                    onClick={handleClickViewMoreD}
                                  >
                                    {showFullCategoryDiscription
                                      ? "View Less"
                                      : "View More"}
                                  </Button>
                                )}
                            </Typography>
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid md={12} xs={12}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {" "}
                <Button
                  variant="contained"
                  fullWidth
                  className={classes.buttonbox}
                  onClick={() => history.push("/product-management")}
                >
                  BACK
                </Button>
              </div>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default ViewProductDetails;
