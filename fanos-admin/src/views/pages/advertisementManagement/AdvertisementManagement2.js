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
import EditIcon from "@material-ui/icons/Edit";
import BlockIcon from "@material-ui/icons/Block";
import Dialog from "@material-ui/core/Dialog";
import styled from "styled-components";
import DialogContent from "@material-ui/core/DialogContent";
import { toast } from "react-toastify";
import { CgUnblock } from "react-icons/cg";
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
        padding: "20px 16px 20px 16px",
        marginTop: "30px",
        fontSize: "25px",
        borderRadius: "16px",
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
  imagess: {
    width: "60px",
    height: "60px",
  },
  loaderCenter: {
    display: "flex", justifyContent: "center", alignItems: "center"
  }
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
  const [id, setId] = useState("");
  const [isactive, setisActive] = useState();
  const [openDelete, setOpenDelete] = useState(false);

  const handleCloseBlock = () => {
    setOpenBlock(false);
  };
  const handleCloseUnBlock = () => {
    setOpenUnBlock(false);
  };
  const handleOpenBlock = (id, data) => {
    setOpenBlock(true);
    setId(id);
    setisActive(data.isActive)
  };
  const handleOpenUnBlock = (id, data) => {
    setOpenUnBlock(true);
    setId(id);
    setisActive(data.isActive)
  };

  const handleCloseDeletePopup = () => {
    setOpenDelete(false);
  };

  const deleteAdvertisement = async () => {
    try {
      const res = await Axios({
        method: "DELETE",
        url: ApiConfig.deleteAdvertisement,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          _id: id,
        },
      });

      if (res.data.responseCode === 200) {
        toast.success("Deleted Successfully.");
        AllBannerList();
        handleCloseDeletePopup();
      }
    } catch (error) { }
  };

  const blockByID = async () => {
    try { 
      const res = await Axios({
        method: "PUT",
        url: ApiConfig.blockUnblockAdvertisement,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          _id: id,
        },
      });

      if (res.data.responseCode === 200) {
        toast.success("Advertisement Succesfully Blocked");
        AllBannerList();
        handleCloseBlock();
        handleCloseUnBlock();
      }
    } catch (error) { }
  };

  const AllBannerList = async () => {
    setIsLoading(true);
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.advertisementList,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          advertisementType: "TYPE_2",
        },
      });

      if (res.data.responseCode === 200) {
        setHistoryData(res.data.result);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const Icons = (props) => {         
    const state = props.id;
    const today = moment();
    const img = props?.data?.img;

    return (
      <Grid container style={{ alignItems: "center",display:"flex",flexWrap:"nowrap" }}>
        <Grid item md={6} xs={12}>
          {" "}
          <Link
            to={{
              pathname: "/edit-advertisement-type2",
              state,
              img,
            }}
          >
            <EditIcon />
          </Link>
        </Grid>
        <Grid item md={6} xs={12}>
          {props.data.status === "ACTIVE" ? (
            <BlockIcon
              onClick={() => handleOpenBlock(props.id, props.data)}
            />)
            : (
              <CgUnblock
                style={{ color: "red", fontSize: "27px" }}
                onClick={() => handleOpenUnBlock(props.id, props.data)}
              />
            )}
        </Grid>
        <Grid item md={6} xs={12}> 
        <DeleteIcon
              style={{ color: "red"}}
              onClick={() => {
                setOpenDelete(true);
                setId(props.id);
              }}
            />
            </Grid>
      </Grid>
    );
  };

  const handleBlock = () => {
    return setBlockOpen(true);
  };
  const handleClosePopup = () => {
    return setBlockOpen(false);
  };

  useEffect(() => {
    AllBannerList();                        
  }, []);

  return (
    <Page title={"Dashboard"}>
      <Box className={classes.bannerbox}>
        <Box className={classes.mainbox}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h4">Advertisement Management - Type 2</Typography>
            </Grid>
            <Grid item xs={6} align="end">
              <Link to="/add-advertisement-management-type2">
                <Button className={classes.tableButton}>Add New</Button>
              </Link>
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
                  <Table
                    aria-label="simple table"
                    style={{ minWidth: "900px" }}
                  >
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
                          Image
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
                        historyData.map((values, index) => {
                          return (
                            <TableRow>
                              <TableCell align="center">
                                {" "}
                                {(page - 1) * 8 + index + 1}
                              </TableCell>
                              <TableCell align="center">
                                <img src={values.img} alt="" className={classes.imagess} />
                              </TableCell>
                              <TableCell align="center">
                                {values.status}
                              </TableCell>

                              <TableCell align="center">
                                {values.createdAt.slice(0, 10)}
                              </TableCell>

                              <TableCell align="center" style={{width: "100%",maxWidth: "13%",cursor:"pointer"}}>
                                <Icons
                                  id={values._id}
                                  status={values.status}
                                  data={values}
                                />
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
                  <Para>Are you sure you want to Delete this Advertised?</Para>
                </DialogContent>

                <BtnDivision>
                  <BackBtn onClick={() => deleteAdvertisement()}>YES</BackBtn>
                  <BackBtn onClick={() => handleCloseDeletePopup()}>NO</BackBtn>
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
              <Title>Block</Title>
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
              <Title>Unblock</Title>
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
    </Page>
  );
}
