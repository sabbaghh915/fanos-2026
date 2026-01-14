import { Typography, Box, Grid, TextField, Button, Select, MenuItem, InputLabel } from "@material-ui/core";
import React, { useContext, useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import { DropzoneArea } from "material-ui-dropzone";
import FormControl from "@material-ui/core/FormControl";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ApiConfig from "src/config/APICongig";
import Axios from "axios";
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
    "& h5": {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "18px",
      lineHeight: "54px",
      color: "#000000",
    },
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

  TextBox: {
    borderRadius: "10px",
    background: theme.palette.background.taf,
    height: "55px",
  },
  label: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "16px",
    lineHeight: "24px",
    marginTop: "15px !important",
    marginBottom: "-5px !important",
    color: "#1E1E1E",
    [theme.breakpoints.down("sm")]: {
      fontSize: "13px",
    },
  },
  redText: {
    color: "#FF0000",
    marginLeft: "-4px",
  },

  tableButton: {
    border: "none",
    background: "#0C576C ",
    borderRadius: "10px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "700 !important",
    fontSize: "14px",
    lineHeight: "21px",
    border: "none",
    height: "36px",
    /* identical to box height */
    maxWidth: "230px",
    color: "#FFFFFF",
  },
  TextBox: {
    borderRadius: "10px",
    border: "1px solid #413b3b",
    // background: theme.palette.background.taf,
    height: "55px",
  },
  colorbox: {
    // color: "#1D2D3F",
    color: theme.palette.text.primary,
    height: "auto",
    "& .MuiDropzoneArea-root": {
      width: "100% !important",
      maxWidth: "174px !important",
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
      width: "100%",
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
    "& .MuiDropzoneArea-root": {
      backgroundColor: "lightgray",
      height: "160px",
      width: "160px",
      // borderRadius: "50%",
      width: "100%",
      maxWidth: "80%",
    },
    "& .MuiDropzonePreviewList-imageContainer": {
      textAlign: "left",
    },
  },
  dropZoneArea: {
    "& .MuiGrid-container": {
      display: "block !important"
    },
    "& .MuiGrid-grid-xs-4": {
      maxWidth: "100%"
    },
    "& .MuiDropzoneArea-textContainer": {
      display: "none"
    },
    "& .MuiDropzonePreviewList-image": {
      height: "100%",
      maxHeight:'300px'
    },
    "& .MuiDropzonePreviewList-removeButton": {
      display: "block"
    },
    "& .MuiDropzonePreviewList-removeButton": {
      top: "31px",
      right: "35px",
      width: "40px",
      height: "40px",
      opacity: 0,
      position: "absolute",
      transition: ".5s ease",
    },
    "& .MuiTypography-h5": {
      fontSize: "14px !important",
      color: "#000 !important"
    }
  },
}));
function AddSubCategory(props) {
  const classes = useStyles();
  const history = useHistory()
  const [isLoading, setIsLoading] = useState("");
  const [historyData, setHistoryData] = useState("");
  const [subctgryName, setsubctgryName] = useState();
  const [id, setid] = useState("");
  const [profileImage, setProfileImage] = useState()
  const [profileImage64, setProfileImage64] = useState("");
  const [subcategoryData, setSubcategoryData] = useState([]);
  const [subCategoryList, setsubCategoryList] = useState("");

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
  const handleDeleteSecond = () => {
    setProfileImage64("");
  };

  const handleImageSelect = (event) => {
    console.log("eventData", event[0])
    const file = event[0];
    setProfileImage(file);
  };

  const getSubcategoryID = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.categoryList,
        params: {
          type: "PRODUCT"
        },
      })
      if (res.data.responseCode === 200) {
        setSubcategoryData(res?.data?.result?.docs);
      }
    }
    catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getSubcategoryID();
  }, [])

  const addSubCateghandle = async () => {
    setIsLoading(false);
    try {
        setIsLoading(true);
      const res = await Axios({
        method: "POST",
        url: ApiConfig.addSubCategory,
        headers: {
          token: window.localStorage.getItem("token"),
        }, 
        data: {
          subCategoryName: subctgryName,
          subCategoryImage: profileImage64,
          categoryId: id,
        }
      });

      if (res.data.responseCode === 200) {
        setIsLoading(false);
        toast.success("Sub Category has been added");
        setHistoryData(res);
        history.push('/sub-category-management');
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    addSubCateghandle();
  }, []);

  return (
    <Page>
      <Box className={classes.bannerbox}>
        <Box className={classes.mainbox}>
          <Grid container className="d-flex justify-space-between">
            <Typography variant="h4">Add Sub Category</Typography>
          </Grid>

          <Box mt={2}>
            <div
              className={
                profileImage64 === "" ? "" : classes.dropZoneArea
              }
            >
              <DropzoneArea
                maxFileSize="40000000"
                filesLimit="1"
                acceptedFiles={["image/*"]}
                files={profileImage64}
                onDrop={(files) =>
                  getBase64(files[0], (result) => {
                    setProfileImage64(result);
                  })
                }
                onDelete={handleDeleteSecond}
              />

            </div>
            <Box>
              <label className={classes.label}>
                Category  <span className={classes.redText}>*</span>
              </label>
              <FormControl
                variant="outlined"
                fullWidth
                className={classes.forminput}
              >
                <Select
                  margin="dense"
                  name="token"
                  style={{ height: '55px', border: "1px solid #413b3b" }}
                  onChange={(e) => setsubCategoryList(e.target.value)}
                  displayEmpty
                  value={subCategoryList}
                >
                  <MenuItem value="" disabled>Select Category</MenuItem>
                  {subcategoryData.map((item) => (
                    <MenuItem
                      key={item._id}
                      onClick={() => {
                        setid(item._id);
                      }}
                      value={item.categoryName}
                    >
                      {item.categoryName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* </FormControl> */}
            </Box>
            <Box>
              <label className={classes.label}>
                Sub Category Name <span className={classes.redText}>*</span>
              </label>
              <TextField
                placeholder="Sub Category Name"
                type="text"
                variant="outlined"
                fullWidth
                id="role"
                size="small"
                inputProps={{ maxLength: 25 }}
                //   value={values.email}
                className="textFeilds"
                onChange={(e) => {
                  setsubctgryName(e.target.value)
                }}
                InputProps={{
                  className: classes.TextBox,
                }}
              />
            </Box>
            <Box mt={4}>
              <Grid container spacing={2} style={{ alignItems: "center" }}>
                <Grid item sm={6} xs={12} align="center">
                  <Button
                    variant="contained"
                    fullWidth
                    className={classes.tableButton}
                    onClick={addSubCateghandle}

                  >
                    Save
                  </Button>
                </Grid>
                <Grid item sm={6} xs={12} align="center">
                  <Button
                    variant="contained"
                    fullWidth
                    style={{ background: "red" }}
                    className={classes.tableButton}
                    onClick={() => history.push('/sub-category-management')}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </Page>
  );
}
export default AddSubCategory;