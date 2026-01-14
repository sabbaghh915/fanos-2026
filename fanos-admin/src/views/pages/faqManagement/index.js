import React, { useState, useContext, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { KeyboardDatePicker } from "@material-ui/pickers";
import {
    Typography,
    IconButton,
    InputAdornment,
    Box,
    Grid,
    Button,
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableBody,
    TableHead,
    FormControl,
    Select,
    MenuItem,
    TextField,
    makeStyles,
    DialogContent,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import moment from "moment";
import VisibilityRoundedIcon from "@material-ui/icons/VisibilityRounded";
import Axios from "axios";
import ApiConfig from "src/config/APICongig";
import DataNotFoundIMG from "src/component/DataNotFoundIMG";
import { Pagination } from "@material-ui/lab";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { toast } from "react-toastify";
import Dialog from "@material-ui/core/Dialog";
import styled from "styled-components";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom/cjs/react-router-dom";


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
    layoutFlex: {
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
    },
    functionButton: {
        // border: "none",
        background: "#0C576C ",
        width: "100%",
        borderRadius: "10px",
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "700 !important",
        fontSize: "14px",
        lineHeight: "21px",
        border: "none",
        height: "40px",
        color: "#FFFFFF",
    },

    headCell: {
        //background: "transparent",
        background: "#0C576C ",
    },

    DialogBox: {
        color: "black",
        width: "500px",
        padding: "2rem",
        "& h2": {
            color: "#0C576C",
        },
        "& input": {
            width: "100%",
        },
    },

    CloseButton: {
        background: "#0C576C",
        marginTop: "20px",
    },
    resetButton: {
        border: "none",
        background: "#0C576C",
        borderRadius: "10px",
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "700 !important",
        fontSize: "14px",
        lineHeight: "21px",
        height: " 44px",
        width: "136px",
        marginTop: "45px",
        /* identical to box height */
        color: "#FFFFFF",
        "&:hover": {
            color: "#333",
        },
    },
    forminputDate: {
        "& .MuiFormControl-marginDense": {
            border: "1.16355px solid #0000 !important",
            borderRadius: "3.49065px !important",
            marginTop: "7px !important"
        },

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
    TextFieldBox: {
        borderRadius: "5px",
        background: "#fff",
        fontSize: "13px",
        caretColor: '#fff',
        caretColor: 'black',
        "&::placeholder": {
            color: "#fff !important",
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "12px",
            lineHeight: "24px",
        },
        "& .MuiInputBase-input": {
            color: "#000 !important",
            fontFamily: "Roboto !important",
            paddingLeft: "14px",
            paddingTop: "6px",
            paddingRight: '20px'
        },
        "& .MuiInput-underline:after": {
            borderBottom: "none",
        },
        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderBottom: 'none !important'
        },
        "& .MuiIconButton-edgeEnd": {
            marginRight: "10px"
        },
        '& .MuiInputBase-root': {
            border: "0.8px solid  rgb(133, 133, 133, 0.5)",
        }
    },
    mainFilterBox: {
        padding: "10px",
        boxShadow: '0px 0px 15px 1px rgba(12, 87, 108, 0.35)',
        borderRadius: '10px',
        marginTop: "20px",
    },
}));
const Flex = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
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
  word-break: break-word !important;
