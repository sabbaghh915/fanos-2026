import { Typography, Grid, Box, Link } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import moment from "moment";
import ChatBoxHistory from "./chatBoxHistory";
import Axios from "axios";
import ApiConfig from "src/config/APICongig";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  message: {
    color: "#fff",
    paddingBottom: "20px",
    fontSize: "20px",
  },
  back: {
    color: "#fff",
    paddingBottom: "20px",
    fontSize: "20px",
  },
  backgroundBox: {
    padding: "15px",
    paddingBottom:'0px !important',
    background: "#fff",
    height: "100%",
    cursor: "pointer",
    borderRadius:'8px',
    boxShadow: '0px 0px 1.15416px 0px rgba(9, 30, 66, 0.30), 0px 11.54162px 20.77491px 0px rgba(9, 30, 66, 0.15)',
    "@media (max-width: 1450px)": {
      padding: "35px 14px",
      overflowY: "scroll",
    },
  },
  chatBox: {
    background: "#FAFAFA",
    height: "100vh",
  },
  search: {
    position: "relative",
    background:'#F7F8F9',
    border:'1px solid #E8ECF4',
    borderRadius:'8px',
    height: "52px",
    "&:hover": {},
    marginRight: theme.spacing(2),
    marginLeft: 0,

    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },
  },
  searchIcon: {
    paddingLeft: "10px",
    color: "#000",
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: "10px",
    "& .MuiSvgIcon-root": {
      color: "#676767",
      position: "absolute",
      paddingLeft: "15px",
    },
  },
  sortBy: {
    color: "#fff",
    fontSize: "16px",
    fontWeight: "400",
    paddingTop: "10px",
    paddingLeft: "10px",
  },
  newSort: {
    color: "#2D9CDB",
    fontSize: "18px",
    fontWeight: "400",
  },
  chatName1: {
    color: '#0C576C',
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontWeight: 500,
    paddingLeft: "10px",
  },
  chatName: {
    color: "#fff",
    fontSize: "12px",
    textAlign: "end",
  },
  chatMsg: {
    color: '#707070',
    fontFamily: 'Poppins',
    fontSize: '14px',
    fontWeight: 400,
    textAlign: "initial",
    paddingLeft: "10px",
  },
  selected: {
    paddingTop: "25px",
    paddingBottom: "20px",
    cursor: "pointer",
  },
  normal: {
    paddingTop: "25px",
    cursor: "pointer",
  },
  image: {
    borderRadius: "50%",
    width:"55px",
    height:'55px'
  },
  inputInput: {
    "& .MuiInputBase-input": {
      padding: "5px 0px 10px 22px !important",
    },
   
  },
  chatTime: {
    color: '#707070',
    fontFamily: 'Poppins',
    fontSize: '12px',
    fontWeight: 400,
    textAlign: "end",
    [theme.breakpoints.up("xs")]: {
      display: "none",
    },
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    [theme.breakpoints.up("md")]: {
      display: "block",
    },

    [theme.breakpoints.up("lg")]: {
      display: "block",
    },
  },
  listBox: {
    overflowY: "auto",
    maxHeight: "80vh",
  },
  createads: {
    color: '#0C576C',
    fontFamily: 'Poppins',
    fontSize: '16.183px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '10.697px',
    marginTop:'30px',
    marginBottom:'20px'
  },
}));

