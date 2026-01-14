// import {
//     Typography,
//     Box,
//     Grid,
//     TextField,
//     Button,
//     FormHelperText,
// } from "@material-ui/core";
// import React, { useState, useEffect } from "react";
// import { makeStyles, withStyles } from "@material-ui/core/styles";
// import Page from "src/component/Page";
// import ButtonCircularProgress from "src/component/ButtonCircularProgress";
// import Select from "react-select";
// import { useHistory } from "react-router-dom";
// import { Form, Formik } from "formik";
// import * as yep from "yup";
// import { toast, ToastContainer } from "react-toastify";
// import Axios from "axios";
// import ApiConfig from "src/config/APICongig";
// import AddIcon from '@material-ui/icons/Add';

// const options = [
//     { value: "Food", label: "Food" },
//     { value: "Being Fabulous", label: "Being Fabulous" },
//     { value: "Ken Wheeler", label: "Ken Wheeler" },
//     { value: "ReasonML", label: "ReasonML" },
//     { value: "Unicorns", label: "Unicorns" },
//     { value: "Kittens", label: "Kittens" },
// ];
// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: "flex",
//         "& > *": {
//             margin: theme.spacing(1),
//         },
//     },

//     mainbox: {
//         borderRadius: "20px",
//         padding: "20px 0px",
//         "& h5": {
//             fontFamily: "Poppins",
//             fontStyle: "normal",
//             fontWeight: "700",
//             fontSize: "25px",
//             lineHeight: "54px",
//             color: "#000000",
//         },
//         "& h5": {
//             fontFamily: "Poppins",
//             fontStyle: "normal",
//             fontWeight: "700",
//             fontSize: "18px",
//             lineHeight: "54px",
//             color: "#000000",
//         },
//         "& h4": {
//             fontFamily: "Poppins",
//             fontStyle: "normal",
//             fontWeight: "700",
//             fontSize: "36px",
//             lineHeight: "54px",
//             /* identical to box height */

//             color: "#0C576C",
//             [theme.breakpoints.down("sm")]: {
//                 padding: "20px 16px 20px 16px",
//                 marginTop: "30px",
//                 fontSize: "25px",
//                 borderRadius: "16px",
//             },
//         },
//         [theme.breakpoints.down("sm")]: {
//             padding: "20px 16px 20px 16px",
//             borderRadius: "16px",
//         },
//     },

//     TextBox: {
//         borderRadius: "10px",
//         background: theme.palette.background.taf,
//         height: "55px",
//     },
//     label: {
//         fontFamily: "Poppins",
//         fontStyle: "normal",
//         fontWeight: "bold",
//         fontSize: "16px",
//         lineHeight: "24px",
//         marginTop: "20px !important",
//         marginBottom: "-5px !important",
//         color: "#1E1E1E",
//         [theme.breakpoints.down("sm")]: {
//             fontSize: "13px",
//         },
//     },
//     redText: {
//         color: "#FF0000",
//         marginLeft: "-4px",
//     },

//     buttonDiv: {
//         display: "flex",
//         justifyContent: "space-around",
//     },
//     saveButton: {
//         color: "#FFFFFF",
//         border: "none",
//         height: "36px",
//         fontSize: "14px",
//         background: "#0C576C",
//         fontStyle: "normal",
//         fontFamily: "Poppins",
//         fontWeight: "700 !important",
//         lineHeight: "21px",
//         borderRadius: "10px",
//         width: "100%",
//         maxWidth: "176px",
//     },
//     cancelButton: {
//         color: "#FFFFFF",
//         border: "none",
//         height: "36px",
//         fontSize: "14px",
//         background: "red",
//         fontStyle: "normal",
//         fontFamily: "Poppins",
//         fontWeight: "700 !important",
//         lineHeight: "21px",
//         borderRadius: "10px",
//         width: "100%",
//         maxWidth: "176px",
//     },
//     roleDiv: {
//         marginTop: "9px",
//         "& .css-13cymwt-control": {
//             borderRadius: "10px",
//             background: theme.palette.background.taf,
//             height: "55px",
//         }
//     }
// }));
// const colourStyles = {
//     menuList: styles => ({
//         ...styles,
//         background: 'papayawhip',
//     }),
//     option: (styles, { isFocused, isSelected }) => ({
//         ...styles,
//         background: isFocused
//             ? 'hsla(291, 64%, 42%, 0.5)'
//             : isSelected
//                 ? 'hsla(291, 64%, 42%, 1)'
//                 : undefined,
//         zIndex: 1,
//     }),
//     menu: base => ({
//         ...base,
//         zIndex: 100,
//     }),
// }

