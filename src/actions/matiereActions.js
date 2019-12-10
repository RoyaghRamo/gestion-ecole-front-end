import axios from "axios";
import {
    GET_ERRORS,
    GET_MATIERES,
    GET_MATIERE,
    DELETE_MATIERE,
    GET_ETUDIANTS_OF_MATIERE,
    GET_PROFESSEURS_OF_MATIERE
} from "./types";


// Create a subject
export const createMatiere = (matiere, history) => async dispatch => {
    try {
        await axios.post("/matiere/", matiere);
        history.push("/matieres");
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

// Get all subjects
export const getMatieres = () => async dispatch => {
    const res = await axios.get("/matiere/all");
    dispatch({
        type: GET_MATIERES,
        payload: res.data
    });
};

// Get a subject
export const getMatiere = (matiereId, history) => async dispatch => {
    try {
        // This is what they call Happy Path
        const res = await axios.get(`/matiere/${matiereId}`);
        dispatch({
            type: GET_MATIERE,
            payload: res.data
        });
    } catch (error) {
        history.push("/matieres");
    }
};

// Delete a subject
export const deleteMatiere = matiereId => async dispatch => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette matière?")) {
        await axios.delete(`/matiere/${matiereId}`);
        dispatch({
            type: DELETE_MATIERE,
            payload: matiereId
        });
    }
};

// Get Students of a Subject
export const getEtudiantsOfMatiere = matiereId => async dispatch => {
    const res = await axios.get(`/matiere/${matiereId}/etudiants`);
    dispatch({
        type: GET_ETUDIANTS_OF_MATIERE,
        payload: res.data
    });
}

// Get Professor of a Subject
export const getProfesseursOfMatiere = matiereId => async dispatch => {
    const res = await axios.get(`/matiere/${matiereId}/professeurs`);
    dispatch({
        type: GET_PROFESSEURS_OF_MATIERE,
        payload: res.data
    });
}