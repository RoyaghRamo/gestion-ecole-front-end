import React, { Component } from 'react';
import { addMatieresToProfesseur, getProfesseurs } from "../../actions/professeurActions";
import { getMatieres } from "../../actions/matiereActions";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import classnames from "classnames";

class AddMatieresProfesseurs extends Component {

    constructor() {
        super();
        this.state = {
            professeurId: "",
            matiereId: "",
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    };

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit(e) {
        e.preventDefault();
        const professeurId = this.state.professeurId;
        // console.log("professeur Id: ");
        // console.log(professeurId);
        const matiereId = this.state.matiereId;
        // console.log("matiere Id: ");
        // console.log(matiereId);
        this.props.addMatieresToProfesseur(professeurId, matiereId, this.props.history);
    };

    componentDidMount() {
        this.props.getMatieres();
        this.props.getProfesseurs();
    };

    render() {
        const professeurs = this.props.professeur.professeurs;
        // console.log("étudiants: ")
        // console.log(professeurs);
        const matieres = this.props.matiere.matieres;
        // console.log("matières: ")
        // console.log(matieres);
        const { errors } = this.state;
        return (
            <div className="matieres">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Ajouter une matière à un professeur</h1>
                            <br />
                            <br />
                            <hr />
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <select
                                        className="form-control form-control-lg"
                                        name="professeurId"
                                        value={this.professeurId}
                                        onChange={this.onChange}
                                    >
                                        <option>Choisissez un professeur</option>
                                        {
                                            professeurs.map(professeur => (
                                                <option key={professeur.professeurId} value={professeur.professeurId}> {professeur.nom} {professeur.prenom} </option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <select
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.id
                                        })}
                                        name="matiereId"
                                        value={this.matiereId}
                                        onChange={this.onChange}
                                    >
                                        <option>Choisissez une matière</option>
                                        {
                                            // 
                                            //          onChange={this.onChange}
                                            //         <option value={0}>Select Priority</option>
                                            //         <option value={1}>High</option>
                                            //         <option value={2}>Medium</option>
                                            //         <option value={3}>Low</option>
                                            //     

                                        }
                                        {
                                            matieres.map(matiere => (
                                                <option key={matiere.matiereId} value={matiere.matiereId}> {matiere.nom} </option>
                                            ))
                                        }
                                    </select>
                                    {
                                        errors.id && (
                                            <div className="invalid-feedback">{errors.id}</div>
                                        )
                                    }
                                </div>
                                <input type="submit" className="btn btn-primary btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AddMatieresProfesseurs.propTypes = {
    matiere: PropTypes.object.isRequired,
    getMatieres: PropTypes.func.isRequired,
    getProfesseurs: PropTypes.func.isRequired,
    addMatieresToProfesseur: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    professeur: state.professeur,
    matiere: state.matiere,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { getProfesseurs, getMatieres, addMatieresToProfesseur }
)(AddMatieresProfesseurs);