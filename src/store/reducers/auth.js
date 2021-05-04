import React from 'react';

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    accessToken: '',
    userId: '',
    error: '',
    errorMessage: '',
}

export default (state = initialState, action) => {
    console.log(action.type);
    switch (action.type) {
        case 'LOGIN':
            return { ...state, isLoading: true };
        case 'SIGN_UP':
            return { ...state, isLoading: true };
        case 'LOGIN_FAILED':
            return { ...state, isLoading: false, error: action.error, errorMessage: action.errorMessage };
        case 'AUTHENTICATE':
            return { ...state, isLoading: false, accessToken: action.accessToken, userId: action.userId, isAuthenticated: true };
        default:
            return state;
    }
}