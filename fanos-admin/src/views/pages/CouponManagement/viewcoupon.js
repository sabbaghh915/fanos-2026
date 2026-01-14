import React, { useEffect, useState } from "react";
import { Typography, Box, Grid } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import { useLocation } from "react-router-dom";
import ApiConfig from "src/config/APICongig";
import Axios from "axios";
import { Button } from "@material-ui/core"
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

const ViewCouponManagement = (props) => {
  const location = useLocation();
  const classes = useStyles();
  const userId = props?.location?.state;
  const [profileData, setProfileData] = useState([]);
  const history = useHistory();
  const [historyData, setHistoryData] = useState([]);

  const getUserById = async (id) => {

    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.couponDetails,
        headers: {
          token: localStorage.getItem("token"),
        },
        params: {
          _id: userId,
        }
      });

      if (res.data.responseCode == 200) {
        const Data = res?.data?.result?.data;
        setProfileData(Data);
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
          <Grid container className="d-flex justify-space-between">
            <Typography variant="h4">Coupon Details</Typography>
          </Grid>
          <Box mt={4}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography>User Id:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{profileData._id ? profileData._id : "--"}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Coupon Amount:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{profileData.couponAmount ? profileData.couponAmount : "--"}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Coupon Code:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{profileData.couponCode ? profileData.couponCode : "--"}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Coupon Status:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{profileData.status ? profileData.status : "--"}</Typography>
              </Grid>
              <Grid md={12} xs={12} >
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {" "}
                  <Button
                    variant="contained"
                    fullWidth
                    className={classes.buttonbox}
                    onClick={() => history.push("/coupon-management")}
                  >
                    Back
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Page>
  );
}

export default ViewCouponManagement;



