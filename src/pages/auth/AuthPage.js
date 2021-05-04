import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
} from "react-bootstrap";
import AuthForm from "../../components/auth/AuthForm";
import * as authAction from "../../store/actions/auth";
import "../../css/auth/auth.css";

const AuthPage = (props) => {
  const [username, setUsername] = useState("");
  const [userpass, setUserpass] = useState("");

  const [isPassword, setIsPassword] = useState("password");
  
  const dispatch = useDispatch();

  const isLoading = useSelector(state => state.auth.isLoading)

  const handleEyeClick = () => {
    if (isPassword === "password") {
      setIsPassword("input");
    } else {
      setIsPassword("password");
    }
  };

  const handleEmailChange = (event) => setUsername(event.target.value);

  const handlePasswordChange = (event) => setUserpass(event.target.value);

  const handleForgotPasswordClick = () =>
    props.history.push("/forget-password");

  const handleRememberMeChange = (event) =>
    console.log("Remember me is changed");

  const authenticate = useCallback(() => {
        dispatch({
          type: authAction.LOGIN,
        })
        authAction
          .login(username, userpass)
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
              dispatch({
                type: authAction.AUTHENTICATE,
                accessToken: response.data.access_token,
                userId: "M3953",
              });
              const expiryDate = new Date(
                new Date().getTime() + parseInt(30) * 1000
              );
              const dataToSave = JSON.stringify({
                accessToken: response.data.access_token,
                userId: "M3953",
                expiryDate: expiryDate.toISOString(),
              });
              localStorage.setItem("UserData", dataToSave);
              props.history.push('/')
            } else if (response.status === 401) {
              dispatch({
                type: authAction.LOGIN_FAILED,
                errorMessage: 'User is not authorized'
              });
            } else if ((response.status === 442) || (response.status === 400)) {
              dispatch({
                type: authAction.LOGIN_FAILED,
                errorMessage: 'Request is not authorized'
              });
            }
          })
          .catch((err) => {
            alert('Login has failed. Please try again!!')
            dispatch({
              type: authAction.LOGIN_FAILED,
              error: err,
              errorMessage: 'Request is not authorized'
            });
          });
  }, [username, userpass]);

  return (
    <Container className="container-login" fluid>
      <Row className="login-page">
        <Col lg={6} sm={0} className="column-image img-fullbackground" />
        <Col lg={6} sm={2} className="column-form">
          <AuthForm
            isPassword={isPassword}
            isLoading={isLoading}
            onEmailChange={handleEmailChange}
            onPasswordChange={handlePasswordChange}
            handleLogin={authenticate}
            handleEyeClick={handleEyeClick}
            handleRememberMeChange={handleRememberMeChange}
            handleForgotPasswordClick={handleForgotPasswordClick}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AuthPage;
