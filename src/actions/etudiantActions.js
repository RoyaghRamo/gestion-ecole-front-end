import axios from "axios";
import {
    GET_ERRORS,
    GET_ETUDIANTS,
    GET_ETUDIANT,
    DELETE_ETUDIANT,
    GET_MATIERES_OF_ETUDIANT,
    DELETE_MATIERE_OF_ETUDIANT
} from "./types";


// Create a student
export const createEtudiant = (etudiant, history) => async dispatch => {
    try {
        await axios.post("/etudiant/", etudiant);
        history.push("/etudiants");
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


// Get all students
export const getEtudiants = () => async dispatch => {
    const res = await axios.get("/etudiant/all");
    dispatch({
        type: GET_ETUDIANTS,
        payload: res.data
    });
};

// Get a student
export const getEtudiant = (etudiantId, history) => async dispatch => {
    try {
        // This is what they call Happy Path
        const res = await axios.get(`/etudiant/${etudiantId}`);
        dispatch({
            type: GET_ETUDIANT,
            payload: res.data
        });
    } catch (err) {
        history.push("/etudiants");
    }
};

// Delete a student
export const deleteEtudiant = etudiantId => async dispatch => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet étudiant?")) {
        await axios.delete(`/etudiant/${etudiantId}`);
        dispatch({
            type: DELETE_ETUDIANT,
            payload: etudiantId
        });
    }
};

// Add a subject to a student
export const addMatieresToEtudiant = (etudiantId, matiereId, history) => async dispatch => {

    try {
        await axios.patch(`/etudiant/${etudiantId}/matieres/${matiereId}`);
        history.push(`/matieresOfEtudiant/${etudiantId}`);
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

// Get subjects of a student
export const getMatieresOfEtudiant = id => async dispatch => {
    const res = await axios.get(`/etudiant/${id}/matieres`);
    dispatch({
        type: GET_MATIERES_OF_ETUDIANT,
        payload: res.data
    });
}

// Delete a subject of a student
export const deleteMatiereOfEtudiant = (etudiantId, matiereId) => async dispatch => {
    if (window.confirm("Êtes-vous sûr de vouloir se désaboonner de cette matière?")) {
        await axios.delete(`/etudiant/${etudiantId}/matieres/${matiereId}`);
        dispatch({
            type: DELETE_MATIERE_OF_ETUDIANT,
            payload: (etudiantId, matiereId)
        });
    }
};