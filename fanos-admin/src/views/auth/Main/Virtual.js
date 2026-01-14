import Page from "src/component/Page";
import { Box, Typography, ListItem, List, Container } from "@material-ui/core";
import React, { useState, useEffect, useContext, useRef } from "react";
import { makeStyles } from "@material-ui/core";
import { AuthContext } from "src/context/Auth";
import DataNotFoundIMG from "src/component/DataNotFoundIMG";
import parse from "html-react-parser";
import Axios from "axios";
import ApiConfig from "src/config/APICongig";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import NoDataFound from "src/DataNotFound";
import { Link, useHistory } from "react-router-dom";
import Nav from "src/views/auth/Main/nav";
import Footer from "src/views/auth/Main/footer";

const useStyles = makeStyles((theme) => ({
  textboxs: {
    position: "relative",
    zIndex: "1",
    "& li": {
      position: "relative",

      fontSize: "14px",
      color: "#fff",
      fontWeight: "400",
      fontFamily: "Roboto, sans-serif",
      "&::after": {
        content: "''",
        position: "absolute",
        height: "5px",
        width: "5px",
        backgroundColor: " #44edd6",
        borderRadius: "50%",
        left: "-10px",
      },
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      maxWidth: "100%",
    },
  },
  textbox: {
    position: "relative",
    zIndex: "1",
    "& li": {
      position: "relative",

      fontSize: "14px",
      fontFamily: "Roboto, sans-serif",
      color: "#FF2626",
      fontWeight: "400",
      "&::after": {
        content: "''",
        position: "absolute",
        height: "5px",
        width: "5px",
        backgroundColor: " #44edd6",
        borderRadius: "50%",
        left: "-10px",
      },
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      maxWidth: "100%",
    },
  },
  headbox: {
    marginTop: "90px",
    minHeight: "50vh",
    fontSize: "36px",
    background:
      "linear-gradient(180deg, rgba(182, 113, 236, 0.8) 0%, rgba(44, 0, 169, 0.8) 100%)",
    "& h4": {
      fontFamily: 'Poppins',
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "36px",
      lineHeight: "54px",
      color: "#FFFFFF",
      paddingTop: "95px",
    },

    "& a": {
      color: "#b26b23",
    },
  },
  paragrahsec: {
    fontFamily: "Poppins",
    fontSize: "16px",
    lineHeight: "24px",
    color: "#FFFFFF",
    paddingBottom: "1rem",
    "& p": {
      fontFamily: "Poppins",
      fontSize: "16px",
      lineHeight: "24px",
      color: "#FFFFFF",
    },
  },

  bottomNavigation: {
    display: "flex",
    gap: "0.5rem",
    paddingBottom: "1rem",
  },
  bottomNavigationText: {
    fontFamily: "Poppins",
    fontWeight: "700",
    fontSize: "16px",
    lineHeight: "17px",

    color: "#FFFFFF !important",
    paddingTop: "0.8rem",
  },
}));

export default function TermsAndCondition() {
  const classes = useStyles();
  const history = useHistory();
  const refs = {
    home: useRef(null),
    about: useRef(null),
    features: useRef(null),
    faq: useRef(null),
    roadmap: useRef(null),
    contact: useRef(null),
  };
  const parse = require("html-react-parser");
  const [terms, setTerms] = useState([]);
  const [aboutusData, setAboutusData] = useState([]);
  const auth = useContext(AuthContext);
  const userdata = auth.userData ? auth.userData : "";
  const [isloading, setisloading] = useState(false);

  const getAboutusDataHandler = async () => {
    setisloading(true);
    try {
      const res = await Axios.get(ApiConfig.StaticData, {});

      if (res.data.responseCode === 200) {
        setAboutusData(
          res.data.result.filter((data) => data?.type === "AboutUs")
        );

        setisloading(false);
      }
    } catch (error) {
      setisloading(false);
    }
  };
  useEffect(() => {
    getAboutusDataHandler();
  }, []);
  const onButtonClick = (abc) => {
    history.push("/");

    window.scrollTo({
      top: refs[abc].current?.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    
    <Page title="About Us">
        <Nav buttonClick={onButtonClick} />
      <Box pb={1} className={classes.headbox}>
        <Container maxWidth="lg">
          <Box className="termcondition">
            <Box textAlign="left">
              <Typography variant="h4">{aboutusData[0]?.title}</Typography>
              {/* Terms and Conditions */}
            </Box>
            {isloading ? (
              <ButtonCircularProgress />
            ) : (
              <>
                <Box mt={1} style={{ height: "100%",paddingBottom: "88px" }}>
                  {/* {aboutusData.map((data, i) => { */}
                  {/* return ( */}

                  <Typography variant="body1" className={classes.paragrahsec}>
                    {aboutusData[0]?.description && (
                      <div
                        className={classes.paragrahsec}
                        dangerouslySetInnerHTML={{
                          __html: aboutusData[0]?.description,
                        }}
                      ></div>
                    )}
                  </Typography>

                  {/* ); */}
                  {/* })} */}
                  {aboutusData && aboutusData.length === 0 && (
                    <DataNotFoundIMG />
                  )}
                </Box>

            
              </>
            )}
          </Box>
        </Container>
      </Box>
      <Footer />
    </Page>
  );
}
