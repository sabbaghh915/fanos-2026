import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";


export const UserContext = createContext();

 
 

export default function AuthProvider(props) {
  let params = new URLSearchParams(document.location.search);
  let name = params.get("name");
  const [listProduct, setListProduct] = useState([]);
  const [searchText, setSearchText] = useState(name);
  const [filteredData, setFilteredData] = useState([]);
  const [subCatagName, setSubCatagName] = useState("");
  const [catagName, setCatagName] = useState("");
  useEffect(()=>{
 
    if(name === null){

      setFilteredData("")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[name])



  const getListProduct = async (limit, search, subRenderId) => {


    const formData = new FormData()
    formData.append("limit", limit)
    formData.append("search", search)
    formData.append("categoryId", subRenderId)


    try {
      const res = await axios({
        method: "POST",
        url: ApiConfig.listProduct,
        data: formData
      });

      if (res.data.responseCode === 200) {
        setListProduct(res.data.result);
      } else {
   
      }
    } catch (error) {

    }
  };


  const [searchProduct, setSearchProduct] = useState([]);
  const getSearchProduct = async (limit, search, location) => {
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.serchProduct,
        params: {
          search: search,
          limit: limit,
          location: location,
        }
      });

      setSearchProduct(res)
      return res;
    } catch (error) {
   
      setFilteredData([])
      setSearchProduct(error)
      return error;
    }
  };
  useEffect(() => {
    getListProduct(10);

  }, []);

  let data = {
    getListProduct: (limit, search, subRenderId) => getListProduct(limit, search, subRenderId),
    listProduct,
    getSearchProduct: (limit, search, location) => getSearchProduct(limit, search, location),
    searchProduct,
    searchText,
    setSearchText,
    setFilteredData,
    filteredData,
    setCatagName,
    setSubCatagName,
    subCatagName,
    catagName
  };

  return (
    <>
      <UserContext.Provider value={data}>{props.children}</UserContext.Provider>

    </>
  );
}
