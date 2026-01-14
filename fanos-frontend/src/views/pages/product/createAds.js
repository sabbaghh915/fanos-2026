import {
  Box,
  Grid,
  Button,
  MenuItem,
  TextField,
  Select,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { DropzoneArea } from "material-ui-dropzone";
import { Form, Formik } from "formik";
import * as yep from "yup";
import Axios from "axios";
import ApiConfig from "src/config/APIConfig";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import CustomeDropzoneIcon from "src/component/customeDropzoneIcon";
import CustomeDropzoneIconSmall from "src/component/customeDropzoneIconSmall";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  mainbox: {
    paddingTop: "15px",
    paddingBottom: "95px",
  },
  bookDiv: {
    background: "#BF9C76",
    height: "348px",
    paddingLeft: "47px",
    paddingRight: "47px",
  },
  bannerImage: {
    height: "348px",
  },
  buyTicket: {
    background: "transparent",
    border: "1px solid #853600",
    borderRadius: "5px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "18px",
    lineHeight: "49px",
    color: "#843300",
  },
  mainHeading: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "64px",
    lineHeight: "68px",
    color: "#76452C",
    paddingTop: "36px",
  },
  subHeading: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "18px",
    lineHeight: "70px",
    color: "#FFFFFF",
  },
  search: {
    fontSize: "20px",
    color: "#000",
  },
  createads: {
    color: "#000",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "28px",
    lineHeight: "16px",
    paddingTop: "35px",
  },
  label: {
    color: "#8B5CF6",
    fontFamily: "Poppins",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "125%",
  },
  buttonUpdate: {
    background: "#FF6B35",
    color: "#000",
    width: "50%",
    fontSize: "16px",
    fontWeight: "600 !important",
    marginTop: "20px",
    fontFamily: "Poppins",
  },

  updateGrid: {
    paddingTop: "30px",
  },
  TextBox: {
    background: "#F7F8F9",
    color: "#8B5CF6 !important",
    "& .MuiInputBase-input": {
      color: "#8B5CF6 !important",
    },
    "& input.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputMarginDense.MuiOutlinedInput-inputMarginDense":
    {
      color: "#8B5CF6 !important",
    },
    "& input:-webkit-autofill": {
      "-webkit-text-fill-color": "#8B5CF6 !important",
    },

  },
  formBox: {
    background: "#F5F5F5",
    padding: "20px",
    borderRadius: "6px",
  },
  dropZoneArea1: {
    "& .MuiDropzoneArea-root": {
      width: "100%",
      border: "1px solid #5d5656 !important",
      cursor: "pointer",
      overflow: "hidden",
      // padding: "5px",
      position: "relative",
      // boxSizing: "border-box",
      minHeight: "160px !important",
      borderColor: "rgba(0, 0, 0, 0.12)",
      borderRadius: "20px",
      backgroundColor: "transparent",
    },
    "& .MuiGrid-container": {
      display: "block !important",
    },
    "& .MuiDropzoneArea-text": {
      color: "#000 !important",
    },
    "& .MuiGrid-grid-xs-4": {
      maxWidth: "100%",

      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    "& .MuiDropzoneArea-textContainer": {
      display: "none",
    },
    "& .MuiDropzonePreviewList-image": {
      height: "170px",
      maxHeight: "170px",
    },
    "& .MuiDropzonePreviewList-removeButton": {
      display: "block",
      top: "31px",
      right: "35px",
      width: "40px",
      height: "40px",
      opacity: 0,
      position: "absolute",
      transition: ".5s ease",
      zIndex:999,
    },
    "& .MuiTypography-h5": {
      fontSize: "14px !important",
      color: "#000 !important",
    },
    // "& .MuiDropzoneArea-root": {
    //     minHeight: '100% !important',
    //     maxHeight: '170px !important'
    // }
  },
  dropZoneArea: {
    "& .MuiDropzoneArea-root": {
      width: "100%",
      border: "1px solid #5d5656 !important",
      cursor: "pointer",
      overflow: "hidden",
      // padding: "5px",
      position: "relative",
      // boxSizing: "border-box",
      minHeight: "160px !important",
      borderColor: "rgba(0, 0, 0, 0.12)",
      borderRadius: "20px",
      backgroundColor: "transparent",
    },
    "& .MuiGrid-container": {
      display: "block !important",
    },
    "& .MuiDropzoneArea-text": {
      color: "#000 !important",
    },
    "& .MuiGrid-grid-xs-4": {
      maxWidth: "100%",
      height: "600px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    "& .MuiDropzoneArea-textContainer": {
      display: "none",
    },
    "& .MuiDropzonePreviewList-image": {
      height: "170px",
      maxHeight: "170px",
    },
    "& .MuiDropzonePreviewList-removeButton": {
      display: "block",
      top: "31px",
      right: "35px",
      width: "40px",
      height: "40px",
      opacity: 0,
      position: "absolute",
      transition: ".5s ease",
      zIndex:999,
    },
    "& .MuiTypography-h5": {
      fontSize: "14px !important",
      color: "#000 !important",
    },
    // "& .MuiDropzoneArea-root": {
    //     minHeight: '100% !important',
    //     maxHeight: '170px !important'
    // }
  },
  dropzonemui: {
    height: "600px",
    fontSize: "16px",
    "@media (max-width:960px)": {
      height: "300px",
    },
    "& .MuiTypography-h5": {
      wordBreak: "break-word",
      [theme.breakpoints.up("sm")]: {
        fontSize: "14px",
      },
      [theme.breakpoints.up("xs")]: {
        fontSize: "14px",
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "16px",
      },
    },

    "& .MuiDropzoneArea-textContainer": {
      padding: "0 33px",
      display: 'flex',
      flexDirection: 'column-reverse',
    },
    "& .MuiDropzoneArea-root": {
      width: "100%",
      height:'100%',
      border: "1px dashed #707070 !important",
      cursor: "pointer",
      overflow: "hidden",
      padding: "10px",
      position: "relative",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: "#707070",
      borderRadius: "20px",
      backgroundColor: "transparent",
    },

    "& .MuiDropzoneArea-text": {
      margin: '0',
      color: "#8B5CF6 !important",
      fontSize: "16px !important",
      fontWeight: "500 !important",

    },
  },

  dropzonemui1: {
    height: '100%',
    fontSize: "16px",
    "& .MuiTypography-h5": {
      [theme.breakpoints.up("sm")]: {
        fontSize: "14px",
      },
      [theme.breakpoints.up("xs")]: {
        fontSize: "14px",
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "16px",
      },
    },
    "& .MuiDropzoneArea-root": {
      width: "100%",
      height:'100%',
      maxWidth:'173px',
      maxHeight:'153px',
      border: "1px dashed #707070 !important",
      cursor: "pointer",
      overflow: "hidden",
      padding: "10px",
      position: "relative",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: "#707070",
      borderRadius: "20px",
      backgroundColor: "transparent",
    },

    "& .MuiDropzoneArea-text": {
      margin: '0',
      color: "#8B5CF6 !important",
      fontSize: "16px !important",
      fontWeight: "500 !important",

    },

    "& .MuiDropzoneArea-textContainer": {
      display: 'flex',
      flexDirection: 'column-reverse',
    },
  },

  forminput: {
    "& .MuiSelect-root.MuiSelect-select.MuiSelect-selectMenu.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input":
    {
      color: "#8B5CF6 !important",
    },
    "& .MuiOutlinedInput-root": {
      background: "#F7F8F9",
    },
  },
  gridBox: {
    // gap: "1.5rem",
    marginTop: "20px",
    // width: "114%",
    // "@media (min-width: 320px) and (max-width: 600px)": {
    //   width: "100%",
    // },
  },
  SelectCategory: {
    "& .MuiOutlinedInput-input": {
      padding: "13.5px 14px 13.5px 18px !important",
      fontFamily: "Poppins !important",
    },
  },
  SelectCategoryItem: {
    "&.MuiMenuItem-root": {
      fontFamily: "Poppins !important",
      fontSize: "16px",
      color: "#6D28D9",
      fontWeight: "400",
    },
  },

  mainGridContainer: {
    marginTop: "20px",
    justifyContent: "space-between",
  },
}));

