// import React, { useState, useContext, useEffect } from "react";
// import Page from "src/component/Page";
// import {
//   Typography,
//   Box,
//   Grid,
//   Button,
//   TableContainer,
//   Table,
//   Select,
//   TableRow,
//   TableCell,
//   MenuItem,
//   TableBody,
//   FormControl,
//   TableHead,
//   makeStyles,
// } from "@material-ui/core";
// import { NavLink, useHistory, Link } from "react-router-dom";
// import moment from "moment";
// import { BiCopy } from "react-icons/bi";
// import Axios from "axios";
// import ApiConfig from "src/config/APICongig";
// import DataNotFoundIMG from "src/component/DataNotFoundIMG";
// import { AuthContext } from "src/context/Auth";
// import { KeyboardDatePicker } from "@material-ui/pickers";
// import { Pagination } from "@material-ui/lab";
// import ButtonCircularProgress from "src/component/ButtonCircularProgress";
// import { toast } from "react-toastify";
// import { CopyToClipboard } from "react-copy-to-clipboard";
// import * as XLSX from "xlsx";
// import DeleteIcon from "@material-ui/icons/Delete";
// import { CgUnblock } from "react-icons/cg";
// import VisibilityRoundedIcon from "@material-ui/icons/VisibilityRounded";
// import BlockIcon from "@material-ui/icons/Block";
// import styled from "styled-components";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";

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

//     "& h4": {
//       fontFamily: "Poppins",
//       fontStyle: "normal",
//       fontWeight: "700",
//       fontSize: "36px",
//       lineHeight: "54px",
//       /* identical to box height */

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

//   headbox: {
//     borderRadius: "20px",
//     // marginTop: "80px",
//     // overflow: "auto",
//     [theme.breakpoints.down("sm")]: {
//       padding: "20px 7px 53px 7px",
//       borderRadius: "16px",
//     },
//     "& h4": {
//       color: "#0C576C",
//       fontSize: "36px",
//       fontStyle: "normal",
//       fontFamily: "Poppins",
//       fontWeight: "700",
//       lineHeight: "54px",
//     },
//   },
//   tabsize: {
//     fontSize: "16px",
//     fontWeight: "600",
//     color: "#fff",
//     [theme.breakpoints.down("xs")]: {
//       fontSize: "14px",
//     },
//   },

//   forminput: {
//     "& div": {
//       // color: "#FFFFFF !important",
//       border: "1.16355px solid #FFFFFF",
//       borderRadius: "3.49065px !important",
//     },
//     "& .MuiSelect-icon": {
//       color: "#FFFFFF !important",
//     },
//     "& .MuiFormControl-marginDense": {
//       // color: "#FFFFFF !important",
//       border: "1.16355px solid #FFFFFF",
//       borderRadius: "3.49065px !important",
//     },
//   },
//   forminputDate: {
//     "& .MuiFormControl-marginDense": {
//       border: "2.16355px solid #FFFFFF",
//       borderRadius: "3.49065px !important",
//     },
//     "& .MuiInputBase-input": {
//       // color: "#FFFFFF !important",
//     },
//   },
//   download: {
//     fontSize: "17px",
//     cursor: "pointer",
//     "&:hover": {
//       color: "red",
//     },
//   },

//   FromTable: {
//     [theme.breakpoints.only("md")]: {
//       marginTop: "-22px",
//     },
//     [theme.breakpoints.only("sm")]: {
//       marginTop: "-16px",
//     },
//     [theme.breakpoints.only("xs")]: {
//       marginTop: "-18px",
//     },
//   },
//   FromTable1: {
//     [theme.breakpoints.only("xs")]: {
//       marginTop: "-20px",
//     },

//     date: {
//       color: "#FFFFFF",
//       // background: `${theme.palette.background.taf} !important`,
//     },
//   },
//   mainFilterBox: {
//     marginTop: "20px",
//     padding: "15px",
//     "@media (max-width: 1600px)": {
//       padding: "0",
//     },
//   },
//   label: {
//     fontFamily: "Poppins",
//     fontStyle: "normal",
//     fontWeight: "400",
//     fontSize: "16.9024px",
//     lineHeight: "20px",
//     /* identical to box height */

//     color: "#FFFFFF",
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
//     /* identical to box height */

