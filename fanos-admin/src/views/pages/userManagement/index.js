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
const TransDiv = styled.p`
  font: normal 600 30px/140% Roboto;
  color: #ffffff;
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

function TransactionMain(props) {
  const classes = useStyles();
  const [historyData, setHistoryData] = useState([]);
  const auth = useContext(AuthContext);
  const [toData, setToData] = useState(null);
  const [fromData, setFromData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [currentvalue, setCurrentValue] = useState("all");
  const [pagesCount, setPagesCount] = useState(1);
  const [openBlock, setOpenBlock] = useState(false);
  const [openUnBlock, setOpenUnBlock] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [id, setId] = useState("");
  const [usertype, setUsertype] = useState(
    props?.location?.state?.state ? props.location.state.state : "ALL"
  );
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);


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

  const AllTransactionHistory = async () => {
    setIsLoading(true);
    setHistoryData("");
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.listUser,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          page: page,
          fromDate: fromData ? `${moment(fromData).format("MMM DD, YYYY hh:mm A")}` : "",
          toDate: toData ? `${moment(toData).format("MMM DD, YYYY hh:mm A")}` : "",
          limit: limit,
          search: search,
          userType1: "",
          status1: usertype == "ALL" ? "" : usertype,
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
    AllTransactionHistory();
    setFromData(null);
    setToData(null);
    setCurrentValue("all");
    setHistoryData("");
    setSearch("");
    setLimit(10);
    setUsertype("");
    setPage(1);
  };
  useEffect(() => {
    AllTransactionHistory();
  }, [usertype, currentvalue ,page, fromData, toData, limit, search]);

  const downloadExcel = () => {
    const fileName = `User_Management(${moment(new Date()).format('MMM DD, YYYY hh:mm A')}).xlsx`;
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
        url: ApiConfig.blockUnblock,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          _id: userId,
        },
      });

      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
        handleCloseBlock();
        handleCloseUnBlock();
        AllTransactionHistory();
      }
    } catch (error) {}
  };
  const deleteId = async () => {
    /////This code is under
    try {
      const res = await Axios({
        method: "DELETE",
        url: ApiConfig.deleteUser,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          _id: id,
        },
      });
      if (res.data.responseCode === 200) {
        AllTransactionHistory();
        toast.success("Deleted Successfully.");
        handleCloseDeletePopup();
      }
    } catch (error) {}
  };
  const deleteAllUsers = async () => {
    /////This code is under
    try {
      const res = await Axios({
        method: "DELETE",
        url: ApiConfig.deleteAllUsers,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          _id: id,
        },
      });
      if (res.data.responseCode === 200) {
        AllTransactionHistory();
        toast.success("Deleted Successfully.");
        handleCloseDeletePopup();
      }
    } catch (error) {}
  };
  const Icons = (props) => {
    const state = props.id;
    return (
      <Flex>
        <Link
          to={{
            pathname: "/view-user-details",
            state,
          }}
        >
          <VisibilityRoundedIcon />
        </Link>

        {props.status == "ACTIVE" ? (
          <BlockIcon onClick={() => handleOpenBlock(props.id)} />
        ) : (
          <CgUnblock
            style={{ color: "red", fontSize: "27px" }}
            onClick={() => handleOpenUnBlock(props.id)}
          />
        )}

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
          <Grid spacing={2} style={{ display: "flex", flexDirection: "row" }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4">User Management</Typography>
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
                    onChange={(e) => {setLimit(e.target.value);setPage(1);}}
                    className={`${classes.date} limitTextField`}
                    inputProps={{classes: {icon: classes.icon,},}}
                  >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={50}>30</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                    <MenuItem value={1000}>1000</MenuItem>
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
        <Grid container spacing={3} justify="flex-end">
              <Grid item xs={12} md={2}>
                <Box>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={deleteAllUsers}
                    className={classes.tableButton}
                    style={redButtonStyle}
                  >
                    deleteAllUsers
                  </Button>
                </Box>
              </Grid>
              </Grid>
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
                       Status
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
                              {values.status
                                ? values.status
                                : "N/A"}
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
                <Para>Are you sure you want to block this user?</Para>
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
                <Para>Are you sure you want to unblock this user ?</Para>
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
                <Para>Are you sure you want to delete this user?</Para>
              </DialogContent>

              <BtnDivision>
                <BackBtn onClick={() => deleteId()}>YES</BackBtn>
                <BackBtn onClick={() => handleCloseDeletePopup()}>NO</BackBtn>
              </BtnDivision>
            </OuterDiv>
          </Dialog>
        )}
      </Box>
    </>
  );
}

export default TransactionMain;