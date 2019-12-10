import {
    GET_MATIERES,
    GET_MATIERE,
    DELETE_MATIERE,
    GET_ETUDIANTS_OF_MATIERE,
    GET_PROFESSEURS_OF_MATIERE
} from "../actions/types";

const initialState = {
    matieres: [],
    matiere: {},
    etudiants: [],
    professeurs: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MATIERES:
            // All Subjects
            return {
                ...state,
                matieres: action.payload
            };

        case GET_MATIERE:
            // A specific Subject
            return {
                ...state,
                matiere: action.payload
            };
        case DELETE_MATIERE:
            return {

                // If we do it returning only state way we'll need 
                // to refresh the page after deleting a student
                ...state,
                // But when when we add this, we'll be able to delete and see the new list of students
                matieres: state.matieres.filter(
                    matiere => matiere.matiereId !== action.payload
                )
            }
        case GET_ETUDIANTS_OF_MATIERE:
            return {
                ...state,
                etudiants: action.payload
            }
        case GET_PROFESSEURS_OF_MATIERE:
            return {
                ...state,
                professeurs: action.payload
            }
        default:
            return state;
    }
};