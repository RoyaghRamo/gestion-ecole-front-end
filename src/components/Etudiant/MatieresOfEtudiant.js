import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { getMatieresOfEtudiant, getEtudiant, deleteMatiereOfEtudiant } from "../../actions/etudiantActions";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import MatiereItem from '../Matiere/MatiereItem';

class MatieresOfEtudiant extends Component {

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getEtudiant(id, this.props.history);
        this.props.getMatieresOfEtudiant(id);
    };

    onDeleteClick = (etudiantId, matiereId) => {
        this.props.deleteMatiereOfEtudiant(etudiantId, matiereId);
    };

    render() {
        const etudiant = this.props.etudiant;
        console.log(etudiant);
        const matieres = this.props.matieres;
        console.log(matieres);
        return (
            <div className="matieres">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Matieres de l'étudiant {etudiant.nom} {etudiant.prenom} </h1>
                            <br />
                            <br />
                            <hr />
                            {
                                matieres.map(matiere => (
                                    <div key={matiere.id}>
                                        <MatiereItem key={matiere.id} matiere={matiere} />
                                        <Link to={`/matieresOfEtudiant/${etudiant.etudiantId}`}>
                                            <li className="list-group-item delete"
                                                onClick={this.onDeleteClick.bind(
                                                    this,
                                                    etudiant.etudiantId,
                                                    matiere.matiereId
                                                )} >
                                                <i className="fa fa-minus-circle pr-1"> Supprimer la matiere de cet étudiant</i>
                                            </li>
                                        </Link>
                                        <hr />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

MatieresOfEtudiant.propTypes = {
    getEtudiant: PropTypes.func.isRequired,
    getMatieresOfEtudiant: PropTypes.func.isRequired,
    deleteMatiereOfEtudiant: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    etudiant: state.etudiant.etudiant,
    matieres: state.etudiant.matieres
});

export default connect(
    mapStateToProps,
    { getEtudiant, getMatieresOfEtudiant, deleteMatiereOfEtudiant }
)(MatieresOfEtudiant);