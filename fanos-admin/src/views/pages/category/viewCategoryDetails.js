import { Typography, Box, Grid, Card, CardContent, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import { useHistory, useLocation } from "react-router-dom";
import ApiConfig from "src/config/APICongig";
import Axios from "axios";

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

export default function ViewCategoryDetails(props) {
    console.log(props.location.state, "Props")
    const classes = useStyles();
    const [profileData, setProfileData] = useState([]);
    const history = useHistory();
    const [userId, setuserId] = useState(props?.location?.state);
    //const [showMore, setShowMore] = useState(false);
    const [showFullCategoryName, setShowFullCategoryName] = useState(false);
    const [ImgEdit,setImgEdit] = useState();

    const handleClickViewMore = () => {
        setShowFullCategoryName(!showFullCategoryName);
    };

    const getUserById = async (id) => {
        const token = localStorage.getItem("token");
        try {
            const res = await Axios({
                method: "GET",
                url: ApiConfig.viewCategory,
                headers: {
                    token: token,
                },
                params: {
                    categoryId: userId,
                }
            });
            if (res.data.responseCode === 200) {
                const Data = res?.data?.result;
                setuserId(userId);
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
        //const userId = props?.location?.state;
        getUserById(userId);
    }, []);

    console.log("profileData",profileData)  
    return (
        <Page title={"Dashboard"}>
            <Box className={classes.bannerbox}>
                <Box className={classes.mainbox}>
                    <Grid container className="d-flex justify-space-between">
                        <Typography variant="h4">Category Details</Typography>
                    </Grid>

                    <Box mt={4}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} className={classes.viewCardGrid}>
                                <Card className={classes.viewCard}>
                                    <CardContent>
                                        <Grid container>
                                            <Grid itme xs={12} className={classes.viewCardGrid}>
                                                <div>
                                                    <img width={500} height={500} src={profileData.categoryImage} alt="" className={classes.viewSubImg} />
                                                </div>
                                            </Grid>
                                            <Grid item xs={4} className={classes.viewCardGrid}>
                                                
                                                <div>
                                                    <Typography className={classes.CategoryTitel}>Category Name</Typography>
                                                    <Typography className={classes.CategoryTitel}>Status</Typography>
                                                    <Typography className={classes.CategoryTitel}>Category Type</Typography>
                                                </div>
                                            </Grid>


                                            {/* This is only for Dots */}


                                            <Grid item xs={4} className={classes.viewCardGrid}>
                                                <div>
                                                    <Typography className={classes.CategoryTitel}>:</Typography>
                                                    <Typography className={classes.CategoryTitel}>:</Typography>
                                                    <Typography className={classes.CategoryTitel}>:</Typography>
                                                </div>
                                            </Grid>

                                            {/* Response of Category Name and etc */}
                                            
                                            <Grid item xs={4} className={classes.viewCardGrid}>
                                                <div>
                                                    <Typography className={classes.CategoryValue}>
                                                        {profileData.categoryName && profileData.categoryName.length > 25
                                                            ? showFullCategoryName
                                                                ? profileData.categoryName
                                                                : profileData.categoryName.slice(0, 25) + "......."
                                                            : profileData.categoryName || "--"}
                                                        {profileData.categoryName && profileData.categoryName.length > 25 && (
                                                            <Button style={{
                                                                color: showFullCategoryName ? 'red' : 'blue',
                                                                //border: showFullCategoryName ? '1px solid red' : '1px solid blue',
                                                              }}
                                                                className={classes.ViewMoreLink}                
                                                                onClick={handleClickViewMore}
                                                            >
                                                                {showFullCategoryName ? "View Less" : "View More"}
                                                            </Button>
                                                        )}
                                                    </Typography>
                                                    <Typography className={classes.CategoryValue}>{profileData.status ? profileData.status : "--"}</Typography>
                                                    <Typography className={classes.CategoryValue}>{profileData.categoryType ? profileData.categoryType : "--"}</Typography>
                                                </div>
                                            </Grid>
                                            <Grid md={12} xs={12} >
                                                <div style={{ display: 'flex', justifyContent: 'center' }}>         
                                                    {" "}
                                                    <Button
                                                        variant="contained"
                                                        fullWidth
                                                        className={classes.buttonbox}
                                                        onClick={() => history.push("/category-management")}
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


