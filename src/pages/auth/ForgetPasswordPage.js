import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import "../../css/auth/forgetpassword.css";
import Colors from "../../constants/colors";

const ForgetPasswordPage = (props) => {
  return (
    <Container className="container-forget-password" style={{backgroundColor: Colors.primary}} fluid>
      <Row className="forget-password-page">
        <div className="header">Reset Password Form</div>
        <Col className="content" lg={3} xl={3} sm={10}>
          <Card>
            <Card.Body>
              <Card.Title style={{color: Colors.primary}}>Forget Password</Card.Title>
              <Card.Text>
                Please input your email!
              </Card.Text>
              <Form.Group>
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Your Email Address"
                />
              </Form.Group>
              <Button
                style={{backgroundColor: Colors.secondary}}
                as="input"
                type="submit"
                value="Reset Password"
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgetPasswordPage;
