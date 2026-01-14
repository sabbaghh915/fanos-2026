import { Typography, Box, Grid, Button, Dialog, Link } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import ApiConfig from "src/config/APIConfig";
import moment from "moment";
import { toast } from "react-toastify";
import MenuItem from "@material-ui/core/MenuItem";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

const useStyles = makeStyles((theme) => ({
  mainBox: {
    paddingTop: "10px",
  },
  heading: {
    color: "#8B5CF6",
    fontFamily: "Poppins",
    fontSize: "16.183px",
    fontStyle: "normal",
    fontWeight: 400,
  },
  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "7.50088px 7.50088px 0px 0px",
  },
  imageContainer: {
    width: "100%",
    height: "270px",
    overflow: "hidden",
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
  liveButton: {
    background: "#FF6B35",
    maxWidth: "125px",
    width: "100%",
    fontWeight: "900 !important",
    height: "40px",
  },
  liveButtonNext: {
    border: "2px solid #FF6B35",
    color: "#000",
    maxWidth: "125px",
    fontWeight: "900 !important",
    width: "100%",
    height: "40px",
  },
  soldButton: {
    background: "#FF6B35",
    maxWidth: "125px",
    width: "100%",
    fontWeight: "900 !important",
    height: "40px",
  },
  soldButtonNext: {
    border: "2px solid #FF6B35",
    color: "#000",
    fontWeight: "900 !important",
    maxWidth: "125px",
    width: "100%",
    height: "40px",
  },
  soldDiv: {
    position: "absolute",
    width: "124.8px",
    height: "39px",
    textAlign: "center",

    background: " #096B00",
    borderRadius: "3.12px",
  },
  iconimgdiv: {
    position: "relative",
    textAlign: "right",
    marginBottom: "-45px",
  },
  menuDrop: {
    position: "absolute",
    right: "15px",
    width: "156px",
    height: "auto",
    background: "#FFF8EA",
    borderRadius: "5px",
  },
  planText: {
    display: "flex",
    justifyContent: "center",
    color: "#000",
  },
  headingResults: {
    color: "#000",
    fontSize: "14px",
    paddingLeft: "40px",
    fontWeight: 400,
  },
  cardContent: {
    cursor: "pointer",
    height: "100%",
    maxHeight: "400px",
    borderRadius: " 7.794px",
    background: "#FFF",
    boxShadow:
      "0px 0px 1.15416px 0px rgba(9, 30, 66, 0.30), 0px 11.54162px 20.77491px 0px rgba(9, 30, 66, 0.15)",
  },
  soldProduct: {
    // top: "-6px",
    color: "#fff",
    width: "100px",
    padding: "6px",

    position: "absolute",
    background: "#FF0000",
    paddingTop: "9px",
    textAlign: "center",
    fontWeight: "900 !important",
    borderTopLeftRadius: "5px",
    height: "24px",
    borderTopRightRadius: "5px",
    borderBottomRightRadius: "5px",
  },
  soldProduct2: {
    color: "#fff",
    width: "100%",
    maxWidth: "110px",
    padding: "6px",
    paddingTop: "15px",
    background: "#096B00",
    fontSize: "13px",
    textAlign: "center",
    fontWeight: "900 !important",
    borderTopLeftRadius: "5px",
    height: "24px",
    borderTopRightRadius: "5px",
    borderBottomRightRadius: "5px",
  },
  imageAds: {
    width: "30px",
    marginRight: "10px",
    cursor: "pointer",
  },
  deleteBox: {
    height: "100%",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  dialogContent: {
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "400px",
      top: "0px",
      width: "100%",
      maxHeight: "230.71px",
      height: "100%",
      background: "#8B5CF6",
      borderRadius: "14.7507px",
      "@media (max-width: 500px) and (min-width: 280px)": {
        height: "100%",
      },
    },
  },
  deactivateDialog: {
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "520px",
      top: "0px",
      width: "100%",
      maxHeight: "253.71px",
      background: "#8B5CF6",
      borderRadius: "14.7507px",
    },
  },
  innerDialogBox: {
    padding: "35px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  dialogbuttonsBox: {
    paddingTop: "30px",
    display: "flex",
    gap: "20px",
    justifyContent: "space-between",
    width: "80%",
  },
  dilogContent: {
    color: "#F5F5F5",
    textAlign: "center",
    fontFamily: "Poppins",
    fontSize: "24px",
    fontWeight: 600,
    "@media (max-width: 500px) and (min-width: 280px)": {
      fontSize: "16px",
    },
  },
  dialogButton: {
    width: "100%",
    padding: "20px",
    maxHeight: "30px",
    maxWidth: "203px",
    fontSize: "16",
    color: "black",
    background: "#FF6B35",
    border: "1.475px solid #FF6B35",
    borderRadius: "6px",
    [theme.breakpoints.down("xs")]: {
      padding: "20px",
      fontSize: "16px",
    },
    "@media (max-width: 500px) and (min-width: 280px)": {
      maxWidth: "120px",
    },
  },
  dialogButtonCancel: {
    width: "100%",
    padding: "20px",
    maxHeight: "30px",
    maxWidth: "203px",
    fontSize: "16",
    color: "#FF6B35",
    background: "transparent",
    border: "1.475px solid #FF6B35",
    borderRadius: "6px",
    [theme.breakpoints.down("xs")]: {
      padding: "20px",
      fontSize: "16px",
    },
    "@media (max-width: 500px) and (min-width: 280px)": {
      maxWidth: "120px",
    },
  },
  logoutTypo: {
    color: "#F5F5F5",
    textAlign: "center",
    fontFamily: "Poppins",
    fontSize: "24px",
    wordBreak: "unset",
    fontWeight: 600,
    "@media (max-width: 500px) and (min-width: 280px)": {
      fontSize: "14.5513px",
    },
  },
  logoutTypoHeading: {
    fontSize: "22.5513px",
    lineHeight: "40px",
    textAlign: "center",

    color: "#FFFFFF",
    "@media (max-width: 500px) and (min-width: 280px)": {
      fontSize: "14.5513px",
    },
  },
  gridButtons: {
    justifyContent: "space-around",
    alignItems: "center",
    display: "flex",
    paddingTop: "35px",
    "@media (max-width: 500px) and (min-width: 280px)": {
      paddingTop: "15px",
      gap: "20px",
    },
  },
  yesButton: {
    height: "45px",
    width: "150px",
    background: "#FF6B35",
    color: "black",
    borderRadius: "7.37537px",
    "@media (max-width: 500px) and (min-width: 280px)": {
      width: "70px",
    },
  },
  noButton: {
    width: "150px",
    height: "45px",
    border: "1.47507px solid #FF6B35",
    color: "#FF6B35",
    borderRadius: " 7.37537px",
    "@media (max-width: 500px) and (min-width: 280px)": {
      width: "70px",
      height: "35px",
    },
  },
  buttonGrid: {
    display: "flex",
    gap: "25px",
  },
  spanText: {
    color: "#707070",
    fontFamily: "Poppins",
    fontSize: "16px",
    fontWeight: 400,
    marginBottom:'25px',

    [theme.breakpoints.down("xs")]: {
      fontSize: "14px !important",
    },
  },
  AdsHeading: {
    display: "flex",
    marginBottom:'20px',
    
    gap: "15px",
    [theme.breakpoints.down("xs")]: {
      display: "grid",
    },
  },
  gridItem: {
    [theme.breakpoints.up("lg")]: {
      maxWidth: "16.666667%",
      flexBasis: "16.666667%",
      flexGrow: "0",
    },
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
    color: "#FF6B35",
    fontSize: " 24px",
    fontWeight: "600 !important",
  },

  // noresultContainer:{
  //   height:'45vh',
  // },

}));

