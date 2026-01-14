import { Box, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import Page from "src/component/Page";
const useStyles = makeStyles((theme) => ({
  mainBox: {
    background:"#FFF",
    color: theme.palette.text.primary,
    height: "100vh",
  },
  centerDiv:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },
  mantainText: {
    fontFamily: "Poppins",
    fontWeight:"600",
    fontSize:"28px",
    lineHeight:"16px"
  },
  oopsText:{
    fontFamily: "Poppins",
    fontWeight:"500",
    fontSize:"18px",
    lineHeight:"16px",
    marginTop:"2rem"
  }
}));
export default function Maintenance(props) {
  const classes = useStyles();
  return (
    <Page title="Maintenance">
      <Box pt={20} className={classes.mainBox}>
       
        <Typography variant="h1" align="center" paragraph>
          
        </Typography>
        <div className={classes.centerDiv}>
          <img src="/images/maintainance.png" alt="" />
        </div>
        <Typography variant="h4" align="center">
        The page is under Maintenance 
        </Typography>
        <Typography variant="h4" align="center" className={classes.oopsText}>
          {props.data.maintainanceModeText}
        </Typography>
      </Box>
    </Page>
  );
}
