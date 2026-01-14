
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import "./chstSection.css";



const useStyles = makeStyles((theme) => ({
    topDiv: {
        width: "100%",
        height: "86.81px",
        background: "red",
    },
    topName: {
        color: "#000",
        paddingTop: "35px"
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
        width: "74%"
    },
    sendText: {
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "16px",
        lineHeight: "24px",
        color: "#27AE60",
        paddingRight: "30px"
    },
    TextBox: {
        borderRadius: "10px",
        border: "none",
        background: "#FAFAFA",
        borderRadius: "17.0783px",
        height: "51.23px",
        "& .MuiOutlinedInput-input": {

        },
        "& input.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputMarginDense.MuiOutlinedInput-inputMarginDense":
        {
            color: "#333 !important",
        },
        "& input:-webkit-autofill": {
            "-webkit-text-fill-color": "#333 !important",
        }
   
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
        padding: "20px"

    },
    headingFour: {
        color: "#000",
        width: "100%",
        padding: "10px",
        background: "#d4d1d1",
        borderRadius: "20px",
    }
}));

export default function (props) {
    const classes = useStyles();

    const date = new Date();
    var msgArray = [];

    return (
        <>
            <section className="msger">
                rfgdgfgf
                {/*  */}
            </section>
        </>
    );
}
