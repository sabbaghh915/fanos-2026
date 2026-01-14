import { Typography, Box, Grid, TextField, Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import * as yup from "yup";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import ApiConfig from "src/config/APICongig";
import Axios from "axios";

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
    fontWeight: "700",
    fontSize: "22px",
    textAlign: "center",
    letterSpacing: "0.2px",
    color: "#FFFFFF",
    background: "#0C576C",
    borderRadius: "16px",
    width: "100%",
    height: "57px",
    marginTop: "24px",
    [theme.breakpoints.only("sm")]: {
      maxWidth: "112px",
      fontSize: "20px",
    },
    [theme.breakpoints.only("xs")]: {
      maxWidth: "112px",
      fontSize: "16px",
    },
  },
  TextBox: {
    borderRadius: "10px",
    background: theme.palette.background.taf,
    height: "55px",
  },
  label: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "20px",
    lineHeight: "24px",
    marginTop: "15px !important",
    marginBottom: "-5px !important",
    color: "#1E1E1E",
    [theme.breakpoints.down("sm")]: {
      fontSize: "13px",
    },
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
  const [helperText, setHelperText] = React.useState("Choose wisely");
  const [text, setText] = useState("");
  const [isTextEdited, setIsTextEdited] = useState(false);
  const [mode, setMode] = useState();
  const [status, setStatus] = useState([]);


  useEffect(() => {
    maintainanceHandler()
  }, [])
  const maintainanceHandler = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.getMaintainanceStatus,
      });
      if (res.data.responseCode === 200) {
        const result = res?.data?.result;
        setStatus(result[0].siteMaintainanceMode)
      }
    } catch (error) {
      console.log(error, "error")
    }
  };

  const handleFormSubmit = async () => {
    try {
      const data = mode === "ENABLE" ? { siteMaintainanceMode: mode, maintainanceModeText: text } : mode === "DISABLE" ? { siteMaintainanceMode: mode } : null;
  
      if (!data) {
        // Handle the case when the data is null (neither ENABLE nor DISABLE)
        return;
      }
  
      const res = await Axios({
        method: "PUT",
        url: ApiConfig.maintainanceMode,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data,
      });
  
      if (res.data.responseCode === 200) {
        toast.success("Mode set Successfully");
        setText("");
      }
    } catch (error) {
      // Handle error
    }
  };

  // Validation schema
  const validationSchema = yup.object().shape({
    maintenanceModeText: yup
      .string()
      .max(16, "Text can have at most 16 characters")
      // .required("Maintenance mode text is required"),
  });



  return (
    <Page title={"Dashboard"}>
      <Box className={classes.bannerbox}>
        <Box className={classes.mainbox}>
          <Grid container className="d-flex justify-space-between">
            <Typography variant="h4">Website Settings</Typography>
          </Grid>

          <Formik
            validationSchema={validationSchema}
            initialValues={{
              maintenanceModeText: "",
            }}
            onSubmit={handleFormSubmit}
          >
            {({
              errors,
              handleBlur,
              handleSubmit,
              touched,
              values,
              setFieldValue,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Box>
                  <Grid xs={12} className={classes.outerGrid}>
                    <Grid>
                      <Grid>
                        <label className={classes.label}>
                          Site Maintenance Mode
                        </label>
                        <RadioGroup
                          name="quiz"
                          row
                          aria-label="position"
                          onChange={(e) => setMode(e.target.value)}
                        >
                          <FormControlLabel
                            value="ENABLE"
                            control={<Radio />}
                            label="Enable"
                          />
                          <FormControlLabel
                            value="DISABLE"
                            control={<Radio />}
                            label="Disable"
                          />
                        </RadioGroup>

                      </Grid>
                      {status === "DISABLE" && mode === "ENABLE" && (
                        <>
                          <FormHelperText>{helperText}</FormHelperText>
                          <Grid>
                            <label className={classes.label}>
                              Maintenance mode Text
                            </label>
                            <TextField
                              placeholder="Enter text..."
                              type="text"
                              variant="outlined"
                              fullWidth
                              inputProps={{ minLength: 8, maxLength: 256 }}
                              id="maintenanceModeText"
                              size="small"
                              name="maintenanceModeText"
                              className={`${classes.search} textFeilds`}
                              error={Boolean(
                                touched.maintenanceModeText &&
                                errors.maintenanceModeText
                              )}
                              onChange={(e) => { setFieldValue("maintenanceModeText", e.target.value); setText(e.target.value) }
                              }
                              helperText={
                                touched.maintenanceModeText &&
                                errors.maintenanceModeText
                              }
                              InputProps={{
                                className: classes.TextBox,
                              }}
                            />
                          </Grid>
                        </>
                      )}

                    </Grid>

                    <Grid xs={12} align="center">
                      <Grid xs={3}>
                        <Button
                          className={classes.buttonbox}
                          type="submit"
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
