import { Typography, Box, Button, Grid } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import { useHistory } from "react-router-dom";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  heading: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "18px",
    lineHeight: "27px",
    color: "#000000",
  },
  contentDiv: {
    height: "fit-content",
    borderRadius: '7.794px',
    background: '#FFF',
    boxShadow: '0px 0px 1.15416px 0px rgba(9, 30, 66, 0.30), 0px 11.54162px 20.77491px 0px rgba(9, 30, 66, 0.15)',
    marginTop: "20px",
  },
  imgDiv: {
    width: "100%",
    padding: "0 !important",

    "& .itemImage": {
      width: "100%",
      maxWidth: "197px",
      height: "100%",
      borderRadius: "10px"
    },
  },
  heading: {
    color: '#0C576C',
    fontSize: '18px',
    fontWeight: "600 !important",

  },

  price: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "28.368px",
    lineHeight: "24px",
    color: "#D39B2D",
  },
  description: {
    color: '#707070',
    fontSize: '16px',
    fontWeight: '400 !important',
  },
  footerDiv: {
    display: "flex",
    justifyContent: "space-between",
  },
  content: {},
  specific: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "0.88px",
    textTransform: "uppercase",
    color: "#002F34",
  },
  location: {
    color: '#707070',
    fontFamily: 'Poppins',
    fontSize: '12px',
    fontWeight: '400 !important',
  },

  buyButton: {
    background: "#D39B2D",
    width: "135px",
  },
  soldButton: {
    border: "1px solid #D39B2D",
    color: "#000",
    width: "135px",
  },
  buttonContainer: {
    justifyContent: "space-evenly",
  },
  completeSpacing: {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
    padding: '20px 15px',

  },
  spacing: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  viewMoreBox: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0",
    "& .viewMore": {
      color: "#fff",

      border: "none",
      height: "42px",
      fontSize: "14px",
      background: "#D39B2D",
      fontStyle: "normal",
      fontFamily: "Poppins",
      fontWeight: "500",
      lineHeight: "14px",
      borderRadius: "5px",
    },
  },
  topText: {
    color: "#000"
  },
  date: {
    color: '#0C576C',
    fontFamily: 'Poppins',
    fontSize: '12px',
    fontWeight: '400 !important',
    alignSelf: 'end',

  },
  priceText: {
    color: '#707070',
    fontFamily: 'Poppins',
    fontSize: '12px',
    fontWeight: '400 !important',

  },
  dateAndPriceContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  imageContainer:{
    height:'100%',
  }

}));

export default function ({ listProduct, getListProduct, productSearchSort }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Page title={"category"}>
      <Box className={classes.bannerbox}>
        {productSearchSort &&
          productSearchSort.map((value) => {

            return (
              <Grid container className={classes.contentDiv}>

                <Grid item sm={2} className={classes.imgDiv}>
                  <div onClick={() => history.push({ pathname: '/product', state: { id: value._id, userId: value.userId } })}
                    className={classes.imageContainer}
                  >
                    <img alt="img" className="itemImage" src={value.productImage[0]}></img>
                  </div>
                </Grid>

                <Grid item sm={10}>
                  <Box className={classes.completeSpacing}>
                    <Box className={classes.nameAndLocationContainer}>
                      <Typography className={classes.heading}>
                        {value?.productName.length > 80 ? value?.productName.slice(0, 80) : value.productName}
                      </Typography>
                      <Typography className={classes.location}>
                        {value?.location > 20 ? value?.location.slice(0, 20) + ".." : value.location}
                      </Typography>
                    </Box>

                    <Box className={classes.descriptionContainer}>
                      <Typography className={classes.description}>
                        {value?.description.length > 100 ? value?.description.slice(0, 100) + ".." : value?.description}
                      </Typography>
                    </Box>

                    <Box className={classes.dateAndPriceContainer}>
                      <Typography className={classes.date}>{moment(value.createdAt).format("DD MMMM YYYY")}</Typography>
                      <Box className={classes.dateAndPrice}>
                        <Typography variant="body1" className={classes.priceText}>Price</Typography>
                        <Typography className={classes.price}>
                          
                          {value.price}{value.currency}
                        </Typography>
                      </Box>

                    </Box>

                  </Box>
                </Grid>
              </Grid>
            );
          })}
        {productSearchSort && productSearchSort.length === 0 &&
          <Box align="center" pt={2}>
            <img src="images/noproduct.svg" alt="NO DATA FOUND" />
            <Typography className={classes.topText}>
              Product not found!
            </Typography>
          </Box>}
      </Box>
    </Page>
  );
}
