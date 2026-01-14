import { Typography, Grid } from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import ApiConfig from "src/config/APICongig";
import moment from "moment";
import "./chstSection.css";
import SendIcon from "@material-ui/icons/Send";
const useStyles = makeStyles((theme) => ({
  topDiv: {
    width: "100%",
    height: "86.81px",
    background: "transparent",
  },
  topName: {
    color: '#0C576C',
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontWeight: 500,
    paddingTop: "35px",
  },
  active: {
    color: "green",
  },

  textBoxGrid: {
    background: "#FFFFFF",
    boxShadow: "0px -1.42319px 0px #EEEEEE",
    display: "flex",
    alignItems: "center",
    position: "absolute",
    bottom: "0px",
    overflow: "hidden",
    width: "74%",
  },
  sendText: {
    fontFamily: "Poppins",
    display: "none",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "24px",
    color: "#27AE60",
    paddingRight: "30px",
    "@media(min-width:320px) and (max-width:500px)": {
      paddingRight: "0px !important",
      display: "block",
    },
    "& input:-webkit-autofill": {
      "-webkit-text-fill-color": "black !important",
    },
  },
  sendTextmst: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "24px",
    color: "#27AE60",
    cursor:'pointer',
    paddingRight: "30px",
    "@media(min-width:320px) and (max-width:500px)": {
      paddingRight: "0px !important",
      display: "none",
    },
  },
  TextBox: {
    borderRadius: "10px",
    border: "none",
    background: "#FAFAFA",
    borderRadius: "17.0783px",
    height: "51.23px",
    "& .MuiOutlinedInput-input": {},
    "& input.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputMarginDense.MuiOutlinedInput-inputMarginDense":
    {
      color: "#333 !important",
    },
    "& input:-webkit-autofill": {
      "-webkit-text-fill-color": "#333 !important",
    },
    "& .msger-input": {
      "@media (min-width:320) and (max-width:450)": {
        fontSize: "10px !important",
      },
    },
  },
  senderMessage: {
    height: "fit-content",
    width: "200px",
    background: "#F4F4F7",
    borderRadius: "22.771px",
    margin: "8px",
    position: "absolute",
    bottom: "100px",
  },
  userMessage: {
    height: "fit-content",
    width: "200px",
    background: "#F4F4F7",
    borderRadius: "22.771px",
    margin: "8px",
  },
  messageText: {
    color: "black",
    padding: "8px",
  },
  image: {
    height: "55px",
    width: "55px",
    borderRadius: "50%",
    padding: "20px",
  },
  headingFour: {
    color: "#000",
    width: "100%",
    padding: "10px",
    background: "#d4d1d1",
    borderRadius: "20px",
  },
}));

