import { Typography, Box, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import { toast } from "react-toastify";
import NoDataFound from "./DataNotFound.js";
import ReactHtmlParser from 'react-html-parser';
const useStyles = makeStyles((theme) => ({
  mainBox: {
    paddingTop: "10px",
  },
  heading: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "28px",
    lineHeight: "16px",
    color: "#000000",
    paddingBottom: "30px",
    paddingTop: "30px",
  },
  subheader: {
    color: "#000",
    fontSize: "14px",
    paddingBottom: "30px",
  },
}));
export default function (props) {
  const classes = useStyles();
  const [statusData, setStatusData] = useState();

  const getAboutUsData = async () => {
    try {
      const res = await Axios({
        method: "GET",
        // url: `https://nodepune-classifiedads.mobiloitte.io/api/v1/static/viewStaticContent/${"aboutUS"}`, // staging url
        url: `https://node.fanos.one/api/v1/static/viewStaticContent/${"aboutUS"}`, // live url
      });

      if (res.data.responseCode === 200) {
        setStatusData(res.data.result);
      } else {
        toast.warn(res.data.responseMessage);
      }
    } catch (error) { }
  };
  useEffect(() => {
    getAboutUsData();
  }, []);
  return (
    <Box className={classes.mainBox}>
      <Grid container>
        <Grid item lg={10} md={10} xs={10} sm={10}>
          <Box style={{ display: "flex" }}>
            <Typography className={classes.heading}>About Us</Typography>
          </Box>
        </Grid>
        <Grid></Grid>
      </Grid>

      <Typography className={classes.subheader}>
        {statusData ? (
          statusData?.description.length > 10000 ? (
            ReactHtmlParser(statusData?.description?.slice(0, 10000)) + "..."
          ) : (
            ReactHtmlParser(statusData?.description)
          )
        ) : (
          <>
            <NoDataFound />
          </>
        )}
      </Typography>
    </Box>
  );
}
