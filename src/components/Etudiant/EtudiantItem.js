import React, { Component } from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { deleteEtudiant } from "../../actions/etudiantActions";

class EtudiantItem extends Component {

    onDeleteClick = etudiantId => {
        this.props.deleteEtudiant(etudiantId);
    };

    render() {
        const { etudiant } = this.props;
        return (
            <div className="container">
                <div className="card card-body bg-light mb-3">
                    <div className="row">
                        <div className="col-2">
                            <span className="mx-auto">{etudiant.etudiantId}</span>
                        </div>
                        <div className="col-lg-6 col-md-4 col-8">
                            <h3>{etudiant.nom} {etudiant.prenom}</h3>
                        </div>
                        <div className="col-md-4 d-none d-lg-block">
                            <ul className="list-group">
                                <Link to={`/matieresOfEtudiant/${etudiant.etudiantId}`}>
                                    <li className="list-group-item board">
                                        <i className="fa fa-flag-checkered pr-1"> Voir ses matières </i>
                                    </li>
                                </Link>
                                <Link to={`/updateEtudiant/${etudiant.etudiantId}`}>
                                    <li className="list-group-item update">
                                        <i className="fa fa-edit pr-1"> Modifier</i>
                                    </li>
                                </Link>
                                <Link to="/etudiants">
                                    <li className="list-group-item delete" onClick={this.onDeleteClick.bind(
                                        this,
                                        etudiant.etudiantId
                                    )}>
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

EtudiantItem.propTypes = {
    deleteEtudiant: PropTypes.func.isRequired
};

export default connect(
    null,
    { deleteEtudiant }
)(EtudiantItem);