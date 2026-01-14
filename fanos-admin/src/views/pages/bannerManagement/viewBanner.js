import { Typography, Box, Grid, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import axios from "axios";
import ApiConfig from "src/config/APICongig.js"

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

  textGrid: {
    // border: "1px solid #333",
    borderRadius: "10px",
    padding: "1rem",
    width: "50%",
  },
  outerGrid: {
    border: "1px solid #333",
    borderRadius: "10px",
    marginBottom: "1rem",
    padding: "2rem",
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
    width: "100%",
    height: "57px",
    marginTop: "24px",
  },
  imageStyle:{
    width: "1000px",
  }
}));

export default function (props) {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const bannerId = props?.location?.state
  const [data, setData] = useState();
  
const handleBack = () => {
  return (
    history.push("/banner-management")
  )
}  

const getBannerById = async (id) => { 
  try {
    const res = await axios({
      method: "GET",
      url: ApiConfig.viewBanner,
      params:
      {_id:bannerId},
    });
    console.log(res, "response");
    const Data = res.data.result;
    setData(Data);
  } catch (error) {
    console.log("error", error);
    console.log("error.response", error.response)
  }
};

  useEffect(() => {   
    getBannerById(bannerId);
  }, []);


  return (
    <Page title={"Dashboard"}>
      <Box className={classes.bannerbox}>
        <Box className={classes.mainbox}>
          <Grid container className="d-flex justify-space-between">
            <Typography variant="h4">View banner</Typography>
          </Grid>

            {console.log(data, "data")}
       <Box>
            <Grid className={classes.outerGrid} >
              <Grid container style={{ marginBottom: "10px", marginTop: ".5rem", justifyContent: "center" }}>
                <Grid item>
               
                 <img className={classes.imageStyle} src={data?.img} alt="banner img"/>
         
              
                </Grid>             
              </Grid>       
            </Grid>

            <Grid align="center">
                      <Grid md={6} xs={12} align="center">
                        {" "}
                        <Button
                          variant="contained"
                          fullWidth
                          className={classes.buttonbox}
                          onClick={()=> handleBack()}
                        >
                          Back
                        </Button>
                      </Grid>
            </Grid>
          </Box> 
        </Box>
      </Box>
    </Page>
  );
}
