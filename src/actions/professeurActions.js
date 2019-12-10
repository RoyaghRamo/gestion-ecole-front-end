import axios from "axios";
import {
    GET_ERRORS,
    GET_PROFESSEURS,
    GET_PROFESSEUR,
    DELETE_PROFESSEUR,
    GET_MATIERES_OF_PROFESSEUR,
    DELETE_MATIERE_OF_PROFESSEUR
} from "./types";


// Create a professor
export const createProfesseur = (professeur, history) => async dispatch => {
    try {
        await axios.post("/professeur/", professeur);
        history.push("/professeurs");
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

// Get all professors
export const getProfesseurs = () => async dispatch => {
    const res = await axios.get("/professeur/all");
    dispatch({
        type: GET_PROFESSEURS,
        payload: res.data
    });
};

// Get a professor
export const getProfesseur = (professeurId, history) => async dispatch => {
    try {
        // This is what they call Happy Path
        const res = await axios.get(`/professeur/${professeurId}`);
        dispatch({
            type: GET_PROFESSEUR,
            payload: res.data
        });
    } catch (error) {
        history.push("/professeurs");
    }
};

// Delete a professor
export const deleteProfesseur = professeurId => async dispatch => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce professeur?")) {
        await axios.delete(`/professeur/${professeurId}`);
        dispatch({
            type: DELETE_PROFESSEUR,
            payload: professeurId
        });
    }
};

// Add a Subject to a Professor
export const addMatieresToProfesseur = (professeurId, matiereId, history) => async dispatch => {

    try {
        await axios.patch(`/professeur/${professeurId}/matieres/${matiereId}`);
        history.push(`/matieresOfProfesseur/${professeurId}`);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}

// Get Subjects of a Professor
export const getMatieresOfProfesseur = professeurId => async dispatch => {
    const res = await axios.get(`/professeur/${professeurId}/matieres`);
    dispatch({
        type: GET_MATIERES_OF_PROFESSEUR,
        payload: res.data
    });
}

// Delete a Subject of a Professor
export const deleteMatiereOfProfesseur = (professeurId, matiereId) => async dispatch => {
    if (window.confirm("Êtes-vous sûr de vouloir se supprimer cette matière des matières de ce professeur?")) {
        await axios.delete(`/professeur/${professeurId}/matieres/${matiereId}`);
        dispatch({
            type: DELETE_MATIERE_OF_PROFESSEUR,
            payload: (professeurId, matiereId)
        });
    }
};