import { Typography, Box, Grid, Card, CardContent, Button, Divider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import { useHistory, useLocation } from "react-router-dom";
import ApiConfig from "src/config/APICongig";
import Axios from "axios";
import moment from 'moment';


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        "& > *": {
            margin: theme.spacing(1),
        },
    },
    mainbox: {
        borderRadius: "20px",
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

            borderRadius: "16px",
        },
    },
    CategoryTitel: {
        fontSize: "16px",
        fontFamily: "poppins",
        fontWeight: "400",
        lineHeight: "1.6",
        letterSpacing: "0.00938em",
        color: "#263238",
        margin: '20px'
    },
    CategoryValue: {
        fontSize: "16px",
        fontFamily: "'Inter', sans-serif",
        fontWeight: "400",
        lineHeight: "1.6",
        letterSpacing: "0.00938em",
        color: "#263238",

    },
    viewCard: {
        width: "100%",
        padding: '30px'
    },
    viewCardGrid: {
        display: 'flex',

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
        width: "30%",
        height: "40px",
        marginTop: "24px",
    },
    faqView: {
        boxShadow: '0px 0px 15px 1px rgba(12, 87, 108, 0.35)',
        borderRadius: '10px',
    },

}))
function ViewFAQ(props) {

    const viewId = props.location.state;
    const classes = useStyles();
    const [FAQ, setFAQ] = useState([]);
    const [id, setId] = useState();
    const history = useHistory();
    //const userId = props?.location?.state;


    const getUserById = async (id) => {
        const token = localStorage.getItem("token");
        try {
            const res = await Axios({
                method: "GET",
                url: ApiConfig.viewFAQ,
                headers: {
                    token: token,
                },
                params: {
                    _id: viewId,
                }
            });
            // this is the pending work view FAQ.......
            if (res.data.responseCode === 200) {

                // const Data = res?.data?.result;
                setFAQ(res?.data.result);
                // setId(id);  
            }
            else {
                console.log("error")
            }

        } catch (error) {
            console.log("error", error);
        }
    };
    useEffect(() => {
        //const userId = props.location.state;
        getUserById();
    }, []);

    return (
        <>
            <Box className={classes.bannerbox}>
                <Box className={classes.mainbox}>
                    <Grid container className="d-flex justify-space-between">
                        <Typography variant="h4">View FAQ</Typography>
                    </Grid>

                    <Box mt={4} className={classes.faqView}>
                        <Grid container spacing={3}>
                            <Grid item lg={12} className={classes.viewCardGrid}>
                                <Grid container>
                                    <Grid item xs={12} >
                                        <Typography style={{ fontWeight: '700' }} className={classes.CategoryTitel}>Question : </Typography>
                                        <Typography className={classes.CategoryTitel} >
                                            {FAQ.question ? FAQ.question : "N/A"}{" "}
                                        </Typography>
                                        <Divider />
                                        <Typography style={{ fontWeight: '700' }} className={classes.CategoryTitel}>Message :  </Typography>
                                        <Typography className={classes.CategoryTitel}>
                                            {FAQ.answer ? FAQ.answer : "N/A"}
                                        </Typography>
                                        <Divider />

                                    </Grid>
                                    <Grid md={12} xs={12} >
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            {" "}
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                className={classes.buttonbox}
                                                onClick={() => history.push("/faq-management")}
                                            >
                                                BACK
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box ></>
    )
}

export default ViewFAQ