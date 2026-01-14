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
} from "@material-ui/core";
import moment from "moment";
import Axios from "axios";
import ApiConfig from "src/config/APICongig";
import DataNotFoundIMG from "src/component/DataNotFoundIMG";
import { AuthContext } from "src/context/Auth";
import { Pagination } from "@material-ui/lab";
import Page from "src/component/Page";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { Link } from "react-router-dom";
import VisibilityRoundedIcon from "@material-ui/icons/VisibilityRounded";
import BlockIcon from "@material-ui/icons/Block";
import Dialog from "@material-ui/core/Dialog";
import { toast } from "react-toastify";
import { CgUnblock } from "react-icons/cg";
import DialogContent from "@material-ui/core/DialogContent";
import styled from "styled-components";
import DeleteIcon from "@material-ui/icons/Delete";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  mainbox: {
    borderRadius: "20px",
    padding: "20px 0px",

    "& h4": {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "36px",
      lineHeight: "54px",
      color: "#0C576C",
      [theme.breakpoints.down("sm")]: {
        fontSize: "30px",
       
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "27px",
       
      },
    },
    [theme.breakpoints.down("sm")]: {
      padding: "20px 16px 20px 16px",
      borderRadius: "16px",
    },
  },

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
    height: "43px",
    color: "#FFFFFF",
  },
  headCell: {
    background: "#0C576C ",
  },
  DialogBox: {
    color: "black",
    width: "400px",
    padding: "2rem",
    textAlign: "center",
    fontSize: "24px",
    "& h2": {
      color: "#0C576C",
      marginTop: "0px",
    },
    "& input": {
      width: "100%",
      marginBottom: "10px",
    },
  },
  CloseButton: {
    background: "#0C576C",
    marginTop: "20px",
  },
  bannerImage: {
    width: '100px',
    height: "40px"
  }

}));
const Title = styled.h1`
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BackBtn = styled.button`
  color: white;
  background: #0c576c;
  padding: 7px 32px;
  border-radius: 5px;
  border: none;
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
const BtnDivision = styled.div`
  float: center;
  display: flex;
  margin-top: 1rem;
  justify-content: space-around;
`;
const OuterDiv = styled.div`
  padding: 1rem 5rem;
`;
const Para = styled.p`
  color: black;
`;




export default function (props) {
  const classes = useStyles();
  const [historyData, setHistoryData] = useState([]);

  const auth = useContext(AuthContext);

  const userdata = auth?.userData ? auth?.userData : "";
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);
  const [openBlock, setOpenBlock] = useState(false);
  const [openUnBlock, setOpenUnBlock] = useState(false);
  const [blockOpen, setBlockOpen] = useState(false);
  const [id, setUserID] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
 

  const handleCloseDeletePopup = () => {
    setOpenDelete(false);
  };


  const handleOpenBlock = (id, status) => {
    setOpenBlock(true);
    setUserID(id);
  };

  const handleOpenUnBlock = (id, status) => {
    setOpenUnBlock(true);
    setUserID(id);
  };
  const handleCloseBlock = () => {
    setOpenBlock(false);
  };
  const handleCloseUnBlock = () => {
    setOpenUnBlock(false);
  };

  const blockByID = async () => {
    try {
      const res = await Axios({
        method: "PUT",
        url: ApiConfig.blockUnblockBanner,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          _id: id,
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
        url: ApiConfig.deleteBanner,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          _id: id,
        },
      });

      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
        AllTransactionHistory();
        handleCloseDeletePopup();
      }
    } catch (error) { }
  };


  const AllTransactionHistory = async (id) => {
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.listBanner,

      });
      if (res.data.responseCode == 200) {
        setHistoryData(res.data.result);
        setPagesCount(res?.data.result.pages);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const Flex = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  cursor: pointer;
`;
  const Icons = (props) => {
    const state = props.id;

    return (
      
         <Flex>
          <Link
            to={{
              pathname: "/view-banner",
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
            setUserID(props.id);
          }}
        />
        </Flex>
    
    );
  };

  const handleBlock = () => {
    return setBlockOpen(true);
  };

  const handleClosePopup = () => {
    return setBlockOpen(false);
  };

  useEffect(() => {
    AllTransactionHistory();
  }, []);

  return (
    <Page title={"Dashboard"}>
      <Box className={classes.bannerbox}>
        <Box className={classes.mainbox}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h4"> Banner Management</Typography>
            </Grid>
            <Grid item xs={6} align="end">
              <Link to="/add-banner">
                <Button className={classes.tableButton}>Add New</Button>
              </Link>
            </Grid>
          </Grid>

          <Box mt={2} width="100%">
            {isLoading ? (
              <ButtonCircularProgress />
            ) : (
              <>
                <TableContainer className="TableContainerBox">
                  <Table
                    aria-label="simple table"
                    style={{ minWidth: "900px" }}
                  >
                    <TableHead
                      style={{
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
                          Title
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
                          Date
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
                          console.log(values,"<===values");
                          return (
                            <TableRow>
                              <TableCell align="center">
                                {" "}
                                {(page - 1) * 8 + index + 1}
                              </TableCell>
                              <TableCell align="center">
                                <img
                                  src={values.img}
                                  alt="Product Image"
                                  className={classes.bannerImage}
                                />
                              </TableCell>
                              <TableCell align="center">
                                {values.status}
                              </TableCell>

                              <TableCell align="center">
                                <Typography>
                                  {moment(values.createdAt ? values.createdAt : "N/A").format("lll")}
                                </Typography>
                              </TableCell>

                              <TableCell align="center">
                                <Icons
                                  id={values._id}
                                  status={values.status}
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
                <Para>Are you sure you want to Block?</Para>
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
                <Para>Are you sure you want to Unblock?</Para>
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
    </Page>
  );
}