//     color: "#FFFFFF",
//   },
//   headCell: {
//     background: "transparent",
//     color: "#0C576C ",
//   },
// }));

// const Title = styled.h1`
//   color: black;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;
// const OuterDiv = styled.div`
//   padding: 1rem 5rem;
// `;
// const Para = styled.p`
//   color: black;
// `;
// const BtnDivision = styled.div`
//   float: center;
//   display: flex;
//   margin-top: 1rem;
//   justify-content: space-around;
// `;
// const TransDiv = styled.p`
//   font: normal 600 30px/140% Roboto;
//   color: #ffffff;
// `;
// const BackBtn = styled.button`
//   color: white;
//   background: #0c576c;
//   padding: 7px 32px;
//   border-radius: 5px;
//   border: none;
//   cursor: pointer;
// `;
// const Flex = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 1rem;
//   cursor: pointer;
// `;
// const BlockBtn = styled.button`
//   color: white;
//   background: #0c576c;
//   padding: 7px 32px;
//   border-radius: 5px;
//   border: none;
//   cursor: pointer;
//   //  "&:hover": {
//   //  background: "red",
//   //  color: "#F2542D",
//   //  border: " 3px solid #F2542D",
//   //  },
// `;

// export default function (props) {
//   const classes = useStyles();
//   const [historyData, setHistoryData] = useState([]);
//   const auth = useContext(AuthContext);
//   const userdata = auth?.userData ? auth?.userData : "";
//   const [toData, setToData] = useState();
//   const [fromData, setFromData] = useState();
//   const [coinName, setCoinName] = useState();
//   const [isLoading, setIsLoading] = useState(false);
//   const [noOfPages, setnoOfPages] = useState(1);
//   const [page, setPage] = useState(1);
//   const [pagesCount, setPagesCount] = useState(1);
//   const [value, setValue] = useState(0);
//   const [currentvalue, setCurrentValue] = useState("all");
//   const [coin, setcoin] = useState("all");
//   const [clear, setIsClear] = useState(false);
//   const [coinaddressData, setcoinData] = useState([]);

//   const [toaddressData, setToaddressData] = useState("");

//   const [transaction, setTransaction] = useState([]);
//   const [openBlock, setOpenBlock] = useState(false);
//   const [openUnBlock, setOpenUnBlock] = useState(false);
//   const [openDelete, setOpenDelete] = useState(false);
//   const [id, setId] = useState("");

//   const handleOpenBlock = (id, status) => {
//     setOpenBlock(true);
//     setId(id);
//   };

//   const handleCloseDeletePopup = () => {
//     setOpenDelete(false);
//   };

//   const handleOpenUnBlock = (id, status) => {
//     setOpenUnBlock(true);
//     setId(id);
//   };
//   const handleCloseBlock = () => {
//     setOpenBlock(false);
//   };
//   const handleCloseUnBlock = () => {
//     setOpenUnBlock(false);
//   };
//   useEffect(() => {
//     const filteraddress = coinaddressData.map((data, i) => {
//       setToaddressData(data?.WalletAddress);
//     });
//   }, [coinaddressData]);

//   const AllTransactionHistory = async () => {
//     setIsLoading(true);
//     let txnType;
//     let coinName;
//     if (currentvalue != "all") {
//       txnType = currentvalue;
//     }
//     if (coin != "all") {
//       coinName = coin;
//     }
//     setHistoryData("");
//     try {
//       const res = await Axios({
//         method: "GET",
//         url: ApiConfig.listUse,
//         headers: {
//           token: window.localStorage.getItem("token"),
//         },
//         params: {
//           page: page - 1,
//           fromDate: fromData ? `${moment(fromData).format("YYYY-MM-DD")}` : "",
//           toDate: toData ? `${moment(toData).format("YYYY-MM-DD")}` : "",
//           limit: 10,
//           coinName: coinName,
//           transactionType: txnType,
//           search: "",
//           country: "",
//           userType1: "USER",
//           status1: "",
//         },
//       });

//       if (res.data.responseCode === 200) {
//         setHistoryData(res.data.result.docs);
//         setPagesCount(res?.data.result.pages);

//         setIsLoading(false);
//       }
//     } catch (error) {
//       console.log(error);
//       setIsLoading(false);
//     }
//   };

