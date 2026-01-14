import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Grid,
  Button,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  makeStyles,
} from "@material-ui/core";
import moment from "moment";
import Axios from "axios";
import ApiConfig from "src/config/APICongig";
import DataNotFoundIMG from "src/component/DataNotFoundIMG";
import Page from "src/component/Page";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityRoundedIcon from "@material-ui/icons/VisibilityRounded";

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

  headbox: {
    borderRadius: "20px",
    [theme.breakpoints.down("sm")]: {
      padding: "20px 7px 53px 7px",
      borderRadius: "16px",
    },
    "& h4": {
      color: "#0C576C",
      fontSize: "36px",
      fontStyle: "normal",
      fontFamily: "Poppins",
      fontWeight: "700",
      lineHeight: "54px",
    },
  },

  tableButton: {
    border: "none",
    background: "#0C576C  ",
    borderRadius: "10px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "700 !important",
    fontSize: "14px",
    lineHeight: "21px",
    border: "none",
    height: "43px",
    /* identical to box height */

    color: "#FFFFFF",
  },
  headCell: {
    //background: "transparent",
    background: "#0C576C",
  },
  DialogBox: {
    color: "black",
    width: "400px",
    padding: "2rem",
    textAlign: "center",
    fontSize: "24px",
    "& h2": {
      color: "#0C576C",
      marginTop: "0px",
    },
    "& input": {
      width: "100%",
      marginBottom: "10px",
    },
  },
  CloseButton: {
    background: "#0C576C",
    marginTop: "20px",
  },
  IconcSS:{
    display:'flex',
    gap:'20px',
    justifyContent: 'center'
  }
}));

export default function (props) {
  const classes = useStyles();
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);


  const GetAllStaticData = async () => {
    setIsLoading(true);
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.staticContentList,
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

  const Icons = (staticType, staticId, title) => {
    const type = staticType;
    const id = staticId;
    const Title = title;
    const today = moment();

    return (
      <Grid container style={{ alignItems: "center" }}>
      <Grid item xs={12}>
           <Box className={classes.IconcSS}>
         
          <Link
            to={{
              pathname: "/view-static-content",
              type,
            }}
          >
            <VisibilityRoundedIcon />
          </Link>

          <Link
            to={{
              pathname: "/edit-static-content",
              type,
              // id,
              // Title
            }}
          >
            <EditIcon />
          </Link>

        </Box>
      </Grid>
     
      </Grid>
    );
  };

  useEffect(() => {
    GetAllStaticData();
  }, []);

  return (
    <Page title={"Dashboard"}>
      <Box className={classes.bannerbox}>
        <Box className={classes.mainbox}>
          <Grid spacing={2}>
            <Grid xs={12}>
              <Typography variant="h4">Static Content Management</Typography>
            </Grid>
          </Grid>

          <Box mt={2} width="100%">
            {isLoading ? (
              <ButtonCircularProgress />
            ) : (
              <>
                <TableContainer className="TableContainerBox">
                  <Table
                    aria-label="simple table"
                    style={{ minWidth: "400px" }}
                  >
                    <TableHead
                      style={{
                        minWidth: "400px",
                        background:
                          "linear-gradient(180deg, #FFFFFF 0%, #F4F4F4 100%)",
                        borderBottom: "1.02122pxsolid #000000",
                      }}
                    >
                      <TableRow>
                        <TableCell
                          align="center"
                          style={{ borderBottom: "1.02122px solid #000000" }}
                          className={classes.headCell}
                        >
                          Sr. No.
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ borderBottom: "1.02122px solid #000000" }}
                          className={classes.headCell}
                        >
                          Title
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ borderBottom: "1.02122px solid #000000" }}
                          className={classes.headCell}
                        >
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody style={{ background: "#ffffff" }}>
                      {historyData &&
                        historyData.map((values, index) => {
                          return (
                            <TableRow>
                              <TableCell align="center">
                                {" "}
                                {(page - 1) * 10 + index + 1}
                              </TableCell>

                              <TableCell align="center">
                                {values.title && values.title.slice(0,25)} 
                              </TableCell>

                              <TableCell align="center">
                                <Icons staticType={values.type} staticId={values._id} title={values.title} />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>

                {(historyData &&
                  historyData.length === 0 &&
                  historyData.length === undefined) ||
                  historyData.length === null ||
                  (historyData.length === 0 && <DataNotFoundIMG />)}
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Page>
  );
}
