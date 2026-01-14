import React, { useState, useContext, useEffect } from 'react';
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
} from "@material-ui/core"
import { NavLink, useHistory, Link } from 'react-router-dom';
import moment from "moment";
import { BiCopy } from "react-icons/bi";
import Axios from "axios";
import ApiConfig from "src/config/APICongig";
import DataNotFoundIMG from "src/component/DataNotFoundIMG";
import { AuthContext } from "src/context/Auth";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Pagination } from "@material-ui/lab";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import * as XLSX from "xlsx";
import DeleteIcon from "@material-ui/icons/Delete";
import { CgUnblock } from "react-icons/cg";
import VisibilityRoundedIcon from "@material-ui/icons/VisibilityRounded";
import BlockIcon from "@material-ui/icons/Block";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { createTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";

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
      border: "1.16355px solid #0000 !important",
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
      color: "#FFFFFF",
      // background: `${theme.palette.background.taf} !important`,
    },
  },
  mainFilterBox: {
    marginTop: "20px",
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
    /* identical to box height */

    color: "#FFFFFF",
  },
  layoutFlex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
  },
  topButton: {
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
    width: "200px",
  },
  headCell: {
    //background: "transparent",
    background: "#0C576C ",
  },
  loaderCenter: {
    display: "flex", justifyContent: "center", alignItems: "center"
  } ,
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
const Flex = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  cursor: pointer;
`;
function PaymentManagement() {
  const history = useHistory();
  const classes = useStyles();
  const [historyData, setHistoryData] = useState([]);
  const auth = useContext(AuthContext);
  const [toData, setToData] = useState(null);
  const [fromData, setFromData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);
  const [value, setValue] = useState(0);
  const [clear, setIsClear] = useState(false);
  const [id, setId] = useState("");
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState("");
  const AllTransactionHistory = async () => {
    setIsLoading(true);

    setHistoryData("");
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.paymentDetails,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          page: page - 1,
          fromDate: fromData ? `${moment(fromData).format("YYYY-MM-DD")}` : null,
          toDate: toData ? `${moment(toData).format("YYYY-MM-DD")}` : null,
          limit: 10,
          search: search ? search : null,
        },
      });

      if (res.data.responseCode === 200) {
        setHistoryData(res?.data?.result?.docs);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handlereset = () => {
    AllTransactionHistory()
    setValue();
    setFromData();
    setSearch("");
    setToData();
    setIsClear(true);
    setPage(1);
  };
  useEffect(() => {
    AllTransactionHistory();

  }, [page, fromData, toData, clear, limit, search]);

  
  const downloadExcel = () => {
    const fileName = `Payment_Management(${moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')}).xlsx`;
    const workSheet = XLSX.utils.json_to_sheet(historyData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "userList");
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook,fileName);
  };

  const Icons = (props) => {
    const state = props;
    return (
      <Flex>
        <Link
          to={{
            pathname: "/view-payment-user-details",
            state,
            id
          }}
        >
          <VisibilityRoundedIcon />
        </Link>
      </Flex>
    );
  };
  return (
    <>
      <Box className={classes.headbox}>
        <Box style={{ marginTop: "20px" }} mb={3}>
          <Grid spacing={2} style={{ display: "flex", flexDirection: "row" }}>
            <Grid item lg={12} md={6}>
              <Typography variant="h4">Payment Management</Typography>
            </Grid>
            <Grid item xs={12} md={6} className={classes.layoutFlex}>
              <label style={{ marginRight: "1rem" }} >Search Page:</label>
              <Grid>
                <FormControl variant="outlined" style={{ width: "5rem" }} className={classes.forminput}>
                  <Select
                    value={limit}
                    onChange={(e) => {setLimit(e.target.value); setPage(1)}}
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
                    <MenuItem value={200}>200</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.mainFilterBox}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} lg={4} sm={6}>
              <Box className={classes.FromTable}>
                <label className={classes.label}>Search </label>
                <TextField
                  placeholder="Search Product id"
                  type="text"
                  variant="outlined"
                  fullWidth
                  size="small"
                  name="firstName"
                  id="inputID"
                  inputProps={{ maxLength: 25 }}
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1)}}
                  className={classes.search}
                  InputProps={{
                    className: classes.iconCss,

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
            <Grid item xs={12} md={6} lg={2} sm={6}>
              <Box className={classes.FromTable}>
                <label className={classes.label}>From</label>
                <div className={classes.forminputDate}>
                  <KeyboardDatePicker
                    className={`{classes.date} ${classes.search}`}
                    InputProps={{
                      className: classes.iconCss,
                    }}
                    placeholder="DD/MM/YYYY"
                    format="DD/MM/YYYY"
                    inputVariant="outlined"
                    disableFuture
                    margin="dense"
                    name="dateOfBirth"
                    value={fromData}
                    onChange={(date) => {setFromData(date); setPage(1)}}
                  />
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={2} sm={6}>
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
                    margin="dense"
                    minDate={fromData ? fromData : new Date()}
                    name="dateOfBirth"
                    value={toData}
                    onChange={(date) =>{setToData(date); setPage(1);} }
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
                  onClick={handlereset}
                  className={classes.tableButton}
                >
                  Reset
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
                      Payment Id
                    </TableCell>

                    <TableCell
                      align="center"
                      style={{ borderBottom: "1.02122px solid #000000" }}
                      className={classes.headCell}
                    >
                      Product ID
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ borderBottom: "1.02122px solid #000000" }}
                      className={classes.headCell}
                    >
                      Payment Mode
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ borderBottom: "1.02122px solid #000000" }}
                      className={classes.headCell}
                    >
                      Payment Status
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ borderBottom: "1.02122px solid #000000" }}
                      className={classes.headCell}
                    >
                      Total Amount
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ borderBottom: "1.02122px solid #000000" }}
                      className={classes.headCell}
                    >
                      Date & Time
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
                    historyData?.map((values, index) => {
                      return (
                        <TableRow className={classes.tables}>
                          <TableCell align="center">
                            {" "}
                            {(page - 1) * 8 + index + 1}
                          </TableCell>

                          <TableCell align="center">
                            {values?._id ? values?._id : "N/A"}
                          </TableCell>
                          <TableCell align="center">
                            {values?.productId?._id ? values?.productId?._id : "N/A"}
                          </TableCell>
                          <TableCell align="center">
                            {values?.paymentMethod
                              ? values?.paymentMethod
                              : "N/A"}
                          </TableCell>
                          <TableCell align="center">
                            {values?.paymentStatus ? values?.paymentStatus : "N/A"}
                          </TableCell>
                          <TableCell align="center">
                            {values?.totalPaymentAmount ? values?.totalPaymentAmount : "N/A"}
                          </TableCell>
                          <TableCell align="center">
                            {moment(
                              values?.createdAt ? values?.createdAt : "N/A"
                            ).format("lll")}{" "}
                          </TableCell>
                          <TableCell align="center">
                            <Icons id={values?._id} />
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
    </>
  );
}
export default PaymentManagement;