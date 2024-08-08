import React, { useEffect, useState } from "react";
import { Navbarr } from "./Navbar";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { url } from "../App";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const locationValidationSchema = yup.object({
  id: yup.number().required("Id Field Cant Be Empty"),
  name: yup.string().required("Name Field Cant Be Empty"),
  detail: yup.string().required("Detail Field Cant Be Empty"),
  coverimage: yup.string().required("CoverImage Field Cant Be Empty"),
  latitude: yup.number().required("Latitude Field Cant Be Empty"),
  longitude: yup.number().required("Longitude Field Cant Be Empty"),
});

export function Updated() {
  let [data, setData] = useState(null);
  const { idx } = useParams();
  const navigate = useNavigate();

  const getdata = async () => {
    try {
      let res = await axios.get(`${url}/api/attractions/${idx}`);
      console.log(res.data.attraction);
      setData(res.data.attraction);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div>
      <Navbarr />
      {data ? <Update data={data} /> : ""}
    </div>
  );
}

export default function Update(data) {
  const { id } = useParams();
  const navigate = useNavigate();
  let token=localStorage.getItem("token") 
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        id: data.data.id,
        name: data.data.name,
        detail: data.data.detail,
        coverimage: data.data.coverimage,
        latitude: data.data.latitude,
        longitude: data.data.longitude,
      },
      validationSchema: locationValidationSchema,
      onSubmit: (values) => {
        addplace(values);
      },
    });
  const addplace = async (values) => {
    try {
      console.log(values);
      let {id, name, detail, coverimage, latitude, longitude } = values;
      let payload = {id, name, detail, coverimage, latitude, longitude };
      let res = await axios.put(`${url}/api/auth/attractions/update`,payload,{
        headers:{Authorization:`Bearer ${token}`}
      });
      console.log(res);
      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response.status > 399 || error.response.status < 500) {
        toast.error(error.response.data.message);
        navigate("/signin");
      } else {
        toast.error(error.response.data.message);
      } 
    }
  };

  return (
    <div>
      <div className="add bodyy container">
        <form className="addbox" onSubmit={handleSubmit}>
          <h2 style={{ textAlign: "center" }}>Update This Location</h2>
          <TextField
            id="outlined-basic"
            label="Enter The Id Of The Place"
            variant="outlined"
            name="id"
            value={values.id}
            onChange={handleChange}
            error={touched.name && errors.id}
            onBlur={handleBlur}
          />
          {touched.id && errors.id ? (
            <p style={{ color: "red" }}>*{errors.id}</p>
          ) : (
            ""
          )}
          <TextField
            id="outlined-basic"
            label="Enter The Name Of The Place"
            variant="outlined"
            name="name"
            value={values.name}
            onChange={handleChange}
            error={touched.name && errors.name}
            onBlur={handleBlur}
          />
          {touched.name && errors.name ? (
            <p style={{ color: "red" }}>*{errors.name}</p>
          ) : (
            ""
          )}
          <TextField
            id="outlined-basic"
            label="Enter The Detail Of The Place"
            variant="outlined"
            name="detail"
            value={values.detail}
            onChange={handleChange}
            error={touched.detail && errors.detail}
            onBlur={handleBlur}
          />
          {touched.detail && errors.detail ? (
            <p style={{ color: "red" }}>*{errors.detail}</p>
          ) : (
            ""
          )}
          <TextField
            id="outlined-basic"
            label="Enter The Coverimage Of The Place"
            variant="outlined"
            name="coverimage"
            value={values.coverimage}
            onChange={handleChange}
            error={touched.coverimage && errors.coverimage}
            onBlur={handleBlur}
          />
          {touched.coverimage && errors.coverimage ? (
            <p style={{ color: "red" }}>*{errors.coverimage}</p>
          ) : (
            ""
          )}
          <TextField
            id="outlined-basic"
            label="Enter The Latitude Of The Place"
            variant="outlined"
            name="latitude"
            value={values.latitude}
            onChange={handleChange}
            error={touched.latitude && errors.latitude}
            onBlur={handleBlur}
          />
          {touched.latitude && errors.latitude ? (
            <p style={{ color: "red" }}>*{errors.latitude}</p>
          ) : (
            ""
          )}
          <TextField
            id="outlined-basic"
            label="Enter The Longitude Of The Place"
            variant="outlined"
            name="longitude"
            value={values.longitude}
            onChange={handleChange}
            error={touched.longitude && errors.longitude}
            onBlur={handleBlur}
          />
          {touched.longitude && errors.longitude ? (
            <p style={{ color: "red" }}>*{errors.longitude}</p>
          ) : (
            ""
          )}
          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: "#ffdd00", color: "black" }}
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  );
}
