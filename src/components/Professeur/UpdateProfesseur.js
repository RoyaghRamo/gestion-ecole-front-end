import React, { Component } from 'react';
import { getProfesseur, createProfesseur } from "../../actions/professeurActions";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import classnames from "classnames";

class UpdateProfesseur extends Component {

    constructor() {

        super();

        this.state = {
            id: "",
            nom: "",
            prenom: "",
            professeurId: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };

    componentWillReceiveProps(nextProps) {

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }

        const {
            id,
            nom,
            prenom,
            professeurId
        } = nextProps.professeur;

        this.setState({
            id,
            nom,
            prenom,
            professeurId
        });
    };

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getProfesseur(id, this.props.history);
    };

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit(e) {
        e.preventDefault();
        const updatedProfesseur = {
            id: this.state.id,
            nom: this.state.nom,
            prenom: this.state.prenom,
            professeurId: this.state.professeurId
        };

        this.props.createProfesseur(updatedProfesseur, this.props.history);
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="etudiant">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Modifier Etudiant</h5>
                            <hr />
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.nom
                                        })}
                                        placeholder="Nom du professeur"
                                        name="nom"
                                        value={this.state.nom}
                                        onChange={this.onChange}
                                    />
                                    {
                                        errors.nom && (
                                            <div className="invalid-feedback">{errors.nom}</div>
                                        )
                                    }
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.prenom
                                        })}
                                        placeholder="Prénom du professeur"
                                        name="prenom"
                                        value={this.state.prenom}
                                        onChange={this.onChange}
                                    />
                                    {
                                        errors.prenom && (
                                            <div className="invalid-feedback">{errors.prenom}</div>
                                        )
                                    }
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Identifiant d'étudiant"
                                        name="professeurId"
                                        value={this.state.professeurId}
                                        disabled />
                                </div>
                                <input type="submit" className="btn btn-primary btn-block mt-4" value="Enregistrer" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

UpdateProfesseur.propTypes = {
    getProfesseur: PropTypes.func.isRequired,
    createProfesseur: PropTypes.func.isRequired,
    professeur: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    professeur: state.professeur.professeur,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { getProfesseur, createProfesseur }
)(UpdateProfesseur);