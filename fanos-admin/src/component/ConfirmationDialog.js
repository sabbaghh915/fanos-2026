import React from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "fit-content",
    padding: "10px 10px 20px 10px",
    background:"white",
    borderRadius: "24px",
    "& .MuiDialogContent-root": {
      flex: "none !important",
    },
    "& .MuiDialogActions-root": {
      marginRight: "0px !important",
    },
  },
  
  Titlemain: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "23.989px",
    lineHeight: "36px",
    color: "black",
    marginTop: "16px",
  },
  subMain: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "24px",
    color: "black",
  },
  yesNoButton: {
    width: "100%",
    maxWidth: "87px",
    height: "37px",
    background: "#0C576C",
    borderRadius: "10px",
  },
}));
export default function AlertDialog({
  open,
  handleClose,
  title,
  desc,
  confirmationHandler,
}) {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xs"
        PaperProps={{
          classes: {
            root: classes.root,
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
          <Typography className={classes.Titlemain}> {title}</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{
              textAlign: "center",
              fontSize: "17px",
            }}
          >
            <Typography
              style={{ fontSize: "18px" }}
              className={classes.subMain}
            >
              {" "}
              {desc}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <Button
            className={classes.yesNoButton}
            onClick={handleClose}
            autoFocus
          >
            No
          </Button>
          <Button
            className={classes.yesNoButton}
            onClick={() => {
              handleClose();
              confirmationHandler();
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
