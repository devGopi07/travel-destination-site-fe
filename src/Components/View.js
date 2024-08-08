import React, { useEffect, useState } from "react";
import { Navbarr } from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { url } from "../App";

export default function View() {
  const navigate = useNavigate();
  const { idx } = useParams();
  let token=localStorage.getItem("token") 
  

  let [data, setData] = useState({});

  const getdata = async () => {
    try {
      let res = await axios.get(`${url}/api/attractions/${idx}`);
      console.log(res);
      console.log(res.data.attraction);
      setData(res.data.attraction);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };


  
  const deleteData = async (id) => {
    console.log(id);
    console.log(typeof(id));
    let payload={id};
    try { 
      console.log(payload)
      let resp=await axios.delete(`${url}/api/attractions/delete`,payload,{ 
        headers:{Authorization:`Bearer ${token}`}
      })
      console.log(resp);
    }
     catch (error) {
      toast.error(error.message)
      console.log(error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div>
      <Navbarr />
      <div className="view bodyy ">
        <Card className="cardd shadow-lg">
          <h1 style={{ textAlign: "center" }}>{data.name}</h1>
          <Card.Img variant="top" src={data.coverimage} />
          <Card.Body>
            <Card.Text>{data.detail}</Card.Text>
            <div className="btns">
              <Button
                variant="success"
                onClick={() => navigate(`/update/${idx}`)}
              >
                Update
              </Button>
              <Button variant="danger" onClick={() => deleteData(data.id)}>
                delete
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

 

// const DeleteComment = ({ commentId }) => {
//   const handleDeleteComment = async () => {
//     try {
//       await axios.delete(`h);
//       console.log(`Comment with ID ${commentId} deleted.`);
//     } catch (error) {
//       console.error('Error deleting comment:', error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleDeleteComment}>Delete Comment</button>
//     </div>
//   );
// };