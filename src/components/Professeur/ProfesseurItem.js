import React, { Component } from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { deleteProfesseur } from "../../actions/professeurActions";


class ProfesseurItem extends Component {

    onDeleteClick = id => {
        this.props.deleteProfesseur(id);
    };

    render() {
        const { professeur } = this.props;
        return (
            <div className="container">
                <div className="card card-body bg-light mb-3">
                    <div className="row">
                        <div className="col-2">
                            <span className="mx-auto">{professeur.professeurId}</span>
                        </div>
                        <div className="col-lg-6 col-md-4 col-8">
                            <h3>{professeur.nom} {professeur.prenom}</h3>
                        </div>
                        <div className="col-md-4 d-none d-lg-block">
                            <ul className="list-group">
                                <Link to={`/matieresOfProfesseur/${professeur.professeurId}`}>
                                    <li className="list-group-item board">
                                        <i className="fa fa-flag-checkered pr-1"> Voir ses matières </i>
                                    </li>
                                </Link>
                                <Link to={`/updateProfesseur/${professeur.professeurId}`}>
                                    <li className="list-group-item update">
                                        <i className="fa fa-edit pr-1"> Modifier</i>
                                    </li>
                                </Link>
                                <Link to="/professeurs">
                                    <li className="list-group-item delete" onClick={this.onDeleteClick.bind(
                                        this, professeur.professeurId)}>
                                        <i className="fa fa-minus-circle pr-1"> Supprimer</i>
                                    </li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ProfesseurItem.propTypes = {
    deleteProfesseur: PropTypes.func.isRequired
};

export default connect(
    null,
    { deleteProfesseur }
)(ProfesseurItem);