export default function (props) {
  const classes = useStyles();
  const [myText, setMyText] = useState("");
  const [chatIDmsg, setChatIDmsg] = useState(1);
  const [chatID, setChatID] = useState(props?.DATA?._id ? props.DATA._id : "");
  const [profileImg, setProfileImg] = useState(props?.DATA?.profilePic);
  const [msgData, setMsgData] = useState([]);
  const [receiverid, setReceiverid] = useState(
    props?.DATA?._id ? props.DATA?._id : ""
  );
  
  const todaydate = new Date();
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
      if (res.data.responseCode === 200) {
        res.data.result.map((values) => {
          if (values?.receiverId?._id == props?.state?.sellId) {
            setChatID(values._id);
            setReceiverid(values.receiverId?._id);
          }
          else if (values?.senderId?._id == props?.state?.sellId) {
            setChatID(values._id);
            setReceiverid(values.senderId?._id);
          }
          else if (
            values?.receiverId?._id == props?.DATA?._id ||
            values?.senderId?._id == props?.DATA?._id
          ) {
            setChatID(values._id);
          }
        });
      }
    } catch (error) { }
  };
  useEffect(() => {
    chatHistoryData();
  }, [props?.DATA?._id]);
  useEffect(() => {
    setChatID(props?.DATA?._id ? props.DATA._id : "");
  }, [props?.DATA?._id, props?.state?.sellId]);

  useEffect(() => {
    // const ws = new WebSocket("wss://nodepune-classifiedads.mobiloitte.io/"); //websocket staging url
    const ws = new WebSocket("ws://localhost:3032"); // websocket live url

    const apiCall = {
      type: "ChatHistory",
      chatId: chatID,
    };

    const fetchData = () => {
      ws.send(JSON.stringify(apiCall));
    };

    ws.onopen = (event) => {
      fetchData(); // Initial fetch
    };

    ws.onmessage = function (event) {
      try {
        if (event.data !== "[object Promise]") {
          const json = JSON.parse(event.data);
          setMsgData(json.result[0]?.messages);
        }
      } catch (err) {
     
      }
    };

    ws.onclose = () => {
      
    };

    ws.onerror = (error) => {
   
      // Optionally, you can add additional error handling logic here
    };

    // Fetch data every 1 seconds (adjust the interval as needed)
    const interval = setInterval(fetchData, 1000);

    // Clean up the WebSocket connection and interval when the component unmounts
    return () => {
      clearInterval(interval);
      ws.close();
    };
  }, [props?.DATA?._id, chatIDmsg, chatID]);

  const handleMessage = (e) => {
    setMyText(e.target.value);
  };

  const SendMessage = async () => {
    try {
      const res = await Axios({
        method: "POST",
        url: ApiConfig.oneToOneChatApi,
        data: {
          senderId: localStorage.getItem("_id")
            ? localStorage.getItem("_id")
            : "",
          receiverId: receiverid
            ? receiverid
            : props?.state?.sellId
              ? props?.state?.sellId
              : "",
          message: String(myText),
          mediaType: "text",
        },
      });
      if (res.data.response_code === 200) {
        setMyText("");
        chatHistoryData();
        props.onClick();
      } else {
        setMyText("");
      }
    } catch (error) {

    }
  };
  useEffect(() => {
    setReceiverid(props?.DATA?._id ? props.DATA?._id : "");
  }, [props?.DATA?._id]);

  const chatBoxRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat box when messages change
    scrollToBottom();
  }, [msgData]);

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };
  return (
    <>
      <section className="msger">
        <header className="msger-header">
          <Grid container className={classes.topDiv}>
            {Object.keys(props?.DATA).length === 0 &&
              props?.state == undefined ? null : (
              <Grid item align="center">
                <img
                  alt="img"
                  src={
                    props?.DATA?.profilePic ? props?.DATA?.profilePic : "images/avatar.jpeg"

                  }
                  className={classes.image}
                />
              </Grid>
            )}
            <Grid item>
              <Typography className={classes.topName}>
                {props?.DATA?.name
                  ? props?.DATA?.name?.length > 30
                    ? props?.DATA?.name?.slice(0, 30) + "..."
                    : props?.DATA?.name
                  : props?.state?.name
                    ? props?.state?.name?.length > 30
                      ? props?.state?.name?.slice(0, 30) + "..."
                      : props?.state?.name
                    : null}
              </Typography>
            </Grid>
          </Grid>
        </header>
        <div className="msger-chat" ref={chatBoxRef}>
          {msgData?.map((item) => {
            return (
              <>
                {localStorage.getItem("_id") === item?.receiverId ? (
                  <>
                    <div className="msg left-msg">
                      <div style={{ display: 'flex', flexDirection: 'column', marginBottom:'10px' }}>
                        <div className="msg-bubble">
                          <div className="msg-info">

                          </div>
                          <div
                            className="msg-text"
                            style={{ overflowWrap: "anywhere" }}
                          >
                            {item?.message}
                          </div>
                        </div>
                        <div className="msg-info-time">
                          {moment(todaydate).format("DD-MM-YYYY") ==
                            moment(item?.createdAt).format("DD-MM-YYYY")
                            ? `Today ${moment(item?.createdAt).format(
                              "hh:mm a"
                            )}`
                            : moment(item?.createdAt).format(
                              "DD-MM-YYYY hh:mm a"
                            )}
                          {/* {moment(item?.createdAt).format("hh:mm a")} */}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="msg right-msg">
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="msg-bubble">
                          <div className="msg-info">

                          </div>
                          <div
                            className="msg-text"
                            style={{ overflowWrap: "anywhere" }}
                          >
                            {item?.message}
                          </div>
                        </div>
                        <div className="msg-info-time">
                          {moment(todaydate).format("DD-MM-YYYY") ==
                            moment(item?.createdAt).format("DD-MM-YYYY")
                            ? `Today ${moment(item?.createdAt).format(
                              "hh:mm a"
                            )}`
                            : moment(item?.createdAt).format(
                              "DD-MM-YYYY hh:mm a"
                            )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            );
          })}
        </div>
        {Object.keys(props?.DATA).length === 0 &&
          props?.state == undefined ? null : (
          <>
            {" "}
            <form className="msger-inputarea">
              <input
                type="text"
                className="msger-input"
                placeholder="Enter your message..."
                variant="outlined"
                maxLength={120}
                fullWidth
                disabled={props.DATA == "" && props?.state == undefined}
                id="chatData"
                size="small"
                name="name"
                value={myText}
                onChange={(e) => handleMessage(e)}
                InputProps={{
                  className: classes.TextBox,
                }}
              />{" "}
              <button
                type="submit"
                disabled={myText.length <= 0 ? true : false}
                className={classes.sendText}
                onClick={(e) => {
                  e.preventDefault();
                  SendMessage();
                  setChatIDmsg(chatIDmsg + 1);
                }}
              >
                <SendIcon />
              </button>
              <button
                type="submit"
                className={classes.sendTextmst}
                disabled={myText.length <= 0 ? true : false}
                onClick={(e) => {
                  e.preventDefault();

                  SendMessage();
                  setChatIDmsg(chatIDmsg + 1);

                  // setChatID( props.DATA._id)
                }}
              >
                Send Message
              </button>
            </form>
          </>
        )}{" "}
      </section>
    </>
  );
}
