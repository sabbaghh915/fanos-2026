import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
  TextField,
  Box,
  Grid,
  Button,
  TableContainer,
  Table,
  Select,
  TableRow,
  TableCell,
  MenuItem,
  TableBody,
  FormControl,
  InputAdornment,
  TableHead,
  makeStyles,
  Link,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { CgUnblock } from "react-icons/cg";
import moment from "moment";
import Axios from "axios";
import ApiConfig from "src/config/APICongig";
import { KeyboardDatePicker } from "@material-ui/pickers";
import DataNotFoundIMG from "src/component/DataNotFoundIMG";
import { Pagination } from "@material-ui/lab";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityRoundedIcon from "@material-ui/icons/VisibilityRounded";
import BlockIcon from "@material-ui/icons/Block";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { AuthContext } from "src/context/Auth";
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  headbox: {
    borderRadius: "20px",
    // marginTop: "80px",
    // overflow: "auto",
    [theme.breakpoints.down("sm")]: {
      padding: "20px 7px 20px 7px",
      borderRadius: "16px",
    },
    "& h4": {
      color: "#0C576C",
      fontSize: "36px",
      fontStyle: "normal",
      fontFamily: "Poppins",
      fontWeight: "700",
      lineHeight: "54px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "30px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "27px",
      },
    },
  },
  tabsize: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#fff",
    [theme.breakpoints.down("xs")]: {
      fontSize: "14px",
    },
  },

  forminput: {
    "& .textFeilds": {
      border: "1.16355px solid #0000 !important",
      borderRadius: "3.49065px !important",

    },
    "& .limitTextField": {
      width: "78px",
      maxWidth: "100px",
      border: "1.16355px solid #0000 !important",
      borderRadius: "3.49065px !important",
      alignSelf: "end",
      marginRight: "9px"
    },
    "& .MuiSelect-icon": {
      color: "#0C576C !important",
    },
  },
  forminputDate: {
    "& .MuiFormControl-marginDense": {
      border: "2.16355px solid #FFFFFF",
      borderRadius: "3.49065px !important",
      marginTop: "7px !important"
    },
  },
  download: {
    fontSize: "17px",
    cursor: "pointer",
    "&:hover": {
      color: "red",
    },
  },

  FromTable: {
    [theme.breakpoints.only("md")]: {
      marginTop: "-22px",
    },
    [theme.breakpoints.only("sm")]: {
      marginTop: "-16px",
    },
    [theme.breakpoints.only("xs")]: {
      marginTop: "-18px",
    },
  },
  FromTable1: {
    [theme.breakpoints.only("xs")]: {
      marginTop: "-20px",
    },

    date: {
      color: "#004AAD",
      '& .MuiInputBase-input::placeholder': {
        color: '#d9d9d9 !important', // Customize the color here
      },
      "& .MuiOutlinedInput-root": {
        border: "1.16355px solid #0000 !important",
        borderRadius: "3.49065px !important",
      }

    },
  },
  mainFilterBox: {
    marginTop: "20px",
    padding: "15px",
    "@media (max-width: 1600px)": {
      padding: "0",
    },
  },
  label: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16.9024px",
    lineHeight: "20px",
    /* identical to box height */

    color: "#000 !important",
  },
  label1: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16.9024px",
    lineHeight: "20px",
    /* identical to box height */
    color: "#000 !important",
    "@media (max-width: 1279px)": {
    marginTop:'-9px'
    },
    "@media (max-width: 959px)": {
      marginTop:'-2px'
      },
    "@media (max-width: 599px)": {
      marginTop:'15px'
      }
  },
  tableButton: {
    border: "none",
    background: "#0C576C",
    borderRadius: "10px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "700 !important",
    fontSize: "14px",
    lineHeight: "21px",
    border: "none",
    height: "36px",
    /* identical to box height */

    color: "#FFFFFF",
  },
  layoutFlex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
  },
  forminputDate: {
    "& .MuiFormControl-marginDense": {
      border: "2.16355px solid #FFFFFF",
      borderRadius: "3.49065px !important",
    },
    "& .MuiInputBase-input": {
      // color: "#FFFFFF !important",
    },
  },
  headCell: {
    //background: "transparent",
    background: "#0C576C ",
  },
  loaderCenter: {
    display: "flex", justifyContent: "center", alignItems: "center"
  },
  search: {
    backgroundColor: "transparent",
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#c4c4c4',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#c4c4c4',
      },
    },
  },
  iconCss: {
    "& .MuiIconButton-root": {
      color: "#0C576C !important",
    },
  },
}));
const Title = styled.h1`
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const OuterDiv = styled.div`
  padding: 1rem 5rem;
