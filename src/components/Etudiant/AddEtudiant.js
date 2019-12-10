import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { createEtudiant } from '../../actions/etudiantActions';
import classnames from "classnames";

class AddEtudiant extends Component {

    constructor() {
        super();
        this.state = {
            nom: "",
            prenom: "",
            etudiantId: "",
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };

    // Life Cycle Hooks
    // This function is called when the component may be receiving new props
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
        const newEtudiant = {
            nom: this.state.nom,
            prenom: this.state.prenom,
            etudiantId: this.state.etudiantId
        };
        this.props.createEtudiant(newEtudiant, this.props.history);
    };

    render() {

        // Get the erros from the state
        const { errors } = this.state;
        return (
            <div className="etudiant">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Formulaire: Ajouter un étudiant</h5>
                            <hr />
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.nom
                                        })}
                                        placeholder="Nom d'étudiant"
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
                                        placeholder="Prénom d'étudiant"
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
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.etudiantId
                                        })}
                                        placeholder="Identifiant de l'étudiant"
                                        name="etudiantId"
                                        value={this.state.etudiantId}
                                        onChange={this.onChange}
                                    />
                                    {
                                        errors.etudiantId && (
                                            <div className="invalid-feedback">{errors.etudiantId}</div>
                                        )
                                    }
                                </div>
                                <input type="submit" className="btn btn-primary btn-block mt-4" value="Ajouter étudiant" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AddEtudiant.propTypes = {
    createEtudiant: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { createEtudiant }
)(AddEtudiant); 