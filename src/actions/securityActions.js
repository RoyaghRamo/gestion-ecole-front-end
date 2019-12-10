import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setJWTTokn from "../securityUtils/SetJWTToken";
import jwt_decode from "jwt-decode"

export const createNewUser = (User, history) => async dispatch => {
    try {
        await axios.post("/users/register", User);
        history.push("/login");
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const login = LoginRequest => async dispatch => {
    try {
        // post => Login Request
        const res = await axios.post("/users/login", LoginRequest);
        // extract token from res.data
        const { token } = res.data;
        // store the token in the localStorage
        localStorage.setItem("jwtToken", token);
        // set our token in the Header(not the class Header.js, the header we used in Postman)
        setJWTTokn(token)
        // decode the token on React
        // Before that, we need to install jwt-decode: it's a library that exists in React
        const decodedToken = jwt_decode(token);
        // dispatch to our security reducer
        dispatch({
            type: SET_CURRENT_USER,
            payload: decodedToken
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const logout = () => dispatch => {

    localStorage.removeItem("jwtToken");
    setJWTTokn(false);
    dispatch({
        type: SET_CURRENT_USER,
        payload: {}
    });
}