import { Typography, Box, Grid, Dialog } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import { useLocation } from "react-router-dom";
import ApiConfig from "src/config/APICongig";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import moment from "moment";

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
      /* identical to box height */

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
export default function (props) {
  const location = useLocation();
  const classes = useStyles();
  const userId = props?.location?.state;
  const [profileData, setProfileData] = useState([]);
  const [openPic, setOpenPic] = useState(false)
  const history = useHistory();
  const getUserById = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.userDetails,
        headers: {
          token: token,
        },
        params: {
          _id: id,
        },
      });
      if (res.data.responseCode == 200) {
        const Data = res.data.result;
        setProfileData(Data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getUserById(userId);
  }, []);
  const handleopenPicPopup = () => {
    setOpenPic(false);
  };
  return (
    <Page title={"Dashboard"}>
      <Box className={classes.bannerbox}>
        <Box className={classes.mainbox}>
          <Grid container className="d-flex justify-space-between">
            <Typography variant="h4">User Details</Typography>
          </Grid>

          <Box mt={4}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography>User Id:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {profileData._id ? profileData._id : "--"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Name:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {profileData.name ? profileData.name : "--"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Profile Pic:</Typography>
              </Grid>
              <Grid item xs={6}>
                {profileData.profilePic ? (
                  <img
                    src={profileData.profilePic}
                    style={{ width: "80px", height: "80px", cursor:'pointer' }}
                    onClick={() => setOpenPic(true)}
                  />
                ) : (
                  <Typography>Not Found</Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                <Typography>Email:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {profileData.email ? profileData.email : "--"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Status:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {profileData.status ? profileData.status : "--"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography> Created At:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {moment(
                    profileData.createdAt ? profileData.createdAt : "N/A"
                  ).format("lll")}{" "}
                </Typography>
              </Grid>
            </Grid>
            <Grid md={12} xs={12}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {" "}
                <Button
                  variant="contained"
                  fullWidth
                  className={classes.buttonbox}
                  onClick={() => history.push("/user-management")}
                >
                  BACK
                </Button>
              </div>
            </Grid>
          </Box>
        </Box> {openPic && (
          <Dialog
            open={openPic}
            onClose={handleopenPicPopup}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <img src={profileData.profilePic} />
          </Dialog>
        )}
      </Box>
     
    </Page>
  );
}
