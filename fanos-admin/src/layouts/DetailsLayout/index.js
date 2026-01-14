import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import TopBar from "../HomeLayout/TopBar";
import AOS from "aos";
import { useLocation } from "react-router-dom";
import "aos/dist/aos.css";
import Footer from "../HomeLayout/footer";

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
        paddingTop: 130,
    },
    contentContainer: {
        display: "flex",
        flex: "1 1 auto",
        overflow: "hidden",
    },
    content: {
        flex: "1 1 auto",
        height: "100%",
        overflow: "hidden",
        paddingLeft: "100px",
        paddingRight: "100px",
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
