import { Typography, Box, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Cards from "./cards";
import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import AnalyticsGraphs from "./analyticsGraphs";
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
      
        fontSize: "25px",
        borderRadius: "16px",
      },
    },
    [theme.breakpoints.down("sm")]: {
      padding: "20px 16px 20px 16px",
      borderRadius: "16px",
    },
  },
}));
export default function (props) {
  const classes = useStyles();

  const [dashboard, setDashboard] = useState([]);
  useEffect(() => {
    getDashboardData();
  }, []);
  const getDashboardData = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.dashboardData,
        headers: {
          token: token,
        },
      });
      if (res.data.responseCode == 200) {
        const Data = res.data.result;
        setDashboard(Data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Page title={"Dashboard"}>
      <Box className={classes.bannerbox}>
        <Box className={classes.mainbox}>
          <Grid container className="d-flex justify-space-between">
            <Typography variant="h4">Dashboard</Typography>
          </Grid>

          <Box>
            <Cards data={dashboard} />
          </Box>
          <AnalyticsGraphs />
        </Box>
      </Box>
    </Page>
  );
}
