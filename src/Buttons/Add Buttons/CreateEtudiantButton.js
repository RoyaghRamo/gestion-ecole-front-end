import React from 'react';
import { Link } from "react-router-dom";

const CreateEtudiantButton = () => {
    return (
        <React.Fragment>
            <Link to="/addEtudiant" className="btn btn-lg btn-info">
                Ajouter un étudiant
            </Link>
        </React.Fragment>
    )
}

export default CreateEtudiantButton;