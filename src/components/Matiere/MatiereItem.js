import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { deleteMatiere } from "../../actions/matiereActions";


class MatiereItem extends Component {

    onDeleteClick = id => {
        this.props.deleteMatiere(id);
    };

    render() {
        const { matiere } = this.props;
        return (
            <div className="container">
                <div className="card card-body bg-light mb-3">
                    <div className="row">
                        <div className="col-2">
                            <span className="mx-auto">{matiere.matiereId}</span>
                        </div>
                        <div className="col-lg-6 col-md-4 col-8">
                            <h3>{matiere.nom}</h3>
                        </div>
                        <div className="col-md-4 d-none d-lg-block">
                            <ul className="list-group">
                                <Link to={`/etudiantsOfMatiere/${matiere.matiereId}`}>
                                    <li className="list-group-item board">
                                        <i className="fa fa-flag-checkered pr-1"> Voir ses étudiants </i>
                                    </li>
                                </Link>
                                <Link to={`/professeursOfMatiere/${matiere.matiereId}`}>
                                    <li className="list-group-item board">
                                        <i className="fa fa-flag-checkered pr-1"> Voir ses professeur </i>
                                    </li>
                                </Link>
                                <Link to={`/updateMatiere/${matiere.matiereId}`}>
                                    <li className="list-group-item update">
                                        <i className="fa fa-edit pr-1"> Modifier</i>
                                    </li>
                                </Link>
                                <Link to="/matieres">
                                    <li className="list-group-item delete" onClick={this.onDeleteClick.bind(
                                        this, matiere.matiereId)}>
                                        <i className="fa fa-minus-circle pr-1"> Supprimer </i>
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

MatiereItem.propTypes = {
    deleteMatiere: PropTypes.func.isRequired
};

export default connect(
    null,
    { deleteMatiere }
)(MatiereItem);