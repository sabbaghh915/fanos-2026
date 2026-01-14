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
    minHeight:'55vh',
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

  const [termsConditionData, setTermsConditionData] = useState();

  const getTermsConditionsData = async () => {
    try {
      const res = await Axios({
        method: "GET",
        // url: `https://nodepune-classifiedads.mobiloitte.io/api/v1/static/viewStaticContent/${"TermsConditions"}`, //staging url
        url: `https://node.fanos.one/api/v1/static/viewStaticContent/${"TermsConditions"}`, // live url
      });

      if (res.data.responseCode === 200) {
        setTermsConditionData(res.data.result);
      } else {
        toast.warn(res.data.responseMessage);
      }
    } catch (error) {
      toast.error(error.response.data.responseMessage);
    }
  };
  useEffect(() => {
    getTermsConditionsData();
  }, []);
  return (
    <Box className={classes.mainBox}>
      //<Grid container>
        //<Grid item lg={10} md={10} xs={10} sm={10}>
          <Box style={{ display: "flex" }}>
            <Typography className={classes.heading}>Terms & Conditions:</Typography>
            
          </Box>
        //</Grid>
       // <Grid></Grid>
      //</Grid>
      <Typography className={classes.subheader}>
        {termsConditionData ? (
          termsConditionData?.description.length > 100000 ? (
            ReactHtmlParser(termsConditionData?.description?.slice(0, 100000)) + "..."
          ) : (
           ReactHtmlParser(termsConditionData?.description) 
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
