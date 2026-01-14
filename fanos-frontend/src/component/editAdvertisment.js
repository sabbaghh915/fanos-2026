import {
    Box,
    Grid,
    FormHelperText,
    TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import { Form, Formik } from "formik";
import * as yep from "yup";
import Axios from "axios";
import ApiConfig from "src/config/APIConfig";
import { useLocation } from "react-router-dom";
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
    TextBox: {
        "& input.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputMarginDense.MuiOutlinedInput-inputMarginDense": {
            color: "#000 !important",
            background: "#F0F0F0"
        },
        "&.MuiOutlinedInput-root": {
            borderRadius: "0px"
        }

    },
    bannerbox: {
        paddingTop: "42px"
    },
  

}));
export default function (props) {
    const classes = useStyles();
    const [isloading, setLoader] = useState(false);
    const [data, setData] = useState([]);
    const location = useLocation();
    const propsData = location.state.data;
    const formInitialSchema = {
        name: "",
        description: "",
        category: "",
        price: "",
        location: "",

    };

      const handleFormSubmit = async (values) => {
        const token = localStorage.getItem("token");

        try {
            const res = await Axios({
                method: "POST",
                url: ApiConfig.updateProduct,
                headers: {
                    token: token
                },
                data: {
                    productId: propsData._id,
                    productName: values.name,
                    description: values.description,
                    categoryId: propsData.categoryId,
                    subCategoryId: propsData.subCategoryId,
                    price: values.price,
                    currency: values.currency,
                    location: values.location,
                    productImage1: values.productImage1,
                    productImage2: values.productImage2,
                    productImage3: values.productImage3,
                    productImage4: values.productImage4,
                    productImage5: values.productImage5


                }

            });
            if (res.data.responseCode == 200) {
                setData(res.data.result.docs);

                setLoader(false);

            } else {
                setLoader(false);

            }
        } catch (error) {
            setLoader(false);

        }
    };
    return (
        <Page title={"Settings"}>
            <Box className={classes.bannerbox}>
                <Formik
                    onSubmit={(values) => handleFormSubmit(values)}
                    initialValues={formInitialSchema}
                    
                    initialStatus={{
                        success: false,
                        successMsg: "",
                    }}
                    validationSchema={yep.object().shape({

                        name: yep
                            .string()
                            .required("Please enter product name"),


                        description: yep
                            .string()
                            .max(16)
                            .min(8, "Password must be at least 8 characters")
                            .required("description required."),

                        category: yep
                            .string()
                            .max(16)
                            .min(8, "Password must be at least 8 characters")
                            .required("category required."),
                        price: yep
                            .string()
                            .required("price required."),
                            
                        currency: yep
                            .string()
                            .required("currency required."),

                        location: yep
                            .string()
                            .max(16)

                            .required("location required."),
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
                                <Grid item xs={12}>
                                    <label className={classes.label}>Product Name</label>
                                    <TextField
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                        id="name "
                                        size="small"
                                        inputProps={{ maxLength: 256 }}
                                        value={values.name}
                                        name="name"
                                        className="textFeilds"
                                        error={Boolean(touched.name && errors.name)}
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
                                        {touched.name && errors.name}
                                    </FormHelperText>
                                </Grid>


                                <Grid item xs={12}>
                                    <label className={classes.label}>Description</label>
                                    <TextField
                                        multiline
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                        id="description"
                                        placeholder="It is Nokia mobile phone with a 2 MB back camera. It is Nokia mobile phone with a 2 MB back camera. It is Nokia mobile phone with a 2 MB back camera. It is Nokia mobile phone with a 2 MB back camera."
                                        size="small"
                                        inputProps={{ maxLength: 256 }}
                                        value={values.description}
                                        name="description"
                                        className="textFeilds"
                                        error={Boolean(touched.description && errors.description)}
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
                                        {touched.description && errors.description}
                                    </FormHelperText>
                                </Grid>
                                <Grid item xs={12}>
                                    <label className={classes.label}>Category</label>
                                    <TextField
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                        id="category"
                                        size="small"
                                        inputProps={{ maxLength: 256 }}
                                        value={values.category}
                                        name="category"
                                        className="textFeilds"
                                        error={Boolean(touched.category && errors.category)}
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
                                        {touched.category && errors.category}
                                    </FormHelperText>
                                </Grid>
                                <Grid item xs={12} lg={12}>
                                    <label className={classes.label}>Price</label>
                                    <TextField
                                        type="number"
                                        variant="outlined"
                                        fullWidth
                                        id="price"
                                        size="small"
                                        inputProps={{ maxLength: 256 }}
                                        value={values.price}
                                        name="price"
                                        className="textFeilds"
                                        error={Boolean(touched.price && errors.price)}
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
                                        {touched.price && errors.price}
                                    </FormHelperText>
                                </Grid>
                                <Grid item xs={12} lg={12}>
                                    <label className={classes.label}>currency</label>
                                    <TextField
                                        type="number"
                                        variant="outlined"
                                        fullWidth
                                        id="currency"
                                        size="small"
                                        inputProps={{ maxLength: 256 }}
                                        value={values.currency}
                                        name="currency"
                                        className="textFeilds"
                                        error={Boolean(touched.currency && errors.currency)}
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
                                        {touched.currency && errors.currency}
                                    </FormHelperText>
                                </Grid>

                                <Grid item xs={12} lg={12}>
                                    <label className={classes.label}>Location</label>
                                    <TextField
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                        id="location"
                                        size="small"
                                        inputProps={{ maxLength: 256 }}
                                        value={values.location}
                                        name="location"
                                        className="textFeilds"
                                        error={Boolean(touched.location && errors.location)}
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
                                        {touched.location && errors.location}
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
