import React from "react"
import {
  Box,
  Button,
  Dialog,
  Grid,
  TextField,
  Typography
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "@material-ui/core/Modal";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { Carousel } from "react-carousel-minimal";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { MdArrowForwardIos } from "react-icons/md";
import { Link, useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import Page from "src/component/Page";
import ApiConfig from "src/config/APICongig";
import "./styles.css";


const reportContent = [
  "Duplicate ad",
  "Inappropriate Content",
  "Misleading Information",
  "Offensive Language",
  "Scam OR Fraud",
  "Other (Please Specify)",
];
const useStyles = makeStyles((theme) => ({
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

  search: {
    color: "#0C576C",
    fontSize: "16.183px",
    fontWeight: "400 !important",
    marginBottom: "10px",
  },

  button: {
    background: "#FFCE32",
    borderRadius: "4px",
    color: "#002F34",
    textTransform: "upperCase",
    fontWeight: "900 !important",
  },

  text: {
    color: "#0C576C",
    fontSize: "14px",
    fontWeight: "700",
  },

  textParticular: {
    color: "#002F34",
    fontSize: "18px",
    maxWidth: "530px",
    fontWeight: "400",
    width: "100%",
  },
  textDate: {
    color: "#002F34",
    fontSize: "24px",
    paddingTop: "15px",
    fontWeight: "900 !important",
  },

  // text1: {
  // color: "#002F34",
  // fontSize: "32px",
  // fontWeight: "900 !important",
  // },

  textborder: {
    color: "#002F34",
    paddingLeft: "10px",
  },
  // textPrice: {
  // color: "#D39B2D",
  // fontSize: "46px",
  // fontWeight: "900 !important",
  // },

  buyButton: {
    background: "#D39B2D",
    borderRadius: "6px",
    // width: "100%",
    // maxWidth:'288px',
    height: "57px",
    color: "#242424",
    border: "none",
    fontWeight: "600",
    fontSize: "16px",
    flexGrow: "1",
  },

  reportBtn: {
    borderRadius: "6px",
    // width: "100%",
    // maxWidth:'288px',
    height: "57px",
    color: "#707070",
    border: "1px solid #707070",
    fontWeight: "600",
    fontSize: "16px",
    flexGrow: "1",
  },
  chatBtn: {
    borderRadius: "6px",
    // width: "100%",
    // maxWidth:'288px',
    height: "57px",
    color: "#707070",
    border: "1px solid #707070",
    fontWeight: "600",
    fontSize: "16px",
    flexGrow: "1",
  },
  textRight: {
    color: "#0C576C",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: 400,
  },
  textRightLoc: {
    color: "#242424",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: 400,
  },

  textAutomatic: {
    color: "rgba(0, 47, 52, 0.74)",
    marginLeft: "10px",
    textTransform: "uppercase",
    fontFamily: "Poppins",
  },
  divBorder: {
    border: "1px solid rgba(0, 47, 52, 0.74)",
  },
  text6: {
    color: "rgba(0, 47, 52, 0.74)",
    textTransform: "uppercase",
    fontFamily: "Poppins",
  },
  containerSix: {
    padding: "6px 26px",
  },

  containerDetailsNext: {
    background: "#EEEEEE",
    padding: "30px",
    boxShadow: "0px 2px 1px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    boxShadow: "0px 2px 1px rgba(0, 0, 0, 0.1)",
    height: "fit-content",
    margin: "0 -7px",
  },
  general: {
    color: "#D39B2D",
    fontSize: "24px",
  },
  details: {
    color: "#002F34",
    fontSize: "18px",
    fontFamily: "Poppins",
  },
  detailsSide: {
    color: "#002F34",
    fontSize: "18px",
    fontFamily: "Poppins",
    textAlign: "center",
  },
  gridMap: {
    boxShadow: "0px 2px 1px rgba(0, 0, 0, 0.1)",
    background: "#0C576C",
    borderRadius: "10px",
    padding: "18px",
    maxHeight: "27rem",
    height: "fit-content",
    marginLeft: "-3px",
    marginRight: "-11px",
    [theme.breakpoints.down("sm")]: {
      margin: 0,
    },
  },
  divMap: {
    background: "#F5F5F5",
    borderRadius: "10px",
    height: "76px",
    padding: "20px",
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  divMapFirst: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  divMapSecond: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  locationContainer: {
    paddingTop: "20px",
    paddingBottom: "20px",
  },
  description: {
    color: "#D39B2D",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "24px",
  },

  textNext: {
    color: "#707070",
    fontSize: "16px",
    fontWeight: " 400",
  },

  report: {
    background: "#D39B2D",
    display: "flex",
    justifyContent: "space-between",
    borderRadius: "5px",
    padding: "25px",
    marginTop: "20px",
  },
  imageBox: {
    "& .imgStyle": {
      width: "100% !important",
      height: "205px !important",
      borderRadius: "10px",
    },
  },
  heartFillIcon: {
    color: "#000000",
    width: "36px",
    height: "31px",
  },

  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  select: {
    width: "100%",
    padding: theme.spacing(1),
    border: "1px solid #ccc",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    "& .MuiSelect-select.MuiSelect-select": {
      color: "#000 !important",
    },
  },
  textField: {
    lineHeight: "5",
  },
  TextBox: {
    borderRadius: "10px",

    "& .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #ccc !important",
      borderRadius: "4px",
    },
    "& .MuiOutlinedInput-root:hover": {
      border: "1px solid #ccc !important",
    },
    "& .MuiOutlinedInput-input": {
      padding: "0px !important",
    },
  },
  submit: {
    background: "#D39B2D",
    maxWidth: "210px",
    width: "100%",
  },
  carousel: {
    "& .css-ktslay-MuiButtonBase-root-MuiIconButton-root": {
      backgroundColor: "#0C576C !important",
      marginTop: "-22px",
    },
  },
  textMain: {
    width: "198px",
    height: "36px",
    left: "26px",
    top: "121px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600 !important",
    fontSize: "24px",
    lineHeight: "36px",
    padding: "10px 0px 10px 0px",
    color: "#D39B2D",
  },
  categName: {
    fontFamily: "Poppins",
    fontWeight: "900 !important",
    fontSize: "18px",
    color: "#002F34",
    lineHeight: "23.94px",
  },
  categNameValue: {
    fontFamily: "Poppins",
    fontWeight: "700 !important",
    fontSize: "14px",
    color: "#002F34",
  },
  productImg: {
    width: "100%",
    height: "400px",
    borderRadius: "10px",
    objectFit: "unset",
  },

  //new styles
  secondGridItem: {
    // background: "lightgray",
  },

  firstBox: {
    padding: "20px",
    height: "auto",
    background: "#F5F5F5",
    borderRadius: "6px",
  },

  nameAndPriceBox: {
    display: "flex",
    justifyContent: "space-between",
  },

  productName: {
    color: "#0C576C",
    fontFamily: "Poppins",
    fontSize: "32px",
    fontStyle: "normal",
    wordBreak: "break-word",
    // fontWeight: "500 !important",
  },

  supScript: {
    color: "#D39B2D)",
    fontSize: "18px",
    fontWeight: "400",
  },

  textPricePara: {
    color: "#D39B2D",
    fontSize: "32px",
    fontWeight: "600",
    margin: "0",
  },

  heartContainer: {
    padding: "10px 0",
  },

  descriptionContainer: {
    marginTop: "35px",
    height: "auto",
    padding: "10px 0",
  },

  idAndDateContainer: {
    paddingTop: "30px",
    borderTop: "1px solid #707070",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  advertisementId: {
    color: "#0C576C",
    fontSize: "14px",
    fontWeight: "400",
  },

  buyAndAdContainer: {
    marginTop: "18px",
    display: "flex",
    justifyContent: "flex-start",
    gap: "20px",
  },

  postedByTxt: {
    color: "#707070",
    fontSize: "16.183px",
    fontWeight: "400",
  },

  postedByName: {
    color: "#242424",
    fontSize: "16.183px",
    fontWeight: "600 !important",
  },

  viewProfile: {
    color: "#D39B2D",
    fontSize: "16.183px",
    fontWeight: "400",
    cursor: "pointer",
  },
  mainPageContainer: {
    padding: "35px 0",
  },
  carouselMain: {

    "& .carousel-container": {
      height: "100% !important",
      maxHeight: "500px !important",
      overflow: "hidden !important",
    },
    "& .carousel-item": {
      maxWidth: "unset !important",
      maxHeight: "unset !important",
    },

    "& .thumbnails": {
      overflow: "hidden",
      height: "100%",
      maxHeight: "53px",
    },
  },


  dialogContent: {
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "400px",
      top: "0px",
      width: "100%",
      maxHeight: "230.71px",
      height: "100%",
      background: "#0C576C",
      borderRadius: "14.7507px",
      "@media (max-width: 500px) and (min-width: 280px)": {
        height: "100%",
      },
    },
  },
  deleteBox: {
    height: "100%",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
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
    background: "#D39B2D",
    color: "black",
    borderRadius: "7.37537px",
    "@media (max-width: 500px) and (min-width: 280px)": {
      width: "70px",
    },
  },
  noButton: {
    width: "150px",
    height: "45px",
    border: "1.47507px solid #D39B2D",
    color: "#D39B2D",
    borderRadius: " 7.37537px",
    "@media (max-width: 500px) and (min-width: 280px)": {
      width: "70px",
      height: "35px",
    },
  },
}));
export default function (props) {
  let product;
  const location = useLocation();


  const userId = props?.location?.state?.id;
  const Id = props?.location?.state?.userId;
  useEffect(() => {
    // Function to retrieve the productId from the URL

    getProductIdFromUrl();
  }, [location.search]);

  const getProductIdFromUrl = () => {
    const searchParams = new URLSearchParams(location.search);
    product = searchParams.get("productId");
  
  };

  const classes = useStyles();
  const history = useHistory();
  const [sellersData, setSellersData] = useState([]);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [description, setDescription] = useState(0);
  const [idData] = useState([]);
  const [dataProfile, setDataProfile] = useState([]);
  const [error, setError] = useState("");
  const [idToMatch, setidToMatch] = useState("");
  const [openProdDelete, setOpenProdDelete] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [prodDeleteId, setProdDeleteId] = useState("");
  const [showFullBody, setShowFullBody] = useState(false);

  const handleReport = (e) => {
    setDescription(e.target.value);

    if (e.target.value.length <= 0 && description.length == 0) { setError("fdvdf"); } else { setError(""); }
  }; const
    handleOpen = () => {
      setOpen(true);
    };

  const handleClose = () => {
    setOpen(false);
  };
  var localId = window.localStorage.getItem("_id");
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // get product data api
  const sellersProfile = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.viewProduct,

        params: {
          productId: userId ? userId : product,
          userId: localStorage.getItem("_id")
            ? localStorage.getItem("_id")
            : null,
        },
      });

      if (res.data.responseCode === 200) {
        setSellersData(res.data.result);
        setidToMatch(res.data.result.userId._id);
        setData(res.data.result.userId.name);
        setDataProfile(res.data.result.userId.profilePic);
        sessionStorage.setItem("idPay", res?.data?.result._id);
      } else {
      
      }
    } catch (error) {
      if (error?.response?.data?.responseCode === 500) {
        history.push("/");
        toast.error("Something went wrong");
      }
      if (
        error?.response.data.responseCode === 404 &&
        error?.response.data.responseMessage === "Product not found."
      ) {
        history.push("/");
        toast.error(error?.response.data.responseMessage);
      }

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
        setIsLoadingDelete(false);
        setOpenProdDelete(false);
        toast.success("Deleted Successfully.");
      } else {
        setIsLoadingDelete(false);
        setOpenProdDelete(false);
     
      }
    } catch (error) {
      setIsLoadingDelete(false);
      setOpenProdDelete(false);

    }
  };
  const handleDeleteStatus = (id) => {
    DeleteData(id);
  };
  const handleDeletModal = () => {
    setOpenProdDelete(false);
  };

  useEffect(() => {
    sellersProfile();
  }, []);
  const [imageData, setImageData] = useState({
    imageData: Array.from({ length: 3 }, () => ({
      image: "",
      caption: "",
    })),
  });

  useEffect(() => {
    if (Array.isArray(sellersData?.productImage)) {
      setImageData((prevState) => ({
        ...prevState,
        imageData: sellersData?.productImage.map((item, index) => ({
          image: item || null,
          caption: " ",
        })),
      }));
    }
  }, [sellersData]);

  // add to wishlist api
  const addToWishlist = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await Axios({
        method: "POST",
        url: ApiConfig.addToWishlist,
        headers: {
          token: token,
        },
        data: {
          productId: userId,
        },
      });
      if (res.data.responseCode === 200) {
        toast.success("Added to wishlist successfully");

        sellersProfile();
      } else {
        toast.success(res.data.responseMessage);
      }
    } catch (error) {
      if (!localStorage.getItem("_id")) {
        toast.warn("Please login to your account.");
      } else {
        toast.error(error.response.data.responseMessage);
      }
    }
  };

  const handleBuyNow = () => {
    toast.warn("Please login to your account.");
    history.push("/");
  };

  const handleLogoutProfile = () => {
    toast.warn("Please login to your account.");
  };

  const handleClickViewMore = () => {
    setShowFullBody(!showFullBody);
  };

  // report the ad api
  const createReport = async () => {
    if (description == "") {
      setError("Please specify the reason.");
    } else {
      const token = localStorage.getItem("token");
      try {
        const res = await Axios({
          method: "POST",
          url: ApiConfig.createReport,
          headers: {
            token: token,
          },
          data: {
            productId: userId,
            reasonType: selectedOption,
            description: description,
          },
        });
        if (res.data.responseCode === 200) {
          toast.success(
            "Your report has been received and is being reviewed. Thank you for your feedback."
          );
          setSelectedOption("");
          handleClose();
          // window.location.reload();
        } else {
          toast.warn(res.data.responseMessage);
        }
      } catch (error) {
        toast.error("Please specify the type of reason to report");
      }
    }
  };

  function Item(props) {
    return (
      <img src={props.item} alt="DashImage" className={classes.productImg} />
    );
  }

  return (
    <div>
      <Page title="home">
        <Box className={classes.mainPageContainer}>
          <Box className={classes.textContainer}>
            <Typography className={classes.search}>
              <Link to="/" className={classes.search}>
                Home
              </Link>
              {">"}product{">"}
              {sellersData?.productName?.length > 30
                ? sellersData?.productName
                : sellersData?.productName}
            </Typography>
          </Box>
          <Grid container spacing={2} className={classes.gridContainerMain}>
            <Grid item xs={12} sm={12} md={6}>
              <Carousel className={classes.carouselMain} data={imageData.imageData} time={2000} width="100%"
                height="500px" maxHeight="500px" overflow="hidden" radius="10px" slideNumber={true} automatic={true}
                dots={true} pauseIconColor="white" pauseIconSize="40px" slideBackgroundColor="darkgrey" thumbnails={true}
                slideImageFit="contain" thumbnailWidth="100px" style={{ textAlign: "center", }} />
            </Grid>

            <Grid item xs={12} sm={12} md={6} className={classes.secondGridItem}>
              <Box className={classes.firstBox}>
                <Box className={classes.nameAndPriceBox}>
                  <Box className={classes.text1}>
                    <Typography className={classes.productName}>
                      {" "}
                      {sellersData?.productName?.length > 30
                        ? sellersData?.productName
                        : sellersData?.productName}
                    </Typography>

                    <Typography className={classes.textPrice}>
                      <p className={classes.textPricePara}>
                        {sellersData.price}{sellersData.currency}
                      </p>
                    </Typography>
                  </Box>

                  <Box className={classes.heartContainer}>
                    {localStorage.getItem("_id") ? (
                      sellersData.inWishlist ? (
                        <BsHeartFill className={classes.heartFillIcon} />
                      ) : (
                        <BsHeart style={{ cursor: "pointer" }} onClick={addToWishlist} className={classes.heartFillIcon} />
                      )
                    ) : (
                      <BsHeart style={{ cursor: "pointer" }} onClick={() => {
                        if (!localStorage.getItem("_id")) {
                          toast.warn("Please login to your account.");
                        }
                      }}
                        className={classes.heartFillIcon}
                      />
                    )}
                  </Box>
                </Box>

                <Box className={classes.descriptionContainer}>
                  <Typography className={classes.textNext}>
                    {/* {" "}
                    {sellersData?.description?.length > 120
                      ? sellersData?.description
                      : sellersData?.description} */}


                    {sellersData?.description &&

                      sellersData?.description.length > 50
                      ? showFullBody
                        ? sellersData?.description
                        : sellersData?.description.slice(0, 50) +
                        "..."
                      : sellersData?.description || "--"}

                    {sellersData?.description &&
                      sellersData?.description.length > 50 && (
                        <Button
                          style={{
                            color: showFullBody
                              ? "#004e63"
                              : "#0C576C",
                            //border: showFullCategoryName ? '1px solid red' : '1px solid blue',
                          }}
                          className={classes.ViewMoreLink}
                          onClick={handleClickViewMore}
                        >
                          {showFullBody
                            ? "View Less"
                            : "View More"}
                        </Button>
                      )}
                  </Typography>
                </Box>

                <Box className={classes.idAndDateContainer}>
                  <Typography className={classes.text}>
                    <span className={classes.advertisementId}>
                      Advertisement ID:{" "}
                    </span>{" "}
                    {sellersData.productGenerateId}
                  </Typography>
                  <Box>
                    <Typography className={classes.textRight}>
                      {sellersData.createdAt &&
                        moment(sellersData.createdAt).format("DD-MMM-YY")}
                    </Typography>
                    <Typography className={classes.textRightLoc}>
                      {sellersData.location ? sellersData.location : "N/A"}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box className={classes.buyAndAdContainer}>
                {localStorage.getItem("token") ? (
                  sellersData.status == "SOLD" ? (
                    <>
                      <Button className={classes.buyButton} onClick={() =>
                        history.push({
                          pathname: "/payment",
                          state: { id: idData },
                        })
                      }
                        disabled
                      >
                        Buy Now
                      </Button>
                    </>
                  ) : (
                    <>
                      {localId == idToMatch ? (
                        <>
                          {" "}
                          <Button className={classes.buyButton} onClick={() => {
                            setProdDeleteId(sellersData._id);
                            setOpenProdDelete(true);
                          }}
                          >
                            Delete Post
                          </Button>
                        </>
                      ) : (
                        <Button className={classes.buyButton} onClick={() =>
                          history.push({
                            pathname: "/payment",
                            state: { id: idData },
                          })
                        }
                        >
                          Buy Now
                        </Button>
                      )}
                    </>
                  )
                ) : (
                  <>
                    <Button className={classes.buyButton} onClick={() => handleBuyNow()}
                    >
                      Buy Now
                    </Button>
                  </>
                )}

                {localId == idToMatch ? (
                  <Button style={{ textAlign: "end", cursor: "pointer" }} className={classes.reportBtn} onClick={() => {
                    history.push({
                      pathname: "/edit-ads",
                      state: { data: sellersData },
                    });
                  }}
                  >
                    Update Advertisement
                  </Button>
                ) : (
                  <>
                    <Button className={classes.chatBtn} onClick={() =>
                      history.push({
                        pathname: "/chat-history",
                        state: {
                          profile: sellersData.userId.profilePic,
                          name: sellersData.userId.name,
                          sellId: sellersData.userId._id,
                        },
                      })
                    }
                    >
                      Chat with seller
                    </Button>
                    <Button onClick={() => {
                      if (localStorage.getItem("token") && userId) {
                        handleOpen();
                      } else {
                        handleLogoutProfile();
                      }
                    }}
                      style={{ textAlign: "end", cursor: "pointer" }}
                      className={classes.reportBtn}
                    >
                      Report Advertisement
                    </Button>
                  </>
                )}
              </Box>

              <div className={classes.divMap}>
                <div className={classes.divMapFirst}>
                  {dataProfile ? (
                    <img alt="No image" src={dataProfile == "undefined" ? "images/profile.svg" : dataProfile} style={{
                      borderRadius: "50%", width: "50px", height: "50px",
                    }} />
                  ) : (
                    <img alt="No image" src="images/profile.svg" style={{
                      borderRadius: "50%", width: "50px",
                      height: "50px",
                    }} />
                  )}

                  {localStorage.getItem("token") ? (
                    <Typography className={classes.postedByName} onClick={() =>
                      history.push({
                        pathname: "/sellers",
                        state: Id,
                      })
                    }
                    >
                      <span className={classes.postedByTxt}>Posted by </span>

                      {data
                        ? data?.length > 30
                          ? data.slice(0, 30) + "..."
                          : data
                        : "--"}
                    </Typography>
                  ) : (
                    <Typography className={classes.text} onClick={() => handleLogoutProfile()}
                    >
                      <span className={classes.postedByTxt}>Posted by </span>
                      {data
                        ? data?.length > 30
                          ? data.slice(0, 30) + "..."
                          : data
                        : "--"}
                    </Typography>
                  )}
                </div>

                <div className={classes.divMapSecond}>
                  {localStorage.getItem("token") ? (
                    <div style={{ display: "flex", alignItems: "center" }} onClick={() =>
                      history.push({
                        pathname: "/sellers",
                        state: Id,
                      })
                    }
                    >
                      <Typography variant="body1" className={classes.viewProfile}>
                        View Profile
                      </Typography>
                      <MdArrowForwardIos style={{ color: "#0A2830" }} />
                    </div>
                  ) : (
                    <>
                      <Typography variant="body1" className={classes.viewProfile}>
                        View Profile
                      </Typography>
                      <MdArrowForwardIos style={{ color: "#0A2830" }} onClick={() => handleLogoutProfile()}
                      />
                    </>
                  )}
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>

        <Modal open={open} onClose={handleClose} aria-labelledby="responsive-modal-title"
          aria-describedby="responsive-modal-description" disableScrollLock={true} disablePortal={true}
          disableEnforceFocus={true}>
          <div className={classes.paper}>
            <Typography variant="h6" id="responsive-modal-title" className={classes.description} style={{
              textAlign: "center"
            }}>
              Report
            </Typography>
            <Select value={selectedOption} onChange={handleChange} className={classes.select} displayEmpty>
              <MenuItem value="">
                <em>Select an option</em>
              </MenuItem>
              {reportContent.map((value) => {
                return <MenuItem value={value}>{value}</MenuItem>

              })}
            </Select>
            <TextField onChange={handleReport} placeholder="Please specify the reason" variant="outlined" multiline
              inputProps={{ maxLength: 256 }} rows={4} className={classes.textField} InputProps={{
                className:
                  classes.TextBox,
              }} />
            <Typography style={{ color: "red", fontSize: "14px" }}>
              {error}
            </Typography>
            <Box style={{ display: "flex", justifyContent: "space-around" }}>
              {" "}
              <Button className={classes.submit} onClick={handleClose}>
                Close
              </Button>
              <Button className={classes.submit} type="submit" onClick={() => createReport()}
              >
                Submit
              </Button>
            </Box>
          </div>
        </Modal>

        <Dialog open={openProdDelete} onClose={handleDeletModal} className={classes.dialogContent}>
          <Box className={classes.deleteBox}>
            <Typography className={classes.logoutTypo}>
              Are you sure you want to delete this product?
            </Typography>
            <Box className={classes.gridButtons}>
              <div>
                <Button className={classes.yesButton} disabled={isLoadingDelete} onClick={() =>
                  handleDeleteStatus(prodDeleteId)}
                >
                  Yes
                  {isLoadingDelete &&
                    <ButtonCircularProgress />}
                </Button>
              </div>

              <div>
                <Button className={classes.noButton} onClick={() => handleDeletModal()}
                >
                  No
                </Button>
              </div>
            </Box>
          </Box>
        </Dialog>
      </Page>
    </div>
  );
}