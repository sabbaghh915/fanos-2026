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
    height: "57px",
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
  const [idd, setIdd] = useState(props?.location?.type?.staticId);
  const [typp, setTypp] = useState(props?.location?.type?.staticType);
  const [title, settitle] = useState(props?.location?.type?.title);

  const [isEditMode, setIsEditMode] = useState(false);


  const formInitialSchema = {
    description: "",
  };

  const GetStaticDataByType = async (type) => {
    setIsLoading(true);

    try {
      const res = await Axios({
        method: "GET",
        url: `${url}/static/viewStaticContent/${type}`,
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

  useEffect(() => {
    setIsEditMode(!!title);
  }, [title]);

  useEffect(() => {
    const type = props?.location?.type?.staticType;
    const id = props?.location?.type?.staticId;
    const title = props?.location?.type?.title;


    GetStaticDataByType(type, id); //title

  }, []);

  const handleFormSubmit = async (values) => {
    setLoader(true);
    try {
      const res = await Axios({
        method: "PUT",
        url: `${url}/static/editStaticContent`,
        data: {
          _id: idd,
          type: typp,
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
              // title: yup
              //   .string(),
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
                        Title:
                      </label>
                      <TextField
                        placeholder={title ? title : "Enter title ..."}
                        variant="outlined"
                        fullWidth
                        id="title"
                        size="small"
                        value={values.title}
                        name="title"
                        className={`${classes.search} textFields`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // error={touched.title && errors.title}
                        // helperText={touched.title && errors.title}
                        disabled={!isEditMode || !!title} // Disable the text field when not in edit mode or if title is already set
                        InputProps={{
                          style: {
                            fontWeight: isEditMode ? "bold" : "normal",
                          },
                          
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <label className={classes.label}>
                        Description:
                        <span className={classes.redText} style={{ color: "red" }}>
                          *
                        </span>
                      </label>

                      <TextField
                        placeholder="Enter description"
                        variant="outlined"
                        fullWidth
                        id="description"
                        size="small"
                        inputProps={{ maxLength: 256 }}
                        name="description"
                        values={values.description}
                        className={`${classes.search} textFields`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.description && errors.description}
                        helperText={touched.description && errors.description}
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