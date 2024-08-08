import React from "react";
import { Navbarr } from "./Navbar";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from 'yup'
import { toast } from "react-toastify";
import { url } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const locationValidationSchema=yup.object({
  name: yup.string().required("Name Field Cant Be Empty"),
  detail: yup.string().required("Detail Field Cant Be Empty"),
  coverimage: yup.string().required("CoverImage Field Cant Be Empty"),
  latitude: yup.number().required("Latitude Field Cant Be Empty"),
  longitude: yup.number().required("Longitude Field Cant Be Empty"),
});

export default function Add() {
  let token = localStorage.getItem("token") 
  const navigate=useNavigate()
  const{values,errors,touched,handleBlur,handleChange,handleSubmit}=useFormik({
    initialValues:{
      name:"",
      detail:"",
      coverimage:"",
      latitude:"",
      longitude:""
    },
    validationSchema:locationValidationSchema,
    onSubmit:(values)=>{
      console.log(values)
      addplace(values)
    }
  })
  const addplace=async (values)=>{
    let{ name, detail, coverimage, latitude, longitude}=values
    let payload={ name, detail, coverimage, latitude, longitude}
    try {
      let res=await axios.post(`${url}/api/auth/attractions/create`,payload,{
        headers:{Authorization:`Bearer ${token}`}
      })
      console.log(res)
      toast.success(res.data.message)
      navigate("/")
    } catch (error) {
      if (error.response.status > 399 || error.response.status < 500) {
        toast.error(error.response.data.message);
        navigate("/signin");
      } else {
        toast.error(error.response.data.message);
      } 
    }
  }

  // Rangsit University Rangsit University (RSU) is a private university in Pathum Thani,    Thailand, focusing mainly on music, design, 
  // Information technology, and public health including independent professions https://www.melivecode.com/attractions/rsu.png 13.9642507 100.5866942
  
  return (
    <div>
      <Navbarr />
      <div className="add bodyy container">
        <form className="addbox" onSubmit={handleSubmit}>
          <h2 style={{textAlign:"center"}}>Add A New Location</h2>
          <TextField id="outlined-basic" label="Enter The Name Of The Place" variant="outlined" name="name" value={values.name} onChange={handleChange} error={touched.name && errors.name} onBlur={handleBlur}/>
          {touched.name && errors.name ? <p style={{color:"red"}}>*{errors.name }</p>:""}
          <TextField id="outlined-basic" label="Enter The Detail Of The Place" variant="outlined" name="detail" value={values.detail} onChange={handleChange} error={touched.detail && errors.detail} onBlur={handleBlur}/>
          {touched.detail && errors.detail ? <p style={{color:"red"}}>*{errors.detail }</p>:""}
          <TextField id="outlined-basic" label="Enter The Coverimage Of The Place" variant="outlined" name="coverimage" value={values.coverimage} onChange={handleChange} error={touched.coverimage && errors.coverimage} onBlur={handleBlur}/>
          {touched.coverimage &&  errors.coverimage ? <p style={{color:"red"}}>*{errors.coverimage }</p>:""}
          <TextField id="outlined-basic" label="Enter The Latitude Of The Place" variant="outlined" name="latitude" value={values.latitude} onChange={handleChange} error={touched.latitude && errors.latitude} onBlur={handleBlur}/>
          {touched.latitude && errors.latitude ? <p style={{color:"red"}}>*{errors.latitude }</p>:""}
          <TextField id="outlined-basic" label="Enter The Longitude Of The Place" variant="outlined" name="longitude" value={values.longitude} onChange={handleChange} error={touched.longitude && errors.longitude} onBlur={handleBlur}/>
          {touched.longitude && errors.longitude ? <p style={{color:"red"}}>*{errors.longitude }</p>:""}
          <Button type="submit" variant="contained" style={{backgroundColor:"#ffdd00",color:"black"}}>Add</Button>
        </form>
      </div>
    </div>
  );
}



