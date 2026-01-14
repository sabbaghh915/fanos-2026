import { Typography, Box, Grid, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import { useHistory, Link } from "react-router-dom";
import Axios from "axios";
import ApiConfig from "src/config/APICongig";

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

  tableButton: {
    border: "none",
    background: "#0C576C ",
    borderRadius: "10px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "700 !important",
    fontSize: "14px",
    lineHeight: "21px",
    border: "none",
    height: "43px",
    /* identical to box height */

    color: "#FFFFFF",
  },
}));


export default function (props) {

  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState([]);
  const [profileData, setProfileData] = useState([]);

  const getUserById = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.viewAdminProfile,
        headers: {
          token: token,
        },
      });

      if (res.data.responseCode == 200) {
        const Data = res.data.result;
        setProfileData(Data);
        setEmail(Data?.email)
      }
      else {
        console.log("error")
      }

    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getUserById();
  }, []);


  return (
    <Page title={"Dashboard"}>
      <Box className={classes.bannerbox}>
        <Box className={classes.mainbox}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h4">My Profile</Typography>
            </Grid>
            <Grid item xs={6} align="end">
              <Link to={{
                pathname: "/edit-profile",
                state: { email: email }
              }}>
                {/* <Button className={classes.tableButton}>Edit Profile</Button> */}
              </Link>
            </Grid>
          </Grid>

          <Box mt={4}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography>Name:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{profileData.name ? profileData.name : "--"}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Mobile Number: </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {profileData.countryCode ? profileData.countryCode : "--"}
                  {" "}
                  {profileData.mobileNumber ? profileData.mobileNumber : "--"}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography>Email:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{profileData.email ? profileData.email : "--"}</Typography>
              </Grid>
              <Grid item xs={6}>

                <Typography>Address:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {profileData.address ? profileData.address : "--"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Created At:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {profileData.createdAt ? profileData.createdAt : "--"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Updated At:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {profileData.updatedAt ? profileData.updatedAt : "--"}
                </Typography>
              </Grid>

            </Grid>
          </Box>

        </Box>
      </Box>

    </Page>
  );
}