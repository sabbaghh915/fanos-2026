import { Box, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import ApiConfig from "src/config/APIConfig";
import moment from "moment";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
const useStyles = makeStyles((theme) => ({
  "@keyframes glow": {
    "0%": {
      boxShadow: "0px 0px 5px rgba(139, 92, 246, 0.5), 0px 0px 1.15416px 0px rgba(9, 30, 66, 0.30), 0px 11.54162px 20.77491px 0px rgba(9, 30, 66, 0.15)",
      border: "1px solid rgba(139, 92, 246, 0.3)",
    },
    "50%": {
      boxShadow: "0px 0px 20px rgba(139, 92, 246, 0.8), 0px 0px 1.15416px 0px rgba(9, 30, 66, 0.30), 0px 11.54162px 20.77491px 0px rgba(9, 30, 66, 0.15)",
      border: "1px solid rgba(139, 92, 246, 0.6)",
    },
    "100%": {
      boxShadow: "0px 0px 5px rgba(139, 92, 246, 0.5), 0px 0px 1.15416px 0px rgba(9, 30, 66, 0.30), 0px 11.54162px 20.77491px 0px rgba(9, 30, 66, 0.15)",
      border: "1px solid rgba(139, 92, 246, 0.3)",
    },
  },
  mainBox: {
   
  },
  heading: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "28px",
    lineHeight: "16px",
    color: "#000000",
    paddingBottom: "30px",
  },
  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "7.50088px 7.50088px 0px 0px",
  },
  productName: {
    color: "#8B5CF6",
    fontSize: "16px",
    fontWeight: " 600 !important",
    margin: "0",
  },
  productAdd: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "12.0014px",
    lineHeight: " 18px",
    /* identical to box height */

    color: "#8B5CF6",
    margin: "0",
    marginTop: "7px",
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
  advertisement: {
    background: "#BF9C76",
    height: "152px",
  },
  boxCard: {
    cursor: "pointer",
    height: "100%",
    maxHeight: "400px",
    borderRadius: "7.794px",
    background: "#FFF",
    boxShadow:
      "0px 0px 1.15416px 0px rgba(9, 30, 66, 0.30), 0px 11.54162px 20.77491px 0px rgba(9, 30, 66, 0.15)",
    border: "1px solid rgba(139, 92, 246, 0.3)",
    animation: "$glow 2s ease-in-out infinite",
  },
  imageContainer: {
    width: "100%",
    height: "270px",
    overflow: "hidden",
  },
  productDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "12px",
  },
  bottomFlex: {
    display: "flex",
    justifyContent: "space-between",
  },
  locationAndDate: {
    display: "flex",
    flexDirection: "column",
    gap: " 20px",
    width: "100%",
    maxWidth: "155px",
    wordBreak: " break-word",
  },
  priceContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: "10px",
  },
  priceText: {
    color: "#707070",
    fontSize: "12px",
    fontWeight: " 400 !important",
    opacity: "0.5",
    margin: "0",
  },
  price: {
    margin: "0",
    color: "#FF6B35",
    fontSize: "24px",
    fontWeight: "600",
    wordBreak:'unset'
  },

}));
const ListedProduct = function (props) {
  const classes = useStyles();
  const [dataMain, setDataMain] = useState([]);
  const idUser = props.sellId;
  const history = useHistory();

  const getListedProduct = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await Axios({
        method: "POST",
        url: ApiConfig.listedProduct,
        headers: {
          token: token,
        },
        data: {
          _id: idUser,
        },
      });

      if (res.data.responseCode === 200) {
        setDataMain(res.data.result);
      }
    } catch (error) { }
  };
  useEffect(() => {
    getListedProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box className={classes.mainBox} >
     
      <Grid container spacing={3}>
        {dataMain?.map((data) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Box
                    className={classes.boxCard}
                    onClick={() =>
                      history.push({
                        pathname: "/product",
                        search: `?productId=${data._id}`,
                        state: { id: data._id, userId: data.userId },
                      })
                    }
                  >
                    <div className={classes.imageContainer}>
                      <img
                        alt="img"
                        className={classes.productImage}
                        src={data.productImage[0]}
                      />
                    </div>

                    <Box className={classes.productDiv}>
                      <p className={classes.productName}>
                        {data.productName.length <= 8
                          ? data.productName
                          : data.productName.slice(0, 20) + ".."}
                      </p>

                      <Box className={classes.bottomFlex}>
                        <Box className={classes.locationAndDate}>
                          <p className={classes.productAdd}>
                          {data.location ? data.location.split(',')[0].slice(0,20) : "--"}<br/>
                          {data.location ? data.location.split(',')[1] : "--"}

                            {/* {data.location ? data.location.slice(',',) : "--"} */}
                          </p>
                          <p className={classes.productAdd}>
                            {moment(data.updatedAt).format("MM/DD/YYYY")}
                          </p>
                        </Box>

                        <Box className={classes.priceContainer}>
                          <p className={classes.priceText}>Price</p>
                          <p
                           
                            className={classes.price}
                          >
                            {data.price}{data.currency ? data.currency : "--"}
                          </p>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
              {/* <Box className={classes.boxCard}>
                <img
                  alt="img"
                  className={classes.productImage}
                  src={value?.productImage[0]}
                />
                <Box className={classes.productDiv}>
                  <p className={classes.productName}>
                    {value?.productName.length <= 8
                      ? value?.productName
                      : value?.productName.slice(0, 8) + ".."}
                  </p>
                  <p className={classes.productAdd}>
                    {moment(value?.updatedAt).format("MM/DD/YYYY")}
                  </p>
                </Box>
                <Box
                  style={{ paddingTop: "7px" }}
                  className={classes.productDiv}
                >
                  <p className={classes.productAdd} style={{
                    width: "100%",
                    maxWidth: "81px"
                  }}>
                    {value?.location ? value?.location : "--"}
                  </p>

                  <p
                    style={{ color: "#FF6B35" }}
                    className={classes.productName}
                  >
                    {value?.price}$
                  </p>
                </Box>
              </Box> */}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ListedProduct;
