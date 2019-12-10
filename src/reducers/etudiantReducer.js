import { GET_ETUDIANTS, GET_ETUDIANT, DELETE_ETUDIANT, GET_MATIERES_OF_ETUDIANT, DELETE_MATIERE_OF_ETUDIANT } from "../actions/types";

const initialState = {
    etudiants: [],
    etudiant: {},
    matieres: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ETUDIANTS:
            // All Students
            return {
                ...state,
                etudiants: action.payload
            }

        case GET_ETUDIANT:
            // A specific Student
            return {
                ...state,
                etudiant: action.payload
            }
        case DELETE_ETUDIANT:
            return {

                // If we do it returning only state way we'll need 
                // to refresh the page after deleting a student
                ...state,
                // But when when we add this, we'll be able to delete and see the new list of students
                etudiants: state.etudiants.filter(
                    etudiant => etudiant.etudiantId !== action.payload
                )
            }
        case GET_MATIERES_OF_ETUDIANT:
            return {
                ...state,
                matieres: action.payload
            }
        case DELETE_MATIERE_OF_ETUDIANT:
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