import React, { useState, useRef, useEffect, useContext } from "react";
import Axios from "axios";
import ApiConfig from "src/config/APICongig";
import {
  Typography,
  Box,
  Button,
  makeStyles,
  FormControl,
  InputBase,
  withStyles,
  NativeSelect,
  Select,
  MenuItem,
} from "@material-ui/core";
import moment from "moment";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const itemAdded = [
  {
    name: "Monday",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Tuesday",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Wednesday",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Thrusday",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Friday",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Saturday",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Sunday",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },

  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);
const useStyles = makeStyles((theme) => ({
  contentDiv: {
    paddingTop: "26px",
  },
  heading: {
    color: "#000000",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: "22px",
    marginTop: "26px",
  },
  graphDiv: {
    width: "100%",
    height: "410px",
    border: "2px solid #0C576C",
    borderRadius: "10px",
    marginTop: "6px",
    padding: "30px 0px 30px 0",
  },
  filterDiv: {
    display: "flex",
    justifyContent: "space-between",
  },

  formControl: {
    background: "#fff",
    width: "100%",
    maxWidth: "219px",
    marginBottom: '10px',
    "& .MuiInputBase-root ": {
      border: "0.591018px solid #FFFFFF",
      height: "45px",
      borderRadius: "4px",
      width: "100%",
      borderRadius: "10px",
    },
    "& .MuiSelect-select.MuiSelect-select": {
      padding: "13.5px 14px !important",
      color: "#606266",
      fontFamily: "Poppins",
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "40px",
      border: "1px solid rgb(117, 117, 117, 0.5)",
      borderRadius: "10px"
    },
    "& .MuiFormControl-root": {
      color: "#000",
    },
    "& .MuiSelect-icon": {
      color: "#0C576C",
    },
  },
}));

export default function AnalyticsGraphs() {
  const classes = useStyles();
  const [usertype, setusertype] = useState("Weekly");
  const [itemsAdded, setItemAdded] = useState([]);
  const [itemsoptions, setItemsOptions] = useState("Weekly");
  const [userchartdata, setUserChartData] = useState([]);
  const [result, setResult] = useState([]);
  const [userChartResults, setUserChartResults] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleOpen1 = () => {
    setOpen1(true);
  };
  const handleChange = (event) => {
    setusertype(event.target.value);
  };

  const handleChangeItems = (event) => {
    setItemsOptions(event.target.value);
  };

  const getUserLogChart = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.getUserLogChart,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          type: usertype,
        },
      });
      if (res.data.responseCode === 200) {
        const resultData = res.data.result;
        const userArray = [];
        if (usertype === "Weekly") {
          const userArray = resultData.map((item) => ({
            userCount: item.data[0]?.userCount || 0,
            x: moment(item.data[0]?.date).format('ll'),
          }));
          setUserChartData(userArray);
        }
        else if (usertype == "Monthly") {
          const userresult = res?.data?.result;
          userresult.forEach((item) =>
            userArray.push({
              userCount: item.userCount,
              x: item.month
            })
          );
          setUserChartData(userArray);
        } 
        else if (usertype == "Yearly") {
          const userresult = res?.data?.result;
          userresult.forEach((item) =>
            userArray.push({
              userCount: item.userCount,
              x: item.year
            })
          );
          setUserChartData(userArray);
        } else {
          setUserChartData(res?.data?.result);
        }
      }
    } catch (error) {
      console.log(error);
    }             
  };

  const getItemAddedChart = async () => {
    //ITEM ADDED CHART ---------------------------------
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.getItemAddedChart,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          type: itemsoptions,
        },
      });
      if (res.data.responseCode === 200) {
        const resultData = res.data.result;
        const itemsArray = [];
        if (itemsoptions === "Weekly") {
          const itemsArray = resultData.map((item) => ({
            countProduct: item.data[0]?.countProduct || 0,
            x: moment(item.data[0]?.date).format('ll'),
          }));
          setItemAdded(itemsArray);
        }
        else if (itemsoptions == "Monthly") {
          const result = res?.data?.result;
          result.forEach((item) =>
            itemsArray.push({
              countProduct: item.countProduct,
              x: item.Month,
            })
          );
          setItemAdded(itemsArray);
        }
        else if (itemsoptions == "Yearly") {
          const result = res?.data?.result;
          result.forEach((item) =>
            itemsArray.push({
              countProduct: item.countProduct,
              x: item.Year,
            })
          );
          setItemAdded(itemsArray);
        }
        else {
          setItemAdded(res?.data?.result);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItemAddedChart();
  }, [itemsoptions]);

  useEffect(() => {
    getUserLogChart();
  }, [usertype]);
  return (
    <Box mt={2} className={classes.root}>
      {/* Item added graph */}
      <Box className={classes.contentDiv}>
        {" "}
        <div className={classes.filterDiv}>
          {" "}
          <Typography className={classes.heading}>Items Added</Typography>

          <FormControl className={classes.formControl}>
            <Select
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={itemsoptions}
              onChange={(event) => {
                handleChangeItems(event);
              }}
            >
              <MenuItem value="Weekly">Weekly</MenuItem>
              <MenuItem value="Monthly">Monthly</MenuItem>
              <MenuItem value="Yearly">Yearly</MenuItem>
            </Select>
          </FormControl>

        </div>
        <div className={classes.graphDiv}>
          <ResponsiveContainer>
            <AreaChart
              data={itemsAdded}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="countProduct"
                stroke="#367d91"
                fill="#367d91"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Box>
      <Box className={classes.contentDiv}>
        {" "}
        <div className={classes.filterDiv}>
          {" "}
          <Typography className={classes.heading}>User Log</Typography>
          <FormControl className={classes.formControl}>
            <Select
              open={open1}
              onClose={handleClose1}
              onOpen={handleOpen1}
              value={usertype}
              onChange={(event) => {
                handleChange(event);
              }}
            >
              <MenuItem value="Weekly">Weekly</MenuItem>
              <MenuItem value="Monthly">Monthly</MenuItem>
              <MenuItem value="Yearly">Yearly</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.graphDiv}>
          <ResponsiveContainer>
            <AreaChart
              data={userchartdata}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="userCount"
                stroke="#367d91"
                fill="#367d91"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Box>
    </Box>
  );
}
