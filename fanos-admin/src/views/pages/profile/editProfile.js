// import React, { useContext, useEffect, useState } from "react";
// import {
//   Grid,
//   Box,
//   Container,
//   Typography,
//   Button,
//   FormControl,
//   makeStyles,
//   FormHelperText,
//   MenuItem,
//   InputLabel,
//   Select,
// } from "@material-ui/core";
// import TextField from "@material-ui/core/TextField";
// import { useHistory } from "react-router-dom";
// import { Form, Formik } from "formik";
// import { DropzoneArea } from "material-ui-dropzone";
// import * as yep from "yup";
// import ApiConfig from "src/config/APICongig";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { AuthContext } from "src/context/Auth";
// import ButtonCircularProgress from "src/component/ButtonCircularProgress";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import moment from "moment";
// import Dropzone from "react-dropzone-uploader";
// import "react-dropzone-uploader/dist/styles.css";
// import { KeyboardDatePicker } from "@material-ui/pickers";
// import Page from "src/component/Page";
// import { useLocation } from 'react-router-dom';
// import Axios from "axios";
// import { useAtStart } from "react-scroll-to-bottom";



// const useStyles = makeStyles((theme) => ({
//   Box: {
//     background: "#302F35",
//     border: "1px solid #898989",
//     height: "200px",
//     width: "200px",
//     borderRadius: "25px",
//   },
//   FAQ: {
//     padding: "20px 0",
//     [theme.breakpoints.down("xs")]: {
//       padding: "35px 0",
//     },
//   },
//   PageHeading: {
//     paddingBottom: "20px",
//   },
//   TextBox: {
//     borderRadius: "10px",
//     // background: theme.palette.background.taf,
//     height: "55px",
//   },
//   outerContainer: {
//     border: "1px solid #333",
//     borderRadius: "10px",
//     padding: "1rem",
//   },
//   editsection: {
//     background: "#FFFFFF",
//     borderRadius: "10px",
//     /* padding: 57px; */
//     padding: "41px 62px 60px 62px !important",
//     "& h2": {
//       // color: "#1D2D3F",
//       color: theme.palette.text.primary,

//       fontStyle: "normal",
//       fontWeight: "bold",
//       fontSize: "40px",
//       lineHeight: "130%",
//     },

//     "& h3": {
//       fontStyle: "normal",
//       fontWeight: "500",
//       fontSize: "14px",
//       lineHeight: "130%",
//       // color: "#1D2D3F",
//       color: theme.palette.text.primary,
//     },
//   },
//   inputfield: {
//     "& label": {
//       fontFamily: "Poppins",
//       fontStyle: "normal",
//       fontWeight: "500",
//       fontSize: "16px",
//       lineHeight: "24px",
//       color: "#000000",
//     },
//   },
//   imagefiled: {
//     "& label": {
//       color: theme.palette.secondary.main,
//       // color: "#1D2D3F",
//     },
//     "& small": {},
//   },
//   inputsection: {
//     color: "#848484",
//     cursor: "text",
//     position: "relative",
//     fontSize: "1rem",
//     boxSizing: "border-box",
//     fontWeight: "400",
//     lineHeight: "1.1876em",
//     "& input": {
//       // color: "#000000",
//       width: "100%",
//       border: "0",
//       height: "1.1876em",
//       margin: "0",
//       display: "block",
//       padding: "10px 8px",
//       fontSize: "14px",
//       minWidth: "0",
//       background: "none",
//       boxSizing: "content-box",
//       animationName: "mui-auto-fill-cancel",
//       letterSpacing: "inherit",
//       animationDuration: "10ms",
//       WebkitTapHighlightColor: "transparent",
//     },
//   },
//   imagesBox: {
//     display: "flex",
//     justifyContent: "flex-start",
//     maxWidth: "200px",
//     width: "100%",
//     height: "200px",
//     margin: "0",
//     [theme.breakpoints.down("xs")]: {
//       width: "150px",
//       height: "150px",
//     },
//   },
//   message: { color: theme.palette.primary.main },
//   colorbox: {
//     // color: "#1D2D3F",
//     color: theme.palette.text.primary,
//     height: "auto",
//     "& .MuiDropzoneArea-root": {
//       width: "100% !important",
//       maxWidth: "174px !important",
//       borderRadius: "100% !important",
//     },
//     "& .MuiDropzoneArea-text": {
//       display: "none",
//     },
//     "& .MuiDropzoneArea-textContainer ": {
//       marginTop: "55px",
//     },
//     "& h2": {
//       fontFamily: "Poppins",
//       fontStyle: "normal",
//       fontWeight: "700",
//       fontSize: "36px",
//       lineHeight: "54px",
//       color: "#0C576C",
//     },
//     "& h3": {
//       fontFamily: "Poppins",
//       fontStyle: "normal",
//       fontWeight: "400",
//       fontSize: "16px",
//       lineHeight: "24px",
//       color: "#333",
//     },
//     "& img": {
//       width: "100%",
//     },
//   },

