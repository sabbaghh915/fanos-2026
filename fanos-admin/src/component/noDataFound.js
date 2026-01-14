import { Typography, Box, Grid } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";


// import MainCarousel from "./mainCarousel"

const useStyles = makeStyles((theme) => ({
  mainbox: {
    paddingTop: "21px",
    paddingBottom: "95px",
  },
  search: {
    fontFamily: 'Poppins',
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "28px",
    lineHeight: "16px",
    color: "#000000",
    [theme.breakpoints.down("xs")]: {
      fontSize: "18px !important",

    },
    [theme.breakpoints.down("md")]: {
      fontSize: "28px !important",
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: "28px !important",

    },
  },
  bottomText: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "21px",
    color: "#000000",
  },
  spanText: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "11px",
    color: "#000000",
  },
  contentGrid: {
    textAlign: "center",
    padding: "6rem 0rem",
  },
  topText: {
    fontFamily: 'Poppins',
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "20px",
    lineHeight: "27px",
    paddingBottom: "10px",
    color: "#000000",
  }
}));
export default function (props) {
  const classes = useStyles();

  return (
    <Page title={"home"}>
      <Box className={classes.bannerbox}>
        <Box className={classes.mainbox}>
          <Typography className={classes.search}>
            Search Results{" "}
            <span className={classes.spanText}>Showing 0 results</span>{" "}
          </Typography>
          <Grid className={classes.contentGrid}>
            <img src="images/noproduct.svg" alt="NO DATA FOUND" />
            <Typography className={classes.topText}>
              Product not found!
            </Typography>
            <Typography className={classes.bottomText}>
              Please try to search something different.
            </Typography>
          </Grid>
        </Box>
      </Box>
    </Page>
  );
}
