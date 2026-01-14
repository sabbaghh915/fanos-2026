import { Typography, Box, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import { Link, useHistory, useLocation } from "react-router-dom";
import { url } from "../../../config/APICongig";
import Axios from "axios";
import ApiConfig from "src/config/APICongig";
import {Button} from "@material-ui/core";

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
    borderRadius: "10px",
    padding: "1rem",
    marginTop: "1rem"
  },
  TitleText: {
    fontSize: "26px",
  },
  DescriptionText: {
    paddingTop: "26px",
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
    width: "30%",
    height: "50px",
    marginTop: "24px",
},
}));


export default function (props) {
  const classes = useStyles();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const history = useHistory();

  const GetStaticDataByType = async (type) => {
    setIsLoading(true);
    console.log(type, "type");
    try {
      const res = await Axios({
        method: "GET",
        url: `${url}/static/viewStaticContent/${type}`,
      });
      if (res.data.responseCode === 200) {
        setHistoryData(res?.data?.result);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const type = props.location.type.staticType;
    GetStaticDataByType(type);

  }, []);

  return (
    <Page title={"Dashboard"}>
      <Box className={classes.bannerbox}>
        <Box className={classes.mainbox}>
          <Grid container className="d-flex justify-space-between">
            <Typography variant="h4">View content</Typography>
          </Grid>

          <Box>
            <Grid className={classes.outerGrid}>
              <Grid className={classes.TitleText} style={{ wordWrap: 'break-word' }} >
                {historyData?.title}
              </Grid>
              <Grid className={classes.DescriptionText}>
                {historyData?.description}
              </Grid>
            </Grid>
            <Grid md={12} xs={12} >
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {" "}
                <Button
                  variant="contained"
                  fullWidth
                  className={classes.buttonbox}
                  onClick={() => history.push("/static-content-management")}
                >
                  BACK
                </Button>
              </div>
            </Grid>

          </Box>

        </Box>
      </Box>

    </Page>
  );
}