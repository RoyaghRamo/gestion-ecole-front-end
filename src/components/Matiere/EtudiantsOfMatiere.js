import React, { Component } from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getEtudiantsOfMatiere, getMatiere } from "../../actions/matiereActions";
import { deleteMatiereOfEtudiant } from "../../actions/etudiantActions";
import EtudiantItem from '../Etudiant/EtudiantItem';

class EtudiantsOfMatiere extends Component {

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getMatiere(id, this.props.history);
        this.props.getEtudiantsOfMatiere(id);
    };

    onDeleteClick = (etudiantId, matiereId) => {
        this.props.deleteMatiereOfEtudiant(etudiantId, matiereId);
    };

    render() {
        const matiere = this.props.matiere;
        console.log("matiere: ")
        console.log(matiere);
        const etudiants = this.props.etudiants;
        console.log("Etudiants: ")
        console.log(etudiants);
        return (
            <div className="etudiants">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Etudiants de la matière {matiere.nom} </h1>
                            <br />
                            <br />
                            <hr />
                            {
                                etudiants.map(etudiant => (
                                    <div key={etudiant.id}>
                                        <EtudiantItem key={etudiant.id} etudiant={etudiant} />
                                        <Link to={`/etudiantsOfMatiere/${matiere.matiereId}`}>
                                            <li className="list-group-item delete"
                                                onClick={this.onDeleteClick.bind(
                                                    this,
                                                    etudiant.etudiantId,
                                                    matiere.matiereId
                                                )}>
                                                <i className="fa fa-minus-circle pr-1"> Supprimer l'étudiant de cette matière </i>
                                            </li>
                                        </Link>
                                        <hr />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

EtudiantsOfMatiere.propTypes = {
    getMatiere: PropTypes.func.isRequired,
    getEtudiantsOfMatiere: PropTypes.func.isRequired,
    deleteMatiereOfEtudiant: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    matiere: state.matiere.matiere,
    etudiants: state.matiere.etudiants
});

export default connect(
    mapStateToProps,
    { getMatiere, getEtudiantsOfMatiere, deleteMatiereOfEtudiant }
)(EtudiantsOfMatiere);