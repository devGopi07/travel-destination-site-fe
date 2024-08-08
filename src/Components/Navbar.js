import React from "react";
 
import Container from "react-bootstrap/Container"; 
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar"; 
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";


export function Navbarr() {
  const navigate=useNavigate()
  return (
    <Navbar className="navbarr" collapseOnSelect fixed="top" expand="lg" style={{backgroundColor:"#ffdd00",fontWeight:"500px",marginBottom:"50px"}} variant="light">
      <Container> 
        <Navbar.Brand href="/"> <h2> Travel App </h2> </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="flex-grow-1 ">
            <Nav.Link onClick={()=>navigate("/")}  style={{color:"black"}}> <h4> Home </h4> </Nav.Link> 
            <Nav.Link onClick={()=>navigate("/add")} style={{color:"black"}}>  <h4> Add </h4> </Nav.Link> 
          </Nav>
          <Nav className="justify-content-end flex-grow-1 ">
            <Nav.Link onClick={()=>navigate("/signin")}> <h4 style={{color:"black"}}>Signout <LogoutIcon fontSize="medium"/></h4> </Nav.Link>  
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
