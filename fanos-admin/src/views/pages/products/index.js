import React, { useState, useEffect } from "react";
import {
  Typography,
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
  TableHead,
  makeStyles,
  Dialog,
  DialogContent,
  Tooltip
} from "@material-ui/core";
import moment from "moment";
import Axios from "axios";
import ApiConfig from "src/config/APICongig";
import DataNotFoundIMG from "src/component/DataNotFoundIMG";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Pagination } from "@material-ui/lab";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { toast } from "react-toastify";
import DeleteIcon from "@material-ui/icons/Delete";
import styled from "styled-components";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";
import VisibilityRoundedIcon from "@material-ui/icons/VisibilityRounded";
import SearchIcon from "@material-ui/icons/Search";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme) => ({
  headbox: {
    borderRadius: "20px",
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
      borderRadius: "3.4906500000000023px !important",
    },
    "& .limitTextField": {
      width: "100%",
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
      marginTop: "7px !important",
    },
  },
  download: {
    fontSize: "17px",
    cursor: "pointer",
    "&:hover": {
      color: "red",
    },
  },
  mainFilterBox: {
    marginTop: "20px",
    "@media (max-width: 1600px)": {
      padding: "5px",
    },
  },
  label: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16.9024px",
    lineHeight: "20px",
    /* identical to box height */
    marginTop: "0px !important",
    color: "#000",
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
    color: "#FFFFFF",
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
  pageInput: {
    border: "2.16355px solid #FFFFFF",
    borderRadius: "2px !important",
    width: "100px",
  },
  headCell: {
    background: "#0C576C ",
  },
  layoutFlex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
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
  allIconFlex:{
    display:"flex",
    justifyContent: "center",
    gap:"15px",
    cursor:"pointer"
  }
}));
const BackBtn = styled.button`
  color: white;
  background: #0c576c;
  padding: 7px 32px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;
const Title = styled.h1`
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
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
const OuterDiv = styled.div`
  padding: 1rem 5rem;
`;

