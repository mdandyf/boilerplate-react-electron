import Axios from "axios";

import {
  HEROKU_URL,
  AUTH_URL,
  LOGIN_URI,
  SIGN_UP_URI,
} from "../../constants/locations";

// =====================================================================================
// This section will be used for Authentication (Login & Sign Up)
// =====================================================================================

export const LOGIN = "LOGIN";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const login = async (email, password) => {
  const url = HEROKU_URL + AUTH_URL + LOGIN_URI;
  return Axios.post(
      url,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*",
          "Access-Control-Allow-Origin": "*",
          "Connection": "keep-alive",
          "Origin": "http://localhost:3000",
        },
      }
    )
};

export const SIGN_UP = "SIGN_UP";

export const signUp = (email, password) => {
  return async (dispatch) => {
    try {
      let base64Pass = new Buffer(password).toString("base64");
      const response = await fetch(AUTH_URL + SIGN_UP_URI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password: base64Pass,
          returnSecureToken: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const respData = await response.json();
      //dispatch({ type: SIGN_UP, data: respData });
      dispatch(
        authenticate(
          respData.idToken,
          respData.localId,
          parseInt(respData.expiresIn) * 1000
        )
      );

      const expiryDate = new Date(
        new Date().getTime() + parseInt(respData.expiresIn) * 1000
      );
      saveDataToStorage(respData.idToken, respData.localId, expiryDate);
    } catch (err) {
      // Send to analytics
      throw err;
    }
  };
};

// =====================================================================================
// This section will be used for Auto Login scheme
// =====================================================================================
export const AUTHENTICATE = "AUTHENTICATE";

export const authenticate = (accessToken, userId, expiryTime) => {
  return (dispatch) => {
    //dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, accessToken: accessToken, userId: userId });
  };
};

const saveDataToStorage = (accessToken, userId, expiryDate) => {
  const dataToSave = JSON.stringify({
    accessToken: accessToken,
    userId: userId,
    expiryDate: expiryDate.toISOString(),
  });
  localStorage.setItem("UserData", dataToSave);
};