// const AddCommission = () => {
//     const history = useHistory();
//     const classes = useStyles();
//     const [loader, setLoader] = useState(false);
//     const [role, setRole] = useState([]);
//     const [number, setNumber] = useState(1);
//     const [roleId, setRoleId] = useState({});
//     const formInitialSchema = {
//         name: "",
//         email: "",
//         password: "",
//         roleId: roleId,
//     };
//     const styles = {
//         borderRadius: "10px",
//         background: "#F3F5F6",
//         height: "55px",
//     };
//     const getRoles = async () => {
//         setRole("");
//         const array = [];
//         try {
//             const res = await Axios({
//                 method: "GET",
//                 url: ApiConfig.getRole,
//                 headers: {
//                     token: window.localStorage.getItem("token"),
//                 },
//             });
//             console.log(res, "res");
//             if (res.data.responseCode === 200) {
//                 const data = res.data.result;
//                 array.push({ label: data.description, value: data._id });
//                 setRole(array);
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         getRoles();
//         // }
//     }, []);
//     const handleFormSubmit = async (values) => {
//         setLoader(true);
//         try {
//             const res = await Axios({
//                 method: "POST",
//                 url: ApiConfig.addModerato,
//                 headers: {
//                     token: window.localStorage.getItem("token"),
//                 },
//                 data: {
//                     name: values.name,
//                     email: values.email,
//                     password: values.password,
//                     roleId: values.roleId.value,
//                 },
//             });
//             console.log(res, "ressssss");
//             if (res.data.responseCode === 200) {
//                 setLoader(false);
//                 toast.success("Moderator is successfully created");
//                 history.push("/moderator")
//             } else if (res.data.status === 500) {
//                 setLoader(false);
//                 toast.error(
//                     "Cannot reach internet. Please check your device internet connections."
//                 );
//             } else {
//                 toast.warn(res.data.message);
//                 setLoader(false);
//             }
//         } catch (error) {
//             console.log("ERROR", error);
//             setLoader(false);
//             if (error.res) {
//                 toast.error(error.response.data.responseMessage);
//             }
//         }
//     };
//     const [text, setText] = useState("");
//     const [isTextEdited, setIsTextEdited] = useState(false);


//     const handleChange = (event) => {
//         setText(event.target.value);
//         setIsTextEdited(true);
//   };

//     const handleSave = () => {
//         if (isTextEdited) {
//             toast.success("Text saved successfully!");
//         } else {
//             toast.error("Please enter some text first.");
//         }
//     }

//     return (
//         <Page title={"Create-Roles"}>
//             <Box className={classes.bannerbox}>
//                 <Box className={classes.mainbox}>
//                     <Grid container className="d-flex justify-space-between">
//                         <Typography variant="h4">Add Commission</Typography>
//                     </Grid>
//                     <Grid container className="d-flex justify-space-between">
//                         <Typography variant="h3">Range</Typography>
//                     </Grid>
//                     <Formik
//                         onSubmit={(values) => handleFormSubmit(values)}
//                         initialValues={formInitialSchema}
//                         initialStatus={{
//                             success: false,
//                             successMsg: "",
//                         }}
//                         validationSchema={yep.object().shape({
//                             maximum: yep
//                                 .string()
//                                 .required("Please enter  email address."),

