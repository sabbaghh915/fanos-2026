import { Box, Typography,Grid } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  mainbox: {
    paddingTop: "21px",
    paddingBottom: "95px",
  },

  contentGrid: {
    textAlign: "center",
    padding: "6rem 0rem",
  },
  topText: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "20px",
    lineHeight: "27px",
    paddingBottom: "10px",
    color: "#000000",
  },
}));

export default function DataNotFound() {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.bannerbox}>
        <Box className={classes.mainbox}>
          <Grid className={classes.contentGrid}>
            <img src="images/noproduct.svg" alt="NO DATA FOUND" />
            <Typography className={classes.topText}>No data found!</Typography>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
