// import { Typography, Box, Button, Grid } from "@material-ui/core";
// import React, { useState, useRef, useEffect, useContext } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Page from "src/component/Page";
// import MyDetail from "./myDetail";
// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     "& > *": {
//       margin: theme.spacing(1),
//     },
//   },

//   heading: {
//     fontFamily: "Poppins",
//     fontStyle: "normal",
//     fontWeight: "600",
//     fontSize: "18px",
//     lineHeight: "27px",
//     color: "#000000",
//   },
//   contentBox: {
//     height: "51px",
//     background: "#fff",
//     borderRadius: "5px",
//     marginTop: "17px",
//     display: "flex",
//     alignItems: "center",
//     color: "#04191F",
//     border: "2px solid #04191F",
//     cursor: "pointer"
//   },
//   contentSelected: {
//     height: "51px",
//     background: "#04191F",
//     borderRadius: "5px",
//     marginTop: "17px",
//     display: "flex",
//     alignItems: "center",
//     cursor: "pointer"

//   },
//   SubmitBtnBox: {
//     display: "flex",
//     justifyContent: "end"
//   },
//   submitButton: {
//     width: "100%",
//     height: "55px",
//     background: "#D39B2D",
//     borderRadius: "5px",
//     fontFamily: "Poppins",
//     fontStyle: "normal",
//     fontWeight: "500",
//     fontSize: "14px",
//     lineHeight: "21px",
//     color: "#FFFFFF",
//     marginTop: "30px",
//     maxWidth: "137px"
//   },
//   text: {
//     paddingLeft: "10px",
//     fontSize: "14px"

//   },
//   textSelected: {
//     paddingLeft: "10px",
//     color: "#000",
//     fontSize: "14px"
//   }
// }));
// export default function () {
//   const classes = useStyles();
//   const [select, setSelect] = useState("english");
//   const [selectEnglish, setSelectEnglish] = useState(true);
//   const [selectArabic, setSelectArabic] = useState(false);

//   const [selectTurkish, setSelectTurkish] = useState(false);


//   return (
//     <Page title={"Settings"}>
//       <Box className={classes.bannerbox}>
//         <Box>
//           <Typography className={classes.heading} >Language</Typography>
//           <div className={classes.border}></div>
//         </Box>
//         <Grid container spacing={2}>
//           <Grid item xs={12} md={4}>
//             <Box className={selectEnglish ? classes.contentBox : classes.contentSelected}  onClick={() => { setSelectEnglish(true); setSelectArabic(false); setSelectTurkish(false); setSelect("arabic") }}>
//               <Button className={selectEnglish ? classes.textSelected : classes.text} value="arabic" onClick={() => { setSelectEnglish(true); setSelectArabic(false); setSelectTurkish(false); setSelect("arabic") }}>Arabic</Button>
//             </Box>
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <Box className={selectArabic ? classes.contentBox : classes.contentSelected} onClick={() => { setSelectArabic(true); setSelectEnglish(false); setSelectTurkish(false); setSelect("english") }}> <Button className={selectArabic ? classes.textSelected : classes.text} value="english" onClick={() => { setSelectArabic(true); setSelectEnglish(false); setSelectTurkish(false); setSelect("english") }}>English</Button>
//             </Box>
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <Box className={selectTurkish ? classes.contentBox : classes.contentSelected} onClick={() => { setSelectArabic(false); setSelectEnglish(false); setSelectTurkish(true); setSelect("turkish") }}>  <Button className={selectTurkish ? classes.textSelected : classes.text} value="turkish" onClick={() => { setSelectArabic(false); setSelectEnglish(false); setSelectTurkish(true); setSelect("turkish") }}>Turkish</Button>
//             </Box>
//           </Grid>
//         </Grid>

//         <Box className={classes.SubmitBtnBox} mt={2}>
//           <Button
//             className={classes.submitButton}

//           // onClick={() => history.push("/dashboard")}
//           >
//             Save
//           </Button>
//         </Box>
//       </Box>
//     </Page>
//   );
// }
