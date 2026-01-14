import { Typography, Box, Grid, Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import ApiConfig from "src/config/APICongig";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import moment from "moment";

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
    typoTitle: {
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "15px",
        lineHeight: "54px",
        textAlign: "center"
    },
    typoPara: {
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "15px",
        lineHeight: "54px",
        textAlign: "center"
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
        height: "50px",
        marginTop: "24px",
    },
}));

export default function (props) {
    const history = useHistory();
    const classes = useStyles();
    const userId = props?.location?.state;
    const id = userId.id;
    const [paymentData, setPaymentData] = useState([]);
    
    const getPaymentDataById = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await Axios({
                method: "GET",
                url: ApiConfig.viewAddedPayment,
                headers: {
                    token: token,
                },
                params: {
                    _id: id,
                }
            });
            if (res.data.responseCode == 200) {
                setPaymentData(res?.data?.result);
            }
            else {
                console.log("error")
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        getPaymentDataById();
    }, []);

    return (
        <Page title={"Dashboard"}>
            <Box className={classes.bannerbox}>
                <Box className={classes.mainbox}>
                    <Grid container className="d-flex justify-space-between">
                        <Typography variant="h4">View Payment Details</Typography>
                    </Grid>
                    <Box mt={4}>
                        <Box style={{ margin: "0 20%" }}>
                            {paymentData.map((key) => {
                                return (
                                    <Grid container spacing={3} columns={16} justifyContent="center">
                                        <Grid item xs={12} md={6}>
                                            <Typography className={classes.typo}>User ID :</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography className={classes.typo}>{key?._id ? key?._id : "-"}</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography className={classes.typo}>Product ID :</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography className={classes.typo}>{key?.productId ? key?.productId : "-"}</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography className={classes.typo}>Payment Mode :</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography className={classes.typo}>{key?.paymentMethod ? key?.paymentMethod : "-"}</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography className={classes.typo}>Total Amount :</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography className={classes.typo}>{key?.totalAmount ? key?.totalAmount : "-"}</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography className={classes.typo}>Payment Status :</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography className={classes.typo}>{key?.paymentStatus ? key?.paymentStatus : "-"}</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography className={classes.typo}>Date & Time :</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography className={classes.typo}>{moment(key?.createdAt ? key?.createdAt : "-").format('lll')}</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography className={classes.typo}>Tax Amount :</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography className={classes.typo}>{key?.taxAmount ? key?.taxAmount : "-"}</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography className={classes.typo}>Total Amount Paid :</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography className={classes.typo}>{key?.totalPaymentAmount ? key?.totalPaymentAmount : "-"}</Typography>
                                        </Grid>
                                    </Grid>
                                )
                            })}

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                {" "}
                                <Button
                                    variant="contained"
                                    fullWidth
                                    className={classes.buttonbox}
                                    onClick={() => history.push("/payment-Management")}
                                >
                                    BACK
                                </Button>
                            </div>
                        </Box>


                    </Box>
                </Box>
            </Box>
        </Page>
    )
}

