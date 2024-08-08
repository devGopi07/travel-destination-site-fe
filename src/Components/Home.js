import React, { useEffect, useState } from "react";
import { Navbarr } from "./Navbar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { url } from "../App";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");

  let [data, setData] = useState([]);

  const getdata = async () => {
    try {
      let res = await axios.get(`${url}/api/attractions`);
      console.log(res.data);
      console.log(res);
      setData(res.data);

      // if (error.response.status > 399 || error.response.status < 500) {
      //   toast.error("Token Expired Login Again");
      //   navigate("/signin");
      // }
    } catch (error) {
      if (error.response.status > 399 || error.response.status < 500) {
        toast.error(error.response.data.message);
        navigate("/signin");
      } else {
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    try {
      if (token) {
        getdata();
      } else {
        toast.error("Token Expired Login Again");
        navigate("/signin");
      }
    } catch (error) {
      if (error.response.status > 399 || error.response.status < 500) {
        toast.error(error.response.data);
        navigate("/signin");
      }
    }
  }, []);
  return (
    <div>
      <Navbarr />
      <div className="home bodyy">
        <div className="container">
          <div className="home-cards">
            {data.map((d, idx) => {
              return (
                <Card className="shadow" key={idx} style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={d.coverimage} />
                  <Card.Body>
                    <Card.Title>{d.name}</Card.Title>
                    <Card.Text>{d.detail}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => navigate(`/view/${d.id}`)}
                    >
                      Learn more
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
