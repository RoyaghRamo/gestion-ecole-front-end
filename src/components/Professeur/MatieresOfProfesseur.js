import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { getProfesseur, getMatieresOfProfesseur, deleteMatiereOfProfesseur } from "../../actions/professeurActions";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import MatiereItem from '../Matiere/MatiereItem';

class MatieresOfProfesseur extends Component {

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getProfesseur(id, this.props.history);
        this.props.getMatieresOfProfesseur(id);
    };

    onDeleteClick = (professeurId, matiereId) => {
        this.props.deleteMatiereOfProfesseur(professeurId, matiereId);
    };

    render() {
        const professeur = this.props.professeur;
        console.log(professeur);
        const matieres = this.props.matieres;
        console.log(matieres);
        return (
            <div className="matieres">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Matieres du professeur {professeur.nom} {professeur.prenom} </h1>
                            <br />
                            <br />
                            <hr />
                            {
                                matieres.map(matiere => (
                                    <div key={matiere.id} >
                                        <MatiereItem key={matiere.id} matiere={matiere} />
                                        <Link to={`/matieresOfProfesseur/${professeur.professeurId}`}>
                                            <li className="list-group-item delete"
                                                onClick={this.onDeleteClick.bind(
                                                    this,
                                                    professeur.professeurId,
                                                    matiere.matiereId
                                                )} >
                                                <i className="fa fa-minus-circle pr-1"> Supprimer la matiere de ce professeur</i>
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

MatieresOfProfesseur.propTypes = {
    getProfesseur: PropTypes.func.isRequired,
    getMatieresOfProfesseur: PropTypes.func.isRequired,
    deleteMatiereOfProfesseur: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    professeur: state.professeur.professeur,
    matieres: state.professeur.matieres
});

export default connect(
    mapStateToProps,
    { getProfesseur, getMatieresOfProfesseur, deleteMatiereOfProfesseur }
)(MatieresOfProfesseur);