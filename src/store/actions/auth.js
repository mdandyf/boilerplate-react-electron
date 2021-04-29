import Axios from 'axios';

export const LOGIN = 'LOGIN';

export const login = (email, password) => {
    try {
        const base64Pass = new Buffer(password).toString('base64');
        const url = AUTH_URL + LOGIN_URI + KEY + API_KEY;
        const response = fetch(
            url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password: base64Pass,
                    returnSecureToken: true
                })
            }
        )
        .then(res => res.json())
        .then(data => console.log(data));

         //    if (!response.ok) {
        //         throw new Error('Something went wrong!');
        //     }

        //     const respData = await response.json();
        //     console.log(respData);
            //dispatch({ type: SIGN_UP, data: respData });
            //dispatch(authenticate(respData.idToken, respData.localId, parseInt(respData.expiresIn) * 1000));

            //const expiryDate = new Date(new Date().getTime() + parseInt(respData.expiresIn) * 1000);
            //saveDataToStorage(respData.idToken, respData.localId, expiryDate); */
    } catch(error) {
         // Send to analytics
         throw (err);
    }
}

export const SIGN_UP = 'SIGN_UP';

export const signUp = (email, password) => {
    return async dispatch => {
        try {
            let base64Pass = new Buffer(password).toString('base64');
            const response = await fetch(
                AUTH_URL + SIGN_UP_URI + KEY + API_KEY,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email,
                        password: base64Pass,
                        returnSecureToken: true
                    })
                }
            )

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const respData = await response.json();
            //dispatch({ type: SIGN_UP, data: respData });
            dispatch(authenticate(respData.idToken, respData.localId, parseInt(respData.expiresIn) * 1000));

            const expiryDate = new Date(new Date().getTime() + parseInt(respData.expiresIn) * 1000);
            saveDataToStorage(respData.idToken, respData.localId, expiryDate);
        } catch (err) {
            // Send to analytics
            throw (err);
        }
    }
}

// =====================================================================================
// This section will be used for Auto Login scheme
// =====================================================================================
export const AUTHENTICATE = 'AUTHENTICATE';

export const authenticate = (accessToken, userId, expiryTime) => {
    return dispatch => {
        //dispatch(setLogoutTimer(expiryTime));
        dispatch({ type: AUTHENTICATE, accessToken: accessToken, userId: userId });
    }
}

const saveDataToStorage = (accessToken, userId, expiryDate) => {
    const dataToSave = JSON.stringify({
        accessToken: accessToken,
        userId: userId,
        expiryDate: expiryDate.toISOString()
    });
    localStorage.setItem('UserData', dataToSave);
}