//                             commission: yep
//                                 .string()
//                                 .required("Please enter  password."),
//                             // .max(16, "16 charactors are allowed.")
//                             // .matches(
//                             //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
//                             // ),
//                             minimum: yep
//                                 .string()
//                                 .required("Please enter your password."),
//                             roleId: yep.object().required("Please select role."),
//                         })}
//                     >
//                         {({
//                             errors,
//                             handleBlur,
//                             //handleChange,
//                             handleSubmit,
//                             touched,
//                             values,
//                             setFieldValue,
//                         }) => (
//                             <Form>
//                                 <Box mt={2}>
//                                     <Box>
//                                         <label className={classes.label}>
//                                             Minimum <span className={classes.redText}>*</span>
//                                         </label>
//                                         {console.log(values.roleId)}
//                                         <TextField
//                                             placeholder="Role Name"
//                                             type="text"
//                                             variant="outlined"
//                                             fullWidth
//                                             name="minimum"
//                                             size="small"
//                                             inputProps={{ maxLength: 256 }}
//                                             value={values.minimum}
//                                             className="textFeilds"
//                                             //onChange={handleChange}
//                                             InputProps={{
//                                                 className: classes.TextBox,
//                                             }}
//                                         />
//                                         <FormHelperText
//                                             error
//                                             style={{ fontSize: "12px", fontFamily: "Poppins" }}
//                                         >
//                                             {touched.minimum && errors.minimum}
//                                         </FormHelperText>
//                                     </Box>
//                                     <Box>
//                                         <label className={classes.label}>
//                                             Maximum <span className={classes.redText}>*</span>
//                                         </label>
//                                         <TextField
//                                             onChange={handleChange}
//                                             placeholder="Description"
//                                             type="text"
//                                             variant="outlined"
//                                             fullWidth
//                                             name="maximum"
//                                             size="small"
//                                             inputProps={{ maxLength: 256 }}
//                                             value={values.maximum}
//                                             className="textFeilds"
//                                             InputProps={{
//                                                 className: classes.TextBox,
//                                             }}
//                                         />
//                                         <FormHelperText
//                                             error
//                                             style={{ fontSize: "12px", fontFamily: "Poppins" }}
//                                         >
//                                             {touched.maximum && errors.maximum}
//                                         </FormHelperText>
//                                     </Box>
//                                     <Box>
//                                         <label className={classes.label}>
//                                             Commission <span className={classes.redText}>*</span>
//                                         </label>
//                                         <TextField
//                                             onChange={handleChange}
//                                             placeholder="Description"
//                                             type="text"
//                                             variant="outlined"
//                                             fullWidth
//                                             name="commission"
//                                             size="small"
//                                             inputProps={{ maxLength: 256 }}
//                                             value={values.commission}
//                                             className="textFeilds"
//                                             InputProps={{
//                                                 className: classes.TextBox,
//                                             }}
//                                         />
//                                         <FormHelperText
//                                             error
//                                             style={{ fontSize: "12px", fontFamily: "Poppins" }}
//                                         >
//                                             {touched.commission && errors.commission}
//                                         </FormHelperText>
//                                     </Box>

//                                     <Box className={classes.buttonDiv} mt={2}>
//                                         <Button onClick={handleSave}
//                                          type="submit" 
//                                          className={classes.saveButton}>
//                                             Update {loader && <ButtonCircularProgress />}
//                                         </Button>
//                                         <Button
//                                             onUpdate={() => history.push("/commission-management")}
//                                             className={classes.saveButton}
                                            
//                                         >
//                                             Back
//                                         </Button>
//                                     </Box>
//                                 </Box>
//                             </Form>
//                         )}
//                     </Formik>
//                     {/* <Grid>
//                         <AddIcon onClick={setNumber(number + 1)} />
//                     </Grid> */}
//                 </Box>
//             </Box>
//         </Page>
//     );
// }

// export default AddCommission
