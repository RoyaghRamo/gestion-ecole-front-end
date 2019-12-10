import { SET_CURRENT_USER } from "../actions/types";

const initialState = {
    user: {},
    // This is a boolean that shows whether the user is authenticated/has a valid token
    validToken: false
};

// This is a function that check if the payload isn't empty
const booleanActionPayload = (payload) => {
    if (payload) {
        return true;
    }
    return false;
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                validToken: booleanActionPayload(action.payload),
                user: action.payload
            }
        default:
            return state;
    }
}