const CreateAds = function (props) {
  const classes = useStyles();

  const history = useHistory();

  const [subcurrentvalue, setSubCurrentValue] = useState("");
  const [productImageFirst, setProductImageFirst] = useState(null);
  const [productImageSecond, setProductImageSecond] = useState(null);

  const [productImageThird, setProductImageThird] = useState(null);

  const [productImageFourth, setProductImageFourth] = useState(null);

  const [productImageFive, setProductImageFive] = useState(null);
  const [loader, setLoader] = useState(false);
  const [subData, setSubData] = useState([]);
  const [category, setCategory] = useState([]);
  

  const handleDeleteSecond = () => {
    setProductImageSecond(""); // or setProductImageSecond('');
  };

  const handleDeleteFirst = () => {
    setProductImageFirst(""); // or setProductImageSecond('');
  };
  const handleDeleteThird = () => {
    setProductImageThird(""); // or setProductImageSecond('');
  };
  const handleDeleteFourth = () => {
    setProductImageFourth(""); // or setProductImageSecond('');
  };
  const handleDeleteFive = () => {
    setProductImageFive(""); // or setProductImageSecond('');
  };

  const formInitialSchema = {
    category: "",
    subcategory: "",
    name: "",
    description: "",
    price: "",
    currency: "",
    location: "",

  };
  let formData = new FormData();

  const handleFormSubmit = async (values) => {
    if (
      !(
        productImageFirst == null &&
        productImageSecond == null &&
        productImageThird == null
      )
    ) {
      formData.append("productName", values.name);
      formData.append("description", values.description);

      formData.append("categoryId", values.category);

      formData.append("subCategoryId", values.subcategory);
      formData.append("currency", values.currency);
      formData.append("price", values.price.toString());

      formData.append("location", values.location);



      formData.append("productImage1", productImageFirst);
      formData.append("productImage2", productImageSecond);

      formData.append("productImage3", productImageThird);

      formData.append("productImage4", productImageFourth);

      formData.append("productImage5", productImageFive);

      const token = localStorage.getItem("token");
      setLoader(true);

      try {
        const res = await Axios({
          method: "POST",
          url: ApiConfig.addProduct,
          headers: {
            token: token,
          },
          data: formData,
        });

        if (res.data.responseCode === 200) {
          setLoader(false);

          toast.success(res.data.responseMessage);

          localStorage.setItem("productId", res.data.result._id);
          history.push("/payment-ads");
        } else {
          setLoader(false);
          toast.error(res.data.responseMessage);
        }
        } catch (error) {
        setLoader(false);
        toast.error(error.response.data.responseMessage);
        }
         } else {
           toast.error("Please upload the first three images");
         }
       };

  const getCategory = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.listCategory,
        params: {
          type: "PRODUCT",
        },
      });

      if (res.data.responseCode === 200) {
        setCategory(res.data.result.docs);
      } else {
     
      }
    } catch (error) {
   
    }
  };

  const getSubCategory = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.subCategory,
        params: {
          categoryId: subcurrentvalue,
        },
      });

      if (res.data.responseCode === 200) {
        setSubData(res.data.result.docs);
      } else {
      }
    } catch (error) { }
  };

  const getcurrency = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.addProduct,
        params: {
         currency: subcurrentvalue
        },
      });

      if (res.data.responseCode === 200) {
        setSubData(res.data.result.docs);
      } else {
      }
    } catch (error) { }
  };

  const handleImageSelect = (event) => {
    const file = event[0];

    setProductImageFirst(file);
  };

  const handleImageSelectSecond = (event) => {
    const file = event[0];

    setProductImageSecond(file);
  };
  const handleImageSelectThird = (event) => {
    const file = event[0];

    setProductImageThird(file);
  };
  const handleImageSelectFourth = (event) => {
    const file = event[0];

    setProductImageFourth(file);
  };
  const handleImageSelectFive = (event) => {
    const file = event[0];

    setProductImageFive(file);
  };

  useEffect(() => {
    getCategory();
    getSubCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getSubCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subcurrentvalue]);

  useEffect(() => {
    getcurrency();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subcurrentvalue]);

  const convertArabicToEnglish = (str) => {
    if (!str) return "";
    const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    const englishNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let converted = str;
    arabicNumbers.forEach((num, index) => {
      const regex = new RegExp(num, "g");
      converted = converted.replace(regex, englishNumbers[index]);
    });
    return converted;
  };
  


  return (
    <div>
      <Page title={"home"}>
        <Box className={classes.bannerbox}>
          <Box className={classes.mainbox}>
            <Formik
              onSubmit={(values) => handleFormSubmit(values)}
              initialValues={formInitialSchema}
              initialStatus={{
                success: false,
                successMsg: "",
              }}
              validationSchema={yep.object().shape({
                category: yep.string().required("Category name is required."),
                subcategory: yep
                  .string()
                  .required("SubCategory name is required."),
                name: yep
                  .string()
                  .required("Product name is required."),
                description: yep.string().required("Description required."),
                price: yep
                  .string()
                  .matches(/^[0-9]*$/, "Only numbers are allowed")
                  .matches(/^[^-+]*$/, "Cannot contain + or - symbols")
                  .max(16)
                  .required("Price required."),
                currency: yep
                  .string()
                  .required("currency is required."),
                location: yep
                  .string()
                  .max(16)
                  .required("Location required."),

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
                  <Grid item lg={12} className={classes.createads}>
                    Create Ads
                  </Grid>

                  <Grid
                    container
                    className={classes.mainGridContainer}
                    spacing={5}
                  >
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <div
                        className={
                          productImageFirst === undefined
                            ? classes.dropzonemui
                            : classes.dropZoneArea
                        }
                      >
                        <DropzoneArea
                          maxFileSize="40000000"
                          filesLimit="1"
                          classes={classes.dropzonemui}
                          style={{
                            marginTop: "48px",
                            marginLeft: "20px",
                          }}
                          acceptedFiles={["image/*"]}
                          onChange={(e) => handleImageSelect(e)}
                          onDelete={handleDeleteFirst}
                          Icon={CustomeDropzoneIcon}
                          dropzoneText="Upload Photo"
                        />
                      </div>

                      <Grid container className={classes.gridBox} spacing={3}>
                        <Grid item xs={12} sm={3} md={3} lg={3}>
                          <div
                            className={
                              productImageSecond === undefined
                                ? classes.dropzonemui1
                                : classes.dropZoneArea1
                            }
                          >
                            <DropzoneArea
                              maxFileSize="40000000"
                              filesLimit="1"
                              classes={classes.dropzonemui1}
                              style={{
                                marginTop: "48px",
                                marginLeft: "20px",
                              }}
                              acceptedFiles={["image/*"]}
                              onChange={(e) => handleImageSelectSecond(e)}
                              onDelete={handleDeleteSecond}
                              Icon={CustomeDropzoneIconSmall}
                              dropzoneText="Upload Photo"
                            />
                          </div>
                        </Grid>

                        <Grid item xs={12} sm={3} md={3} lg={3}>
                          <div
                            className={
                              productImageThird === undefined
                                ? classes.dropzonemui1
                                : classes.dropZoneArea1
                            }
                          >
                            <DropzoneArea
                              maxFileSize="40000000"
                              filesLimit="1"
                              classes={classes.dropzonemui1}
                              style={{
                                marginTop: "48px",
                                marginLeft: "20px",
                              }}
                              acceptedFiles={["image/*"]}
                              onChange={(e) => handleImageSelectThird(e)}
                              onDelete={handleDeleteThird}
                              Icon={CustomeDropzoneIconSmall}
                              dropzoneText="Upload Photo"
                            />
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={3} md={3} lg={3}>
                          <div
                            className={
                              productImageFourth === undefined
                                ? classes.dropzonemui1
                                : classes.dropZoneArea1
                            }
                          >
                            <DropzoneArea
                              maxFileSize="40000000"
                              filesLimit="1"
                              classes={classes.dropzonemui1}
                              style={{
                                marginTop: "48px",
                                marginLeft: "20px",
                              }}
                              acceptedFiles={["image/*"]}
                              onChange={(e) => handleImageSelectFourth(e)}
                              onDelete={handleDeleteFourth}
                              Icon={CustomeDropzoneIconSmall}
                              dropzoneText="Upload Photo"
                            />
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={3} md={3} lg={3}>
                          <div
                            className={
                              productImageFive === undefined
                                ? classes.dropzonemui1
                                : classes.dropZoneArea1
                            }
                          >
                            <DropzoneArea
                              maxFileSize="40000000"
                              filesLimit="1"
                              classes={classes.dropzonemui1}
                              style={{
                                marginTop: "48px",
                                marginLeft: "20px",
                              }}
                              acceptedFiles={["image/*"]}
                              onChange={(e) => handleImageSelectFive(e)}
                              onDelete={handleDeleteFive}
                              Icon={CustomeDropzoneIconSmall}
                              dropzoneText="Upload Photo"
                            />
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Box className={classes.formBox}>
                        <Box className={classes.FromTable1}>
                          <label className={classes.label}>
                            Select Category{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <FormControl
                            variant="outlined"
                            fullWidth
                            className={classes.forminput}
                          >
                            <Select
                              margin="dense"
                              id="category"
                              name="category"
                              className={classes.SelectCategory}
                              inputProps={{
                                classes: {
                                  icon: classes.icon,
                                },
                              }}
                              onChange={handleChange}
                              value={values.category}
                              onBlur={() => {
                                setSubCurrentValue(values.category);
                              }}
                              onFocus={() => {
                                setSubCurrentValue(values.category);
                              }}
                            >
                              {category.map((values) => {
                                return (
                                  <MenuItem
                                    className={classes.SelectCategoryItem}
                                    value={values._id}
                                    key={values._id}
                                  >
                                    {values.categoryName.length > 50
                                      ? values?.categoryName.slice(0, 50) +
                                      "..."
                                      : values?.categoryName}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                            <FormHelperText
                              error
                              style={{
                                fontSize: "12px",
                                fontFamily: "Poppins",
                              }}
                            >
                              {touched.category && errors.category}
                            </FormHelperText>
                          </FormControl>
                        </Box>

                        <Grid item xs={12}>
                          <Box className={classes.FromTable1}>
                            <label className={classes.label}>
                              Select Sub-Category{" "}
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <FormControl
                              variant="outlined"
                              fullWidth
                              className={classes.forminput}
                            >
                              <Select
                                margin="dense"
                                name="subcategory"
                                id="subcategory"
                                className={classes.SelectCategory}
                                inputProps={{
                                  classes: {
                                    icon: classes.icon,
                                  },
                                }}
                                onChange={handleChange}
                                value={values.subcategory}
                                onBlur={handleBlur}
                              >
                                {subData.map((values) => {
                                  return (
                                    <MenuItem
                                      value={values._id}
                                      key={values._id}
                                      className={classes.SelectCategoryItem}
                                    >
                                      {values.subCategoryName > 50
                                        ? values.subCategoryName.slice(0, 50) +
                                        "..."
                                        : values.subCategoryName}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                              <FormHelperText
                                error
                                style={{
                                  fontSize: "12px",
                                  fontFamily: "Poppins",
                                }}
                              >
                                {touched.subcategory && errors.subcategory}
                              </FormHelperText>
                            </FormControl>
                          </Box>
                        </Grid>

                        <Grid item xs={12} style={{ paddingTop: "10px" }}>
                          <label className={classes.label}>
                            Product Name <span style={{ color: "red" }}>*</span>
                          </label>
                          <TextField
                            type="text"
                            variant="outlined"
                            fullWidth

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

                        <Grid
                          item
                          xs={12}
                          lg={12}
                          style={{ paddingTop: "10px" }}
                        >
                          <label className={classes.label}>
                            Description <span style={{ color: "red" }}>*</span>
                          </label>
                          <TextField
                            type="text"
                            variant="outlined"
                            fullWidth
                            id="description"
                            multiline
                            rows={3}
                            size="small"
                            inputProps={{ maxLength: 3000 }}
                            value={values.description}
                            name="description"
                            className="textFeilds"
                            error={Boolean(
                              touched.description && errors.description
                            )}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            InputProps={{
                              className: classes.TextBox,
                              style: { padding: "0px" },
                            }}
                          />
                          <FormHelperText
                            error
                            style={{ fontSize: "12px", fontFamily: "Poppins" }}
                          >
                            {touched.description && errors.description}
                          </FormHelperText>
                        </Grid>

                        <Grid item xs={12} lg={12} style={{ paddingTop: "10px" }}>
                          <label className={classes.label}>
                            Price <span style={{ color: "red" }}>*</span>
                          </label>
                          <TextField
                            variant="outlined"
                            type="number"
                            fullWidth
                            id="price"
                            size="small"
                            inputProps={{
                              max: 200000000,
                              inputMode: "numeric",
                              style: { direction: "ltr", unicodeBidi: "plaintext" },
                            }}
                            value={values.price}
                            name="price"
                            className="textFields"
                            error={Boolean(touched.price && errors.price)}
                            onBlur={handleBlur}
                            onChange={(event) => {
                              const enteredPrice = event.target.value;
                              const englishNumbers = convertArabicToEnglish(enteredPrice);
                              const cleanedPrice = englishNumbers.replace(/[^0-9.]/g, ""); // نسمح بأي عدد من الأرقام
                              handleChange({
                                target: {
                                  value: cleanedPrice,
                                  name: "price",
                                },
                              });
                            }}
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

                        <Grid item xs={12}>
                          <Box className={classes.FromTable1}>
                            <label className={classes.label}>
                            currency{" "}
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <FormControl
                              variant="outlined"
                              fullWidth
                              className={classes.forminput}
                            >
                              <Select
                               margin="dense"
                               name="currency"
                               id="currency"
                               className={classes.Selectcurrency}
                               inputProps={{
                               classes: {
                                icon: classes.icon,
                               },
                               }}
                              onChange={handleChange}
                              value={values.currency}
                               onBlur={handleBlur}
                                 >
  <MenuItem value="USD">USD</MenuItem>
  <MenuItem value="EUR">EUR</MenuItem>
  <MenuItem value="TRY">TRY</MenuItem>
</Select>
                              <FormHelperText
                                error
                                style={{
                                  fontSize: "12px",
                                  fontFamily: "Poppins",
                                }}
                              >
                                {touched.currency && errors.currency}
                              </FormHelperText>
                            </FormControl>
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          lg={12}
                          style={{ paddingTop: "10px" }}
                        >
                          <label className={classes.label}>
                            Location <span style={{ color: "red" }}>*</span>
                          </label>
                          <TextField
                            type="text"
                            variant="outlined"
                            fullWidth
                            id="location"
                            size="small"
                            inputProps={{ maxLength: 16 }}
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


                        <Grid lg={12} md={12} sm={12} xs={12} align="end">
                          <Button
                            className={classes.buttonUpdate}
                            type="submit"
                            disabled={loader}
                          >
                            Post
                            {loader && <ButtonCircularProgress />}
                          </Button>
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>

                  <Grid className={classes.updateGrid}></Grid>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Page>
    </div>
  );
};

export default CreateAds;
