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

  const [faqsData, setfaqsData] = useState();

  const getfaqsData = async () => {
    try {
      const res = await Axios({
        method: "GET",
        // url: `https://nodepune-classifiedads.mobiloitte.io/api/v1/static/viewStaticContent/${"TermsConditions"}`, //staging url
        url: `http://localhost:3032/api/v1/static/viewStaticContent/${"faqs"}`, // live url
      });

      if (res.data.responseCode === 200) {
        setfaqsData(res.data.result);
      } else {
        toast.warn(res.data.responseMessage);
      }
    } catch (error) {
      toast.error(error.response.data.responseMessage);
    }
  };
  useEffect(() => {
    getfaqsData();
  }, []);
  return (
    <Box className={classes.mainBox}>
      //<Grid container>
        //<Grid item lg={10} md={10} xs={10} sm={10}>
          <Box style={{ display: "flex" }}>
            <Typography className={classes.heading}>FAQ's</Typography>
            
          </Box>
        //</Grid>
       // <Grid></Grid>
      //</Grid>
      <Typography className={classes.subheader}>
        {faqsData ? (
          faqsData?.description.length > 100000 ? (
            ReactHtmlParser(faqsData?.description?.slice(0, 100000)) + "..."
          ) : (
           ReactHtmlParser(faqsData?.description) 
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
