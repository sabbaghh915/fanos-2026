import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import TopBar from "./TopBar";
import CategoryBar from "src/component/CategoryBar";
import AOS from "aos";
import { useLocation } from "react-router-dom";
import "aos/dist/aos.css";
import Footer from "./footer";

AOS.init({ once: true });

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",

  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  content: {
    flex: "1 1 auto",
    height: "auto",
    overflow: "hidden",
    paddingLeft: "35px",
    paddingRight: "35px",
    // padding:'50px 35px',
    
    "@media(max-width:1114px)": {
      paddingLeft: "20px",
      paddingRight: "20px",
    },
  },
}));

const MainLayout = ({ children }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <>
      <div className={classes.root}>
        <TopBar />
        <CategoryBar />

        <div className={classes.wrapper}>
          <div className={classes.contentContainer}>
            <div className={classes.content}>{children}</div>
          </div>
        </div>
        <Footer />
      </div>

    </>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
