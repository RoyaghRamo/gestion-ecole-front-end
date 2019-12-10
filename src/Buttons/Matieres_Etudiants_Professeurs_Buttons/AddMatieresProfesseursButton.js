import React from 'react';
import { Link } from "react-router-dom";

const AddMatieresProfesseursButton = () => {
    return (
        <React.Fragment>
            <Link to="/addMatieresProfesseurs" className="btn btn-lg btn-info">
                Ajouter une matière à un professeur
            </Link>
        </React.Fragment>
    )
}

export default AddMatieresProfesseursButton;