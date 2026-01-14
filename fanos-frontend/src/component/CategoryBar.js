import React, { useState, useEffect } from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import ApiConfig from "src/config/APIConfig";
import { UserContext } from "src/context/User";
import {
  Category as CategoryIcon,
  ShoppingCart as ShoppingBagIcon,
  Home as HomeIcon,
  Phone as PhoneIcon,
  Computer as ComputerIcon,
  SportsEsports as SportsIcon,
  Restaurant as RestaurantIcon,
  LocalOffer as OfferIcon,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  categoryBar: {
    width: "100%",
    background: "#8B5CF6",
    padding: "20px 45px",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    display: "block",
    flexShrink: 0,
    [theme.breakpoints.down("md")]: {
      padding: "15px 20px",
    },
  },
  categoryBarContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
    gap: "15px",
    alignItems: "stretch",
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
      gap: "12px",
    },
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
      gap: "10px",
    },
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "8px",
    },
  },
  categoryItem: {
    position: "relative",
    cursor: "pointer",
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    padding: "15px 10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all 0.3s ease",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    minHeight: "100px",
    "&:hover": {
      background: "rgba(255, 255, 255, 0.2)",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "12px 8px",
      minHeight: "85px",
      gap: "6px",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "10px 5px",
      minHeight: "75px",
      gap: "5px",
    },
  },
  categoryIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    background: "rgba(255, 255, 255, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    color: "#fff",
    [theme.breakpoints.down("sm")]: {
      width: "35px",
      height: "35px",
      fontSize: "20px",
    },
    [theme.breakpoints.down("xs")]: {
      width: "30px",
      height: "30px",
      fontSize: "18px",
    },
  },
  categoryItemText: {
    color: "#fff",
    fontSize: "13px",
    fontWeight: "500",
    fontFamily: "Poppins",
    textAlign: "center",
    lineHeight: "1.3",
    wordBreak: "break-word",
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "11px",
    },
  },
  subCategoryDropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    background: "#fff",
    minWidth: "200px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "4px",
    padding: "8px 0",
    zIndex: 1000,
    marginTop: "5px",
  },
  subCategoryItem: {
    color: "#242424",
    fontSize: "14px",
    fontWeight: "400",
    fontFamily: "Poppins",
    padding: "8px 15px",
    cursor: "pointer",
    transition: "background-color 0.2s",
    "&:hover": {
      background: "#f5f5f5",
    },
  },
}));

const CategoryBar = () => {
  const classes = useStyles();
  const history = useHistory();
  const user = React.useContext(UserContext);
  const [allList, setAllList] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);

  useEffect(() => {
    getAllCategory();
  }, []);

  const getAllCategory = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.listAllCategory,
      });

      if (res.data.responseCode === 200) {
        setAllList(res.data.result);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // دالة للحصول على الأيقونة المناسبة حسب اسم الكاتجوري
  const getCategoryIcon = (categoryName) => {
    const name = categoryName?.toLowerCase() || "";
    if (name.includes("phone") || name.includes("mobile") || name.includes("جوال")) {
      return <PhoneIcon style={{ fontSize: "28px" }} />;
    } else if (name.includes("computer") || name.includes("laptop") || name.includes("حاسوب")) {
      return <ComputerIcon style={{ fontSize: "28px" }} />;
    } else if (name.includes("sport") || name.includes("رياضة")) {
      return <SportsIcon style={{ fontSize: "28px" }} />;
    } else if (name.includes("food") || name.includes("restaurant") || name.includes("طعام")) {
      return <RestaurantIcon style={{ fontSize: "28px" }} />;
    } else if (name.includes("home") || name.includes("منزل")) {
      return <HomeIcon style={{ fontSize: "28px" }} />;
    } else if (name.includes("shopping") || name.includes("تسوق")) {
      return <ShoppingBagIcon style={{ fontSize: "28px" }} />;
    } else if (name.includes("offer") || name.includes("عرض")) {
      return <OfferIcon style={{ fontSize: "28px" }} />;
    } else {
      return <CategoryIcon style={{ fontSize: "28px" }} />;
    }
  };

  return (
    <Box className={classes.categoryBar}>
      <Box className={classes.categoryBarContainer}>
        {allList?.map((item, index) => {
          return (
            <Box
              key={index}
              className={classes.categoryItem}
              onClick={() => {
                user.setCatagName(item?.categoryName);
                history.push({
                  pathname: "/productCategory",
                  state: {
                    categoryName: item?.categoryName,
                  },
                });
              }}
              onMouseEnter={() => {
                setOpenCategory(index);
              }}
              onMouseLeave={() => {
                setOpenCategory(null);
              }}
            >
              <Box className={classes.categoryIcon}>
                {item?.categoryIcon ? (
                  <img 
                    src={item.categoryIcon} 
                    alt={item.categoryName}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                ) : (
                  getCategoryIcon(item?.categoryName)
                )}
              </Box>
              <Typography className={classes.categoryItemText}>
                {item.categoryName}
              </Typography>
              {openCategory === index && item?.subcategories && item?.subcategories.length > 0 && (
                <Box className={classes.subCategoryDropdown}>
                  {item?.subcategories?.map((value, subIndex) => (
                    <Typography
                      key={subIndex}
                      className={classes.subCategoryItem}
                      onClick={(e) => {
                        e.stopPropagation();
                        history.push({
                          pathname: "/productCategory",
                          state: {
                            subcatid: value?.subCategoryName,
                            categoryName: item?.categoryName,
                          },
                        });
                        user.setSubCatagName(value?.subCategoryName);
                        setOpenCategory(null);
                      }}
                    >
                      {value?.subCategoryName}
                    </Typography>
                  ))}
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default CategoryBar;
