import React, { useState, useContext, useEffect } from "react";
import { Button, TextField, InputAdornment, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {
  Typography,
  Box,
  Grid,
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
import * as XLSX from "xlsx";
import VisibilityRoundedIcon from "@material-ui/icons/VisibilityRounded";
import styled from "styled-components";

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
    "& div": {
      // color: "#FFFFFF !important",
      border: "1.16355px solid #FFFFFF",
      borderRadius: "3.49065px !important",
      width:"84px",
    },
    "& .MuiSelect-icon": {
      color: "#000 !important",
    },
    "& .MuiFormControl-marginDense": {
      // color: "#FFFFFF !important",
      border: "1.16355px solid #FFFFFF",
      borderRadius: "3.49065px !important",
    },
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
    color: "#000",
  },
  layoutFlex:{
    display:"flex" , 
    alignItems: "center", 
    justifyContent:"end",
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
  headCell: {
    //background: "transparent",
    background: "#0C576C ",
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
const Flex = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    cursor: pointer;
  `;

function HelpAndSupport() {

  const classes = useStyles();
  const [historyData, setHistoryData] = useState([]);

  const auth = useContext(AuthContext);
  const [toData, setToData] = useState(null);
  const [fromData, setFromData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);
  const [value, setValue] = useState(0);
  const [currentvalue, setCurrentValue] = useState("All");
  const [coin, setcoin] = useState("all");
  const [clear, setIsClear] = useState(false);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10)


 
  // const handlePaste = (e) => {
  //   e.preventDefault();
  // }
 

  console.log("current value", currentvalue);

  const AllTransactionHistory = async () => {
    setIsLoading(true);
    setHistoryData("");
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.getHelp,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          page: page,
          fromDate: fromData ? `${moment(fromData).format("YYYY-MM-DD")}` : "",
          toDate: toData ? `${moment(toData).format("YYYY-MM-DD")}` : "",
          limit: limit,
          search: search,
          userType1: "",
        },

      });
      if (res.data.responseCode === 200) {
        setPagesCount(res?.data.result.pages);
        setHistoryData(res?.data?.result?.docs);
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
    setCurrentValue("All");
    setToData(null);
    AllTransactionHistory();
    setIsClear(true);
    setSearch("");
    setPage(1);
  };
  useEffect(() => {
    AllTransactionHistory();
  }, [page, limit, fromData, toData, search]);

  const downloadExcel = () => {
    const fileName = `Support_Management(${moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')}).xlsx`;
    const workSheet = XLSX.utils.json_to_sheet(historyData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "userList");
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
            pathname: "/view-user-support",
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
          <Grid container spacing={2} style={{ display: "flex", flexDirection: "row" }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4">Help & Support</Typography>
            </Grid>
            <Grid item xs={12} md={6} className={classes.layoutFlex}>
              <label style={{ marginRight: "1rem" }} >Search Page :</label>
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
                  <MenuItem value={200}>200</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Box className={classes.mainFilterBox}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} lg={4} sm={6}>
              <Box className={classes.FromTable}>
                <label className={classes.label}>Search </label>
                <TextField
                  style={{ backgroundColor: "#fff" }}
                  placeholder="Search name..."
                  type="text"
                  variant="outlined"
                  fullWidth
                  // onPaste={handlePaste}
                  size="small"
                  name="firstName"
                  inputProps={{ maxLength: 25 }}
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  className={classes.search}
                  InputProps={{
                    className: classes.TextBox,
                    endAdornment: (
                      <InputAdornment position="end">
                        {search === "" ?
                          "" :
                          <div>
                            <IconButton
                              sx={{ visibility: value ? "visible" : "hidden" }}
                            >
                            </IconButton>
                          </div>
                        }
                        <IconButton edge="end">
                          <SearchIcon style={{ color: "#0C576C" }} />
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
                    value={fromData}
                    onChange={(date) =>{setFromData(date); setPage(1);} }
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
                    minDate={fromData ? fromData : new Date()}
                    inputVariant="outlined"
                    disableFuture
                    margin="dense"
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
          <ButtonCircularProgress />
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
                      User Id
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
                      Email
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ borderBottom: "1.02122px solid #000000" }}
                      className={classes.headCell}
                    >
                      Message
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
                    historyData.map((values, index) => {

                      return (
                        <TableRow className={classes.tables}>
                          <TableCell align="center">
                            {" "}
                            {(page - 1) * limit + index + 1}
                          </TableCell>

                          <TableCell align="center">
                            {values._id ? values._id : "N/A"}
                          </TableCell>
                          <TableCell align="center">
                            {values.name ? values.name.slice(0, 10) : "N/A"}
                          </TableCell>
                          <TableCell align="center">
                            {values.email ? values.email : "N/A"}
                          </TableCell>
                          <TableCell align="center">
                            {values.message ? values.message.slice(0, 15) : "N/A"}
                          </TableCell>
                          <TableCell align="center">
                            {moment(
                              values.createdAt ? values.createdAt : "N/A"
                            ).format("lll")}{" "}
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
    </Box >
    </>
  )
}
export default HelpAndSupport;