`;
const BtnDivision = styled.div`
  float: center;
  display: flex;
  margin-top: 1rem;
  justify-content: space-around;
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
function FAQManagement() {
    const history = useHistory();

    const classes = useStyles();
    const [historyData, setHistoryData] = useState([]);
    const [toData, setToData] = useState(null);
    const [fromData, setFromData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [noOfPages, setnoOfPages] = useState(1);
    const [page, setPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1);
    const [value, setValue] = useState(0);
    const [currentvalue, setCurrentValue] = useState("all");
    const [openSpecific, setOpenSpecific] = useState(false);
    const [openAll, setOpenAll] = useState(false);
    const [search, setSearch] = useState(null);
    const [limit, setLimit] = useState(10);
    const [openDelete, setOpenDelete] = useState(false);
    const [id, setId] = useState("");


    const handleCloseDeletePopup = () => {
        setOpenDelete(false);
      };


    // const handlePaste = (e) => {
    //   e.preventDefault();
    // };

    const handleSpecificOpen = () => {
        setOpenSpecific(true);
        history.push("/add-faq");
    };

    const handleClose = () => {
        setOpenAll(false);
        setOpenSpecific(false);
    };


    const handlesearchClick = () => {
        listFaqAll();
    }

    const listFaqAll = async () => {
        //show list All FAQ ----------------------------------------
        setHistoryData("");
        try {
            const res = await Axios({
                method: "GET",
                url: ApiConfig.listAllFAQ,

                params: {
                    page: page,
                    fromDate: fromData ? `${moment(fromData).format("YYYY-MM-DD")}` : null,
                    toDate: toData ? `${moment(toData).format("YYYY-MM-DD")}` : null,
                    limit: limit,
                    search: search ? search : null,
                }
            });

            if (res.data.responseCode === 200) {
                // console.log(res.data)
                setHistoryData(res?.data?.result?.docs);
                setPagesCount(res?.data?.result?.pages);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const deleteId = async () => {
        try {
          const res = await Axios({
            method: "DELETE",
            url: ApiConfig.deleteFAQ,
            headers: {
              token: window.localStorage.getItem("token"),
            },
            params: {
                faqId: id,
            },
          });
    
          if (res.data.responseCode === 200) {
            toast.success("Deleted Successfully.");
    
            listFaqAll();
            handleCloseDeletePopup();
          }
        } catch (error) { }
      };


    const handlereset = () => {
        listFaqAll();
        setValue();
        setToData(null);
        setFromData(null);
        setSearch("");
        setLimit(10);
    };
    useEffect(() => {
        listFaqAll();
    }, [limit, fromData, toData, page, search]);

    const Icons = (props, staticType, staticId) => {
        const state = props.id;
        const type = staticType;
        const id = staticId;
        const today = moment();

        return (
            <Flex>
                <Link
                    to={{
                        pathname: "/view-faq",
                        state,
                    }}
                >
                    <VisibilityRoundedIcon />
                </Link>

                {" "}
              <Link
                to={{
                  pathname: "/edit-faq",
                  state,
                //   type,
                  id
                }}
              >
                <EditIcon />
              </Link>
          
    
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
            <Box style={{ marginTop: "20px" }} mb={3}>
                <Grid container spacing={2} style={{ display: "flex", flexDirection: "row" }}>
                    <Grid item md={6} xs={12}>
                        <Typography variant="h4">Notifications</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.layoutFlex}>
                        <label style={{ marginRight: "1rem" }} >Search Page :</label>
                        <Grid>
                            <FormControl variant="outlined" style={{ width: "5rem" }}>
                                <Select
                                    value={limit}
                                    onChange={(e) => { setLimit(e.target.value); setPage(1); }}
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
                                <label className={classes.label}>Search</label>
                                <TextField
                                    style={{ backgroundColor: "#fff" }}
                                    placeholder="Search title..."
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    name="firstName"
                                    // onPaste={handlePaste}
                                    inputProps={{ maxLength: 45 }}
                                    value={search}
                                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                                    className={classes.TextBox}
                                    InputProps={{
                                        className: classes.TextBox,

                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton position="end">
                                                    <SearchIcon style={{ color: "#0C576C" }} />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} lg={3} sm={6}>
                            <Box className={classes.FromTable}>
                                <label className={classes.label}>From</label>
                                <div className={classes.forminputDate}>
                                    <KeyboardDatePicker
                                        className={`{classes.date} ${classes.search}`}
                                        InputProps={{
                                            className: classes.iconCss,
                                        }}
                                        onChange={(date) => { setFromData(date); setPage(1); }}
                                        placeholder="DD/MM/YYYY"
                                        format="DD/MM/YYYY"
                                        inputVariant="outlined"
                                        disableFuture
                                        margin="dense"
                                        name="dateOfBirth"
                                        value={fromData}
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
                                        minDate={fromData ? fromData : new Date()}
                                        margin="dense"
                                        name="dateOfBirth"
                                        value={toData}
                                        onChange={(date) => { setToData(date); setPage(1); }}
                                    />{" "}
                                </div>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} lg={2} sm={6} style={{ display: 'flex', alignItems: 'end', paddingBottom: '10px' }}>
                            <Button
                                className={classes.functionButton}
                                onClick={handlereset}
                                autoFocus
                                fullWidth
                            >
                                Reset
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} justify="flex-end">

                        <Grid item xs={12} md={6} lg={2}>
                            <Box>
                                <Button
                                    className={classes.functionButton}
                                    onClick={() => { handleSpecificOpen(); }}
                                >
                                    Add FAQ
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
                        <TableContainer className="TableContainerBox" style={{ boxShadow: '0px 0px 15px 1px rgba(12, 87, 108, 0.35)', borderRadius: '10px' }}>
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
                                            Question
                                        </TableCell>

                                        <TableCell
                                            align="center"
                                            style={{ borderBottom: "1.02122px solid #000000" }}
                                            className={classes.headCell}
                                        >
                                            Answer
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
                                                        {values.question ? values.question : "N/A"}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {
                                                            values.answer ? values.answer.slice(0, 40) : "N/A"
                                                        }{" "}
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

                {historyData && pagesCount > 1 && (
                    <Pagination
                        count={pagesCount}
                        page={page}
                        onChange={(e, v) => setPage(v)}
                    />
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
    )
}

export default FAQManagement