function ManageItems() {
  const classes = useStyles();
  const [historyData, setHistoryData] = useState([]);
  const [id, setId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [toData, setToData] = useState(null);
  const [fromData, setFromData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);
  const [value, setValue] = useState(0);
  const [currentvalue, setCurrentValue] = useState("");
  const [coin, setcoin] = useState("all");
  const [clear, setIsClear] = useState(false);
  const [options, setoptions] = useState("");
  const [dataApprove, setDataApprove] = useState([]);
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(10);
  const [openUnBlock, setOpenUnBlock] = useState(false);
  const [openBlock, setOpenBlock] = useState(false);

  const deleteProduct = async () => {

    try {
      const res = await Axios({
        method: "DELETE",
        url: ApiConfig.deleteProduct,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          _id: id,
        },
      });

      if (res.data.responseCode === 200) {
        toast.success("Deleted Successfully.");
        AllTransactionHistory();
        handleCloseDeletePopup();
      }
    } catch (error) { }
  };

  const handleOpenUnBlock = (id, status) => {
    setOpenUnBlock(true);
    setId(id);
  };
  const handleCloseUnBlock = () => {
    setOpenUnBlock(false);
  };

  const handleOpenBlock = (id, status) => {
    setOpenBlock(true);
    setId(id);
  };

  const handleCloseBlock = () => {
    setOpenBlock(false);
  }

  const handleClearClick = (e) => {
    setSearch("");
    AllTransactionHistory();
  };
  const handleRegainClick = () => {
    setSearch("");
    AllTransactionHistory("");

  }

  const handleCloseDeletePopup = () => {
    setOpenDelete(false);
  };

  const handleSelect = (e) => {
    setoptions(e.target.value);
  };


  const updateProductStatus = async () => {
    try {
      const res = await Axios({
        method: "POST",
        url: ApiConfig.productApproveReject,
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          productId: id,
          approveStatus: "APPROVED",
        },
      });

      if (res.data.responseCode === 200) {
        setIsLoading(false);
        setId(id)
        setDataApprove(res);
        AllTransactionHistory();
        toast.success("Approved successfully");
        setOpenUnBlock(false);
        setOpenBlock(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handlesearchClick = () => {
    AllTransactionHistory();
  }

  const RejectProduct = async () => {
    try {
      console.log("RejectedlistNotificationAll");

      const res = await Axios({
        method: "POST",
        url: ApiConfig.productApproveReject,
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          productId: id,
          approveStatus: "REJECTED",
        },
      });

      if (res.data.responseCode === 200) {

        setDataApprove(res);
        toast.error("Rejected successfully");
        AllTransactionHistory();
        setIsLoading(false);
        setOpenBlock(false);
        setOpenUnBlock(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const AllTransactionHistory = async () => {
    setIsLoading(true);
    setHistoryData("");
    try {
      const res = await Axios({
        method: "POST",
        url: ApiConfig.ProductList,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          page: page - 1,
          fromDate: fromData ? `${moment(fromData).format("YYYY-MM-DD")}` : "",
          toDate: toData ? `${moment(toData).format("YYYY-MM-DD")}` : "",
          limit: limit,
          search: search,
          approveStatus: currentvalue,
        },
      });

      if (res.data.responseCode === 200) {
        setHistoryData(res.data.result.docs);
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
    setCurrentValue("");
    setToData(null);
    setHistoryData("");
    setIsClear(true);
    setSearch("");
    setPage(1);
  };
  useEffect(() => {
    AllTransactionHistory();
  }, [page, currentvalue, fromData, toData, , clear, limit, search]);

  // page, currentvalue, fromData, toData, coin, clear, userdata?.userId
  const downloadExcel = () => {
    const fileName = `Product_Management(${moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')}).xlsx`;
    const workSheet = XLSX.utils.json_to_sheet(historyData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "userList");
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, fileName);
  };

  useEffect(() => {
    if (currentvalue === "BUYTOKEN") {
      const filterFun = historyData.filter((data, i) => {
        return data.status === "SUCCESS";
      });
      setHistoryData(filterFun);
    }
  }, [currentvalue]);

  const Icons = (props) => {
    const state = props;

    return (

      <>
        <div className={classes.allIconFlex}>
          <Tooltip title="view">
          <Link
            to={{
              pathname: "/view-product-details",
              state,
            }}
          >
            <VisibilityRoundedIcon />
          </Link>
          </Tooltip>
          <Tooltip title="Delete">
          <DeleteIcon
            style={{ color: "red" }}
            onClick={() => {
              setOpenDelete(true);
              setId(props.id);
            }}
          />
          </Tooltip>
          {props.approveStatus === "PENDING" && (
            <>
               <Tooltip title="Cancel">
              <CancelIcon onClick={() => { handleOpenBlock("REJECTED"); handleOpenBlock(true); setId(props.id) }} style={{ color: "red" }} /></Tooltip>
              <Tooltip title="Approve"><CheckCircleIcon onClick={() => { handleOpenUnBlock("APPROVED"); handleOpenUnBlock(true); setId(props.id) }} style={{ color: "green" }} /></Tooltip>
            </>

          )}
        </div>
      </>

    )
  };
  const deleteProducts = async () => {
    try {
      const res = await Axios({
        method: "DELETE",
        url: ApiConfig.deleteProducts,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });

      if (res.data.responseCode === 200) {
        toast.success("Deleted Successfully.");
        AllTransactionHistory();
        handleCloseDeletePopup();
      }
    } catch (error) { }
  };
  const redButtonStyle = {
    backgroundColor: 'red',
    color: 'white', // Optionally, set the text color to white or another contrasting color
  };
  return (
    <>
      <Box className={classes.headbox}>
        <Box style={{ marginTop: "20px" }} mb={3}>
          <Grid spacing={2} style={{ display: "flex", flexDirection: "row" }}>
            <Grid item lg={12} md={6}>
              <Typography variant="h4">Product Management</Typography>
            </Grid>
            <Grid item xs={12} md={6} className={classes.layoutFlex}>
              <label style={{ marginRight: "1rem" }}> Search Page : </label>
              <Grid>
                <FormControl variant="outlined" style={{ width: "5rem" }} className={classes.search}>
                  <Select
                    value={limit}
                    onChange={(e) => {
                      setLimit(e.target.value)
                      setPage(1);
                    }}
                    className={`${classes.date} limitTextField`}
                    inputProps={{
                      classes: {
                        icon: classes.icon,
                      },
                    }}
                  >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                    <MenuItem value={200}>200</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Box className={classes.mainFilterBox}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6} lg={3} sm={6}>
                <Box className={classes.FromTable} style={{ borderRadius: "1px" }}>
                  <label className={classes.label} style={{ color: "black" }}>Search name</label>
                  <TextField
                    style={{ backgroundColor: "#fff" }}
                    placeholder="Search name..."
                    type="text"
                    variant="outlined"
                    fullWidth
                    size="small"
                    // onPaste={handlePaste}
                    name="firstName"
                    inputProps={{ maxLength: 30 }}
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value); setPage(1);
                    }}
                    className={classes.search}
                    InputProps={{
                      className: classes.TextBox,

                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end">
                            <SearchIcon
                              style={{ color: "#0C576C" }}
                              onClick={() => handlesearchClick()} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                </Box>
              </Grid>
              <Grid item xs={12} md={6} lg={3} sm={6}>
                <Box className={classes.FromTable1}>
                  <label className={classes.label} style={{ color: "black" }}>Type</label>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={`${classes.forminput} ${classes.search}`}
                  >
                    <Select
                      margin="dense"
                      style={{}}
                      name="token"
                      className={`${classes.date} textFeilds`}
                      onChange={(e) => { setCurrentValue(e.target.value); setPage(1) }}
                      displayEmpty
                      inputProps={{
                        classes: {
                          icon: classes.icon,
                        },
                      }}
                      value={currentvalue}
                    >
                      <MenuItem value="" style={{ fontSize: "12px" }}>
                        All
                      </MenuItem>
                      <MenuItem value="REJECTED" style={{ fontSize: "12px" }}>
                        Rejected
                      </MenuItem>
                      <MenuItem value="APPROVED" style={{ fontSize: "12px" }}>
                        Approved
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} lg={3} sm={6}>
                <Box className={classes.FromTable}>
                  <label className={classes.label} style={{ color: "black" }}>From</label>
                  <div className={classes.forminputDate}>
                    <KeyboardDatePicker
                      className={`${classes.date} ${classes.search}`}
                      InputProps={{
                        className: classes.iconCss,
                      }}
                      placeholder="DD/MM/YYYY"
                      format="DD/MM/YYYY"
                      inputVariant="outlined"
                      disableFuture
                      margin="dense"
                      value={fromData}
                      onChange={(date) => { setFromData(date); setPage(1); }}
                    />
                  </div>
                </Box>
              </Grid>

              <Grid item xs={12} md={6} lg={3} sm={6}>
                <Box className={classes.FromTable}>
                  <label className={classes.label} style={{ color: "black" }} >To</label>
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
                      onChange={(date) => { setToData(date); setPage(1); }}
                    />{" "}
                  </div>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={3} justify="flex-end">
              <Grid item xs={12} md={2}>
                <Box>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handlereset} /// this code is under
                    className={classes.tableButton}
                  >
                    Reset
                  </Button>
                </Box>
              </Grid>
              </Grid>
              <Grid container spacing={3} justify="flex-end">
              <Grid item xs={12} md={2}>
                <Box>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={deleteProducts} /// this code is under
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
                        Product Id
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ borderBottom: "1.02122px solid #000000" }}
                        className={classes.headCell}
                      >
                        Name
                      </TableCell>

                      <TableCell
                        align="center"
                        style={{ borderBottom: "1.02122px solid #000000" }}
                        className={classes.headCell}
                      >
                        Price
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
                        Approved Status
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
                        return (
                          <TableRow className={classes.tables}>
                            <TableCell align="center">
                              {index + 1 + (page - 1) * limit}
                            </TableCell>

                            <TableCell align="center">
                              {values.productGenerateId
                                ? values.productGenerateId
                                : "N/A"}
                            </TableCell>

                            <TableCell align="center">
                              {values.productName ? values.productName.slice(0, 30) : "N/A"}
                            </TableCell>

                            <TableCell align="center">
                              {values.price ? values.price : "N/A"}
                            </TableCell>

                            <TableCell align="center">
                              {moment(
                                values.createdAt ? values.createdAt : "N/A"
                              ).format("lll")}{" "}
                            </TableCell>
                            <TableCell align="center">
                              {values?.approveStatus ? values?.approveStatus : "N/A"}
                            </TableCell>
                            <TableCell align="center">
                              {values?.status ? values?.status : "N/A"}
                            </TableCell>
                            <TableCell align="center">
                              <Icons id={values._id} approveStatus={values?.approveStatus} />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>

              {(historyData &&
                historyData.length === 0 &&
                historyData.length === undefined) ||
                historyData.length === null ||
                (historyData.length === 0 && <DataNotFoundIMG />)}
            </>
          )}

          {historyData && historyData.length > 0 && (
            <Pagination
              count={pagesCount}
              page={page}
              onChange={(e, v) => setPage(v)}
            />
          )}
        </Box>
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
                <Para>Are you sure you want to delete this product?</Para>
              </DialogContent>

              <BtnDivision>
                <BackBtn onClick={() => deleteProduct()}>YES</BackBtn>
                <BackBtn onClick={() => handleCloseDeletePopup()}>NO</BackBtn>
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
                <Para>Are you sure you want to Approve this product?</Para>
              </DialogContent>
              <BtnDivision>
                <BackBtn onClick={() => updateProductStatus()}>YES</BackBtn>
                <BackBtn onClick={() => handleCloseUnBlock()}>NO</BackBtn>
              </BtnDivision>
            </OuterDiv>
          </Dialog>
        )}
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
                <Para>Are you sure you want to Reject this product?</Para>
              </DialogContent>
              <BtnDivision>
                <BackBtn onClick={() => RejectProduct()}>YES</BackBtn>
                <BackBtn onClick={() => handleCloseBlock()}>NO</BackBtn>
              </BtnDivision>
            </OuterDiv>
          </Dialog>
        )}
      </Box >
    </>
  );
}

export default ManageItems;
