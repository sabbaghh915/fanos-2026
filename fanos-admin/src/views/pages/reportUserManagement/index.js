import React, { useState, useContext, useEffect } from "react";
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
} from "@material-ui/core";
import { NavLink, useHistory, Link } from "react-router-dom";
import moment from "moment";
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
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import ClearIcon from "@material-ui/icons/Clear";
import SearchIcon from "@material-ui/icons/Search";
import { AiFillInstagram } from "react-icons/ai";

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
      marginRight: "9px",
    },
    "& .MuiSelect-icon": {
      color: "#0C576C !important",
    },
  },
  forminputDate: {
    "& .MuiFormControl-marginDense": {
      border: "1.16355px solid #0000 !important",
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

  date: {
    color: "#004AAD",
    "& .MuiInputBase-input::placeholder": {
      color: "#d9d9d9 !important", // Customize the color here
    },
    "& .MuiOutlinedInput-root": {
      border: "1.16355px solid #0000 !important",
      borderRadius: "3.49065px !important",
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
  headCell: {
    background: "transparent",
  },
  search: {
    backgroundColor: "transparent",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#c4c4c4",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#c4c4c4",
      },
    },
  },
  loaderCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  layoutFlex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
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
  gap: 1rem;
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

function ReportUserManagement(props) {
  const classes = useStyles();
  const [historyData, setHistoryData] = useState([]);
  const auth = useContext(AuthContext);
  const [toData, setToData] = useState(null);
  const [fromData, setFromData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);
  const [usertype, setUsertype] = useState( "Duplicate ad"
  );
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);



  const AllTransactionHistory = async () => {
    setIsLoading(true);
    setHistoryData("");
    try {
      const res = await Axios({
        method: "POST",
        url: ApiConfig.reportUserList,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          page: page,
          fromDate: fromData ? `${moment(fromData).format("YYYY-MM-DD")}` : "",
          toDate: toData ? `${moment(toData).format("YYYY-MM-DD")}` : "",
          limit: limit,
          search: search,
          type:usertype
        },
      });
       console.log(res,"total_page")
      if (res.data.responseCode === 200) {
        setHistoryData(res.data.result[0].data);
        setPagesCount(res?.data.result[0].metadata[0].total_page);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handlereset = () => {
    AllTransactionHistory();
    setToData(null);
    setFromData(null);
    setToData(null);
    setSearch("");
    setLimit(10);
    setUsertype("");
    setPage(1);
  };
  useEffect(() => {
    AllTransactionHistory();
  }, [usertype, page, fromData, toData, limit, search]);

  const downloadExcel = () => {
    const fileName = `Report_management(${moment(new Date()).format(
      "MMMM Do YYYY, h:mm:ss a"
    )}).xlsx`;
    const workSheet = XLSX.utils.json_to_sheet(historyData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "reportList");
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, fileName);
  };

  const Icons = (props) => {
    const state = props.id;
    return (
      <Flex>
        <Link
          to={{
            pathname: "/reported-user-details",
            state,
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
            <Grid item xs={12} md={6}>
              <Typography variant="h4">Report Management</Typography>
            </Grid>
            <Grid item xs={12} md={6} className={classes.layoutFlex}>
              <label style={{ marginRight: "1rem" }}>Search Page :</label>
              <Grid>
                <FormControl
                  variant="outlined"
                  style={{ width: "5rem" }}
                  className={classes.search}
                >
                  <Select
                    value={limit}
                    onChange={(e) => {
                      setLimit(e.target.value);
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
                <Box className={classes.FromTable}>
                  <label className={classes.label}>Search </label>
                  <TextField
                    placeholder="Search by email and name "
                    type="text"
                    variant="outlined"
                    fullWidth
                    size="small"
                    name="firstName"
                    id="inputID"
                    inputProps={{ maxLength: 45 }}
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    className={classes.search}
                    InputProps={{
                      className: classes.TextBox,

                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end">
                            <SearchIcon style={{ color: "#0C576C" }} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6} lg={3} sm={6}>
                <Box className={classes.FromTable1}>
                  <label className={classes.label}>Status</label>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={`${classes.forminput}  ${classes.search}`}
                  >
                    <Select
                      margin="dense"
                      name="token"
                      className={`${classes.date} textFeilds `}
                      onChange={(e) => {
                        setUsertype(e.target.value);
                        setPage(1);
                      }}
                      displayEmpty
                      inputProps={{
                        classes: {
                          icon: classes.icon,
                        },
                      }}
                      value={usertype}
                    >
                      <MenuItem value="Duplicate ad" style={{ fontSize: "12px" }}>
                      Duplicate ad
                      </MenuItem>
                      <MenuItem value="Inappropriate Content" style={{ fontSize: "12px" }}>
                      Inappropriate Content
                      </MenuItem>
                      <MenuItem value="Misleading Information" style={{ fontSize: "12px" }}>
                      Misleading Information
                      </MenuItem>
                      <MenuItem value="Offensive Language" style={{ fontSize: "12px" }}>
                      Offensive Language
                      </MenuItem>
                      <MenuItem value="Scam OR Fraud" style={{ fontSize: "12px" }}>
                      Scam OR Fraud
                      </MenuItem>
                      <MenuItem value="Other (Please Specify)" style={{ fontSize: "12px" }}>
                      Other (Please Specify)
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
                    <TableRow className="stickyHeader">
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
                        Reported User
                      </TableCell>

                      <TableCell
                        align="center"
                        style={{ borderBottom: "1.02122px solid #000000" }}
                        className={classes.headCell}
                      >
                        Reported by
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ borderBottom: "1.02122px solid #000000" }}
                        className={classes.headCell}
                      >
                        Date and Time
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ borderBottom: "1.02122px solid #000000" }}
                        className={classes.headCell}
                      >
                       Reason
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
                              {" "}
                              {(page - 1) * limit + index + 1}
                            </TableCell>

                            <TableCell align="center">
                              {values?.sellerId?.name ? values?.sellerId?.name : "N/A"}
                            </TableCell>
                            <TableCell align="center">
                            {values?.userId?.name ? values?.userId?.name : "N/A"}
                            </TableCell>
                            <TableCell align="center">
                            {moment(values?.createdAt).format("ll") ? moment(values?.createdAt).format("ll") : "N/A"}
                            </TableCell>
                            <TableCell align="center">
                            {values?.reasonType? values?.reasonType : "N/A"}
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
      </Box>
    </>
  );
}

export default ReportUserManagement;