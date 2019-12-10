import React, { Component } from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { deleteMatiereOfProfesseur } from "../../actions/professeurActions";
import { getProfesseursOfMatiere, getMatiere } from "../../actions/matiereActions";
import ProfesseurItem from '../Professeur/ProfesseurItem'

class ProfesseursOfMatiere extends Component {

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getMatiere(id, this.props.history);
        this.props.getProfesseursOfMatiere(id);
    };

    onDeleteClick = (professeurId, matiereId) => {
        this.props.deleteMatiereOfProfesseur(professeurId, matiereId);
    };

    render() {
        const matiere = this.props.matiere;
        console.log(matiere);
        const professeurs = this.props.professeurs;
        console.log(professeurs);
        return (
            <div className="professeurs">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Professeur de la matiere {matiere.nom} </h1>
                            <br />
                            <br />
                            <hr />
                            {
                                professeurs.map(professeur => (
                                    <div key={professeur.id}>
                                        <ProfesseurItem key={professeur.id} professeur={professeur} />
                                        <Link to="/matieres">
                                            <li className="list-group-item delete"
                                                onClick={this.onDeleteClick.bind(
                                                    this,
                                                    professeur.professeurId,
                                                    matiere.matiereId
                                                )}>
                                                <i className="fa fa-minus-circle pr-1"> Supprimer le professeur de cette matière </i>
                                            </li>
                                        </Link>
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

ProfesseursOfMatiere.propTypes = {
    getMatiere: PropTypes.func.isRequired,
    getProfesseursOfMatiere: PropTypes.func.isRequired,
    deleteMatiereOfProfesseur: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    matiere: state.matiere.matiere,
    professeurs: state.matiere.professeurs
});

export default connect(
    mapStateToProps,
    { getMatiere, getProfesseursOfMatiere, deleteMatiereOfProfesseur }
)(ProfesseursOfMatiere);