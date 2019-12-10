import axios from "axios";

const setJWTToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        // if there is no token, we get rid of the empty Authorization
        delete axios.defaults.headers.common["Authorization"];
    }
}

export default setJWTToken;