import {
  Typography,
  Box,
  Grid,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import SubCategory from "src/component/subCategory.js";
import SubCategoryColumn from "src/component/subCategoryColumn";
import { UserContext } from "src/context/User";
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
    paddingTop: "21px",
    paddingBottom: "95px",
  },
  bookDiv: {
    background: "#BF9C76",
    height: "348px",
    paddingLeft: "47px",
    paddingRight: "47px",
  },
  bannerImage: {
    height: "348px",
  },
  buyTicket: {
    background: "transparent",
    border: "1px solid #853600",
    borderRadius: "5px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "18px",
    lineHeight: "49px",
    color: "#843300",
  },
  mainHeading: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "64px",
    lineHeight: "68px",
    color: "#76452C",
    paddingTop: "36px",
  },
  subHeading: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "18px",
    lineHeight: "70px",
    color: "#FFFFFF",
  },
  search: {
    fontSize: "20px",
    color: "#000",
  },
  searchResults: {
    color: "#000",
    fontSize: "17px",
    paddingLeft: "10px",
    fontWeight: "400",
  },
  flexGrid: {
    alignItems: "center",
  },
  filterName: {
    color: "#0C576C",
    fontFamily: "Poppins",
    fontSize: "16px",
    fontWeight: 500,
  },

  viewMoreBox: {
    padding: "20px 20px",
    textAlign: "end",
  },
  viewMoreItem: {
    color: "#fff",
    width: "100%",
    border: "none",
    cursor: "pointer",
    height: "42px",
    fontSize: "14px",

    maxWidth: "105px",
    background: "#D39B2D",
    fontStyle: "normal",
    fontFamily: "Poppins",
    fontWeight: "500",
    lineHeight: "14px",
    borderRadius: "5px",
  },

  dropdownArrow: {
    pointerEvents: "none",
    position: "relative",
    right: "20px",
  },

  filterAndIconContainer: {
    display: "flex",
    justifyContent: "end",
    cursor: "pointer",
    gap: "20px",
  },

  filterContainer: {
    width: "100%",
    maxWidth: "400px",
  },

  filterMain: {
    width: "100%",
    background: "#F7F8F9",
    height: "50px",
    borderRadius: "8px",

    "& .MuiSelect-select.MuiSelect-select": {
      padding: "0 18px !important",
      color: "#707070 !important",
      fontSize: "15px",
      fontWeight: "400 !important",
    },

    "& .MuiSelect-select:focus": {
      backgroundColor: "#F7F8F9 !important",
    },
  },

  defaultOption: {
    color: "#707070",
    fontSize: "15px",
    fontWeight: "400 !important",
  },

  selectOption: {
    color: "#0C576C",
    fontSize: "15px",
    fontWeight: "400 !important",
  },
  filterImagAndTxt: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
  },

  filterTextTop: {
    color: "#0C576C",
    fontSize: "16px",
    fontWeight: "500 !important",
  },
}));
export default function (props) {
  const classes = useStyles();
  const user = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [sortStatus, setSortStatus] = useState("");
  const [searchProdLimit, setSearchProdLimit] = useState(10);
  const [allProdTotal, setAllProdTotal] = useState(10);
  const [pages, setPages] = useState(1);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    user.getListProduct(10, "", user.subCatagName);
  }, [user.subCatagName]);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleSortDateChange = (event) => {
    setSortStatus(event.target.value);
  };

  const handleFilterClick = () => {
    setShowFilter(true);
  };

  const productSearchSort = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await Axios({
        method: "POST",
        url: ApiConfig.searchSort,
        headers: {
          token: token,
        },
        params: {
          priceStatus: sortStatus ? sortStatus : null,
          subCategoryName: props?.location?.state?.subcatid
            ? props?.location?.state?.subcatid
            : user.subCatagName,
          categoryName: props?.location?.state?.categoryName
            ? props?.location?.state?.categoryName
            : user.catagName,
          dateStatus: sortStatus ? sortStatus : null,
          limit: searchProdLimit,
        },
      });

      if (res.data.responseCode === 200) {
        setProducts(res?.data?.result?.data);
        setSearchProdLimit(res?.data?.result?.perPage);
        setAllProdTotal(res?.data?.result?.totalCount);
        setPages(res?.data?.result?.totalPages);
      }
    } catch (error) {}
  };

  useEffect(() => {
    productSearchSort();
  }, [
    sortOption,
    sortStatus,
    props?.location?.state?.subcatid
      ? props?.location?.state?.subcatid
      : user.subCatagName,
    props?.location?.state?.categoryName
      ? props?.location?.state?.categoryName
      : user.catagName,
  ]);

  return (
    <Page title={"product"}>
      <Box className={classes.mainbox}>
        {products?.length > 0 && (
          <Box className={classes.filterAndIconContainer}>
            {showFilter ? (
              <div className={classes.filterContainer}>
                <Typography className={classes.filterName}>Filter</Typography>
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  defaultValue="default"
                  value={sortStatus || "default"}
                  onChange={handleSortDateChange}
                  IconComponent={() => (
                    <img
                      src="images/dropdownArrow.svg"
                      alt="arrow"
                      className={classes.dropdownArrow}
                    />
                  )}
                  className={classes.filterMain}
                >
                  <MenuItem
                    value="default"
                    className={classes.defaultOption}
                    disabled
                  >
                    Select Option
                  </MenuItem>
                  <MenuItem value="newest" className={classes.selectOption}>
                    Date Added : Newest
                  </MenuItem>
                  <MenuItem value="oldest" className={classes.selectOption}>
                    Date Added : Oldest
                  </MenuItem>
                </Select>
              </div>
            ) : (
              <div className={classes.filterImagAndTxt}>
                <img
                  src="images/filterImage.svg"
                  alt="filter img"
                  onClick={handleFilterClick}
                />
                <Typography className={classes.filterTextTop}>
                  Filter
                </Typography>
              </div>
            )}

            {show == true ? (
              <img
                alt="img"
                src="images/newColumn.svg"
                onClick={() => setShow(!show)}
              />
            ) : (
              <img
                alt="img"
                src="images/grid.svg"
                onClick={() => setShow(!show)}
              />
            )}
          </Box>
        )}
        <Box>
          <Grid container>
            <Grid item lg={2} md={12} sm={12} xs={12}>
              {/* <div>
                <Typography className={classes.filterName}>
                  Filter By Price:
                </Typography>
              </div>

              <FormControl>
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  value={sortOption}
                  onChange={handleSortChange}
                  style={{
                    width: "100%",
                    maxWidth: "150px",
                    background: "#D9D9D9",
                    borderRadius: "4px",
                  }}
                  className={classes.selectOption}
                >
                  <MenuItem value="" className={classes.selectOption}>
                    Category
                  </MenuItem>
                  <MenuItem value="lowtohigh" className={classes.selectOption}>
                    Price : Low to High
                  </MenuItem>
                  <MenuItem value="hightolow" className={classes.selectOption}>
                    High to Low
                  </MenuItem>
                </Select>
              </FormControl> */}
              {/* <div>
                <Typography className={classes.filterName}>
                  Filter By Time:
                </Typography>
              </div>

              <FormControl>
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  value={sortStatus}
                  onChange={handleSortDateChange}
                  style={{
                    width: "100%",
                    maxWidth: "150px",

                    background: "#D9D9D9",
                    borderRadius: "4px",
                  }}
                  className={classes.selectOption}
                >
                  <MenuItem value="" className={classes.selectOption}>
                    Category
                  </MenuItem>
                  <MenuItem value="newest" className={classes.selectOption}>
                    Date Added : Newest
                  </MenuItem>
                  <MenuItem value="oldest" className={classes.selectOption}>
                    Date Added : Oldest
                  </MenuItem>
                </Select>
              </FormControl> */}
            </Grid>

            <Grid item lg={12} sm={12} xs={12}>
              {show == true ? (
                <SubCategoryColumn productSearchSort={products} />
              ) : (
                <SubCategory productSearchSort={products} />
              )}
            </Grid>
          </Grid>
        </Box>

        {products?.length === 0 ? null : allProdTotal > searchProdLimit ? (
          pages > 1 ? (
            <>
              <Box className={classes.viewMoreBox}>
                <button
                  className={classes.viewMoreItem}
                  onClick={() => {
                    setSearchProdLimit(searchProdLimit + 10);
                  }}
                >
                  View More
                </button>
              </Box>
            </>
          ) : null
        ) : null}
      </Box>
    </Page>
  );
}
