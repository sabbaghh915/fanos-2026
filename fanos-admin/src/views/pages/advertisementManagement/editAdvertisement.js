import { Typography, Box, Grid, TextField, Button } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { DropzoneArea } from "material-ui-dropzone";
import Page from "src/component/Page";
import { toast } from "react-toastify";
import ApiConfig from "src/config/APICongig";
import Axios from "axios";


const useStyles = makeStyles((theme) => ({
  root: {
    //display: "flex",
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
      /* identical to box height */

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

  colorbox: {
    // color: "#1D2D3F",
    color: theme.palette.text.primary,
    height: "auto",
    "& .MuiDropzoneArea-root": {
      height: "fit-content",

      width: "100% !important",
      //maxWidth: "5rm !important",
    },
    "& .MuiDropzoneArea-text": {
      display: "none",
    },
    "& .MuiDropzoneArea-textContainer ": {
      marginTop: "55px",
    },
    "& h2": {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "36px",
      lineHeight: "54px",
      color: "#FFFFFF",
    },
    "& h3": {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "16px",
      lineHeight: "24px",
      color: "#FFFFFF",
    },
    "& img": {
      maxWidth: "none",
      width: "100%",
      height: "300px",
    },
  },

  CloseButton: {
    background: "#0C576C",
    marginTop: "20px",
  },

  buttonbox: {

    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "700 !important",
    fontSize: "22px",
    textAlign: "center",
    letterSpacing: "0.2px",
    color: "#FFFFFF",
    background: "#0C576C",
    borderRadius: "10px",
    maxWidth: "100%",
    width: "30%",
    height: "57px",
    marginTop: "24px",
  },
  TextBox: {
    border: "1px solid",
    maxWidth: "50%",
    width: "44rem",
    height: "25px",
    padding: "5px",
  },
  redText: {
    color: "#FF0000",
    marginLeft: "-4px",
    fontSize: "20px",
  },
  colorbox1: {
    // color: "#1D2D3F",
    color: theme.palette.text.primary,
    // height: "auto",
    "& .MuiDropzonePreviewList-image": {
      height: "100%",
      maxHeight:'300px'
    },
    "& .MuiGrid-spacing-xs-8 > .MuiGrid-item": {
      padding: "0px",
    },
    "& .MuiGrid-spacing-xs-8": {
      margin: "0px",
    },
    "& .MuiDropzoneArea-textContainer": {
      display: "none",
    },
    "& .MuiGrid-grid-xs-4": {
      flexBasis: "100% !important",
      maxWidth: "100%",
    },
    "& .MuiDropzonePreviewList-removeButton": {
      top: "3px",
      right: "63px",
    },
    "& .MuiDropzoneArea-root": {
      backgroundColor: "lightgray",
      height: "470px",
      width: "260px",
      // borderRadius: "50%",
      width: "100%",
      maxWidth: "80%",
    },
    "& .MuiDropzonePreviewList-imageContainer": {
      textAlign: "left",
    },
  },
}));

export default function (props) {
  const classes = useStyles();
  const history = useHistory();

  const [loader, setLoader] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [id, setid] = useState(props?.location?.state);
  const [isLoading, setIsLoading] = useState();
  const [profileImage, setProfileImage] = useState();
  const [profileImage64, setProfileImage64] = useState();
  const [backgroundImg, setBackgroundImg] = useState(props?.location?.img);



  // const getBase64 = (file, cb) => {
  //   let reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = function () {
  //     cb(reader.result);
  //   };
  //   reader.onerror = function (err) {
  //     console.log("Error: ", err);
  //   };
  // };

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (err) {
      console.log("Error: ", err);
    };
  };

  const handleBack = () => {
    history.push("/advertisement-management")
  }



  let formData = new FormData();

  const handleSubmit = async (values) => {
    setLoader(true);
    formData.append('_id', id);
    formData.append('img', profileImage64)
    if (profileImage == null) {
      toast.error("Please select the image first");
    }
    else {
      try {

        const res = await Axios({
          method: "PUT",
          url: ApiConfig.updateAdvertisement,
          headers: {
            token: window.localStorage.getItem("token"),
          },
          data: formData,
        });

        if (res.data.responseCode === 200) {
          setHistoryData(res.data.result);
          setid(id);
          setIsLoading(false);
          setLoader(false);
          toast.success("Edited Successfully");
          history.push("/advertisement-management");
        }
      }
      catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  };

  return (
    <Page title={"Dashboard"}>
      <Box className={classes.bannerbox}>
        <Box className={classes.mainbox}>
          <Grid container className="d-flex justify-space-between">
            <Typography variant="h4">Edit Advertisement</Typography>
          </Grid>
          <Box>
            <Grid>
              <Grid item style={{ marginBottom: "10px", marginTop: "56px" }}>
                <label className={classes.label} style={{ fontSize: "20px" }}>
                  Advertisement Image: <span className={classes.redText}>*</span>
                </label>
                <Grid xs={12} className={classes.colorbox}>
                  <Box
                    mt={2}
                    className={
                      profileImage64 ? classes.colorbox1 : classes.colorbox
                    }
                  >
                    <DropzoneArea
                      maxFileSize="80000000"
                      filesLimit="1"

                      files={profileImage64}

                      style={{
                        marginTop: "-78px",
                        marginLeft: "20px",
                      }}
                      acceptedFiles={["image/*"]}
                      onDrop={(files) =>
                        getBase64(files[0], (result) => {
                          console.log(result, "result");
                          setProfileImage64(files[0]);
                        })
                      }
                      onChange={(files) =>
                        setProfileImage("profileImage", files[0])
                      }
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid align="center" style={{ display: "flex" }}>
              <Grid md={6} xs={12} align="center">
                {" "}
                <Button
                  variant="contained"
                  fullWidth
                  className={classes.buttonbox}
                  onClick={() => handleSubmit()}
                >
                  SAVE
                </Button>
              </Grid>
              <Grid md={6} xs={12} align="center">
                {" "}
                <Button
                  variant="contained"
                  fullWidth
                  className={classes.buttonbox}
                  onClick={() => handleBack()}
                >
                  Back
                </Button>
              </Grid>

            </Grid>
          </Box>
        </Box>
      </Box>
    </Page>
  );
}



