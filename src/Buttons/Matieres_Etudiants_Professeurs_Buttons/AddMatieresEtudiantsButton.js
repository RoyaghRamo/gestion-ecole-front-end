import React from 'react';
import { Link } from "react-router-dom";

const AddMatieresEtudiantsButton = () => {
    return (
        <React.Fragment>
            <Link to="/addMatieresEtudiants" className="btn btn-lg btn-info">
                Ajouter une matière à un étudiant
            </Link>
        </React.Fragment>
    )
}

export default AddMatieresEtudiantsButton;