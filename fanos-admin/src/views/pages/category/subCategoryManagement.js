import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
  TextField,
  InputAdornment,
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
} from "@material-ui/core";
import { sortAddress } from "src/utils";
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
import { saveAs } from 'file-saver';
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import { BiEdit } from "react-icons/bi";
import VisibilityRoundedIcon from "@material-ui/icons/VisibilityRounded";
import styled from "styled-components";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme) => ({
  headbox: {
    borderRadius: "20px",
    // marginTop: "80px",
    // overflow: "auto",
    [theme.breakpoints.down("sm")]: {
      padding: "20px 7px 53px 7px",
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
    },
    "& .MuiSelect-icon": {
      color: "#FFFFFF !important",
    },
    "& .MuiFormControl-marginDense": {
      // color: "#FFFFFF !important",
      border: "1.16355px solid #FFFFFF",
      borderRadius: "3.49065px !important",
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

    color: "#FFFFFF",
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
  headCell: {
    background: "#0C576C ",
  },
  subCategoryImage: {
    width: "60px",
    height: "60px",
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

function TransactionMain() {
  const classes = useStyles();
  const [historyData, setHistoryData] = useState([]);
  const auth = useContext(AuthContext);
  const [toData, setToData] = useState(null);
  const [fromData, setFromData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [noOfPages, setnoOfPages] = useState(1);
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);
  const [value, setValue] = useState(0);
  const [currentvalue, setCurrentValue] = useState("all");
  const [coin, setcoin] = useState("all");
  const [clear, setIsClear] = useState(false);
  const [openBlock, setOpenBlock] = useState(false);
  const [id, setId] = useState();
  const [openUnBlock, setOpenUnBlock] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const history = useHistory();
  const [search, setSearch] = useState();

  const handlesearchClick = () => {
    AllTransactionHistory();
  }
  const [categoryID, setcategoryID] = useState();

  const handleCloseDeletePopup = () => {
    setOpenDelete(false);
  };

  // const handlePaste = (e) => {
  //   e.preventDefault();
  // }

  const handleMove = () => {
    history.pushState("/add-sub-category")
  }
  const handleOpenBlock = (id, status) => {
    setOpenBlock(true);
    setId(id);
  };
  const handleOpenUnBlock = (id, status) => {
    setOpenUnBlock(true);
    setId(id);
  };

  const deleteId = async () => {
    try {
      const res = await Axios({
        method: "DELETE",
        url: ApiConfig.deleteSubCategory,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          subCategoryId: id,
        },
      });

      if (res.data.responseCode === 200) {
        AllTransactionHistory();
        toast.success("Deleted Successfully.");
        handleCloseDeletePopup();
      }
    } catch (error) {
      toast.error("this is the error")
    }
  };
  const AllTransactionHistory = async () => {
    setIsLoading(true);
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.subCategoryList,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          search: search,
          categoryId: categoryID,
          page: page,
          fromDate: fromData ? `${moment(fromData).format("YYYY-MM-DD")}` : "",
          toDate: toData ? `${moment(toData).format("YYYY-MM-DD")}` : "",
        },
      });

      if (res.data.responseCode === 200) {
        setIsLoading(false);
        setHistoryData(res?.data?.result?.docs);
        setPagesCount(res?.data.result.pages);
        //setPagesCount(res);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handlereset = () => {
    setcoin("all");
    setValue();
    setToData(null); const getBase64 = (file, cb) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        cb(reader.result);
      };
      reader.onerror = function (err) {
        console.log("Error: ", err);
      };
    };
    setFromData(null);
    setCurrentValue("all");
    setToData(null);
    setSearch("");
    setIsClear(true);
    setPage(1);
  };
  useEffect(() => {
    AllTransactionHistory();
  }, [page, currentvalue, fromData, toData,search, clear]);

  const downloadExcel = () => {
    const fileName = `SubCategory_Mangement(${moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')}).xlsx`;
    const worksheet = XLSX.utils.json_to_sheet(historyData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet,fileName);

    // Splitting long text into multiple cells
    const maxLength = 32767; // Maximum length for a cell
    XLSX.utils.sheet_to_json(worksheet, { header: 1 }).forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell?.length > maxLength) {
          const chunks = [];
          for (let i = 0; i < cell?.length; i += maxLength) {
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

  const Icons = (props) => {
    const state = props.id;
    const categoryID = props.categoryID;
    const State = {
      id: props?.id,
      categoryID: props.categoryID
    }

    return (
      <Flex>
        <Link
          to={{
            pathname: "/view-sub-category-details",
            state,
            id,
          }}
        >
          <VisibilityRoundedIcon />
        </Link>
        <Grid item md={6} xs={12}>
          {" "}
          <Link
            to={{
              pathname: "/editSubCategory",
              state: State
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
              <Typography variant="h4">Sub Category Management</Typography>
            </Grid>
            <Grid item md={3} xs={12} align="end">
              <Link to="/add-sub-category">
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleMove}
                  className={classes.tableButton}
                >
                  Add Sub Category
                </Button>
              </Link>
            </Grid>
          </Grid>
          <Box className={classes.mainFilterBox}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6} lg={4} sm={6}>
                <Box className={classes.forminputDate}>
                  <label className={classes.label} style={{ color: "black" }}>Search </label>
                  <TextField
                    style={{ backgroundColor: "#fff" }}
                    placeholder="Search category name..."
                    type="text"
                    variant="outlined"
                    fullWidth
                    size="small"
                    name="firstName"
                    // onPaste={handlePaste}
                    inputProps={{ maxLength: 45 }}
                    value={search}
                    onChange={(e) => {setSearch(e.target.value); setPage(1);}}
                    className={classes.search}
                    InputProps={{
                      className: classes.TextBox,

                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton position="end">
                            <SearchIcon style={{ color: "#0C576C" }}/>
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6} lg={2} sm={6}>
                <Box className={classes.FromTable1}>
                  <label className={classes.label} style={{ color: "black" }}>From</label>
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
                      onChange={(date) =>{setFromData(date); setPage(1);} }
                    />
                  </div>
                </Box>
              </Grid>

              <Grid item xs={12} md={6} lg={2} sm={6}>
                <Box className={classes.FromTable1}>
                  <label className={classes.label} style={{ color: "black" }}>To</label>
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
                      name="dateOfBirth"
                      minDate={fromData ? fromData : new Date()}
                      value={toData}
                      onChange={(date) =>{setToData(date); setPage(1)} }
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
                        Sub Category Name
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
                        Product Quantity
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
                              <>
                                {values.subCategoryName ? values.subCategoryName : "N/A"}
                              </>
                            </TableCell>
                            <TableCell align="center">
                              {values.subCategoryImage ? (
                                <img
                                  className={classes.subCategoryImage}
                                  src={values.subCategoryImage}
                                  alt="Profile Image"
                                />
                              ) : (
                                "N/A"
                              )}
                            </TableCell>
                            <TableCell align="center">
                              {values.toAddress ? (
                                <>
                                  {sortAddress(values.toAddress)}
                                  <CopyToClipboard text={values?.toAddress}>
                                    <BiCopy
                                      style={{
                                        color: "#848484",
                                        fontSize: " 20px",
                                        cursor: "pointer",
                                        marginLeft: "5px",
                                      }}
                                      onClick={() =>
                                        toast.success("Copied successfully")
                                      }
                                    />
                                  </CopyToClipboard>
                                </>
                              ) : (
                                "2"
                              )}
                            </TableCell>
                            <TableCell align="center">
                              {moment(
                                values.createdAt ? values.createdAt : "N/A"
                              ).format("lll")}{" "}
                            </TableCell>
                            <TableCell align="center">
                              <Icons
                                id={values?._id}
                                categoryID={values?.categoryId?._id}

                              />
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
