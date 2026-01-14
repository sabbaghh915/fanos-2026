import { Box, Grid } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import FeatureProduct from "src/component/featuredProduct";
import BestForYouProduct from "src/component/bestForYouProduct";
import BestPriceProduct from "src/component/bestPriceProduct";
import GreatPriceProduct from "src/component/greatPriceProduct";
import SuggestProduct from "src/component/suggestProduct";
import PopularProduct from "src/component/popularProduct"
import NewProduct from "src/component/newProduct"
import MainCarousel from "./mainCarousel"


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  mainbox: {

    paddingBottom: "20px",
  },
  bookDiv: {
    background: "#BF9C76",
    height: "348px",
    paddingLeft: "47px",
    paddingRight: "47px",
  },
  bannerImage: {
    height: "348px",
  },
  buyTicket: {
    background: "transparent",
    border: "1px solid #853600",
    borderRadius: "5px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "18px",
    lineHeight: "49px",
    color: "#843300",
  },
  mainHeading: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "64px",
    lineHeight: "68px",
    color: "#76452C",
    paddingTop: "36px",
  },
  subHeading: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "18px",
    lineHeight: "70px",
    color: "#FFFFFF",
  },
}));
const Dashboard = function (props) {
  const classes = useStyles();

  return (
    <Page title={"home"}>
      <Box className={classes.bannerbox}>
        <Box className={classes.mainbox}>
          <Grid container>
            <Grid item xs={12} >
              <MainCarousel />
            </Grid>
          </Grid>
          <SuggestProduct />
          <BestPriceProduct />
          <BestForYouProduct />
          <GreatPriceProduct />
          <FeatureProduct />
          <PopularProduct />
          <NewProduct />
        </Box>
      </Box>

      {/* <Dashboard /> */}
    </Page>
  );
};

export default Dashboard;
