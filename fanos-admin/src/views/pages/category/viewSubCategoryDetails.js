import { Typography, Box, Grid, Card, CardContent } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import { useLocation, useHistory } from "react-router-dom";
import ApiConfig from "src/config/APICongig";
import Axios from "axios";
import Button from "@material-ui/core/Button";


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
        margin: '30px',
        textAlign:"end"
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
        width: "100%",
        height: "57px",
        marginTop: "24px",
    },
}))

export default function ViewSubCategoryDetails(props) {
    const classes = useStyles();
    const [profileData, setProfileData] = useState([]);
    const userId = props?.location?.state?.id;
    const _id = props?.location?.state;
    const history = useHistory()

    const getUserById = async (id) => {
        const token = localStorage.getItem("token");
        try {
            const res = await Axios({
                method: "GET",
                url: ApiConfig.subCategoryDetails,
                headers: {
                    token: token,
                },
                params: {
                    subCategoryId: _id,
                }
            });
            if (res.data.responseCode == 200) {
                const Data = res.data.result;
                setProfileData(Data);

            }
            else {
                console.log("error")
            }

        } catch (error) {
            console.log("error", error);
        }
    };
    useEffect(() => {
        getUserById(userId);
    }, []);

    return (
        <Page title={"Dashboard"}>
            <Box className={classes.bannerbox}>
                <Box className={classes.mainbox}>
                    <Grid container className="d-flex justify-space-between">
                        <Typography variant="h4">View Sub Category</Typography>
                    </Grid>

                    <Box mt={4}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} className={classes.viewCardGrid}>
                                <Card className={classes.viewCard}>
                                    <CardContent>
                                        <Grid>
                                            <Grid item xs={12} className={classes.viewCardGrid}>
                                                <div>
                                                    <img src={profileData.subCategoryImage} alt="" className={classes.viewSubImg} />
                                                </div>
                                            </Grid>
                                            <Grid className={classes.viewCardGrid}>
                                                <Grid item md={12} xs={12}>
                                                    <Typography className={classes.CategoryTitel}>Category Name:</Typography>
                                                </Grid>
                                                <Grid item md={12} xs={12}>
                                                    <Typography className={classes.CategoryValue}>{profileData?.categoryId?.categoryName ? profileData.categoryId?.categoryName : "--"}</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid className={classes.viewCardGrid}>
                                                <Grid item md={12} xs={12}>
                                                    <Typography className={classes.CategoryTitel}>Sub Category Name:</Typography>
                                                </Grid>
                                                <Grid item md={12} xs={12}>
                                                    <Typography className={classes.CategoryValue}>{profileData.subCategoryName ? profileData.subCategoryName : "--"}</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid className={classes.viewCardGrid}>
                                                <Grid item md={12} xs={12}>
                                                    <Typography className={classes.CategoryTitel}>No. of Products</Typography>
                                                </Grid>
                                                <Grid item md={12} xs={12}>
                                                    <Typography className={classes.CategoryValue}>{profileData.subCategoryName ? profileData.subCategoryName : "--"}</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid md={12} xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                    {" "}
                                                    <Button
                                                        variant="contained"
                                                        fullWidth
                                                        className={classes.buttonbox}
                                                        onClick={() => history.push("/sub-category-management")}
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


