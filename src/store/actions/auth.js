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

export const login = (email, password) => {
  return dispatch => {
    try {
      //const base64Pass = new Buffer(password).toString('base64');
      const url = HEROKU_URL + AUTH_URL + LOGIN_URI;
      const response = Axios.post(url, {
        email: email,
        password: password,
      }, {
          headers: {
            "Content-Type": "application/json",
            "Accept":"*/*",
            "Access-Control-Allow-Origin": "*",
            "Connection": "keep-alive",
            "Origin": "http://localhost:3000",
          }
      })
      .then(response => {
        console.log(response)
        dispatch(authenticate(response.data.access_token, "xxx11", parseInt(30) * 1000));
        const expiryDate = new Date(new Date().getTime() + parseInt(30) * 1000);
        saveDataToStorage(response.data.access_token, "xxx11", expiryDate);
      })
      .catch(error => console.log(error));

      
      } catch (error) {
      // Send to analytics
      console.log(error);
      throw error;
    }
  };
};

export const SIGN_UP = "SIGN_UP";

export const signUp = (email, password) => {
  return async dispatch => {
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
  return dispatch => {
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