const MyAdvertisment = function (props) {
  const classes = useStyles();
  const history = useHistory();
  const [openLive, setOpenLive] = useState(true);
  const [openSold, setOpenSold] = useState(false);
  const [productData, setProductData] = useState([]);
  const [soldData, setSoldData] = useState([]);
  const [open, setOpen] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoadingMark, setIsLoadingMark] = useState(false);
  const [openProdDelete, setOpenProdDelete] = useState(false);
  const [prodDeleteId, setProdDeleteId] = useState("");
  const [prodMarkStatus, setProdMarkStatus] = useState("");
  const [deactivateId, setDeactivateId] = useState("");
  const [openProdMark, setOpenProdMark] = useState(false);
  const [deactivatePopUp, setDeactivatePopUp] = useState(false);


  const toggleDropdown = (index) => {
    if (open === index) {
      setOpen(null);
    } else {
      setOpen(index);
    }
  };

  const handleProductStatus = (id, status) => {
    getProductStatusData(id, status);
  };

  const handleDeleteStatus = (id) => {
    DeleteData(id);
  };

  const handleMarkSoldStatus = (id, status) => {
    getProductStatusData(id, status);
    setOpenProdMark(false);
  };

  const getProductListData = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await Axios({
        method: "POST",
        url: ApiConfig.myProductListWithStatus,
        headers: {
          token: token,
        },
        data: {
          status: "ACTIVE And DEACTIVE",
        },
      });

      if (res.data.responseCode === 200) {
        setProductData(res.data?.result?.docs);
  

      } else {
        toast.error(res.data.responseMessage);
      }
    } catch (error) {
      toast.error(error.response.data.responseMessage);
    }
  };


  const getProductListSoldData = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await Axios({
        method: "POST",
        url: ApiConfig.myProductListWithStatus,
        headers: {
          token: token,
        },
        data: {
          status: "SOLD",
        },
      });
      if (res.data.responseCode === 200) {
        setSoldData(res.data.result.docs);

      } else {
        toast.error(res.data.responseMessage);
      }
    } catch (error) {
      toast.error(error.response.data.responseMessage);
    }
  };



  const DeleteData = async (id) => {
    const token = localStorage.getItem("token");
    setIsLoadingDelete(true);
    try {
      const res = await Axios({
        method: "DELETE",
        url: ApiConfig.deleteData,
        headers: {
          token: token,
        },
        params: {
          _id: id,
        },
      });
      if (res.data.responseCode === 200) {
        getProductListData();
        setIsLoadingDelete(false);
        setOpenProdDelete(false);
        toast.success("Deleted Successfully.");
      } else {
        setIsLoadingDelete(false);
      }
    } catch (error) {
      setIsLoadingDelete(false);

    }
  };

  const getProductStatusData = async (id, status) => {
    const token = localStorage.getItem("token");
    setIsLoadingMark(true);
    try {
      const res = await Axios({
        method: "POST",
        url: ApiConfig.updateProductStatus,
        headers: {
          token: token,
        },
        data: {
          productId: id,
          status: status,
        },
      });

      if (res.data.responseCode === 200) {
        toast.success("Updated successfully");
        getProductListData();
        setIsLoadingMark(false);
        handleCloseDeactivateModal();
        setOpen(null);
      } else {
        setIsLoadingMark(false);
      }
    } catch (error) {
      setIsLoadingMark(false);
    }
  };

  const handleDeletModal = () => {
    setOpenProdDelete(false);
  };

  const handleMarkModal = () => {
    setOpenProdMark(false);
  };
  const handleCloseDeactivateModal = () => {
    setDeactivatePopUp(false);
  };
  useEffect(() => {
    getProductListData();
    // getProductStatusData();
  }, []);

  return (
    <Box className={classes.mainBox}>
      <Grid container>
        <Grid item lg={10} md={9} xs={5} sm={9} className={classes.noresultContainer}>
          <Box className={classes.AdsHeading} pb={2}>
            <Typography className={classes.heading}>
              <Link
                href="/"
                className={classes.heading}
                style={{ cursor: "pointer" }}
              >
                Home
              </Link>{" "}
              {">"} My Ads &nbsp;&nbsp;
              {openLive === true ? (
                <>

                  <span className={classes.spanText}>
                    Showing
                    &nbsp;
                    {productData?.length}
                 
                    &nbsp; results
                  </span>{" "}
                </>
              ) : (
                <>
                  <span className={classes.spanText}>
                    Showing
                    &nbsp;
                    {soldData?.length}
                    &nbsp; results
                  </span>{" "}
                </>
              )}
            </Typography>
          </Box>
        </Grid>

        <Grid item lg={2} md={3} xs={7} sm={3}>
          <Box className={classes.buttonGrid}>
            <Button
              className={openLive ? classes.liveButton : classes.liveButtonNext}
              onClick={() => {
                setOpenLive(true);
                setOpenSold(false);
              }}
            >
              Live
            </Button>

            <Button
              className={openSold ? classes.soldButton : classes.soldButtonNext}
              onClick={() => {
                setOpenLive(false);
                setOpenSold(true);
                getProductListSoldData();
              }}
            >
              Sold
            </Button>
          </Box>
        </Grid>
      </Grid>

      {openLive === true ? (
        <Grid container spacing={3}>
          {productData?.length === 0 ? (
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
              {productData &&
                productData?.map((data, index) => {

                  return (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={2}
                      className={classes.gridItem}
                    >
                      <Box className={classes.cardContent}>
                        <div className={classes.iconimgdiv}>
                          {data.status === "DEACTIVE" ? (
                            <Typography className={classes.soldProduct}>
                              {data?.status ? "Deactivated" : "--"}
                            </Typography>
                          ) : (
                            ""
                          )}
                          <img
                            alt="img"
                            src="images/adsOpen.png"
                            onClick={() => toggleDropdown(index)}
                            className={classes.imageAds}
                          />

                          <div className={classes.menuDrop}>
                            {open === index ? (
                              <>
                                {data?.status === "DEACTIVE" ? (
                                  ""
                                ) : (
                                  <MenuItem
                                    className={classes.planText}
                                    onClick={() =>
                                      history.push("/edit-ads", { data })
                                    }
                                  >
                                    Edit
                                  </MenuItem>
                                )}
                                {data.status === "DEACTIVE" ? (
                                  <MenuItem
                                    className={classes.planText}
                                    onClick={() =>
                                      handleProductStatus(data?._id, "ACTIVE")
                                    }
                                  >
                                    Activate
                                  </MenuItem>
                                ) : (
                                  <MenuItem
                                    className={classes.planText}
                                    onClick={() => {
                                      setDeactivateId(data?._id);
                                      setDeactivatePopUp(true);
                                    }}
                                  >
                                    Deactivate
                                  </MenuItem>
                                )}

                                <MenuItem
                                  className={classes.planText}
                                  onClick={() => {
                                    setProdDeleteId(data?._id);
                                    setOpenProdDelete(true);
                                  }}
                                >
                                  Delete
                                </MenuItem>
                                <MenuItem
                                  className={classes.planText}
                                  onClick={() => {
                                    setProdMarkStatus(data?._id);
                                    setOpenProdMark(true);
                                  }}
                                >
                                  Mark as Sold
                                </MenuItem>
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className={classes.imageContainer}>
                          <img
                            alt="img"
                            className={classes.productImage}
                            src={data.productImage[0]}
                            onClick={() => {
                              history.push({
                                pathname: "/product",
                                state: {
                                  id: data._id,
                                  userId: data.userId
                                },
                              });
                            }}
                          />
                        </div>
                        <Box className={classes.productLocationDate}>
                          <Box className={classes.productNameContainer}>
                            <span className={classes.productName}>
                              {data.productName.length <= 8
                                ? data.productName
                                : data.productName.slice(0, 20)}
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
      ) : (
        <Grid container spacing={3} style={{ paddingTop: "20px" }}>
          {soldData?.length === 0 ? (
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
              {soldData?.map((data, index) => {
                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={2}
                    className={classes.gridItem}
                  >
                    <Box className={classes.cardContent}>
                      <div className={classes.iconimgdiv}>
                        <Typography className={classes.soldProduct2}>
                          Sold
                        </Typography>
                      </div>

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
                              : data.productName.slice(0, 20)}
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
                      {/* <img
                        alt="img"
                        className={classes.productImage}
                        src={data.productImage[0]}
                      />

                      <Box className={classes.productDiv}>
                        <p className={classes.productName}>
                          {data.productName.length <= 8
                            ? data.productName
                            : data.productName.slice(0, 5) + ".."}
                        </p>
                        <p className={classes.productAdd}>
                          {moment(data.updatedAt).format("DD MMM YYYY")}
                        </p>
                      </Box>
                      <Box
                        style={{ paddingTop: "7px" }}
                        className={classes.productDiv}
                      >
                        <p className={classes.productAdd}>
                          {data.location.length <= 10
                            ? data.location
                            : data.location.slice(0, 10)}
                        </p>
                        <p
                          style={{ color: "#FF6B35", fontSize: "18px" }}
                          className={classes.productName}
                        >
                          {data.price ? data.price : "--"}$
                        </p>
                      </Box> */}
                    </Box>
                  </Grid>
                );
              })}
            </>
          )}
        </Grid>
      )}

      <Dialog
        open={openProdDelete}
        onClose={handleDeletModal}
        className={classes.dialogContent}
      >
        <Box className={classes.deleteBox}>
          <Typography className={classes.logoutTypo}>
            Are you sure you want to delete this product?
          </Typography>
          <Box className={classes.gridButtons}>
            <div>
              <Button
                className={classes.yesButton}
                disabled={isLoadingDelete}
                onClick={() => handleDeleteStatus(prodDeleteId)}
              >
                Yes
                {isLoadingDelete && <ButtonCircularProgress />}
              </Button>
            </div>

            <div>
              <Button
                className={classes.noButton}
                onClick={() => handleDeletModal()}
              >
                No
              </Button>
            </div>
          </Box>
        </Box>
      </Dialog>

      <Dialog
        open={openProdMark}
        onClose={handleMarkModal}
        className={classes.dialogContent}
      >
        <Box className={classes.deleteBox}>
          <Typography className={classes.logoutTypo}>
            Are you sure you want to mark this as sold ?
          </Typography>
          <Grid container className={classes.gridButtons}>
            <div>
              <Button
                className={classes.yesButton}
                disabled={isLoadingMark}
                onClick={() => handleMarkSoldStatus(prodMarkStatus, "SOLD")}
              >
                Confirm
                {isLoadingMark && <ButtonCircularProgress />}
              </Button>
            </div>

            <div>
              <Button
                className={classes.noButton}
                onClick={() => handleMarkModal()}
              >
                Cancel
              </Button>
            </div>
          </Grid>
        </Box>
      </Dialog>

      <Dialog
        open={deactivatePopUp}
        onClose={handleCloseDeactivateModal}
        className={classes.deactivateDialog}
      >
        <Box className={classes.innerDialogBox}>
          <Typography className={classes.dilogContent}>
            Are you sure you want to deactivate this advertisement?
          </Typography>
          <Box className={classes.dialogbuttonsBox}>
            <Button
              className={classes.dialogButton}
              disabled={isLoadingMark}
              onClick={() => handleProductStatus(deactivateId, "DEACTIVE")}
            >
              Confirm
              {isLoadingMark && <ButtonCircularProgress />}
            </Button>

            <Button
              className={classes.dialogButtonCancel}
              onClick={() => handleCloseDeactivateModal()}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default MyAdvertisment;
