import {
  Typography,
  Box,
  Grid,
  Button,
  Dialog,
  TextField,
  FormHelperText,
  Link,
} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import ListProduct from "src/component/listedProduct.js";
import Axios from "axios";
import ApiConfig from "src/config/APIConfig";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { Formik, Form } from "formik";
import * as yup from "yup";

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

  search: {
    color: "#8B5CF6",
    fontSize: "16.183px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "10.697px",
    paddingBottom: "20px",
  },
  searchLink: {
    color: "#8B5CF6",
    fontSize: "16.183px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "10.697px",
  },
  mainGrid: {
    background: "#F5F5F5",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  image: {
    width: "129px",
    height: "129px",
    borderRadius: "50%",
  },
  name: {
    color: "#242424",
    fontFamily: "Poppins",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: 600,
    paddingTop: "20px",
  },
  days: {
    color: "#FF6B35",
  },
  buttonFollow: {
    background: "#FF6B35",
    color: "#F5F5F5",
    textAlign: "center",
    fontFamily: "Poppins",
    fontSize: "16px",
    fontWeight: 600,
    marginTop: "20px",
  },
  typoText: {
    color: "#242424",
    fontFamily: "Poppins",
    fontSize: "18px",
    fontWeight: 600,
  },
  divRight: {
    border: "2px solid #FF6B35",
    height: "130px",
    marginTop: "38px",
  },
  follow: {
    color: "#707070",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: 400,
  },
  sellerData: {
    color: "#707070",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: 400,
    paddingBottom: "20px",
  },
  undir: {
    background: "#FF6B35",
    color: "#F5F5F5",
    textAlign: "center",
    fontFamily: "Poppins",
    fontSize: "16px",
    fontWeight: 600,
    marginTop: "10px",
  },
  followerGrid: {
    textAlign: "center",
  },
  exclIcon: {
    cursor: "pointer",
    color: "#F14336",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: 400,
    textAlign: "center",
    textDecoration: "underline",
    marginTop: "20px",
  },
  dialogContent: {
    "& .MuiDialog-paperWidthSm": {
      borderRadius: "11px",
      background: "#8B5CF6",
      width: "100%",
      maxWidth: "400px",
    },
  },
  customFormControlLabelRoot: {
    marginLeft: "0",
    marginTop: "0",
    "& .Mui-checked .MuiSvgIcon-root": {
      fill: "#FF6B35",
    },
  },
  deleteBox: {
    padding: "10px 30px 26px 30px",
  },
  logoutTypoHeading: {
    marginTop: "10px",
    textAlign: "center",
    color: "#FFF",
    fontSize: "21.009px",
    fontWeight: "600",
  },

  successTypoHeading: {
    color: "#FF6B35",
    fontSize: "20px",
    fontWeight: "600 !important",
    textAlign: "center",
  },

  successTypo: {
    color: "#F5F5F5",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "400 !important",
  },

  logoutTypo: {
    color: "#FF6B35",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "21.009px",
  },
  typomethod: {
    color: "#FFF",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "21.009px",
  },
  gridButtons: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  confirmButton: {
    borderRadius: "6px",
    background: "#FF6B35",
    padding: "9px 45px",
    color: "#F5F5F5",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "600 !important",
  },
  reasonTextField: {
    height: "134px",
    borderRadius: "11px",
    background: "#FFF",
    marginTop: "1rem",
  },
  placeholder: {
    padding: "10px",
    height: "215px",
    fontSize: "14px",
    fontWeight: "400",
    "&::placeholder": {
      color: "rgba(10, 40, 48, 0.20)",
      fontSize: "16px",
      fontWeight: "400 !important",
    },
  },
  deleteBox2: {
    padding: "10px 30px 26px 30px",
    height: "423px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  submitContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },

  submitButton: {
    color: "#FFF",
    fontFamily: "Poppins",
    fontSize: "18.674px",
    fontWeight: "600 !important",
    borderRadius: "5.836px",
    background: "#FF6B35",
    width: "100%",
    maxWidth: "185px",
  },
  followBox: {
    borderRadius: "6px",
    border: "1px solid #FFF",
    background: "rgba(255, 255, 255, 0.20)",
    textAlign: "center",
    padding: "10px",
  },
}));
const Sellers = function (props) {
  const classes = useStyles();
  const history = useHistory();
  const sellId = props.location.state;
  const [sellersData, setSellersData] = useState([]);
  const [openReportHandle, setOpenReportHandle] = useState(false);
  const [openReportReasonHandle, setOpenReportReasonHandle] = useState(false);
  const [isLoadingReport, setLoadingReport] = useState(false);
  const [value, setValue] = useState("coupon");
  const [reportType, setReportType] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  var localId = window.localStorage.getItem("_id");
  const handleChange = (event) => {
    setReportType(event.target.value);
    setValue(event.target.value);
  };

  const closeSuccessHandle = () => {
    setOpenSuccess(false);
  };
  const closeReportHandle = () => {
    setOpenReportHandle(false);
  };
  const closeReportReasonHandle = () => {
    setOpenReportReasonHandle(false);
  };

  const followUnfollow = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await Axios({
        method: "PUT",
        // url: `https://nodepune-classifiedads.mobiloitte.io/api/v1/user/followUnfollowUser/${sellId}`, //staging url
        url: `https://husamtest.one/api/v1/user/followUnfollowUser/${sellId}`, // live url
        headers: {
          token: token,
        },
      });

      if (res.data.responseCode === 200) {
        sellersProfile();
      }
    } catch (error) {}
  };

  const sellersProfile = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await Axios({
        method: "POST",
        url: ApiConfig.sellersProfile,
        headers: {
          token: token,
        },
        data: {
          _id: sellId,
        },
      });

      if (res.data.responseCode === 200) {
        setSellersData(res.data.result);
      }
    } catch (error) {}
  };

  const handleReportSeller = async (values) => {
    setLoadingReport(false);
    const token = localStorage.getItem("token");
    try {
      setLoadingReport(true);
      const res = await Axios({
        method: "POST",
        url: ApiConfig.resportSeller,
        headers: {
          token: token,
        },
        data: {
          sellerId: sellId,
          reasonType: reportType,
          description: values.description,
        },
      });

      if (res.data.responseCode === 200) {
        setLoadingReport(false);
        setOpenSuccess(true);
        setOpenReportHandle(false);
        setOpenReportReasonHandle(false);
      }
    } catch (error) {}
  };
  useEffect(() => {
    sellersProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page title={"home"}>
      <Box className={classes.bannerbox}>
        <Box className={classes.mainbox}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography className={classes.search}>
              <Link href="/" className={classes.searchLink}>
                Home
              </Link>{" "}
              {">"}{" "}
              {localId === sellId ? <>My Profile</> : <>Seller's Profile</>}
            </Typography>
          </div>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6} md={3}>
              <Box className={classes.mainGrid}>
                {sellersData?.profilePic === undefined ||
                sellersData?.profilePic === null ? (
                  <img
                    className={classes.image}
                    alt="img"
                    src="images/profilePic.svg"
                  />
                ) : (
                  <img
                    className={classes.image}
                    alt="img"
                    src={
                      sellersData?.profilePic
                        ? sellersData.profilePic
                        : "images/profilePic.svg"
                    }
                  />
                )}
                <Typography className={classes.name}>
                  {sellersData.name ? sellersData.name : "---"}
                </Typography>
                <Typography className={classes.sellerData}>
                  {sellersData.joinedDate}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box className={classes.followBox}>
                      <Typography className={classes.follow}>
                        Followers
                      </Typography>
                      <Typography className={classes.typoText}>
                        {sellersData.followersCount
                          ? sellersData.followersCount
                          : "0"}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box className={classes.followBox}>
                      <Typography className={classes.follow}>
                        Following
                      </Typography>
                      <Typography className={classes.typoText}>
                        {sellersData.followingCount
                          ? sellersData.followingCount
                          : "0"}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                {localId === sellId ? (
                  <></>
                ) : (
                  <>
                    <Button
                      fullWidth
                      disabled={localStorage.getItem("_id") === sellId}
                      className={classes.buttonFollow}
                      onClick={() => followUnfollow()}
                    >
                      {sellersData.status === true ? "unfollow" : "follow"}
                    </Button>
                    <Button
                      className={classes.undir}
                      fullWidth
                      disabled={localStorage.getItem("_id") === sellId}
                      onClick={() =>
                        history.push({
                          pathname: "/chat-history",
                          state: {
                            profile: sellersData.profilePic,
                            name: sellersData.name,
                            sellId: sellId,
                          },
                        })
                      }
                    >
                      Chat with seller
                    </Button>
                  </>
                )}
              </Box>
              {localId === sellId ? (
                <></>
              ) : (
                <Typography
                  className={classes.exclIcon}
                  onClick={() => setOpenReportHandle(true)}
                >
                  Report User
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={9}>
              <Box>
                <ListProduct sellId={sellId} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Report dialog */}
      <Dialog
        open={openReportHandle}
        onClose={closeReportHandle}
        className={classes.dialogContent}
      >
        <Box className={classes.deleteBox}>
          <Typography className={classes.logoutTypoHeading}>
            Report User
          </Typography>
          <Typography
            className={classes.logoutTypo}
            style={{ marginTop: "1rem" }}
          >
            Please select the reason for reporting this user
          </Typography>
          <Grid>
            <FormControl component="fieldset" style={{ marginTop: "1rem" }}>
              <RadioGroup
                aria-label="payment"
                name="payment"
                value={value}
                onChange={handleChange}
                className={classes.radioClass}
              >
                <FormControlLabel
                  value="Duplicate ad"
                  control={<Radio />}
                  onChange={handleChange}
                  className={classes.customFormControlLabelRoot}
                  label={
                    <span className={classes.typomethod}>Duplicate ad</span>
                  }
                />
                <FormControlLabel
                  value="Inappropriate Content"
                  control={<Radio />}
                  className={classes.customFormControlLabelRoot}
                  label={
                    <span className={classes.typomethod}>
                      Inappropriate Content
                    </span>
                  }
                  onChange={handleChange}
                />
                <FormControlLabel
                  value="Misleading Information"
                  control={<Radio />}
                  className={classes.customFormControlLabelRoot}
                  label={
                    <span className={classes.typomethod}>
                      Misleading Information
                    </span>
                  }
                  onChange={handleChange}
                />
                <FormControlLabel
                  value="Offensive Language"
                  control={<Radio />}
                  className={classes.customFormControlLabelRoot}
                  label={
                    <span className={classes.typomethod}>
                      Offensive Language
                    </span>
                  }
                  onChange={handleChange}
                />
                <FormControlLabel
                  value="Scam OR Fraud"
                  control={<Radio />}
                  className={classes.customFormControlLabelRoot}
                  label={
                    <span className={classes.typomethod}>Scam or Fraud</span>
                  }
                  onChange={handleChange}
                />
                <FormControlLabel
                  value="Other (Please Specify)"
                  control={<Radio />}
                  className={classes.customFormControlLabelRoot}
                  label={
                    <span className={classes.typomethod}>
                      Other (Please Specify)
                    </span>
                  }
                  onClick={() => setOpenReportReasonHandle(true)}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid container className={classes.gridButtons}>
            <div className={classes.submitContainer}>
              <Button
                className={classes.submitButton}
                disabled={!reportType}
                onClick={handleReportSeller}
              >
                Submit
                {isLoadingReport && <ButtonCircularProgress />}
              </Button>
            </div>
          </Grid>
        </Box>
      </Dialog>

      {/* Description Dialog */}
      <Dialog
        open={openReportReasonHandle}
        onClose={closeReportReasonHandle}
        className={classes.dialogContent}
      >
        <Box className={classes.deleteBox2}>
          <Typography className={classes.logoutTypoHeading}>
            Report User
          </Typography>
          <Typography
            className={classes.logoutTypo}
            style={{ marginTop: "1rem" }}
          >
            Please describe your reason for reporting.
          </Typography>
          <Formik
            onSubmit={(values) => handleReportSeller(values)}
            initialValues={{
              description: "",
            }}
            initialStatus={{
              success: false,
              successMsg: "",
            }}
            validationSchema={yup.object().shape({
              description: yup
                .string()
                .required("Description is required")
                .test(
                  "minLength",
                  "Please enter at least 50 characters",
                  (value) => value.length >= 50
                )
                .test(
                  "maxLength",
                  "Enter a description (50-500 chars) for your report.",
                  (value) => value.length <= 500
                )
                .matches(
                  /^[A-Za-z0-9 .,!?()-]*$/,
                  "Description can only contain letters, digits, spaces, periods, commas, exclamation marks, question marks, and parentheses."
                ),
            })}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values,
            }) => (
              <Form>
                <Grid>
                  <TextField
                    placeholder="Your reason.."
                    className={classes.reasonTextField}
                    value={values.description}
                    name="description"
                    onBlur={handleBlur}
                    required
                    onChange={handleChange}
                    inputProps={{ maxLength: 500 }}
                    error={Boolean(touched.description && errors.description)}
                    multiline
                    rows={12}
                    InputProps={{
                      classes: {
                        input: classes.placeholder,
                      },
                    }}
                    fullWidth
                  />
                  <FormHelperText
                    error
                    style={{ fontSize: "12px", fontFamily: "Poppins" }}
                  >
                    {touched.description && errors.description}
                  </FormHelperText>
                </Grid>
                <Grid container className={classes.gridButtons}>
                  <div className={classes.submitContainer}>
                    <Button
                      className={classes.submitButton}
                      disabled={isLoadingReport}
                      type="submit"
                    >
                      Submit
                      {isLoadingReport && <ButtonCircularProgress />}
                    </Button>
                  </div>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Dialog>

      {/* Success dialog */}
      <Dialog
        open={openSuccess}
        onClose={closeSuccessHandle}
        className={classes.dialogContent}
      >
        <Box className={classes.deleteBox}>
          <Typography className={classes.successTypoHeading}>
            Report Recieved
          </Typography>
          <Typography
            className={classes.successTypo}
            style={{
              textAlign: "center",
              marginTop: "1rem",
            }}
          >
            Your report has been received. Our <br />
            moderation team will review and address <br />
            the issue. Contact us if you need further <br />
            assistance.
          </Typography>
          <Grid container className={classes.gridButtons}>
            <div>
              <Button
                className={classes.confirmButton}
                onClick={() => history.push("/")}
              >
                Back to Homepage
              </Button>
            </div>
          </Grid>
        </Box>
      </Dialog>
    </Page>
  );
};

export default Sellers;
