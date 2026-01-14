

// import React, { useState, useEffect } from "react";
// import Carousel from "react-material-ui-carousel";
// import ApiConfig from "src/config/APICongig";
// import Axios from "axios";

// import { makeStyles } from "@material-ui/core/styles";


// const useStyles = makeStyles((theme) => ({
//   carousel: {
//     position: "sticky !important",
//     paddingTop: "10px",
//     indicators: {
//       width: "100%",
//       marginTop: "10px",
//       textAlign: "center",
//     },
//     indicator: {
//       cursor: "pointer",
//       transition: "200ms",
//       padding: 0,
//       color: "#afafaf",
//       "&:hover": {
//         color: "#1f1f1f",
//       },
//       "&:active": {
//         color: "#1f1f1f",
//       },
//     },
//     indicatorIcon: {
//       fontSize: "15px",
//     },
//     // Applies to the active indicator
//     active: {
//       color: "#494949",
//     },
//   },
//   rightIcon: {
//     [theme.breakpoints.down("xs")]: {
//       height: "30px !important",
//     },
//     [theme.breakpoints.down("lg")]: {
//       height: "65px",
//     },
//     [theme.breakpoints.down("md")]: {
//       height: "50px",
//     },
//   },
//   leftIcon: {
//     [theme.breakpoints.down("xs")]: {
//       height: "30px !important",
//     },
//     [theme.breakpoints.down("lg")]: {
//       height: "65px",
//     },
//     [theme.breakpoints.down("md")]: {
//       height: "50px",
//     },
//   },
//   bannerImg: {
//     width: "100%",
//     height: "372px",
//     maxWidth: "100%",
//     [theme.breakpoints.down("xs")]: {
//       width: "100%",
//       height: "fit-content",
//     },
//   }
// }));

// export default function App() {
//   const classes = useStyles();
//   const [data, setData] = useState([]);
//   const getBannerDetails = async () => {
//     const token = localStorage.getItem("token");
//     try {
//       const res = await Axios({
//         method: "GET",
//         url: ApiConfig.getAllBanners,
//         headers: {
//           token: token,
//         },
//       });

//       if (res.data.responseCode == 200) {
//         setData(res.data.result);
//       }
//     } catch (error) {

//     }
//   };
//   useEffect(() => {
//     getBannerDetails();
//   }, []);

//   function Item(props) {
//     return (
//       <img
//         src={props.item.img}
//         alt="DashImage"
//         className={classes.bannerImg}
//         style={{}}
//       />
//     );
//   }
//   return (
//     <div>
//     <Carousel
//       className={classes.carousel}
//       animation="slide"
//       navButtonsWrapperProps={{
//         style: {
//           bottom: "0",
//           top: "unset",
//         },
//       }}
//       NextIcon={
//         <img alt="img" src="/images/right_icon.svg" className={classes.rightIcon} />
//       }
//       PrevIcon={
//         <img alt="img" src="/images/left_icon.svg" className={classes.leftIcon} />
//       }
//       IndicatorIcon={<img alt="img" src="/images/indicators.svg" />}
//       indicatorIconButtonProps={{
//         style: {
//           color: "#000",
//         },
//       }}
//       activeIndicatorIconButtonProps={{
//         style: {
//           color: "#2FF3FF",
//         },
//       }}
//       indicatorContainerProps={{
//         style: {
//           marginTop: "0px",
//           textAlign: "center",
//         },
//       }}
//     >
//       {data && data.map((item, i) => <Item key={i} item={item} />)}
//     </Carousel>
//   </div>
//   );
// }

import React, { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import ApiConfig from "src/config/APICongig";
import Axios from "axios";

import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  carousel: {
    position: "sticky !important",
    paddingTop: "10px",
    indicators: {
      width: "100%",
      marginTop: "10px",
      textAlign: "center",
    },
    "& .css-1m9128y":{
      display:'block !important',

    },
    indicator: {
      cursor: "pointer",
      transition: "200ms",
      padding: 0,
      color: "#afafaf",
      "&:hover": {
        color: "#1f1f1f",
      },
      "&:active": {
        color: "#1f1f1f",
      },
    },
    indicatorIcon: {
      fontSize: "15px",
    },
    // Applies to the active indicator
    active: {
      color: "#494949",
    },
  },
  rightIcon: {
    [theme.breakpoints.down("xs")]: {
      height: "30px !important",
    },
    [theme.breakpoints.down("lg")]: {
      height: "65px",
    },
    [theme.breakpoints.down("md")]: {
      height: "50px",
    },
  },
  leftIcon: {
    [theme.breakpoints.down("xs")]: {
      height: "30px !important",
    },
    [theme.breakpoints.down("lg")]: {
      height: "65px",
    },
    [theme.breakpoints.down("md")]: {
      height: "50px",
    },
  },
  bannerImg: {
    // width: "100%",
    // height: "372px",
    // maxWidth: "100%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      height: "fit-content",
    },
  }
}));

export default function App() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const getBannerDetails = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.getAllBanners,
        headers: {
          token: token,
        },
      });

      if (res.data.responseCode == 200) {
        setData(res.data.result);
      }
    } catch (error) {

    }
  };
  useEffect(() => {
    getBannerDetails();
  }, []);

  function Item(props) {
    return (
      <div style={{width:'100%', display:'flex', justifyContent:'center',height: "372px",}}>

        <img
          src={props.item.img}
          alt="DashImage"
          className={classes.bannerImg}
          style={{}}
        />
      </div>
    );
  }
  return (
    <div>
    <Carousel
      className={classes.carousel}
      animation="slide"
      navButtonsWrapperProps={{
        style: {
          bottom: "0",
          top: "unset",
        },
      }}
      NextIcon={
        <img alt="img" src="/images/right_icon.svg" className={classes.rightIcon} />
      }
      PrevIcon={
        <img alt="img" src="/images/left_icon.svg" className={classes.leftIcon} />
      }
      // IndicatorIcon={<img alt="img" src="/images/indicators.svg" />}
      indicatorIconButtonProps={{
        style: {
          color: "#d2cccc",
          scale:'0.7'
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          color: "#0C576C",
          scale:'1.2'
        },
      }}
      indicatorContainerProps={{
        style: {
          marginTop: "0px",
          textAlign: "center",
        },
      }}
    >
      {data && data.map((item, i) => <Item key={i} item={item} />)}
    </Carousel>
  </div>
  );
}
