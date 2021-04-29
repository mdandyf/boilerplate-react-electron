import React from "react";
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';

const MainPage = (props) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Wireline-Log</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="File" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Add New File</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Open Existing File</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Close Current File</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Exit</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainPage;