//   const handlereset = () => {
//     setcoin("all");
//     setValue();
//     setFromData();
//     setCurrentValue("all");
//     setToData();
//     // allHistoryHandler();
//     setIsClear(true);
//   };
//   useEffect(() => {
//     AllTransactionHistory();
//     // }
//   }, [page, currentvalue, fromData, toData, coin, clear]);
//   useEffect(() => {
//     AllTransactionHistory();
//   }, []);

//   // page, currentvalue, fromData, toData, coin, clear, userdata?.userId
//   const downloadExcel = () => {
//     const workSheet = XLSX.utils.json_to_sheet(historyData);
//     const workBook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workBook, workSheet, "userList");
//     let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
//     XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
//     XLSX.writeFile(workBook, "User_Management.xlsx");
//   };
//   const blockByID = async (userId) => {
//     console.log(userId, "sachin");
//     try {
//       const res = await Axios({
//         method: "PUT",
//         url: ApiConfig.blockUnbloc,
//         headers: {
//           token: window.localStorage.getItem("token"),
//         },
//         data: {
//           _id: userId,
//         },
//       });
//       console.log(res, "res");
//       if (res.data.responseCode === 200) {
//         // setMessage("Blocked Successfully");
//         {
//           res.data.responseMessage == "You have been unblocked by admin."
//             ? toast.success("Unblocked Successfully.")
//             : toast.success("Blocked Successfully.");
//         }
//         AllTransactionHistory();
//         handleCloseBlock();
//         handleCloseUnBlock();
//       }
//     } catch (error) { }
//   };
//   const deleteId = async () => {
//     try {
//       const res = await Axios({
//         method: "DELETE",
//         url: ApiConfig.deleteUse,
//         headers: {
//           token: window.localStorage.getItem("token"),
//         },
//         data: {
//           _id: id,
//         },
//       });
//       console.log(res, "res");
//       if (res.data.responseCode === 200) {
//         // setMessage("Blocked Successfully");
//         toast.success("Deleted Successfully.");
//         AllTransactionHistory();
//         handleCloseDeletePopup();
//       }
//     } catch (error) { }
//   };
//   console.log(historyData, "resssssss");
//   const Icons = (props) => {
//     const state = props.id;
//     return (
//       <Flex>
//         <Link
//           to={{
//             // pathname: "",
//             state,
//           }}
//         >
//           <VisibilityRoundedIcon />
//         </Link>

//         {props.status == "ACTIVE" ? (
//           <BlockIcon onClick={() => handleOpenBlock(props.id)} />
//         ) : (
//           <CgUnblock
//             style={{ color: "red", fontSize: "27px" }}
//             onClick={() => handleOpenUnBlock(props.id)}
//           />
//         )}

//         <DeleteIcon
//           style={{ color: "red" }}
//           onClick={() => {
//             setOpenDelete(true);
//             setId(props.id);
//           }}
//         />
//       </Flex>
//     );
//   };

//   return (
//     <Page title={"Dashboard"}>
//       <Box className={classes.bannerbox}>
//         <Box className={classes.mainbox}>
//           <Grid container className="d-flex justify-space-between">
//             <Grid item md={9} xs={12} >
//               <Typography variant="h4">Commission Management</Typography>
//             </Grid>
//             <Grid item md={3} xs={12} align="end">
//               <Link to="/add-commission-management">
//                 <Button
//                   variant="contained"
//                   fullWidth
//                   className={classes.tableButton}
//                 >
//                   Add Commission
//                 </Button>
//               </Link>
//             </Grid>
//           </Grid>
//         </Box>

//       </Box>
//       <Box mt={2} width="100%">
//         {isLoading ? (
//           <ButtonCircularProgress />
//         ) : (
//           <>
//             <TableContainer className="TableContainerBox">
//               <Table aria-label="simple table" style={{ minWidth: "900px" }}>
//                 <TableHead
//                   style={{
//                     minWidth: "900px",
//                     background:
//                       "linear-gradient(180deg, #FFFFFF 0%, #F4F4F4 100%)",
//                     borderBottom: "1.02122pxsolid #000000",
//                   }}
//                 >
//                   <TableRow>
//                     <TableCell
//                       align="center"
//                       style={{ borderBottom: "1.02122px solid #000000" }}
//                       className={classes.headCell}
//                     >
//                       Sr. No.
//                     </TableCell>

