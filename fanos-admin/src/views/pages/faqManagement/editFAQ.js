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
import ButtonCircularProgress from "../../../component/ButtonCircularProgress";

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


function EditFAQ(props) {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [historyData, setHistoryData] = useState([]);
    const [loader, setLoader] = useState(false);
    const [idd, setIdd] = useState(props?.location?.state);
    const [typp, setTypp] = useState(props?.location?.type?.staticType);
    const [question, setquestion] = useState(props?.location?.state.question);
    
  
    const [isEditMode, setIsEditMode] = useState(false);
  
  
    const formInitialSchema = {
      answer: "",
    };
    const token = localStorage.getItem("token");
    const GetStaticDataByType = async (type) => {
      setIsLoading(true);
    

  
      try {
        const res = await Axios({
          method: "GET",
          url: ApiConfig.viewFAQ,
          headers: {
            token: token,
        },
          params:{
            _id:idd,
          }
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
      setIsEditMode(!!question);
    }, [question]);
  
    useEffect(() => {
      const type = props?.location?.type?.staticType;
      const id = props?.location?.state?.id;
      const question = props?.location?.state?.question;
 
  
      GetStaticDataByType(type, id); //question
  
    }, []);
  
    const handleFormSubmit = async (values) => {
      setLoader(true);
      try {
        const res = await Axios({
          method: "PUT",
          url: ApiConfig.editFAQ,
          headers: {
            token: token,
        },
          data: {
            _id: idd,
            question: historyData.question,
            answer: values.answer,
          }
        });
  
        if (res.data.responseCode === 200) {
          setHistoryData(res.data.result);
          setIsLoading(false);
          setLoader(false);
          toast.success("FAQ successfully edited");
          history.push("/faq-management")
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
  return (
   <>
     <Page question={"Dashboard"}>
      <Box className={classes.bannerbox}>
        <Box className={classes.mainbox}>
          <Grid container className="d-flex justify-space-between">
            <Typography variant="h4">Edit FAQ</Typography>
          </Grid>
          <Formik
            onSubmit={(values) => handleFormSubmit(values)}
            initialValues={formInitialSchema}
            validationSchema={yup.object().shape({
             
              answer: yup
                .string()
                .required("Please enter a description.")
                
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
                        Question:
                      </label>
                      <TextField
                        placeholder={historyData.question ? historyData.question : "Enter question ..."}
                        variant="outlined"
                        fullWidth
                        id="question"
                        size="small"
                        value={historyData.question}
                        name="question"
                        className={`${classes.search} textFields`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.question && errors.question}
                        helperText={touched.question && errors.question}
                  
                        // disabled={!isEditMode || !!question} // Disable the text field when not in edit mode or if question is already set
                        InputProps={{
                          style: {
                            fontWeight: isEditMode ? "bold" : "normal",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <label className={classes.label}>
                        Answer:
                        <span className={classes.redText} style={{ color: "red" }}>
                          *
                        </span>
                      </label>

                      <TextField
                        placeholder={historyData.answer ? historyData.answer : "Enter Description ..."}
                        variant="outlined"
                        fullWidth
                        id="answer"
                        size="small"
                        multiline
                        rows={6}
                        name="answer"
                        values={values.answer}
                        className={`${classes.search} textFields`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.answer && errors.answer}
                        helperText={touched.answer && errors.answer}
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
                          SAVE  {loader ? <ButtonCircularProgress /> : ""}
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
   </>
  )
}

export default EditFAQ