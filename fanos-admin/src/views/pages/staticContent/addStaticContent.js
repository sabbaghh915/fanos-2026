
import { Typography, Box, Grid, TextField, Button, FormHelperText, InputAdornment } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import { Link, useHistory, useLocation } from "react-router-dom";
import { url } from "../../../config/APICongig";
import Axios from "axios";
import * as yup from "yup";
import { Form, Formik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import ApiConfig from "src/config/APICongig";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  TextBox: {
    borderRadius: "10px",
    height: "55px",
    background: theme.palette.background.taf,
  },
  DescriptionBox: {
    height: "10rem",
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
    width: "100%",
    height: "40px",
    marginTop: "24px",
  },
  textFieldContainer: {
    maxHeight: "100px",
    overflow: "auto",
    wordWrap: "breakWord",
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
}));


export default function (props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [content, setContent] = useState();
  const [isEditMode, setIsEditMode] = useState(false);

  const formInitialSchema = {
    type:"",
    title:"",
    description: "",
  };

  const handleFormSubmit = async (values) => {
    setLoader(true);
    try {
      const res = await Axios({
        method: "POST",
        url: ApiConfig.addStaticContent,
        data: {
          
          type: values.type,
          title: values.title,
          description: values.description,
        }
      });

      if (res.data.responseCode === 200) {
        setHistoryData(res.data.result);
        setIsLoading(false);
        setLoader(false);
        toast.success("Static Content successfully edited");
        history.push("/static-content-management")
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Page title={"Dashboard"}>
      <Box className={classes.bannerbox}>
        <Box className={classes.mainbox}>
          <Grid container className="d-flex justify-space-between">
            <Typography variant="h4">Edit content</Typography>
          </Grid>
          <Formik
            onSubmit={(values) => handleFormSubmit(values)}
            initialValues={formInitialSchema}
            validationSchema={yup.object().shape({
              type: yup
                .string()
                .required("Please enter a type.")
                .max(256, "Description must not exceeds 256 characters"),
              title: yup
                .string()
                .required("Please enter a title.")
                .max(256, "Description must not exceeds 256 characters"),
              description: yup
                .string()
                .required("Please enter a description.")
                .max(256, "Description must not exceeds 256 characters"),
            })}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box>
                    
                  <Grid>
                  <Grid item style={{ marginBottom: "10px", marginTop: ".5rem" }}>
                      <label className={classes.label}>
                        Type:
                      </label>
                      <TextField
                        placeholder={"Enter type ..."}
                        variant="outlined"
                        fullWidth
                        type="text"
                        id="type"
                        size="small"
                        value={values.type}
                        name="type"
                        className={`${classes.search} textFields`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.type && errors.type}
                        helperText={touched.type && errors.type}
                       
                      />
                    </Grid>
                    <Grid item style={{ marginBottom: "10px", marginTop: ".5rem" }}>
                      <label className={classes.label}>
                        Title:
                      </label>
                      <TextField
                        placeholder={"Enter title ..."}
                        variant="outlined"
                        fullWidth
                        id="title"
                        size="small"
                        value={values.title}
                        name="title"
                        className={`${classes.search} textFields`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.title && errors.title}
                        helperText={touched.title && errors.title}
                       
                      />
                    </Grid>
                    <Grid item>
                      <label className={classes.label}>
                        Description:
                        <span className={classes.redText} style={{ color: "red" }}>
                          *
                        </span>
                      </label>

                      <CKEditor
                        editor={ClassicEditor}
                        data={values.description} 
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          handleChange({
                            target: { name: "description", value: data },
                          });
                        }}
                      />
                    </Grid>
                    <Grid align="center">
                      <Grid md={3} xs={8} align="center">
                        <Button
                          type="submit"
                          variant="contained"
                          fullWidth
                          className={classes.buttonbox}
                        >
                          SAVE
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </Page>
  );
}
