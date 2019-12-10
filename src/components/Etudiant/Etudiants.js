import React, { Component } from "react";
import { connect } from "react-redux";
import { getEtudiants } from "../../actions/etudiantActions";
import PropTypes from 'prop-types';
import EtudiantItem from "./EtudiantItem";
import CreateEtudiantButton from "../../Buttons/Add Buttons/CreateEtudiantButton";
import AddMatieresEtudiantsButton from "../../Buttons/Matieres_Etudiants_Professeurs_Buttons/AddMatieresEtudiantsButton";

class Etudiants extends Component {

    // Life Cycle Hook
    // This function is Called immediately after a component is mounted. Setting state here will trigger re-rendering.
    componentDidMount() {
        this.props.getEtudiants();
    };

    render() {
        const { etudiants } = this.props.etudiant;

        return (
            <div className="etudiants">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Etudiants</h1>
                            <br />
                            <CreateEtudiantButton />
                            <br />
                            <hr />
                            <AddMatieresEtudiantsButton />
                            <br />
                            <hr />
                            {
                                etudiants.map(etudiant => (
                                    <EtudiantItem key={etudiant.id} etudiant={etudiant} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Etudiants.propTypes = {
    getEtudiants: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    etudiant: state.etudiant
});

export default connect(
    mapStateToProps,
    { getEtudiants }
)(Etudiants);