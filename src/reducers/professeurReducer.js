import { GET_PROFESSEURS, GET_PROFESSEUR, DELETE_PROFESSEUR, GET_MATIERES_OF_PROFESSEUR, DELETE_MATIERE_OF_PROFESSEUR } from "../actions/types";

const initialState = {
    professeurs: [],
    professeur: {},
    matieres: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROFESSEURS:
            // All Students
            return {
                ...state,
                professeurs: action.payload
            };

        case GET_PROFESSEUR:
            // A specific Student
            return {
                ...state,
                professeur: action.payload
            };
        case DELETE_PROFESSEUR:
            return {

                // If we do it returning only state way we'll need 
                // to refresh the page after deleting a professor
                ...state,
                // But when when we add this, we'll be able to delete and see the new list of professors
                professeurs: state.professeurs.filter(
                    professeur => professeur.professeurId !== action.payload
                )
            }
        case GET_MATIERES_OF_PROFESSEUR:
            return {
                ...state,
                matieres: action.payload
            }
        case DELETE_MATIERE_OF_PROFESSEUR:
            return {
                ...state,
                matieres: state.matieres.filter(
                    matiere => matiere.matiereId !== action.payload
                )
            }

        default:
            return state;
    }
};