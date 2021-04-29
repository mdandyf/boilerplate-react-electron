import React from 'react';

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    accessToken: '',
    userId: ''
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, isLoading: true };
        case 'SIGN_UP':
            return { ...state, isLoading: true };
        case 'AUTHENTICATE':
            console.log('now is authenticated');
            return { ...state, accessToken: action.accessToken, userId: action.userId, isAuthenticated: true, isLoading: false };
        default:
            return state;
    }
}