//                     <TableCell
//                       align="center"
//                       style={{ borderBottom: "1.02122px solid #000000" }}
//                       className={classes.headCell}
//                     >
//                       Minimum
//                     </TableCell>

//                     <TableCell
//                       align="center"
//                       style={{ borderBottom: "1.02122px solid #000000" }}
//                       className={classes.headCell}
//                     >
//                       Maximum
//                     </TableCell>
//                     <TableCell
//                       align="center"
//                       style={{ borderBottom: "1.02122px solid #000000" }}
//                       className={classes.headCell}
//                     >
//                       Commission
//                     </TableCell>
//                     <TableCell
//                       align="center"
//                       style={{ borderBottom: "1.02122px solid #000000" }}
//                       className={classes.headCell}
//                     >
//                       Action
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody style={{ background: "#ffffff" }}>
//                   {historyData &&
//                     historyData.map((values, index) => {
//                       return (
//                         <TableRow className={classes.tables}>
//                           <TableCell align="center">
//                             {" "}
//                             {(page - 1) * 8 + index + 1}
//                           </TableCell>

//                           <TableCell align="center">
//                             {values.userId ? values.userId : "N/A"}
//                           </TableCell>
//                           <TableCell align="center">
//                             {values.name ? values.name : "N/A"}
//                           </TableCell>
//                           <TableCell align="center">
//                             {values.email ? values.email : "N/A"}
//                           </TableCell>
//                           <TableCell align="center">
//                             <Icons id={values._id} status={values.status} />
//                           </TableCell>
//                         </TableRow>
//                       );
//                     })}
//                 </TableBody>
//               </Table>
//             </TableContainer>

//             {(historyData &&
//               historyData.length === 0 &&
//               historyData.length === undefined) ||
//               historyData.length === null ||
//               (historyData.length === 0 && <DataNotFoundIMG />)}
//           </>
//         )}

//         {historyData && historyData.length > 0 && (
//           <Pagination
//             count={pagesCount}
//             page={page}
//             onChange={(e, v) => setPage(v)}
//           />
//         )}
//       </Box>
//       {openBlock && (
//         <Dialog
//           open={openBlock}
//           onClose={handleCloseBlock}
//           aria-labelledby="alert-dialog-title"
//           aria-describedby="alert-dialog-description"
//         >
//           <OuterDiv>
//             <Title>Confirmation</Title>
//             <DialogContent>
//               <Para>Are you sure you want to block this user?</Para>
//             </DialogContent>

//             <BtnDivision>
//               <BlockBtn
//                 onClick={() => {
//                   blockByID(id);
//                 }}
//               >
//                 YES
//               </BlockBtn>
//               <BackBtn onClick={handleCloseBlock}>NO</BackBtn>
//             </BtnDivision>
//           </OuterDiv>
//         </Dialog>
//       )}

//       {openUnBlock && (
//         <Dialog
//           open={openUnBlock}
//           onClose={handleCloseUnBlock}
//           aria-labelledby="alert-dialog-title"
//           aria-describedby="alert-dialog-description"
//         >
//           <OuterDiv>
//             <Title>Confirmation</Title>
//             <DialogContent>
//               <Para>Are you sure you want to unblock this user ?</Para>
//             </DialogContent>

//             <BtnDivision>
//               <BackBtn
//                 onClick={() => {
//                   handleCloseUnBlock();
//                   blockByID(id);
//                 }}
//               >
//                 YES
//               </BackBtn>
//               <BackBtn onClick={handleCloseUnBlock}>NO</BackBtn>
//             </BtnDivision>
//           </OuterDiv>
//         </Dialog>
//       )}

//       {openDelete && (
//         <Dialog
//           open={openDelete}
//           onClose={handleCloseDeletePopup}
//           aria-labelledby="alert-dialog-title"
//           aria-describedby="alert-dialog-description"
//         >
//           <OuterDiv>
//             <Title>Confirmation</Title>
//             <DialogContent>
//               <Para>Are you sure you want to delete this user?</Para>
//             </DialogContent>

//             <BtnDivision>
//               <BackBtn onClick={() => deleteId()}>YES</BackBtn>
//               <BackBtn onClick={() => handleCloseDeletePopup()}>NO</BackBtn>
//             </BtnDivision>
//           </OuterDiv>
//         </Dialog>
//       )}
//     </Page>
//   );
// }