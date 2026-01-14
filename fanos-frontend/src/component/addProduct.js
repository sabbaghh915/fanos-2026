import {
    Typography,
    Box,
    Grid,
    List,
    ListItem,
    FormHelperText,
    FormControl,
    InputAdornment,
    TextField,
    Button,
    DialogContent,
    FormControlLabel,
    MenuItem,
    Select,
} from "@material-ui/core";
import React, { useState, useRef, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import { Form, Formik } from "formik";
import * as yep from "yup";
// import { toast } from "react-toastify";
import { toast } from "react-toastify";

import ButtonCircularProgress from "src/component/ButtonCircularProgress";
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        "& > *": {
            margin: theme.spacing(1),
        },
    },
    label: {
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "18px",
        lineHeight: "27px",
        marginTop: "0px !important",
        marginBottom: "-5px !important",
        color: "#1E1E1E",
    },
    TextBox: {
        borderRadius: "10px",
        border: "2px solid #ffffff",
        height: "51px",
        "& .MuiOutlinedInput-input": {

        },
    },
    submitButton: {
        width: "100%",
        height: "55px",
        background: "#FF6B35",
        borderRadius: "5px",
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "14px",
        lineHeight: "21px",
        color: "#FFFFFF",
    },
    addressButton: {
        background: "#FF6B35",
        borderRadius: "5px",
        width: "100%",
        maxWidth: "172px",
        height: "38px",
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "14px",
        lineHeight: "15px",
        color: "#FFFFFF",
    },
    createAds: {
        color: "#000",
        paddingTop: "10px",
        fontSize: "24px"
    }
}));
export default function () {
    const classes = useStyles();
    const [isloading, setLoader] = useState(false);
    const [currentvalue, setCurrentValue] = useState("all");
    const [subcurrentvalue, setSubCurrentValue] = useState("all");


    const formInitialSchema = {
        name: "",
        phoneNo: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zipcode: "",
    };
    const handleFormSubmit = () => { };
    return (
        <Page title={"home"}>
            
            <Box className={classes.bannerbox}>
                <Typography className={classes.createAds}>Create Ads</Typography>
                <Formik
                    onSubmit={(values) => handleFormSubmit(values)}
                    initialValues={formInitialSchema}
                    // initialValues={{
                    //   email: "",
                    //   password: "",
                    // }}
                    initialStatus={{
                        success: false,
                        successMsg: "",
                    }}
                    validationSchema={yep.object().shape({
                        email: yep
                            .string()
                            .email(
                                "You have entered an invalid email address. Please try again"
                            )
                            .required("Please enter your email address")
                            .matches("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"),

                        password: yep
                            .string()
                            .max(16)
                            .min(8, "Password must be at least 8 characters")
                            .required("Please enter your password"),
                    })}
                >
                    {({
                        errors,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        touched,
                        values,
                        setFieldValue,
                    }) => (
                        <Form>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={12} lg={12}>
                                    <Box className={classes.FromTable1}>
                                        <label className={classes.label}>Select Category</label>
                                        <FormControl
                                            variant="outlined"
                                            fullWidth
                                            className={classes.forminput}
                                        >
                                            <Select
                                                margin="dense"
                                                style={{}}
                                                // label="All "
                                                name="token"
                                                className={`${classes.date} textFeilds`}
                                                inputProps={{
                                                    classes: {
                                                        icon: classes.icon,
                                                    },
                                                }}
                                                onChange={(e) => setCurrentValue(e.target.value)}
                                                value={currentvalue}
                                            >
                                                <MenuItem value="all" style={{ fontSize: "12px" }}>
                                                    All
                                                </MenuItem>
                                                <MenuItem value="product1" style={{ fontSize: "12px" }}>
                                                    Prouct 1
                                                </MenuItem>
                                                <MenuItem value="product2" style={{ fontSize: "12px" }}>
                                                    Product 2
                                                </MenuItem>
                                                <MenuItem value="product3" style={{ fontSize: "12px" }}>
                                                    Product 3
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>


                                <Grid item xs={12}>
                                    <Box className={classes.FromTable1}>
                                        <label className={classes.label}>Select Sub-Category</label>
                                        <FormControl
                                            variant="outlined"
                                            fullWidth
                                            className={classes.forminput}
                                        >
                                            <Select
                                                margin="dense"
                                                style={{}}
                                                // label="All "
                                                name="token"
                                                className={`${classes.date} textFeilds`}
                                                inputProps={{
                                                    classes: {
                                                        icon: classes.icon,
                                                    },
                                                }}
                                                onChange={(e) => setSubCurrentValue(e.target.value)}
                                                value={subcurrentvalue}
                                            >
                                                <MenuItem value="all" style={{ fontSize: "12px" }}>
                                                    All
                                                </MenuItem>
                                                <MenuItem value="product1" style={{ fontSize: "12px" }}>
                                                    Sub-Prouct 1
                                                </MenuItem>
                                                <MenuItem value="product2" style={{ fontSize: "12px" }}>
                                                    Sub-Product 2
                                                </MenuItem>
                                                <MenuItem value="product3" style={{ fontSize: "12px" }}>
                                                    Sub-Product 3
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <label className={classes.label}>Category</label>
                                    <TextField
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                        id="address2"
                                        size="small"
                                        inputProps={{ maxLength: 256 }}
                                        value={values.address1}
                                        name="address2"
                                        className="textFeilds"
                                        error={Boolean(touched.address1 && errors.address1)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}

                                        InputProps={{
                                            className: classes.TextBox,
                                        }}
                                    />
                                    <FormHelperText
                                        error
                                        style={{ fontSize: "12px", fontFamily: "Poppins" }}
                                    >
                                        {touched.address1 && errors.address1}
                                    </FormHelperText>
                                </Grid>
                                <Grid item xs={12} lg={12}>
                                    <label className={classes.label}>Price</label>
                                    <TextField
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                        id="city"
                                        size="small"
                                        inputProps={{ maxLength: 256 }}
                                        value={values.address2}
                                        name="city"
                                        className="textFeilds"
                                        error={Boolean(touched.address2 && errors.address2)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}

                                        InputProps={{
                                            className: classes.TextBox,
                                        }}
                                    />
                                    <FormHelperText
                                        error
                                        style={{ fontSize: "12px", fontFamily: "Poppins" }}
                                    >
                                        {touched.address2 && errors.address2}
                                    </FormHelperText>
                                </Grid>
                                <Grid item xs={12} lg={12}>
                                    <label className={classes.label}>Location</label>
                                    <TextField
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                        id="state"
                                        size="small"
                                        inputProps={{ maxLength: 256 }}
                                        value={values.state}
                                        name="state"
                                        className="textFeilds"
                                        error={Boolean(touched.state && errors.state)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}

                                        InputProps={{
                                            className: classes.TextBox,
                                        }}
                                    />
                                    <FormHelperText
                                        error
                                        style={{ fontSize: "12px", fontFamily: "Poppins" }}
                                    >
                                        {touched.state && errors.state}
                                    </FormHelperText>
                                </Grid>


                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Page>
    );
}