//   updateButton: {
//     width: "100%",
//     background: "#0C576C",
//     borderRadius: "10px",
//     marginTop: "2rem",
//     [theme.breakpoints.down("xs")]: {
//       maxWidth: "150px",
//       fontSize: "9px",
//     },
//     "&:hover": {
//       background: "#fff",
//       color: "#333",
//       border: "2px solid #0C576C",
//     },
//   },
//   Titlemain: {
//     color: theme.palette.text.nofiction,
//   },
//   select: {
//     "& .MuiInputBase-root": {
//       // background: theme.palette.background.taf,
//       height: "55px",
//     },
//     "& .MuiInputBase-input ": {
//       color: "#000000 !important",
//     },
//   },
//   remove: {
//     height: "30px",
//     fontFamily: "Poppins",
//     fontStyle: "normal",
//     fontWeight: "700",
//     fontSize: "12.6px",
//     lineHeight: "20px",
//     textAlign: "center",
//     letterSpacing: "0.18px",
//     color: "#FFFFFF",
//     background: "#0C576C",
//     borderRadius: "10px",
//     "&:hover": {
//       background: "#fff",
//       color: "#333",
//       border: "2px solid #0C576C",
//     },
//   },
// }));

// export default function EditProfile() {
//   const classes = useStyles();
//   const user = useContext(AuthContext);
//   const location = useLocation();
//   const profileEmail = location.state && location.state.email;
//   const history = useHistory();
//   const [loader1, setLoader1] = useState(false);
//   const [userName,setuserName] = useState();

//   const handleBack = () => {
//     history.push("/my-profile");
//   };

//   const EditProfileApi = async () => {
//     try {
//       const res = await Axios({
//         method: "PUT",
//         url:ApiConfig.editUserProfile,
//         headers: {
//           token: window.localStorage.getItem("token"),
//         },
//         data: {
//           name: userName,
//         }
//       });

//       if (res.data.responseCode === 200){
//         toast.success("Profile Edited Succesfully");
//         handleBack();
//       } 
//     } catch (error) {}
//   };

//   return (
//     <>
//       <Page title="Edit Profile">
//         <Box className={classes.FAQ}>
//           <Box mb={2}>
//             <Container maxWidth="lg">
//               <Box className={classes.colorbox}>
//                 <Typography variant="h2">Edit Profile</Typography>
//               </Box>

//               <Grid container spacing={1} className={classes.outerContainer}>
//                 <Grid
//                   item
//                   xs={12}
//                   sm={12}
//                   md={12}
//                   lg={12}
//                   className={classes.editsection}
//                 >
//                   <Grid>
//                     <Box className={classes.colorbox}>
//                       <Box mt={2} className={classes.inputfield}> 
//                         <Grid container spacing={2}>
//                           <Grid item xs={12} sm={6} md={6} lg={6}>
//                             <FormControl
//                               fullWidth
//                               className={classes.inputsection}
//                               style={{ marginTop: "-4px" }}
//                             >
//                               <label>
//                                 First Name{" "}
//                                 <span style={{ color: "red" }}>*</span>
//                               </label>
//                               <TextField
//                                 name="firstName"
//                                 onChange={(e)=> setuserName(e.target.value)}
//                                 variant="outlined"
//                                 InputProps={{
//                                   className: classes.TextBox,
//                                   inputProps: {
//                                     maxLength: 25,
//                                   },
//                                 }}
//                                 className="textFeilds"
//                                 step="any"
//                                 placeholder="First name"

//                               />
//                             </FormControl>
//                           </Grid>
//                           <Grid item xs={12} sm={6} md={6} lg={6}>
//                             <FormControl
//                               fullWidth
//                               className={classes.inputsection}
//                               style={{ marginTop: "-4px" }}
//                             >
//                               <label>
//                                 Your Email{" "}
//                                 <span style={{ color: "red" }}>*</span>
//                               </label>
//                               <TextField
//                                 placeholder="Email"
//                                 name="email"
//                                 variant="outlined"
//                                 className="textFeilds"
//                                 step="any"
//                                 InputProps={{
//                                   className: classes.TextBox,
//                                 }}
//                                 value={profileEmail}
//                               />
//                             </FormControl>
//                           </Grid>

//                           <Grid
//                             spacing={2}
//                             style={{
//                               display: "flex",
//                               justifyContent: "space-evenly",
//                               width: "100%",
//                             }}
//                           >
//                             <Grid item sm={2} md={3} xs={6}>
//                               <Button
//                                 variant="contained"
//                                 size="large"
//                                 color="secondary"
//                                 type="submit"
//                                 disabled={loader1}
//                                 className={classes.updateButton}
//                                 onClick={() => EditProfileApi()}
//                               >
//                                 Edit Profile
//                                 {loader1 && <ButtonCircularProgress />}
//                               </Button>
//                             </Grid>
//                             <Grid item sm={2} md={3} xs={6}>
//                               <Button
//                                 variant="contained"
//                                 size="large"
//                                 color="secondary"
//                                 className={classes.updateButton}
//                                 onClick={() => handleBack()}
//                               >
//                                 Back
//                               </Button>
//                             </Grid>
//                           </Grid>
//                         </Grid>
//                       </Box>
//                     </Box>
//                   </Grid>
//                 </Grid>
//               </Grid>
//             </Container>
//           </Box>
//         </Box>
//       </Page>
//     </>
//   );
// }

