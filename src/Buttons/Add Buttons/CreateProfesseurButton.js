import React from 'react';
import { Link } from "react-router-dom";

const CreateProfesseurButton = () => {
    return (
        <React.Fragment>
            <Link to="/addProfesseur" className="btn btn-lg btn-info">
                Ajouter un professeur
            </Link>
        </React.Fragment>
    )
}

export default CreateProfesseurButton;