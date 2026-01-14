import { Typography, Box, Grid, TextField, Button } from "@material-ui/core";
import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import { Form, Formik } from "formik";
import { useHistory } from "react-router-dom";
import { DropzoneArea } from "material-ui-dropzone";
import { toast } from "react-toastify";

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
  outerGrid: {
    border: "1px solid #333",
    padding: "2rem",
    borderRadius: "10px",
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
    width: "50%",
    height: "57px",
    marginTop: "24px",
  },
  TextBox: {
    borderRadius: "10px",
    background: theme.palette.background.taf,
    height: "55px",
  },
  label: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "22px",
    lineHeight: "48px",
    fontWeight:"bold",
    color: "#1E1E1E",
    [theme.breakpoints.down("sm")]: {
      fontSize: "13px",
    },
  },
  colorbox: {
    "& .MuiDropzoneArea-textContainer": {
      display: "block",
    },
    "& .MuiDropzoneArea-root": {
      backgroundColor: "lightgray",
      // height: "fit-content",
      height:"160px",
      width: "300px",
    },
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
    "& .MuiDropzoneArea-root": { //width and height of the main box or image you want to put.....
      backgroundColor: "lightgray",
      height: "160px",
      width: "300px",
    },
    "& .MuiDropzonePreviewList-imageContainer": {
      textAlign: "left",
    },
  },
}));

export default function (props) {
  const classes = useStyles();
  const history = useHistory();
  const [helperText, setHelperText] = React.useState("Choose wisely");  
  const [profileImage, setProfileImage] = useState();
  const [profileImage64, setProfileImage64] = useState();
  const [selectedFile, setSelectedFile] = useState(null);

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

  const formInitialSchema = {
    companyname: "",
    title: "",
    description: "",

  };

  const handleBack = () => {
    history.push("/banner-management");
  };

  const handleFormSubmit = async (values) => {};

  function handleShowToast() {
    if (selectedFile) {
      toast.success("Image uploaded successfully!");
    } else {
      toast.error("Please select an image first!");
    }
  }

  return (
    <Page title={"Dashboard"}>
      <Box className={classes.bannerbox}>
        <Box className={classes.mainbox}>
          <Grid container className="d-flex justify-space-between">
            <Typography variant="h4">Logo Settings</Typography>
          </Grid>

          <Formik
            onSubmit={(values) => handleFormSubmit(values)}
            initialStatus={{
              success: false,
              successMsg: "",
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values,
              setFieldValue,
            }) => (
              <Form>
                <Box mt={8}>
                  <Grid xs={12} className={classes.outerGrid}>
                    <Grid xs={4}>
                    <Box
                    mt={2}
                    className={
                      profileImage64 ? classes.colorbox1 : classes.colorbox
                    }
                  >
                    <DropzoneArea
                      id="profileImage"
                      maxFileSize="40000000"
                      files={profileImage64}
                      filesLimit="1"
                      acceptedFiles={["image/*"]}
                      onDrop={(files) =>
                        getBase64(files[0], (result) => {
                          console.log(result, "result");
                          setProfileImage64(result);
                        })  
                      }
                      onChange={(files) => {
                        setProfileImage("profileImage", files[0]);
                        setSelectedFile(files[0]);
                      }}
                    />
                  </Box>
                    </Grid>
                    <Grid align="center">
                      <Grid lg={6} align="center"> 
                        {" "}
                        <Button
                          variant="contained"
                          fullWidth
                          className={classes.buttonbox}
                          onClick={handleShowToast}
                        >
                          SAVE
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Page>
  );
}
