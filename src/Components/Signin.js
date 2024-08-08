import React, { useEffect } from "react"; 
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from 'yup'
import { toast } from "react-toastify";
import { url } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SigninValidationSchema=yup.object({
  username: yup.string().email().required("username Field Cant Be Empty"),
  password: yup.string().required("Password Field Cant Be Empty"), 
});

export default function Signin() {
  const navigate =useNavigate()

  const{values,errors,touched,handleBlur,handleChange,handleSubmit}=useFormik({
    initialValues:{
      username:"karn.yong@melivecode.com",
      password:"melivecode"
    },
    validationSchema:SigninValidationSchema,
    onSubmit:(values)=>{ 
      signIn(values)
    }
  })
  const signIn=async (values)=>{
    try {
      let expiresIn=60000
      let {username,password}=values
      let payload={username,password,expiresIn}
      console.log("payload",payload)
      let res=await axios.post(`${url}/api/login`,payload)
      console.log(res.data.accessToken)
      localStorage.setItem("token",res.data.accessToken)
      navigate("/")
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  useEffect(()=>{
    localStorage.removeItem("token")
  },[])
  return ( 
  <div className="signin">
    <form className="signinbox" onSubmit={handleSubmit}>
      <h2 style={{textAlign:"center",paddingBottom:"5px",borderBottom:"3px solid #ffdd00",fontFamily:"poppins"}}>Sign In</h2>
      <TextField id="outlined-basic" label="username" variant="outlined" name="username" value={values.username} onChange={handleChange} error={touched.username && errors.username} onBlur={handleBlur}/>
      {touched.username && errors.username ? <p style={{color:"red"}}>*{errors.username }</p>:""}
      <TextField id="outlined-basic" label="Password" variant="outlined" name="password" value={values.password} onChange={handleChange} error={touched.password && errors.password} onBlur={handleBlur}/>
      {touched.password && errors.password ? <p style={{color:"red"}}>*{errors.password }</p>:""} 
      <Button type="submit" variant="contained" style={{backgroundColor:"#ffdd00",color:"black"}}>Login</Button>
    </form>
  </div> 
  )
}
