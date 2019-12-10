import React from 'react';
import { Link } from "react-router-dom";

const CreateMatiereButton = () => {
    return (
        <React.Fragment>
            <Link to="/addMatiere" className="btn btn-lg btn-info">
                Ajouter une matière
            </Link>
        </React.Fragment>
    )
}

export default CreateMatiereButton;
