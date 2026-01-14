// import { Typography, Box, Grid } from "@material-ui/core";
// import React, { useContext, useState } from "react";
// import { Button } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
// import Page from "src/component/Page";
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';
// import { toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",  
//     "& > *": {
//       margin: theme.spacing(1),
//     },
//   },

//   mainbox: {
//     borderRadius: "20px",
//     padding: "20px 0px",
//     "& h5": {
//       fontFamily: "Poppins",
//       fontStyle: "normal",
//       fontWeight: "700",
//       fontSize: "18px",
//       lineHeight: "54px",
//       color: "#000000",
//     },
//     "& h4": {
//       fontFamily: "Poppins",
//       fontStyle: "normal",
//       fontWeight: "700",
//       fontSize: "36px",
//       lineHeight: "54px",

//       color: "#0C576C",
//       [theme.breakpoints.down("sm")]: {
//         padding: "20px 16px 20px 16px",
//         marginTop: "30px",
//         fontSize: "25px",
//         borderRadius: "16px",
//       },
//     },
//     [theme.breakpoints.down("sm")]: {
//       padding: "20px 16px 20px 16px",
//       borderRadius: "16px",
//     },
//   },
//   tableButton: {
//     border: "none",
//     background: "#0C576C ",
//     borderRadius: "10px",
//     fontFamily: "Poppins",
//     fontStyle: "normal",
//     fontWeight: "700 !important",
//     fontSize: "14px",
//     lineHeight: "21px",
//     border: "none",
//     height: "36px",

// maxWidth:"230px",
//     color: "#FFFFFF",
//   },


// }));

// const showToast = () => {
//   toast.success("Transaction Mode set");
// };



// export default function (props) {
//   const classes = useStyles();
//   const [strip, setStrip] = useState(false);
//   const [braintree, setBraintree] = useState(false);


//   const handleChange = (event) => {
//     if(event=="Stripe"){
//       setStrip(true)
//       setBraintree(false)
//     }
//     else{
//       setStrip(false)
//       setBraintree(true)
//     }
   
//   };
  

//   return (
//     <Page title={"Dashboard"}>
//       <Box className={classes.bannerbox}>
//         <Box className={classes.mainbox}>
//           <Grid container className="d-flex justify-space-between">
//             <Typography variant="h4">Site Payment - Transaction Modes and Configurations</Typography>
//           </Grid>

//           <Box mt={2}>
//           <Typography variant="h5">Payment Tyedterterthfgfpe(Banner & Promotion)</Typography>
//           <Box>
//           <RadioGroup>
//             <FormControlLabel   value="Stripe" control={<Radio />} label="Stripe" /> 
//             <FormControlLabel     value="Braintree"  control={<Radio />} label="Braintree" />
//           </RadioGroup>
//           </Box>
//           </Box>
//           <Box mt={2}>
//             <Grid container spacing={2} style={{ alignItems: "center" }}>
//               <Grid item xs={3}  align="start">
//                 <Button
//                   variant="contained"
//                   fullWidth
//                   className={classes.tableButton}
//                   onClick={showToast}
//                 >
//                   Save
//                 </Button>
//               </Grid>

//             </Grid>
//             </Box>
//         </Box>
//       </Box>

//     </Page>
//   );
// }