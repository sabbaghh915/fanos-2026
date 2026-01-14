import React, { useState } from "react";
import { Typography, Box, Button, makeStyles, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  cardDiv: {
    background: "#ffffff",
    borderRadius: "25px",
    border: "2px solid #0C576C",
    cursor: "pointer",
    position: "relative",
    transition: "0.3s",
    paddingLeft: "20px",
    backgroundRepeat: "round",
    minHeight: "103px",
    paddingTop: "25px",
  },
  heading: {
    color: "#0C576C",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: "22px",
  },
  content: {
    color: "#000000",
    fontSize: "22px",
    fontStyle: "normal",
    fontWeight: "800",
    lineHeight: "22px",
    marginTop: "28px",
  },
}));

export default function Cards(props) {

  const classes = useStyles();
  const history = useHistory();

  const handleClick1 = (props) => {
    history.push("/user-management", {state:props})
  }
  const handleClick2 = () => {
    history.push("/advertisement-management")
  }
  const handleClick3 = () => {
    history.push("/product-management")
  }
  const handleClick4 = () =>{
    history.push("/category-management")
  }


  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4} className="walletDiv">
        <Box mt={2} className={classes.cardDiv} onClick={()=>{
          handleClick1("ALL")}}>
          <Typography className={classes.heading} >
            {"Total Registered Users"}
          </Typography>
          <Typography className={classes.content}>
            {props.data.totalRegisterUser ? props.data.totalRegisterUser : "0"}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={4} className="walletDiv">
        <Box mt={2} className={classes.cardDiv} onClick={()=>{handleClick1("ACTIVE")}}>
          <Typography className={classes.heading} >{"Active Users"}</Typography>
          <Typography className={classes.content}>
            {props.data.activeUser ? props.data.activeUser : "0"}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={4} className="walletDiv">
        <Box mt={2} className={classes.cardDiv} onClick={()=>{handleClick1("BLOCKED")}}>
          <Typography className={classes.heading} >{"Blocked Users"}</Typography>
          <Typography className={classes.content}>
            {props?.data?.blockUser ? props?.data?.blockUser : "0"}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={4} className="walletDiv">
        <Box mt={2} className={classes.cardDiv}  onClick={handleClick2}>
          <Typography className={classes.heading}>{"Total Advertisements"}</Typography>
          <Typography className={classes.content}>
            {props.data.totalAdvertisements
              ? props.data.totalAdvertisements
              : "0"}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={4} className="walletDiv">
        <Box mt={2} className={classes.cardDiv} onClick={handleClick3}>
          <Typography className={classes.heading} >{"Total Products"}</Typography>
          <Typography className={classes.content}>
            {props.data.totalItems ? props.data.totalItems : "0"}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={4} className="walletDiv">
        <Box mt={2} className={classes.cardDiv} onClick={handleClick4}>
          <Typography className={classes.heading} >{"Total Categories"}</Typography>
          <Typography className={classes.content}>
            {props.data.totalCategories ? props.data.totalCategories : "0"}
          </Typography>
        </Box>
      </Grid>

    </Grid>
  );
}
