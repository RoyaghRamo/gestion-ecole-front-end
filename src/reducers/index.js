import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import etudiantReducer from "./etudiantReducer";
import professeurReducer from "./professeurReducer";
import matiereReducer from "./matiereReducer";
import securityReducer from "./securityReducer";

export default combineReducers({
    // Adding reducers here
    errors: errorReducer,
    etudiant: etudiantReducer,
    professeur: professeurReducer,
    matiere: matiereReducer,
    security: securityReducer
});