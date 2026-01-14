import { Typography, Box, Grid, Card, CardContent, Button } from "@material-ui/core";
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
    CategoryTitel: {
        fontSize: "16px",
        fontFamily: "'Inter', sans-serif",
        fontWeight: "400",
        lineHeight: "1.6",
        letterSpacing: "0.00938em",
        width: "100%",
        color: "#263238",
        margin: '30px'
    },
    CategoryValue: {
        fontSize: "16px",
        fontFamily: "'Inter', sans-serif",
        fontWeight: "400",
        lineHeight: "1.6",
        letterSpacing: "0.00938em",
        color: "#263238",
        margin: '30px'
    },
    viewCard: {
        width: "60%",
        padding: '40px'
    },
    viewCardGrid: {
        display: 'flex',
        justifyContent: 'center'
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

}))

export default function ViewNotification(props) {

    const viewId = props.location.state;
    const classes = useStyles();
    const [notification, setNotification] = useState([]);
    const [id, setId] = useState();
    const history = useHistory();
    //const userId = props?.location?.state;


    const getUserById = async (id) => {
        const token = localStorage.getItem("token");
        try {
            const res = await Axios({
                method: "GET",
                url: ApiConfig.viewNotification,
                headers: {
                    token: token,
                },
                params: {
                    _id: viewId,
                }
            });
            // this is the pending work view notification.......
            if (res.data.responseCode === 200) {

                // const Data = res?.data?.result;
                setNotification(res?.data.result);
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
        <Page title={"Dashboard"}>
            <Box className={classes.bannerbox}>
                <Box className={classes.mainbox}>
                    <Grid container className="d-flex justify-space-between">
                        <Typography variant="h4">View Notification</Typography>
                    </Grid>

                    <Box mt={4}>
                        <Grid container spacing={3}>
                            <Grid item lg={12} className={classes.viewCardGrid}>
                                <Card className={classes.viewCard}>
                                    <CardContent>
                                        <Grid container>
                                            <Grid item xs={8} className={classes.viewCardGrid}>
                                                <div>
                                                    <Typography className={classes.CategoryTitel}>Notification UID: {notification.userId}</Typography>
                                                    <Typography className={classes.CategoryTitel}>CreatedAt :
                                                        {moment(notification.createdAt ? notification.createdAt : "N/A").format("lll")}{" "}
                                                    </Typography>
                                                    <Typography className={classes.CategoryTitel}>Message : {notification.title}</Typography>
                                                </div>
                                            </Grid>
                                            <Grid md={12} xs={12} >
                                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                    {" "}
                                                    <Button
                                                        variant="contained"
                                                        fullWidth
                                                        className={classes.buttonbox}
                                                        onClick={() => history.push("/notifications")}
                                                    >
                                                        BACK
                                                    </Button>
                                                </div>
                                            </Grid>
                                        </Grid>

                                    </CardContent>
                                </Card>
                            </Grid>

                        </Grid>
                    </Box>

                </Box>
            </Box>

        </Page>
    )
}


