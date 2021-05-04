import React, { useCallback, useState } from "react";
import { Form, Button, InputGroup, Spinner } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import Colors from "../../constants/colors";

const AuthForm = (props) => {
  const [isValidated, setIsValidated] = useState(true);

  const onSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setIsValidated(false);
      event.preventDefault();
      event.stopPropagation();
    } else {
      setIsValidated(true);
      props.handleLogin()
    }
  }


  return (
    <div className="content">
      <div className="login-title">Login</div>
      <div className="login-form">
        <Form
          noValidate
          validated={!isValidated}
          onSubmit={onSubmit}
        >
          <Form.Group controlId="formEmail">
            <Form.Label 
              className="login-label-small"
            >
                Email
            </Form.Label>
            <Form.Control 
              onChange={props.onEmailChange} 
              type="input" 
              placeholder="Email" 
              required 
            />
            <Form.Control.Feedback type="invalid">
              Please input an Email
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label className="login-label-small">Password</Form.Label>
            <InputGroup>
              <Form.Control
                onChange={props.onPasswordChange}
                type={props.isPassword}
                placeholder="Password"
                required
              />
              <InputGroup.Prepend style={{ cursor: "pointer" }}>
                <InputGroup.Text onClick={props.handleEyeClick}>
                  <FaEye />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control.Feedback type="invalid">
                Please input a password
              </Form.Control.Feedback>
            </InputGroup>
            <Form.Text
              className="text-right login-forgot-password"
              style={{ cursor: "pointer" }}
              onClick={props.handleForgotPasswordClick}
            >
              Forgot Password?
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formRememberMe">
            <Form.Check
              type="checkbox"
              label="Remember me"
              onChange={props.handleRememberMeChange}
            />
          </Form.Group>
          <Button
            style={{ backgroundColor: Colors.secondary }}
            type="submit"
            block
          >
            {(props.isLoading) ? 
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              : 
              'Login'}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AuthForm;
