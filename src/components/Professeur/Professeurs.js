import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { getProfesseurs } from "../../actions/professeurActions";
import ProfesseurItem from "./ProfesseurItem";
import CreateProfesseurButton from "../../Buttons/Add Buttons/CreateProfesseurButton";
import AddMatieresProfesseursButton from "../../Buttons/Matieres_Etudiants_Professeurs_Buttons/AddMatieresProfesseursButton";

class Professeurs extends Component {

    // Life Cycle Hook
    // This function is Called immediately after a component is mounted. Setting state here will trigger re-rendering.
    componentDidMount() {
        this.props.getProfesseurs();
    };

    render() {
        const { professeurs } = this.props.professeur;
        return (
            <div className="professeurs">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Professeurs</h1>
                            <br />
                            <CreateProfesseurButton />
                            <br />
                            <hr />
                            <AddMatieresProfesseursButton />
                            <br />
                            <hr />
                            {
                                professeurs.map(professeur => (
                                    <ProfesseurItem key={professeur.id} professeur={professeur} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Professeurs.propTypes = {
    professeur: PropTypes.object.isRequired,
    getProfesseurs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    professeur: state.professeur
});

export default connect(mapStateToProps, { getProfesseurs })(Professeurs);