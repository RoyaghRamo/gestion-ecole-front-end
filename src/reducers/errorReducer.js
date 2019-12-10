import { GET_ERRORS } from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
        // In case of errors
        case GET_ERRORS:
            // If we have errors from the server
            // These errors will be dispatched to the store
            // Now to hook them to the store
            // ==> Go to the combineReducers and add the errorReducer we just created
            return action.payload;

        // Return the state as it is for the default case
        default:
            return state;
    }
}