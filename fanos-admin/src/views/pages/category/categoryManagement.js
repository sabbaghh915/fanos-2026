import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
  Box,
  Grid,
  Button,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  makeStyles,
  Dialog,
  DialogContent,
  IconButton,
} from "@material-ui/core";
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
import { saveAs } from 'file-saver';
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityRoundedIcon from "@material-ui/icons/VisibilityRounded";
import styled from "styled-components";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';




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
      color: "#2FF3FF !important",
    },
  },
  download: {
    fontSize: "17px",
    cursor: "pointer",
    "&:hover": {
      color: "red",
    },
  },
  datePicker: {
    "& .MuiFormControl-root .MuiInputBase-root": {
      borderRadius: "3px !important",
    },
  },
    FromTable: {
      borderRadius: "3px !important"
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
      color: "#000 !important",
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
    subCategoryImage: {
      width: "100%",
      height: "auto",
      maxWwidth: "25%",
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
  loaderCenter: {
    display: "flex", justifyContent: "center", alignItems: "center"
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
  // gap: 1rem;
  cursor: pointer;
`;
const BackBtn = styled.button`
  color: white;
  background: #0c576c;
  padding: 7px 32px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;
const OuterDiv = styled.div`
  padding: 1rem 5rem;
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

function TransactionMain(props) {
  const classes = useStyles();
  const [historyData, setHistoryData] = useState([]);
  const auth = useContext(AuthContext);
  const [toData, setToData] = useState(null);
  const [fromData, setFromData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);
  const [openDelete, setOpenDelete] = useState(false);
  const [value, setValue] = useState(0);
  const [currentvalue, setCurrentValue] = useState("all");
  const [coin, setcoin] = useState("all");
  const [clear, setIsClear] = useState(false);
  const [coinaddressData, setcoinData] = useState([]);
  const [id, setId] = useState("");
  const [search, setSearch] = useState("");

  const handleCloseDeletePopup = () => {
    setOpenDelete(false);
  };

  const deleteId = async () => {
    try {
      const res = await Axios({
        method: "DELETE",
        url: ApiConfig.deleteCategory,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          categoryId: id,
        },
      });

      if (res.data.responseCode === 200) {
        toast.success("Deleted Successfully.");
    
        AllTransactionHistory();
        handleCloseDeletePopup();
      }
    } catch (error) { }
  };

  useEffect(() => {
  }, [coinaddressData]);

  const AllTransactionHistory = async () => {
    setIsLoading(true);
    setHistoryData("");
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.categoryList,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          type: "PRODUCT",
          search: search,
          fromDate: fromData ? `${moment(fromData).format("YYYY-MM-DD")}` : "",
          toDate: toData ? `${moment(toData).format("YYYY-MM-DD")}` : "",
        },
      });

      if (res.data.responseCode === 200) {
        setHistoryData(res?.data?.result?.docs);
        setPagesCount(res?.data?.result?.pages);

        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handlereset = () => {
    AllTransactionHistory()
    setcoin("all");
    setValue("");
    setFromData(null);
    setCurrentValue("all");
    setToData(null);
    setSearch("");
    setPage(1);
  };
  useEffect(() => {
    AllTransactionHistory();
    setId(id);
  }, [page, currentvalue,search, fromData, toData, coin, clear]);

  
  const downloadExcel = () => {
    const fileName = `Category_Mangement(${moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')}).xlsx`;
    const worksheet = XLSX.utils.json_to_sheet(historyData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'userList');
    // Splitting long text into multiple cells
    const maxLength = 32767; // Maximum length for a cell
    XLSX.utils.sheet_to_json(worksheet, { header: 1 }).forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell.length > maxLength) {
          const chunks = [];
          for (let i = 0; i < cell.length; i += maxLength) {
            chunks.push(cell.slice(i, i + maxLength));
          }
          worksheet[XLSX.utils.encode_cell({ r: rowIndex, c: cellIndex })].t = 's';
          chunks.forEach((chunk, index) => {
            worksheet[XLSX.utils.encode_cell({ r: rowIndex + index, c: cellIndex })] = { v: chunk, t: 's' };
          });
        }
      });
    });

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const excelData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

    saveAs(excelData, fileName);
  };

  useEffect(() => {
    if (currentvalue === "BUYTOKEN") {
      const filterFun = historyData.filter((data, i) => {
        return data.status === "SUCCESS";
      });
      setHistoryData(filterFun);
    }
  }, [currentvalue]);

  const Icons = (props, staticType, staticId) => {
    const state = props.id;
    const type = staticType;
    const id = staticId;
    const today = moment();

    return (
      <Flex>
        <Link
          to={{
            pathname: "/view-category-details",
            state,
          }}
        >
          <VisibilityRoundedIcon />
        </Link>
        <Grid item md={6} xs={12}>
          {" "}
          <Link
            to={{
              pathname: "/edit-category",
              state,
              type,
              id
            }}
          >
            <EditIcon />
          </Link>
        </Grid>
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


  return (
    <>
      <Box className={classes.headbox}>
        <Box style={{ marginTop: "20px" }} mb={3}>
          <Grid container spacing={2} style={{ alignItems: "center" }}>
            <Grid item md={9} xs={12}>
              <Typography variant="h4">Category Management</Typography>
            </Grid>
            <Grid item md={3} xs={12} align="end">
              <Link to="/add-category">
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handlereset}
                  className={classes.tableButton}
                >
                  Add Category
                </Button>
              </Link>
            </Grid>
          </Grid>

          <Box className={classes.mainFilterBox}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6} lg={4} sm={6}>
                <Box className={classes.FromTable}>
                  <label className={classes.label} >Search </label>
                  <TextField
                    style={{ backgroundColor: "#fff" }}
                    placeholder="Search category name..."
                    type="text"
                    variant="outlined"
                    fullWidth
                    size="small"
                    name="firstName"
                    inputProps={{ maxLength: 45 }}
                    value={search}
                    onChange={(e) => {setSearch(e.target.value); setPage(1)}}
                    className={classes.search}
                    InputProps={{
                      className: classes.TextBox,

                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end">
                            <SearchIcon 
                              style={{ color: "#0C576C" }}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6} lg={2} sm={6}>
                <Box className={classes.FromTable}>
                  <label className={classes.label} >From</label>
                  <div className={classes.forminputDate}>
                    <KeyboardDatePicker
                      className={`${classes.datePicker} ${classes.forminputDate} ${classes.search}`}
                      InputProps={{
                        className: classes.iconCss,
                      }}
                      placeholder="DD/MM/YYYY"
                      format="DD/MM/YYYY"
                      inputVariant="outlined"
                      disableFuture
                      margin="dense"
                      value={fromData}
                      onChange={(date) => {setFromData(date); setPage(1)}}
                    />
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} lg={2} sm={6} style={{ borderRadius: "3px" }}>
                <Box className={classes.FromTable} style={{ borderRadius: "3px" }}>
                  <label className={classes.label} >To</label>
                  <div className={classes.forminputDate} style={{ borderRadius: "3px" }}>
                    <KeyboardDatePicker
                      className={`${classes.datePicker} ${classes.forminputDate} ${classes.search}`}
                      InputProps={{
                        className: classes.iconCss,
                      }}
                      placeholder="DD/MM/YYYY"
                      format="DD/MM/YYYY"
                      inputVariant="outlined"
                      minDate={fromData ? fromData : new Date()}
                      disableFuture
                      margin="dense"
                      name="dateOfBirth"
                      value={toData}
                      onChange={(date) => {setToData(date); setPage(1)}}
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
                <Table aria-label="simple table">
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
                        Name
                      </TableCell>

                      <TableCell
                        align="center"
                        style={{ borderBottom: "1.02122px solid #000000" }}
                        className={classes.headCell}
                      >
                        Image
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ borderBottom: "1.02122px solid #000000" }}
                        className={classes.headCell}
                      >
                        Sub Category
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
                              {(page - 1) * 10 + index + 1}
                            </TableCell>
                            <TableCell align="center">
                              <>{values.categoryName ? values.categoryName.slice(0, 20) : "N/A"}</>
                            </TableCell>
                         
                              <TableCell align="center">
                                {values.categoryImage ?
                                  <img src={values.categoryImage} lassName={classes.subCategoryImage} 
                                  style={{ width: "70px", height: "70px" }} />
                                  :
                                  "N/A"}
                              </TableCell>
                     
                            <TableCell align="center">

                              {values?.count}
                            </TableCell>
                            <TableCell align="center">
                              {moment(
                                values.createdAt ? values.createdAt : "N/A"
                              ).format("lll")}
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
                <Para>Are you sure you want to delete this category?</Para>
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