`;
const Para = styled.p`
  color: black;
`;
const BtnDivision = styled.div`
  float: center;
  display: flex;
  margin-top: 1rem;
  justify-content: space-around;
`;
const BackBtn = styled.button`
  color: white;
  background: #0c576c;
  padding: 7px 32px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;
const Flex = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem !important;
  cursor: pointer;
`;
const BlockBtn = styled.button`
  color: white;
  background: #0c576c;
  padding: 7px 32px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  //  "&:hover": {
  //  background: "red",
  //  color: "#F2542D",
  //  border: " 3px solid #F2542D",
  //  },
`;
const CouponManagement = () => {
  const classes = useStyles();
  const [historyData, setHistoryData] = useState([]);
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [toData, setToData] = useState(null);
  const [fromData, setFromData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);

  const [value, setValue] = useState(0);
  const [currentvalue, setCurrentValue] = useState("all");
  const [coin, setcoin] = useState("all");
  const [clear, setIsClear] = useState(false);
  const [coinaddressData, setcoinData] = useState([]);

  const [toaddressData, setToaddressData] = useState("");
  const [openBlock, setOpenBlock] = useState(false);
  const [openUnBlock, setOpenUnBlock] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [id, setId] = useState("");
  const [userType, setUsertype] = useState("ALL");
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10)


  const handlesearchClick = () => {
    AllTransactionHistory();
  }

  const handlePaste = (e) => {
    e.preventDefault();
  };

  const handleOpenBlock = (id, status) => {
    setOpenBlock(true);
    setId(id);
  };

  const handleCloseDeletePopup = () => {
    setOpenDelete(false);
  };

  const handleOpenUnBlock = (id, status) => {
    setOpenUnBlock(true);
    setId(id);
  };
  const handleCloseBlock = () => {
    setOpenBlock(false);
  };
  const handleCloseUnBlock = () => {
    setOpenUnBlock(false);
  };
  useEffect(() => {
    const filteraddress = coinaddressData.map((data, i) => {
      setToaddressData(data?.WalletAddress);
    });
  }, [coinaddressData]);

  const AllTransactionHistory = async () => {
    const token = window.localStorage.getItem("token");
    setIsLoading(true);
    setHistoryData("");
  
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.getcouponlist,
        headers: {
          token: token,
        },
        params: {
          page: page,
          fromDate: fromData ? `${moment(fromData).format("YYYY-MM-DD")}` : null,
          toDate: toData ? `${moment(toData).format("YYYY-MM-DD")}` : null,
          status1: userType,
          search: search ? search : null,
          limit: limit,
        },
      });
  
      if (res.data.responseCode === 200) {
        let sortedData = res.data.result.docs;
  
        if (fromData || toData) {
          const moment = require('moment');
  
          // Sort by createdAt in descending order
          sortedData = res.data.result.docs.sort((a, b) => {
            return moment(b.createdAt, 'MMM DD, YYYY hh:mm A').toDate() - moment(a.createdAt, 'MMM DD, YYYY hh:mm A').toDate();
          });
  
          // Move current time to the beginning
          sortedData = sortedData.sort((a, b) => {
            const currentTime = moment();
            const timeA = moment(a.createdAt, 'MMM DD, YYYY hh:mm A');
            const timeB = moment(b.createdAt, 'MMM DD, YYYY hh:mm A');
            
            return currentTime.diff(timeB) - currentTime.diff(timeA);
          });
        }
  
        // Convert createdAt to local time before storing in historyData
        const localizedData = sortedData.map(item => ({
          ...item,
          createdAt: moment(item.createdAt).local().format('MMM DD, YYYY hh:mm A'),
        }));
  
        setHistoryData(localizedData);
        setPagesCount(res?.data.result.pages);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  
  
  const handlereset = () => {
    setcoin("all");
    setValue();
    setFromData(null);
    setCurrentValue("all");
    setToData(null);
    setHistoryData();
    setIsClear(true);
    setSearch("")
  };
  useEffect(() => {
    AllTransactionHistory();
    // }
  }, [page, currentvalue, fromData, toData, coin, clear, limit, search]);
 useEffect(() => {
    AllTransactionHistory();
  }, [userType]);
  
  const downloadExcel = () => {
    const fileName = `Coupon_Management(${moment(new Date()).format('MMMM Do YYYY, hh:mm:ss A')}).xlsx`;
    const workSheet = XLSX.utils.json_to_sheet(historyData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "userList");
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, fileName);
  };
  const blockByID = async (userId) => {
   
    try {
      const res = await Axios({
        method: "PUT",
        url: ApiConfig.blockUnblockcoupon,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          _id: userId,
        },
      });

      if (res.data.responseCode === 200) {
        {
          res.data.responseMessage == "Blocked Successfully."
            ? toast.success("Blocked Successfully.")
            : toast.success("UnBlocked Successfully.");
        }
        AllTransactionHistory();
        handleCloseBlock();
        handleCloseUnBlock();
      }
    } catch (error) { }
  };
  const deleteId = async () => {
    try {
      const res = await Axios({
        method: "DELETE",
        url: ApiConfig.deletecoupon,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          couponId: id,
        },
      });
      if (res.data.responseCode === 200) {
        toast.success("Deleted Successfully.");
        AllTransactionHistory();
        handleCloseDeletePopup();
      }
    } catch (error) { }
  };
  const deleteAllCoupons = async () => {
    try {
      const res = await Axios({
        method: "DELETE",
        url: ApiConfig.deleteAllCoupons, // Update this to your server endpoint for deleting all coupons
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      
      if (res.data.responseCode === 200) {
        toast.success("All Coupons Deleted Successfully.");
        AllTransactionHistory();
        handleCloseDeletePopup();
      }
    } catch (error) {
      // Handle error
      console.error("Error deleting all coupons:", error);
    }
  };
  

  const Icons = (props) => {
    const state = props.id;

    return (
      <Flex style={{display:"flex",gap:"5px"}}>
        <VisibilityRoundedIcon
          onClick={() => {
            history.push({ pathname: "/coupon", state })
          }}
        />

        <DeleteIcon
          style={{ color: "red" }}
          onClick={() => {
            setOpenDelete(true);
            setId(props.id);
          }}
        />
      </Flex>
    );
  };
  const redButtonStyle = {
    backgroundColor: 'red',
    color: 'white', // Optionally, set the text color to white or another contrasting color
  };
  
  return (
    <>
      <Box className={classes.headbox}>
        <Box style={{ marginTop: "20px" }} mb={3}>
          <Grid spacing={2} style={{ display: "flex", flexDirection: "row" }} >
            <Grid item xs={12} sm={8} md={6}>
              <Typography variant="h4">Coupon Management</Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={6} className={classes.layoutFlex}>
              <label >Search Page :</label>
              <Grid>
                <FormControl variant="outlined" className={classes.forminput}>
                  <Select
                    value={limit}
                    onChange={(e) =>{setLimit(e.target.value); setPage(1);} }
                    className={`${classes.date} ${classes.search} limitTextField`}
                    inputProps={{
                      classes: {
                        icon: classes.icon,
                      },
                    }}
                  >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                    <MenuItem value={1000}>1000</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Box className={classes.mainFilterBox}>
            <Grid container spacing={1} >
              <Grid item xs={12} md={6} lg={3} sm={6}>
                <Box className={classes.FromTable}>
                  <label className={classes.label}>Search </label>
                  <TextField
                    style={{ backgroundColor: "#fff" }}
                    placeholder="Search Coupon ID..."
                    type="text"
                    variant="outlined"
                    fullWidth
                    // onPaste={handlePaste}
                    value={search}
                    size="small"
                    name="firstName"
                    inputProps={{ maxLength: 25 }}
                    onChange={(e) => {setSearch(e.target.value); setPage(1)}}
                    className={classes.search}
                    InputProps={{
                      className: classes.TextBox,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end">
                            <SearchIcon  style={{ color: "#0C576C" }}/>
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6} lg={3} sm={6}>
                <Box className={classes.FromTable1}>
                  <label className={classes.label1}>Status</label>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.forminput} 
                  >
                    <Select
                      margin="dense"

                      name="token"
                      className={`${classes.date} ${classes.search} textFeilds`}
                      onChange={(e) =>{setUsertype(e.target.value); setPage(1);} }
                      inputProps={{
                        classes: {
                          icon: classes.icon,
                        },
                      }}
                      value={userType}
                    >
                      <MenuItem value="ALL" style={{ fontSize: "12px" }}>
                        All
                      </MenuItem>
                      <MenuItem value="BLOCKED" style={{ fontSize: "12px" }}>
                        Blocked
                      </MenuItem>
                      <MenuItem value="ACTIVE" style={{ fontSize: "12px" }}>
                        Active
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} lg={3} sm={6}>
                <Box className={classes.FromTable}>
                  <label className={classes.label}>From</label>
                  <div className={classes.forminputDate}>
                    <KeyboardDatePicker
                      className={`${classes.date}  ${classes.search} `}
                      InputProps={{
                        className: classes.iconCss,
                      }}
                      placeholder="DD/MM/YYYY"
                      format="DD/MM/YYYY"
                      inputVariant="outlined"
                      disableFuture
                      margin="dense"
                      value={fromData}
                      onChange={(date) => {
                        setFromData(date);
                        setPage(1);
                      }}
                    />
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} lg={3} sm={6}>
                <Box className={classes.FromTable}>
                  <label className={classes.label}>To</label>
                  <div className={classes.forminputDate}>
                    <KeyboardDatePicker
                      className={`${classes.date} ${classes.search} textFeilds`}
                      InputProps={{
                        className: classes.iconCss,
                      }}
                      placeholder="DD/MM/YYYY"
                      format="DD/MM/YYYY"
                      inputVariant="outlined"
                      disableFuture
                      minDate={fromData ? fromData : new Date()}
                      margin="dense"
                      name="dateOfBirth"
                      value={toData}
                      onChange={(date) => {
                        setToData(date);
                        setPage(1);
                      }}
                    />{" "}
                  </div>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={3} justifyContent="flex-end">
              <Grid item xs={12} md={2}>
                <Box>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handlereset}
                    className={classes.tableButton}
                  >
                    Reset
                  </Button>
                </Box>
              </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="flex-end">
              <Grid item xs={12} md={2}>
                <Box>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={deleteAllCoupons}
                    className={classes.tableButton}
                    style={redButtonStyle}
                  >
                    Delete all
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={2}>
                <Box>
                  <Button
                    variant="contained"
                    fullWidth
                    className={classes.tableButton}
                    onClick={downloadExcel}
                  >
                    Download Xlsx
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={2} >
                <Box>

                  <Button
                    variant="contained"
                    fullWidth
                    className={classes.tableButton}
                    onClick={() => history.push("/generate-coupon")}
                  >
                    Generate Coupon
                  </Button>

                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box mt={2} width="100%">
          {isLoading ? (
            <div className={classes.loaderCenter}>
              <ButtonCircularProgress />
            </div>
          ) : (
            <>
              <TableContainer className="TableContainerBox">
                <Table aria-label="simple table" style={{ minWidth: "900px" }}>
                  <TableHead
                    style={{
                      minWidth: "900px",
                      background:
                        "linear-gradient(180deg, #FFFFFF 0%, #F4F4F4 100%)",
                      borderBottom: "1.02122pxsolid #000000",
                    }}
                  >
                    <TableRow>
                      <TableCell
                        align="center"
                        style={{ borderBottom: "1.02122px solid #000000" }}
                        className={classes.headCell}
                      >
                        Sr. No.
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ borderBottom: "1.02122px solid #000000" }}
                        className={classes.headCell}
                      >
                        Coupon ID
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ borderBottom: "1.02122px solid #000000" }}
                        className={classes.headCell}
                      >
                        currency
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ borderBottom: "1.02122px solid #000000" }}
                        className={classes.headCell}
                      >
                        Remaining Coupon Amount
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ borderBottom: "1.02122px solid #000000" }}
                        className={classes.headCell}
                      >
                        Created Date
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ borderBottom: "1.02122px solid #000000" }}
                        className={classes.headCell}
                      >
                        Status
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ borderBottom: "1.02122px solid #000000" }}
                        className={classes.headCell}
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody style={{ background: "#ffffff" }}>
  {historyData &&
    historyData.map((values, index) => {
      const isDeactive = values.status && values.status.toLowerCase() === "deactive";

      const rowStyle = isDeactive ? { background: "white" } : {};

      return (
        <TableRow className={classes.tables} style={rowStyle} key={index}>
          <TableCell align="center" style={isDeactive ? { color: "red" } : {}}>
            {index + 1 + (page - 1) * limit}
          </TableCell>
          <TableCell align="center" style={isDeactive ? { color: "red" } : {}}>
            {values.couponCode ? values.couponCode : "N/A"}
          </TableCell>
          <TableCell align="center" style={isDeactive ? { color: "red" } : {}}>
            {values.currency ? values.currency : "N/A"}
          </TableCell>
          <TableCell align="center" style={isDeactive ? { color: "red" } : {}}>
            {values.couponAmount ? values.couponAmount : "N/A"}
          </TableCell>
          <TableCell align="center" style={isDeactive ? { color: "red" } : {}}>
            {moment(
              values.createdAt ? values.createdAt : "N/A"
            ).format("lll")}{" "}
          </TableCell>
          <TableCell align="center" style={isDeactive ? { color: "red" } : {}}>
            {values.status ? values.status : "N/A"}
          </TableCell>
          <TableCell align="center">
            <Icons id={values._id} status={values.status} />
          </TableCell>
        </TableRow>
      );
    })}
</TableBody>

                </Table>
              </TableContainer>

              {(historyData &&
                historyData?.length === 0 &&
                historyData?.length === undefined) ||
                historyData?.length === null ||
                (historyData?.length === 0 && <DataNotFoundIMG />)}
            </>
          )}

          {historyData && historyData?.length > 0 && (
            <Pagination
              count={pagesCount}
              page={page}
              onChange={(e, v) => setPage(v)}
            />
          )}
        </Box>
        {openBlock && (
          <Dialog
            open={openBlock}
            onClose={handleCloseBlock}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <OuterDiv>
              <Title>Confirmation</Title>
              <DialogContent>
                <Para>Are you sure you want to block this coupon?</Para>
              </DialogContent>

              <BtnDivision>
                <BlockBtn
                  onClick={() => {
                    blockByID(id);
                  }}
                >
                  YES
                </BlockBtn>
                <BackBtn onClick={handleCloseBlock}>NO</BackBtn>
              </BtnDivision>
            </OuterDiv>
          </Dialog>
        )} 


         {openUnBlock && (
          <Dialog
            open={openUnBlock}
            onClose={handleCloseUnBlock}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <OuterDiv>
              <Title>Confirmation</Title>
              <DialogContent>
                <Para>Are you sure you want to unblock this coupon ?</Para>
              </DialogContent>

              <BtnDivision>
                <BackBtn
                  onClick={() => {
                    handleCloseUnBlock();
                    blockByID(id);
                  }}
                >
                  YES
                </BackBtn>
                <BackBtn onClick={handleCloseUnBlock}>NO</BackBtn>
              </BtnDivision>
            </OuterDiv>
          </Dialog>
        )}

        {openDelete && (
          <Dialog
            open={openDelete}
            onClose={handleCloseDeletePopup}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <OuterDiv>
              <Title>Confirmation</Title>
              <DialogContent>
                <Para>Are you sure you want to delete this Coupon?</Para>
              </DialogContent>

              <BtnDivision>
                <BackBtn onClick={() => deleteId()}>YES</BackBtn>
                <BackBtn onClick={() => handleCloseDeletePopup()}>NO</BackBtn>
              </BtnDivision>
            </OuterDiv>
          </Dialog>
        )}
      </Box >
    </>
  );
};

export default CouponManagement;
