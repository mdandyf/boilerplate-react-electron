import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from "react-bootstrap";
import AuthForm from "../../components/auth/AuthForm";
import * as authAction from '../../store/actions/auth'
import "../../css/auth/auth.css";

const AuthPage = (props) => {
  const [username, setUsername] = useState("");
  const [userpass, setUserpass] = useState("");

  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isPassword, setIsPassword] = useState("password");
  const [isValidated, setIsValidated] = useState(false);

  const [error, setError] = useState();
  const dispatch = useDispatch();

  const handleEyeClick = () => {
    if (isPassword === "password") {
      setIsPassword("input");
    } else {
      setIsPassword("password");
    }
  };

  const handleForgotPasswordClick = () => {
    props.history.push("/forget-password");
  };

  const handleRememberMeChange = (e) => {
    console.log("Remember me is changed");
  };

  const handleLoginClick = (event) => {
    console.log("Login is clicked");
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setIsValidated(true);
  };

  const authenticate = async() => {
    let action;
    setIsLoading(true);

    try {
        action = authAction.login(username, userpass);
        await dispatch(action);
    } catch (err) {
        setError(err);
    }
    setIsLoading(false);
  }

  return (
    <Container className="container-login" fluid>
      <Row className="login-page">
        <Col lg={6} sm={0} className="column-image img-fullbackground"></Col>
        <Col lg={6} sm={2} className="column-form">
          <AuthForm
            isPassword={isPassword}
            isValidated={isValidated}
            isLoading={isLoading}
            handleButtonClick={authenticate}
            handleEyeClick={handleEyeClick}
            handleLoginClick={handleLoginClick}
            handleRememberMeChange={handleRememberMeChange}
            handleForgotPasswordClick={handleForgotPasswordClick}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AuthPage;