export default function (props) {
  const classes = useStyles();
  const history = useHistory();
  const [userID] = useState(localStorage.getItem("_id"));
  const [userList, setUserList] = useState([]);
  const [passData, setPassData] = useState({});
  const [chatComponent, setChatComponent] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [dataReset, setDataReset] = useState("");
  const chatHistoryData = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await Axios({
        method: "POST",
        url: ApiConfig.chatHistory,
        headers: {
          token: token,
        },
      });
      if (res.data.responseCode == 200) {
        setChatHistory(res.data?.result);
   
      }
    } catch (error) {
      if (error.response.data.responseMessage === "User not authorized .") {
        history.push("/");
      }
    }
  };

  useEffect(() => {
    chatHistoryData();
  }, []);

  const filterData = (value) => {
    const res = chatHistory?.filter((data) => {
      return value === ""
        ? data
        : data?.receiverId?.name
            .toLowerCase()
            .startsWith(dataReset.toLowerCase()) || value === ""
        ? data
        : data?.senderId?.name
            .toLowerCase()
            .startsWith(dataReset.toLowerCase());
    });
    setUserList(res);
    setDataReset(value);
  };
  const handleOnClick = (value) => {
    if (value?.receiverId?._id == localStorage.getItem("_id")) {
      setChatComponent(true);
      setPassData(value.senderId);
    } else if (value?.senderId?._id == localStorage.getItem("_id")) {
      setChatComponent(true);
      setPassData(value.receiverId);
    }
  };
  const leftSide = () => {
    return (
      <>
        {/* <Grid container style={{ justifyContent: "space-between" }}>
          <Grid>
            <Typography className={classes.message}>Messages</Typography>
          </Grid>
          <Grid>
            <a className={classes.back} onClick={() => history.push("/")}>
              Back
            </a>
          </Grid>
        </Grid> */}
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search by"
            onChange={(e) => filterData(e.target.value)}
            value={dataReset}
            style={{
              width: "100%",
              padding: "13px 10px 10px 32px",
              color: "#000",
            }}
            classes={{
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search", maxLength: 256 }}
          />
        </div>
        <div></div>

        <Grid>
          <Box className={classes.listBox}>
            {userList.length === 0 && dataReset == "" ? (
              <>
                {chatHistory?.map((value, key) => {
                  const ToCheck =
                    value?.receiverId?._id == userID
                      ? value?.senderId
                      : value?.receiverId;
                   
                  return (
                    <>
                      <Grid
                        container
                        className={
                          chatComponent ? classes.normal : classes.normal
                        }
                        style={{ alignItems: "center" }}
                        onClick={() => {
                          handleOnClick(value);
                          history.replace({
                            ...history.location,
                            state: undefined, // Set the state to undefined to clear it
                          });
                        }}
                      >
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                          <img
                            className={classes.image}
                            src={
                              ToCheck.profilePic ? ToCheck.profilePic :"images/avatar.jpeg"
                            }
                            alt="No img"
                          />
                        </Grid>
                        <Grid item lg={7} md={7} sm={7} xs={7}>
                          <Typography className={classes.chatName1}>
                            {ToCheck?.name
                              ? ToCheck?.name.length > 15
                                ? ToCheck.name.slice(0, 15) + "..."
                                : ToCheck.name
                              : "Unknown"}
                          </Typography>
                          <Typography className={classes.chatMsg}>
                            {value.messages?.length - 1
                              ? value.messages[value.messages?.length - 1]
                                  ?.message.length > 10
                                ? value.messages[
                                    value.messages?.length - 1
                                  ]?.message.slice(0, 20) + "..."
                                : value.messages[value.messages?.length - 1]
                                    ?.message
                              : ""}
                          </Typography>
                        </Grid>
                        <Grid item lg={3} md={3} sm={3} xs={3}>
                          <Typography className={classes.chatTime}>
                            {value.messages?.length - 1
                              ? moment(
                                  value.messages[value.messages?.length - 1]
                                    ?.createdAt
                                ).format("DD-MM-YYYY")
                              : ""}
                          </Typography>
                          <Typography className={classes.chatTime}>
                            {value.messages?.length - 1
                              ? moment(
                                  value.messages[value.messages?.length - 1]
                                    ?.createdAt
                                ).format("h:mm A")
                              : ""}
                          </Typography>
                          <Typography className={classes.chatName}>
                            <img
                              alt="img"
                              src={
                                value.messageStatus == "Unread"
                                  ? "images/unread.svg"
                                  : "images/read.svg"
                              }
                            />
                          </Typography>
                        </Grid>
                      </Grid>
                    </>
                  );
                })}
              </>
            ) : (
              <>
                {userList?.map((value, key) => {
                  const ToCheck =
                    value?.receiverId?._id == userID
                      ? value?.senderId
                      : value?.receiverId;

                  return (
                    <>
                      <Grid
                        container
                        className={
                          chatComponent ? classes.normal : classes.normal
                        }
                        style={{ alignItems: "center" }}
                        onClick={() => {
                          handleOnClick(value);
                          history.replace({
                            ...history.location,
                            state: undefined, // Set the state to undefined to clear it
                          });
                        }}
                      >
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                          <img
                            className={classes.image}
                            src={
                              ToCheck?.profilePic === "undefined" &&
                              ToCheck?.profilePic === "" &&
                              ToCheck?.profilePic === undefined
                                ? ToCheck?.profilePic
                                : "images/avatar.jpeg"
                            }
                            alt="No img"
                          />
                        </Grid>
                        <Grid item lg={7} md={7} sm={7} xs={7}>
                          <Typography className={classes.chatName1}>
                            {ToCheck?.name
                              ? ToCheck?.name.length > 15
                                ? ToCheck.name.slice(0, 15) + "..."
                                : ToCheck.name
                              : "Unknown"}
                          </Typography>
                          <Typography className={classes.chatMsg}>
                            {value.messages?.length - 1
                              ? value.messages[value.messages?.length - 1]
                                  ?.message.length > 10
                                ? value.messages[
                                    value.messages?.length - 1
                                  ]?.message.slice(0, 20) + "..."
                                : value.messages[value.messages?.length - 1]
                                    ?.message
                              : ""}
                          </Typography>
                        </Grid>
                        <Grid item lg={3} md={3} sm={3} xs={3}>
                          <Typography className={classes.chatTime}>
                            {value.messages?.length - 1
                              ? moment(
                                  value.messages[value.messages?.length - 1]
                                    ?.createdAt
                                ).format("DD-MM-YYYY")
                              : ""}
                          </Typography>
                          <Typography className={classes.chatTime}>
                            {value.messages?.length - 1
                              ? moment(
                                  value.messages[value.messages?.length - 1]
                                    ?.createdAt
                                ).format("h:mm A")
                              : ""}
                          </Typography>
                          <Typography className={classes.chatName}>
                            <img
                              alt="img"
                              src={
                                value.messageStatus == "Unread"
                                  ? "images/unread.svg"
                                  : "images/read.svg"
                              }
                            />
                          </Typography>
                        </Grid>
                      </Grid>
                    </>
                  );
                })}
              </>
            )}
          </Box>
        </Grid>
      </>
    );
  };

  const rightSide = () => {
    return (
      <ChatBoxHistory
        DATA={passData}
        state={props?.location?.state}
        onClick={chatHistoryData}
      />
    );
  };

  return (
    <Page title={"chat"} style={{ height: "100vh" }}>
       <Grid item lg={12} className={classes.createads} >
                    <Link className={classes.createads} style={{margin:'0px'}}to='/'>Home</Link> {" "}{">"}{" "}
                    Messages
                  </Grid>
      <Grid container >
        <Grid container spacing={2} style={{marginBottom:'50px'}}>
          <Grid
            item
            xs={5}
            lg={3}
            md={3}
            sm={3}
            // className={classes.backgroundBox}
          >
            <Box className={classes.backgroundBox}>
            {leftSide()}
              
            </Box>
          </Grid>
          <Grid item xs={7} lg={9} sm={9} md={9}>
            {rightSide()}
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
}
