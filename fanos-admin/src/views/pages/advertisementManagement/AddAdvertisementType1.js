import { Typography, Box, Grid, TextField, Button, FormHelperText } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import { DropzoneArea } from "material-ui-dropzone";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import ApiConfig from "src/config/APICongig";
import { toast, ToastContainer } from "react-toastify";
import * as yep from "yup";
import { Form, Formik } from "formik";
import { Field } from "formik";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";


const BootstrapInput = withStyles((theme) => ({
    root: {
        "label + &": {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        position: "relative",
        backgroundColor: theme.palette.background.paper,
        border: "1px solid #ced4da",
        fontSize: 16,
        padding: "10px 26px 10px 12px",
        transition: theme.transitions.create(["border-color", "box-shadow"]),

        "&:focus": {
            boxShadow: "none",
        },
    },
}))(InputBase);
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
        "& h5": {
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: "700",
            fontSize: "25px",
            lineHeight: "54px",
            color: "#000000",
        },
        "& h5": {
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: "700",
            fontSize: "18px",
            lineHeight: "54px",
            color: "#000000",
        },
        "& h4": {
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: "700",
            fontSize: "36px",
            lineHeight: "54px",
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

    TextBox: {
        borderRadius: "10px",
        background: theme.palette.background.taf,
        height: "55px",
    },
    label: {
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "16px",
        lineHeight: "24px",
        marginTop: "15px !important",
        marginBottom: "-5px !important",
        color: "#1E1E1E",
        [theme.breakpoints.down("sm")]: {
            fontSize: "13px",
        },
    },
    redText: {
        color: "#FF0000",
        marginLeft: "-4px",
    },
    colorbox: {
        color: theme.palette.text.primary,
        height: "auto",
        "& .MuiDropzoneArea-root": {
            width: "100% !important",
            maxWidth: "200px !important",
        },
        "& .MuiDropzoneArea-text": {
            display: "none",
        },
        "& .MuiDropzoneArea-textContainer ": {
            marginTop: "55px",
        },
        "& h2": {
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: "700",
            fontSize: "36px",
            lineHeight: "54px",
            color: "#FFFFFF",
        },
        "& h3": {
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "24px",
            color: "#FFFFFF",
        },
        "& img": {
            width: "100%",
        },
    },
    tableButton: {
        border: "none",
        background: "#0C576C ",
        borderRadius: "10px",
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "700 !important",
        fontSize: "14px",
        lineHeight: "21px",
        border: "none",
        height: "36px",
        maxWidth: "230px",
        color: "#FFFFFF",
    },
    margin: {
        "& .MuiNativeSelect-select": {
            height: "35px",
            background: "#F3F5F6",
            borderRadius: "10px",
        },
    },
    dropZoneArea: {
        "& .MuiGrid-container": {
            display: "block !important"
        },
        "& .MuiGrid-grid-xs-4": {
            maxWidth: "100%"
        },
        "& .MuiDropzoneArea-textContainer": {
            display: "none"
        },
        "& .MuiDropzonePreviewList-image": {
            height: "100%",
            maxHeight:'300px'
        },
        "& .MuiDropzonePreviewList-removeButton": {
            display: "block"
        },
        "& .MuiDropzonePreviewList-removeButton": {
            top: "31px",
            right: "35px",
            width: "40px",
            height: "40px",
            opacity: 0,
            position: "absolute",
            transition: ".5s ease",
        },
        "& .MuiTypography-h5": {
            fontSize: "14px !important",
            color: "#000 !important"
        }
    },
}));

const AddAdvertisementType1 = () => {
    const classes = useStyles();
    const history = useHistory();
    const [loader, setLoader] = useState(false);
    const [profileImage, setProfileImage] = useState();
    const [profileImage64, setProfileImage64] = useState("");

    const getBase64 = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result);
        };
        reader.onerror = function (err) {
            console.log("Error: ", err);
        };
    };

    const handleBack = () => {
        history.push("/advertisement-management-type1");
    };

    const handleDeleteSecond = () => {
        setProfileImage64("");
    };

    const handleFormSubmit = async () => {
        setLoader(true);
        try {
            if (!profileImage64) {
                toast.error("Advertisement Image can't be empty");
            } else {
                const formData = new FormData();
                formData.append("img", profileImage);
                formData.append("advertisementType", "TYPE_1");

                const res = await Axios.post(ApiConfig.addAdvertisement, formData, {
                    headers: {
                        token: window.localStorage.getItem("token"),
                    },
                });

                if (res.data.responseCode === 200) {
                    setLoader(false);
                    toast.success("Advertisement added successfully");
                    setProfileImage64(profileImage64);
                    setTimeout(() => {
                        history.push("/advertisement-management-type1");
                    }, 1000);
                } else if (res.data.responseCode === 500) {
                    setLoader(false);
                    toast.error("Server Error");
                    toast.error(
                        "Cannot reach the internet. Please check your device's internet connection."
                    );
                } else {
                    toast.warn(res.data.message);
                    setLoader(false);
                }
            }
        } catch (error) {
            setLoader(false);
            if (error.response) {
                toast.error(error.response.data.responseMessage);
            }
        }
    };

    return (
        <Page title={"Create-Roles"}>
            <Box className={classes.bannerbox}>
                <Box className={classes.mainbox}>
                    <Grid container className="d-flex justify-space-between">
                        <Typography variant="h4">Add Advertisement - Type 1</Typography>
                    </Grid>

                    <Box mt={4}>
                        <Grid>
                            <Box
                                mt={2}
                                className={profileImage64 === "" ? "" : classes.dropZoneArea}
                            >
                                <DropzoneArea
                                    maxFileSize={40000000}
                                    acceptedFiles={["image/*"]}
                                    files={profileImage64}
                                    filesLimit={1}
                                    onDrop={(files) =>
                                        getBase64(files[0], (result) => {
                                            setProfileImage64(result);
                                            setProfileImage(files[0]);
                                        })
                                    }
                                    onDelete={handleDeleteSecond}
                                />
                            </Box>
                        </Grid>
                        <Box mt={4}>
                            <Grid container spacing={2} style={{ alignItems: "center" }}>
                                <Grid item md={6} xs={12} align="center">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        fullWidth
                                        className={classes.tableButton}
                                        disabled={loader}
                                        onClick={handleFormSubmit}
                                    >
                                        Save
                                        {loader && <ButtonCircularProgress />}
                                    </Button>
                                </Grid>
                                <Grid item md={6} xs={12} align="center">
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        style={{ background: "red" }}
                                        className={classes.tableButton}
                                        onClick={() => handleBack()}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>

                </Box>
            </Box>
        </Page>
    );
};

export default AddAdvertisementType1;
